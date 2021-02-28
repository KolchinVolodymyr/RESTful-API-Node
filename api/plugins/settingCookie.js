


exports.plugin = {
    name: 'settingCookie',
    version: '1.0.0',
    register: async function (server, options) {

        server.auth.strategy('session', 'cookie', {
            cookie: {
                name: 'sid-example',
                password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
                isSecure: false
            },
            redirectTo: '/login',
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