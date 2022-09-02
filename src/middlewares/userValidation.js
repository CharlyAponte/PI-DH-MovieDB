const { body } = require("express-validator");

module.exports = [
  check("email").isEmail().withMessage("Email invalido"),
  check("pasword")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
];
