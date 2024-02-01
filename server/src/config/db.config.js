const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_DATABASE,
    port:process.env.DB_PORT
});

const database=pool.promise();
module.exports = database