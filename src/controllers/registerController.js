const db = require("../database/models");
const registerController = {
  register: (req, res) => {
    res.render("register.ejs");
  },

  store: (req, res) => {
    let user = req.body;
    userId = usersModel.create(user);
    res.redirect("/login" + userId);
  },
};

module.exports = registerController;
