'use strict';

const Avatar = require('../models/avatar');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let avatars = [
  new Avatar({
    nickname: ' ',
    playerStatus: 'offline',
    tutorial: 'yes',
    icon_avatar_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/mainscreen/icon_avatar_image.png',
    icon_avatar_border_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/mainscreen/icon_avatar.png',
    player_lvl: 1,
    max_hero_lvl: 10,
    current_exp: 0,
    next_lvl_exp: 8,
    energy: 60,
    gold: 0,
    diamond: 500
  }),
];

let done = 0;

for (let i = 0; i < avatars.length; i++) {
  avatars[i].save( (err, result) => {
    done++;
    if (done === avatars.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
