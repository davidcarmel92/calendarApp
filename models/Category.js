const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true,
    default: 1
  },
  lastPostTitle: {
    type: String,
    required: true
  },
  lastPostDate: {
    type: Date,
    required: true
  }
});

module.exports = Category = mongoose.model('categories', CategorySchema)
