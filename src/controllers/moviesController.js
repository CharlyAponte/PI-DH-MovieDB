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
      let movieActors = [];
      //con los ids de los actores voy a la tabla de actores para obtener su informacion especifica
      for (let i = 0; i < actorsIds.length; i++) {
        //Por cada id de actor obtengo sus datos
        let actor = await db.Actors.findByPk(actorsIds[i].actor_id);
        //guardo los datos del actor en la siguiente lista
        movieActors.push(actor);
      }

      res.render("detail", { detail, genres, movieActors });
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      const edition = await db.Movie.findByPk(req.params.id, {
        include: { all: true },
      });
      const genresEdit = await db.Genre.findAll();
      const actorsEdit = await db.Actors.findAll();
      res.render("edit", { edition, genresEdit, actorsEdit });
    } catch (error) {}
  },

  update: async (req, res) => {
    try {
      let movieUpdate = await db.Movie.update(
        {
          title: req.body.title,
          rating: req.body.rating,
          awards: req.body.awards,
          release_date: req.body.release_date,
          length: req.body.length,
          genre_id: req.body.genre,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.redirect("/movies/detail/" + req.params.id);
    } catch (error) {
      console.log(error);
    }
  },

  destroy: async (req, res) => {
    console.log("------------------------------" + req.params.id);
    let movieDelete = await db.Movie.destroy({
      where: {
        id: req.params.id,
      },
    });

    // console.log("borre: " + movieDelete);

    res.redirect("/movies");
  },
  add: async function (req, res) {
    let actores = await db.Actors.findAll();
    let generos = await db.Genre.findAll();
    return res.render("add", { actores, generos });
  },

  create: async function (req, res) {
    db.Movie.create({
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
      genre_id: req.body.genre_id,
    }).then((movie) => {
      res.redirect("/movies", { movie, actors, genres });
    });
  },
};

module.exports = moviesController;
