'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Avatar Schema
const AvatarSchema = new Schema({
  nickname: { type: String, default: 'Unknown' },
  playerStatus: { type: String, default: 'offline' },
  storyTutorial: { type: String, default: 'yes' },
  tutorial: { type: String, default: 'yes' },
  icon_avatar_image_path: { type: String, required: true },
  avatar_border_path: { type: String, required: true },
  player_lvl: { type: Number, required: true },
  max_hero_lvl: { type: Number, required: true },
  current_exp: { type: Number, required: true },
  next_lvl_exp: { type: Number, required: true },
  current_energy: { type: Number, required: true },
  max_energy: { type: Number, required: true },
  gold: { type: Number, required: true },
  diamond: { type: Number, required: true },
  language: { type: String, default: 'english' },
  mainScreenIconsTitle: [ String ],
  scrollIconsTitle: [ String ],
  bannersTitle: [ String ],
  buttonsTitle: [ String ],
  labelsTitle: [ String ],
  heroInfoIconsTitle: [ String ],
  heroStatsTitle: [ String ]
});

let Avatar = module.exports = mongoose.model('Avatar', AvatarSchema);
