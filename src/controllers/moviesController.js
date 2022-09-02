const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const moviesController = {
  movies: async (req, res) => {
    try {
      let movies = await db.Movie.findAll();
      res.render("movies", { movies });
    } catch (error) {
      console.log(error);
    }
  },

  detail: (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: [{ association: "genre" }, { association: "actors" }],
    })
      .then((detail) => {
        return res.render("detail", { detail });
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },

  edit: (req, res) => {
    const updateMovie = db.Movie.findByPk(req.params.id, {
      include: ["genre"],
    });
    const updateGenre = db.Genre.findAll();

    Promise.all([updateMovie, updateGenre])
      .then(([movie, genre]) => {
        return res.render("edit", { movie, genre });
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },

  update: function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      db.Movie.update(
        { ...req.body, genre_id: req.body.genre },
        { where: { id: req.params.id } }
      )
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => {
          return res.redirect(error);
        });
    } else {
      const updateMovie = db.Movie.findByPk(req.params.id, {
        include: ["genre"],
      });
      const updateGenre = db.Genre.findAll();

      Promise.all([updateMovie, updateGenre])
        .then(([movie, genre]) => {
          return res.render("edit", {
            errors: errors.mapped(),
            old: req.body,
            genre,
            movie,
          });
        })
        .catch((error) => {
          return res.redirect(error);
        });
    }
  },

  delete: function (req, res) {
    db.Movie.findByPk(req.params.id).then((movies) => {
      return res.render("delete", { movies });
    });
  },

  destroy: function (req, res) {
    db.Movie.destroy({ where: { id: req.params.id }, force: true })
      .then(() => {
        return res.redirect("/");
      })
      .catch(() => {
        return res.send(error);
      });
  },

  add: (req, res) => {
    db.Genre.findAll()
      .then((genre) => {
        return res.render("add", { genre });
      })
      .catch((error) => {
        return res.redirect(error);
      });
  },

  create: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const newMovie = {
        ...req.body,
        genre_id: req.body.genre,
      };
      db.Movie.create(newMovie)
        .then(() => {
          return res.redirect("/");
        })
        .catch((error) => {
          return res.redirect(error);
        });
    } else {
      db.Genre.findAll()
        .then((genre) => {
          return res.render("add", {
            errors: errors.mapped(),
            old: req.body,
            genre,
          });
        })
        .catch((error) => {
          return res.redirect(error);
        });
    }
  },
};

module.exports = moviesController;
