const mysql = require("mysql2");

// Use createPool instead of createConnection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the pool connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Successfully connected to MySQL database!");
    connection.release(); // Release the connection back to the pool
  }
});

// Export the pool's promise wrapper so you can use async/await in your routes later!
module.exports = pool;