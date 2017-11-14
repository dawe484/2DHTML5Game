'use strict';

const Language = require('../models/language');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let languages = [
  new Language({
    language: 'english',
    mainScreenIconsTitle: ['Map', 'Guild', 'Ranking', 'Friends', 'Crusade',
      'Mail', 'Town', 'Summon\nBooks'],
    scrollIconsTitle: ['Heroes', 'Inventory', 'Tasks', 'Trials', 'Battle',
      'Markets', 'Arena', 'Grand\nArena', 'Arena\nShop', 'Grand\nArena\nShop',
      'Guild\nShop', 'Crusade\nShop', 'Fantasy\nShop', 'Shop']
  }),
  new Language({
    language: 'czech',
    mainScreenIconsTitle: ['Mapa', 'Cech', 'Hodnocení', 'Přátelé', 'Výprava',
      'Pošta', 'Město', 'Přivolávací\nKnihy'],
    scrollIconsTitle: ['Hrdinové', 'Inventář', 'Úkoly', 'Zkoušky', 'Bitva',
      'Trhy', 'Aréna', 'Velká\nAréna', 'Obchod\nArény', 'Obchod\nVelké\nArény',
      'Cechovní\nObchod', 'Obchod\nVýpravy', 'Obchod\nFantazie', 'Obchod']
  }),
];

let done = 0;

Language.remove({}, function(err) {
    if (err) {
      console.err(err)
    } else {
      console.log('Remove all!');
    }
  }
);

for (let i = 0; i < languages.length; i++) {
  languages[i].save( (err, result) => {
    done++;
    if (done === languages.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
