'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Glyph = require('../models/glyph');

// ProgressSchema Schema
const ProgressSchema = new Schema({
  difficulty: { type: String, required: true },
  opened: { type: String, required: true },
  text: { type: String, required: true },
  chapter: { type: String, required: true },
  // paragraphNumber: { type: Number, required: true }
  // numberOfStars: { type: Number, default: 0 },
  // maxNumberOfStars: { type: Number, default: 3}
});

// RewardSchema Schema
const RewardSchema = new Schema({
  reward_type: { type: String, required: true },
  reward_title: { type: String, required: true }
});

// ParagraphSchema Schema
const ParagraphSchema = new Schema({
  p_difficulty: { type: String, required: true },
  p_opened: { type: String, default: 'no'},
  p_chapter: { type: String, required: true },
  // p_paragraphNumber: { type: Number, required: true },
  p_paragraphIcon: { type: String, required: true },
  p_numberOfStars: { type: Number, default: 0 },
  p_maxNumberOfStars: { type: Number, default: 3},
  p_bannerTitle: { type: String, required: true },
  p_description: { type: String, required: true },
  p_staminaConsume: { type: String, required: true },
  // p_enemies: [ String ],
  // p_possibleRewards: [ String ],
  p_reward_heroExp: { type: Number, required: true },
  p_reward_money: { type: Number, required: true },
  p_reward_avatarExp: { type: Number, required: true },
  // p_reward: [ Glyph.schema ]
  p_reward: [ RewardSchema ]
});

// Avatar Schema
const AvatarSchema = new Schema({
  nickname: { type: String, default: 'Unknown' },
  playerStatus: { type: String, default: 'offline' },
  storyTutorial: { type: String, default: 'yes' },
  tutorial: { type: String, default: 'yes' },
  avatar_image_path: { type: String, default: 'avatar_image.png' },
  avatar_border_path: { type: String, default: 'avatar_border_wood.png' },
  avatar_level_path: { type: String, default: 'avatar_level_blue.png' },
  player_lvl: { type: Number, required: true },
  max_hero_lvl: { type: Number, required: true },
  current_exp: { type: Number, required: true },
  next_lvl_exp: { type: Number, required: true },
  current_energy: { type: Number, required: true },
  max_energy: { type: Number, required: true },
  gold: { type: Number, required: true },
  diamond: { type: Number, required: true },
  language: { type: String, default: 'english' },
  sound: { type: String, default: 'On' },
  music: { type: String, default: 'On' },
  mainScreenIconsTitle: [ String ],
  scrollIconsTitle: [ String ],
  bannersTitle: [ String ],
  buttonsTitle: [ String ],
  labelsTitle: [ String ],
  heroInfoIconsTitle: [ String ],
  heroStatsTitle: [ String ],
  backgroundTitle: [ String ],
  progress: [ ProgressSchema ],
  paragraphs: [ ParagraphSchema ]
});

let Avatar = module.exports = mongoose.model('Avatar', AvatarSchema);
