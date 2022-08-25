const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/movies", moviesController.movies);
router.get("/movies/detail/:id", moviesController.detail);

//*editar una pelicula
router.get("/edit/:id", moviesController.edit);
router.put("/edit/:id", moviesController.update);

//Rutas para la creación del CRUD
// router.get("/movies/add", moviesController.create);
// router.post("/movies/create", moviesController.create);

module.exports = router;
