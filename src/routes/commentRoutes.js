const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Lấy tất cả bình luận của một bài viết
// router.get('/post/:postid', commentController.getCommentsByPostId);

// Lấy bình luận theo ID
// router.get('/id/:id', commentController.getCommentById);

// Tạo bình luận mới
router.post('/', commentController.createComment);

// Cập nhật bình luận
router.put('/:id', commentController.updateComment);

// Xóa bình luận
router.delete('/:id', commentController.deleteComment);

module.exports = router;
