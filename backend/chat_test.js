const io = require('socket.io-client');

// Connect to server
const socket = io('http://localhost:3001');

// Handle connection
socket.on('connect', () => {
  console.log('Connected to server.');

  // Add additional event handlers here. For example:
  socket.emit('join', { groupId: 1, username: 'TestUser' });
  
  // To send a message:
  socket.emit('sendMessage', 'Message 2!', 1);

  // To receive a message:
  socket.on('message', (message) => {
    console.log('Received message:', message);
  });
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});
