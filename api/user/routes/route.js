'use strict';
const JWT = require('jsonwebtoken');

module.exports = [
    {   //3. Get current user
        method: 'GET',
        path: '/api/me',
        handler: async function (request, h) {
            try {
                //const decoded = JWT.verify('"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyIiwiaWF0IjoxNjE0NjI4NDc5LCJleHAiOjE2MTQ2MzIwNzl9.L4L-YvLNj1LuP_dKGW5nvSgs2Ep0sD_26ZN0Qgp7nPs"', 'jwtSecret');
                return h.response({Authorization: request.headers.cookie/*, decoded: decoded*/}).code(200).takeover();
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