'use strict';

const HeroExpByLevel = require('../models/data_heroExpByLevel');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/2DHTML5Game');
mongoose.connect('mongodb://leyzi:NYC18vol@ds019664.mlab.com:19664/mh_db');

let data_heroExpByLevel = [
  new HeroExpByLevel({
    hero_curr_lvl: 1,
    hero_next_lvl: 2,
    // hero_curr_lvl_exp: 0,
    hero_next_lvl_exp: 8
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 2,
    hero_next_lvl: 3,
    // hero_curr_lvl_exp: 8,
    hero_next_lvl_exp: 12
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 3,
    hero_next_lvl: 4,
    hero_next_lvl_exp: 16
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 4,
    hero_next_lvl: 5,
    hero_next_lvl_exp: 28
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 5,
    hero_next_lvl: 6,
    hero_next_lvl_exp: 40
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 6,
    hero_next_lvl: 7,
    hero_next_lvl_exp: 60
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 7,
    hero_next_lvl: 8,
    hero_next_lvl_exp: 80
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 8,
    hero_next_lvl: 9,
    hero_next_lvl_exp: 100
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 9,
    hero_next_lvl: 10,
    hero_next_lvl_exp: 120
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 10,
    hero_next_lvl: 11,
    hero_next_lvl_exp: 140
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 11,
    hero_next_lvl: 12,
    hero_next_lvl_exp: 180
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 12,
    hero_next_lvl: 13,
    hero_next_lvl_exp: 220
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 13,
    hero_next_lvl: 14,
    hero_next_lvl_exp: 260
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 14,
    hero_next_lvl: 15,
    hero_next_lvl_exp: 300
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 15,
    hero_next_lvl: 16,
    hero_next_lvl_exp: 340
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 16,
    hero_next_lvl: 17,
    hero_next_lvl_exp: 420
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 17,
    hero_next_lvl: 18,
    hero_next_lvl_exp: 500
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 18,
    hero_next_lvl: 19,
    hero_next_lvl_exp: 580
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 19,
    hero_next_lvl: 20,
    hero_next_lvl_exp: 660
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 20,
    hero_next_lvl: 21,
    hero_next_lvl_exp: 740
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 21,
    hero_next_lvl: 22,
    hero_next_lvl_exp: 860
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 22,
    hero_next_lvl: 23,
    hero_next_lvl_exp: 980
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 23,
    hero_next_lvl: 24,
    hero_next_lvl_exp: 1100
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 24,
    hero_next_lvl: 25,
    hero_next_lvl_exp: 1220
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 25,
    hero_next_lvl: 26,
    hero_next_lvl_exp: 1340
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 26,
    hero_next_lvl: 27,
    hero_next_lvl_exp: 1520
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 27,
    hero_next_lvl: 28,
    hero_next_lvl_exp: 1700
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 28,
    hero_next_lvl: 29,
    hero_next_lvl_exp: 1880
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 29,
    hero_next_lvl: 30,
    hero_next_lvl_exp: 2060
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 30,
    hero_next_lvl: 31,
    hero_next_lvl_exp: 2240
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 31,
    hero_next_lvl: 32,
    hero_next_lvl_exp: 2500
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 32,
    hero_next_lvl: 33,
    hero_next_lvl_exp: 2760
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 33,
    hero_next_lvl: 34,
    hero_next_lvl_exp: 3020
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 34,
    hero_next_lvl: 35,
    hero_next_lvl_exp: 3280
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 35,
    hero_next_lvl: 36,
    hero_next_lvl_exp: 3540
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 36,
    hero_next_lvl: 37,
    hero_next_lvl_exp: 3900
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 37,
    hero_next_lvl: 38,
    hero_next_lvl_exp: 4260
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 38,
    hero_next_lvl: 39,
    hero_next_lvl_exp: 4620
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 39,
    hero_next_lvl: 40,
    hero_next_lvl_exp: 4980
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 40,
    hero_next_lvl: 41,
    hero_next_lvl_exp: 5340
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 41,
    hero_next_lvl: 42,
    hero_next_lvl_exp: 5780
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 42,
    hero_next_lvl: 43,
    hero_next_lvl_exp: 6220
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 43,
    hero_next_lvl: 44,
    hero_next_lvl_exp: 6660
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 44,
    hero_next_lvl: 45,
    hero_next_lvl_exp: 7100
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 45,
    hero_next_lvl: 46,
    hero_next_lvl_exp: 7540
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 46,
    hero_next_lvl: 47,
    hero_next_lvl_exp: 7980
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 47,
    hero_next_lvl: 48,
    hero_next_lvl_exp: 8420
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 48,
    hero_next_lvl: 49,
    hero_next_lvl_exp: 8860
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 49,
    hero_next_lvl: 50,
    hero_next_lvl_exp: 9300
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 50,
    hero_next_lvl: 51,
    hero_next_lvl_exp: 9740
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 51,
    hero_next_lvl: 52,
    hero_next_lvl_exp: 10740
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 52,
    hero_next_lvl: 53,
    hero_next_lvl_exp: 11240
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 53,
    hero_next_lvl: 54,
    hero_next_lvl_exp: 11740
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 54,
    hero_next_lvl: 55,
    hero_next_lvl_exp: 12240
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 55,
    hero_next_lvl: 56,
    hero_next_lvl_exp: 12740
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 56,
    hero_next_lvl: 57,
    hero_next_lvl_exp: 13240
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 57,
    hero_next_lvl: 58,
    hero_next_lvl_exp: 13740
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 58,
    hero_next_lvl: 59,
    hero_next_lvl_exp: 14240
  }),
  new HeroExpByLevel({
    hero_curr_lvl: 59,
    hero_next_lvl: 60,
    hero_next_lvl_exp: 14740
  }),
];

HeroExpByLevel.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all!');
  }
});

let done = 0;

for (let i = 0; i < data_heroExpByLevel.length; i++) {
  data_heroExpByLevel[i].save(() => {
    done++;
    if (done === data_heroExpByLevel.length) {
      // eslint-disable-next-line no-console
      console.log('All data saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}