const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, {min: 1, max: 300})) {
    errors.text = 'Posts must be between 1 and 300 characters.'
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required.';
  }

  if(data.month < 0 || data.month > 11){
    errors.month = 'Not a valid month';
  }

  if(data.day < 0 || data.day > 31){
    errors.day = 'Not a valid day';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}
