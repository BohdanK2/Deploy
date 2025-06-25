const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Подключение к PostgreSQL

// Регистрация пользователя
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверка, есть ли такой email уже в базе
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Користувач вже існує' });
    }

    // Хеширование пароля
    const hashed = await bcrypt.hash(password, 10);

    // Вставка пользователя в базу
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashed]
    );

    res.status(201).json({ message: 'Успішна реєстрація' });
  } catch (err) {
    console.error('Помилка реєстрації:', err);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};

// Логин пользователя
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Поиск пользователя по email
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: 'Невірні дані' });
    }
    const user = userQuery.rows[0];

    // Проверка пароля
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Невірні дані' });
    }

    // Генерация токена (JWT)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Вхід успішний!' });
  } catch (err) {
    console.error('Помилка входу:', err);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};
