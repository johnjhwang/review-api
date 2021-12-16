// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/ReviewAPI');
require('dotenv').config()
const Promise = require('bluebird');
const mysql = require('mysql2');
const connection = mysql.createPool({ // mysql connection pool with promise
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = Promise.promisifyAll(connection, {multiArgs: true});

db.getConnectionAsync()
  .then(() => console.log('Connected to the MySQL server.'))
  .catch(err => console.log(err));


module.exports = db;