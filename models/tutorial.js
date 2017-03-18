'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skill Schema
const TutorialSchema = new Schema({
  image_path: { type: String, required: true },
  sequence: { type: Number, required: true }
},
  {versionKey: '_documentVersion'}
);

let Tutorial = module.exports = mongoose.model('Tutorial', TutorialSchema);

module.exports.getTutorialBySequence = (sequence, callback) => {
  let query = {sequence: sequence};
  Tutorial.findOne(query, callback);
}
