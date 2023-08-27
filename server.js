const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Serve static files (optional)
app.use(express.static(__dirname + '/public'));

// Set up connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming message event
  socket.on('message', (data) => {
    console.log('Received message:', data);
    
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
