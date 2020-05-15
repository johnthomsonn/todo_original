const {check, validationResult} = require("express-validator/check");

exports.getListCreationErrors = (
  [
    check("name", "The list name is required")
    .not()
    .isEmpty()
    .trim()
    .escape()
  ]
)

exports.listCreationValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  }
  next();
};
