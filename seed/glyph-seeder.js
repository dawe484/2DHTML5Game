'use strict';

const Glyph = require('../models/glyph');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/2DHTML5Game');

let glyphs = [
  // ---- GREY ---- //
  // Ability Power
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/ability_power_icon.png',
    icon_path: 'ability_power_icon',
    title: 'Ability Power',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Ability power.',
    attributes: [{
      title: 'ability power',
      amount: 6
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-3'
      },
      {
        type_location: 'Normal',
        chapter: '4-4'
      },
      {
        type_location: 'Normal',
        chapter: '6-6'
      }
    ]
  }),
  // Armor
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/armor_icon.png',
    icon_path: 'armor_icon',
    title: 'Armor',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Armor.',
    attributes: [{
      title: 'armor',
      amount: 2
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-2'
      },
      {
        type_location: 'Normal',
        chapter: '3-4'
      },
      {
        type_location: 'Normal',
        chapter: '5-1'
      },
      {
        type_location: 'Normal',
        chapter: '6-4'
      }
    ]
  }),
  // Armor Penetration
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/armor_pen_icon.png',
    icon_path: 'armor_pen_icon',
    title: 'Armor Penetration',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Armor Penetration.',
    attributes: [{
      title: 'armor penetration',
      amount: 1
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-1'
      },
      {
        type_location: 'Normal',
        chapter: '5-8'
      }
    ]
  }),
  // Attack Damage
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/attack_damage_icon.png',
    icon_path: 'attack_damage_icon',
    title: 'Attack Damage',
    rarity: 'Grey',
    level_req: 1,
    description: 'Adds a small amount of Attack Damage.',
    attributes: [{
      title: 'attack damage',
      amount: 6
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-2'
      },
      {
        type_location: 'Normal',
        chapter: '3-6'
      },
      {
        type_location: 'Normal',
        chapter: '5-5'
      },
      {
        type_location: 'Normal',
        chapter: '6-8'
      }
    ]
  }),
  // Attack Force
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/attack_force_icon.png',
    icon_path: 'attack_force_icon',
    title: 'Attack Force',
    rarity: 'Grey',
    level_req: 2,
    description: "A soldier who's' been hitting the gym.",
    attributes: [{
        title: 'health',
        amount: 60
      },
      {
        title: 'attack damage',
        amount: 3
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-4'
      },
      {
        type_location: 'Normal',
        chapter: '4-6'
      }
    ]
  }),
  // Crit Strike
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/crit_strike_icon.png',
    icon_path: 'crit_strike_icon',
    title: 'Crit Strike',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Crit Strike chance.',
    attributes: [{
      title: 'crit strike level',
      amount: 2.5
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-2'
      },
      {
        type_location: 'Normal',
        chapter: '3-2'
      }
    ]
  }),
  // Double Attack
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/double_attack_icon.png',
    icon_path: 'double_attack_icon',
    title: 'Double Attack',
    rarity: 'Grey',
    level_req: 2,
    description: 'Magic in the left hand, sword in the right.',
    attributes: [{
        title: 'attack damage',
        amount: 5
      },
      {
        title: 'ability power',
        amount: 5
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-5'
      },
      {
        type_location: 'Normal',
        chapter: '6-8'
      },
      {
        type_location: 'Normal',
        chapter: '8-2'
      },
      {
        type_location: 'Normal',
        chapter: '11-1'
      },
      {
        type_location: 'Elite',
        chapter: '1-5'
      },
      {
        type_location: 'Elite',
        chapter: '5-3'
      },
      {
        type_location: 'Elite',
        chapter: '6-8'
      },
      {
        type_location: 'Elite',
        chapter: '11-1'
      },
      {
        type_location: 'Legend',
        chapter: '1-5'
      },
      {
        type_location: 'Legend',
        chapter: '5-3'
      },
      {
        type_location: 'Legend',
        chapter: '6-8'
      },
      {
        type_location: 'Legend',
        chapter: '11-1'
      }
    ]
  }),
  // Energy Regen
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/energy_regen_icon.png',
    icon_path: 'energy_regen_icon',
    title: 'Energy Regen',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Energy regen.',
    attributes: [{
      title: 'energy regen',
      amount: 10
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-4'
      },
      {
        type_location: 'Normal',
        chapter: '3-7'
      }
    ]
  }),
  // Hardiness
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/hardiness_icon.png',
    icon_path: 'hardiness_icon',
    title: 'Hardiness',
    rarity: 'Grey',
    level_req: 2,
    description: 'Hard and big.',
    attributes: [{
        title: 'health',
        amount: 80
      },
      {
        title: 'armor',
        amount: 1
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-6'
      },
      {
        type_location: 'Normal',
        chapter: '3-8'
      }
    ]
  }),
  // Health
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/health_icon.png',
    icon_path: 'health_icon',
    title: 'Health',
    rarity: 'Grey',
    level_req: 1,
    description: 'Adds a small amount of health.',
    attributes: [{
      title: 'health',
      amount: 100
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-1'
      },
      {
        type_location: 'Normal',
        chapter: '4-7'
      },
      {
        type_location: 'Normal',
        chapter: '6-4'
      }
    ]
  }),
  // Health Regen
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/health_regen_icon.png',
    icon_path: 'health_regen_icon',
    title: 'Health Regen',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of health regeneration.',
    attributes: [{
      title: 'health regen',
      amount: 60
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-1'
      },
      {
        type_location: 'Normal',
        chapter: '4-4'
      },
      {
        type_location: 'Normal',
        chapter: '7-8'
      }
    ]
  }),
  // Magic Force
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/magic_force_icon.png',
    icon_path: 'magic_force_icon',
    title: 'Magic Force',
    rarity: 'Grey',
    level_req: 2,
    description: 'A mage who works out?',
    attributes: [{
        title: 'health',
        amount: 60
      },
      {
        title: 'ability power',
        amount: 3
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-6'
      },
      {
        type_location: 'Normal',
        chapter: '6-6'
      }
    ]
  }),
  // Magic Penetration
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/magic_pen_icon.png',
    icon_path: 'magic_pen_icon',
    title: 'Magic Penetration',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Magic penetration.',
    attributes: [{
      title: 'magic penetration',
      amount: 1
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-3'
      },
      {
        type_location: 'Normal',
        chapter: '4-2'
      },
      {
        type_location: 'Normal',
        chapter: '6-2'
      }
    ]
  }),
  // Magic Resist
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/magic_resist_icon.png',
    icon_path: 'magic_resist_icon',
    title: 'Magic Resist',
    rarity: 'Grey',
    level_req: 2,
    description: 'Adds a small amount of Magic resist.',
    attributes: [{
      title: 'magic resist',
      amount: 2
    }],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-3'
      },
      {
        type_location: 'Normal',
        chapter: '3-5'
      },
      {
        type_location: 'Normal',
        chapter: '6-7'
      }
    ]
  }),
  // Regenerate
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/grey/regenerate_icon.png',
    icon_path: 'regenerate_icon',
    title: 'Regenerate',
    rarity: 'Grey',
    level_req: 2,
    description: 'Momma won\'t ever have to worry about me getting killed again!',
    attributes: [{
        title: 'health',
        amount: 75
      },
      {
        title: 'health regen',
        amount: 30
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '1-5'
      },
      {
        type_location: 'Normal',
        chapter: '4-1'
      },
      {
        type_location: 'Normal',
        chapter: '7-3'
      }
    ]
  }),
  // ---- GREEN ---- //
  // Aggression
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/aggression_icon.png',
    icon_path: 'aggression_icon',
    title: 'Aggression',
    rarity: 'Green',
    level_req: 9,
    description: 'Word around town is you\'ve got weapons of mass destruction here?',
    attributes: [{
        title: 'attack damage',
        amount: 12
      },
      {
        title: 'ability power',
        amount: 6
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-4'
      },
      {
        type_location: 'Normal',
        chapter: '4-3'
      },
      {
        type_location: 'Normal',
        chapter: '9-1'
      }
    ]
  }),
  // Avarice
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/avarice_icon.png',
    icon_path: 'avarice_icon',
    title: 'Avarice',
    rarity: 'Green',
    level_req: 10,
    description: 'There are all mine!',
    attributes: [{
        title: 'attack damage',
        amount: 3
      },
      {
        title: 'crit strike level',
        amount: 3.7
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Balance
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/balance_icon.png',
    icon_path: 'balance_icon',
    title: 'Balance',
    rarity: 'Green',
    level_req: 15,
    description: 'Let me weigh your heart',
    attributes: [{
        title: 'attack damage',
        amount: 5
      },
      {
        title: 'armor',
        amount: 5
      },
      {
        title: 'ability power',
        amount: 5
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Bloodthirst
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/bloodthirst_icon.png',
    icon_path: 'bloodthirst_icon',
    title: 'Bloodthirst',
    rarity: 'Green',
    level_req: 10,
    description: 'This red liquid is as delicious as it looks.',
    attributes: [{
        title: 'attack damage',
        amount: 3
      },
      {
        title: 'life steal level',
        amount: 3
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-6'
      },
      {
        type_location: 'Normal',
        chapter: '5-6'
      }
    ]
  }),
  // Bravery
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/bravery_icon.png',
    icon_path: 'bravery_icon',
    title: 'Bravery',
    rarity: 'Green',
    level_req: 11,
    description: 'Brave heart.',
    attributes: [{
        title: 'attack damage',
        amount: 5
      },
      {
        title: 'armor',
        amount: 2
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Cardio
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/cardio_icon.png',
    icon_path: 'cardio_icon',
    title: 'Cardio',
    rarity: 'Green',
    level_req: 9,
    description: 'A breastplate.',
    attributes: [{
        title: 'armor',
        amount: 5
      },
      {
        title: 'health regen',
        amount: 50
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Chivalry
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/chivalry_icon.png',
    icon_path: 'chivalry_icon',
    title: 'Chivalry',
    rarity: 'Green',
    level_req: 16,
    description: 'No one can stop a punk who knows karate.',
    attributes: [{
        title: 'health',
        amount: 240
      },
      {
        title: 'attack damage',
        amount: 4
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Defense
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/defense_icon.png',
    icon_path: 'defense_icon',
    title: 'Defense',
    rarity: 'Green',
    level_req: 15,
    description: 'I will protect you!',
    attributes: [{
        title: 'attack damage',
        amount: 8
      },
      {
        title: 'magic resist',
        amount: 4
      },
      {
        title: 'health regen',
        amount: 50
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Divine Power
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/divine_power_icon.png',
    icon_path: 'divine_power_icon',
    title: 'Divine Power',
    rarity: 'Green',
    level_req: 11,
    description: 'If you drink your milk, you can too!',
    attributes: [{
        title: 'attack damage',
        amount: 6
      },
      {
        title: 'ability power',
        amount: 12
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-2'
      },
      {
        type_location: 'Normal',
        chapter: '6-3'
      }
    ]
  }),
  // Enforcement
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/enforcement_icon.png',
    icon_path: 'enforcement_icon',
    title: 'Enforcement',
    rarity: 'Green',
    level_req: 18,
    description: 'You have the right to remain silent!',
    attributes: [{
        title: 'health',
        amount: 60
      },
      {
        title: 'attack damage',
        amount: 10
      },
      {
        title: 'ability power',
        amount: 10
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Extra Health
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/extra_health_icon.png',
    icon_path: 'extra_health_icon',
    title: 'Extra Health',
    rarity: 'Green',
    level_req: 8,
    description: 'You are what you eat.',
    attributes: [{
        title: 'health',
        amount: 180
      },
      {
        title: 'health regen',
        amount: 50
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-1'
      },
      {
        type_location: 'Normal',
        chapter: '5-2'
      }
    ]
  }),
  // Fortitude
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/fortitude_icon.png',
    icon_path: 'fortitude_icon',
    title: 'Fortitude',
    rarity: 'Green',
    level_req: 8,
    description: 'Attack!',
    attributes: [{
        title: 'attack damage',
        amount: 10
      },
      {
        title: 'health regen',
        amount: 50
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-3'
      },
      {
        type_location: 'Normal',
        chapter: '4-5'
      }
    ]
  }),
  // Illusion
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/illusion_icon.png',
    icon_path: 'illusion_icon',
    title: 'Illusion',
    rarity: 'Green',
    level_req: 18,
    description: 'What else do you wanna see besides poker cards?',
    attributes: [{
        title: 'ability power',
        amount: 8
      },
      {
        title: 'magic penetration',
        amount: 2
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Immortality
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/immortality_icon.png',
    icon_path: 'immortality_icon',
    title: 'Immortality',
    rarity: 'Green',
    level_req: 12,
    description: 'Chuck Norris said he\'s gonna live forever.',
    attributes: [{
      title: 'health',
      amount: 220
    }],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Infinity
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/infinity_icon.png',
    icon_path: 'infinity_icon',
    title: 'Infinity',
    rarity: 'Green',
    level_req: 17,
    description: 'Healthy teeth lead to a healthy appetite.',
    attributes: [{
        title: 'ability power',
        amount: 5
      },
      {
        title: 'life steal level',
        amount: 3
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Magic Shield
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/magic_shield_icon.png',
    icon_path: 'magic_shield_icon',
    title: 'Magic Shield',
    rarity: 'Green',
    level_req: 15,
    description: 'This is also called coating.',
    attributes: [{
        title: 'armor',
        amount: 4
      },
      {
        title: 'ability power',
        amount: 8
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Meditation
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/meditation_icon.png',
    icon_path: 'meditation_icon',
    title: 'Meditation',
    rarity: 'Green',
    level_req: 7,
    description: 'Think about what to eat for dinner.',
    attributes: [{
        title: 'ability power',
        amount: 7
      },
      {
        title: 'magic resist',
        amount: 2
      }
    ],
    map_location: [{
        type_location: 'Normal',
        chapter: '2-5'
      },
      {
        type_location: 'Normal',
        chapter: '4-8'
      },
      {
        type_location: 'Normal',
        chapter: '5-4'
      }
    ]
  }),
  // Nature
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/nature_icon.png',
    icon_path: 'nature_icon',
    title: 'Nature',
    rarity: 'Green',
    level_req: 10,
    description: 'I love nature. Look, even my desktop background is nature scenes!',
    attributes: [{
        title: 'health',
        amount: 180
      },
      {
        title: 'energy regen',
        amount: 15
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Osmosis
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/osmosis_icon.png',
    icon_path: 'osmosis_icon',
    title: 'Osmosis',
    rarity: 'Green',
    level_req: 16,
    description: 'I\'m part of you, and you\'re part of me.',
    attributes: [{
        title: 'attack damage',
        amount: 8
      },
      {
        title: 'ability power',
        amount: 8
      },
      {
        title: 'armor penetration',
        amount: 2
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Providence
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/providence_icon.png',
    icon_path: 'providence_icon',
    title: 'Providence',
    rarity: 'Green',
    level_req: 7,
    description: 'You\'ve always felt there\'s someone watching you from the shadows...',
    attributes: [{
        title: 'health',
        amount: 140
      },
      {
        title: 'magic resist',
        amount: 2
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Prowess
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/prowess_icon.png',
    icon_path: 'prowess_icon',
    title: 'Prowess',
    rarity: 'Green',
    level_req: 7,
    description: 'In a showdown, fortune favors the bold.',
    attributes: [{
        title: 'armor',
        amount: 2
      },
      {
        title: 'ability power',
        amount: 7
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Sublimity
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/sublimity_icon.png',
    icon_path: 'sublimity_icon',
    title: 'Sublimity',
    rarity: 'Green',
    level_req: 16,
    description: 'A mountain doesn\'t have to say it\'s tall.',
    attributes: [{
        title: 'health',
        amount: 260
      },
      {
        title: 'health regen',
        amount: 50
      },
      {
        title: 'energy regen',
        amount: 10
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // Valor
  new Glyph({
    image_path: 'https://akela.mendelu.cz/~xkrenar/game/database_image_path/glyphs/green/valor_icon.png',
    icon_path: 'valor_icon',
    title: 'Valor',
    rarity: 'Green',
    level_req: 12,
    description: 'Black Friday was made for you.',
    attributes: [{
        title: 'attack damage',
        amount: 8
      },
      {
        title: 'ability power',
        amount: 8
      },
      {
        title: 'energy regen',
        amount: 10
      }
    ],
    map_location: [{
      type_location: 'Normal',
      chapter: '0-0'
    }]
  }),
  // ---- BLUE ---- //
  //
  // ---- PURPLE ---- //
  //
  // ---- ORANGE ---- //
  //
  // ---- ?? RED in 2019 ?? ---- //
];

Glyph.remove({}, function(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.err(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('Remove all!');
  }
});

let done = 0;

for (let i = 0; i < glyphs.length; i++) {
  glyphs[i].save(() => {
    done++;
    if (done === glyphs.length) {
      // eslint-disable-next-line no-console
      console.log('All glyphs saved in DB.');
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}