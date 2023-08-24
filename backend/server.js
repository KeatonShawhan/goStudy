const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');  // Import the promise version for async/await support
require('dotenv').config({ path: '../.env' });

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const MYSQL_HOST = process.env.MYSQL_HOST;  // Assuming MySQL runs locally, change if otherwise
const MYSQL_DB = process.env.MYSQL_DB;

const app = express();
app.use(cors());

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Example of how to use the connection to query the database
app.get('/', (req, res) => {
    res.send('GoStudy Server is running!');
});

app.get('/test', async (req, res) => {
    try {
        const [rows, fields] = await pool.execute(`DESCRIBE Users;`);  // Replace `some_table` with a table name in your database
        res.json(rows);
    } catch (error) {
        console.error("Error querying MySQL: ", error);
        res.status(500).send("Internal Server Error");
    }
});
