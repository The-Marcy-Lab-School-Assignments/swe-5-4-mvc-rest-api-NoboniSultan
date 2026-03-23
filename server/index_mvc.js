const express = require('express');
const path = require('path');
const todoControllers = require('./controllers/todoControllers');
const app = express();

const logRoutes = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logRoutes);
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.get('/api.todos', todoControllers.listTodos);
app.get('/api/todos/:id', todoControllers.findTodo);
app.post('/api/todo', todoControllers.createTodo);
app.patch('/api/todos/:id', todoControllers.updateTodo);
app.delete('/api/todos/:id', todoControllers.deleteTodo);

app.use((req, res) => {
  res.status(404).json({ message: `Error: Not found ${req.url}` });
});

app.listen(8080, () => console.log('Server running on port 8080'));