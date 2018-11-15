const Validator = require('validator');
const isEmpty = require('./is-empty')

module.exports = function validatePinInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';
  data.title = !isEmpty(data.title) ? data.title : '';

  // if(Validator.isEmpty(data.description)) {
  //   errors.description = 'description field is required.';
  // }

  if(Validator.isEmpty(data.title)) {
    errors.title = 'title field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
