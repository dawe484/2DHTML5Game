'use strict';

const Tutorial = require('../models/tutorial');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/2DHTML5Game');
mongoose.connect('mongodb://leyzi:NYC18vol@ds019664.mlab.com:19664/mh_db');

let tutorials = [
  new Tutorial({
    speaker: 'M',
    text: 'This is Magic Bookcase where you can summon heroes.'
  }),
  new Tutorial({
    speaker: 'M',
    text: 'Book of Magic may grants you 1 star hero, hero\'s page or glyphs.'
  }),
  new Tutorial({
    speaker: 'M',
    text: 'Ok, let\'s give it a try. This time is for free.'
  }),
  new Tutorial({
    speaker: 'M',
    text: 'Grand Book of Magic may grants 2-star or 3-star heroes.'
  }),
  new Tutorial({
    speaker: 'M',
    text: 'Wow, you have learnt how to summon heroes. Great! But I missed your name.'
  }),
  new Tutorial({
    speaker: 'M',
    text: 'What a great name! Now we can take a look at the map.'
  }),
];

Tutorial.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all!');
  }
});

let done = 0;

for (let i = 0; i < tutorials.length; i++) {
  tutorials[i].save(() => {
    done++;
    if (done === tutorials.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}