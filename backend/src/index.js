const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Віддаємо публічні файли (наприклад, index.html)
app.use(express.static(path.join(__dirname, '../../public')));

// Ендпоінт для реєстрації (тимчасово, для тесту)
app.post('/api/signup', (req, res) => {
  console.log('Запит на реєстрацію:', req.body);
  res.status(200).json({ message: 'Реєстрація успішна' });
});

// Ендпоінт для логіну (тимчасово, для тесту)
app.post('/api/auth/login', (req, res) => {
  console.log('Запит на логін:', req.body);
  // Тут додай перевірку користувача, якщо потрібно
  res.status(200).json({ message: 'Вхід успішний', token: 'fake-jwt-token' });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);
});
