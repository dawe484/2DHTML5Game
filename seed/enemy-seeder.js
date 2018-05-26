'use strict';

const Enemy = require('../models/enemy');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/2DHTML5Game');
mongoose.connect('mongodb://leyzi:NYC18vol@ds019664.mlab.com:19664/mh_db');

let enemies = [
  // Enemy 1
  new Enemy({
    icon_path: 'enemy_01/enemy_01_icon',
    // web_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa-web.png',
    image_path: 'enemy_01/enemy_01',
    // curr_pages: 0,
    // next_pages: 10,
    // urlName: 'leryssa',
    name: 'Enemy 1',
    // stars: 1,
    class: 'Tank',
    position: 'Front',
    description: 'Some kind of tank for enemy team :P',
    basic_atk_type: 'physical',
    level: 1,
    // hero_curr_lvl_exp: 0,
    // hero_next_lvl_exp: 8,
    // color: 'Grey',
    // color_number: 0,
    attack_range: 120,
    power: 57,
    // power_inc: 15,
    health: 836,
    // health_inc: 82,
    attack_damage: 37,
    // attack_damage_inc: 3,
    ability_power: 0,
    // ability_power_inc: 2.47,
    armor: 4,
    // armor_inc: 3,
    magic_resist: 4,
    // magic_resist_inc: 1.8,
    attack_speed: 100,
    attack_speed_inc: 0,
    // health_regen: 32,
    // health_regen_inc: 0.06,
    movement_speed: 345,
    // energy_regen: 300,
    // crit_damage_lvl: 0,
    // crit_strike_lvl: 0,
    // hit_lvl: 765,
    // dodge_lvl: 0,
    // life_steal_lvl: 0,
    // energy_steal: 0,
    // energy_boost: 0,
    // armor_pen: 0,
    // magic_pen: 0,
    // healing_effect: 0,
    // shield_effect: 0,
    // skills: [
    //   {
    //     icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
    //     title: 'Cannon Barrage',
    //     description: "Leryssa signals her ship to bombard an area, slowing and damaging enemies.\nSignals Leryssa's ship to fire 4 waves of cannonballs at an area over 8 seconds. Each wave deals (power+10% Ability Power)*1,1 magic damage and slows enemies by 30% for 2 seconds.",
    //     skill_type: 'magic',
    //     skill_level: 1,
    //     flat_dmg: 0,
    //     flat_dmg_inc: 1.1,
    //     skill_power: 0
    //   },
    //   {
    //     icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
    //     title: 'Yum-yum!!!',
    //     description: "Eats citrus to restore Health.\nLeryssa consumes a large quantity of citrus fruit, healing her for (+90% Ability Power) + 10% of her missing Health.",
    //     skill_type: 'magic',
    //     skill_level: 1,
    //     flat_dmg: 0,
    //     flat_dmg_inc: 0,
    //     skill_power: 0
    //   },
    //   {
    //     icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
    //     title: 'Parrrley',
    //     description: "Shoots enemy target.\nFires a bullet that deals 40 (+115% Attack Damage) physical damage (can crit).",
    //     skill_type: 'physical',
    //     skill_level: 1,
    //     flat_dmg: 40,
    //     flat_dmg_inc: 1.15,
    //     skill_power: 0
    //   },
    //   {
    //     icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
    //     title: 'Bane of the Seven Seas',
    //     description: "Leryssa's legendary sword grants increased damage and cleaves a large area of effect in front of her for a single strike.",
    //     skill_type: 'physical',
    //     skill_level: 1,
    //     flat_dmg: 0,
    //     flat_dmg_inc: 23,
    //     skill_power: 25
    //   }
    // ],
    money_reward: 121,
    map_location: [{
        type_location: 'Normal',
        chapter: '1-3',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-4',
        battle_screen: [2, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-6',
        battle_screen: [1, 2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-1',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-3',
        battle_screen: [2, 3]
      }
    ]
  }),
  new Enemy({
    icon_path: 'enemy_02/enemy_02_icon',
    image_path: 'enemy_02/enemy_02',
    name: 'Enemy 2',
    class: 'Mage',
    position: 'Middle',
    description: 'Enemy mage :P',
    basic_atk_type: 'magic',
    level: 1,
    attack_range: 360,
    power: 63,
    health: 916,
    attack_damage: 0,
    ability_power: 35,
    armor: 4,
    magic_resist: 4,
    attack_speed: 100,
    attack_speed_inc: 0,
    movement_speed: 375,
    money_reward: 139,
    map_location: [{
        type_location: 'Normal',
        chapter: '1-3',
        battle_screen: [2, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-2',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-5',
        battle_screen: [1, 2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-1',
        battle_screen: [2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-3',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-5',
        battle_screen: [1, 2, 3]
      }
    ]
  }),
  new Enemy({
    icon_path: 'enemy_03/enemy_03_icon',
    image_path: 'enemy_03/enemy_03',
    name: 'Enemy 3',
    class: 'Fighter',
    position: 'Front',
    description: 'Enemy fighter :P',
    basic_atk_type: 'physical',
    level: 1,
    attack_range: 160,
    power: 63,
    health: 816,
    attack_damage: 49,
    ability_power: 0,
    armor: 4,
    magic_resist: 4,
    attack_speed: 110,
    attack_speed_inc: 0,
    movement_speed: 335,
    money_reward: 139,
    map_location: [{
        type_location: 'Normal',
        chapter: '1-1',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-4',
        battle_screen: [2, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-6',
        battle_screen: [1, 2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-1',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-3',
        battle_screen: [2, 3]
      }
    ]
  }),
  new Enemy({
    icon_path: 'enemy_04/enemy_04_icon',
    image_path: 'enemy_04/enemy_04',
    name: 'Enemy 4',
    class: 'Fighter',
    position: 'Front',
    description: 'Enemy fighter :P',
    basic_atk_type: 'physical',
    level: 1,
    attack_range: 160,
    power: 63,
    health: 853,
    attack_damage: 30,
    ability_power: 35,
    armor: 4,
    magic_resist: 4,
    attack_speed: 105,
    attack_speed_inc: 0,
    movement_speed: 325,
    money_reward: 139,
    map_location: [
      // {
      //   type_location: 'Normal',
      //   chapter: '1-1',
      //   battle_screen: [1, 3]
      // },
      {
        type_location: 'Normal',
        chapter: '1-2',
        battle_screen: [2]
      },
      {
        type_location: 'Normal',
        chapter: '1-5',
        battle_screen: [1, 2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-1',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-3',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-5',
        battle_screen: [1, 2, 3]
      }
    ]
  }),
  new Enemy({
    icon_path: 'enemy_05/enemy_05_icon',
    image_path: 'enemy_05/enemy_05',
    name: 'Enemy 5',
    class: 'Support',
    position: 'Back',
    description: 'Enemy support :P',
    basic_atk_type: 'magic',
    level: 1,
    attack_range: 500,
    power: 63,
    health: 951,
    attack_damage: 0,
    ability_power: 35,
    armor: 4,
    magic_resist: 4,
    attack_speed: 90,
    attack_speed_inc: 0,
    movement_speed: 345,
    money_reward: 139,
    map_location: [{
        type_location: 'Normal',
        chapter: '1-1',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-4',
        battle_screen: [2, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-6',
        battle_screen: [1, 2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-1',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-3',
        battle_screen: [2, 3]
      }
    ]
  }),
  new Enemy({
    icon_path: 'enemy_06/enemy_06_icon',
    image_path: 'enemy_06/enemy_06',
    name: 'Enemy 6',
    class: 'Fighter',
    position: 'Front',
    description: 'Enemy fighter :P',
    basic_atk_type: 'physical',
    level: 1,
    attack_range: 160,
    power: 63,
    health: 874,
    attack_damage: 64,
    ability_power: 10,
    armor: 4,
    magic_resist: 4,
    attack_speed: 105,
    attack_speed_inc: 0,
    movement_speed: 355,
    money_reward: 139,
    map_location: [
      // {
      //   type_location: 'Normal',
      //   chapter: '1-1',
      //   battle_screen: [2, 3]
      // },
      {
        type_location: 'Normal',
        chapter: '1-2',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Normal',
        chapter: '1-5',
        battle_screen: [1, 2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-1',
        battle_screen: [2, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-3',
        battle_screen: [1, 3]
      },
      {
        type_location: 'Elite',
        chapter: '1-5',
        battle_screen: [1, 2, 3]
      }
    ]
  })
];

Enemy.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all enemies!');
  }
});

let done = 0;

for (let i = 0; i < enemies.length; i++) {
  enemies[i].save(() => {
    done++;
    if (done === enemies.length) {
      // eslint-disable-next-line no-console
      console.log('All enemies saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}