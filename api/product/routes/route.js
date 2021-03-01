'use strict';

const db = require('../../utils/database');
const User = db.user;
const Product = db.product;
const fs = require('fs');

module.exports = [
    {   //4. Get items list
        method: 'GET',
        path: '/api/items',
        handler: async (request, h) => {
            const findProduct =  await Product.findAll({
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']
                }]
            })
            return h.response({Product: findProduct}).code(200);
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
    {   //5. Get item by ID
        method: 'GET',
        path: `/api/items/{id}`,
        handler: async (request, h) => {

            const product = await Product.findOne({
                where: {
                    id: request.params.id
                },
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']
                }]
            });
            if(product===null) {
                return h.response({}).code(404);
            }
            return  h.response({product: product}).code(200);
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
    {   //6. Update item
        method: 'PUT',
        path: `/api/items/{id}`,
        handler: async (request, h) => {
            if(!request.auth.credentials) {
                return h.response({}).code(401)
            }
            console.log('credentials', request.auth.credentials);


            if(request.payload.title.length<3) {
                return h.response({field:"title", message:"Title should contain at least 3 characters"}).code(422);
            }
            await Product.update({
                    title: request.payload.title,
                    price: request.payload.price
                },
                {
                    where: {
                        id: request.params.id
                    }
                }
            );
            const productFind = await Product.findOne({
                where: {
                    id: request.params.id
                },
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']
                }]
            });

            if(request.auth.credentials.id!==productFind.dataValues.user_id) {
                return h.response({}).code(403)
            }
            if(productFind===null) {
                return h.response({}).code(404);
            }
            return h.response({productFind}).code(200);

        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
    {   //7. Delete item
        method: 'DELETE',
        path: `/api/items/{id}`,
        handler: async (request, h) => {
            if(!request.auth.credentials) {
                return h.response({}).code(401)
            }

            const products = await Product.findOne({
                where: {
                    id: request.params.id
                }
            });

            if(products===null) {
                return h.response({}).code(404);
            }

            if(request.auth.credentials.id!==products.dataValues.keyId) {
                return h.response({}).code(403)
            }
            await products.destroy();
            return h.response({}).code(200);
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
    {   //8. Create item
        method: 'POST',
        path: '/api/items',
        handler: async (request, h) => {
            if(!request.auth.credentials) {
                return h.response({}).code(401)
            }
            if(!request.payload.title) {
                return h.response({field:"title", message:"title is required"}).code(422);
            }
            if(!request.payload.price) {
                return h.response({field:"price", message:"price is required"}).code(422);
            }
            await Product.create({
                title: request.payload.title,
                price:  request.payload.price,
                image: request.payload.image,
                keyId: request.auth.credentials.id
            },{
                include: [User]
            })

            const findProduct =  await Product.findAll({
                where: {
                    title: request.payload.title
                },
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']
                }]
            })
            return h.response({Product: findProduct}).code(200);
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
    {   //9. Upload item image
        method: 'POST',
        path: `/api/items/{id}/images`,
        handler: async (request, h) => {
            if(!request.auth.credentials) {
                return h.response({}).code(401)
            }
            const handleFileUpload = file => {
                return new Promise((resolve, reject) => {

                    const filename = request.payload.file.hapi.filename;
                    const data = file._data;

                    fs.writeFile('./api/public/upload/' + filename, data, err => {
                        if (err) {
                            reject(err);
                        }
                        resolve({ message: 'Upload successfully!' });
                    });
                });
            };
            const { payload } = request;
            const response = handleFileUpload(payload.file);

            const products = await Product.update({
                    image: '/public/upload/' + request.payload.file.hapi.filename
                },
                {where: {id: request.params.id}}
            );

            return h.response(request.payload);

        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            payload: {
                maxBytes: 10485760,
                parse: true,
                output: 'stream',
                allow: ['multipart/form-data'],
                multipart: true
            }
        }

    }

];