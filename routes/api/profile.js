const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route  GET api/profile
// @desc   Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
});

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', (req,res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err));
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by id
// @access Public
router.get('/user/:user_id', (req,res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});

// @route  POST api/profile
// @desc   Create or edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {

  const { errors, isValid } = validateProfileInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }


  const profileFields = {};

  profileFields.user = req.user.id;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(typeof req.body.favorites !== 'undefined') {
    profileFields.favorites = req.body.favorites.split(',')
  }

  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile) {
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile =>  res.json(profile));
      }
      else {
        new Profile(newProfile).save()
          .then(profile =>  res.json(profile))
      }
    });
});

// @route  DELETE api/profile/
// @desc   Delete user profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req,res) => {

  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => User.findOneAndRemove({ _id: req.user.id }))
    .then(() => res.json({ success: true }))
});

module.exports = router;
