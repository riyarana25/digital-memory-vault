const db = require("../db");

// =========================
// ADD MEMORY
// =========================
exports.addMemory = (req, res) => {
  const { user_id, title, description, memory_date, category } = req.body;

  // ✅ Validation
  if (!user_id || !title || !memory_date) {
    return res.status(400).json({
      error: "user_id, title and memory_date are required",
    });
  }

  const query = `
    INSERT INTO memories (user_id, title, description, memory_date, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [user_id, title, description || "", memory_date, category || "General"],
    (err, result) => {
      if (err) {
        console.error("Add Memory Error:", err);
        return res.status(500).json({
          error: "Failed to add memory",
        });
      }

      res.status(201).json({
        message: "Memory added successfully",
        memoryId: result.insertId,
      });
    },
  );
};

// =========================
// GET MEMORIES
// =========================
exports.getMemories = (req, res) => {
  const { user_id, year } = req.query;

  // ✅ Validation
  if (!user_id) {
    return res.status(400).json({
      error: "user_id is required",
    });
  }

  let query = "SELECT * FROM memories WHERE user_id = ?";
  let values = [user_id];

  // 🎯 Optional year filter
  if (year) {
    query += " AND YEAR(memory_date) = ?";
    values.push(year);
  }

  query += " ORDER BY memory_date DESC";

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Fetch Memory Error:", err);
      return res.status(500).json({
        error: "Failed to fetch memories",
      });
    }

    res.status(200).json(results);
  });
};

// =========================
// DELETE MEMORY
// =========================
exports.deleteMemory = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Memory ID is required",
    });
  }

  db.query("DELETE FROM memories WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Delete Error:", err);
      return res.status(500).json({
        error: "Failed to delete memory",
      });
    }

    // ⚠️ If no row found
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Memory not found",
      });
    }

    res.status(200).json({
      message: "Memory deleted successfully",
    });
  });
};
