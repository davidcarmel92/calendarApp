const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validatePostInput = require('../../validation/post');

const Post  = require('../../models/Post');
const Category  = require('../../models/Category');

// @route  POST api/posts/category
// @desc   Create new category
// @access Private
router.post('/category', passport.authenticate('jwt', { session: false }), (req,res) => {

  const newCategory = new Category({
    name: req.body.name
  })

  newCategory.save().then(cat => res.json(cat))
});

// @route  POST api/posts/
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const { errors, isValid } = validatePostInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const result = await Category.findOne({name: req.body.category});

    if(result){
      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        user: req.user.id,
        name: req.user.name
      });

      newPost.save().then(post => res.json(post))
    } else {

      const newCategory = new Category({
        name: req.body.category
      })

      const cat = await newCategory.save();

      if(cat){
        const newPost = new Post({
          title: req.body.title,
          text: req.body.text,
          category: req.body.category,
          user: req.user.id,
          name: req.user.name
        });

        newPost.save().then(post => res.json(post))
      }
      else {
        throw err;
      }
    }
  } catch(e) {
    res.status(404).json({error: 'No category found.'})
  }
});

// @route  GET api/posts/:id
// @desc   Get posts by id
// @access Public
router.get('/:id', (req,res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that id.'}))
});

// @route  GET api/posts/category/:category
// @desc   Get posts by category
// @access Public
router.get('/category/:category', async (req,res) => {
  try {
    const categoryName = await Category.findOne({name: req.params.category});
    const posts = await Post.find({category: categoryName.name}).sort({date: -1});
    res.json(posts);
  } catch(e){
    res.status(404).json({nopostfound: 'No post found with that category.'})
  }
});

// @route  GET api/posts/category/:category
// @desc   Get posts by category
// @access Public
router.get('/category', async (req,res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch(e){
    res.status(404).json({nopostfound: 'No categories found.'})
  }
});

// @route  POST api/posts/comment/:id
// @desc   Create comment on posts
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req,res) => {

  console.log(req.body)

  const newComment = {
    text: req.body.text,
    name: req.user.name,
    user: req.user.id
  }

  try {
    const post = await Post.findById(req.params.id);
    post.comments.unshift(newComment);
    post.save().then(updatedPost => res.json(updatedPost))
  } catch(e){
    res.status(404).json({error: 'No post found.'})
  }

});

module.exports = router;
