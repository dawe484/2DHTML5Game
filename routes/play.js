'use strict';

const colors = require('colors/safe');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Play Game
// router.get('/', isLoggedIn, (req, res) => {
//   res.render('play', { layout: false, title: 'Magical Heroes' });
// });

let playerName;

// router.get('/:userUrlName', isLoggedIn, (req, res) => {
router.get('/:userUrlName', (req, res) => {
  playerName = req.params.userUrlName;

  User.getUserByUsername(req.params.userUrlName, (err, user) => {
    if (err) throw err;
    if (user.avatar[0].playerStatus != 'online') {
      user.avatar[0].playerStatus = 'online';
      user.save();
    }
    res.render('play', { layout: false, title: 'Magical Heroes', userUrlName: req.params.userUrlName });
    console.log(colors.yellow(user.username) + ' - ' + colors.magenta(user.avatar[0].playerStatus));

  });
});

//module.exports = playerName; //= function() {
//   console.log(playerName);
//   return playerName;
// }

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// const socket = require('socket.io');
//
// let app = express();
//
// app.set('port', (process.env.PORT || 2001));
// let server = app.listen(app.get('port'), () => {
//   console.log("---------------------------------------\n"
//     + colors.green("Socket server is running... ") + "on port " + app.get('port')
//     + "\n---------------------------------------");
// });
//
// let io = socket(server);
//
// io.sockets.on('connection', (socket) => {
//   console.log('socket: ', socket.id, 'connected.');
//
//   socket.on('mouse', mouseMsg);
//
//   function mouseMsg(data) {
//     data = 'Monday';
//     socket.broadcast.emit('mouse', data); // send data to everyone but not me
//     // io.sockets.emit('mouse', data); // send data to everyone, me too
//     console.log(data);
//   }
//
// });
