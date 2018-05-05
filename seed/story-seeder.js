'use strict';

const StoryTutorial = require('../models/storyTutorial');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/2DHTML5Game');

let storyTutorials = [
  new StoryTutorial({
    speaker: 'A',
    text: 'Master?! Master?!'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Um... What\'s wrong?'
  }),
  new StoryTutorial({
    speaker: 'A',
    text: 'Master, somebody stole all books at night.'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'W-what?'
  }),
  new StoryTutorial({
    speaker: 'A',
    text: 'Our magic books are gone!! Somebody stole them!'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Have you already told to the Grandmaster?'
  }),
  new StoryTutorial({
    speaker: 'A',
    text: 'Yes, and he said that he would send someone to investigate it.'
  }),
  new StoryTutorial({
    speaker: ' ',
    text: 'LATER'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Who are you?'
  }),
  new StoryTutorial({
    speaker: 'P',
    text: 'The Grandmaster sent me. What happened?'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Somebody stole all magic books from the Library at night.'
  }),
  new StoryTutorial({
    speaker: 'P',
    text: 'Magic books??'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Yes. All magic books are gone!'
  }),
  new StoryTutorial({
    speaker: 'P',
    text: 'Um... What\'s the difference between a normal book?'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'The Grandmaster didn\'t tell you what kinds of books we are\nhiding here?'
  }),
  new StoryTutorial({
    speaker: 'P',
    text: 'No. He said that you would explain everything to me.'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'All right then. The difference is that magic books contain\nthe abilities of ancient heroes.'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'When the hero dies, the force he controls, or her, is sealed into\na normal book' +
      'which then becomes magical which means that\nthe one who owns the book...'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: '...can summon this hero through the summoning spell and it\'s\nonly up to' +
      'the owner whether the hero will do good or evil.'
  }),
  new StoryTutorial({
    speaker: 'P',
    text: 'That\'s bad.'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'You\'re right. So, your task is simple.'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Find all these magic books and find out who stole them.'
  }),
  new StoryTutorial({
    speaker: 'P',
    text: 'OK. But what am I supposed to do when I met a summoning\nhero.'
  }),
  new StoryTutorial({
    speaker: 'M',
    text: 'Come with me. One magic book stays here, I will teach you\nhow to summon a hero.'
  })
];

StoryTutorial.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all!');
  }
});

let done = 0;

for (let story of storyTutorials) {
  story.save(err => {
    // eslint-disable-next-line no-console
    // console.log(story);
    // console.log(result);
    if (err) throw err;
    done++;
    if (done === storyTutorials.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}