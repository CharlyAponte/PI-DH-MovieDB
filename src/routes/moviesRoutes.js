const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/movies", moviesController.movies);

module.exports = router;
