const express = require("express");

const {
  addTodo,
  getTodos,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todoController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addTodo);
router.get("/", authMiddleware, getTodos);
router.patch("/:id", authMiddleware, toggleTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;