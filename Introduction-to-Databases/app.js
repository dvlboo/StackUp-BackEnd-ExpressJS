const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const TaskModel = require('./models/TaskModel');
require('dotenv').config();

//Create to MongoDB
const app = express();

//Connect to MongoDB
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening");
  mongoose.connect(process.env.db_connection).then(() => {
    console.log("Database Connected");
  });
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  TaskModel.find({}).then((task) => {
    res.render('index.ejs', {todos: task});
  })
});

app.post('/tasks', (req, res) => {
  const newTodo = new TaskModel({
    task: req.body.task
  });

  newTodo.save();
  res.redirect('/');
});

app.post('/tasks/:id/complete', (req, res) => {
  TaskModel.findById(req.params.id).then((todo) => {
    todo.is_completed = !todo.is_completed;
    todo.save();
    res.redirect('/');
  });
});

app.post('/tasks/:id/update', (req, res) => {
  TaskModel.findById(req.params.id).then((todo) => {
    todo.task = req.body.task;
    todo.save();
    res.redirect('/');
  });
});

app.post('/tasks/:id/delete', (req, res) => {
  TaskModel.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/');
  });
});

module.exports = {
  mongoose,
};

