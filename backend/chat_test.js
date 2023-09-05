const io = require('socket.io-client');

// Connect to server
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server.');

  // Add additional event handlers here. For example:
  socket.emit('join', { groupId: 1, userId: 1 });  // userId 1 is joining groupId 1
  
  // To send a message:
  socket.emit('sendMessage', 'Message 2!', 1, 1);  // send 'Message 2!' to groupId 1 from userId 1

  // To receive a message:
  socket.on('message', (message) => {
    console.log('Received message:', message);
  });
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});
