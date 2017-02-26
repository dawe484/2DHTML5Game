'use strict';

const Sticker = require('../models/sticker');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let stickers = [
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Armor.png',
    title: 'Armor',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of armor.',
    attributes: [
      { title: 'armor', amount: 2 }
    ]
  }),
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Health_Regen.png',
    title: 'Health Regen',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of health regeneration.',
    attributes: [
      { title: 'health regen', amount: 60 }
    ]
  }),
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Double_Attack.png',
    title: 'Double Attack',
    rarity: 'Grey',
    level_req: 2,
    description: 'Magic in the left hand, sword in the right.',
    attributes: [
      { title: 'attack damage', amount: 5 },
      { title: 'ability power', amount: 5 }
    ]
  }),
];

let done = 0;

for (let i = 0; i < stickers.length; i++) {
  stickers[i].save( (err, result) => {
    done++;
    if (done === stickers.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
