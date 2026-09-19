const Todo = require("../models/Todo");

const addTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      user: req.user,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user }).sort({
      createdAt: -1,
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update title if provided
    if (req.body.title !== undefined) {
      todo.title = req.body.title;
    }

    // Explicitly mark completed (true/false) or toggle if neither title nor explicit completed is passed
    if (req.body.completed !== undefined) {
      todo.completed = Boolean(req.body.completed);
    } else if (req.body.title === undefined) {
      todo.completed = !todo.completed;
    }

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addTodo,
  getTodos,
  toggleTodo,
  deleteTodo,
};