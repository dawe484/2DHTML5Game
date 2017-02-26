'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Attributes Schema
const AttributesSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }
});

// Sticker Schema
const StickerSchema = new Schema({
  date_added: { type: Date, default: Date.now },
  image_path: { type: String, required: true },
  title: { type: String, required: true },
  rarity: { type: String, required: true },
  level_req: { type: Number, required: true },
  description: { type: String },
  attributes: [ AttributesSchema ]
},
  {versionKey: '_documentVersion'}
);

module.exports = mongoose.model('Sticker', StickerSchema);
