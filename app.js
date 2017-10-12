/* jshint node: true */
'use strict';

const colors = require('colors/safe');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

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

const routes = require('./routes/index');
const users = require('./routes/users');
const news = require('./routes/news');
const beginnerGuides = require('./routes/beginnerGuides');
const heroes = require('./routes/heroes');
const glyphs = require('./routes/glyphs');
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
let databaseOption = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};

mongoose.connect('mongodb://localhost:27017/2DHTML5Game', databaseOption)
  .then(() => {
    console.log('Database successfully connected.\n---------------------------------------');
  }, (err) => {
    console.error('Database not connected.\n'+err.message);
    process.exit();
  });

// require('./config/passport');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'layout',
  helpers: {
    toLowerCase: function (str) {
      return str.toLowerCase();
    }
  }
}));
app.set('view engine', 'handlebars');

// let mongojs = require('mongojs');
// let db = mongojs('localhost:27017/2DHTML5Game',
// ['account']); // specified all collections in db !!

function generateNonce(req, res, next) {
  const rhyphen = /-/g;
  res.locals.nonce = uuid.v4().replace(rhyphen, '');
  next();
}

function getNonce(req, res) {
  return "'nonce-" + res.locals.nonce + "'"; // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
}

function getDirectives() {
  const self = "'self'";
  const none = "'none'";
  const unsafeInline = "'unsafe-inline'";
  const unsafeEval = "'unsafe-eval'";
  const scripts = [
    '*.google-analytics.com',
    'ajax.googleapis.com',
    'code.jquery.com',
    'cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js',
  ];
  const images = [
    'akela.mendelu.cz/~xkrenar/',
  ];
  return {
    defaultSrc: [self],
    scriptSrc: [
      getNonce, self, ...scripts, unsafeInline, unsafeEval,
    ],
    styleSrc: [self, unsafeInline],
    //imgSrc: ['img.com', 'data:'],
    imgSrc: [self, ...images],
    fontSrc: [self, 'data:'],
    childSrc: [none],
    connectSrc: [self, 'ws://localhost:2000'],
    //sandbox: ['allow-forms', 'allow-scripts'],
    upgradeInsecureRequests: false,//true, pro https:// na live serveru
    reportUri: '/api/csp-report'
    //objectSrc: [], // An empty array allows nothing through
  }
}

// Helmet - implements X-DNS-Prefetch-Control:off;
//        - remove X-Powered-By header
//        - sets the X-Download-Options to prevent Internet Explorer from executing downloads in your site’s context
//        - sets the X-XSS-Protection header to prevent reflected XSS attacks
app.use(helmet());
// CSP
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
  type: ['json', 'api/csp-report']
}))

app.post('/api/csp-report', (req, res) => {
  // if (req.body) {
  //   console.log('CSP Violation: ', req.body)
  // } else {
  //   console.log('CSP Violation: No data received!')
  // }
  winston.warn('CSP header violation ', req.body['csp-report']);
  res.status(204).end()
})

// X-Frame - protect from clickjacking attacks
app.use(helmet.frameguard({ action: 'deny'}));

// HTTP Strict Transport Security (HSTS) - Implement Strict-Transport-Security
app.use(helmet.hsts({
  maxAge: 5184000, //60 days in seconds
  includeSubdomains: false
}));

// Cache-Control
app.use(helmet.noCache({
  maxAge: 864000 //10 days
}));

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
  //store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // cookie: {
  //   secure: true,
  //   httpOnly: true,
  //   path: '/',
  //   //maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  //   maxAge: 180 * 60 * 1000 // 3 hours
  // }
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
app.use('/glyphs', glyphs);
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
  //err.status = 404;
  let err = new Error('404 Not Found');
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Magical Heroes'})
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });

// app.use('/client', express.static(__dirname + '/client'));

// Set Port
app.set('port', (process.env.PORT || 2000));
let server = app.listen(app.get('port'), () => {
  console.log("---------------------------------------\n"
    + colors.green("Web server is running... ") + "on port " + app.get('port')
    + "\nPress " + colors.red("Ctrl-C") + " to terminate.");
    // + "\n---------------------------------------");
});

let SOCKET_LIST = {};

const socket = require('socket.io');
let io = socket(server);

const User = require('./models/user');
const StoryTutorial = require('./models/storyTutorial');
const Tutorial = require('./models/tutorial');

// io.sockets.on('connection', (socket) => {
io.on('connection', (socket) => {

  SOCKET_LIST[socket.id] = socket;
  let address = socket.handshake.headers.referer;
  console.log(address); // 27
  let playerName = address.substr(27);

  console.log('player:', colors.cyan(playerName), colors.green('connected'), 'on socket:', colors.magenta(socket.id), '.');

  // let storyTutorialNotDone;

  function countdownTimer(countdown, countdownSocketEmit, countdownSocketOn) {
    let myTimer = setInterval(() => {
      countdown--;
      // console.log(countdownSocketEmit, countdown);
      socket.emit(countdownSocketEmit, {
        countdown: countdown
      });
    }, 1000);
    socket.on(countdownSocketOn, () => {
      clearInterval(myTimer);
    });
  }

  function sendTutorial(user) {
    if (user.avatar[0].tutorial === 'yes') {
      Tutorial.find({}, {_id: 0, speaker: 1, text: 1}, (err, tutorials) => {
        if (err) throw err;
        socket.emit('tutorialData', {
          message: tutorials
        });
      });
      socket.emit('avatarData', {
        diamond: user.avatar[0].diamond,
        gold: user.avatar[0].gold,
        currentEnergy: user.avatar[0].current_energy,
        maxEnergy: user.avatar[0].max_energy,
        nextLvlExp: user.avatar[0].next_lvl_exp,
        currentExp: user.avatar[0].current_exp,
        maxHeroLvl: user.avatar[0].max_hero_lvl,
        playerLvl: user.avatar[0].player_lvl,
        nickname: user.avatar[0].nickname
      });
    }
  }

  User.getUserByUsername(playerName, (err, user) => {
    if (err) throw err;
    if (user) {
      // console.log(user.email);
      console.log('Story tutorial:', user.avatar[0].storyTutorial);
      if (user.avatar[0].storyTutorial === 'no') {
        sendTutorial(user);
      } else if (user.avatar[0].storyTutorial === 'yes') {
        // storyTutorialNotDone = true;
        StoryTutorial.find({}, {_id: 0, speaker: 1, text: 1}, (err, storyTutorials) => {
          // console.log(storyTutorials);
          if (err) throw err;
          socket.emit('storyTutorialData', {
            message: storyTutorials
          });
        });
      }

      socket.on('btnSkipMsg', (data) => {
        // storyTutorialNotDone = false;
        if (user.avatar[0].storyTutorial === 'yes') {
          user.avatar[0].storyTutorial = 'no';
          user.save();
          console.log('Save "no" to storyTutorial in DB.');
        }
        console.log('Story tutorial:', user.avatar[0].storyTutorial);
        console.log('Tutorial:', user.avatar[0].tutorial);

        // if (storyTutorialNotDone === false) {
          // message: user.heroes
        sendTutorial(user);
        // }
      });

      socket.on('btnSummonx1BoMMsg', (data) => {
        User.find({username: playerName}, {
          _id: 0, 'heroes': {
            $elemMatch: {
              'name': 'Leryssa'
            }
          }, 'heroes.urlName': 1
        }, (err, heroes) => {
          if (err) throw err;
          socket.emit('summonLeryssa', {
            message: heroes
          });
        });
        countdownTimer(20, 'timer5minutesStarted', 'timer5minutesEnded');
      });

      socket.on('btnSummonx1GBoMMsg', (data) => {
        User.find({username: playerName}, {
          _id: 0, 'heroes': {
            $elemMatch: {
              'name': 'Leona'
            }
          }, 'heroes.urlName': 1
        }, (err, heroes) => {
          if (err) throw err;
          socket.emit('summonLeona', {
            message: heroes
          });
        });
        countdownTimer(30, 'timer46hoursStarted', 'timer46hoursEnded');
      });

    }
  });

  // socket.on('mouse', mouseMsg);
  //
  // function mouseMsg(data) {
  //   data = 'Monday';
  //   socket.broadcast.emit('mouse', data); // send data to everyone but not me
  //   // io.sockets.emit('mouse', data); // send data to everyone, me too
  //   console.log(data);
  // }
  //
  // socket.emit('serverMsg', {
  //   message: 'Hello from server.',
  // });

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    console.log('player:', colors.cyan(playerName), colors.red('disconnected'), 'on socket:', colors.magenta(socket.id), '.');
  });

});
