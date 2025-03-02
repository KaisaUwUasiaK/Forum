const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Lấy tất cả bài viết
router.get('/', postController.getAllPosts);

// Tạo bài viết mới
router.post('/', postController.createPost);

// Cập nhật bài viết
router.put('/:id', postController.updatePost);

// Xóa bài viết
router.delete('/:id', postController.deletePost);

module.exports = router;
