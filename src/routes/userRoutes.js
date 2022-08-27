const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

router.get("/login", userController.login);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email invalido"),
    check("pasword")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
  ],
  userController.processLogin
);

module.exports = router;
