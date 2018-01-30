'use strict';

const Avatar = require('../models/avatar');
const mongoose = require('mongoose');
// const Language = require('../models/language');
// const Glyph = require('../models/glyph');

mongoose.connect('localhost:27017/2DHTML5Game');

// let oneOne = Glyph.find(
//   { 'map_location.chapter': '1-1' },
//   { '_id': 0, 'map_location.$': 1 },
// (err, glyphs) => {
//   if (err) throw err;
//   for (let index in glyphs) {
//     // console.log(glyphs[index].map_location[0].type_location, glyphs[index].map_location[0].chapter);
//     console.log(glyphs[index].map_location);
//     // let pom = glyphs[index].map_location;
//     // return pom;
//   }
//   // doc.glyph = glyph;
//   // doc.save();
// }
// );

// console.log(oneOne);

// let ava = Avatar
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
//     "inGameIconsTitle.scrollIconsTitle": 1,
//     "inGameIconsTitle.mainScreenIconsTitle": 1
//   })
//   .exec((err, results) => {
//     console.log(results);
//   });

let avatars = [
  new Avatar({
    // nickname: 'Unknown',
    // playerStatus: 'offline',
    // storyTutorial: 'yes',
    // tutorial: 'yes',
    // avatar_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/mainscreen/icon_avatar_image.png',
    // avatar_border_path: '/images/game/icons/avatar_border_wood.png',
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
    bannersTitle: ['Change Name', 'Book of Magic', 'Grand Book of Magic',
      'Select Heroes', 'Victory', 'Defeat', 'Statistics'],
    buttonsTitle: ['Skip', 'FAQ', 'Change Avatar', 'Change Border', 'Change Name',
      'Achievement', 'System Settings', 'Cancel', 'Confirm', 'Summon ×1',
      'Summon ×10', '1 More', '10 More', 'Sweep', 'Sweep x10', 'Start', 'Attack',
      'Auto', 'Exit', 'On', 'Off', 'Continue', 'Damage Dealt', 'Healing Done',
      'Damage Received', 'Healing Received', 'Buy', 'OK'],
    labelsTitle: ['Level', 'Present Exp', 'Max Hero Level', 'Account ID', 'Free',
      'Free Times ', 'Free Time', 'Free after ', '/5', '10000', '90000', '288',
      '2592', '10% OFF', 'Consume:', 'Enemies Power:', 'Enemies:', 'Possible Rewards',
      'Sound: ', 'Music: ', 'Lv: ', 'Exp: ', 'Buy:', 'Cost:', 'Power: '],
    heroInfoIconsTitle: ['Stats', 'Glyphs', 'Skills', 'Equip', "This hero's mysterious\n"+
      "power has not been\nawakened. Stay tuned!", 'Base Stat', ' +Equipment'],
    heroStatsTitle: ['Health', 'Attack Damage', 'Ability Power', 'Armor', 'Magic Resist',
      'Attack Speed', 'Health Regeneration', 'Movement Speed', 'Energy Regeneration',
      'Critical Damage', 'Critikal Strike', 'Hit', 'Dodge', 'Life Steal', 'Energy Steal',
      'Energy Boost', 'Armor Penetration', 'Magic Penetration', 'Healing Effect',
      'Shield Effect'],
    backgroundTitle: ['Loading...', 'A small amount of diamonds.\nDo you want to recharge?'],
    progress: [
      {
        difficulty: 'Normal',
        opened: 'yes',
        text: 'Progress',
        chapter: '1-1',
        // paragraphNumber: 1
      },
      {
        difficulty: 'Elite',
        opened: 'no',
        text: 'Normal',
        chapter: '2-6',
        // paragraphNumber: 6
      },
      {
        difficulty: 'Legend',
        opened: 'no',
        text: 'Normal',
        chapter: '3-8',
        // paragraphNumber: 8
      }
    ],
    paragraphs: [
      {
        p_difficulty: 'Normal',
        p_chapter: '1-1',
        // p_paragraphNumber: 1,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Beginning',
        p_description: 'Our story just start. Defeat all enemies\n'+
          'and you maybe figure out who stole\nall magic books.',
        p_staminaConsume: 6,
        // p_enemies: [ String ],
        // p_possibleRewards: [ String ]
        p_reward_heroExp: 12, //6, //12
        p_reward_money: 531, //325, //531
        p_reward_avatarExp: 6, //6
        p_reward: [
          // User.findOne({username: username}, (err, doc) => {
          //   Hero.find( (err, heroes) => {
          //     for (let i = 0; i < heroes.length; i++) {
          //       doc.heroes = heroes;
          //       doc.save();
          //     }
          //   });
          //   Avatar.find( (err, avatar) => {
          //     console.log(avatar);
          //     doc.avatar = avatar;
          //     doc.save();
          //   });
          // });
          // Glyph.find(
          //   { 'map_location.chapter': '1-1' },
          //   { '_id': 0, 'map_location.$': 1 },
          // (err, glyphs) => {
          //   if (err) throw err;
          //   for (let index in glyphs) {
          //     // console.log(glyphs[index].map_location[0].type_location, glyphs[index].map_location[0].chapter);
          //     // console.log(glyphs[index].map_location);
          //     glyphs.save(glyphs[index].map_location);
          //   }
          // }
          // ),
          { reward_type: 'glyph', reward_title: 'Health' },
          { reward_type: 'glyph', reward_title: 'Health Regen' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '1-2',
        // p_paragraphNumber: 2,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 1-2',
        p_description: 'Paragraph 1-2 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 15, //8, //15
        p_reward_money: 553, //326, //553
        p_reward_avatarExp: 6, //8 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Armor' },
          { reward_type: 'glyph', reward_title: 'Attack Damage' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '1-3',
        // p_paragraphNumber: 3,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 1-3',
        p_description: 'Paragraph 1-3 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 18, //12, //18
        p_reward_money: 543, //332, //543
        p_reward_avatarExp: 6, //12 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Ability Power' },
          { reward_type: 'glyph', reward_title: 'Magic Resist' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '1-4',
        // p_paragraphNumber: 4,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 1-4',
        p_description: 'Paragraph 1-4 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 20, //14, //20
        p_reward_money: 509, //337, //509
        p_reward_avatarExp: 6, //14 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Attack Force' },
          { reward_type: 'glyph', reward_title: 'Energy Regen' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '1-5',
        // p_paragraphNumber: 5,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 1-5',
        p_description: 'Paragraph 1-5 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 20, //20
        p_reward_money: 554, //343, //554
        p_reward_avatarExp: 6, //20 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Double Attack' },
          { reward_type: 'glyph', reward_title: 'Regenerate' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '1-6',
        // p_paragraphNumber: 6,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 1-6',
        p_description: 'Paragraph 1-6 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 20, //26, //20
        p_reward_money: 618, //364, //618
        p_reward_avatarExp: 6, //26 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Hardiness' },
          { reward_type: 'glyph', reward_title: 'Magic Force' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '2-1',
        // p_paragraphNumber: 1,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 2-1',
        p_description: 'Paragraph 2-1 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 20, //26, //20
        p_reward_money: 664, //374, //664
        p_reward_avatarExp: 6, //26 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Armor Penetration' },
          { reward_type: 'glyph', reward_title: 'Extra Health' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '2-2',
        // p_paragraphNumber: 2,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 2-2',
        p_description: 'Paragraph 2-2 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 21, //28, //21
        p_reward_money: 599, //405, //599
        p_reward_avatarExp: 6, //28 //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Crit Strike' },
          { reward_type: 'glyph', reward_title: 'Divine Power' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '2-3',
        // p_paragraphNumber: 3,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 2-3',
        p_description: 'Paragraph 2-3 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 22, //28, //22
        p_reward_money: 690, //439, //690
        p_reward_avatarExp: 6, //28 //6    // v 6->7 level, dale je na obr 771 splneni daily q -> navyseni account levelu
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Magic Penetration' },
          { reward_type: 'glyph', reward_title: 'Fortitude' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '2-4',
        // p_paragraphNumber: 4,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 2-4',
        p_description: 'Paragraph 2-4 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 22, //22
        p_reward_money: 637, //637
        p_reward_avatarExp: 6, //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Aggression' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '2-5',
        // p_paragraphNumber: 5,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 2-5',
        p_description: 'Paragraph 2-5 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 22, //22
        p_reward_money: 590, //590
        p_reward_avatarExp: 6, //6
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Meditation' }
        ]
      },
      {
        p_difficulty: 'Normal',
        p_chapter: '2-6',
        // p_paragraphNumber: 6,
        p_paragraphIcon: 'stageIcon',
        p_bannerTitle: 'Paragraph 2-6',
        p_description: 'Paragraph 2-6 - description',
        p_staminaConsume: 6,
        p_reward_heroExp: 23, //30, //23
        p_reward_money: 742, //, //742
        p_reward_avatarExp: 6, //30 //6 // acc level 9, hero lvl 8
        p_reward: [
          { reward_type: 'glyph', reward_title: 'Bloodthirst' }
        ]
      },
      // {
      //   p_difficulty: 'Normal',
      //   p_chapterNumber: 2,
      //   p_paragraphNumber: 7,
      //   p_paragraphIcon: 'stageIcon',
      //   p_bannerTitle: 'Paragraph 2-7',
      //   p_description: 'Paragraph 2-7 - description',
      //   p_staminaConsume: 6,
      //   p_reward_heroExp: 23, //23
      //   p_reward_money: 804, //804
      //   p_reward_avatarExp: 6 //6
      // },
      // {
      //   p_difficulty: 'Normal',
      //   p_chapterNumber: 3,
      //   p_paragraphNumber: 1,
      //   p_paragraphIcon: 'stageIcon',
      //   p_bannerTitle: 'Paragraph 3-1',
      //   p_description: 'Paragraph 3-1 - description',
      //   p_staminaConsume: 6,
      //   p_reward_heroExp: 24, //24
      //   p_reward_money: 768, //768
      //   p_reward_avatarExp: 6 //6
      // },

      // after finished 'Chapter 2 - Paragraph 6' ELITE difficulty open
      // {
      //   p_difficulty: 'Elite',
      //   p_chapterNumber: 1,
      //   p_paragraphNumber: 1,
      //   p_paragraphIcon: 'stageIcon',
      //   p_bannerTitle: 'E-Paragraph 1-1',
      //   p_description: 'E-Paragraph 1-1 - description',
      //   p_staminaConsume: 6,
      //   p_reward_heroExp: 16, //
      //   p_reward_money: , //
      //   p_reward_avatarExp: 16 //
      // },

    ]
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
