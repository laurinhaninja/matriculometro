const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require('path')


app.use(morgan("dev")); // ler cada rota acessada
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../pages/views"));
app.use(express.static(path.join(__dirname, "../pages/public")));

module.exports = app
