// ====================SETUP=================== //

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const moment = require('moment');
// const todosRouter = require('/controllers/todos');

const app = express();
const port = process.env.PORT || 3000;

const authObject = require('./services/auth')

// registers the template engine for use in res.render
app.engine('html', mustacheExpress());
// sets the file extension to use for views when the file extension is omitted
app.set('view engine', 'html');
// sets the the directory that will contain our mustache template files, or "views"
app.set('views', __dirname + '/views');
// sets the directory that will contain our static (not generated on the fly) resources, such as css, client-side Javascript files, and images
app.use(express.static(__dirname + '/public'));

// set up session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authObject.passportInstance);
app.use(authObject.passportSession);

const mainRouter = require('./controllers/index.js');
app.use('/', mainRouter);

const usersRouter = require('./controllers/users.js');
app.use('/users', usersRouter);

// Set up error handling middleware (notice that this is the LAST thing we do)
app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});


app.listen(port, () => { console.log("Server started on " + port); });