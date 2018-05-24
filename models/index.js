var mongo = require("mongodb");
var mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/urlshortener", { useMongoClient: true });
// mongoose.connect(process.env.MONGOLAB_URI);
// var db = mongoose.connection;
mongoose.Promise = Promise;

module.exports.Url = require("./url");
