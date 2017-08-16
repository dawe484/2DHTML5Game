'use strict';

const PIXI = require('pixi.js');

// Aliases
const Container = PIXI.Container,
      autoDetectRenderer = PIXI.autoDetectRenderer,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      TextureCache = PIXI.utils.TextureCache,
      Sprite = PIXI.Sprite,
      Text = PIXI.Text,
      TextStyle = PIXI.TextStyle;

// Define globals here
const GAME_WIDTH = 1920,
      GAME_HEIGHT = 1080,
      pngPostfix = ".png",
      jpgPostfix = ".jpg",
      backgroundEmptyPath = "/images/game/mainscreen/background-empty"+jpgPostfix;
      // backgroundPath = "/images/game/mainscreen/background"+pngPostfix;

let renderer,
    tutorialContainer,
    stage;

let background_tutorialContainer;

let message;

// Set the game's current state to 'play'
let state = playing;

// Define socket for communication to server
let socket;

// Init function
function init() {
  let rendererOptions = {
    antialias: false,
    transparent: false,
    resolution: window.devicePixelRatio
  };

  renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);

  if (renderer instanceof PIXI.CanvasRenderer) {
    console.log("Render: Canvas");
    console.log("Device pixel ratio:", window.devicePixelRatio);
  } else {
    console.log("Render: WebGL");
    console.log("Device pixel ratio:", window.devicePixelRatio);
  }

  document.body.appendChild(renderer.view);

  stage = new Container();

  resize();

  // Listen for and adapt to changes to the screen size user changing the window or rotating their device
  window.addEventListener("resize", resize);

  if (window.devicePixelRatio >= 2 && renderer instanceof PIXI.WebGLRenderer) {
    loader
      .add([
      ])
      .on("progress", loadProgressHandler)
      .load(setup);

  } else {
      // Use PIXI's built-in 'loader' module to load an image and run the 'setup' function when it's done
      loader
        .add([
          backgroundEmptyPath
        ])
        .on("progress", loadProgressHandler)
        .load(setup);
  }

  function loadProgressHandler(loader, resource) {
    // Display the file 'url' currently being loaded
    console.log(`loading: ${resource.url}`);
    // console.log(`Error: ${resource.error}`);

    // Display the precentage of files currently loaded
    console.log(`progress: ${loader.progress} %`);
    // loadingBar(); -nadefinovat!!!! z hexi-core.js
  }

  function resize() {
    let ratio = Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT);
    stage.scale.x = stage.scale.y = ratio;
    renderer.resize(Math.ceil(GAME_WIDTH * ratio),Math.ceil(GAME_HEIGHT * ratio));
  }

  // This 'setup' function will run when the image has loaded
  // Create your game objects here
  function setup() {

    // Define socket connection to our server
    socket = io.connect('http://localhost:2000');

    socket.on('mouse', newMsg);

    socket.on('serverMsg', (data) => {
      console.log(data.message);
    });

    console.log("All files loaded");

    // Create font style
    let textstyle = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 108,
      fill: '#ff0000',
      background: '#ff0000'
    });

    tutorialContainer = new Container();

    message = new Text('Hello World', textstyle);
    message.position.set(50, 50);

    background_tutorialContainer = new Sprite(resources[backgroundEmptyPath].texture);
    background_tutorialContainer.position.set(0, 0);
    background_tutorialContainer.interactive = true;

    background_tutorialContainer.on('pointerdown', onClick);

    tutorialContainer.addChild(background_tutorialContainer, message);

    stage.addChild(tutorialContainer);

    gameLoop();
  }
}

function onClick() {
  console.log('Sending data to server: ', message._text);

  let data = message._text;

  socket.emit('mouse', data);
}

function newMsg(data) {
  message.text = data;
}

function gameLoop() {
  // Update the current game state:
  state();

  // Render the stage - Tell the 'renderer' to render the 'stage'
  renderer.render(stage);

  // Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

}

// All the game logic goes here
// This is your game loop, where you can move sprites and add your game logic
// Logic in 'gameScene'
function playing() {

}

//All the code that should run at the end of the game goes here
function end() {

}

init();
