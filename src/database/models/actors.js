module.exports = (sequelize, dataTypes) => {
  let alias = "Actors";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // created_at: dataTypes.TIMESTAMP,
    // updated_at:dataTypes.TIMESTAMP ,
    first_name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    rating: {
      type: dataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
    favorite_movie_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
    },
  };

  let config = {
    tableName: "actors", //*nombre de la tabla
    timestamps: false, //* fecha de creacion y actualizacion de registros en caso de que no esten
  };

  const Actors = sequelize.define(alias, cols, config);

  return Actors;
};
