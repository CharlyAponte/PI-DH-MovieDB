const express = require("express");
const path = require("path");
const app = express();
// const methodOverride = require("method-override");  action="/posts/<%= personas['_id'] %>" method="POST"

const routes = require("./routes/mainRoutes");
const moviesRoutes = require("./routes/moviesRoutes");

app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(express.static("./public"));

app.use("/", routes);
app.use(moviesRoutes);

app.listen(3002, () => {
  console.log("Server Runnig");
});

// app.listen(process.env.PORT || 3002, function () {
//   console.log("Servidor funcionando");
// });
