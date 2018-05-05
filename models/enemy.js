'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skill Schema
// const SkillSchema = new Schema({
//   icon_path: { type: String, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   skill_type: { type: String, required: true },
//   skill_level: { type: Number, required: true },
//   flat_dmg: { type: Number },
//   flat_dmg_inc: { type: Number },
//   skill_power: { type: Number, required: true }
// });
//
// // Glyph Schema
// const GlyphSchema = new Schema({
//   number: { type: Number, required: true },
//   title: { type: String, required: true },
//   equipped: { type: String, default: 'no' }
// });

// Map Location Schema
const MapLocationSchema = new Schema({
  type_location: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  battle_screen: [Number]
});

// EnemySchema Schema
const EnemySchema = new Schema({
  date_added: {
    type: Date,
    default: Date.now
  },
  // summoned: { type: String, default: 'no' },
  icon_path: {
    type: String,
    required: true
  },
  // web_image_path: { type: String, required: true },
  image_path: {
    type: String,
    required: true
  },
  // curr_pages: { type: Number, required: true },
  // next_pages: { type: Number, required: true },
  // urlName: { type: String, required: true },
  name: {
    type: String,
    required: true
  },
  // stars: { type: Number, required: true },
  class: {
    type: String, required: true
  },
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  basic_atk_type: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  // hero_curr_lvl_exp: { type: Number, default: 0 },
  // hero_next_lvl_exp: { type: Number, default: 8 },
  // color: { type: String, default: 'Grey' },
  // color_number: { type: Number, required: true },
  attack_range: {
    type: Number,
    required: true
  },
  power: {
    type: Number,
    required: true
  },
  // power_inc: { type: Number, required: true },
  health: {
    type: Number,
    required: true
  },
  // health_inc: { type: Number, required: true },
  attack_damage: {
    type: Number,
    required: true
  },
  // attack_damage_inc: { type: Number, required: true },
  ability_power: {
    type: Number,
    required: true
  },
  // ability_power_inc: { type: Number, required: true },
  armor: {
    type: Number,
    required: true
  },
  // armor_inc: { type: Number, required: true },
  magic_resist: {
    type: Number,
    required: true
  },
  // magic_resist_inc: { type: Number, required: true },
  // attack_speed: { type: Number, required: true },
  // attack_speed_inc: { type: Number, required: true },
  // health_regen: { type: Number, required: true },
  // health_regen_inc: { type: Number, required: true },
  movement_speed: {
    type: Number,
    required: true
  },
  // energy_regen: { type: Number, required: true },
  // crit_damage_lvl: { type: Number, required: true },
  // crit_strike_lvl: { type: Number, required: true },
  // hit_lvl: { type: Number, required: true },
  // dodge_lvl: { type: Number, required: true },
  // life_steal_lvl: { type: Number, required: true },
  // energy_steal: { type: Number, required: true },
  // energy_boost: { type: Number, required: true },
  // armor_pen: { type: Number, required: true },
  // magic_pen: { type: Number, required: true },
  // healing_effect: { type: Number, required: true },
  // shield_effect: { type: Number, required: true },
  // skills: [ SkillSchema ],
  money_reward: {
    type: Number,
    required: true
  },
  map_location: [MapLocationSchema]
}, {
  versionKey: '_documentVersion'
});

// let Enemy =
module.exports = mongoose.model('Enemy', EnemySchema);

// module.exports.getHeroByUrlName = (urlName, callback) => {
//   let query = {urlName: urlName};
//   Hero.findOne(query, callback);
// }
//
// module.exports.getAllHeroes = () => {
//   Hero.find({});
// }