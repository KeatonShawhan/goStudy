const mysql = require('mysql');
require('dotenv').config({ path: '../.env' });


console.log(`MYSQL_HOST: ${process.env.MYSQL_HOST}`);
console.log(`MYSQL_USER: ${process.env.MYSQL_USER}`);
console.log(`MYSQL_PASS: ${process.env.MYSQL_PASS}`);
console.log(`MYSQL_DB: ${process.env.MYSQL_DB}`);

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
  console.log('Connected successfully to the DB');
});

// Test query to create a table
connection.query(`
CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    test_value VARCHAR(255) NOT NULL
)`, (err, results) => {
  if (err) {
    console.error('An error occurred while creating the table');
    throw err;
  }
  console.log('Table test_table created successfully');
});

connection.end();
