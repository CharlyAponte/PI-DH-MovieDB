const { body } = require("express-validator");

module.exports = [
  body("title").notEmpty().withMessage("Tienes que completar el título"),
  body("rating")
    .notEmpty()
    .withMessage("Tienes que colocar el rating de la película"),
  body("awards").notEmpty().withMessage("Debes colocar la cantidad de premios"),
  body("release_date")
    .notEmpty()
    .withMessage("Debes colocar la fecha de estreno"),
  body("length").notEmpty().withMessage("Debes completar la duración"),
];
