const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/movies", moviesController.movies);
router.get("/movies/detail/:id", moviesController.detail);

//*editar una pelicula
router.get("/movies/edit/:id", moviesController.edit);
router.put("/movies/edit/:id/update", moviesController.update);

//*Eliminar Pelicula
router.delete("/movies/destroy/:id", moviesController.destroy);

//Rutas para la creación del CRUD
router.get("/movies/add", moviesController.add);
router.post("/movies/create", moviesController.create);

module.exports = router;
