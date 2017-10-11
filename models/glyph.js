'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map Location Schema
const MapLocationSchema = new Schema({
  type_location: { type: String, required: true },
  chapter: { type: String, required: true }
});

// Attributes Schema
const AttributesSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }
});

// Glyph Schema
const GlyphSchema = new Schema({
  date_added: { type: Date, default: Date.now },
  image_path: { type: String, required: true },
  title: { type: String, required: true },
  rarity: { type: String, required: true },
  level_req: { type: Number, required: true },
  description: { type: String },
  attributes: [ AttributesSchema ],
  map_location: [ MapLocationSchema ]
},
  {versionKey: '_documentVersion'}
);

module.exports = mongoose.model('Glyph', GlyphSchema);
