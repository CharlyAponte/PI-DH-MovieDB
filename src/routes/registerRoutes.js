const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const { check } = require("express-validator");

// Validaciones

const validateForm = [
  check("nombre").notEmpty().withMessage("Debes ingresar tu nombre."),
  check("apellido").notEmpty().withMessage("Debes ingresar tu apellido."),
  check("mail").isEmail().withMessage("La direccion de email no es valida"),
  check("password").notEmpty().withMessage("Elige tu contraseña"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  check("confPassword").notEmpty().withMessage("Debes confirmar la contraseña"),
  check("confPassword")
    .isLength({ min: 6 })
    .withMessage(
      "La confirmacion de la contraseña debe tener al menos 6 caracteres"
    ),
];

router.get("/register", registerController.register);
router.post("/", validateForm, registerController.store);

module.exports = router;
