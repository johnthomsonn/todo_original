const {check, validationResult} = require("express-validator/check");

exports.getItemCreationErrors = (
  [
    [
      check("content", "You need to do something")
      .not()
      .isEmpty()
      .trim()
      .custom(value => !/[<>\\]/.test(value))
      .withMessage("Todo cannot contain certain special characters")
    ]
  ]
)
exports.itemCreationValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array()
    const msgs = errArray.map(error => error.msg)
    return res.status(400).json({error : msgs})
  }
  next();
};
