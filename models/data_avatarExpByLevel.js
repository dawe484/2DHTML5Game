'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// AvatarExpByLevelSchema Schema
const AvatarExpByLevelSchema = new Schema({
  avatar_curr_lvl: { type: Number, required: true },
  avatar_next_lvl: { type: Number, required: true },
  // hero_curr_lvl_exp: { type: Number, required: true },
  avatar_next_lvl_exp: { type: Number, required: true },
},
  {versionKey: '_documentVersion'}
);

let AvatarExpByLevel = module.exports = mongoose.model('AvatarExpByLevel', AvatarExpByLevelSchema);
