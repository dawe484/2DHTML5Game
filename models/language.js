'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Language Schema
const LanguageSchema = new Schema({
  language: { type: String, require: true},
  mainScreenIconsTitle: [String],
  scrollIconsTitle: [String]
});

let Language = module.exports = mongoose.model('Language', LanguageSchema, 'languages');
