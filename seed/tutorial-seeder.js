'use strict';

const Tutorial = require('../models/tutorial');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let tutorials = [
  new Tutorial({
    speaker: 'M',
    text: "This is Magic Bookcase where you can summon heroes."
  }),
  new Tutorial({
    speaker: 'M',
    text: "Book of Magic may grants you 1 star hero, hero's page or glyphs."
  }),
  new Tutorial({
    speaker: 'M',
    text: "Ok, let's give it a try. This time is for free."
  }),
  new Tutorial({
    speaker: 'M',
    text: "Grand Book of Magic may grants 2-star or 3-star heroes."
  }),
];

let done = 0;

for (let i = 0; i < tutorials.length; i++) {
  tutorials[i].save( (err, result) => {
    done++;
    if (done === tutorials.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
