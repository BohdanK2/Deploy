const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');
const fs = require('fs');

const router = express.Router();

// Гарантируем, что папка существует!
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Настройка Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '_' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Загрузка аватарки (POST /api/avatar)
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const userId = Number(req.body.userId);
    if (!userId) return res.status(400).json({ message: "Не передан userId" });
    if (!req.file) return res.status(400).json({ message: "Нет файла" });

    const avatarUrl = '/uploads/' + req.file.filename;
    await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2', [avatarUrl, userId]);

    res.json({ avatarUrl });
  } catch (err) {
    console.error('Ошибка при загрузке аватарки:', err);
    res.status(500).json({ message: "Ошибка сервера при загрузке аватарки" });
  }
});

module.exports = router;
