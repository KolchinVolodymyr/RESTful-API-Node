'use strict';


module.exports = [

    {
        method: 'GET',
        path: `/2`,
        handler: async (request, h) => {

            return 'Hello World!222';
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    },



];