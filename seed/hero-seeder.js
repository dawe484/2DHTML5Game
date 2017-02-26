'use strict';

const Hero = require('../models/hero');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let heroes = [
  new Hero({
    icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa-icon.png',
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa.png',
    name: 'Leryssa',
    stars: 1,
    class: 'Tank',
    position: 'Front',
    description: 'Front row tank. Physical basic attack. A veteran pirate that can tank for her team.',
    level: 1,
    color: 'Grey',
    color_number: 0,
    attack_range: 200,
    power: 204,
    power_inc: 15,
    health: 540,
    health_inc: 82,
    attack_damage: 46,
    attack_damage_inc: 3,
    ability_power: 33,
    ability_power_inc: 2.47,
    armor: 24,
    armor_inc: 3,
    magic_resist: 22,
    magic_resist_inc: 1.8,
    attack_speed: 100,
    attack_speed_inc: 0.008,
    health_regen: 540,
    health_regen_inc: 0.06,
    movement_speed: 345,
    energy_regen: 300,
    crit_damage_lvl: 0,
    crit_strike_lvl: 0,
    hit_lvl: 765,
    dodge_lvl: 0,
    life_steal_lvl: 0,
    energy_steal: 0,
    energy_boost: 0,
    armor_pen: 0,
    magic_pen: 0,
    healing_effect: 0,
    shield_effect: 0,
    skills: [
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Cannon Barrage',
        description: "Leryssa signals her ship to bombard an area, slowing and damaging enemies.\nSignals Leryssa's ship to fire 4 waves of cannonballs at an area over 8 seconds. Each wave deals (power+10% Ability Power)*1,1 magic damage and slows enemies by 30% for 2 seconds.",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Yum-yum!!!',
        description: "Eats citrus to restore Health.\nLeryssa consumes a large quantity of citrus fruit, healing her for (+90% Ability Power) + 10% of her missing Health.",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Parrrley',
        description: "Shoots enemy target.\nFires a bullet that deals 40 (+115% Attack Damage) physical damage (can crit).",
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Bane of the Seven Seas',
        description: "Leryssa's legendary sword grants increased damage and cleaves a large area of effect in front of her for a single strike.",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ]
  }),
];

let done = 0;

for (let i = 0; i < heroes.length; i++) {
  heroes[i].save( (err, result) => {
    done++;
    if (done === heroes.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
