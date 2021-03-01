const Sequelize = require('sequelize');
const DB_NAME = 'new_schema';
const USER_NAME = 'root';
const PASSWORD = '12345';

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user')(sequelize, Sequelize);
db.product = require('../model/product')(sequelize, Sequelize);

// Here we can connect companies and products base on company'id
db.user.hasMany(db.product, {foreignKey: 'keyId', sourceKey: 'id'});
db.product.belongsTo(db.user, {foreignKey: 'keyId', targetKey: 'id'});

module.exports = db;