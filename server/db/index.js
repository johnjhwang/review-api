// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/ReviewAPI');

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ReviewAPI'
});

db.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});


module.exports.db = db;