const express = require('express');
const router = express.Router();
const validatePostInput = require('../../validation/post');
const passport = require('passport');

const Events = require('../../models/Event');

router.post('/post', async (req,res) => {

  const { errors, isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const newEvent = new Event({
      text: req.body.text,
      month: req.body.month,
      day: req.body.day,
      time: req.body.time
    });
    const result =  await newEvent.save();
    res.json(result);

  }
  catch(e) {
    res.status(404).json({error: e, errorMessage: 'Error saving event.'});
  }
});

router.get('/post/:month_id', async (req,res) => {
  try {
    const posts = await Event.find({month: req.params.month_id});
    res.json(posts);
  }
  catch(e) {
    res.status(404).json({error: e, errorMessage: 'Not a valid submission'});
  }
});

router.put('/post/:id', async (req,res) => {

  const { errors, isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const record = {_id: req.params.id};
    const updatedEvent = {
      text: req.body.text,
      month: req.body.month,
      day: req.body.day,
      time: req.body.time
    };
    const post = await Event.findOneAndUpdate(record, updatedEvent, {
      new: true
    });
    res.json(post);
  }
  catch(e) {
    res.status(404).json({error: e, errorMessage: 'No Existing Record'});
  }
});

router.delete('/post/:id', async (req,res) => {
  try {
    const post = await Event.findByIdAndRemove(req.params.id);
    res.json(post);
  }
  catch(e) {
    res.status(404).json({error: e, errorMessage: 'No Existing Event'});
  }
});

module.exports = router;
