const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = Event = mongoose.model('events', EventSchema)
