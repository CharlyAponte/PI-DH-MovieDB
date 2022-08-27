const db = require("../database/models");
const userController = {
  login: (req, res) => {
    res.render("login.ejs");
  },

  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
    } else {
      return res.render("login", { errors: errors.errors });
    }
  },

  register: (req, res) => {
    res.render("register.ejs");
  },
};

module.exports = userController;
