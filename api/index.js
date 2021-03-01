'use strict';

const Hapi = require('@hapi/hapi');
const sequelize = require('./utils/database')
const db = require('./utils/database');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // register plugins to server instance
    await server.register([
        {
            plugin: require('@hapi/cookie')
        },
        {
            plugin: require('./plugins/settingCookie')
        },
        {
            plugin: require('./plugins/loadAllRoutes')
        },
        {
            plugin: require('./plugins/requestLifecycle')
        }
    ]);



    await server.start();
    //await sequelize.sync();
    db.sequelize.sync().then(() => {
        console.log('Drop and Resync with { force: true }');
    });
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();