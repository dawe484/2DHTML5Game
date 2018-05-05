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
    console.error('Database not connected.\n' + err.message);
    process.exit();
  });

// require('./config/passport');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'layout',
  helpers: {
    toLowerCase: function(str) {
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
    'www.google.com/recaptcha/api.js',
    'www.gstatic.com/recaptcha/'
  ];
  const images = [
    'akela.mendelu.cz/~xkrenar/game/ data:'
  ];
  return {
    defaultSrc: [self],
    scriptSrc: [
      getNonce, self, ...scripts, unsafeInline, unsafeEval,
    ],
    styleSrc: [self, unsafeInline, 'fonts.googleapis.com'],
    //imgSrc: ['img.com', 'data:'],
    imgSrc: [self, ...images],
    fontSrc: [self, 'data:', 'fonts.googleapis.com', 'fonts.gstatic.com'],
    childSrc: [none],
    frameSrc: [self, 'www.google.com'],
    connectSrc: [self, 'ws://localhost:2000'],
    //sandbox: ['allow-forms', 'allow-scripts'],
    upgradeInsecureRequests: false, //true, pro https:// na live serveru
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
  directives: getDirectives(),
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
app.use(helmet.frameguard({
  action: 'deny'
}));

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
app.use(bodyParser.urlencoded({
  extended: false
}));

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
// This module now directly reads and writes cookies on req/res. Using cookie-parser may resultDiamond in issues
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
  res.render('error', {
    title: 'Magical Heroes'
  })
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });

// app.use('/client', express.static(__dirname + '/client'));

// Set Port
app.set('port', (process.env.PORT || 2000));
let server = app.listen(app.get('port'), () => {
  console.log('---------------------------------------\n' +
    colors.green('Web server is running... ') + 'on port ' + app.get('port') +
    '\nPress ' + colors.red('Ctrl-C') + ' to terminate.');
  // + "\n---------------------------------------");
});

let SOCKET_LIST = {};

const socket = require('socket.io');
let io = socket(server);

const User = require('./models/user');
const StoryTutorial = require('./models/storyTutorial');
const Tutorial = require('./models/tutorial');
const Enemies = require('./models/enemy');
const Glyphs = require('./models/glyph');
const GoldPlusByLevels = require('./models/data_goldPlusByLevel');

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

  function sendMainScreenContainerData(user) {
    // if (user.avatar[0].tutorial === 'yes') {
    //   Tutorial.find({}, {_id: 0, speaker: 1, text: 1}, (err, tutorials) => {
    //     if (err) throw err;
    //     socket.emit('tutorialData', {
    //       message: tutorials
    //     });
    //   });
    socket.emit('mainScreenContainerData', {
      map: user.avatar[0].mainScreenIconsTitle[0],
      guild: user.avatar[0].mainScreenIconsTitle[1],
      ranking: user.avatar[0].mainScreenIconsTitle[2],
      friends: user.avatar[0].mainScreenIconsTitle[3],
      crusade: user.avatar[0].mainScreenIconsTitle[4],
      mail: user.avatar[0].mainScreenIconsTitle[5],
      town: user.avatar[0].mainScreenIconsTitle[6],
      summonBooks: user.avatar[0].mainScreenIconsTitle[7],
      // loading: user.avatar[0].backgroundTitle[0],
      // scrollIconsTitle: user.avatar[0].scrollIconsTitle,
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
    // }
  }

  User.getUserByUsername(playerName, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log('USER:', user.username);
      console.log('Story tutorial:', user.avatar[0].storyTutorial);
      socket.emit('startData', {
        dataStory: user.avatar[0].storyTutorial,
        loading: user.avatar[0].backgroundTitle[0]
      });

      socket.on('storyTutorial', () => {
        StoryTutorial.find({}, {
          _id: 0,
          speaker: 1,
          text: 1
        }, (err, data) => {
          // console.log('hi');
          if (err) throw err;
          socket.emit('storyTutorialData', {
            message: data,
            skipText: user.avatar[0].buttonsTitle[0]
          });
        });
      });

      socket.on('btnSkip', () => {
        // if (user.avatar[0].storyTutorial === 'yes') {
        user.avatar[0].storyTutorial = 'no';
        user.save();
        console.log('Save "no" to storyTutorial in DB.');
        // sendMainScreenContainerData(user);
        // }
        // console.log('Story tutorial:', user.avatar[0].storyTutorial);
        // console.log('Tutorial:', user.avatar[0].tutorial);
      });

      socket.on('mainScreenContainer', () => {
        sendMainScreenContainerData(user);
      });

      socket.on('avatarContainer', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('avatarContainerData', {
            avatarBorder: data[0].avatar[0].avatar_border_path,
            avatarImage: data[0].avatar[0].avatar_image_path,
            avatarLevelIcon: data[0].avatar[0].avatar_level_path,
            nickname: data[0].avatar[0].nickname,
            playerLvl: data[0].avatar[0].player_lvl,
            currentExp: data[0].avatar[0].current_exp,
            nextLvlExp: data[0].avatar[0].next_lvl_exp
          });
        });
      });

      socket.on('avatarScreen', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('avatarScreenData', {
            avatarBorder: data[0].avatar[0].avatar_border_path,
            avatarImage: data[0].avatar[0].avatar_image_path,
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
            btnFaq: data[0].avatar[0].buttonsTitle[1],
            btnChangeAvatar: data[0].avatar[0].buttonsTitle[2],
            btnChangeBorder: data[0].avatar[0].buttonsTitle[3],
            btnChangeName: data[0].avatar[0].buttonsTitle[4],
            btnAchievement: data[0].avatar[0].buttonsTitle[5],
            btnSystemSettings: data[0].avatar[0].buttonsTitle[6]
          });
        });
      });

      socket.on('avatarChangeName', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('avatarChangeNameData', {
            buttonCancel: data[0].avatar[0].buttonsTitle[7],
            buttonConfirm: data[0].avatar[0].buttonsTitle[8],
            bannerChangeName: data[0].avatar[0].bannersTitle[0],
            nickname: data[0].avatar[0].nickname
          });
        });
      });

      socket.on('barContainer', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          console.log('Loading barContainer data from DB.');
          socket.emit('barContainerData', {
            currentEnergy: data[0].avatar[0].current_energy,
            maxEnergy: data[0].avatar[0].max_energy,
            gold: data[0].avatar[0].gold,
            diamond: data[0].avatar[0].diamond
          });
        });
      });

      let goldValue, goldPrice;

      socket.on('goldScreen', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar.player_lvl': 1,
          'avatar.labelsTitle': 1,
          'avatar.buttonsTitle': 1
        }, (err, data) => {
          if (err) throw err;
          const playerLvl = data[0].avatar[0].player_lvl;
          GoldPlusByLevels.find({
            'avatar_curr_lvl': playerLvl
          }, {
            _id: 0,
            'gold_plus': 1,
            'price_in_diamond': 1
          }, (error, goldData) => {
            if (error) throw error;
            goldValue = goldData[0].gold_plus;
            goldPrice = goldData[0].price_in_diamond;
            // console.log(goldPrice);
            socket.emit('goldScreenData', {
              goldPlus: goldData[0].gold_plus,
              priceInDiamond: goldData[0].price_in_diamond,
              buyText: data[0].avatar[0].labelsTitle[22],
              costText: data[0].avatar[0].labelsTitle[23],
              btnBuy: data[0].avatar[0].buttonsTitle[26]
            });
          });
        });
      });

      socket.on('sendBuyGold', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar.diamond': 1,
          'avatar.gold': 1
        }, (err, data) => {
          const diamond = data[0].avatar[0].diamond;
          const gold = data[0].avatar[0].gold;
          if (diamond < goldPrice) {
            User.find({
              username: playerName
            }, {
              _id: 0,
              'avatar.backgroundTitle': 1,
              'avatar.buttonsTitle': 1
            }, (err, data) => {
              if (err) throw err;
              console.log('Low diamonds in DB. Please buy someone :).');
              socket.emit('lowDiamonds', {
                rechargeText: data[0].avatar[0].backgroundTitle[1],
                okBtnText: data[0].avatar[0].buttonsTitle[27]
              });
            });
          } else {
            const resultDiamond = diamond - goldPrice;
            console.log(`${diamond} - ${goldPrice} = ${resultDiamond}`);
            const resultGold = gold + goldValue;
            console.log(`${gold} + ${goldValue} = ${resultGold}`);
            if (err) throw err;
            user.avatar[0].gold = resultGold;
            user.avatar[0].diamond = resultDiamond;
            user.save()
              .then(price => {
                console.log(`Save ${resultDiamond} and ${resultGold} to the DB.`);
                // socket.on('barContainerDiamond', () => {
                User.find({
                  username: playerName
                }, {
                  _id: 0,
                  'avatar.diamond': 1,
                  'avatar.gold': 1
                }, (err, data) => {
                  if (err) throw err;
                  console.log('Loading barContainer after save = barContainerDiamondData');
                  socket.emit('barContainerDiamondData', {
                    // currentEnergy: data[0].avatar[0].current_energy,
                    // maxEnergy: data[0].avatar[0].max_energy,
                    gold: data[0].avatar[0].gold,
                    diamond: data[0].avatar[0].diamond
                  });
                });
                // });
              })
              .catch(error => {
                console.log(`Something goes wrong. Cannot save ${resultDiamond} to the DB.`);
              });
          }
        });
      });

      socket.on('heroesContainer', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'heroes.name': 1,
          'heroes.urlName': 1,
          'heroes.stars': 1,
          'heroes.class': 1,
          'heroes.position': 1,
          'heroes.description': 1,
          'heroes.basic_atk_type': 1,
          'heroes.power': 1,
          'heroes.health': 1,
          'heroes.attack_damage': 1,
          'heroes.ability_power': 1,
          'heroes.armor': 1,
          'heroes.magic_resist': 1,
          'heroes.attack_speed': 1,
          'heroes.health_regen': 1,
          'heroes.movement_speed': 1,
          'heroes.energy_regen': 1,
          'heroes.crit_damage_lvl': 1,
          'heroes.crit_strike_lvl': 1,
          'heroes.hit_lvl': 1,
          'heroes.dodge_lvl': 1,
          'heroes.life_steal_lvl': 1,
          'heroes.energy_steal': 1,
          'heroes.energy_boost': 1,
          'heroes.armor_pen': 1,
          'heroes.magic_pen': 1,
          'heroes.healing_effect': 1,
          'heroes.shield_effect': 1,
          'heroes.summoned': 1,
          'heroes.level': 1,
          'heroes.hero_curr_lvl_exp': 1,
          'heroes.hero_next_lvl_exp': 1,
          'heroes.color': 1,
          'heroes.skills.title': 1,
          'heroes.skills.description': 1,
          'heroes.skills.skill_type': 1,
          'heroes.skills.skill_level': 1,
          'heroes.skills.flat_dmg': 1,
          'heroes.skills.skill_power': 1,
          'heroes.glyphs_rarity.current_status': 1,
          'heroes.glyphs_rarity.next_status': 1,
          'heroes.glyphs_rarity.glyphs.number': 1,
          'heroes.glyphs_rarity.glyphs.title': 1,
          'heroes.glyphs_rarity.glyphs.equipped': 1,
          'heroes.glyphs_rarity.glyphs.icon_path': 1
        }, (err, data) => {
          if (err) throw err;
          // console.log(data[0].heroes);
          socket.emit('heroesContainerData', {
            heroesMsg: data[0].heroes
          });
        });
      });

      socket.on('heroInfoIcons', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('heroInfoIconsData', {
            stats: data[0].avatar[0].heroInfoIconsTitle[0],
            glyphs: data[0].avatar[0].heroInfoIconsTitle[1],
            skills: data[0].avatar[0].heroInfoIconsTitle[2],
            equip: data[0].avatar[0].heroInfoIconsTitle[3]
          });
        });
      });

      socket.on('statsContainer', (heroName) => {
        User.find({
          username: playerName,
          'heroes.urlName': heroName
        }, {
          '_id': 0,
          'heroes.$': 1,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          // console.log(data[0].avatar[0].heroStatsTitle);
          socket.emit('statsContainerData', {
            baseStatTitle: data[0].avatar[0].heroInfoIconsTitle[5],
            plusEquipTitle: data[0].avatar[0].heroInfoIconsTitle[6],
            healthTitle: data[0].avatar[0].heroStatsTitle[0],
            attackDamageTitle: data[0].avatar[0].heroStatsTitle[1],
            abilityPowerTitle: data[0].avatar[0].heroStatsTitle[2],
            armorTitle: data[0].avatar[0].heroStatsTitle[3],
            magicResistTitle: data[0].avatar[0].heroStatsTitle[4],
            attackSpeedTitle: data[0].avatar[0].heroStatsTitle[5],
            healthRegenTitle: data[0].avatar[0].heroStatsTitle[6],
            movementSpeedTitle: data[0].avatar[0].heroStatsTitle[7],
            energyRegenTitle: data[0].avatar[0].heroStatsTitle[8],
            critDamageLevelTitle: data[0].avatar[0].heroStatsTitle[9],
            critStrikeLevelTitle: data[0].avatar[0].heroStatsTitle[10],
            hitLevelTitle: data[0].avatar[0].heroStatsTitle[11],
            dodgeLevelTitle: data[0].avatar[0].heroStatsTitle[12],
            lifeStealLevelTitle: data[0].avatar[0].heroStatsTitle[13],
            energyStealTitle: data[0].avatar[0].heroStatsTitle[14],
            energyBoostTitle: data[0].avatar[0].heroStatsTitle[15],
            armorPenetrationTitle: data[0].avatar[0].heroStatsTitle[16],
            magicPenetrationTitle: data[0].avatar[0].heroStatsTitle[17],
            healingEffectTitle: data[0].avatar[0].heroStatsTitle[18],
            shieldEffectTitle: data[0].avatar[0].heroStatsTitle[19],
            // urlName: data[0].heroes[0].urlName,
            // currPages: data[0].heroes[0].curr_pages,
            // nextPages: data[0].heroes[0].next_pages,
            name: data[0].heroes[0].name,
            stars: data[0].heroes[0].stars,
            class: data[0].heroes[0].class,
            // position: data[0].heroes[0].position,
            description: data[0].heroes[0].description,
            basicAttackType: data[0].heroes[0].basic_atk_type,
            // level: data[0].heroes[0].level,
            // heroCurrLvlExp: data[0].heroes[0].hero_curr_lvl_exp,
            // heroNextLvlExp: data[0].heroes[0].hero_next_lvl_exp,
            color: data[0].heroes[0].color,
            // colorNumber: data[0].heroes[0].color_number,
            attackRange: data[0].heroes[0].attack_range,
            power: data[0].heroes[0].power,
            // powerInc: data[0].heroes[0].power_inc,
            health: data[0].heroes[0].health,
            // healthInc: data[0].heroes[0].health_inc,
            attackDamage: data[0].heroes[0].attack_damage,
            // attackDamageInc: data[0].heroes[0].attack_damage_inc,
            abilityPower: data[0].heroes[0].ability_power,
            // abilityPowerInc: data[0].heroes[0].ability_power_inc,
            armor: data[0].heroes[0].armor,
            // armorInc: data[0].heroes[0].armor_inc,
            magicResist: data[0].heroes[0].magic_resist,
            // magicResistInc: data[0].heroes[0].magic_resist_inc,
            attackSpeed: data[0].heroes[0].attack_speed,
            // attackSpeedInc: data[0].heroes[0].attack_speed_inc,
            healthRegen: data[0].heroes[0].health_regen,
            // healthRegenInc: data[0].heroes[0].health_regen_inc,
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
            // skills: data[0].heroes[0].skills,
            // glyphsRarity: data[0].heroes[0].glyphs_rarity,
            powerText: data[0].avatar[0].labelsTitle[24]
          });
        });
      });

      socket.on('glyphsContainer', (heroName) => {
        let currentGlyphJson = {
          "currentGlyphs": [{
              "number": 0,
              "title": "",
              "equipped": "",
              "icon_path": ""
            },
            {
              "number": 0,
              "title": "",
              "equipped": "",
              "icon_path": ""
            },
            {
              "number": 0,
              "title": "",
              "equipped": "",
              "icon_path": ""
            },
            {
              "number": 0,
              "title": "",
              "equipped": "",
              "icon_path": ""
            }
          ]
        };
        User.find({
          username: playerName,
          'heroes.urlName': heroName
        }, {
          '_id': 0,
          'heroes.$': 1,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          for (let glyphStatus of data[0].heroes[0].glyphs_rarity) {
            if (data[0].heroes[0].color === glyphStatus.current_status) {
              for (let glyph of glyphStatus.glyphs) {
                let index = glyphStatus.glyphs.indexOf(glyph);
                currentGlyphJson.currentGlyphs[index].number = glyph.number;
                currentGlyphJson.currentGlyphs[index].title = glyph.title;
                currentGlyphJson.currentGlyphs[index].equipped = glyph.equipped;
                currentGlyphJson.currentGlyphs[index].icon_path = glyph.icon_path;
              }
            }
          }
          socket.emit('glyphsContainerData', {
            awakenText: data[0].avatar[0].heroInfoIconsTitle[4],
            powerText: data[0].avatar[0].labelsTitle[24],
            expText: data[0].avatar[0].labelsTitle[21],
            name: data[0].heroes[0].name,
            // urlName: data[0].heroes[0].urlName,
            // imagePath: data[0].heroes[0].image_path,
            stars: data[0].heroes[0].stars,
            class: data[0].heroes[0].class,
            power: data[0].heroes[0].power,
            color: data[0].heroes[0].color,
            level: data[0].heroes[0].level,
            currExp: data[0].heroes[0].hero_curr_lvl_exp,
            nextExp: data[0].heroes[0].hero_next_lvl_exp,
            currPages: data[0].heroes[0].curr_pages,
            nextPages: data[0].heroes[0].next_pages,
            glyphJson: currentGlyphJson
          });
        });
      });

      socket.on('skillsContainer', (heroName) => {
        let skillsJson = [{
            "title": "",
            "description": "",
            "skill_type": "",
            "skill_level": 0,
            "flat_dmg": 0,
            "skill_power": 0
          },
          {
            "title": "",
            "description": "",
            "skill_type": "",
            "skill_level": 0,
            "flat_dmg": 0,
            "skill_power": 0
          },
          {
            "title": "",
            "description": "",
            "skill_type": "",
            "skill_level": 0,
            "flat_dmg": 0,
            "skill_power": 0
          },
          {
            "title": "",
            "description": "",
            "skill_type": "",
            "skill_level": 0,
            "flat_dmg": 0,
            "skill_power": 0
          }
        ];
        User.find({
          username: playerName,
          'heroes.urlName': heroName
        }, {
          '_id': 0,
          'heroes.$': 1,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          for (let skill of data[0].heroes[0].skills) {
            // console.log(glyphStatus.glyphs.indexOf(glyph));
            let index = data[0].heroes[0].skills.indexOf(skill);
            skillsJson[index].title = skill.title;
            skillsJson[index].description = skill.description;
            skillsJson[index].skill_type = skill.skill_type;
            skillsJson[index].skill_level = skill.skill_level;
            skillsJson[index].flat_dmg = skill.flat_dmg;
            skillsJson[index].skill_power = skill.skill_power;
          }
          socket.emit('skillsContainerData', {
            name: data[0].heroes[0].name,
            class: data[0].heroes[0].class,
            level: data[0].heroes[0].level,
            power: data[0].heroes[0].power,
            powerText: data[0].avatar[0].labelsTitle[24],
            // skills: data[0].heroes[0].skills
            skills: skillsJson
          });
        });
      });


      socket.on('progress', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar.progress': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('progressData', {
            progress: data[0].avatar[0].progress
          });
        });
      });

      socket.on('paragraphs', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('paragraphsData', {
            // paragraphsMsg: data[0].avatar
            paragraphs: data[0].avatar[0].paragraphs,
            consume: data[0].avatar[0].labelsTitle[14],
            enemiesPower: data[0].avatar[0].labelsTitle[15],
            enemies: data[0].avatar[0].labelsTitle[16],
            possibleRewards: data[0].avatar[0].labelsTitle[17],
            sweep: data[0].avatar[0].buttonsTitle[13],
            sweepx10: data[0].avatar[0].buttonsTitle[14],
            start: data[0].avatar[0].buttonsTitle[15]
          });
        });
      });

      socket.on('selectedParagraph', (difficulty, chapter) => {
        // console.log('difficulty', difficulty, chapter);
        Enemies.find({
          'map_location': {
            $elemMatch: {
              'type_location': difficulty,
              'chapter': chapter
            }
          }
        }, {
          '_id': 0,
          'icon_path': 1,
          'image_path': 1,
          'name': 1,
          'class': 1,
          'position': 1,
          'description': 1,
          'basic_atk_type': 1,
          'attack_range': 1,
          'power': 1,
          'health': 1,
          'attack_damage': 1,
          'ability_power': 1,
          'armor': 1,
          'magic_resist': 1,
          'movement_speed': 1,
          'level': 1,
          'map_location.$': 1
        }, (err, dataEnemies) => {
          // console.log(data);
          if (err) throw err;
          Glyphs.find({
            'map_location': {
              $elemMatch: {
                'type_location': difficulty,
                'chapter': chapter
              }
            }
          }, {
            '_id': 0,
            'icon_path': 1,
            'title': 1,
            'map_location.$': 1
          }, (err, dataPossibleRewards) => {
            // console.log(data);
            // console.log(dataEnemies);
            // console.log(dataGlyphs);
            if (err) throw err;
            socket.emit('selectedParagraphData', {
              enemiesData: dataEnemies,
              possibleRewardsData: dataPossibleRewards
            });
            // socket.emit('possibleRewardsData', {
            //   possibleRewardsData: data
            // });
          });
          // socket.emit('enemiesData', {
          //   enemiesData: dataEnemies
          // });
        });
      });

      socket.on('selectedHeroes', () => {
        let summonedHeroes = [];
        User.find({
          username: playerName
        }, {
          _id: 0,
          'heroes.summoned': 1,
          'heroes.name': 1,
          'heroes.stars': 1,
          'heroes.class': 1,
          'heroes.level': 1,
          'heroes.color': 1,
          'heroes.icon_selected_path': 1,
          'heroes.power': 1,
          'heroes.position_number': 1,
          'avatar.labelsTitle': 1,
          'avatar.buttonsTitle': 1,
          'avatar.bannersTitle': 1
        }, (err, data) => {
          if (err) throw err;
          // console.log(data[0].avatar[0].buttonsTitle);
          for (let item of data[0].heroes) {
            if (item.summoned === 'yes') {
              summonedHeroes.push(item);
            }
          }
          // console.log(summonedHeroes);
          socket.emit('selectedHeroesData', {
            // heroesMsg: data[0].heroes
            heroes: summonedHeroes,
            attack: data[0].avatar[0].buttonsTitle[16],
            textPower: data[0].avatar[0].labelsTitle[24],
            selectHeroes: data[0].avatar[0].bannersTitle[3],
            lowHeroes: data[0].avatar[0].labelsTitle[25]
            // name: data[0].heroes[0].name,
            // stars: data[0].heroes[0].stars,
            // class: data[0].heroes[0].class,  //dodelat dotaz, v DB dopsat icon_selected_path
          });
        });
      });

      socket.on('battle', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar.buttonsTitle': 1
        }, (err, data) => {
          if (err) throw err;
          socket.emit('battleData', {
            auto: data[0].avatar[0].buttonsTitle[17]
          });
        });
        countdownTimer(20, 'battleTimerStarted', 'battleTimerEnded');
      });

      let battleHeroesArray = [];
      // const battleHeroesCoordinationArray = [
      //   [826, 624],
      //   [654, 462],
      //   [482, 624],
      //   [310, 462],
      //   [138, 624]
      // ];
      // const battleEnemiesCoordinationArray = [
      //   [1098, 624],
      //   [1278, 462],
      //   [1458, 624],
      //   [1638, 462],
      //   [1818, 624]
      // ];

      socket.on('battleHeroes', (selectedHeroList, difficulty, chapter) => {
        async function findHero(heroName) {
          User.find({
            username: playerName,
            'heroes.name': heroName
          }, {
            '_id': 0,
            'heroes.$': 1
          }, (err, data) => {
            if (err) throw err;
            // console.log(data[0].heroes[0].name);
            battleHeroesArray.push({
              name: data[0].heroes[0].name,
              basicAttackType: data[0].heroes[0].basic_atk_type,
              attackRange: data[0].heroes[0].attack_range,
              power: data[0].heroes[0].power,
              health: data[0].heroes[0].health,
              attackDamage: data[0].heroes[0].attack_damage,
              abilityPower: data[0].heroes[0].ability_power,
              armor: data[0].heroes[0].armor,
              magicResist: data[0].heroes[0].magic_resist,
              attackSpeed: data[0].heroes[0].attack_speed,
              healthRegen: data[0].heroes[0].health_regen,
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
              shieldEffect: data[0].heroes[0].shield_effect
            });
            // battleHeroesArray.push(hero);
            // console.log('heroName:', heroName);
            if (battleHeroesArray.length === selectedHeroList.length) {
              Enemies.find({
                'map_location': {
                  $elemMatch: {
                    'type_location': difficulty,
                    'chapter': chapter
                  }
                }
              }, {
                '_id': 0,
                'image_path': 1,
                'name': 1,
                'class': 1,
                'position': 1,
                'basic_atk_type': 1,
                'attack_range': 1,
                'power': 1,
                'health': 1,
                'attack_damage': 1,
                'ability_power': 1,
                'armor': 1,
                'magic_resist': 1,
                'level': 1,
                'map_location.$': 1
              }, (err, dataEnemies) => {
                // console.log(data);
                if (err) throw err;
                // console.log(battleHeroesArray);
                socket.emit('battleHeroesData', {
                  heroArray: battleHeroesArray,
                  // heroesBattleCoordination: battleHeroesCoordinationArray,
                  // enemiesBattleCoordination: battleEnemiesCoordinationArray,
                  enemiesArray: dataEnemies
                });
              });
            }
          });
        }

        async function processArray(array) {
          // map array to promises
          const promises = array.map(findHero);
          // wait until all promises are resolved
          await Promise.all(promises);
          // for (const heroName of array) {
          //   await findHero(heroName);
          // }
          // console.log('Done!');
        }

        processArray(selectedHeroList).then(() => {
          console.log('Done!');
          // console.log(difficulty, chapter);
        });

      });





      // for (const heroName of selectedHeroList) {
      //   console.log(selectedHeroList.indexOf(heroName), heroName);
      //   await findHero(heroName);
      // }
      //






      socket.on('btnSummonx1BoMMsg', (data) => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'heroes': {
            $elemMatch: {
              'name': 'Leryssa'
            }
          },
          'heroes.urlName': 1
        }, (err, heroes) => {
          if (err) throw err;
          socket.emit('summonLeryssa', {
            message: heroes
          });
        });
        countdownTimer(20, 'timer5minutesStarted', 'timer5minutesEnded');
      });

      socket.on('btnSummonx1GBoMMsg', (data) => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'heroes': {
            $elemMatch: {
              'name': 'Leona'
            }
          },
          'heroes.urlName': 1
        }, (err, heroes) => {
          if (err) throw err;
          socket.emit('summonLeona', {
            message: heroes
          });
        });
        countdownTimer(30, 'timer46hoursStarted', 'timer46hoursEnded');
      });

      // socket.on('btnSkipMsg', (data) => {
      //   storyTutorialNotDone = false;
      //   if (user.avatar[0].storyTutorial === 'yes') {
      //     user.avatar[0].storyTutorial = 'no';
      //     user.save();
      //     console.log('Save "no" to storyTutorial in DB.');
      //   }
      //   console.log('Story tutorial:', user.avatar[0].storyTutorial);
      //   console.log('Tutorial:', user.avatar[0].tutorial);
      //
      //   if (storyTutorialNotDone === false) { // == storyTutorial is done
      //     // message: user.heroes
      //     sendMainScreenContainerData(user);
      //   }
      // });

      // socket.on('scrollContainer', () => {
      //   User.find({username: playerName}, {
      //     _id: 0, 'avatar': 1
      //   }, (err, data) => {
      //     if (err) throw err;
      //     socket.emit('scrollContainerData', {
      //       heroes: user.avatar[0].scrollIconsTitle[0],
      //       inventory: user.avatar[0].scrollIconsTitle[1],
      //       tasks: user.avatar[0].scrollIconsTitle[2],
      //       trials: user.avatar[0].scrollIconsTitle[3],
      //       battle: user.avatar[0].scrollIconsTitle[4],
      //       markets: user.avatar[0].scrollIconsTitle[5],
      //       arena: user.avatar[0].scrollIconsTitle[6],
      //       grandArena: user.avatar[0].scrollIconsTitle[7],
      //       arenaShop: user.avatar[0].scrollIconsTitle[8],
      //       grandArenaShop: user.avatar[0].scrollIconsTitle[9],
      //       guildShop: user.avatar[0].scrollIconsTitle[10],
      //       crusadeShop: user.avatar[0].scrollIconsTitle[11],
      //       fantasyShop: user.avatar[0].scrollIconsTitle[12],
      //       shop: user.avatar[0].scrollIconsTitle[13]
      //     });
      //   });
      // });

      socket.on('summonBooks', () => {
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
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
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
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
        User.find({
          username: playerName
        }, {
          _id: 0,
          'avatar': 1
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