const path = require("path");

const moviesController = {
  movies: (req, res) => {
    res.render(path.resolve(__dirname, "../views/movies.ejs"));
  },
};
module.exports = moviesController;
