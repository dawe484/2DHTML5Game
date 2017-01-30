'use strict'

let colors = require('colors/safe');

let express = require('express');
let path = require('path');
// let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressHandlebars = require('express-handlebars');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let expressSession = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
// let mongo = require('mongodb');
let mongoose = require('mongoose');
let helmet = require('helmet');
//let winston = require('winston'); // for logging in future
let morgan = require('morgan');

mongoose.connect('mongodb://localhost:27017/2DHTML5Game');

let db = mongoose.connection;

// let mongojs = require('mongojs');
// let db = mongojs('localhost:27017/2DHTML5Game', ['account']); // specified all collections in db !!

let routes = require('./routes/index');
let users = require('./routes/users');
let play = require('./routes/play');

// Init App
let app = express();
//let serv = require('http').Server(app);

// Helmet
app.use(helmet());

// Morgan
app.use(morgan('dev'));

// Set session expiryDate
//let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// app.use(cookieParser());
// Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work.
// This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues
// if the secret is not the same between this module and cookie-parser.

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client/'))); // folder for images, css files, etc.

// Express Session - save in memory - look in api doc for Compatible Session Stores
app.use(expressSession({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  //cookie: { maxAge: 3600000 } // one hour
  // cookie: { maxAge: 60000  } // one minute
  cookie: {
    //secure: true,
    httpOnly: true,
    path: '/',
    //maxAge: expiryDate
  }
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/play', play);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });

// app.use('/client', express.static(__dirname + '/client'));

// Set Port
app.set('port', (process.env.PORT || 2000));
app.listen(app.get('port'), () => {
  console.log(colors.green("Server running... ") + "on port " + app.get('port')
    + "; press " + colors.red("Ctrl-C") + " to terminate.");

  // db.on('error', (err) => {
  //     console.log('database error', err)
  // })
  //
  // db.on('connect', () => {
  //     console.log('database connected')
  // })

});

//serv.listen(2000);
//console.log("Server running...");

// let SOCKET_LIST = {};
// let PLAYER_LIST = {}; // list of connected players
// let onlinePlayers = 0;
// /*
// let Player = (id) => {
//   let self = {
//     id: id
//   }
//
//   Player.list[id] = self;
//   return self;
// }
//
// Player.list = {};
//
// Player.onConnect = (socket) => {
//   let player = Player(socket.id);
// }
//
// Player.onDisconnect = (socket) => {
//   delete Player.list[socket.id];
// }
// */
//
// class Player {
//   constructor(id) {
//     this.id = id;
//   }
//
//   onConnect(socket) {
//     onlinePlayers++;
//     console.log(colors.green('>'), 'Player:', socket.id, 'connected.',
//       colors.yellow('\tOnline:'), onlinePlayers, 'players.');
//   }
//
//   onDisconnect(socket) {
//     onlinePlayers--;
//     console.log(colors.red('<'), 'Player:', socket.id, 'disconnected.',
//       colors.yellow('\tOnline:'), onlinePlayers, 'players.');
//   }
// }
//
// let USERS = {
//   // username::password
//   'david':'david',
//   'tomas':'tomas',
//   'admin':'admin'
// }
//
// let isValidPassword = (data, callback) => {
//   db.account.find({username:data.username, password:data.password}, (error, result) => {
//     // find every account in db
//     if (result.length > 0) // check if in db are any users
//       callback(true);
//     else
//       callback(false);
//     // callback(USERS[data.username] === data.password);
//   });
// }
//
// let isUsernameTaken = (data, callback) => {
//   db.account.find({username:data.username}, (error, result) => {
//   // find every account with username in db and check if the username exists in db
//   if (result.length > 0)
//     callback(true);
//   else
//     callback(false);
//     //callback(USERS[data.username]);
//   });
// }
//
// let addUser = (data, callback) => {
//   // insert a new user into the db
//   db.account.insert({username:data.username, password:data.password}, (error) => {
//     callback();
//   });
// }

// let io = require('socket.io')(serv, {});
// io.sockets.on('connection', (socket) => {
//   socket.id = Math.random();
//   SOCKET_LIST[socket.id] = socket;
//   // console.log('socket connection:');
//
//   let player = new Player(socket.id);
//
//   socket.on('signIn', (data) => {
//     isValidPassword(data, (res) => {
//       if (res) {
//         // PLAYER_LIST[socket.id] = player;
//         // Player.onConnect(socket);
//         //let player = new Player(socket.id);
//         PLAYER_LIST[socket.id] = player;
//         player.onConnect(socket);
//         socket.emit('signInResponse', {success:true});
//       } else {
//         socket.emit('signInResponse', {success:false});
//       }
//     });
//   });
//
//   socket.on('signUp', (data) => {
//     isUsernameTaken(data, (res) => {
//       if (res) {
//         socket.emit('signUpResponse', {success:false});
//       } else {
//         addUser(data, () => {
//           socket.emit('signUpResponse', {success:true});
//         });
//       }
//     });
//   });
//
//   socket.on('disconnect', () => {
//     delete SOCKET_LIST[socket.id];
//     delete PLAYER_LIST[socket.id];
//     player.onDisconnect(socket);
//     // Player.onDisconnect(socket);
//     //player.onDisconnect(socket.id);
//   });
//
//
//   // socket.on('happy', function(data) {
//   //   console.log(`happy because ${data.reason}`);
//   // });
//
//   // socket.emit('serverMsg', {
//   //   msg: 'Hello'
//   // });
//
// });
