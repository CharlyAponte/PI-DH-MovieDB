const db = require("../database/models");
const bcrypt = require("bcryptjs");
const sequelize = db.sequelize;
const registerController = {
  register: (req, res) => {
    return res.render("register");
  },

  processRegister: (req, res) => {
    const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    db.User.create(newUser)
      .then(() => {
        return res.redirect("login");
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },
};

module.exports = registerController;
