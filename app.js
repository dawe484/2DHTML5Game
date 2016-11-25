'use strict'

let mongojs = require("mongojs");
let db = mongojs('localhost:27017/2DHTML5Game', ['account']); // specified all collections in db !!

let express = require('express');
let app = express();
let serv = require('http').Server(app);

let colors = require('colors/safe');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server running...");

let SOCKET_LIST = {};
let PLAYER_LIST = {}; // list of connected players
let onlinePlayers = 0;
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

  onConnect(socket) {
    onlinePlayers++;
    console.log(colors.green('>'), 'Player:', socket.id, 'connected.',
      colors.yellow('\tOnline:'), onlinePlayers, 'players.');
  }

  onDisconnect(socket) {
    onlinePlayers--;
    console.log(colors.red('<'), 'Player:', socket.id, 'disconnected.',
      colors.yellow('\tOnline:'), onlinePlayers, 'players.');
  }
}

let USERS = {
  // username::password
  'david':'david',
  'tomas':'tomas',
  'admin':'admin'
}

let isValidPassword = (data, callback) => {
  db.account.find({username:data.username, password:data.password}, (error, result) => {
    // find every account in db
    if (result.length > 0) // check if in db are any accounts
      callback(true);
    else
      callback(false);
    // callback(USERS[data.username] === data.password);
  });
}

let isUsernameTaken = (data, callback) => {
  db.account.find({username:data.username}, (error, result) => {
  // find every account with username in db and check if the username exists in db
  if (result.length > 0)
    callback(true);
  else
    callback(false);
    //callback(USERS[data.username]);
  });
}

let addUser = (data, callback) => {
  // insert a new user into the db
  db.account.insert({username:data.username, password:data.password}, (error) => {
    callback();
  });
}

let io = require('socket.io')(serv, {});
io.sockets.on('connection', (socket) => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  // console.log('socket connection:');

  let player = new Player(socket.id);

  socket.on('signIn', (data) => {
    isValidPassword(data, (res) => {
      if (res) {
        // PLAYER_LIST[socket.id] = player;
        // Player.onConnect(socket);
        //let player = new Player(socket.id);
        PLAYER_LIST[socket.id] = player;
        player.onConnect(socket);
        socket.emit('signInResponse', {success:true});
      } else {
        socket.emit('signInResponse', {success:false});
      }
    });
  });

  socket.on('signUp', (data) => {
    isUsernameTaken(data, (res) => {
      if (res) {
        socket.emit('signUpResponse', {success:false});
      } else {
        addUser(data, () => {
          socket.emit('signUpResponse', {success:true});
        });
      }
    });
  });

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    player.onDisconnect(socket);
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
