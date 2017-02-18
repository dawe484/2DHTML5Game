/*!
 * game.js - v0.0.1
 * Compiled Wed, 25 Jan 2017 19:41:43 UTC
 *
 * game.js is licensed under the IDONTKNOW License.
 *
*/

'use strict';
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
let menuStage = null;

let background = null;
let avatarIcon = null;
let avatarLevelIcon = null;
let avatarBar = null;
let guildIcon = null;
let rankingIcon = null;
let staminaBar = null;
let plusStaminaIcon = null;
let goldBar = null;
let plusGoldIcon = null;
let diamondBar = null;
let plusDiamondIcon = null;
let fullscreenBtn = null;
let campaignIcon = null;
let menuIcon = null;
let booksIcon = null;
let bronzeBookIcon = null;
let silverBookIcon = null;
let goldBookIcon = null;
let marketsIcon = null;
let shopIcon = null;
let mysteryShopIcon = null;
let heroesIcon = null;
let bagIcon = null;
let battleIcon = null;
let arenaIcon = null;
let grandArenaIcon = null;
let trialsIcon = null;
let heroTrialIcon = null;
let portalIcon = null;
let tasksIcon = null;
let dailiesIcon = null;
let questsIcon = null;

let leryssa = null;
let diuwin = null;
let crystal = null;
let sin = null;
let leona = null;
let leonapng = null;

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
          "img/game/mainscreen/icon_level.svg",
          "img/game/mainscreen/bar_avatar.svg",
          "img/game/mainscreen/icon_guild.svg",
          "img/game/mainscreen/icon_ranking.svg",
          "img/game/mainscreen/bar_stamina.svg",
          "img/game/mainscreen/bar_gold.svg",
          "img/game/mainscreen/bar_diamond.svg",
          "img/game/mainscreen/icon_plus.svg",
          "img/game/mainscreen/btn-fullscreen.svg",
          "img/game/mainscreen/icon_campaign.svg",
          "img/game/mainscreen/icon_menu.svg",
          "img/game/mainscreen/icon_books.svg",
          "img/game/mainscreen/icon_bronze_book.svg",
          "img/game/mainscreen/icon_silver_book.svg",
          "img/game/mainscreen/icon_gold_book.svg",
          "img/game/mainscreen/icon_markets.svg",
          "img/game/mainscreen/icon_shop.svg",
          "img/game/mainscreen/icon_mystery_shop.svg",
          "img/game/mainscreen/icon_heroes.svg",
          "img/game/mainscreen/icon_bag.svg",
          "img/game/mainscreen/icon_battle.svg",
          "img/game/mainscreen/icon_arena.svg",
          "img/game/mainscreen/icon_grand_arena.svg",
          "img/game/mainscreen/icon_trials.svg",
          "img/game/mainscreen/icon_hero_trial.svg",
          "img/game/mainscreen/icon_portal.svg",
          "img/game/mainscreen/icon_tasks.svg",
          "img/game/mainscreen/icon_dailies.svg",
          "img/game/mainscreen/icon_quests.svg",
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

    menuStage = new Container();

    //background = new Sprite(resources["img/game/jpg_png_pouze_pro_ukazky/main_background_04.jpg"].texture);
    background = new Sprite(resources["img/game/mainscreen/main_background_04_opt.svg"].texture);
    avatarIcon = new Sprite(resources["img/game/mainscreen/icon_avatar.svg"].texture);
    avatarLevelIcon = new Sprite(resources["img/game/mainscreen/icon_level.svg"].texture);
    avatarBar = new Sprite(resources["img/game/mainscreen/bar_avatar.svg"].texture);
    guildIcon = new Sprite(resources["img/game/mainscreen/icon_guild.svg"].texture);
    rankingIcon = new Sprite(resources["img/game/mainscreen/icon_ranking.svg"].texture);
    staminaBar = new Sprite(resources["img/game/mainscreen/bar_stamina.svg"].texture);
    goldBar = new Sprite(resources["img/game/mainscreen/bar_gold.svg"].texture);
    diamondBar = new Sprite(resources["img/game/mainscreen/bar_diamond.svg"].texture);
    plusStaminaIcon = new Sprite(resources["img/game/mainscreen/icon_plus.svg"].texture);
    plusGoldIcon = new Sprite(resources["img/game/mainscreen/icon_plus.svg"].texture);
    plusDiamondIcon = new Sprite(resources["img/game/mainscreen/icon_plus.svg"].texture);
    fullscreenBtn = new Sprite(resources["img/game/mainscreen/btn-fullscreen.svg"].texture);
    campaignIcon = new Sprite(resources["img/game/mainscreen/icon_campaign.svg"].texture);

    menuIcon = new Sprite(resources["img/game/mainscreen/icon_menu.svg"].texture);
    booksIcon = new Sprite(resources["img/game/mainscreen/icon_books.svg"].texture);
    bronzeBookIcon = new Sprite(resources["img/game/mainscreen/icon_bronze_book.svg"].texture);
    silverBookIcon = new Sprite(resources["img/game/mainscreen/icon_silver_book.svg"].texture);
    goldBookIcon = new Sprite(resources["img/game/mainscreen/icon_gold_book.svg"].texture);
    marketsIcon = new Sprite(resources["img/game/mainscreen/icon_markets.svg"].texture);
    shopIcon = new Sprite(resources["img/game/mainscreen/icon_shop.svg"].texture);
    mysteryShopIcon = new Sprite(resources["img/game/mainscreen/icon_mystery_shop.svg"].texture);
    heroesIcon = new Sprite(resources["img/game/mainscreen/icon_heroes.svg"].texture);
    bagIcon = new Sprite(resources["img/game/mainscreen/icon_bag.svg"].texture);
    battleIcon = new Sprite(resources["img/game/mainscreen/icon_battle.svg"].texture);
    arenaIcon = new Sprite(resources["img/game/mainscreen/icon_arena.svg"].texture);
    grandArenaIcon = new Sprite(resources["img/game/mainscreen/icon_grand_arena.svg"].texture);
    trialsIcon = new Sprite(resources["img/game/mainscreen/icon_trials.svg"].texture);
    heroTrialIcon = new Sprite(resources["img/game/mainscreen/icon_hero_trial.svg"].texture);
    portalIcon = new Sprite(resources["img/game/mainscreen/icon_portal.svg"].texture);
    tasksIcon = new Sprite(resources["img/game/mainscreen/icon_tasks.svg"].texture);
    dailiesIcon = new Sprite(resources["img/game/mainscreen/icon_dailies.svg"].texture);
    questsIcon = new Sprite(resources["img/game/mainscreen/icon_quests.svg"].texture);

    leryssa = new Sprite(resources["img/game/heroes/leryssa.svg"].texture);
    diuwin = new Sprite(resources["img/game/heroes/diu_win.svg"].texture);
    crystal = new Sprite(resources["img/game/heroes/crystal.svg"].texture);
    sin = new Sprite(resources["img/game/heroes/sin.svg"].texture);
    leona = new Sprite(resources["img/game/heroes/leona.svg"].texture);

    avatarIcon.interactive = true;
    avatarIcon.buttonMode = true;
    avatarIcon.position.x = 20;
    avatarIcon.position.y = 20;
    avatarLevelIcon.position.x = 70;
    avatarLevelIcon.position.y = 168;
    avatarBar.position.x = 198;
    avatarBar.position.y = 56;

    guildIcon.interactive = true;
    guildIcon.buttonMode = true;
    guildIcon.position.x = 406;
    guildIcon.position.y = 216;

    rankingIcon.interactive = true;
    rankingIcon.buttonMode = true;
    rankingIcon.position.x = 400;
    rankingIcon.position.y = 460;

    staminaBar.position.x = 565;
    staminaBar.position.y = 36;
    plusStaminaIcon.interactive = true;
    plusStaminaIcon.buttonMode = true;
    plusStaminaIcon.position.x = 765;
    plusStaminaIcon.position.y = 36;
    goldBar.position.x = 839;
    goldBar.position.y = 36;
    plusGoldIcon.interactive = true;
    plusGoldIcon.buttonMode = true;
    plusGoldIcon.position.x = 1039;
    plusGoldIcon.position.y = 36;
    diamondBar.position.x = 1113;
    diamondBar.position.y = 36;
    plusDiamondIcon.interactive = true;
    plusDiamondIcon.buttonMode = true;
    plusDiamondIcon.position.x = 1313;
    plusDiamondIcon.position.y = 36;

    fullscreenBtn.interactive = true;
    fullscreenBtn.buttonMode = true;
    fullscreenBtn.position.x = 1500;
    fullscreenBtn.position.y = 36;

    campaignIcon.interactive = true;
    campaignIcon.buttonMode = true;
    campaignIcon.position.x = 1396;
    campaignIcon.position.y = 420;

    menuIcon.interactive = true;
    menuIcon.buttonMode = true;
    menuIcon.position.x = 1772;
    menuIcon.position.y = 36;

    booksIcon.interactive = true;
    booksIcon.buttonMode = true;
    booksIcon.position.x = 1772;
    booksIcon.position.y = 164;
    //booksIcon.visible = false;
    bronzeBookIcon.interactive = true;
    bronzeBookIcon.buttonMode = true;
    bronzeBookIcon.position.x = 1388;
    bronzeBookIcon.position.y = 164;
    bronzeBookIcon.visible = false;
    silverBookIcon.interactive = true;
    silverBookIcon.buttonMode = true;
    silverBookIcon.position.x = 1516;
    silverBookIcon.position.y = 164;
    silverBookIcon.visible = false;
    goldBookIcon.interactive = true;
    goldBookIcon.buttonMode = true;
    goldBookIcon.position.x = 1644;
    goldBookIcon.position.y = 164;
    goldBookIcon.visible = false;

    marketsIcon.interactive = true;
    marketsIcon.buttonMode = true;
    marketsIcon.position.x = 1772;
    marketsIcon.position.y = 292;
    marketsIcon.visible = false;
    shopIcon.interactive = true;
    shopIcon.buttonMode = true;
    shopIcon.position.x = 1516;
    shopIcon.position.y = 292;
    shopIcon.visible = false;
    mysteryShopIcon.interactive = true;
    mysteryShopIcon.buttonMode = true;
    mysteryShopIcon.position.x = 1644;
    mysteryShopIcon.position.y = 292;
    mysteryShopIcon.visible = false;

    heroesIcon.interactive = true;
    heroesIcon.buttonMode = true;
    heroesIcon.position.x = 1772;
    heroesIcon.position.y = 420;
    heroesIcon.visible = false;

    bagIcon.interactive = true;
    bagIcon.buttonMode = true;
    bagIcon.position.x = 1772;
    bagIcon.position.y = 548;
    bagIcon.visible = false;

    battleIcon.interactive = true;
    battleIcon.buttonMode = true;
    battleIcon.position.x = 1772;
    battleIcon.position.y = 676;
    battleIcon.visible = false;
    arenaIcon.interactive = true;
    arenaIcon.buttonMode = true;
    arenaIcon.position.x = 1516;
    arenaIcon.position.y = 676;
    arenaIcon.visible = false;
    grandArenaIcon.interactive = true;
    grandArenaIcon.buttonMode = true;
    grandArenaIcon.position.x = 1644;
    grandArenaIcon.position.y = 676;
    grandArenaIcon.visible = false;

    trialsIcon.interactive = true;
    trialsIcon.buttonMode = true;
    trialsIcon.position.x = 1772;
    trialsIcon.position.y = 804;
    trialsIcon.visible = false;
    heroTrialIcon.interactive = true;
    heroTrialIcon.buttonMode = true;
    heroTrialIcon.position.x = 1516;
    heroTrialIcon.position.y = 804;
    heroTrialIcon.visible = false;
    portalIcon.interactive = true;
    portalIcon.buttonMode = true;
    portalIcon.position.x = 1644;
    portalIcon.position.y = 804;
    portalIcon.visible = false;

    tasksIcon.interactive = true;
    tasksIcon.buttonMode = true;
    tasksIcon.position.x = 1772;
    tasksIcon.position.y = 932;
    tasksIcon.visible = false;
    dailiesIcon.interactive = true;
    dailiesIcon.buttonMode = true;
    dailiesIcon.position.x = 1516;
    dailiesIcon.position.y = 932;
    dailiesIcon.visible = false;
    questsIcon.interactive = true;
    questsIcon.buttonMode = true;
    questsIcon.position.x = 1644;
    questsIcon.position.y = 932;
    questsIcon.visible = false;

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

    menuStage.visible = false;
    menuStage.addChild(booksIcon);

    stage.addChild(background);
    stage.addChild(avatarIcon);
    stage.addChild(avatarLevelIcon);
    stage.addChild(avatarBar);
    stage.addChild(guildIcon);
    stage.addChild(rankingIcon);
    stage.addChild(staminaBar);
    stage.addChild(plusStaminaIcon);
    stage.addChild(goldBar);
    stage.addChild(plusGoldIcon);
    stage.addChild(diamondBar);
    stage.addChild(plusDiamondIcon);
    stage.addChild(fullscreenBtn);
    stage.addChild(campaignIcon);
    stage.addChild(menuIcon);
    //stage.addChild(booksIcon);
    stage.addChild(bronzeBookIcon);
    stage.addChild(silverBookIcon);
    stage.addChild(goldBookIcon);
    stage.addChild(marketsIcon);
    stage.addChild(shopIcon);
    stage.addChild(mysteryShopIcon);
    stage.addChild(heroesIcon);
    stage.addChild(bagIcon);
    stage.addChild(battleIcon);
    stage.addChild(arenaIcon);
    stage.addChild(grandArenaIcon);
    stage.addChild(trialsIcon);
    stage.addChild(heroTrialIcon);
    stage.addChild(portalIcon);
    stage.addChild(tasksIcon);
    stage.addChild(dailiesIcon);
    stage.addChild(questsIcon);

    stage.addChild(menuStage);

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

  fullscreenBtn.click = fullscreenBtn.tap = () => {
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

  // fullscreenBtn.mouseover = (mouseData) => {
  //   fullscreenBtn.defaultCursor = "pointer";
  //   //console.log("fullscreen");
  // }

  menuIcon.click = menuIcon.tap = () => {

  }

}

//All the code that should run at the end of the game goes here
function end() {

}

/* #GAME SCRIPTS END# */
