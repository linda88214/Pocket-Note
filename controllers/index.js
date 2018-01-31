const router = require("express").Router();
const users = require("../models/users.js");
const weatherComment = require("../models/weatherComment.js")

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/login", (req, res) => {
  res.render("index")
})

router.get("/new", (req, res) => {
  res.render("signup")
})

router.get("/weathercomments/new", (req, res) => {
  console.log("hi")
  res.render("new");
});

// router.post("/weathercomments/new", weatherComment.create, (req, res) => {
//     res.json({ id: res.locals.newWeatherData, body: req.body });
// });

router.get("/weathercomments", weatherComment.allWeatherComment, (req, res) => {
  // res.json(res.locals.allWeatherCommentData)
  res.render("lists", {allWeatherComment: res.locals.allWeatherCommentData}
    );
})

router.post("/weathercomments", weatherComment.create, weatherComment.allWeatherComment, (req, res) => {
  res.render("lists", {allWeatherComment: res.locals.allWeatherCommentData});
})

router.get("/weathercomments/:weatherCommentId", weatherComment.findById, (req, res, next) => {
  console.log("wth")
    res.render("edit");
});

router.put("/weathercomments/:weatherCommentId", weatherComment.update, (req, res, next) => {
    res.send(res.locals.updatedWeatherCommentData);
});

router.delete("weathercomments/delete/:weatherCommentId", weatherComment.destroy, (req, res, next) => {
    res.json({ id: req.params.id });
});

module.exports = router;
