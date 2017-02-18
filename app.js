'use strict';

const colors = require('colors/safe');

let express = require('express');
let path = require('path');
let morgan = require('morgan');
// let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
const winston = require('winston'); // for logging in future
const uuid = require('uuid');
// const env = require('./env');
// const authority = env('AUTHORITY');
// const authorityIsSecure = authority.startsWith('https');
// const authorityProtocol = authorityIsSecure ? 'https' : 'http';

const routes = require('./routes/index');
const users = require('./routes/users');
const news = require('./routes/news');
const beginnerGuides = require('./routes/beginnerGuides');
const heroes = require('./routes/heroes');
const items = require('./routes/items');
const bookPages = require('./routes/bookPages');
const gameModes = require('./routes/gameModes');
const artwork = require('./routes/artwork');
const screenshots = require('./routes/screenshots');
const videos = require('./routes/videos');
const feedback = require('./routes/feedback');
const bugReport = require('./routes/bugReport');
const support = require('./routes/support');
const play = require('./routes/play');

// Init App
let app = express();
//let serv = require('http').Server(app);

// Set connection to the database
mongoose.connect('mongodb://localhost:27017/2DHTML5Game');

// require('./config/passport');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// let mongojs = require('mongojs');
// let db = mongojs('localhost:27017/2DHTML5Game', ['account']); // specified all collections in db !!

function generateNonce(req, res, next) {
  const rhyphen = /-/g
  res.locals.nonce = uuid.v4().replace(rhyphen, '')
  next()
}

function getNonce (req, res) {
  return "'nonce-${ res.locals.nonce }'"
}

function getDirectives() {
  const self = "'self'";
  const unsafeInline = "'unsafe-inline'";
  const unsafeEval = "'unsafe-eval'";
  const scripts = [
    'https://www.google-analytics.com',
    'https://ajax.googleapis.com'
  ];
  return {
    defaultSrc: [self],
    scriptSrc: [self, getNonce, ...scripts, unsafeInline],
    styleSrc: [self, unsafeInline],
    //imgSrc: ['img.com', 'data:'],
    imgSrc: [self],
    //connectSrc: ["'self'"],
    //sandbox: ['allow-forms', 'allow-scripts'],
    //reportUri: '/report-violatio'
    upgradeInsecureRequests: true,
    reportUri: '/api/csp/report'
    //objectSrc: [], // An empty array allows nothing through
  }
}

// Helmet
app.use(helmet());
app.use(generateNonce);
app.use(helmet.contentSecurityPolicy({
  directives:
  getDirectives(),
  reportOnly: true,
  browserSniff: false,
  disableAndroid: true
}));

// CSP violations
// You need a JSON parser first.
app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))

app.post('/api/csp/report', (req, res) => {
  // if (req.body) {
  //   console.log('CSP Violation: ', req.body)
  // } else {
  //   console.log('CSP Violation: No data received!')
  // }
  winston.warn('CSP header violation ', req.body['csp-report']);
  res.status(204).end()
})

// Morgan
app.use(morgan('dev'));

// Set session expiryDate
//let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

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
    //maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

// Connect Flash
app.use(flash());

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client/'))); // folder for images, css files, etc.

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/users', users);
app.use('/news', news);
app.use('/beginner-guides', beginnerGuides);
app.use('/heroes', heroes);
app.use('/items', items);
app.use('/book-pages', bookPages);
app.use('/game-modes', gameModes);
app.use('/artwork', artwork);
app.use('/screenshots', screenshots);
app.use('/videos', videos);
app.use('/feedback', feedback);
app.use('/bug-report', bugReport);
app.use('/support', support);
app.use('/play', play);
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });

// app.use('/client', express.static(__dirname + '/client'));

// Set Port
app.set('port', (process.env.PORT || 2000));
app.listen(app.get('port'), () => {
  console.log("---------------------------------------\n"
    + colors.green("Server running... ") + "on port " + app.get('port')
    + "\nPress " + colors.red("Ctrl-C") + " to terminate."
    + "\n---------------------------------------");

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
