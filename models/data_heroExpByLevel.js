'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// HeroExpByLevelSchema Schema
const HeroExpByLevelSchema = new Schema({
  hero_curr_lvl: { type: Number, required: true },
  hero_next_lvl: { type: Number, required: true },
  // hero_curr_lvl_exp: { type: Number, required: true },
  hero_next_lvl_exp: { type: Number, required: true },
},
  {versionKey: '_documentVersion'}
);

let HeroExpByLevel = module.exports = mongoose.model('HeroExpByLevel', HeroExpByLevelSchema);
