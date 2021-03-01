module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        phone: {
            type: Sequelize.STRING,
            defaultValue: ''
        }

    });

    return User;
}