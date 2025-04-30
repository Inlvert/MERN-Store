const express = require("express");
const cors = require("cors");
const router = require("./routers");
const basicErrorHendler = require("./middlewares/errors/basic.mw");
const tokenErrorHendler = require("./middlewares/errors/tokenError.mw");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("public"))
app.use(router);
app.use(tokenErrorHendler);
app.use(basicErrorHendler);

module.exports = app;
