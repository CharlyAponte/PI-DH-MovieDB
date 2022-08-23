const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const moviesController = {
  movies: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("movies.ejs", { movies });
    });
  },
};
module.exports = moviesController;
