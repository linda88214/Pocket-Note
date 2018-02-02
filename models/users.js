const bcrypt = require('bcryptjs');
const db = require('../db/index.js');
const users = {};

users.create = function create(user) {
    const passwordDigest = bcrypt.hashSync(user.password, 1);
    return db.oneOrNone(
        'INSERT INTO users (fname, email, password_digest) VALUES ($1, $2, $3) RETURNING *;', [user.fname, user.email, passwordDigest]
    );
};


users.allUsers = (req, res, next) => {
  db
    .manyOrNone("SELECT * FROM users")
    .then(data => {
      res.locals.allUsersData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in users.allUsers. Error:", error);
      next(error);
    });
};

users.findById = (req, res, next) => {
  const id = req.params.userId;
  db
    .one("SELECT * FROM users WHERE users.id = ${id}", { id: id })
    .then(data => {
      res.locals.userIdData = data;
      next();
    })
    .catch(error => {
      console.log("error encountered in users.findById. Error:", error);
      next(error);
    });
};

users.findByEmail = function findByEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);
};

users.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    // console.log('in findByEmailMiddleware');
    const email = req.user.email;
    users
        .findByEmail(email) // here we're using the nonmiddleware version above, getting back a promise
        .then((userData) => {
            res.locals.userData = userData;
            next();
        }).catch(err => console.log('ERROR:', err));
};

module.exports = users;