const path = require("path");

const mainController = {
  index: (req, res) => {
    res.render(path.resolve(__dirname, "../views/index.ejs"));
  },
  register: (req, res) => {
    res.render(path.resolve(__dirname, "../views/register.ejs"));
  },

  login: (req, res) => {
    res.render(path.resolve(__dirname, "../views/login.ejs"));
  },
};

module.exports = mainController;
