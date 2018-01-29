const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'pocket_note',
    user: 'express',
    password: 'pass'
};

const db = pgp(cn);

module.exports = db;