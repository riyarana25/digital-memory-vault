const db = require("../db");

// REGISTER
exports.register = (req, res) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (username, password_hash) VALUES (?, ?)";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error registering user");
    }
    res.send("User registered successfully");
  });
};

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send("Error");

    if (results.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = results[0];

    if (user.password_hash !== password) {
      return res.status(401).send("Wrong password");
    }

    res.json({
      message: "Login successful",
      userId: user.id,
    });
  });
};