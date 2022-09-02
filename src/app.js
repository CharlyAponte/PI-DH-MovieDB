const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const autentication = require("./middlewares/autentication");

const app = express();

//------------RUTAS----------------

const routes = require("./routes/mainRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const userRoutes = require("./routes/userRoutes");
const registerRoutes = require("./routes/registerRoutes");
const logMiddleware = require("./middlewares/logMiddleware");

app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(logMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "Nuestro mensaje secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(autentication);

app.use("/", routes);
app.use(moviesRoutes);
app.use(userRoutes);
app.use(registerRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.status(404).render("not-found");
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3001, () => {
  console.log("Server Runnig");
});

// app.listen(process.env.PORT || 3002, function () {
//   console.log("Servidor funcionando");
// });
