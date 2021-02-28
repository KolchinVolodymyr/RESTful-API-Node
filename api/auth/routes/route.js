'use strict';
const user = require('../../model/user');
const bcrypt = require('bcryptjs');


module.exports = [
    {
        method: 'GET',
        path: '/login',
            handler: function (request, h) {

                return ` <html>
                            <head>
                                <title>Login page</title>
                            </head>
                            <body>
                                <h3>Please Log In</h3>
                                <form method="post" action="/login">
                                    Username: <input type="text"  name="username"><br>
                                    Password: <input type="password" name="password"><br/>
                                <input type="submit" value="Login"></form>
                                
                                <form method="post" action="/register">
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
                path: '/login',
                handler: async (request, h) => {
                const { username, password } = request.payload;

                const candidate = await user.findOne({
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
                            return h.response({candidate: candidate}).code(200);
                        } else {
                            return h.response({message: 'Invalid password'}).code(400);
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
                    path: '/register',
                    handler: async function (request, h) {
                    try {
                        const {username, email, password, phone} = request.payload;

                        const hashPassword = await bcrypt.hash(password, 10)
                        const User = await  user.create({
                            name: request.payload.username,
                            email: request.payload.email,
                            password: hashPassword,
                            phone: request.payload.phone
                        })
                        return h.response({message: User}).code(200);
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
            {
                method: 'GET',
                path: '/me',
                handler: async function (request, h) {
                    try {
                        return h.response(request.auth.credentials).code(200).takeover();
                    } catch (e) {
                        console.log(e);
                    }
                },
                    options: {
                        auth: {
                            mode: 'try',
                            // strategy: 'session'
                        }
                    }
                }
];