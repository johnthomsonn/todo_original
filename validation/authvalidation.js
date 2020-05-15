const {check, validationResult} = require("express-validator/check");

exports.signupValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }
  next();

  /*
  if (errors) {
    const firstErr = errors.map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstErr
    });
  }


//proceed to next middleware
  next();
*/
};

exports.getSignupErrors = [
  check("username", "username is required")
    .not()
    .isEmpty()
    .custom(value => !/\s/.test(value))
    .withMessage("username cannot conotain spaces")
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
    return res.status(422).json({error: errors.array()});
  }
  next();
};
