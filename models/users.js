const bcrypt = require('bcryptjs');
const db = require('../db/index.js');
const users = {};

// Note that this is NOT middleware!
users.create = function create(user) {
    // This is where we obtain the hash of the user's password.
    const passwordDigest = bcrypt.hashSync(user.password, 1);
    // Generally we try to avoid passing promises around, but here 
    // LocalStrategy's interface means we can't just rely on next() 
    // to glide us to the next thing we want to do. So we'll return the callback.
    // To see how it's used, see passport.use('local-strategy', ...) in services/auth.js
    // Anyway, here we make an entry in the database for the new user. We set the counter to 0 initially.
    // We do NOT store the password in the database!
    // Instead we store the password digest, which is a salted hash of the password.
    // If someone grabs the password digest it won't tell them what the password is,
    // but we can use the password digest to verify if a submitted password is correct.
    // This is the magic of hashes.
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
    console.log('in findByEmailMiddleware');
    const email = req.users.email;
    users
        .findByEmail(email) // here we're using the nonmiddleware version above, getting back a promise
        .then((userData) => {
            res.locals.userData = userData;
            next();
        }).catch(err => console.log('ERROR:', err));
};

module.exports = users;