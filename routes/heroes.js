/* jshint node: true */
'use strict';

const express = require('express');
const router = express.Router();
const Hero = require('../models/hero');

// Heroes Collection
router.get('/', (req, res) => {
  Hero.find((err, heroes) => {
    let heroesChunk = [];
    let chunkSize = 6;
    for (let i = 0; i < heroes.length; i += chunkSize) {
      heroesChunk.push(heroes.slice(i, i + chunkSize));
    }

    // let getHeroes = () => {
    //   console.log(heroes[0].class);
    //   return heroes;
    // };
    //
    // getHeroes();

    res.render('heroes', {
      title: 'Magical Heroes',
      heroes: heroesChunk
    });
    // res.send(JSON.stringify(getHeroes()));
  });
  // Hero.find().lean().exec((err, heroes) => {
  //   return res.end(JSON.stringify(heroes));
  // });
});

router.get('/:urlName', (req, res) => {
  Hero.getHeroByUrlName(req.params.urlName, (err, hero) => {
    if (err) throw err;
    res.render('hero', {
      title: 'Magical Heroes',
      urlName: req.params.urlName,
      name: hero.name,
      webImage: hero.web_image_path,
      class: hero.class,
      position: hero.position,
      description: hero.description,
      power: hero.power,
      power_inc: hero.power_inc,
      health: hero.health,
      health_inc: hero.health_inc,
      attack_damage: hero.attack_damage,
      attack_damage_inc: hero.attack_damage_inc,
      ability_power: hero.ability_power,
      ability_power_inc: hero.ability_power_inc,
      armor: hero.armor,
      armor_inc: hero.armor_inc,
      magic_resist: hero.magic_resist,
      magic_resist_inc: hero.magic_resist_inc,
      skill1_icon: hero.skills[0].icon_path,
      skill1_title: hero.skills[0].title,
      skill1_description: hero.skills[0].description,
      skill2_icon: hero.skills[1].icon_path,
      skill2_title: hero.skills[1].title,
      skill2_description: hero.skills[1].description,
      skill3_icon: hero.skills[2].icon_path,
      skill3_title: hero.skills[2].title,
      skill3_description: hero.skills[2].description,
      skill4_icon: hero.skills[3].icon_path,
      skill4_title: hero.skills[3].title,
      skill4_description: hero.skills[3].description,
    });
  });
});

module.exports = router;