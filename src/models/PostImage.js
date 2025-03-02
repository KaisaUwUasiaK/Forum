const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./PostModel');

class PostImage extends Model {}

PostImage.init({
    imageid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    postid: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    imageurl: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'PostImage',
    tableName: 'PostImages',
    timestamps: false
});


module.exports = PostImage;
