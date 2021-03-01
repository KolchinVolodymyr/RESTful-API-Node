'use strict';
const product = require('../../model/product');
const db = require('../../utils/database');
const User = db.user;
const Product = db.product;

module.exports = [
    // {
    //     method: 'GET',
    //     path: '/api/item/{id}',
    //     handler: function (request, h) {
    //
    //         return ` <html>
    //                         <head>
    //                             <title>Update Product</title>
    //                         </head>
    //                         <body>
    //                             <h3>Update Product</h3>
    //                             <form method="post" action="/api/items/3">
    //                                 <input type="hidden" name="id" value="3">
    //                                 title: <input type="text"  name="title"><br>
    //                                 price: <input type="text" name="price"><br/>
    //                                 image: <input type="text" name="image"><br/>
    //                             <input type="submit" value="qwerrrr"></form>
    //                         </body>
    //                     </html>`;
    //     },
    //     options: {
    //         auth: {
    //             mode: 'try',
    //             strategy: 'session'
    //         }
    //     }
    // },
    {
        method: 'GET',
        path: '/api/items',
        handler: function (request, h) {

            return ` <html>
                            <head>
                                <title>Product</title>
                            </head>
                            <body>
                                <h3>Please Log In</h3>
                                <form method="post" action="/api/items">
                                    title: <input type="text"  name="title"><br>
                                    price: <input type="text" name="price"><br/>
                                    image: <input type="text" name="image"><br/>
                                <input type="submit" value="Login"></form>
                            </body>
                        </html>`;
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    },
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
    }

];