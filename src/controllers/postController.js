const { Op } = require('sequelize');
const Post = require('../models/PostModel');
const PostImage = require('../models/PostImage');
const Comment = require('../models/CommentModel');
const User = require('../models/UserModel');

// Lấy tất cả bài viết (bao gồm ảnh và bình luận)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: PostImage, attributes: ['imageid', 'imageurl'] },
                { model: Comment, attributes: ['commentid', 'content', 'comment_time'] }
            ],
            order: [['post_time', 'DESC']] // Sắp xếp theo thời gian mới nhất
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Tạo bài viết mới
exports.createPost = async (req, res) => {
    try {
        const { authorid, title, content, images } = req.body;

        if (!authorid || !title || !content) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        }

        // Tạo bài viết mới
        const newPost = await Post.create({ authorid, title, content });

        // Chuyển img sang dạng array để dễ xử lý
        let imageArray;
        if (Array.isArray(images)) {
            imageArray = images;         // Nếu images là mảng, giữ nguyên
        } else if (images) {
            imageArray = [images];       // Nếu images có giá trị nhưng không phải mảng, chuyển nó thành mảng
        } else {
            imageArray = [];            // Nếu images là false (null, undefined, v.v.), trả về mảng rỗng
        }

        // code ngắn gọn hơn: const imageArray = Array.isArray(images) ? images : images ? [images] : [];

        // Nếu có ảnh, thêm vào PostImages
        if (imageArray.length > 0) {
            const imageRecords = images.map(imageurl => ({
                postid: newPost.postid,
                imageurl
            }));
            await PostImage.bulkCreate(imageRecords);
        }

        res.status(201).json({ message: 'Bài viết đã được tạo', post: newPost });
    } catch (error) {
        console.error('Lỗi khi tạo bài viết:', error);
        res.status(500).json({ message: 'Lỗi controller' });
    }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, images } = req.body;

        // Kiểm tra bài viết có tồn tại không
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        // Cập nhật nội dung bài viết
        await post.update({ title, content });

        // Chuẩn hóa images thành mảng
        const imageArray = Array.isArray(images) ? images : images ? [images] : [];

        // Cập nhật ảnh nếu có dữ liệu
        if (imageArray.length > 0) {
            await PostImage.destroy({ where: { postid: id } });
            const imageRecords = imageArray.map(imageurl => ({ postid: id, imageurl }));
            await PostImage.bulkCreate(imageRecords);
        }
        res.status(200).json({ message: 'Bài viết đã được cập nhật' });
    } catch (error) {
        console.error('Lỗi khi cập nhật bài viết:', error);
        res.status(500).json({ message: 'Lỗi controller' });
    }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra bài viết có tồn tại không
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        // Xóa bài viết (ảnh sẽ tự động bị xóa do onDelete: CASCADE)
        await post.destroy();

        res.status(200).json({ message: 'Bài viết đã được xóa' });
    } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error);
        res.status(500).json({ message: 'Lỗi controller' });
    }
};

