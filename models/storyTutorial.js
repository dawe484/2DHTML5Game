'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skill Schema
const StoryTutorialSchema = new Schema({
  speaker: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  versionKey: '_documentVersion'
});

let StoryTutorial = module.exports = mongoose.model('StoryTutorial', StoryTutorialSchema);

// module.exports.getTutorialBySequence = (sequence, callback) => {
//   let query = {sequence: sequence};
//   Tutorial.findOne(query, callback);
// }