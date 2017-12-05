'use strict';

const Avatar = require('../models/avatar');
const mongoose = require('mongoose');
const Language = require('../models/language');

mongoose.connect('localhost:27017/2DHTML5Game');

let ava = Avatar
  .aggregate()
  .match({
    language: 'english'
  })
  .lookup({
    from: 'languages',
    localField: 'language',
    foreignField: 'language',
    as: 'inGameIconsTitle'
  })
  .unwind('inGameIconsTitle')
  .project({
    "inGameIconsTitle.scrollIconsTitle": 1,
    "inGameIconsTitle.mainScreenIconsTitle": 1
  })
  .exec((err, results) => {
    console.log(results);
  });

let avatars = [
  new Avatar({
    // nickname: 'Unknown',
    // playerStatus: 'offline',
    // storyTutorial: 'yes',
    // tutorial: 'yes',
    icon_avatar_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/mainscreen/icon_avatar_image.png',
    avatar_border_path: 'avatar_border_wood',
    player_lvl: 1,
    max_hero_lvl: 10,
    current_exp: 0,
    next_lvl_exp: 8,
    current_energy: 60,
    max_energy: 60,
    gold: 0,
    diamond: 500,
    // language: 'english',
    mainScreenIconsTitle: ['Map', 'Guild', 'Ranking', 'Friends', 'Crusade',
      'Mail', 'Town', 'Summon\nBooks'],
    scrollIconsTitle: ['Heroes', 'Inventory', 'Tasks', 'Trials', 'Battle',
      'Markets', 'Arena', 'Grand\nArena', 'Arena\nShop', 'Grand\nArena\nShop',
      'Guild\nShop', 'Crusade\nShop', 'Fantasy\nShop', 'Shop'],
    bannersTitle: ['Change Name', 'Book of Magic', 'Grand Book of Magic'],
    buttonsTitle: ['FAQ', 'Change Avatar', 'Change Border', 'Change Name',
      'Achievement', 'System Settings', 'Cancel', 'Confirm', 'Summon ×1',
      'Summon ×10', '1 More', '10 More'],
    labelsTitle: ['Level', 'Present Exp', 'Max Hero Level', 'Account ID', 'Free',
      'Free Times ', 'Free Time', 'Free after ', '/5', '10000', '90000', '288',
      '2592', '10% OFF'],
    heroInfoIconsTitle: ['Stats', 'Glyphs', 'Skills', 'Equip', "This hero's mysterious\n"+
      "power has not been\nawakened. Stay tuned!", 'Base Stat', ' +Equipment'],
    heroStatsTitle: ['Health', 'Attack Damage', 'Ability Power', 'Armor', 'Magic Resist',
      'Armor Penetration', 'Magic Penetration', 'Attack Speed', 'Critical Damage',
      'Critikal Strike', 'Dodge', 'Energy Boost', 'Energy Regeneration', 'Energy Steal',
      'Healing Effect', 'Health Regeneration', 'Life Steal', 'Shield Effect']
  }),
];

Avatar.remove({}, function(err) {
    if (err) {
      console.err(err)
    } else {
      console.log('Remove all!');
    }
  }
);

let done = 0;

for (let i = 0; i < avatars.length; i++) {
  avatars[i].save( (err, result) => {
    done++;
    if (done === avatars.length) {
      exit();
    }
  });
}

// spojeni tabulky vatar s language - v DB funguje jak si predtavuju, tu ne
// Avatar
//   .aggregate()
//   .match({
//     language: 'english'
//   })
//   .lookup({
//     from: 'languages',
//     localField: 'language',
//     foreignField: 'language',
//     as: 'inGameIconsTitle'
//   })
//   .unwind('inGameIconsTitle')
//   .project({
//     "nickname": 1,
//     "playerStatus": 1,
//     "inGameIconsTitle.scrollIconsTitle": 1,
//     "inGameIconsTitle.mainScreenIconsTitle": 1
//   })
//   .exec((err, results) => {
//     console.log(results);
//   });

function exit() {
  mongoose.disconnect();
}
