const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (optional, if you have any)
app.get('/', (req, res) => {
  app.use(express.static(__dirname + "/public"));
});
//app.use(express.static(__dirname + '/public'));
// Listen for socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // Listen for incoming messages
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection

});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000/ ${PORT}`);
});

