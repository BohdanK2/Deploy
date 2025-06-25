const express = require('express');
const path = require('path');
const cors = require('cors');

// Принудительно импортируем pool/db.js, чтобы вывести все логи env!
require('./config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Подключаем роуты авторизации
const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);

// Подключаем роут для аватарок
const avatarRoutes = require('./routes/avatar.routes');
app.use('/api', avatarRoutes);

// Раздаём public/uploads как статику для аватарок!
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Публичные файлы (например, index.html)
app.use(express.static(path.join(__dirname, '../../public')));

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});
