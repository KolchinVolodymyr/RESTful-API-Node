'use strict';

const db = require('../../utils/database');
const User = db.user;
const Product = db.product;
const fs = require('fs');

module.exports = [
    {
        method: 'POST',
        path: '/api/items',
        handler: async (request, h) => {
            console.log('request.auth', request.auth);
            const itemProduct = await Product.create({
                title: request.payload.title,
                price:  request.payload.price,
                image: request.payload.image,
                keyId: request.auth.credentials.id
            },{
                include: [User]
            })

            const findProduct =  await Product.findAll({
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']}]
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

            const candidate = await Product.findOne({
                where: {
                    id: request.params.id
                },
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']}]
            })
            return  h.response({candidate: candidate}).code(200);
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
            const product = await Product.update(
                {title: request.payload.title,
                    price: request.payload.price},
                {where: {id: request.params.id}}
            );
            const productFind = await Product.findOne({
                attributes:['id','createdAt','title', 'price', 'image', ['keyId','user_id']],
                include: [{
                    model: User,
                    attributes: ['id', 'phone', 'name', 'email']}]
            });
            return h.response({productFind}).code(200);
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
    {//7. Delete item
        method: 'DELETE',
        path: `/api/items/{id}`,
        handler: async (request, h) => {
            const products = await Product.findOne({
                where: {id: request.params.id}
            });
            const product = products[0];
            await products.destroy();
            return h.response({product}).code(200);
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