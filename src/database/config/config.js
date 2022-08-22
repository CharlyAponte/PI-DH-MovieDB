module.exports = {
  development: {
    username: "root",
    password: "",
    database: "movies_db",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: true, //para que no se muestren las consultas en la consola
  },
  test: {
    username: "root",
    password: "",
    database: "movies_db",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "",
    database: "",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
