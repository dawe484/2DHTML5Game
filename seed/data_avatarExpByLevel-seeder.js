'use strict';

const AvatarExpByLevel = require('../models/data_avatarExpByLevel');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/2DHTML5Game');

let data_avatarExpByLevel = [
  new AvatarExpByLevel({
    avatar_curr_lvl: 1,
    avatar_next_lvl: 2,
    avatar_next_lvl_exp: 8
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 2,
    avatar_next_lvl: 3,
    avatar_next_lvl_exp: 10
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 3,
    avatar_next_lvl: 4,
    avatar_next_lvl_exp: 35
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 4,
    avatar_next_lvl: 5,
    avatar_next_lvl_exp: 45
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 5,
    avatar_next_lvl: 6,
    avatar_next_lvl_exp: 60
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 6,
    avatar_next_lvl: 7,
    avatar_next_lvl_exp: 70
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 7,
    avatar_next_lvl: 8,
    avatar_next_lvl_exp: 70
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 8,
    avatar_next_lvl: 9,
    avatar_next_lvl_exp: 80
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 9,
    avatar_next_lvl: 10,
    avatar_next_lvl_exp: 90
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 10,
    avatar_next_lvl: 11,
    avatar_next_lvl_exp: 110
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 11,
    avatar_next_lvl: 12,
    avatar_next_lvl_exp: 110
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 12,
    avatar_next_lvl: 13,
    avatar_next_lvl_exp: 120
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 13,
    avatar_next_lvl: 14,
    avatar_next_lvl_exp: 120
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 14,
    avatar_next_lvl: 15,
    avatar_next_lvl_exp: 130
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 15,
    avatar_next_lvl: 16,
    avatar_next_lvl_exp: 130
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 16,
    avatar_next_lvl: 17,
    avatar_next_lvl_exp: 130
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 17,
    avatar_next_lvl: 18,
    avatar_next_lvl_exp: 130
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 18,
    avatar_next_lvl: 19,
    avatar_next_lvl_exp: 130
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 19,
    avatar_next_lvl: 20,
    avatar_next_lvl_exp: 150
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 20,
    avatar_next_lvl: 21,
    avatar_next_lvl_exp: 250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 21,
    avatar_next_lvl: 22,
    avatar_next_lvl_exp: 250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 22,
    avatar_next_lvl: 23,
    avatar_next_lvl_exp: 250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 23,
    avatar_next_lvl: 24,
    avatar_next_lvl_exp: 250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 24,
    avatar_next_lvl: 25,
    avatar_next_lvl_exp: 300
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 25,
    avatar_next_lvl: 26,
    avatar_next_lvl_exp: 330
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 26,
    avatar_next_lvl: 27,
    avatar_next_lvl_exp: 350
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 27,
    avatar_next_lvl: 28,
    avatar_next_lvl_exp: 350
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 28,
    avatar_next_lvl: 29,
    avatar_next_lvl_exp: 370
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 29,
    avatar_next_lvl: 30,
    avatar_next_lvl_exp: 370
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 30,
    avatar_next_lvl: 31,
    avatar_next_lvl_exp: 370
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 31,
    avatar_next_lvl: 32,
    avatar_next_lvl_exp: 450
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 32,
    avatar_next_lvl: 33,
    avatar_next_lvl_exp: 450
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 33,
    avatar_next_lvl: 34,
    avatar_next_lvl_exp: 450
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 34,
    avatar_next_lvl: 35,
    avatar_next_lvl_exp: 600
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 35,
    avatar_next_lvl: 36,
    avatar_next_lvl_exp: 700
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 36,
    avatar_next_lvl: 37,
    avatar_next_lvl_exp: 800
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 37,
    avatar_next_lvl: 38,
    avatar_next_lvl_exp: 800
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 38,
    avatar_next_lvl: 39,
    avatar_next_lvl_exp: 800
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 39,
    avatar_next_lvl: 40,
    avatar_next_lvl_exp: 1200
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 40,
    avatar_next_lvl: 41,
    avatar_next_lvl_exp: 1200
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 41,
    avatar_next_lvl: 42,
    avatar_next_lvl_exp: 1300
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 42,
    avatar_next_lvl: 43,
    avatar_next_lvl_exp: 1400
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 43,
    avatar_next_lvl: 44,
    avatar_next_lvl_exp: 1400
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 44,
    avatar_next_lvl: 45,
    avatar_next_lvl_exp: 1400
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 45,
    avatar_next_lvl: 46,
    avatar_next_lvl_exp: 1900
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 46,
    avatar_next_lvl: 47,
    avatar_next_lvl_exp: 1900
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 47,
    avatar_next_lvl: 48,
    avatar_next_lvl_exp: 1900
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 48,
    avatar_next_lvl: 49,
    avatar_next_lvl_exp: 1900
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 49,
    avatar_next_lvl: 50,
    avatar_next_lvl_exp: 3000
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 50,
    avatar_next_lvl: 51,
    avatar_next_lvl_exp: 3250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 51,
    avatar_next_lvl: 52,
    avatar_next_lvl_exp: 3250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 52,
    avatar_next_lvl: 53,
    avatar_next_lvl_exp: 3250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 53,
    avatar_next_lvl: 54,
    avatar_next_lvl_exp: 3250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 54,
    avatar_next_lvl: 55,
    avatar_next_lvl_exp: 3250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 55,
    avatar_next_lvl: 56,
    avatar_next_lvl_exp: 3250
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 56,
    avatar_next_lvl: 57,
    avatar_next_lvl_exp: 3400
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 57,
    avatar_next_lvl: 58,
    avatar_next_lvl_exp: 3400
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 58,
    avatar_next_lvl: 59,
    avatar_next_lvl_exp: 3520
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 59,
    avatar_next_lvl: 60,
    avatar_next_lvl_exp: 3640
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 60,
    avatar_next_lvl: 61,
    avatar_next_lvl_exp: 3880
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 61,
    avatar_next_lvl: 62,
    avatar_next_lvl_exp: 4070
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 62,
    avatar_next_lvl: 63,
    avatar_next_lvl_exp: 4070
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 63,
    avatar_next_lvl: 64,
    avatar_next_lvl_exp: 4470
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 64,
    avatar_next_lvl: 65,
    avatar_next_lvl_exp: 4470
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 65,
    avatar_next_lvl: 66,
    avatar_next_lvl_exp: 4470
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 66,
    avatar_next_lvl: 67,
    avatar_next_lvl_exp: 5090
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 67,
    avatar_next_lvl: 68,
    avatar_next_lvl_exp: 5320
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 68,
    avatar_next_lvl: 69,
    avatar_next_lvl_exp: 5320
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 69,
    avatar_next_lvl: 70,
    avatar_next_lvl_exp: 5780
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 70,
    avatar_next_lvl: 71,
    avatar_next_lvl_exp: 6000
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 71,
    avatar_next_lvl: 72,
    avatar_next_lvl_exp: 6280
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 72,
    avatar_next_lvl: 73,
    avatar_next_lvl_exp: 6550
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 73,
    avatar_next_lvl: 74,
    avatar_next_lvl_exp: 6820
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 74,
    avatar_next_lvl: 75,
    avatar_next_lvl_exp: 7100
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 75,
    avatar_next_lvl: 76,
    avatar_next_lvl_exp: 7400
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 76,
    avatar_next_lvl: 77,
    avatar_next_lvl_exp: 7700
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 77,
    avatar_next_lvl: 78,
    avatar_next_lvl_exp: 8000
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 78,
    avatar_next_lvl: 79,
    avatar_next_lvl_exp: 8300
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 79,
    avatar_next_lvl: 80,
    avatar_next_lvl_exp: 8600
  }),
  new AvatarExpByLevel({
    avatar_curr_lvl: 80,
    avatar_next_lvl: 81,
    avatar_next_lvl_exp: 8900
  }),
];

AvatarExpByLevel.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all!');
  }
});

let done = 0;

for (let i = 0; i < data_avatarExpByLevel.length; i++) {
  data_avatarExpByLevel[i].save(() => {
    done++;
    if (done === data_avatarExpByLevel.length) {
      // eslint-disable-next-line no-console
      console.log('All data saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}