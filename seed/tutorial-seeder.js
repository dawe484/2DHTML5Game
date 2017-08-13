'use strict';

const Tutorial = require('../models/tutorial');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let tutorials = [
  new Tutorial({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/tutorial/tutorial-01.png',
    sequence: 1
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
