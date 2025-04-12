const express = require('express');
const router = require('./routers');
const basicErrorHendler = require("./middlewares/errors/basic.mw");
const tokenErrorHendler = require("./middlewares/errors/tokenError.mw");


const app = express();

app.use(express.json());
app.use(router);
app.use(tokenErrorHendler);
app.use(basicErrorHendler);


module.exports.app = app;