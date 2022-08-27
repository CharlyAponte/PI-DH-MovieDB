const fs = require("fs");
const { nextTick } = require("process");

function logMiddleware(req, res, next) {
  fs.appendFileSync("log.txt", "Se ingreso en la pagina" + req.url);
  next();
}

module.exports = logMiddleware;
