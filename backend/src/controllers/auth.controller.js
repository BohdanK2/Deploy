const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // Тимчасове зберігання

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: 'Користувач вже існує' });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
  res.status(201).json({ message: 'Успішна реєстрація' });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Невірні дані' });
  }

  const token = jwt.sign({ email: user.email }, 'secret123', { expiresIn: '1h' });
  res.json({ token });
};