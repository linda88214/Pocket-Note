const router = require("express").Router();
const passport = require("passport");
const auth = require("../services/auth");
const weatherComment = require("../models/weatherComment.js");
const users = require("../models/users.js");


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
    // passport put this method on req for us
    req.logout();
    // redirect back to index page
    res.redirect('/');
});


router.get("/weathercomments/new", (req, res) => {
  // console.log("hi")
  res.render("new");
});


router.get("/weathercomments", weatherComment.allWeatherComment, (req, res) => {
  // res.json(res.locals.allWeatherCommentData)
  res.render("lists", {allWeatherComment: res.locals.allWeatherCommentData}
    );
})


router.post("/weathercomments", weatherComment.create, weatherComment.allWeatherComment, (req, res) => {
  res.redirect("/weathercomments");
})


router.get("/weathercomments/:weatherCommentId", weatherComment.findById, (req, res, next) => {
  console.log("+++++++++++++++", res.locals.weatherCommentData)
    res.render("edit", {editcomment: res.locals.weatherCommentData});
});


router.put("/weathercomments/:weatherCommentId", weatherComment.update, (req, res, next) => {
    console.log('PUT REQUEST')
    res.send(res.locals.updatedWeatherCommentData);
});


router.delete("/weathercomments/:id", weatherComment.destroy, (req, res, next) => {
  console.log('yo')
    res.json({ id: req.params.id });
});

module.exports = router;
