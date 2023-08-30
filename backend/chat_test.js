const io = require('socket.io-client');

// Connect to server
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server.');

  // Add additional event handlers here. For example:
  socket.emit('join', { groupId: 1, userId: 2 });  // userId 2 is joining groupId 1
  
  // To send a message:
  socket.emit('sendMessage', 'Message 2!', 2, 1);  // send 'Message 2!' to groupId 1 from userId 2

  // To receive a message:
  socket.on('message', (message) => {
    console.log('Received message:', message);
  });
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});
