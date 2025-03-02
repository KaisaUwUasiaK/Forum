const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');
const Post = require('./PostModel');

class Comment extends Model {}

Comment.init({
    commentid: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    postid: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    authorid: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    comment_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: false
});


module.exports = Comment;
