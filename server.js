"use strict";

var express = require("express");
var cors = require("cors");
var urlRoutes = require("./routes/urls");

var app = express();

// Basic Configuration
var PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(cors({ optionSuccessStatus: 200 }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api", urlRoutes);

app.listen(PORT, function() {
  console.log("Node.js listening ...");
});
