const path = require("path");

const mainController = {
  index: (req, res) => {
    res.render("index.ejs");
  },
  hola: (req, res) => {
    res.render("hola.ejs");
  },
};

module.exports = mainController;
