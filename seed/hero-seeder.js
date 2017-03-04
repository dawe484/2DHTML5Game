'use strict';

const Hero = require('../models/hero');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let heroes = [
  // Leryssa
  new Hero({
    icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa-icon.png',
    web_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa-web.png',
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/leryssa.png',
    urlName: 'leryssa',
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
    health_regen: 32,
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
  // Diu Win
  new Hero({
    icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/diu_win-icon.png',
    web_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/diu_win-web.png',
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/diu_win.png',
    urlName: 'diuwin',
    name: 'Diu Win',
    stars: 1,
    class: 'Fighter',
    position: 'Front',
    description: 'Front row fighter. Physical basic attack. Can run around freely amidst the enemy.',
    level: 1,
    color: 'Grey',
    color_number: 0,
    attack_range: 200,
    power: 207,
    power_inc: 15,
    health: 368,
    health_inc: 73,
    attack_damage: 57,
    attack_damage_inc: 3.8,
    ability_power: 0,
    ability_power_inc: 0,
    armor: 19,
    armor_inc: 2,
    magic_resist: 22,
    magic_resist_inc: 1.2,
    attack_speed: 100,
    attack_speed_inc: 0.01,
    health_regen: 22,
    health_regen_inc: 0.06,
    movement_speed: 345,
    energy_regen: 300,
    crit_damage_lvl: 110,
    crit_strike_lvl: 10,
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
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_1-alpha_strike.png',
        title: 'Alpha Strike',
        description: "Alpha Strike deals physical damage 5x to targets in front of him. Deal 1132 damage per attack @90",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 11.4,
        skill_power: 117
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_2-blindside.png',
        title: 'Blindside',
        description: "Teleports behind an enemy and deals physical damage and stun to the target. Damage +2693 damage @90. Hit rate of Stun increases with its skill level (100% if skill level >= target's level).",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 29,
        skill_power: 112
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_3-death_strike.png',
        title: 'Death Strike',
        description: "Increases his crit strike chance. Crit Stike Level +50 % @90",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0.44,
        skill_power: 10
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_4-double_strike.png',
        title: 'Double Strike',
        description: "After landing 3 basic attacks, Diu Win's next one within 4 seconds strikes twice, dealing 50% AD bonus physical damage which can critically strike.",
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0.5,
        skill_power: 0
      }
    ]
  }),
  // Crystal
  new Hero({
    icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/crystal-icon.png',
    web_image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/crystal-web.png',
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/crystal.png',
    urlName: 'crystal',
    name: 'Crystal',
    stars: 1,
    class: 'Mage',
    position: 'Mid',
    description: 'Mid row mage. Magic basic attack. Her ultimate can deal tons of damage.',
    level: 1,
    color: 'Grey',
    color_number: 0,
    attack_range: 650,
    power: 209,
    power_inc: 15,
    health: 332,
    health_inc: 74,
    attack_damage: 0,
    attack_damage_inc: 0,
    ability_power: 55,
    ability_power_inc: 3.82,
    armor: 16,
    armor_inc: 1.9,
    magic_resist: 15,
    magic_resist_inc: 1.6,
    attack_speed: 100,
    attack_speed_inc: 0,
    health_regen: 20,
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
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_1-mega_ice_bomb.png',
        title: 'Mega Ice Bomb',
        description: "Crystal deploys her ultimate creation, the Mega Ice Bomb, hurling it an enormous distance at enemies within an area. Enemies in the blast zone take 33,7 (+110% Ability Power) magic damage.",
        skill_level: 1,
        flat_dmg: 33.7,
        flat_dmg_inc: 110,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_2-ice_ball.png',
        title: 'Ice Ball',
        description: "Crystal throw a ice ball dealing 40 (+30% Ability Power) magic damage to an enemy target an stun them for 1 sec.",
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 30,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_3-crystallize.png',
        title: 'Crystallize',
        description: "Crystal condenses the moisture in the air into an impassable wall of ice to block all movement and damage from enemies. The wall only lasts a short duration before it melts. Crystal summons an impassable wall of ice 600 units wide, blocking all movement and damage (-10%) to protect allies. The wall lasts for 3 seconds before it melts.",
        skill_level: 1,
        flat_dmg: -10,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_4-ice_wind.png',
        title: 'Ice Wind',
        description: "Crystal blasts the target with a freezing wind, dealing magic damage that is doubled against targets stunned. MAGIC DAMAGE: 50 (+ 50% AP)",
        skill_level: 1,
        flat_dmg: 50,
        flat_dmg_inc: 0.5,
        skill_power: 0
      }
    ]
  })
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
