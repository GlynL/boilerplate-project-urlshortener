var express = require("express");
var db = require("../models");
var helpers = require("../helpers/urls");

var app = express();

// your first API endpoint...
app.get("/hello", helpers.hello);

app.get("/urls/removeall", helpers.removeUrls);

app.get("/urls", helpers.getUrls);

app.post("/shorturl/new", helpers.newUrl);

app.get("/shorturl/:code", helpers.shortUrl);

module.exports = app;
