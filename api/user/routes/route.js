'use strict';
const JWT = require('jsonwebtoken');
const _ = require('lodash');

module.exports = [
    {   //3. Get current user
        method: 'GET',
        path: '/api/me',
        handler: async function (request, h) {
            try {
                if(!request.headers.authorization) {
                    return h.response({}).code(401)
                }
                const token = request.headers.authorization.split(' ')[1];
                const decoded = JWT.verify(token, 'jwtSecret');
                return h.response({
                    id: decoded.candidate.id,
                    name: decoded.candidate.name,
                    email: decoded.candidate.email,
                    phone: decoded.candidate.phone
                }).code(200);
            } catch (e) {
                console.log(e);
            }
        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        }
    }
];