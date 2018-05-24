"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

var cors = require("cors");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/urlshortener", { useMongoClient: true });
var db = mongoose.connection;
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.Promise = Promise;

var Schema = mongoose.Schema;
var urlSchema = new Schema({
  url: {
    type: String,
    required: "url cannot be blank"
  },
  short_url: {
    type: Number
  }
});

var Url = mongoose.model("Url", urlSchema);

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

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/urls", function(req, res) {
  Url.find(function(err, urls) {
    res.json(urls);
  });
});

app.post("/api/shorturl/new", function(req, res) {
  let count;
  let newUrl = req.body;

  Url.findOne({ url: req.body.url }, function(err, site) {
    if (site) {
      console.log(site);
      // res.json(site);
    }
  });

  Url.find(function(err, urls) {
    count = Object.keys(urls).length + 1;
  })
    .then(() => (newUrl.short_url = count))
    .then(() =>
      Url.create(newUrl, (err, post) => {
        console.log(`newUrl: ${newUrl}, post: ${post}`);
        res.json(post);
      })
    )
    .catch(err => res.send(err));
});

app.get("/api/shorturl/:code", function(req, res) {
  let code = req.params.code;
  Url.findOne({ short_url: code })
    .then(url => res.redirect(url.url))
    .catch(err =>
      res.send(`This shortcode (${code}) doesn't exist. Please try again.`)
    );
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});
