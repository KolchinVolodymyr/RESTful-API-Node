


exports.plugin = {
    name: 'settingCookie',
    version: '1.0.0',
    register: async function (server, options) {
        //Setting cookie
        await server.state('session', {
            ttl: 168 * 60 * 60 * 1000,     // One day
            isSecure: true,
            path: '/',
            encoding: 'base64json',
        });
        server.auth.strategy('session', 'cookie', {
            cookie: {
                name: 'sid-example',
                ttl: 168 * 60 * 60 * 1000,
                password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
                isSecure: false
            },
            redirectTo: '/api/login',
            validateFunc: async (request, session) => {

                // const account = await users.find(
                //     (user) => (user.id === session.id)
                // );
                //
                // if (!account) {
                //
                //     return { valid: false };
                // }

                return { valid: true, /*credentials: account*/ };
            }
        });


        server.auth.default('session')
    }
};