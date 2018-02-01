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
      console.log("error encountered in weatherComment.allWeatherComment. Error:", error);
      next(error);
    });
};

weatherComment.findById = (req, res, next) => {
  const id = req.params.weatherCommentId;
  db
    .one("SELECT * FROM weather WHERE weather.id = ${id}", { id: id })
    .then(data => {
      res.locals.weatherCommentData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in weather.findById. Error:", error);
      next(error);
    });
};

weatherComment.create = (req, res, next) => {
console.log(req.body)
  db
    .one(
      "INSERT INTO weather (zip, weather, commentday, comment) VALUES ($1, $2, $3, $4) RETURNING id;",
      [
        req.body.zip,
        req.body.weather,
        req.body.commentday,
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

weatherComment.update = (req, res, next) => {
  // console.log("-------------------------")
  // console.log("in weatherComment.update. req.body: ", req.body);
  const commentId = req.params.weatherCommentId;
  db
    .one(
      "UPDATE weather SET zip = $1, weather = $2, commentday = $3, comment = $4 WHERE id = $5 RETURNING *;",
      [
        req.body.zip,
        req.body.weather,
        req.body.commentday,
        req.body.comment,
        commentId
      ]
    )
    .then(data => {
      res.locals.updatedWeatherCommentData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in weatherComment.update. Error:", error);
      next(error);
    });
};

weatherComment.destroy = (req, res, next) => {
  console.log(req.params.id)
  db
    .none("DELETE FROM weather WHERE id = $1", [req.params.id])
    .then(() => {
      next();
    })
    .catch(error => {
      console.log("error encountered in weatherComment.destroy. error:", error);
      next(error);
    });
};


module.exports = weatherComment;
