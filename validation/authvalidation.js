exports.signupValidation = (req,res,next) => {
  //check username is not null
  req.check('username', 'username is required').notEmpty();

  //check email is not null, is valid format and suitable length
  req.check('email', 'email is required').notEmpty()
  .matches(/.+\@.+\..+/)
  .withMessage('must be a valid format (containing @ and .)')
  .isLength({
    min : 5
  })
  .withMessage('must be a minumum of 5 characters');


  //check password is not null and minimum length of 6
  req.check('password', 'password is required').notEmpty()
  .isLength({min:6})
  .withMessage('password must be a minumum of 6 characters');

  const errors = req.validationErrors();
  const errormsgs = [];
  /*
  if (errors) {
    const firstErr = errors.map((error) => error.msg)[0];
    return res.status(400).json({
      error: firstErr
    });
  }
*/

  if(errors)
  {
    errors.map(error => errormsgs.push({field : error.param, message: error.msg}))
    return res.status(400).json({
      error: errormsgs
    })
  }


//proceed to next middleware
  next();

}

exports.signinValidation = (req,res,next) =>{
  //check email is not null, is valid format and suitable length
  req.check('email', 'email is required').notEmpty()
  .matches(/.+\@.+\..+/)
  .withMessage('must be a valid format (containing @ and .)')
  .isLength({
    min : 5
  })
  .withMessage('must be a minumum of 5 characters');


  //check password is not null and minimum length of 6
  req.check('password', 'password is required').notEmpty()
  .isLength({min:6})
  .withMessage('password must be a minumum of 6 characters');

  const errors = req.validationErrors();
  const errormsgs = [];

  if(errors)
  {
    errors.map(error => errormsgs.push({field : error.param, message: error.msg}))
    return res.status(400).json({
      error: errormsgs
    })
  }
  next();
}
