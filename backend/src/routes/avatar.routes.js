const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');

const router = express.Router();

// Папка для загрузки (создай public/uploads!)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    // уникальное имя — userId + время + расширение
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '_' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Загрузка аватарки (POST /api/avatar)
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    // Получаем userId из формы или лучше — из JWT (но для MVP пойдёт)
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: "Не передан userId" });
    if (!req.file) return res.status(400).json({ message: "Нет файла" });

    // Формируем путь для хранения в БД
    const avatarUrl = '/uploads/' + req.file.filename;

    // Обновляем в базе
    await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2', [avatarUrl, userId]);

    res.json({ avatarUrl });
  } catch (err) {
    console.error('Ошибка при загрузке аватарки:', err);
    res.status(500).json({ message: "Ошибка сервера при загрузке аватарки" });
  }
});

module.exports = router;
