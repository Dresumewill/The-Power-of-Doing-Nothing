const { body } = require("express-validator");

exports.leadValidationRules = [
  body("full_name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Full name is required"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email required"),

  body("primary_goal")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Primary goal must be descriptive")
];
