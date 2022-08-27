const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override"); //*action="/posts/<%= personas['_id'] %>" method="POST"
const session = require("express-session");

//------------RUTAS----------------

const routes = require("./routes/mainRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const userRoutes = require("./routes/userRoutes");
const registerRoutes = require("./routes/registerRoutes");
const logMiddleware = require("./middlewares/logMiddleware");

app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(logMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(methodOverride("_method"));
app.use(session({ secret: "Nuestro mensaje secreto" }));

app.use("/", routes);
app.use(moviesRoutes);
app.use(userRoutes);
app.use(registerRoutes);
app.use((req, res, next) => {
  res.status(404).render("not-found");
});

app.listen(3002, () => {
  console.log("Server Runnig");
});

// app.listen(process.env.PORT || 3002, function () {
//   console.log("Servidor funcionando");
// });
