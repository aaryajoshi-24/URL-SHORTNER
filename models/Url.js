const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Url = sequelize.define("Url", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    originalUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },

    shortCode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    accessCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = Url;