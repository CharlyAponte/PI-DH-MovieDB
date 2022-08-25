const db = require("../database/models");
const sequelize = db.sequelize;
const moviesController = {
  movies: async (req, res) => {
    try {
      await db.Movie.findAll().then((movies) => {
        res.render("movies.ejs", { movies });
      });
    } catch (error) {
      console.log(error);
    }
  },

  detail: async (req, res) => {
    try {
      //primer paso obtengo detalles de las pelis
      let detail = await db.Movie.findByPk(req.params.id);
      detail = detail.dataValues;

      // con el id obtenido del detalle consulto el genero al cual pertenece
      let genres = await db.Genre.findByPk(detail.genre_id);
      //con el id obtenido del detalle obtengo la LISTA de ids de actoreS
      let actorsIds = await db.Actor_Movie.findAll({
        where: {
          movie_id: detail.id,
        },
      });
      console.log(actorsIds[0].actor_id);
      let movieActors = [];
      //con los ids de los actores voy a la tabla de actores para obtener su informacion especifica
      for (let i = 0; i < actorsIds.length; i++) {
        //Por cada id de actor obtengo sus datos
        let actor = await db.Actors.findByPk(actorsIds[i].actor_id);
        //guardo los datos del actor en la siguiente lista
        movieActors.push(actor);
      }

      console.log("La peli id es:" + detail.id);
      console.log("Los actores son: ");
      console.log(movieActors);

      res.render("detail", { detail, genres });
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      let idMovie = req.params.id;
      const editMovie = await db.Movie.findByPk(idMovie, {
        include: { all: true },
      });
      console.log(editMovie);
      const allGenres = await Genre.findAll();
      const allActors = await Actor.findAll();
      res.render("/movies/edit", { editMovie, allGenres, allActors });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      let idMovie = req.params.id;
      const updateMovie = await db.Movie.findByPk(idMovie, {
        include: { all: true },
      });
      await updateMovie.removeActor(idMovie.actor);
      await updateMovie.addActor(req.body.actor);
      await updateMovie.update(req.body);
      res.redirect("/movies/list");
    } catch (error) {
      console.log(error);
    }
  },
  // create: function (req, res) {
  //   db.Movie.findAll().then((Movie) => {
  //     return res.render("create");
  //   });
  // },

  // create: function (req, res) {
  //   db.Movie.create({
  //     created_at: req.body.created_at,
  //     updated_at: req.body.updated_at,
  //     title: req.body.title,
  //     rating: req.body.rating,
  //     awards: req.body.awards,
  //     release_date: req.body.release_date,
  //     length: req.body.length,
  //     genre_id: req.body.genre_id,
  //   }).then((movie) => {
  //     res.redirect("/movies", { movie });
  //   });
  // },
};

module.exports = moviesController;
