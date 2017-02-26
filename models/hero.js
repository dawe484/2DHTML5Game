'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skill Schema
const SkillSchema = new Schema({
  icon_path: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skill_level: { type: Number, required: true },
  flat_dmg: { type: Number },
  flat_dmg_inc: { type: Number },
  skill_power: { type: Number, required: true }
});

// Hero Schema
const HeroSchema = new Schema({
  date_added: { type: Date, default: Date.now },
  icon_path: { type: String, required: true },
  image_path: { type: String, required: true },
  name: { type: String, required: true },
  stars: { type: Number, required: true },
  class: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: Number, required: true },
  color: { type: String, required: true },
  color_number: { type: Number, required: true },
  attack_range: { type: Number, required: true },
  power: { type: Number, required: true },
  power_inc: { type: Number, required: true },
  health: { type: Number, required: true },
  health_inc: { type: Number, required: true },
  attack_damage: { type: Number, required: true },
  attack_damage_inc: { type: Number, required: true },
  ability_power: { type: Number, required: true },
  ability_power_inc: { type: Number, required: true },
  armor: { type: Number, required: true },
  armor_inc: { type: Number, required: true },
  magic_resist: { type: Number, required: true },
  magic_resist_inc: { type: Number, required: true },
  attack_speed: { type: Number, required: true },
  attack_speed_inc: { type: Number, required: true },
  health_regen: { type: Number, required: true },
  health_regen_inc: { type: Number, required: true },
  movement_speed: { type: Number, required: true },
  energy_regen: { type: Number, required: true },
  crit_damage_lvl: { type: Number, required: true },
  crit_strike_lvl: { type: Number, required: true },
  hit_lvl: { type: Number, required: true },
  dodge_lvl: { type: Number, required: true },
  life_steal_lvl: { type: Number, required: true },
  energy_steal: { type: Number, required: true },
  energy_boost: { type: Number, required: true },
  armor_pen: { type: Number, required: true },
  magic_pen: { type: Number, required: true },
  healing_effect: { type: Number, required: true },
  shield_effect: { type: Number, required: true },
  skills: [ SkillSchema ]
},
  {versionKey: '_documentVersion'}
);

module.exports = mongoose.model('Hero', HeroSchema);
