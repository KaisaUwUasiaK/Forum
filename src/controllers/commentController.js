const Comment = require('../models/CommentModel');

// Tạo bình luận mới
exports.createComment = async (req, res) => {
    try {
        const { postid, authorid, content } = req.body;

        if (!postid || !authorid || !content) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        }

        const newComment = await Comment.create({ postid, authorid, content });

        res.status(201).json({ message: 'Bình luận đã được tạo', comment: newComment });
    } catch (error) {
        console.error('Lỗi khi tạo bình luận:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Chỉnh sửa bình luận
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Nội dung không được để trống' });
        }

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: 'Bình luận không tồn tại' });
        }

        await comment.update({ content });

        res.status(200).json({ message: 'Bình luận đã được cập nhật', comment });
    } catch (error) {
        console.error('Lỗi khi cập nhật bình luận:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Xóa bình luận
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: 'Bình luận không tồn tại' });
        }

        await comment.destroy();

        res.status(200).json({ message: 'Bình luận đã bị xóa' });
    } catch (error) {
        console.error('Lỗi khi xóa bình luận:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};