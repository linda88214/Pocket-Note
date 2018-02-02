const router = require("express").Router();
const passport = require("passport");
const auth = require("../services/auth");
const weatherComment = require("../models/weatherComment.js");
const users = require("../models/users.js");
var moment = require("moment")


router.get('/', (req, res, next) => {
    res.redirect('/login');
});


router.get("/login", (req, res) => {
  res.render("index")
})


router.post('/login', passport.authenticate(
  'local-login', {
    failureRedirect: '/login',
    successRedirect: '/weathercomments'
  }
));


router.post('/', passport.authenticate(
  'local-signup', {
            failureRedirect: '/new',
            successRedirect: '/login'
        }
    )
);


router.get("/new", (req, res) => {
  res.render("signup")
})


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get("/weathercomments/new", auth.restrict, users.findByEmailMiddleware, (req, res) => {
  // res.json(res.locals.userData);
  const date = moment().format("ddd MMM D YYYY");
  res.render("new", {userData: res.locals.userData, time: date});
});


router.get("/weathercomments",auth.restrict, weatherComment.findByUser, users.findByEmailMiddleware, (req, res) => {
  // res.json(res.locals.allWeatherCommentData)
  const date = moment().format("ddd MMM D YYYY");
  res.render("lists", {allWeatherComment: res.locals.userCommentData, user: res.locals.userData, time: date}
    );
})


router.post("/weathercomments", weatherComment.create, weatherComment.allWeatherComment, (req, res) => {
  res.redirect("/weathercomments");
})


router.get("/weathercomments/:weatherCommentId", weatherComment.findById, (req, res, next) => {
  // console.log("+++++++++++++++", res.locals.weatherCommentData)
  res.render("edit", {editcomment: res.locals.weatherCommentData});
});


router.put("/weathercomments/:weatherCommentId", weatherComment.update, (req, res, next) => {
  // console.log('PUT REQUEST')
  res.send(res.locals.updatedWeatherCommentData);
});


router.delete("/weathercomments/:id", weatherComment.destroy, (req, res, next) => {
  // console.log('yo')
  res.json({ id: req.params.id });
});

module.exports = router;
