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

router.post("/weathercomments/new", weatherComment.create, (req, res) => {
    res.json({ id: res.locals.newWeatherData, body: req.body });
});

router.get("/weathercomments", weatherComment.allWeatherComment, weatherComment.create, (req, res) => {
  res.render("lists", {allWeatherComment: res.locals.allWeatherCommentData});
})

router.post("/weathercomments", weatherComment.create, (req, res) => {
  res.render("lists");
})






module.exports = router;
