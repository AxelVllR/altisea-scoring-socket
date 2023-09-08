const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
   }
});

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');

  // Gérez les événements ici
  socket.on('message', (data) => {
    console.log('Message reçu : ', data);
    // Envoyez le message à tous les clients connectés
    io.emit('message', data);
  });

  socket.on('competition', (data) => {
    console.log('Competition reçue : ', data);
    // Envoyez le message à tous les clients connectés
    io.emit('competition', data);
  });

  socket.on('wod', (data) => {
    console.log('Wod reçu : ', data);
    // Envoyez le message à tous les clients connectés
    io.emit('wod', data);
  });

  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté');
  });
});

server.listen(3000, () => {
  console.log('Altisea Scoring Socket écoute sur le port 3000');
});