// ====================SETUP=================== //

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const dotenv = require('dotenv').config();
const authObject = require('./services/auth')
const app = express();
const port = process.env.PORT;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
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
app.use('/users', mainRouter);

// Set up error handling middleware (notice that this is the LAST thing we do)
app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});


app.listen(port, () => { console.log("Server started on " + port); });