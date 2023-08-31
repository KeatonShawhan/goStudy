const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const http = require('http');
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

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// socket.io live chat that sends new messages into db
io.on('connection', (socket) => {
  console.log('New user connected');

  // Join chat room
  socket.on('join', ({ groupId, userId }) => {
    socket.join(groupId);
    // You can emit a welcome message, save to database, etc.
  });

  // Listen for new chat messages
  socket.on('sendMessage', (message, userId, groupId) => {
    // Save message to database
    db.query(
      'INSERT INTO Messages (content, sent_by, group_id) VALUES (?, ?, ?)',
      [message, userId, groupId],
      (err, results) => {
        if (err) {
          console.log("Error saving message:", err);
          return;
        }

        console.log("Message saved:", results);
      }
    );

    // Emit message to all clients in the same room
    io.to(groupId).emit('message', { user: 'admin', text: message });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User had left');
  });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      console.log("Decoded JWT:", decoded); // debug line
      req.userId = decoded.user_id; // Assign decoded user_id to req object
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

app.post('/api/register', (req, res) => {
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
app.post('/api/login', (req, res) => {
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
    const token = jwt.sign({ user_id: user.user_id }, secret, {
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

// Creating a study group endpoint
app.post('/api/create-study-group', verifyToken, (req, res) => {
  const { group_name, subject } = req.body;
  const created_by = req.userId;  // Obtained from verifyToken middleware

  if (!group_name || !subject) {
    return res.status(400).json({ error: 'Group name and subject are required' });
  }

  db.query(
    'INSERT INTO StudyGroups (group_name, subject, created_by) VALUES (?, ?, ?)',
    [group_name, subject, created_by],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const groupId = results.insertId;

      // Automatically add the creator as an admin in the GroupMembers table
      db.query(
        'INSERT INTO GroupMembers (user_id, group_id, role) VALUES (?, ?, "admin")',
        [created_by, groupId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          return res.status(201).json({ message: 'Study group created', group_id: groupId });
        }
      );
    }
  );
});


// Deleting a study group endpoint
app.delete('/api/delete-study-group/:group_id', verifyToken, (req, res) => {
  const groupId = req.params.group_id;
  const userId = req.userId;  // Obtained from verifyToken middleware

  // First check if the user is an admin of the group
  db.query(
    'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ? AND role = "admin"',
    [userId, groupId],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(403).json({ error: 'You do not have permission to delete this group' });
      }

      // Proceed to delete
      db.query(
        'DELETE FROM StudyGroups WHERE group_id = ?',
        [groupId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.status(200).json({ message: 'Study group deleted' });
        }
      );
    }
  );
});

// Joining a study group endpoint
app.post('/api/join-study-group/:group_id', verifyToken, (req, res) => {
  const groupId = req.params.group_id;
  const userId = req.userId;  // Obtained from verifyToken middleware
  // Check if the user is banned
  db.query(
    'SELECT * FROM BannedMembers WHERE user_id = ? AND group_id = ?',
    [userId, groupId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (results.length > 0) {
        return res.status(403).json({ error: 'You are banned from this group' });
      }
      // First check if the user is already a member of the group
      db.query(
        'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ?',
        [userId, groupId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          
          if (results.length > 0) {
            return res.status(400).json({ error: 'You are already a member of this group' });
          }
          // Proceed to add the user to the group with a 'member' role
          db.query(
            'INSERT INTO GroupMembers (user_id, group_id, role) VALUES (?, ?, "member")',
            [userId, groupId],
            (err, results) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              return res.status(201).json({ message: 'Successfully joined the study group', group_id: groupId });
            }
          );
        }
      );
    }
  );
});

// Listing all usernames in a study group
app.get('/api/list-group-members/:group_id', verifyToken, (req, res) => {
  const groupId = req.params.group_id;
  const userId = req.userId;  // Obtained from verifyToken middleware

  // First, let's check if the user is a member of the group
  db.query(
    'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ?',
    [userId, groupId],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(403).json({ error: 'You are not a member of this group' });
      }

      // If the user is a member, proceed to list all members
      db.query(
        'SELECT Users.username FROM Users ' +
        'JOIN GroupMembers ON Users.user_id = GroupMembers.user_id ' +
        'WHERE GroupMembers.group_id = ?',
        [groupId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          const usernames = results.map(row => row.username);
          return res.status(200).json({ usernames });
        }
      );
    }
  );
});

// Leaving a study group endpoint
app.delete('/api/leave-study-group/:group_id', verifyToken, (req, res) => {
  const groupId = req.params.group_id;
  const userId = req.userId;  // Obtained from verifyToken middleware

  // First check if the user is actually a member of the group
  db.query(
    'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ?',
    [userId, groupId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      if (results.length === 0) {
        return res.status(400).json({ error: 'You are not a member of this group' });
      }

      // Check if the user is an admin
      if (results[0].role === 'admin') {
        return res.status(403).json({ error: 'Admins cannot leave the group without transferring ownership or deleting the group' });
      }

      // Proceed to remove the user from the group
      db.query(
        'DELETE FROM GroupMembers WHERE user_id = ? AND group_id = ?',
        [userId, groupId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          return res.status(200).json({ message: 'Successfully left the study group', group_id: groupId });
        }
      );
    }
  );
});

// Transferring admin role to another user
app.put('/api/transfer-admin/:group_id', verifyToken, (req, res) => {
  const groupId = req.params.group_id;
  const userId = req.userId;  // Obtained from verifyToken middleware
  const newAdminId = req.body.new_admin_id;

  // First, check if the user making the request is an admin of the group
  db.query(
    'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ? AND role = "admin"',
    [userId, groupId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(403).json({ error: 'You are not an admin of this group' });
      }

      // Check if the new admin is already a member of the group
      db.query(
        'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ?',
        [newAdminId, groupId],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (results.length === 0) {
            return res.status(400).json({ error: 'The user you are trying to promote is not a member of this group' });
          }

          // Proceed to update the role of the new admin
          db.query(
            'UPDATE GroupMembers SET role = "admin" WHERE user_id = ? AND group_id = ?',
            [newAdminId, groupId],
            (err, results) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              // Update the role of the old admin to 'member'
              db.query(
                'UPDATE GroupMembers SET role = "member" WHERE user_id = ? AND group_id = ?',
                [userId, groupId],
                (err, results) => {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }

                  return res.status(200).json({ message: 'Admin role transferred successfully', group_id: groupId });
                }
              );
            }
          );
        }
      );
    }
  );
});

// Banning a group member by name
app.delete('/api/ban-member/:group_id', verifyToken, (req, res) => {
  const groupId = req.params.group_id;
  const userId = req.userId;  // Obtained from verifyToken middleware
  const usernameToBan = req.body.username_to_ban;

  // First check if the user is an admin of the group
  db.query(
    'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ? AND role = "admin"',
    [userId, groupId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(403).json({ error: 'You are not an admin of this group' });
      }

      // Proceed to find the user with the given username
      db.query(
        'SELECT user_id FROM Users WHERE username = ?',
        [usernameToBan],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (results.length === 0) {
            return res.status(400).json({ error: 'User not found' });
          }

          const userToBanId = results[0].user_id;
          
          // Proceed to ban the user
          db.query(
            'DELETE FROM GroupMembers WHERE user_id = ? AND group_id = ?',
            [userToBanId, groupId],
            (err, results) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              
              // Add user to banned table
              db.query(
                'INSERT INTO BannedMembers (user_id, group_id) VALUES (?, ?)',
                [userToBanId, groupId],
                (err, results) => {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }
              
                  return res.status(200).json({ message: 'User successfully banned from the group' });
                }
              );
            }
          );
        }
      );
    }
  );
});


// Fetch all messages from the group chat for a specific user
app.get('/api/get-chat/:groupId', verifyToken, (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.userId;  // Obtained from verifyToken middleware

  // First, check if the user is a member of the group
  db.query(
    'SELECT * FROM GroupMembers WHERE user_id = ? AND group_id = ?',
    [userId, groupId],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(403).json({ error: 'You are not a member of this group' });
      }

      const joinedAt = results[0].joined_at;

      // If the user is a member, proceed to fetch all chat messages
      db.query(
        'SELECT Messages.*, Users.username FROM Messages ' +
        'JOIN Users ON Messages.sent_by = Users.user_id ' +
        'WHERE Messages.group_id = ? AND Messages.timestamp >= ? ' +
        'ORDER BY Messages.timestamp',
        [groupId, joinedAt],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          console.log(results);

          // Transform the messages if necessary
          const messages = results.map(row => ({
            message: row.content,
            sentBy: row.username,
            timestamp: row.timestamp
          }));

          return res.status(200).json({ messages });
        }
      );
    }
  );
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
