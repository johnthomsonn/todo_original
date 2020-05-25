const {check, validationResult} = require("express-validator/check");

exports.getListCreationErrors = (
  [
    check("name", "The list name is required")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom(value => !/[\d]/.test(value))
    .withMessage("list name cannot contain numbers")
  ]
)

exports.listCreationValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array()
    const msgs = errArray.map(error => error.msg)
    return res.status(400).json({error : msgs})
  }
  next();
};
