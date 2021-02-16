const {check} = require('express-validator')


const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}


const validations = {
  registerValidation: [
    check('firstName', 'Name is required!').notEmpty().isLength({min: 1, max: 50}).trim(),
    check('lastName', 'Last name is Required!').notEmpty().isLength({min: 1, max: 50}).trim(),
    check('email', 'Email is required!').notEmpty().custom(validateEmail)
      .withMessage('Email is not correct!').trim().toLowerCase(),
    check('password', 'Password is required!').notEmpty().isLength({min: 5, max: 15})
      .withMessage('Password length min 5 chars').matches(/\d/).withMessage('Password must contains a number!'),
  ],
  loginValidation: [
    check('email', 'Email is required!').notEmpty().custom(validateEmail)
      .withMessage('Email is not correct!').trim().toLowerCase(),
    check('password', 'Password is required!').notEmpty().isLength({min: 5, max: 15})
      .withMessage('Password length min 5 chars').matches(/\d/).withMessage('Password must contains a number!'),
  ],
  resetPasswordValidation: [
    check('password', 'Password is required!').notEmpty().isLength({min: 5, max: 15})
      .withMessage('Password length min 5 chars').matches(/\d/).withMessage('Password must contains a number!'),
  ],
  updateUserDetails: [
    check('firstName', 'Name is required!').notEmpty().isLength({min: 1, max: 50}).trim(),
    check('lastName', 'Last name is Required!').notEmpty().isLength({min: 1, max: 50}).trim(),
    check('email', 'Email is required!').notEmpty().custom(validateEmail)
      .withMessage('Email is not correct!').trim().toLowerCase(),
  ],
}

module.exports = validations