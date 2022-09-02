const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/movies", moviesController.movies);
router.get("/movies/detail/:id", moviesController.detail);

// Middelware
const validations = require("../middlewares/ValidateCreateAndEdit");
const admin = require("../middlewares/admRoute");

//Rutas para la creación del CRUD

//*editar una pelicula
router.get("/movies/edit/:id", admin, moviesController.edit);
router.put("/movies/edit/:id", [admin, validations], moviesController.update);

//*Eliminar Pelicula
router.get("/movies/delete/:id", admin, moviesController.delete);
router.delete(
  "/movies/delete/:id",
  [admin, validations],
  moviesController.destroy
);

//*Crear Pelicula
router.get("/movies/add", admin, moviesController.add);
router.post("/movies/create", [admin, validations], moviesController.create);

module.exports = router;
