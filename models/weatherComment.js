const db = require("../db/index.js");
const axios = require("axios");
const weatherComment = {};

weatherComment.allWeatherComment = (req, res, next) => {
  db
    .manyOrNone("SELECT * FROM weather")
    .then(data => {
      res.locals.allWeatherCommentData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in weatherComment.allUsers. Error:", error);
      next(error);
    });
};

weatherComment.findById = (req, res, next) => {
  const id = req.params.usersId;
  db
    .one("SELECT * FROM weather WHERE weather.id = ${id}", { id: id })
    .then(data => {
      res.locals.userData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in weather.findById. Error:", error);
      next(error);
    });
};

weatherComment.create = (req, res, next) => {
  db
    .one(
      "INSERT INTO weather (zip, weather, commentDay, comment) VALUES ($1, $2, $3, $4) RETURNING id;",
      [
        req.body.zip,
        req.body.weather,
        req.body.commentDay,
        req.body.comment
      ]
    )
    .then(data => {
      res.locals.newWeatherCommentId = data.id;
      next();
    })
    .catch(error => {
      console.log("error encountered in weatherComment.create. Error:", error);
      next(error);
    });
};

module.exports = weatherComment;
