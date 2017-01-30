/*!
 * game.js - v0.0.1
 * Compiled Wed, 25 Jan 2017 19:41:43 UTC
 *
 * game.js is licensed under the IDONTKNOW License.
 *
*/

'use strict'
/* #GAME SCRIPTS START# */

//Aliases
let Container = PIXI.Container;
let autoDetectRenderer = PIXI.autoDetectRenderer;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let TextureCache = PIXI.utils.TextureCache;
let Sprite = PIXI.Sprite;

//Define a few globals here
let GAME_WIDTH = 1920; //960
let GAME_HEIGHT = 1080; //540
let renderer = null;
let stage = null;
let stats = null;

let background = null;
let iconAvatar = null;
let btnFullscreen = null;
let leryssa = null;
let diuwin = null;
let crystal = null;
let sin = null;
let leona = null;

//set the game's current state to 'play'
let state = play;

function init() {
  let rendererOptions = {
    antialias: true,
    transparent: true,
    resolution: window.devicePixelRatio,
    autoResize: true
  };

  //Create a PIXI stage and renderer
  renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);
  renderer.backgroundColor = 0x202020;

  if (renderer instanceof PIXI.CanvasRenderer) {
    console.log("Render: Canvas");
    console.log("Device pixel ratio:", window.devicePixelRatio);
  } else {
    console.log("Render: WebGL");
    console.log("Device pixel ratio:", window.devicePixelRatio);
  }

  //Add the canvas to the HTML document
  document.body.appendChild(renderer.view);

  //Create a container object called the 'stage'
  stage = new Container();

  resize();

  ////ON THE TOP OF OUR SCENE WE PUT A FPS COUNTER FROM MR.DOOB - stats.js ////
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  //Listen for and adapt to changes to the screen size user changing the window or rotating their device
  window.addEventListener("resize", resize);

  // if (window.devicePixelRatio >= 2) {
  //   // loader.add("monster", "monster@2x.json");
  // } else {
  //   // loader.add("monster", "monster.json");
  // }

  if (window.devicePixelRatio >= 2 && renderer instanceof PIXI.WebGLRenderer) {
    /*
    loader
      //.add([
      //    "img/mainScreenreen/mainScreenBackground@2x.png",
      //])
      .add([
        "img/mainScreenreen/mainScreenBackground.png",
      ])
      .on("progress", loadProgressHandler)
      .load(setup);
    */
  } else {
      //Use PIXI's built-in 'loader' module to load an image
      //and run the 'setup' function when it's done
      loader
        .add([
          //"img/game/jpg_png_pouze_pro_ukazky/main_background_04.jpg"
          "img/game/mainscreen/main_background_04_opt.svg",
          "img/game/mainscreen/icon_avatar.svg",
          "img/game/mainscreen/btn-fullscreen.svg",
          "img/game/heroes/leryssa.svg",
          "img/game/heroes/diu_win.svg",
          "img/game/heroes/crystal.svg",
          "img/game/heroes/sin.svg",
          "img/game/heroes/leona.svg"
        ])
        .on("progress", loadProgressHandler)
        .load(setup);
  }

  function loadProgressHandler(loader, resource) {
    //Display the file 'url' currently being loaded
    //console.log(`loading: ${resource.url}`);
    // console.log(`Error: ${resource.error}`);

    //Display the precentage of files currently loaded
    //console.log(`progress: ${loader.progress} %`);

    // loadingBar(); -nadefinovat!!!! z hexi-core.js
  }

  function resize() {
    let ratio = Math.min(window.innerWidth / GAME_WIDTH, window.innerHeight / GAME_HEIGHT);
    stage.scale.x = stage.scale.y = ratio;
    renderer.resize(Math.ceil(GAME_WIDTH * ratio),Math.ceil(GAME_HEIGHT * ratio));
  }

  //This 'setup' function will run when the image has loaded
  //Create your game objects here
  function setup() {
    console.log("All files loaded");

    //background = new Sprite(resources["img/game/jpg_png_pouze_pro_ukazky/main_background_04.jpg"].texture);
    background = new Sprite(resources["img/game/mainscreen/main_background_04_opt.svg"].texture);
    iconAvatar = new Sprite(resources["img/game/mainscreen/icon_avatar.svg"].texture);
    btnFullscreen = new Sprite(resources["img/game/mainscreen/btn-fullscreen.svg"].texture);
    leryssa = new Sprite(resources["img/game/heroes/leryssa.svg"].texture);
    diuwin = new Sprite(resources["img/game/heroes/diu_win.svg"].texture);
    crystal = new Sprite(resources["img/game/heroes/crystal.svg"].texture);
    sin = new Sprite(resources["img/game/heroes/sin.svg"].texture);
    leona = new Sprite(resources["img/game/heroes/leona.svg"].texture);

    iconAvatar.interactive = true;
    iconAvatar.buttonMode = true;
    iconAvatar.position.x = 20;
    iconAvatar.position.y = 20;

    btnFullscreen.interactive = true;
    btnFullscreen.buttonMode = true;
    btnFullscreen.position.x = 1200;
    btnFullscreen.position.y = 20;

    leryssa.position.x = 1064;
    leryssa.position.y = 662;

    diuwin.position.x = 890;
    diuwin.position.y = 522;

    crystal.position.x = 634;
    crystal.position.y = 632;

    sin.position.x = 395;
    sin.position.y = 544;

    leona.position.x = 30;
    leona.position.y = 574;

    stage.addChild(background);
    stage.addChild(iconAvatar);
    stage.addChild(btnFullscreen);
    stage.addChild(leryssa);
    stage.addChild(diuwin);
    stage.addChild(crystal);
    stage.addChild(sin);
    stage.addChild(leona);

    //If you ever need to, here's how you can clean out WebGL's GPU memory manually
    // Object.keys(TextureCache).forEach(function(texture) {
    //   TextureCache[texture].destroy(true);
    // });

    gameLoop();
  }
}

// Runs the current game 'state' in a loop and render the sprites
function gameLoop() {

  stats.begin();
  // monitored code goes here

  // Update the current game state:
  state();

  // Render the stage - Tell the 'renderer' to render the 'stage'
  renderer.render(stage);

  // Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  stats.end();
}

// All the game logic goes here
// This is your game loop, where you can move sprites and add your game logic
function play() {

  btnFullscreen.click = btnFullscreen.tap = (mouseData) => {
    if(document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if(document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if(document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if(document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }

  btnFullscreen.mouseover = (mouseData) => {
    btnFullscreen.defaultCursor = "pointer";
    //console.log("fullscreen");
  }

}

//All the code that should run at the end of the game goes here
function end() {

}

/* #GAME SCRIPTS END# */
