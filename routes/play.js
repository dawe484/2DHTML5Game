'use strict'

let express = require('express');
let router = express.Router();

// let PIXI = require('pixi.js');
//
// l//Create the renderer
// var renderer = PIXI.autoDetectRenderer(256, 256);
//
// //Add the canvas to the HTML document
// document.body.appendChild(renderer.view);
//
// //Create a container object called the `stage`
// var stage = new PIXI.Container();
//
// //Tell the `renderer` to `render` the `stage`
// renderer.render(stage);

// Play Game
router.get('/', (req, res) => {
  res.render('play', {layout: false});
});

module.exports = router;


// var PIXI = require('pixi.js');
//
// var renderer = new PIXI.autoDetectRenderer(2525, 2338);
//
// document.body.appendChild(renderer.view);
//
// var stage = new PIXI.Container();
//
// var zombieTexture = PIXI.Texture.fromImage('03-bw.jpg');
// var zombie = new PIXI.Sprite(zombieTexture);
//
// zombie.position.x = 0;
// zombie.position.y = 0;
//
// stage.addChild(zombie);
//
// function draw() {
//   renderer.render(stage);
//   requestAnimationFrame(draw);
// }
//
// draw();
