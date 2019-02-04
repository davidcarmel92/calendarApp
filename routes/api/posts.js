const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validatePostInput = require('../../validation/post');

const Post  = require('../../models/Post');
const Category  = require('../../models/Category');

// @route  GET api/posts/
// @desc   Get all categories
// @access Public
router.get('/', async (req,res) => {
  try {
    const result = await Category.find().sort({lastPostDate: -1});
    res.json(result);
  }
  catch(e) {
    res.status(404).json({nopostfound: 'No categories found.'});
  }
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

    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      category: req.body.category,
      user: req.user.id,
      name: req.user.name
    });

    if(result){

      const newLength = result.length + 1;
      const updatedCategory = { length: newLength, lastPostTitle: newPost.title, lastPostDate: Date.now() };
      const [savedCategory, updatedPost] = await Promise.all([
        Category.findByIdAndUpdate(result._id, { $set: updatedCategory }),
        newPost.save()
      ]);
      res.json(updatedPost)
    }
    else {

      const newCategory = new Category({
        name: req.body.category,
        lastPostTitle: newPost.title,
        lastPostDate: Date.now()
      });

      const [cat, post ] = await Promise.all([
        newCategory.save(),
        newPost.save()

      ])
      res.json(post)
    }
  } catch(e) {
    res.status(404).json({error: 'No category found.'})
  }
});

// @route  GET api/posts/:id
// @desc   Get posts by id
// @access Public
router.get('/:post_id', (req,res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that id.'}))
});

// @route  GET api/posts/category/:category
// @desc   Get posts by category
// @access Public
router.get('/category/:category/:page', async (req,res) => {
  try {
    let pageSkip = req.params.page
    const categoryData = await Category.findOne({name: req.params.category});
    const posts = await Post.find({category: categoryData.name});
    const length = posts.length;
    posts.sort((a,b) => {
      let dateA;
      let dateB;
      if(a.comments[0]){
        dateA = new Date(a.comments[a.comments.length-1].date);
      }
      else {
        dateA = new Date(a.date);
      }

      if(b.comments[0]){
        dateB = new Date(b.comments[b.comments.length-1].date);
      }
      else {
        dateB = new Date(b.date);
      }
      return dateB - dateA;
    });
    const page = ((pageSkip-1)*10);
    const returnedPosts = posts.slice(page, page+10)
    const returnData = {
      posts: returnedPosts,
      length: length
    }
    res.json(returnData);
  } catch(e){
    res.status(404).json({nopostfound: 'No post found with that category.'})
  }
});

// @route  POST api/posts/comment/:id
// @desc   Create comment on posts
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req,res) => {

  const newComment = {
    text: req.body.text,
    name: req.user.name,
    user: req.user.id
  }

  try {
    const post = await Post.findById(req.params.id);
    const updatedCategory = { lastPostTitle: post.title, lastPostDate: Date.now() };
    post.comments.push(newComment);
    const [savedCategory, updatedPost] = await Promise.all([
      Category.findOneAndUpdate({name: post.category}, { $set: updatedCategory }),
      post.save()
    ]);
    res.json(updatedPost)
  } catch(e){
    res.status(404).json({error: 'No post found.'})
  }

});

module.exports = router;
