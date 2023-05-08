const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: 'peekay',
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE
});
pool.connect();
module.exports = pool


