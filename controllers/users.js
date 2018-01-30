const User = require('../models/users');
const router = require('express').Router();
const passport = require('passport');

// const controller = require('./controller');
const auth = require('../services/auth');

// ----------------------------------------
// users index

router.get('/', (req, res, next) => {
    res.redirect('/login');
});

router.post(
    '/',
    // we want the behavior of the site to vary depending on whether or
    // not the user is already logged in. If they are not, we want to send
    // them to signup Page.
    passport.authenticate(
        // The following string indicates the particular strategy instance
        // we'll want to use to handle signup. We defined behavior for
        // 'local-signup' back in index.js.
        'local-signup', {
            failureRedirect: '/new',
            successRedirect: '/weathercomments'
        }
    )
);

// ----------------------------------------
// register new user

router.get('/new', (req, res) => {
    res.render('signup');
});

// ----------------------------------------
// user logout

router.get('/logout', (req, res) => {
    // passport put this method on req for us
    req.logout();
    // redirect back to index page
    res.redirect('/');
});

// ----------------------------------------
// user login

router.get('/login', (req, res) => {
    res.render('index');
});

// passport.authenticate will _build_ middleware for us
// based on the 'local-login' strategy we registered with
// passport in auth.js
router.post('/user', passport.authenticate(
    'local-login', {
        failureRedirect: '/login',
        successRedirect: '/weathercomments'
    }
));

module.exports = router;