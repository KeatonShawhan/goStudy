const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

const secret = process.env.JWT_SECRET;

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;  // Assuming MySQL runs locally, change if otherwise
const MYSQL_DB = process.env.MYSQL_DB;

const saltRounds = 10;
const PORT = 3001;
const app = express();
app.use(express.json()); // For parsing application/json

app.use(bodyParser.json());

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.userId = decoded.id; // Assign decoded id to req object
      next();
    });
  } else {
    res.status(403).json({ message: 'No token provided' });
  }
};

// Create a MySQL connection pool
const db = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/register', (req, res) => {
  console.log(req.body);
  const { username, password, email, major } = req.body;

  // Validate the data here as necessary

  db.query('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Bcrypt hashing error:", err);
        return res.status(500).json({ error: 'Failed to hash password' });
      }

      // Insert the new user
      db.query(
        'INSERT INTO Users (username, password, email, major) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, email, major],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.status(201).json({ message: 'User created', user_id: results.insertId });
        }
      );
    });
  });
});


// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password are required',
    });
  }

  // Check for existing user
  db.query('SELECT * FROM Users WHERE username = ?', [username], async (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.status(401).json({
        error: 'Username or Password is incorrect',
      });
    }

    const user = results[0];

    // Generate JWT Token
    const token = jwt.sign({ user_id: user.user_id }, 'yourSecretKey', {
      expiresIn: '8h',
    });

    // Update last_login
    db.query('UPDATE Users SET last_login = NOW() WHERE user_id = ?', [user.user_id], (error, results) => {
      if (error) {
        console.log(error);
      }
    });

    // Return token to client
    res.status(200).json({
      token,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
