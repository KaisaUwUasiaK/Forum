const User = require('./UserModel');
const Post = require('./PostModel');
const Comment = require('./CommentModel');
const PostImage = require('./PostImage');

const defineAssociations = () => {
    // Mối quan hệ giữa User và Post (1 User có nhiều Post)
    User.hasMany(Post, { foreignKey: 'authorid' });
    Post.belongsTo(User, { foreignKey: 'authorid' });

    // Mối quan hệ giữa User và Comment (1 User có nhiều Comment)
    User.hasMany(Comment, { foreignKey: 'authorid' });
    Comment.belongsTo(User, { foreignKey: 'authorid' });

    // Mối quan hệ giữa Post và Comment (1 Post có nhiều Comment)
    Post.hasMany(Comment, { foreignKey: 'postid' });
    Comment.belongsTo(Post, { foreignKey: 'postid' });

    // Mối quan hệ giữa Post và PostImage (1 Post có nhiều Image, xóa Post sẽ xóa luôn Image)
    Post.hasMany(PostImage, { foreignKey: 'postid', onDelete: 'CASCADE' });
    PostImage.belongsTo(Post, { foreignKey: 'postid', onDelete: 'CASCADE' });

    // Dùng onDelete: 'CASCADE' để tránh dữ liệu rác khi xóa Post
};

module.exports = defineAssociations;



