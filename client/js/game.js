'use strict';

const PIXI = require('pixi.js');

console.log('PIXI 2');

//Aliases
const Container = PIXI.Container,
      autoDetectRenderer = PIXI.autoDetectRenderer,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      TextureCache = PIXI.utils.TextureCache,
      Sprite = PIXI.Sprite;

// Define globals here
const GAME_WIDTH = 1920,
      GAME_HEIGHT = 1080;

let renderer,
    stage;

//set the game's current state to 'play'
//let state = play;

function init() {

  renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);

  document.body.appendChild(renderer.view);

  stage = new Container();

  gameLoop();

}

function gameLoop() {

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Render the stage
  renderer.render(stage);

}

init();

console.log('hi');
