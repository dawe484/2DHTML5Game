'use strict';

const GoldPlusByLevel = require('../models/data_goldPlusByLevel');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let data_goldPlusByLevel = [
  new GoldPlusByLevel({
    avatar_curr_lvl: 1,
    gold_plus: 7654
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 2,
    gold_plus: 7960
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 3,
    gold_plus: 8278
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 4,
    gold_plus: 8609
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 5,
    gold_plus: 8953
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 6,
    gold_plus: 9311
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 7,
    gold_plus: 9683
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 8,
    gold_plus: 10070
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 9,
    gold_plus: 10472
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 10,
    gold_plus: 10890
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 11,
    gold_plus: 11325
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 12,
    gold_plus: 11778
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 13,
    gold_plus: 12249
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 14,
    gold_plus: 12738
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 15,
    gold_plus: 13247
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 16,
    gold_plus: 13776
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 17,
    gold_plus: 14327
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 18,
    gold_plus: 14900
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 19,
    gold_plus: 15496
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 20,
    gold_plus: 16115
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 21,
    gold_plus: 16759
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 22,
    gold_plus: 17429
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 23,
    gold_plus: 18126
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 24,
    gold_plus: 18851
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 25,
    gold_plus: 19605
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 26,
    gold_plus: 20389
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 27,
    gold_plus: 21204
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 28,
    gold_plus: 22052
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 29,
    gold_plus: 22934
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 30,
    gold_plus: 23851
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 31,
    gold_plus: 24805
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 32,
    gold_plus: 25797
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 33,
    gold_plus: 26828
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 34,
    gold_plus: 27901
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 35,
    gold_plus: 29017
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 36,
    gold_plus: 30177
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 37,
    gold_plus: 31384
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 38,
    gold_plus: 32639
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 39,
    gold_plus: 33944
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 40,
    gold_plus: 35301
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 41,
    gold_plus: 36713
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 42,
    gold_plus: 38181
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 43,
    gold_plus: 39708
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 44,
    gold_plus: 41296
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 45,
    gold_plus: 42947
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 46,
    gold_plus: 44664
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 47,
    gold_plus: 46450
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 48,
    gold_plus: 48308
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 49,
    gold_plus: 50240
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 50,
    gold_plus: 52249
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 51,
    gold_plus: 54338
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 52,
    gold_plus: 56511
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 53,
    gold_plus: 58771
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 54,
    gold_plus: 61121
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 55,
    gold_plus: 63565
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 56,
    gold_plus: 66107
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 57,
    gold_plus: 68751
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 58,
    gold_plus: 71501
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 59,
    gold_plus: 74361
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 60,
    gold_plus: 77335
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 61,
    gold_plus: 80428
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 62,
    gold_plus: 83645
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 63,
    gold_plus: 86990
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 64,
    gold_plus: 90469
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 65,
    gold_plus: 94087
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 66,
    gold_plus: 97850
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 67,
    gold_plus: 101764
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 68,
    gold_plus: 105834
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 69,
    gold_plus: 110067
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 70,
    gold_plus: 114469
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 71,
    gold_plus: 119047
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 72,
    gold_plus: 123808
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 73,
    gold_plus: 128760
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 74,
    gold_plus: 133910
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 75,
    gold_plus: 139266
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 76,
    gold_plus: 144836
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 77,
    gold_plus: 150629
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 78,
    gold_plus: 156654
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 79,
    gold_plus: 162920
  }),
  new GoldPlusByLevel({
    avatar_curr_lvl: 80,
    gold_plus: 169436
  }),
];

GoldPlusByLevel.remove({}, function(err) {
    if (err) {
      console.err(err)
    } else {
      console.log('Remove all!');
    }
  }
);

let done = 0;

for (let i = 0; i < data_goldPlusByLevel.length; i++) {
  data_goldPlusByLevel[i].save( (err, result) => {
    done++;
    if (done === data_goldPlusByLevel.length) {
      console.log('All data saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
