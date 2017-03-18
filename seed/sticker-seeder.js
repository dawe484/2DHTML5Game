'use strict';

const Sticker = require('../models/sticker');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/2DHTML5Game');

let stickers = [
  // GREY
  // Armor
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Armor.png',
    title: 'Armor',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of armor.',
    attributes: [
      { title: 'armor', amount: 2 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-2' },
      { type_location: 'Normal', chapter: '3-4' },
      { type_location: 'Normal', chapter: '5-1' },
      { type_location: 'Normal', chapter: '6-4' }
    ]
  }),
  // Health Regen
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Health_Regen.png',
    title: 'Health Regen',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of health regeneration.',
    attributes: [
      { title: 'health regen', amount: 60 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-1' },
      { type_location: 'Normal', chapter: '4-4' },
      { type_location: 'Normal', chapter: '7-8' }
    ]
  }),
  // Double Attack
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Double_Attack.png',
    title: 'Double Attack',
    rarity: 'Grey',
    level_req: 2,
    description: 'Magic in the left hand, sword in the right.',
    attributes: [
      { title: 'attack damage', amount: 5 },
      { title: 'ability power', amount: 5 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-5' },
      { type_location: 'Normal', chapter: '6-8' },
      { type_location: 'Normal', chapter: '8-2' },
      { type_location: 'Normal', chapter: '11-1' },
      { type_location: 'Elite', chapter: '1-5' },
      { type_location: 'Elite', chapter: '5-3' },
      { type_location: 'Elite', chapter: '6-8' },
      { type_location: 'Elite', chapter: '11-1' },
      { type_location: 'Legend', chapter: '1-5' },
      { type_location: 'Legend', chapter: '5-3' },
      { type_location: 'Legend', chapter: '6-8' },
      { type_location: 'Legend', chapter: '11-1' }
    ]
  }),
  // Attack Damage
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Attack_Damage.png',
    title: 'Attack Damage',
    rarity: 'Grey',
    level_req: 1,
    description: 'Adds a small amount of Attack damage.',
    attributes: [
      { title: 'attack damage', amount: 6 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-2' },
      { type_location: 'Normal', chapter: '3-6' },
      { type_location: 'Normal', chapter: '5-5' },
      { type_location: 'Normal', chapter: '6-8' }
    ]
  }),
  // Attack Force
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Attack_Force.png',
    title: 'Attack Force',
    rarity: 'Grey',
    level_req: 2,
    description: "A soldier who's' been hitting the gym.",
    attributes: [
      { title: 'health', amount: 60 },
      { title: 'attack damage', amount: 3 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-4' },
      { type_location: 'Normal', chapter: '4-6' }
    ]
  }),
  // Hardiness
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Hardiness.png',
    title: 'Hardiness',
    rarity: 'Grey',
    level_req: 2,
    description: 'Hard and big.',
    attributes: [
      { title: 'health', amount: 80 },
      { title: 'armor', amount: 1 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-6' },
      { type_location: 'Normal', chapter: '3-8' }
    ]
  }),
  // Magic Penetration
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Magic_Penetration.png',
    title: 'Hardiness',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Magic penetration.',
    attributes: [
      { title: 'magic penetration', amount: 1 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '2-3' },
      { type_location: 'Normal', chapter: '4-2' },
      { type_location: 'Normal', chapter: '6-2' }
    ]
  }),
  // Regenerate
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Regenerate.png',
    title: 'Regenerate',
    rarity: 'Grey',
    level_req: 2,
    description: "Momma won't ever have to worry about me getting killed again!",
    attributes: [
      { title: 'health', amount: 75 },
      { title: 'health regen', amount: 30 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-5' },
      { type_location: 'Normal', chapter: '4-1' },
      { type_location: 'Normal', chapter: '7-3' }
    ]
  }),
  // Magic Force
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Magic_Force.png',
    title: 'Magic Force',
    rarity: 'Grey',
    level_req: 2,
    description: 'A mage who works out?',
    attributes: [
      { title: 'health', amount: 60 },
      { title: 'ability power', amount: 3 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-6' },
      { type_location: 'Normal', chapter: '6-6' }
    ]
  }),
  // Energy Regen
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Energy_Regen.png',
    title: 'Energy Regen',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Energy regen.',
    attributes: [
      { title: 'energy regen', amount: 10 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-4' },
      { type_location: 'Normal', chapter: '3-7' }
    ]
  }),
  // Health
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Health.png',
    title: 'Health',
    rarity: 'Grey',
    level_req: 1,
    description: 'Adds a small amount of health.',
    attributes: [
      { title: 'health', amount: 100 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-1' },
      { type_location: 'Normal', chapter: '4-7' },
      { type_location: 'Normal', chapter: '6-4' }
    ]
  }),
  // Ability Power
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Ability_Power.png',
    title: 'Ability Power',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Ability power.',
    attributes: [
      { title: 'ability power', amount: 6 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-3' },
      { type_location: 'Normal', chapter: '4-4' },
      { type_location: 'Normal', chapter: '6-6' }
    ]
  }),
  // Magic Resist
  new Sticker({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/stickers/Magic_Resist.png',
    title: 'Magic Resist',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Magic resist.',
    attributes: [
      { title: 'magic resist', amount: 2 }
    ],
    map_location: [
      { type_location: 'Normal', chapter: '1-3' },
      { type_location: 'Normal', chapter: '3-5' },
      { type_location: 'Normal', chapter: '6-7' }
    ]
  }),
];

let done = 0;

for (let i = 0; i < stickers.length; i++) {
  stickers[i].save( (err, result) => {
    done++;
    if (done === stickers.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
