'use strict';

const Enemy = require('../models/enemy');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let enemies = [
  // Enemy 1
  new Enemy({
    icon_path: '/images/game/enemies/enemy_01/enemy_01_icon.png',
    // web_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa-web.png',
    // image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa.png',
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
    attack_damage: 27,
    // attack_damage_inc: 3,
    ability_power: 0,
    // ability_power_inc: 2.47,
    armor: 4,
    // armor_inc: 3,
    magic_resist: 4,
    // magic_resist_inc: 1.8,
    // attack_speed: 100,
    // attack_speed_inc: 0.008,
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
    map_location: [
      { type_location: 'Normal', chapter: '1-1' },
      { type_location: 'Normal', chapter: '1-4' },
      { type_location: 'Normal', chapter: '1-6' },
      { type_location: 'Elite', chapter: '1-1' },
      { type_location: 'Elite', chapter: '1-3' }
    ]
  }),
  new Enemy({
    icon_path: '/images/game/enemies/enemy_02/enemy_02_icon.png',
    name: 'Enemy 2',
    class: 'Mage',
    position: 'Middle',
    description: 'Enemy mage :P',
    basic_atk_type: 'magic',
    level: 1,
    attack_range: 360,
    power: 63,
    health: 716,
    attack_damage: 0,
    ability_power: 35,
    armor: 4,
    magic_resist: 4,
    movement_speed: 345,
    map_location: [
      { type_location: 'Normal', chapter: '1-1' },
      { type_location: 'Normal', chapter: '1-2' },
      { type_location: 'Normal', chapter: '1-5' },
      { type_location: 'Elite', chapter: '1-1' },
      { type_location: 'Elite', chapter: '1-3' },
      { type_location: 'Elite', chapter: '1-5' }
    ]
  })
];

Enemy.remove({}, function(err) {
    if (err) {
      console.err(err)
    } else {
      console.log('Remove all enemies!');
    }
  }
);

let done = 0;

for (let i = 0; i < enemies.length; i++) {
  enemies[i].save( (err, result) => {
    done++;
    if (done === enemies.length) {
      console.log('All enemies saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
