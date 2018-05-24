var db = require("../models");

exports.hello = (req, res) => res.json({ greeting: "hello API" });

exports.removeUrls = (req, res) =>
  db.Url.remove({}, (err, response) => res.send("all urls removed"));

exports.getUrls = (req, res) => db.Url.find((err, urls) => res.json(urls));

exports.newUrl = function(req, res) {
  let newSite = req.body;
  checkUrl(req.body);

  function checkUrl(newSite) {
    db.Url.findOne({ url: newSite.url }, function(err, site) {
      if (site) return res.json(site);
      if (err) return res.send("sorry there was an error");
      createUrl();
    });
  }

  function createUrl() {
    db.Url.find(function(err, urls) {
      newSite.short_url = Object.keys(urls).length + 1;
    })
      .then(() => db.Url.create(newSite, (err, site) => res.json(site)))
      .catch(err => res.send("Sorry there was an error"));
  }
};

exports.shortUrl = function(req, res) {
  let code = req.params.code;
  db.Url.findOne({ short_url: code })
    .then(url => res.redirect(url.url))
    .catch(err =>
      res.send(`This shortcode (${code}) doesn't exist. Please try again.`)
    );
};
