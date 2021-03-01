'use strict';
const JWT = require('jsonwebtoken');

module.exports = [
    {
        method: 'POST',
        path: `/api/logout`,
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            }
        },
        handler: async function (request, h) {
            try {
                request.cookieAuth.clear();
                return h.response({message: 'Сookies deleted'}).code(200).takeover();
            } catch (e){
                console.log(e);
            }
        }
    },
    {   //3. Get current user
        method: 'GET',
        path: '/api/me',
        handler: async function (request, h) {
            try {
                if(!request.auth.credentials) {
                    return h.response({}).code(401)
                }
                return h.response(request.auth.credentials).code(200).takeover();
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