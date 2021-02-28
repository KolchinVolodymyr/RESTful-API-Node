const Sequelize = require('sequelize')

const DB_NAME = 'new_schema';
const USER_NAME = 'root';
const PASSWORD = '12345';

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize






