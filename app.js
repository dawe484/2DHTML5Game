
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {}; // list of connected players

var io = require('socket.io')(serv, {});
io.sockets.on('connection', (socket) => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
  });

  // console.log('socket connection');

  // socket.on('happy', function(data) {
  //   console.log(`happy because ${data.reason}`);
  // });

  // socket.emit('serverMsg', {
  //   msg: 'Hello'
  // });

});
