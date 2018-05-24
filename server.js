"use strict";

var express = require("express");
var cors = require("cors");
var urlRoutes = require("./routes/urls");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api", urlRoutes);

app.listen(port, function() {
  console.log("Node.js listening ...");
});
