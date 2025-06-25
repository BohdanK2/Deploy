const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Статические файлы
app.use(express.static(path.join(__dirname, "../public")));

const USERS_FILE = path.join(__dirname, "users.json"); // ✅ абсолютный путь

// Регистрация
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log("➡️ POST /signup", req.body);
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ error: "User already exists." });
  }

  users.push({ username, email, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  console.log("✅ User saved:", username); // для проверки

  res.status(201).json({ message: "User registered successfully." });

});

// Авторизация
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  res.json({ message: "Login successful", user });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


