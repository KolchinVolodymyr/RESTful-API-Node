const _ = require('lodash');

exports.plugin = {
    name: 'requestLifecycle',
    version: '1.0.0',
    register:function (server, options) {
        server.ext({
            type: 'onRequest',
            method: async function (request, h) {
                try {

                    const cookie = request.headers.cookie || '',
                        token = cookie.split(/;+/).filter((str)=>{
                            return str.indexOf('sid-example') ===0
                        }),
                        authorization = _.get(token, '0', ''),
                        parts = authorization.split(/=+/);
                    if(parts[1]) {
                        request.headers['autorization'] = `Bearer ${parts[1]}`;
                    }
                    return h.continue;
                } catch (e) {
                    console.log(e)
                }
            }
        });


    }
};





