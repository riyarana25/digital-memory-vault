const db = require("../db");

// ADD MEMORY
exports.addMemory = (req, res) => {
  const { user_id, title, description, memory_date, category } = req.body;

  const query = `
    INSERT INTO memories (user_id, title, description, memory_date, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, title, description, memory_date, category],
    (err, result) => {
      if (err) return res.status(500).send("Error adding memory");

      res.send("Memory added successfully");
    }
  );
};

// GET MEMORIES (with optional year filter)
exports.getMemories = (req, res) => {
  const { user_id, year } = req.query;

  let query = "SELECT * FROM memories WHERE user_id = ?";
  let values = [user_id];

  if (year) {
    query += " AND YEAR(memory_date) = ?";
    values.push(year);
  }

  query += " ORDER BY memory_date DESC";

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).send("Error fetching memories");

    res.json(results);
  });
};

// DELETE MEMORY
exports.deleteMemory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM memories WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send("Error deleting memory");

    res.send("Memory deleted successfully");
  });
};