const { Pool } = require('pg');

// Логируем переменные окружения для отладки
console.log("===== PG DATABASE CONFIG =====");
console.log("PGHOST:", process.env.PGHOST);
console.log("PGPORT:", process.env.PGPORT);
console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "(есть)" : "(нет)");
console.log("================================");

// Инициализируем pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false },
});

// Принудительно вызываем connect для явного вывода лога
pool.on('connect', () => {
  console.log('✅ PostgreSQL pool connected!');
});

module.exports = pool;
