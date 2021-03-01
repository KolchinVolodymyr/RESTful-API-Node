'use strict';
const user = require('../../model/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const db = require('../../utils/database');
const User = db.user;
const Product = db.product;



module.exports = [
    {
        method: 'GET',
        path: '/api/login',
            handler: function (request, h) {

                return ` <html>
                            <head>
                                <title>Login page</title>
                            </head>
                            <body>
                                <h3>Please Log In</h3>
                                <form method="post" action="/api/login">
                                    Username: <input type="text"  name="username"><br>
                                    Password: <input type="password" name="password"><br/>
                                <input type="submit" value="Login"></form>
                                
                                <form method="post" action="/api/register">
                                    Username: <input type="text" name="username"><br>
                                    Email: <input type="email" name="email"><br>
                                    Password: <input type="password" name="password"><br/>
                                    Phone: <input type="phone" name="phone"><br>
                                    <input type="submit" value="register">
                                </form>
                            </body>
                        </html>`;
                },
                options: {
                    auth: false,
                }
            },
            {
                method: 'POST',
                path: '/api/login',
                handler: async (request, h) => {
                const { username, password } = request.payload;

                const candidate = await User.findOne({
                    where: {
                        name: username
                    }
                });
                if (candidate) {
                    const areSame = await bcrypt.compare(password, candidate.password);
                    if (areSame) {
                        request.cookieAuth.set({
                            id: candidate.id,
                            name: candidate.name,
                            phone: candidate.phone,
                            email: candidate.email
                        });
                        const token = JWT.sign(
                            { userId: candidate.name },
                            'jwtSecret',
                            { expiresIn: '1h' }
                        );
                        return h.response({token: token}).code(200);
                    } else {
                        return h.response({field :"password", message :"Wrong email or password"}).code(422);
                    }
                } else {
                    return h.response({message: 'This Email is not registered'}).code(400);
                }
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
                    path: '/api/register',
                    handler: async function (request, h) {
                    try {
                        const {username, email, password, phone} = request.payload;

                        const hashPassword = await bcrypt.hash(password, 10)
                        const ItemUser = await  User.create({
                            name: request.payload.username,
                            email: request.payload.email,
                            password: hashPassword,
                            phone: request.payload.phone
                        });
                        const token = JWT.sign(
                            { userId: User.name },
                            'jwtSecret',
                            { expiresIn: '1h' }
                        );
                        return h.response({token: token}).code(200);
                    } catch (e) {
                        console.log(e)
                    }
                },
                    options: {
                        auth: {
                            mode: 'try'
                        }
                    }
            },

];