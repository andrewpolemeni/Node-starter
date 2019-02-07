const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // checks NAME field length
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 Characters.";
  }
  // checks NAME field if empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field is required.";
  }
  // checks EMAIL field if empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  // check if its acutally an EMAIL.
  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email address.";
  }
  // check if PASSWORD is empty.
  if (Validator.isEmpty(data.password)) {
    errors.password = "Not a valid password.";
  }
  // check if PASSWORD is empty.
  if (!Validator.isLength(data.password, { min: 8, max: 30})) {
    errors.password = "Password must be a minimum of 8 characters.";
  }
  // check if PASSWORD2 is empty.
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  // check if PASSWORD2 matches password.
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
