const express = require("express");
const router = express.Router();
const {
  addMemory,
  getMemories,
  deleteMemory,
} = require("../controllers/memoryController");

router.post("/", addMemory);
router.get("/", getMemories);
router.delete("/:id", deleteMemory);

module.exports = router;