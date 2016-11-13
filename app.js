'use strict'

let express = require('express');
let app = express();
let serv = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server running...");

let SOCKET_LIST = {};
let PLAYER_LIST = {}; // list of connected players
/*
let Player = (id) => {
  let self = {
    id: id
  }

  Player.list[id] = self;
  return self;
}

Player.list = {};

Player.onConnect = (socket) => {
  let player = Player(socket.id);
}

Player.onDisconnect = (socket) => {
  delete Player.list[socket.id];
}
*/

class Player {
  constructor(id) {
    this.id = id;
  }
}

let io = require('socket.io')(serv, {});
io.sockets.on('connection', (socket) => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  // console.log('socket connection:');

  // PLAYER_LIST[socket.id] = player;
  //Player.onConnect(socket);
  let player = new Player(socket.id);
  PLAYER_LIST[socket.id] = player;
  console.log('player', player, 'connect');

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    console.log('player', player, 'disconnect');
    // Player.onDisconnect(socket);
    //player.onDisconnect(socket.id);
  });


  // socket.on('happy', function(data) {
  //   console.log(`happy because ${data.reason}`);
  // });

  // socket.emit('serverMsg', {
  //   msg: 'Hello'
  // });

});
