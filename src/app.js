const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const defineAssociations = require('./models/associations');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();
defineAssociations(); // Gọi function thiết lập quan hệ giữa các models
const app = express();

app.use(express.json()); // Middleware để xử lý JSON request body

// Khai báo routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

