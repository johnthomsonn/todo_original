exports.itemCreationValidation = (req, res, next) => {
  req.check("content", "some content is required").notEmpty();

  const error = req.validationErrors();

  if (error) {
    return res.status(400).json({
      error: error[0].msg
    });
  }
  next();
};
