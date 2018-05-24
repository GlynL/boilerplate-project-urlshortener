var mongoose = require("mongoose");

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

module.exports = Url;
