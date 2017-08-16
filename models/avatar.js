'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Avatar Schema
const AvatarSchema = new Schema({
  nickname: { type: String, required: true },
  playerStatus: { type: String, require: true },
  tutorial: { type: String, require: true },
  icon_avatar_image_path: { type: String, required: true },
  icon_avatar_border_path: { type: String, required: true },
  player_lvl: { type: Number, required: true },
  max_hero_lvl: { type: Number, required: true },
  current_exp: { type: Number, required: true },
  next_lvl_exp: { type: Number, required: true },
  energy: { type: Number, required: true },
  gold: { type: Number, required: true },
  diamond: { type: Number, required: true }
});

let Avatar = module.exports = mongoose.model('Avatar', AvatarSchema);
