module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },

    });

    return Product;
}