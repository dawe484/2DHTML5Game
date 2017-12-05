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
    styleSrc: [self, unsafeInline, 'fonts.googleapis.com'],
    //imgSrc: ['img.com', 'data:'],
    imgSrc: [self, ...images],
    fontSrc: [self, 'data:', 'fonts.googleapis.com'],
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

  let storyTutorialNotDone;

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
        nickname: user.avatar[0].nickname,
        playerLvl: user.avatar[0].player_lvl,
        // maxHeroLvl: user.avatar[0].max_hero_lvl,
        currentExp: user.avatar[0].current_exp,
        nextLvlExp: user.avatar[0].next_lvl_exp,
        // currentEnergy: user.avatar[0].current_energy,
        // maxEnergy: user.avatar[0].max_energy,
        // gold: user.avatar[0].gold,
        // diamond: user.avatar[0].diamond,
        // language: user.avatar[0].language,
        // avatarBorder: user.avatar[0].avatar_border_path,
        // mainScreenIconsTitle: user.avatar[0].mainScreenIconsTitle,
        map: user.avatar[0].mainScreenIconsTitle[0],
        guild: user.avatar[0].mainScreenIconsTitle[1],
        ranking: user.avatar[0].mainScreenIconsTitle[2],
        friends: user.avatar[0].mainScreenIconsTitle[3],
        crusade: user.avatar[0].mainScreenIconsTitle[4],
        mail: user.avatar[0].mainScreenIconsTitle[5],
        town: user.avatar[0].mainScreenIconsTitle[6],
        summonBooks: user.avatar[0].mainScreenIconsTitle[7],
        // // scrollIconsTitle: user.avatar[0].scrollIconsTitle,
        // heroes: user.avatar[0].scrollIconsTitle[0],
        // inventory: user.avatar[0].scrollIconsTitle[1],
        // tasks: user.avatar[0].scrollIconsTitle[2],
        // trials: user.avatar[0].scrollIconsTitle[3],
        // battle: user.avatar[0].scrollIconsTitle[4],
        // markets: user.avatar[0].scrollIconsTitle[5],
        // arena: user.avatar[0].scrollIconsTitle[6],
        // grandArena: user.avatar[0].scrollIconsTitle[7],
        // arenaShop: user.avatar[0].scrollIconsTitle[8],
        // grandArenaShop: user.avatar[0].scrollIconsTitle[9],
        // guildShop: user.avatar[0].scrollIconsTitle[10],
        // crusadeShop: user.avatar[0].scrollIconsTitle[11],
        // fantasyShop: user.avatar[0].scrollIconsTitle[12],
        // shop: user.avatar[0].scrollIconsTitle[13]
        // bannersTitle: user.avatar[0].bannersTitle,
        // buttonsTitle: user.avatar[0].buttonsTitle,
        // labelsTitle: user.avatar[0].labelsTitle
      });
    }
  }

  User.getUserByUsername(playerName, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log('USER:', user.username);
      console.log('Story tutorial:', user.avatar[0].storyTutorial);
      if (user.avatar[0].storyTutorial === 'no') {
        console.log('send tutorial');
        sendTutorial(user);
      } else if (user.avatar[0].storyTutorial === 'yes') {
        storyTutorialNotDone = true;
        StoryTutorial.find({}, {_id: 0, speaker: 1, text: 1}, (err, storyTutorials) => {
          // console.log(storyTutorials);
          if (err) throw err;
          socket.emit('storyTutorialData', {
            message: storyTutorials
          });
        });
      }

      socket.on('btnSkipMsg', (data) => {
        storyTutorialNotDone = false;
        if (user.avatar[0].storyTutorial === 'yes') {
          user.avatar[0].storyTutorial = 'no';
          user.save();
          console.log('Save "no" to storyTutorial in DB.');
        }
        console.log('Story tutorial:', user.avatar[0].storyTutorial);
        console.log('Tutorial:', user.avatar[0].tutorial);

        if (storyTutorialNotDone === false) { // == storyTutorial is done
          // message: user.heroes
          sendTutorial(user);
        }
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

      socket.on('barContainer', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('barContainerData', {
            currentEnergy: data[0].avatar[0].current_energy,
            maxEnergy: data[0].avatar[0].max_energy,
            gold: data[0].avatar[0].gold,
            diamond: data[0].avatar[0].diamond
          });
        });
      });

      socket.on('scrollContainer', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('scrollContainerData', {
            heroes: user.avatar[0].scrollIconsTitle[0],
            inventory: user.avatar[0].scrollIconsTitle[1],
            tasks: user.avatar[0].scrollIconsTitle[2],
            trials: user.avatar[0].scrollIconsTitle[3],
            battle: user.avatar[0].scrollIconsTitle[4],
            markets: user.avatar[0].scrollIconsTitle[5],
            arena: user.avatar[0].scrollIconsTitle[6],
            grandArena: user.avatar[0].scrollIconsTitle[7],
            arenaShop: user.avatar[0].scrollIconsTitle[8],
            grandArenaShop: user.avatar[0].scrollIconsTitle[9],
            guildShop: user.avatar[0].scrollIconsTitle[10],
            crusadeShop: user.avatar[0].scrollIconsTitle[11],
            fantasyShop: user.avatar[0].scrollIconsTitle[12],
            shop: user.avatar[0].scrollIconsTitle[13]
          });
        });
      });

      // let avatarDataChanged = [];

      socket.on('avatarScreen', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          // console.log(avatarData[0]);
          // console.log(avatarDataChanged[0]);
          // console.log(JSON.stringify(avatarDataChanged) !== JSON.stringify(avatarData));
          if (err) throw err;
          // if (JSON.stringify(avatarDataChanged) !== JSON.stringify(avatarData)) {
            // console.log('send data from server');
          socket.emit('avatarScreenData', {
            // message: avatarData[0].avatar[0].gold
            nickname: data[0].avatar[0].nickname,
            lblPlayerLvl: data[0].avatar[0].labelsTitle[0],
            playerLvl: data[0].avatar[0].player_lvl,
            lblPresentExp: data[0].avatar[0].labelsTitle[1],
            currentExp: data[0].avatar[0].current_exp,
            nextLvlExp: data[0].avatar[0].next_lvl_exp,
            lblMaxHeroLvl: data[0].avatar[0].labelsTitle[2],
            maxHeroLvl: data[0].avatar[0].max_hero_lvl,
            lblAccountID: data[0].avatar[0].labelsTitle[3],
            avatarBorder: data[0].avatar[0].avatar_border_path,
            btnChangeAvatar: data[0].avatar[0].buttonsTitle[1],
            btnChangeBorder: data[0].avatar[0].buttonsTitle[2],
            btnChangeName: data[0].avatar[0].buttonsTitle[3],
            btnAchievement: data[0].avatar[0].buttonsTitle[4],
            btnSystemSettings: data[0].avatar[0].buttonsTitle[5]
          });
          //   avatarDataChanged = avatarData;
          // }
        });
      });

      // socket.emit('avatarChangeName', 'avatarChangeNameClick');
      socket.on('avatarChangeName', () => {
        socket.emit('avatarChangeNameData', {
          buttonCancel: user.avatar[0].buttonsTitle[6],
          buttonConfirm: user.avatar[0].buttonsTitle[7],
          bannerChangeName: user.avatar[0].bannersTitle[0],
          nickname: user.avatar[0].nickname
        });
      });

      socket.on('summonBooks', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('summonBooksData', {
            bookOfMagic: data[0].avatar[0].bannersTitle[1],
            grandBookOfMagic: data[0].avatar[0].bannersTitle[2],
            free: data[0].avatar[0].labelsTitle[4],
            freeTimes: data[0].avatar[0].labelsTitle[5],
            freeTime: data[0].avatar[0].labelsTitle[6],
            freeAfter: data[0].avatar[0].labelsTitle[7],
            maxFreeSummon: data[0].avatar[0].labelsTitle[8],
            gold1more: data[0].avatar[0].labelsTitle[9],
            gold10more: data[0].avatar[0].labelsTitle[10],
            diamond1more: data[0].avatar[0].labelsTitle[11],
            diamond10more: data[0].avatar[0].labelsTitle[12],
            discount10off: data[0].avatar[0].labelsTitle[13],
            summonx1: data[0].avatar[0].buttonsTitle[8],
            summonx10: data[0].avatar[0].buttonsTitle[9]
          });
        });
      });

      socket.on('summonx1BoM', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('summonx1BoMData', {
            bookOfMagic: data[0].avatar[0].bannersTitle[1],
            gold1more: data[0].avatar[0].labelsTitle[9],
            gold10more: data[0].avatar[0].labelsTitle[10],
            more1: data[0].avatar[0].buttonsTitle[10],
            more10: data[0].avatar[0].buttonsTitle[11]
          });
        });
      });

      socket.on('summonx1GBoM', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('summonx1GBoMData', {
            grandBookOfMagic: data[0].avatar[0].bannersTitle[2],
            diamond1more: data[0].avatar[0].labelsTitle[11],
            diamond10more: data[0].avatar[0].labelsTitle[12],
            more1: data[0].avatar[0].buttonsTitle[10],
            more10: data[0].avatar[0].buttonsTitle[11]
          });
        });
      });

      socket.on('heroesContainer', () => {
        User.find({username: playerName}, {
          _id: 0, heroes: 1
          // 'heroes.summoned': 1, 'heroes.name': 1, 'heroes.urlName': 1,
          // 'heroes.stars': 1, 'heroes.class': 1, 'heroes.level': 1, 'heroes.color': 1,
          // 'heroes.color_number': 1, 'heroes.glyphs_rarity': 1,
        }, (err, data) => {
          if (err) throw err;
          socket.emit('heroesContainerData', {
            heroesMsg: data[0].heroes
            // name: data[0].heroes[0].name,
            // stars: data[0].heroes[0].stars,
            // class: data[0].heroes[0].class,
            // position: data[0].heroes[0].position,
            // description: data[0].heroes[0].description,
            // basicAttackType: data[0].heroes[0].basic_atk_type,
            // level: data[0].heroes[0].level,
            // color: data[0].heroes[0].color,
            // colorNumber: data[0].heroes[0].color_number,
            // attackRange: data[0].heroes[0].attack_range,
            // power: data[0].heroes[0].power,
            // powerInc: data[0].heroes[0].power_inc,
            // health: data[0].heroes[0].health,
            // healthInc: data[0].heroes[0].health_inc,
            // attackDamage: data[0].heroes[0].attack_damage,
            // attackDamageInc: data[0].heroes[0].attack_damage_inc,
            // abilityPower: data[0].heroes[0].ability_power,
            // abilityPowerInc: data[0].heroes[0].ability_power_inc,
            // armor: data[0].heroes[0].armor,
            // armorInc: data[0].heroes[0].armor_inc,
            // magicResist: data[0].heroes[0].magic_resist,
            // magicResistInc: data[0].heroes[0].magic_resist_inc,
            // attackSpeed: data[0].heroes[0].attack_speed,
            // attackSpeedInc: data[0].heroes[0].attack_speed_inc,
            // healthRegen: data[0].heroes[0].health_regen,
            // healthRegenInc: data[0].heroes[0].health_regen_inc,
            // movementSpeed: data[0].heroes[0].movement_speed,
            // energyRegen: data[0].heroes[0].energy_regen,
            // critDamageLevel: data[0].heroes[0].crit_damage_lvl,
            // critStrikeLevel: data[0].heroes[0].crit_strike_lvl,
            // hitLevel: data[0].heroes[0].hit_lvl,
            // dodgeLevel: data[0].heroes[0].dodge_lvl,
            // lifeStealLevel: data[0].heroes[0].life_steal_lvl,
            // energySteal: data[0].heroes[0].energy_steal,
            // energyBoost: data[0].heroes[0].energy_boost,
            // armorPenetration: data[0].heroes[0].armor_pen,
            // magicPenetration: data[0].heroes[0].magic_pen,
            // healingEffect: data[0].heroes[0].healing_effect,
            // shieldEffect: data[0].heroes[0].shield_effect,
            // skills: data[0].heroes[0].skills,
            // glyphsRarity: data[0].heroes[0].glyphs_rarity
          });
        });
      });

      socket.on('heroInfoIcons', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('heroInfoIconsData', {
            stats: data[0].avatar[0].heroInfoIconsTitle[0],
            glyphs: data[0].avatar[0].heroInfoIconsTitle[1],
            skills: data[0].avatar[0].heroInfoIconsTitle[2],
            equip: data[0].avatar[0].heroInfoIconsTitle[3],
            baseStat: data[0].avatar[0].heroInfoIconsTitle[4],
            plusEquip: data[0].avatar[0].heroInfoIconsTitle[5]
          });
        });
      });

      // socket.on('heroBaseStatPlusEquip', () => {
      //   User.find({username: playerName}, {
      //     _id: 0, 'avatar': 1
      //   }, (err, data) => {
      //     if (err) throw err;
      //     console.log(data[0].avatar[0].heroInfoIconsTitle[4],data[0].avatar[0].heroInfoIconsTitle[5]);
      //     socket.emit('heroBaseStatPlusEquipData', {
      //       baseStat: data[0].avatar[0].heroInfoIconsTitle[4],
      //       plusEquip: data[0].avatar[0].heroInfoIconsTitle[5]
      //     });
      //   });
      // });

      socket.on('stats', () => {
        User.find({username: playerName}, {
          _id: 0, 'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          console.log(data[0].avatar[0].heroStatsTitle);
          socket.emit('statsData', {
            health: data[0].avatar[0].heroStatsTitle[0],
            attackDamage: data[0].avatar[0].heroStatsTitle[1],
            abilityPower: data[0].avatar[0].heroStatsTitle[2],
            armor: data[0].avatar[0].heroStatsTitle[3],
            magicResist: data[0].avatar[0].heroStatsTitle[4],
            armorPenetration: data[0].avatar[0].heroStatsTitle[5],
            magicPenetration: data[0].avatar[0].heroStatsTitle[6],
            attackSpeed: data[0].avatar[0].heroStatsTitle[7],
            critDamageLevel: data[0].avatar[0].heroStatsTitle[8],
            critStrikeLevel: data[0].avatar[0].heroStatsTitle[9],
            dodgeLevel: data[0].avatar[0].heroStatsTitle[10],
            energyBoost: data[0].avatar[0].heroStatsTitle[11],
            energyRegen: data[0].avatar[0].heroStatsTitle[12],
            energySteal: data[0].avatar[0].heroStatsTitle[13],
            healingEffect: data[0].avatar[0].heroStatsTitle[14],
            healthRegen: data[0].avatar[0].heroStatsTitle[15],
            lifeStealLevel: data[0].avatar[0].heroStatsTitle[16],
            shieldEffect: data[0].avatar[0].heroStatsTitle[17]
          });
        });
      });

      // socket.emit('glyphsContainer', heroName);
      socket.on('heroContainer', (heroName) => {
        // console.log('heroName', heroName);
        User.find({username: playerName, 'heroes.urlName': heroName}, {
          '_id': 0, 'heroes.$': 1
        }, (err, data) => {
          if (err) throw err;
          // console.log('sending data:', data[0].heroes[0].name, data[0].heroes[0].class);
          socket.emit('heroContainerData', {
            // urlName: data[0].heroes[0].urlName,
            currPages: data[0].heroes[0].curr_pages,
            nextPages: data[0].heroes[0].next_pages,
            name: data[0].heroes[0].name,
            stars: data[0].heroes[0].stars,
            class: data[0].heroes[0].class,
            position: data[0].heroes[0].position,
            description: data[0].heroes[0].description,
            basicAttackType: data[0].heroes[0].basic_atk_type,
            level: data[0].heroes[0].level,
            heroCurrLvlExp: data[0].heroes[0].hero_curr_lvl_exp,
            heroNextLvlExp: data[0].heroes[0].hero_next_lvl_exp,
            color: data[0].heroes[0].color,
            // colorNumber: data[0].heroes[0].color_number,
            attackRange: data[0].heroes[0].attack_range,
            power: data[0].heroes[0].power,
            powerInc: data[0].heroes[0].power_inc,
            health: data[0].heroes[0].health,
            healthInc: data[0].heroes[0].health_inc,
            attackDamage: data[0].heroes[0].attack_damage,
            attackDamageInc: data[0].heroes[0].attack_damage_inc,
            abilityPower: data[0].heroes[0].ability_power,
            abilityPowerInc: data[0].heroes[0].ability_power_inc,
            armor: data[0].heroes[0].armor,
            armorInc: data[0].heroes[0].armor_inc,
            magicResist: data[0].heroes[0].magic_resist,
            magicResistInc: data[0].heroes[0].magic_resist_inc,
            attackSpeed: data[0].heroes[0].attack_speed,
            attackSpeedInc: data[0].heroes[0].attack_speed_inc,
            healthRegen: data[0].heroes[0].health_regen,
            healthRegenInc: data[0].heroes[0].health_regen_inc,
            movementSpeed: data[0].heroes[0].movement_speed,
            energyRegen: data[0].heroes[0].energy_regen,
            critDamageLevel: data[0].heroes[0].crit_damage_lvl,
            critStrikeLevel: data[0].heroes[0].crit_strike_lvl,
            hitLevel: data[0].heroes[0].hit_lvl,
            dodgeLevel: data[0].heroes[0].dodge_lvl,
            lifeStealLevel: data[0].heroes[0].life_steal_lvl,
            energySteal: data[0].heroes[0].energy_steal,
            energyBoost: data[0].heroes[0].energy_boost,
            armorPenetration: data[0].heroes[0].armor_pen,
            magicPenetration: data[0].heroes[0].magic_pen,
            healingEffect: data[0].heroes[0].healing_effect,
            shieldEffect: data[0].heroes[0].shield_effect,
            skills: data[0].heroes[0].skills,
            glyphsRarity: data[0].heroes[0].glyphs_rarity
          });
        });
      });

      // socket.on('heroSkills', (heroName) => {
      //   User.find({username: playerName, 'heroes.urlName': heroName}, {
      //     '_id': 0, 'heroes.skills': 1
      //   }, (err, data) => {
      //     if (err) throw err;
      //     console.log(data);
      //     // socket.emit('heroSkillsData', {
      //     //
      //     // });
      //   });
      // });

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
