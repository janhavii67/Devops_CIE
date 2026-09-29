const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let tasks = [
  { id: 1, title: "Complete DOSSL Assignment 1", subject: "DevOps", dueDate: "2026-09-25", priority: "High", completed: false },
  { id: 2, title: "Prepare Docker basics", subject: "DevOps", dueDate: "2026-09-27", priority: "Medium", completed: false }
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, subject, dueDate, priority } = req.body;
  if (!title || !subject || !dueDate || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const task = {
    id: Date.now(),
    title,
    subject,
    dueDate,
    priority,
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/api/tasks/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found." });
  task.completed = !task.completed;
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ error: "Task not found." });
  res.json({ message: "Task deleted." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Student Task Manager running on port ${PORT}`);
});
