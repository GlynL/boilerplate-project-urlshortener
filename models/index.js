var mongo = require("mongodb");
var mongoose = require("mongoose");

mongoose.set("debug", true);
const url = process.env.MONGOLAB_URI || "mongodb://localhost/urlshortener";
mongoose.connect(url, { useMongoClient: true });
// var db = mongoose.connection;
mongoose.Promise = Promise;

module.exports.Url = require("./url");
