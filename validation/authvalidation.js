const {check, validationResult} = require("express-validator/check");

exports.signupValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array()
    const msgs = errArray.map(error => error.msg)
    return res.status(400).json({error : msgs})
  }
  next();
};

exports.getSignupErrors = [
  check("username", "username is required")
    .not()
    .isEmpty()
    .custom(value => !/\s/.test(value))
    .withMessage("username cannot contain spaces")
    .trim()
    .escape(),

  check("email", "A valid email is required")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
  check("password", "A password is required")
    .not()
    .isEmpty()
    .isLength({min: 6})
    .withMessage("Password must be at leat 6 characters")
];

exports.getSignInErrors = ([
  check("email", "A valid email is required")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
  check("password", "A password is required")
    .not()
    .isEmpty()
    .isLength({min: 6})
    .withMessage("Password must be at leat 6 characters")
]);

exports.signinValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array()
    const msgs = errArray.map(error => error.msg)
    return res.status(400).json({error : msgs})
  }
  next();
};
