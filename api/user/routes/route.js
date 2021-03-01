'use strict';


module.exports = [

    {
        method: 'GET',
        path: `/api/2`,
        handler: async (request, h) => {

            return 'Hello World!222';
        }
    },
    {
        method: 'GET',
        path: '/api',
        handler: (request, h) => {

            return 'Hello World!';
        }
    },
    {
        method: 'GET',
        path: '/api/me',
        handler: async function (request, h) {
            try {
                return h.response({Authorization: request.headers.cookie}).code(200).takeover();
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