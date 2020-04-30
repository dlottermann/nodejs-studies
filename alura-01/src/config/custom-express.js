require("marko/node-require").install();
require("marko/express");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./../app/routes/routes");
const methodOverride = require('method-override');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/estatico',express.static('src/app/public'));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//Parameter app to function routes exports
routes(app);

module.exports = app;
