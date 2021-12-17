const Promise = require('bluebird');
const mysql = require('mysql2');
const connection = mysql.createPool({ // mysql connection pool with promise
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviewapi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = Promise.promisifyAll(connection, {multiArgs: true});

db.getConnectionAsync()
  .then(() => console.log('Connected to the MySQL server.'))
  .catch(err => console.log(err));


module.exports = db;