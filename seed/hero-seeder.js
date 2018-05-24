'use strict';

const Hero = require('../models/hero');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/2DHTML5Game');
mongoose.connect('mongodb://leyzi:NYC18vol@ds019664.mlab.com:19664/mh_db');

let heroes = [
  // Leryssa
  new Hero({
    summoned: 'yes',
    icon_path: 'images/game/heroes/leryssa/leryssa-icon.png',
    icon_selected_path: '/images/game/heroes/leryssa/leryssa_icon_selected.png',
    web_image_path: 'images/game/heroes/leryssa/leryssa-web.png',
    image_path: 'images/game/heroes/leryssa/leryssa.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'leryssa',
    name: 'Leryssa',
    stars: 1,
    class: 'Tank',
    position: 'Front',
    position_number: 15,
    description: 'Front row tank. Physical basic attack.\nA veteran pirate that can tank for her\nteam.',
    basic_atk_type: 'physical',
    // level: 1,
    // hero_curr_lvl_exp: 0,
    // hero_next_lvl_exp: 8,
    // color: 'Grey',
    // color_number: 0,
    attack_range: 60,
    power: 204,
    power_inc: 15,
    health: 340, //540,
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
    attack_speed_inc: 0.2, //0.008,
    health_regen: 32,
    health_regen_inc: 0.06,
    movement_speed: 355,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Cannon Barrage',
        description: "Leryssa signals her ship to bombard an area, slowing and damaging enemies.\nSignals Leryssa's ship to fire 4 waves of cannonballs at an area over 8 seconds. Each wave deals (power+10% Ability Power)*1,1 magic damage and slows enemies by 30% for 2 seconds.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 40, //0,
        flat_dmg_inc: 0, //1.1,
        skill_power: 0,
        skill_cd: 2
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Yum-yum!!!',
        description: "Eats citrus to restore Health.\nLeryssa consumes a large quantity of citrus fruit, healing her for (+90% Ability Power) + 10% of her missing Health.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Parrrley',
        description: "Shoots enemy target.\nFires a bullet that deals 40 (+115% Attack Damage) physical damage (can crit).",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Bane of the Seven Seas',
        description: "Leryssa's legendary sword grants increased damage and cleaves a large area of effect in front of her for a single strike.",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Armor',
            icon_path: 'armor_icon'
          },
          {
            number: 1,
            title: 'Health Regen',
            icon_path: 'health_regen_icon'
          },
          {
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          },
          {
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Health',
            icon_path: 'health_icon'
          },
          {
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          },
          {
            number: 1,
            title: 'Aggression',
            icon_path: 'aggression_icon'
          },
          {
            number: 1,
            title: 'Immortality',
            icon_path: 'immortality_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Fortitude',
            icon_path: 'fortitude_icon'
          },
          {
            number: 1,
            title: 'Aggression',
            icon_path: 'aggression_icon'
          },
          {
            number: 1,
            title: 'Defense',
            icon_path: 'defense_icon'
          },
          {
            number: 1,
            title: 'Enforcement',
            icon_path: 'enforcement_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Diu Win
  new Hero({
    summoned: 'yes',
    icon_path: 'images/game/heroes/diuwin/diu_win-icon.png',
    icon_selected_path: '/images/game/heroes/diuwin/diuwin_icon_selected.png',
    web_image_path: 'images/game/heroes/diuwin/diu_win-web.png',
    image_path: 'images/game/heroes/diuwin/diu_win.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'diuwin',
    name: 'Diu Win',
    stars: 1,
    class: 'Fighter',
    position: 'Front',
    position_number: 27,
    description: 'Front row fighter. Physical basic attack. Can run around freely amidst the enemy.',
    basic_atk_type: 'physical',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
    attack_range: 200,
    power: 207,
    power_inc: 15,
    health: 236, //368,
    health_inc: 73,
    attack_damage: 57,
    attack_damage_inc: 3.8,
    ability_power: 0,
    ability_power_inc: 0,
    armor: 19,
    armor_inc: 2,
    magic_resist: 22,
    magic_resist_inc: 1.2,
    attack_speed: 110, //100,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_1-alpha_strike.png',
        title: 'Alpha Strike',
        description: "Alpha Strike deals physical damage 5x to targets in front of him. Deal 1132 damage per attack @90",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 11.4,
        skill_power: 117
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_2-blindside.png',
        title: 'Blindside',
        description: "Teleports behind an enemy and deals physical damage and stun to the target. Damage +2693 damage @90. Hit rate of Stun increases with its skill level (100% if skill level >= target's level).",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 29,
        skill_power: 112
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_3-death_strike.png',
        title: 'Death Strike',
        description: "Increases his crit strike chance. Crit Stike Level +50 % @90",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0.44,
        skill_power: 10
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/diuwin/skill_4-double_strike.png',
        title: 'Double Strike',
        description: "After landing 3 basic attacks, Diu Win's next one within 4 seconds strikes twice, dealing 50% AD bonus physical damage which can critically strike.",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0.5,
        skill_power: 0
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          },
          {
            number: 1,
            title: 'Armor',
            icon_path: 'armor_icon'
          },
          {
            number: 1,
            title: 'Attack Force',
            icon_path: 'attack_force_icon'
          },
          {
            number: 1,
            title: 'Attack Force',
            icon_path: 'attack_force_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          },
          {
            number: 1,
            title: 'Double Attack',
            icon_path: 'double_attack_icon'
          },
          {
            number: 1,
            title: 'Fortitude',
            icon_path: 'fortitude_icon'
          },
          {
            number: 1,
            title: 'Bravery',
            icon_path: 'bravery_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Magic Resist',
            icon_path: 'magic_resist_icon'
          },
          {
            number: 1,
            title: 'Aggression',
            icon_path: 'aggression_icon'
          },
          {
            number: 1,
            title: 'Bloodthirst',
            icon_path: 'bloodthirst_icon'
          },
          {
            number: 1,
            title: 'Defense',
            icon_path: 'defense_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Crystal
  new Hero({
    summoned: 'yes',
    icon_path: 'images/game/heroes/crystal/crystal-icon.png',
    icon_selected_path: '/images/game/heroes/crystal/crystal_icon_selected.png',
    web_image_path: 'images/game/heroes/crystal/crystal-web.png',
    image_path: 'images/game/heroes/crystal/crystal.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'crystal',
    name: 'Crystal',
    stars: 1,
    class: 'Mage',
    position: 'Middle',
    position_number: 57,
    description: 'Mid row mage. Magic basic attack. Her ultimate can deal tons of damage.',
    basic_atk_type: 'magic',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
    attack_range: 650,
    power: 209,
    power_inc: 15,
    health: 175, // 332,
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
    movement_speed: 315,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_1-mega_ice_bomb.png',
        title: 'Mega Ice Bomb',
        description: "Crystal deploys her ultimate creation, the Mega Ice Bomb, hurling it an enormous distance at enemies within an area. Enemies in the blast zone take 33,7 (+110% Ability Power) magic damage.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 33.7,
        flat_dmg_inc: 110,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_2-ice_ball.png',
        title: 'Ice Ball',
        description: "Crystal throw a ice ball dealing 40 (+30% Ability Power) magic damage to an enemy target an stun them for 1 sec.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 30,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_3-crystallize.png',
        title: 'Crystallize',
        description: "Crystal condenses the moisture in the air into an impassable wall of ice to block all movement and damage from enemies. The wall only lasts a short duration before it melts. Crystal summons an impassable wall of ice 600 units wide, blocking all movement and damage (-10%) to protect allies. The wall lasts for 3 seconds before it melts.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: -10,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/crystal/skill_4-ice_wind.png',
        title: 'Ice Wind',
        description: "Crystal blasts the target with a freezing wind, dealing magic damage (50 (+ 50% AP)) that is doubled against targets stunned.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 50,
        flat_dmg_inc: 0.5,
        skill_power: 0
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Magic Penetration',
            icon_path: 'magic_pen_icon'
          },
          {
            number: 1,
            title: 'Magic Penetration',
            icon_path: 'magic_pen_icon'
          },
          {
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          },
          {
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Prowess',
            icon_path: 'prowess_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          },
          {
            number: 1,
            title: 'Providence',
            icon_path: 'providence_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Regenerate',
            icon_path: 'regenerate_icon'
          },
          {
            number: 1,
            title: 'Divine Power',
            icon_path: 'divine_power_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Sin
  new Hero({
    summoned: 'yes',
    icon_path: 'images/game/heroes/sin/sin-icon.png',
    icon_selected_path: '/images/game/heroes/sin/sin_icon_selected.png',
    web_image_path: 'images/game/heroes/sin/sin-web.png',
    image_path: 'images/game/heroes/sin/sin.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'sin',
    name: 'Sin',
    stars: 1,
    class: 'Marksman',
    position: 'Middle',
    position_number: 70,
    description: 'Mid row marksman. Physical basic attack.',
    basic_atk_type: 'physical',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
    attack_range: 650,
    power: 173,
    power_inc: 16.1,
    health: 326,
    health_inc: 51,
    attack_damage: 40,
    attack_damage_inc: 4.6,
    ability_power: 0,
    ability_power_inc: 0,
    armor: 16,
    armor_inc: 1.9,
    magic_resist: 16,
    magic_resist_inc: 1.7,
    attack_speed: 100,
    attack_speed_inc: 0.012,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/sin/skill_1-crazy_shot.png',
        title: 'Crazy Shot',
        description: "Cast this skill to completely control an enemy and deal continuous physical damage to him/her.",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 10.6,
        skill_power: 98
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/sin/skill_2-hungering_arrow.png',
        title: 'Hungering Arrow',
        description: "Fire an arrow that deals moderate damage to the first target hit, then seeks up to 2 additional enemies dealing half the initial damage. Can hit an enemy multiple times.",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 17.3,
        skill_power: 79
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/sin/skill_3-blast_shot.png',
        title: 'Blast Shot',
        description: "Deals physical damage to an enemy, knocking the target back 500 range. Cast Range: 800",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 100
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/sin/skill_4-silver_bolts.png',
        title: 'Silver Bolts',
        description: "PASSIVE: Sin's basic attacks mark her target with Silver Bolts for 3 seconds, stacking up to 3 times. Attacking a new enemy cleanses the previous target of all Silver Bolts. The third stack consumes all Silver Bolts on the target to deal them extra physical damage.",
        skill_type: 'physical',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 27.8,
        skill_power: 144
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Attack Force',
            icon_path: 'attack_force_icon'
          },
          {
            number: 1,
            title: 'Attack Force',
            icon_path: 'attack_force_icon'
          },
          {
            number: 1,
            title: 'Regenerate',
            icon_path: 'regenerate_icon'
          },
          {
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Health',
            icon_path: 'health_icon'
          },
          {
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          },
          {
            number: 1,
            title: 'Providence',
            icon_path: 'providence_icon'
          },
          {
            number: 1,
            title: 'Fortitude',
            icon_path: 'fortitude_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Health Regen',
            icon_path: 'health_regen_icon'
          },
          {
            number: 1,
            title: 'Regenerate',
            icon_path: 'regenerate_icon'
          },
          {
            number: 1,
            title: 'Defense',
            icon_path: 'defense_icon'
          },
          {
            number: 1,
            title: 'Osmosis',
            icon_path: 'osmosis_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Leona
  new Hero({
    summoned: 'yes',
    icon_path: 'images/game/heroes/leona/leona-icon.png',
    icon_selected_path: '/images/game/heroes/leona/leona_icon_selected.png',
    web_image_path: 'images/game/heroes/leona/leona-web.png',
    image_path: 'images/game/heroes/leona/leona.png',
    curr_pages: 0,
    next_pages: 30,
    urlName: 'leona',
    name: 'Leona',
    stars: 2,
    class: 'Support',
    position: 'Back',
    position_number: 116,
    description: 'Back row support. Magic basic attack.',
    basic_atk_type: 'magic',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
    attack_range: 700,
    power: 219,
    power_inc: 15.3,
    health: 159, //307,
    health_inc: 52,
    attack_damage: 0,
    attack_damage_inc: 0,
    ability_power: 59,
    ability_power_inc: 3.6,
    armor: 16,
    armor_inc: 1.5,
    magic_resist: 17,
    magic_resist_inc: 1.3,
    attack_speed: 100,
    attack_speed_inc: 0,
    health_regen: 18,
    health_regen_inc: 0.06,
    movement_speed: 325,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leona/skill_1-art_power.png',
        title: 'Art Power',
        description: "Draw and summon one of legendary creatures, that attack an enemy or protect ally.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 13.6,
        skill_power: 106
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leona/skill_2-art_shield.png',
        title: 'Art Shield',
        description: "Leona shields the target allied champion or herself for 5 seconds, granting her target bonus armor and magic resist while the shield holds.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 6,
        skill_power: 40
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leona/skill_3-splashes_of_color.png',
        title: 'Splashes of Color',
        description: "Splash color from color palette to the enemy. Blinds and lowers the target's Attack Power. Attack -2246.9 @90. Hit rate of Blind increases with skill level (100% if skill level >= target's level).",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 24.3,
        skill_power: 84.2
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leona/skill_4-animal_art.png',
        title: 'Animal Art',
        description: "Draw a small creature on enemies lowest health target, dealing magic damage to the target and 10% to surrounding enemies. Damage +3173.3 @90.",
        skill_type: 'magic',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 33.7,
        skill_power: 174
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Magic Resist',
            icon_path: 'magic_resist_icon'
          },
          {
            number: 1,
            title: 'Magic Resist',
            icon_path: 'magic_resist_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Prowess',
            icon_path: 'prowess_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Energy Regen',
            icon_path: 'energy_regen_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Aelois
  new Hero({
    icon_path: 'images/game/heroes/aelois/aelois-icon.png',
    icon_selected_path: '/images/game/heroes/aelois/aelois_icon_selected.png',
    web_image_path: 'images/game/heroes/aelois/aelois-web.png',
    image_path: 'images/game/heroes/aelois/aelois.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'aelois',
    name: 'Aelois',
    stars: 1,
    class: 'Marksman',
    position: 'Back',
    position_number: 88,
    description: ' ',
    basic_atk_type: 'physical',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Skill 1',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Skill 2',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Skill 3',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Skill 4',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Health',
            icon_path: 'health_icon'
          },
          {
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          },
          {
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          },
          {
            number: 1,
            title: 'Regenerate',
            icon_path: 'regenerate_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Armor Penetration',
            icon_path: 'armor_pen_icon'
          },
          {
            number: 1,
            title: 'Attack Force',
            icon_path: 'attack_force_icon'
          },
          {
            number: 1,
            title: 'Fortitude',
            icon_path: 'fortitude_icon'
          },
          {
            number: 1,
            title: 'Bravery',
            icon_path: 'bravery_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Attack Damage',
            icon_path: 'attack_damage_icon'
          },
          {
            number: 1,
            title: 'Fortitude',
            icon_path: 'fortitude_icon'
          },
          {
            number: 1,
            title: 'Extra Health',
            icon_path: 'extra_health_icon'
          },
          {
            number: 1,
            title: 'Defense',
            icon_path: 'defense_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Amara
  new Hero({
    icon_path: 'images/game/heroes/amara/amara-icon.png',
    icon_selected_path: '/images/game/heroes/amara/amara_icon_selected.png',
    web_image_path: 'images/game/heroes/amara/amara-web.png',
    image_path: 'images/game/heroes/amara/amara.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'amara',
    name: 'Amara',
    stars: 1,
    class: 'Support',
    position: 'Back',
    position_number: 103,
    description: ' ',
    basic_atk_type: 'magic',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Skill 1',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Skill 2',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Skill 3',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Skill 4',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Energy Regen',
            icon_path: 'energy_regen_icon'
          },
          {
            number: 1,
            title: 'Armor',
            icon_path: 'armor_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Health',
            icon_path: 'health_icon'
          },
          {
            number: 1,
            title: 'Valor',
            icon_path: 'valor_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          },
          {
            number: 1,
            title: 'Extra Health',
            icon_path: 'extra_health_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Energy Regen',
            icon_path: 'energy_regen_icon'
          },
          {
            number: 1,
            title: 'Prowess',
            icon_path: 'prowess_icon'
          },
          {
            number: 1,
            title: 'Nature',
            icon_path: 'nature_icon'
          },
          {
            number: 1,
            title: 'Sublimity',
            icon_path: 'sublimity_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Nadia
  new Hero({
    icon_path: 'images/game/heroes/nadia/nadia-icon.png',
    icon_selected_path: '/images/game/heroes/nadia/nadia_icon_selected.png',
    web_image_path: 'images/game/heroes/nadia/nadia-web.png',
    image_path: 'images/game/heroes/nadia/nadia.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'nadia',
    name: 'Nadia',
    stars: 1,
    class: 'Mage',
    position: 'Middle',
    position_number: 64,
    description: ' ',
    basic_atk_type: 'magic',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Skill 1',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Skill 2',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Skill 3',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Skill 4',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Health',
            icon_path: 'health_icon'
          },
          {
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Health Regen',
            icon_path: 'health_regen_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Prowess',
            icon_path: 'prowess_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Health Regen',
            icon_path: 'health_regen_icon'
          },
          {
            number: 1,
            title: 'Nature',
            icon_path: 'nature_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Nyx
  new Hero({
    icon_path: 'images/game/heroes/nyx/nyx-icon.png',
    icon_selected_path: '/images/game/heroes/nyx/nyx_icon_selected.png',
    web_image_path: 'images/game/heroes/nyx/nyx-web.png',
    image_path: 'images/game/heroes/nyx/nyx.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'nyx',
    name: 'Nyx',
    stars: 1,
    class: 'Mage',
    position: 'Back',
    position_number: 84,
    description: ' ',
    basic_atk_type: 'magic',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Skill 1',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Skill 2',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Skill 3',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Skill 4',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          },
          {
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          },
          {
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Energy Regen',
            icon_path: 'energy_regen_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Regenerate',
            icon_path: 'regenerate_icon'
          },
          {
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Providence',
            icon_path: 'providence_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          },
          {
            number: 1,
            title: 'Valor',
            icon_path: 'valor_icon'
          },
          {
            number: 1,
            title: 'Extra Health',
            icon_path: 'extra_health_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Zalajin
  new Hero({
    icon_path: 'images/game/heroes/zalajin/zalajin-icon.png',
    icon_selected_path: '/images/game/heroes/zalajin/zalajin_icon_selected.png',
    web_image_path: 'images/game/heroes/zalajin/zalajin-web.png',
    image_path: 'images/game/heroes/zalajin/zalajin.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'zalajin',
    name: 'Zalajin',
    stars: 1,
    class: 'Support',
    position: 'Middle',
    position_number: 43,
    description: ' ',
    basic_atk_type: 'magic',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Skill 1',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Skill 2',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Skill 3',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Skill 4',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Health Regen',
            icon_path: 'health_regen_icon'
          },
          {
            number: 1,
            title: 'Regenerate',
            icon_path: 'regenerate_icon'
          },
          {
            number: 1,
            title: 'Magic Force',
            icon_path: 'magic_force_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Hardiness',
            icon_path: 'hardiness_icon'
          },
          {
            number: 1,
            title: 'Prowess',
            icon_path: 'prowess_icon'
          },
          {
            number: 1,
            title: 'Nature',
            icon_path: 'nature_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Ability Power',
            icon_path: 'ability_power_icon'
          },
          {
            number: 1,
            title: 'Meditation',
            icon_path: 'meditation_icon'
          },
          {
            number: 1,
            title: 'Nature',
            icon_path: 'nature_icon'
          },
          {
            number: 1,
            title: 'Magic Shield',
            icon_path: 'magic_shield_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
  }),
  // Zaya
  new Hero({
    icon_path: 'images/game/heroes/zaya/zaya-icon.png',
    icon_selected_path: '/images/game/heroes/zaya/zaya_icon_selected.png',
    web_image_path: 'images/game/heroes/zaya/zaya-web.png',
    image_path: 'images/game/heroes/zaya/zaya.png',
    curr_pages: 0,
    next_pages: 10,
    urlName: 'zaya',
    name: 'Zaya',
    stars: 1,
    class: 'Fighter',
    position: 'Back',
    position_number: 86,
    description: ' ',
    basic_atk_type: 'physical',
    // level: 1,
    // color: 'Grey',
    // color_number: 0,
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
    skills: [{
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_1-cannon_barrage.png',
        title: 'Skill 1',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 1.1,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_2-yum_yum.png',
        title: 'Skill 2',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 0,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_3-parrrley.png',
        title: 'Skill 3',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 40,
        flat_dmg_inc: 1.15,
        skill_power: 0
      },
      {
        icon_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/heroes/leryssa/skill_4-bane_of_the_seven_seas.png',
        title: 'Skill 4',
        description: ' ',
        skill_type: ' ',
        skill_level: 1,
        flat_dmg: 0,
        flat_dmg_inc: 23,
        skill_power: 25
      }
    ],
    glyphs_rarity: [
      // Grey -> Green
      {
        current_status: 'Grey',
        next_status: 'Green',
        glyphs: [{
            number: 1,
            title: 'Attack Force',
            icon_path: 'attack_force_icon'
          },
          {
            number: 1,
            title: 'Double Attack',
            icon_path: 'double_attack_icon'
          },
          {
            number: 1,
            title: 'Double Attack',
            icon_path: 'double_attack_icon'
          },
          {
            number: 1,
            title: 'Health Regen',
            icon_path: 'health_regen_icon'
          }
        ]
      },
      // Green -> Green +1
      {
        current_status: 'Green',
        next_status: 'Green +1',
        glyphs: [{
            number: 1,
            title: 'Double Attack',
            icon_path: 'double_attack_icon'
          },
          {
            number: 1,
            title: 'Double Attack',
            icon_path: 'double_attack_icon'
          },
          {
            number: 1,
            title: 'Immortality',
            icon_path: 'immortality_icon'
          },
          {
            number: 1,
            title: 'Osmosis',
            icon_path: 'osmosis_icon'
          }
        ]
      },
      // Green +1 -> Blue
      {
        current_status: 'Green +1',
        next_status: 'Blue',
        glyphs: [{
            number: 1,
            title: 'Double Attack',
            icon_path: 'double_attack_icon'
          },
          {
            number: 1,
            title: 'Immortality',
            icon_path: 'immortality_icon'
          },
          {
            number: 1,
            title: 'Osmosis',
            icon_path: 'osmosis_icon'
          },
          {
            number: 1,
            title: 'Osmosis',
            icon_path: 'osmosis_icon'
          }
        ]
      },
      // Blue -> Blue +1
      // Blue +1 -> Blue +2
      // Blue +2 -> Purple
      // Purple -> Purple +1
      // Purple +1 -> Purple +2
      // Purple +2 -> Purple +3
      // Purple +3 -> Orange
    ]
    // predelat number 2 na 1 vsude a ukladat priznak, zda uz ma hrdina glyph naucen
  })
];

Hero.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all!');
  }
});

let done = 0;

for (let i = 0; i < heroes.length; i++) {
  heroes[i].save(() => {
    done++;
    if (done === heroes.length) {
      // eslint-disable-next-line no-console
      console.log('All heroes saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}