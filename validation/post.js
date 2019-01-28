const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if(!Validator.isLength(data.text, {min: 2, max: 300})) {
    errors.text = 'Posts must be between 2 and 300 characters.'
  }

  if(!Validator.isLength(data.title, {min: 2, max: 3000})) {
    errors.title = 'Post titles must be between 2 and 3000 characters.'
  }

  if(!Validator.isLength(data.category, {min: 2, max: 20})) {
    errors.category = 'Category titles must be between 2 and 20 characters.'
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required.';
  }

  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required.'
  }

  if(Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
