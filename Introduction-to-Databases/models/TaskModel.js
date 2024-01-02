const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  is_completed: {
    type: Boolean,
    require: false,
    default: false,
  },
}, {
  timestamps: true,
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;