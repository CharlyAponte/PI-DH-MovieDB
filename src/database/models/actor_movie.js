module.exports = (sequelize, dataTypes) => {
  let alias = "Actor_Movie";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actor_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
    },
    movie_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
    },
  };

  let config = {
    tableName: "actor_movie", //*nombre de la tabla
    timestamps: false, //* fecha de creacion y actualizacion de registros en caso de que no esten
  };
  const Actor_Movie = sequelize.define(alias, cols, config);

  return Actor_Movie;
};
