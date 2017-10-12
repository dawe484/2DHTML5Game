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
      LATENCY = 500,
      png = '.png',
      jpg = '.jpg',
      loadingScreenPath = '/images/game/loading_screen'+jpg,
      mainscreenPath = '/images/game/mainscreen/',
      backgroundEmptyPath = mainscreenPath+'background_empty'+jpg,
      backgroundDarkerPath = mainscreenPath+'background_darker'+png,
      btnPurple248x80Path = '/images/game/buttons/btn_purple_248x80'+png,
      apprenticePath = '/images/game/tutorial/apprentice'+png,
      playerPath = '/images/game/tutorial/player'+png,
      masterPath = '/images/game/tutorial/master'+png,
      bubblePath = '/images/game/tutorial/bubble'+png,
      arrowDown120x48Path = '/images/game/tutorial/arrow-down_120x48'+png,
      scrollBtn192x72Path = mainscreenPath+'scroll_btn_192x72'+png,
      scroll192x1068Path = mainscreenPath+'scroll_192x1068'+png,
      scrollBtn192x48Path = mainscreenPath+'scroll_btn_192x48'+png,
      scrollArrow72x36Path = mainscreenPath+'scroll_arrow_72x36'+png,
      btn144x144Path = '/images/game/buttons/btn_144x144'+png,
      btn144x72Path = '/images/game/buttons/btn_144x72'+png,
      btn96x144Path = '/images/game/buttons/btn_96x144'+png,
      avatarBorderPath = mainscreenPath+'avatar_border'+png,
      avatarImagePath = mainscreenPath+'avatar_image'+png,
      avatarLevelBluePath = mainscreenPath+'avatar_level_blue'+png,
      avatarLevelGreenPath = mainscreenPath+'avatar_level_green'+png,
      avatarFieldPath = mainscreenPath+'avatar_field'+png,
      barBackgroundPath = mainscreenPath+'bar_background'+png,
      plusIconPath = '/images/game/icons/plus_icon'+png,
      goldIconPath = '/images/game/icons/gold_icon'+png,
      scroll1068x192Path = mainscreenPath+'scroll_1068x192'+png,
      scroll400x192Path = mainscreenPath+'scroll_400x192'+png,
      handIconPath = '/images/game/icons/hand_icon'+png,
      backIconPath = '/images/game/icons/back_icon'+png,
      backgroundBookPath = '/images/game/background_book'+png,
      banner620x98Path = '/images/game/icons/banner_620x98'+png,
      summonBooksBackgroundPath = '/images/game/summonbooks/summon_books_background'+png,
      lblGoldPath = '/images/game/summonbooks/lbl_gold'+png,
      bookOfMagicPath = '/images/game/summonbooks/book_of_magic'+png,
      grandBookOfMagicPath = '/images/game/summonbooks/grand_book_of_magic'+png,
      summoningBookPath = '/images/game/summonbooks/summoning_book'+png,
      lbl248x80Path = '/images/game/buttons/lbl_248x80'+png,
      summonLeryssaHeroPath = '/images/game/summonbooks/summon_heroes/leryssa_summon'+png,
      summonLeonaHeroPath = '/images/game/summonbooks/summon_heroes/leona_summon'+png
      ;

// Global variables
let renderer, stage, stats,
    // btnPurple248x80,
    storyTutorialContainer, tutorialContainer, mainScreenContainer,
    mainScreenIconsContainer, avatarContainer,
    scrollContainer, battleContainer, marketsContainer,
    barContainer, summonBooksContainer, summonContainer;

let freeCounter;

// Define Textstyle variables
let textStyleBtn80_48_black, textStyleBubble_72_white, textStyle144_56_black,
  textStyleLevel_60_white, textStyleAvatar_44, textStyle10pOff;

// Story Tutorial variables (stc = storyTutorialContainer)
let
  // backgroundEmpty_stc,
  // apprentice_stc, player_stc, bubble_stc,
  // textBubble_stc,
  master_stc, arrowDown120x48_stc;

// Tutorial variables (tc = tutorialContainer)
let
  // backgroundDarker_tc,
  handIcon_tc, bubble_tc, textBubble_tc;

// Mainscreen variables (mc = mainScreenContainer)
let backgroundEmpty_mc,
// Scroll in mainScreenContainer
  scrollBtn192x72_mc, scrollArrow72x36_mc,
  // Avatar in avatarContainer (ac = avatarContainer)
  // avatarBorder_ac, avatarImage_ac,
  avatarLevel_ac, textAvatarLevel_ac,
  // avatarNameField_ac,
  textAvatarNameField_ac, avatarExpField_ac, textAvatarExpField_ac,
  // Button in mainScreenIconsContainer (mac = mainScreenIconsContainer)
  // map_mac, textMap_mac, guild_mac, textGuild_mac, ranking_mac, textRanking_mac,
  // friends_mac, textFriends_mac, crusade_mac, textCrusade_mac, mail_mac, textMail_mac,
  // town_mac, textTown_mac,
  summonBooks_mac, textSummonBooks_mac,
  // Bars in barContainer (bc = barContainer)
  barBackgroundEnergy_bc, textBarEnergy_bc,
  barBackgroundGold_bc, textBarGold_bc,
  barBackgroundDiamond_bc, textBarDiamond_bc,
  // plusBarEnergy_bc,
  // plusGold_bc, goldIcon_bc,
  // plusDiamond_bc;
  // Scroll (in Mainscreen) variables in scrollContainer (sc = scrollContainer)
// let
  // scroll192x1068_sc, scrollBtn192x48_sc, heroes_sc, textHeroes_sc,
  // inventory_sc, textInventory_sc, tasks_sc, textTasks_sc,
  // trials_sc, textTrials_sc, battle_sc, textBattle_sc, markets_sc, textMarkets_sc;

// Summoning Books variables (sbc = summonBooksContainer)
  // backgroundEmpty_sbc, backgroundDarker_sbc,
  backIcon_sbc, //backgroundBook_sbc,
  // bannerBoM_sbc,
  textBannerBoM_sbc, //backgroundBoM_sbc, boM_sbc,
  btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc,
  textLblGoldAboveBtnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc,
  //lblGoldAboveBtnSummonx10BoM_sbc,
  textLblGoldAboveBtnSummonx10BoM_sbc,
  //btnSummonx10BoM_sbc,
  textBtnSummonx10BoM_sbc, //textAboveBtnSummonx10BoM_sbc,
  // bannerGBoM_sbc,
  textBannerGBoM_sbc, //backgroundGBoM_sbc, gBoM_sbc,
  // btnSummonx1GBoM_sbc,
  textBtnSummonx1GBoM_sbc,
  btnSummonx1GBoM_sbc,
  textLblGoldAboveBtnSummonx1GBoM_sbc,
  textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
  // btnSummonx10GBoM_sbc,
  textBtnSummonx10GBoM_sbc,
  textLblGoldAboveBtnSummonx10GBoM_sbc,
// Summon x1 (10) variables (suc = summonContainer)
  // backgroundEmpty_suc, backgroundDarker_suc,
  backIcon_suc, summoningItem_suc,
  // summoningBook_suc,
  banner_suc, textBanner_suc,
  lblLeft_suc, textLblLeft_suc, btn10More_suc, textBtn10More_suc,
  lblRight_suc, textLblRight_suc, btn1More_suc, textBtn1More_suc
  ;


// Heroes variables

// Inventory variables

// Tasks variables

// Trials variables

// Battle variables (bac = battleContainer)
let battleBackground_bac,
  arena_bac, textArena_bac, gArena_bac, textGArena_bac;

// Markets variables (mrc = marketsContainer)
let marketsBackground_mrc,
  arenaShop_mrc, textArenaShop_mrc, gArenaShop_mrc, textGArenaShop_mrc,
  guildShop_mrc, textGuildShop_mrc, crusadeShop_mrc, textCrusadeShop_mrc,
  fantasyShop_mrc, textFantasyShop_mrc, shop_mrc, textShop_mrc;

// Set the game's current state to 'play'
let state = playing;

// Define socket for communication to server
let socket;

// Init function
function init() {
  let rendererOptions = {
    antialias: true,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true
  };

  // Create a PIXI stage and renderer
  renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);
  renderer.backgroundColor = 0x202020;

  stage = new Container();

  if (renderer instanceof PIXI.CanvasRenderer) {
    console.log("Render: Canvas");
    console.log("Device pixel ratio:", window.devicePixelRatio);
  } else {
    console.log("Render: WebGL");
    console.log("Device pixel ratio:", window.devicePixelRatio);
  }

  // Add the canvas to the HTML document
  document.body.appendChild(renderer.view);

  if (window.innerWidth < GAME_WIDTH || window.innerHeight < GAME_HEIGHT) resize();

  // Listen for and adapt to changes to the screen size user changing the window or rotating their device
  window.addEventListener("resize", resize);

  //// ON THE TOP OF OUR SCENE WE PUT A FPS COUNTER FROM MR.DOOB - stats.js ////
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

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
          loadingScreenPath,
          backgroundEmptyPath, backgroundDarkerPath, btnPurple248x80Path,
          apprenticePath, playerPath, masterPath, bubblePath, arrowDown120x48Path,
          scrollBtn192x72Path, scroll192x1068Path, scrollBtn192x48Path,
          scrollArrow72x36Path, scroll1068x192Path, scroll400x192Path,
          btn144x144Path, btn144x72Path, btn96x144Path,
          avatarBorderPath, avatarImagePath, avatarLevelBluePath, avatarLevelGreenPath,
          avatarFieldPath,
          barBackgroundPath, plusIconPath, goldIconPath, handIconPath,
          backIconPath, backgroundBookPath, banner620x98Path, summonBooksBackgroundPath,
          lblGoldPath, bookOfMagicPath, grandBookOfMagicPath, summoningBookPath,
          lbl248x80Path, summonLeryssaHeroPath, summonLeonaHeroPath
        ])
        .on("progress", loadProgressHandler)
        .load(setup);
  }

  function loadProgressHandler(loader, resource) {
    // Display the file 'url' currently being loaded
    // console.log(`loading: ${resource.url}`);
    // console.log(`Error: ${resource.error}`);

    // Display the precentage of files currently loaded
    if (loader.progress == 100) console.log(`progress: ${loader.progress} %`);
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
    // socket = io.connect('http://localhost:2000');
    socket = io();

    // socket.on('mouse', newMsg);

    // socket.on('serverMsg', (data) => {
    //   console.log(data.message);
    // });

    console.log("All files loaded");

    freeCounter = 5;

    // TextStyle for button with 80px height
    textStyleBtn80_48_black = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 48,
      // align: 'center',
      fill: '#000'
    });

    textStyleBubble_72_white = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 72,
      aligh: 'left',
      fill: '#fff'
    });

    textStyle144_56_black = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 56,
      align: 'center',
      fill: '#000'
    });

    textStyleLevel_60_white = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 60,
      align: 'center',
      fill: '#fff'
    });

    textStyleAvatar_44 = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 44,
      align: 'center',
      fill: '#2b1100'
    });

    textStyle10pOff = new TextStyle({
      fontFamily: 'MoolBoran',
      fontSize: 32,
      align: 'right',
      fill: '#ff0000'
    });

    // setLoadingContainer();

  // ----- MAIN SCREEN (stage)-----
    // Avatar in avatarContainer ('avatarBorder', ...)
    // Bars in barContainer which is in mainScreenContainer ('stamina', 'gold', 'diamond')
    // Buttons in mainScreenContainer ('Map', 'Guild', 'Ranking', ...)
    // Scroll menu in mainScreenContainer
    // ----- SUMMON BOOKS (sbc = summonBooksContainer) -----
    // ----- SUMMON x1 (10) SCREEN (suc = summonContainer) -----

    // ----- STORY TUTORIAL SCREEN -----
    // socket.on('storyTutorialData', (data) => {
      // console.log(data.message);
    setStoryTutorialContainer();
    // });

    // ----- MAIN SCREEN -----
    setAvatarContainer(); // Add Avatar into the Main Screen (mainScreenContainer)
    setBarContainer(); // Add Bars into the Main Screen
    setMainScreenIconsContainer(); // Add Icons into the Main Screen
    setScrollContainer(); // Add Scroll into the Main Screen
    setMainScreenContainer();

    // ----- TUTORIAL SCREEN -----
    setTutorialContainer();

    // ----- SUMMONBOOKS SCREEN -----
    setSummonBooksContainer();

    // ----- SUMMON SCREEN -----
    setSummonContainer();

    // -----  -----

    // Server send data about game status (player level, heroes info, ...) if avatar.tutorial = 'no'
    // mainScreenContainer.addChild(backgroundEmpty_stc,
    //   mainScreenIconsContainer, avatarContainer, barContainer,
    //   scrollContainer, scrollBtn192x72_mc, scrollArrow72x36_mc,
    //   backgroundDarker_mc, summonBooks_mac, textSummonBooks_mac, handIcon_mc,
    //   bubble_mc);
    //
    // stage.addChild(mainScreenContainer);

    gameLoop();
  }
}

// function onClickScrollArrow() {
//   scrollArrow72x36_mc.scale.y *= -1;
//   if (scrollArrow72x36_mc.scale.y == -1) {
//     scrollContainer.visible = false;
//     if (battleContainer.visible) {
//       battleContainer.visible = false;
//       battleBackground_bac.visible = false;
//     }
//   } else {
//     scrollContainer.visible = true;
//   }
// }

// function onClick() {
//   console.log('Sending data to server: ', message._text);
//   let data = message._text;
//   socket.emit('mouse', data);
// }
// function newMsg(data) {
//   message.text = data;
// }

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
// Logic in 'gameScene'
function playing() {

  goUpAndDown(arrowDown120x48_stc, 952, 1);

  // handClicking();

}

//All the code that should run at the end of the game goes here
function end() {

}

init();

// HELPER FUNCTIONS
let times = 1000;

function handClicking() {
  times += 1000;
  setTimeout(function Wa() {
    mainScreenContainer.getChildAt(10).visible = false;
  }, times)
  times += 1000;
  setTimeout(function Wa() {
    mainScreenContainer.getChildAt(10).visible = true;
  }, times)
}

// Arrow animation in storyTutorialContainer bubble
function goUpAndDown(item, pos, speed) {
  // item.vy = speed;
  item.y -= item.vy;
  // console.log(item.y, item.vy);
  if (item.y === pos-12) {
    item.vy = -speed;
  }
  if (item.y === pos) {
    item.vy = speed;
  }
}

// Countdown Timers (in summonBooksContainer) - 5 minutes, 46 hours
function countdownTimer(countdownSocketOn, countdownSocketEmit, value, textLblGold, textAboveLbl, btn) {
  textLblGold.text = value;
  textLblGold.x = btn.x+btn.width/2-textLblGold.width/2;
  textLblRight_suc.text = value;
  textLblRight_suc.x = lblRight_suc.x+lblRight_suc.width/2-textLblRight_suc.width/2;
  socket.on(countdownSocketOn, (data) => {
    textAboveLbl.x = btn.x+btn.width/2-textAboveLbl.width/2;
    if (data.countdown === 0) {
      if (countdownSocketOn === 'timer5minutesStarted') {
        textLblGold.text = 'Free';
        textLblGold.x = btn.x+btn.width/2-textLblGold.width/2;
        textLblRight_suc.text = 'Free';
        textLblRight_suc.x = lblRight_suc.x+lblRight_suc.width/2-textLblRight_suc.width/2;
        freeCounter--;
        textAboveLbl.text = 'Free Times '+freeCounter+'/5';
        textAboveLbl.x = btn.x+btn.width/2-textAboveLbl.width/2;
      }
      if (countdownSocketOn === 'timer46hoursStarted') {
        textLblGold.text = 'Free';
        textLblGold.x = btn.x+btn.width/2-textLblGold.width/2;
        textLblRight_suc.text = 'Free';
        textLblRight_suc.x = lblRight_suc.x+lblRight_suc.width/2-textLblRight_suc.width/2;
        textAboveLbl.text = 'Free Time';
        textAboveLbl.x = btn.x+btn.width/2-textAboveLbl.width/2;
      }
      console.log('Countdown '+countdownSocketOn+' Finished!');
      socket.emit(countdownSocketEmit);
    } else {
      let hours = ~~(data.countdown/3600);
      if (hours < 10) {
        hours = '0'+hours;
      }
      let minutes = ~~(data.countdown/60);
      if (minutes < 10) {
        minutes = '0'+minutes;
      }
      let seconds = data.countdown%60;
      if (seconds < 10) {
        seconds = '0'+seconds;
      }
      // console.log(hours+':'+minutes+':'+seconds);
      textAboveLbl.text = 'Free after '+hours+':'+minutes+':'+seconds;
    }
  });
}

// Set child element position to middle (x and y) of parent element
function setMiddlePos(parent, child) {
  let x = parent.x+parent.width/2-child.width/2;
  let y = parent.y+parent.height/2-child.height/2;
  return {x, y};
}

function setLoadingContainer() {
  let loadingContainer = new Container();

  let loadingScreen = new Sprite(resources[loadingScreenPath].texture);
  loadingScreen.position.set(0, 0);

  loadingContainer.addChild(loadingScreen);

  stage.addChild(loadingContainer);
}

// Setup storyTutorialContainer
function setStoryTutorialContainer() {
  storyTutorialContainer = new Container();

  let backgroundEmpty_stc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_stc.position.set(0, 0);

  let btnSkip_stc = new Sprite(resources[btnPurple248x80Path].texture);
  btnSkip_stc.position.set(1600, 72);

  let textBtnSkip_stc = new Text('Skip', textStyleBtn80_48_black);
  textBtnSkip_stc.position.set(
    setMiddlePos(btnSkip_stc, textBtnSkip_stc).x,
    setMiddlePos(btnSkip_stc, textBtnSkip_stc).y+2
  );

  let apprentice_stc = new Sprite(resources[apprenticePath].texture);
  apprentice_stc.position.set(120, 494);

  let player_stc = new Sprite(resources[playerPath].texture);
  player_stc.position.set(120, 494);
  player_stc.visible = false;

  master_stc = new Sprite(resources[masterPath].texture);
  master_stc.position.set(1400, 494);
  master_stc.visible = false;

  let bubble_stc = new Sprite(resources[bubblePath].texture);
  bubble_stc.position.set(60, 744);
  bubble_stc.interactive = true;
  bubble_stc.buttonMode = true;

  let textBubble_stc = new Text("Text", textStyleBubble_72_white);
  textBubble_stc.position.set(
    176,
    setMiddlePos(bubble_stc, textBubble_stc).y
  );

  arrowDown120x48_stc = new Sprite(resources[arrowDown120x48Path].texture);
  arrowDown120x48_stc.position.set(1690, 952);
  arrowDown120x48_stc.vx = 0;
  arrowDown120x48_stc.vy = 0;

  // goUpAndDown(arrowDown120x48_stc, 952, 1);

  storyTutorialContainer.addChild(
    backgroundEmpty_stc, btnSkip_stc, textBtnSkip_stc, apprentice_stc, player_stc,
    master_stc, bubble_stc, textBubble_stc, arrowDown120x48_stc);

  // stage.addChild(storyTutorialContainer);

  // Server send data with tutorial information if avatar.tutorial = 'yes'
  socket.on('storyTutorialData', (data) => {
    setTimeout(() => {
      stage.addChild(storyTutorialContainer);
      // console.log(stage.children);
    }, LATENCY*2);

    console.log(data.message);

    btnSkip_stc.interactive = true;
    btnSkip_stc.buttonMode = true;
    btnSkip_stc.on('pointerup', () => {
      socket.emit('btnSkipMsg', 'skip');
    });

    textBubble_stc.text = data.message[0].text;

    let i = 1;
    // let j = 0; // for 2-times click on bubble with story text
    bubble_stc.on('pointerup', () => {
      if (i == data.message.length) {
        console.log('end');
        socket.emit('btnSkipMsg', 'skip');
      }
      if (i < data.message.length) {
        // if (j == 0) {
          textBubble_stc.text = data.message[i].text;
          textBubble_stc.position.set(
            176,
            setMiddlePos(bubble_stc, textBubble_stc).y
          );
          if (data.message[i].speaker == 'A') {
            apprentice_stc.visible = true;
            master_stc.visible = false;
          } else if (data.message[i].speaker == 'M') {
            master_stc.visible = true;
            apprentice_stc.visible = false;
            player_stc.visible = false;
          } else if (data.message[i].speaker == 'P') {
            player_stc.visible = true;
            master_stc.visible = false;
          } else {
            apprentice_stc.visible = false;
          }
          // j = 1;
        // } else if (j == 1) {
        //   j = 0;
          i++;
          console.log('i', i);
        // }
      }
    });
  });
}

// Setup mainScreenContainer
function setMainScreenContainer() {
  mainScreenContainer = new Container();

  let backgroundEmpty_mc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_mc.position.set(0, 0);

  socket.on('avatarData', (data) => {
    console.log(data);

    textAvatarLevel_ac.text = data.playerLvl;
    textAvatarLevel_ac.position.set(
      setMiddlePos(avatarLevel_ac, textAvatarLevel_ac).x-2,
      setMiddlePos(avatarLevel_ac, textAvatarLevel_ac).y-8
    );

    textAvatarExpField_ac.text = data.currentExp+'/'+data.nextLvlExp;
    textAvatarExpField_ac.position.set(
      setMiddlePos(avatarExpField_ac, textAvatarExpField_ac).x,
      setMiddlePos(avatarExpField_ac, textAvatarExpField_ac).y-4
    );

    textBarEnergy_bc.text = data.currentEnergy+'/'+data.maxEnergy;
    textBarEnergy_bc.position.set(
      setMiddlePos(barBackgroundEnergy_bc, textBarEnergy_bc).x,
      setMiddlePos(barBackgroundEnergy_bc, textBarEnergy_bc).y
    );

    textBarGold_bc.text = data.gold;
    textBarGold_bc.position.set(
      setMiddlePos(barBackgroundGold_bc, textBarGold_bc).x,
      setMiddlePos(barBackgroundGold_bc, textBarGold_bc).y
    );

    textBarDiamond_bc.text = data.diamond;
    textBarDiamond_bc.position.set(
      setMiddlePos(barBackgroundDiamond_bc, textBarDiamond_bc).x,
      setMiddlePos(barBackgroundDiamond_bc, textBarDiamond_bc).y
    );

  });

  mainScreenContainer.addChild(backgroundEmpty_mc, avatarContainer, barContainer,
    mainScreenIconsContainer, scrollContainer, scrollBtn192x72_mc, scrollArrow72x36_mc);

    socket.on('tutorialData', (data) => {
      setTimeout(() => {
        console.log(data.message);

        if (stage.children[0]) {
          storyTutorialContainer.removeChild(master_stc, arrowDown120x48_stc);
          stage.removeChild(storyTutorialContainer);
        }

        mainScreenIconsContainer.removeChild(summonBooks_mac, textSummonBooks_mac);

        summonBooks_mac.interactive = true;
        summonBooks_mac.buttonMode = true;

        textBubble_tc.text = data.message[0].text;
        master_stc.visible = true;

        tutorialContainer.addChild(
          master_stc, bubble_tc, textBubble_tc,
          summonBooks_mac, textSummonBooks_mac, handIcon_tc
        );
        stage.addChild(mainScreenContainer, tutorialContainer);

        summonBooks_mac.on('pointerup', () => {
          setTimeout(() => {
            textBubble_tc.text = data.message[1].text;
            summonBooks_mac.interactive = false;
            summonBooks_mac.buttonMode = false;

            bubble_tc.interactive = true;
            bubble_tc.buttonMode = true;
            let i = 1;
            bubble_tc.on('pointerup', () => {
              if (i === 2) {
                setTimeout(() => {
                  console.log('end');
                  summonBooksContainer.removeChild(
                    master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
                  );

                  btnSummonx1BoM_sbc.interactive = true;
                  btnSummonx1BoM_sbc.buttonMode = true;

                  handIcon_tc.position.set(
                    btnSummonx1BoM_sbc.x+btnSummonx1BoM_sbc.width/4*3,
                    btnSummonx1BoM_sbc.y+btnSummonx1BoM_sbc.height/2
                  );

                  summonBooksContainer.addChild(handIcon_tc);

                  btnSummonx1BoM_sbc.on('pointerup', () => {
                    setTimeout(() => {
                      socket.emit('btnSummonx1BoMMsg', 'summonx1BoM');

                      btnSummonx1BoM_sbc.interactive = false;
                      btnSummonx1BoM_sbc.buttonMode = false;

                      handIcon_tc.position.set(
                        backIcon_suc.x+backIcon_suc.width/4*3,
                        backIcon_suc.y+backIcon_suc.height/4*3
                      );

                      textBanner_suc.text = textBannerBoM_sbc.text;
                      textBanner_suc.x = setMiddlePos(banner_suc, textBanner_suc).x;

                      textLblLeft_suc.text = textLblGoldAboveBtnSummonx10BoM_sbc.text;
                      textLblLeft_suc.x = setMiddlePos(lblLeft_suc, textLblLeft_suc).x;

                      textBtn10More_suc.text = textBtnSummonx10BoM_sbc.text;
                      textBtn10More_suc.x = setMiddlePos(btn10More_suc, textBtn10More_suc).x;

                      textLblRight_suc.text = textLblGoldAboveBtnSummonx1BoM_sbc.text;
                      textLblRight_suc.x = setMiddlePos(lblRight_suc, textLblRight_suc).x;

                      textBtn1More_suc.text = textBtnSummonx1BoM_sbc.text;
                      textBtn1More_suc.x = setMiddlePos(btn1More_suc, textBtn1More_suc).x;

                      countdownTimer(
                        'timer5minutesStarted', 'timer5minutesEnded', '10000',
                        textLblGoldAboveBtnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc,
                        btnSummonx1BoM_sbc
                      );

                      socket.on('summonLeryssa', (data) => {
                        console.log('send leryssa from server', data.message[0].heroes[0].urlName);

                        if (data.message[0].heroes[0].urlName === 'leryssa') {
                          setTimeout(() => {
                            backIcon_suc.interactive = true;
                            backIcon_suc.buttonMode = true;
                            summonContainer.addChild(summoningItem_suc, handIcon_tc);
                            // console.log('1 sec');
                          }, LATENCY*2);
                        }
                      });

                      backIcon_suc.on('pointerup', () => {
                        backIcon_suc.interactive = false;
                        backIcon_suc.buttonMode = false;
                        setTimeout(() => {
                          i++;
                          console.log('i', i);
                          summonContainer.removeChild(summoningItem_suc);
                          stage.removeChild(summonContainer);

                          if (i === 3) {
                            textBubble_tc.text = data.message[i].text;
                            bubble_tc.interactive = true;
                            bubble_tc.buttonMode = true;

                            bubble_tc.on('pointerup', () => {
                              // console.log('i', i);
                              if (i === 4) {
                                setTimeout(() => {
                                  summonBooksContainer.removeChild(
                                    master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
                                  );

                                  handIcon_tc.position.set(
                                    btnSummonx1GBoM_sbc.x+btnSummonx1GBoM_sbc.width/4*3,
                                    btnSummonx1GBoM_sbc.y+btnSummonx1GBoM_sbc.height/2
                                  );

                                  btnSummonx1GBoM_sbc.interactive = true;
                                  btnSummonx1GBoM_sbc.buttonMode = true;

                                  summonBooksContainer.addChild(handIcon_tc);

                                  btnSummonx1GBoM_sbc.on('pointerup', () => {
                                    setTimeout(() => {
                                      socket.emit('btnSummonx1GBoMMsg', 'summonx1GBoM');

                                      btnSummonx1GBoM_sbc.interactive = false;
                                      btnSummonx1GBoM_sbc.buttonMode = false;

                                      handIcon_tc.position.set(
                                        backIcon_suc.x+backIcon_suc.width/4*3,
                                        backIcon_suc.y+backIcon_suc.height/4*3
                                      );

                                      textBanner_suc.text = textBannerGBoM_sbc.text;
                                      textBanner_suc.x = setMiddlePos(banner_suc, textBanner_suc).x;

                                      textLblLeft_suc.text = textLblGoldAboveBtnSummonx10GBoM_sbc.text;
                                      textLblLeft_suc.x = setMiddlePos(lblLeft_suc, textLblLeft_suc).x;

                                      textBtn10More_suc.text = textBtnSummonx10GBoM_sbc.text;
                                      textBtn10More_suc.x = setMiddlePos(btn10More_suc, textBtn10More_suc).x;

                                      textLblRight_suc.text = textLblGoldAboveBtnSummonx1GBoM_sbc.text;
                                      textLblRight_suc.x = setMiddlePos(lblRight_suc, textLblRight_suc).x;

                                      textBtn1More_suc.text = textBtnSummonx1GBoM_sbc.text;
                                      textBtn1More_suc.x = setMiddlePos(btn1More_suc, textBtn1More_suc).x;

                                      countdownTimer(
                                        'timer46hoursStarted', 'timer46hoursEnded', '288',
                                        textLblGoldAboveBtnSummonx1GBoM_sbc, textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
                                        btnSummonx1GBoM_sbc
                                      );

                                      socket.on('summonLeona', (data) => {
                                        console.log('send leona from server', data.message[0].heroes[0].urlName);

                                        if (data.message[0].heroes[0].urlName === 'leona') {
                                          summoningItem_suc = new Sprite(resources[summonLeonaHeroPath].texture);
                                          summoningItem_suc.position.set(
                                            GAME_WIDTH/2-summoningItem_suc.width/2,
                                            GAME_HEIGHT/2-summoningItem_suc.height/2-48
                                          );
                                          setTimeout(() => {
                                            backIcon_suc.interactive = true;
                                            backIcon_suc.buttonMode = true;
                                            summonContainer.addChild(summoningItem_suc, handIcon_tc);
                                            // console.log('1 sec');
                                          }, LATENCY*2);
                                        }
                                      });
                                      stage.addChild(summonContainer);
                                    }, LATENCY);
                                  });
                                }, LATENCY);
                              }
                              if (i === 3) {
                                textBubble_tc.text = data.message[2].text;
                                i++;
                                console.log('i', i);
                              }
                            });
                            summonBooksContainer.addChild(
                              master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
                            );
                          }
                          if (i === 5) {
                            summonContainer.removeChild(handIcon_tc);
                            setTimeout(() => {
                              handIcon_tc.position.set(
                                backIcon_sbc.x+backIcon_sbc.width/4*3,
                                backIcon_sbc.y+backIcon_sbc.height/4*3
                              );

                              backIcon_sbc.interactive = true;
                              backIcon_sbc.buttonMode = true;

                              backIcon_sbc.on('pointerup', () => {
                                backIcon_sbc.interactive = false;
                                backIcon_sbc.buttonMode = false;
                                setTimeout(() => {
                                  console.log('happy');

                                }, LATENCY);
                              });
                              summonBooksContainer.addChild(handIcon_tc);
                            }, LATENCY);
                          }
                        }, LATENCY);
                      });
                      stage.addChild(summonContainer);
                    }, LATENCY);
                  });
                }, LATENCY);
              }
              if (i === 1) {
                textBubble_tc.text = data.message[2].text;
                i++;
                console.log(i);
              }
            });
            summonBooksContainer.addChild(
              barContainer, master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
            );
            stage.addChild(summonBooksContainer);
          }, LATENCY);
        });
      }, LATENCY);
    });
}

// Setup avatarContainer
function setAvatarContainer() {
  avatarContainer = new Container();

  let avatarBorder_ac = new Sprite(resources[avatarBorderPath].texture);
  avatarBorder_ac.position.set(36, 36);

  let avatarImage_ac = new Sprite(resources[avatarImagePath].texture);
  avatarImage_ac.position.set(60, 60);

  avatarLevel_ac = new Sprite(resources[avatarLevelBluePath].texture);
  avatarLevel_ac.position.set(74, 169);

  textAvatarLevel_ac = new Text('0', textStyleLevel_60_white);
  textAvatarLevel_ac.position.set(
    setMiddlePos(avatarLevel_ac, textAvatarLevel_ac).x-2,
    setMiddlePos(avatarLevel_ac, textAvatarLevel_ac).y-8
  );

  let avatarNameField_ac = new Sprite(resources[avatarFieldPath].texture);
  avatarNameField_ac.position.set(216, 100);

  textAvatarNameField_ac = new Text('Unknown', textStyleAvatar_44);
  textAvatarNameField_ac.position.set(
    setMiddlePos(avatarNameField_ac, textAvatarNameField_ac).x,
    setMiddlePos(avatarNameField_ac, textAvatarNameField_ac).y-4
  );

  avatarExpField_ac = new Sprite(resources[avatarFieldPath].texture);
  avatarExpField_ac.scale.set(0.85);
  avatarExpField_ac.position.set(216, 140);

  textAvatarExpField_ac = new Text('0/0', textStyleAvatar_44);
  textAvatarExpField_ac.position.set(
    setMiddlePos(avatarExpField_ac, textAvatarExpField_ac).x,
    setMiddlePos(avatarExpField_ac, textAvatarExpField_ac).y-4
  );

  avatarContainer.addChild(avatarImage_ac, avatarBorder_ac, avatarLevel_ac,
    textAvatarLevel_ac, avatarNameField_ac, textAvatarNameField_ac,
    avatarExpField_ac, textAvatarExpField_ac);

}

// Setup barContainer
function setBarContainer() {
  barContainer = new Container();

  barBackgroundEnergy_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundEnergy_bc.position.set(472, 36);

  textBarEnergy_bc = new Text('0/0', textStyleLevel_60_white);
  textBarEnergy_bc.position.set(
    setMiddlePos(barBackgroundEnergy_bc, textBarEnergy_bc).x,
    setMiddlePos(barBackgroundEnergy_bc, textBarEnergy_bc).y
  );

  let plusBarEnergy_bc = new Sprite(resources[plusIconPath].texture);
  plusBarEnergy_bc.position.set(728, 36);

  barBackgroundGold_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundGold_bc.position.set(804, 36);

  textBarGold_bc = new Text('0', textStyleLevel_60_white);
  textBarGold_bc.position.set(
    setMiddlePos(barBackgroundGold_bc, textBarGold_bc).x,
    setMiddlePos(barBackgroundGold_bc, textBarGold_bc).y
  );

  let plusGold_bc = new Sprite(resources[plusIconPath].texture);
  plusGold_bc.position.set(1060, 36);

  let goldIcon_bc = new Sprite(resources[goldIconPath].texture);
  goldIcon_bc.position.set(796, 30);

  barBackgroundDiamond_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundDiamond_bc.position.set(1136, 36);

  textBarDiamond_bc = new Text('0', textStyleLevel_60_white);
  textBarDiamond_bc.position.set(
    setMiddlePos(barBackgroundDiamond_bc, textBarDiamond_bc).x,
    setMiddlePos(barBackgroundDiamond_bc, textBarDiamond_bc).y
  );

  let plusDiamond_bc = new Sprite(resources[plusIconPath].texture);
  plusDiamond_bc.position.set(1392, 36);

  barContainer.addChild(barBackgroundEnergy_bc, textBarEnergy_bc, plusBarEnergy_bc,
    barBackgroundGold_bc, textBarGold_bc, plusGold_bc, goldIcon_bc,
    barBackgroundDiamond_bc, textBarDiamond_bc, plusDiamond_bc);
}

// Setup mainScreenIconsContainer
function setMainScreenIconsContainer() {
  mainScreenIconsContainer = new Container();

  let map_mac = new Sprite(resources[btn144x144Path].texture);
  map_mac.position.set(116, 428);

  let textMap_mac = new Text('Map', textStyle144_56_black);
  textMap_mac.position.set(
    setMiddlePos(map_mac, textMap_mac).x,
    setMiddlePos(map_mac, textMap_mac).y+2
  );

  let guild_mac = new Sprite(resources[btn144x144Path].texture);
  guild_mac.position.set(380, 216);

  let textGuild_mac = new Text('Guild', textStyle144_56_black);
  textGuild_mac.position.set(
    setMiddlePos(guild_mac, textGuild_mac).x,
    setMiddlePos(guild_mac, textGuild_mac).y+2
  );

  let ranking_mac = new Sprite(resources[btn144x72Path].texture);
  ranking_mac.position.set(386, 454);

  let textRanking_mac = new Text('Ranking', textStyle144_56_black);
  textRanking_mac.position.set(
    setMiddlePos(ranking_mac, textRanking_mac).x,
    setMiddlePos(ranking_mac, textRanking_mac).y+2
  );

  let friends_mac = new Sprite(resources[btn96x144Path].texture);
  friends_mac.position.set(702, 256);

  let textFriends_mac = new Text('Friends', textStyle144_56_black);
  textFriends_mac.position.set(
    setMiddlePos(friends_mac, textFriends_mac).x,
    setMiddlePos(friends_mac, textFriends_mac).y+2
  );

  let crusade_mac = new Sprite(resources[btn144x144Path].texture);
  crusade_mac.position.set(1060, 96);

  let textCrusade_mac = new Text('Crusade', textStyle144_56_black);
  textCrusade_mac.position.set(
    setMiddlePos(crusade_mac, textCrusade_mac).x,
    setMiddlePos(crusade_mac, textCrusade_mac).y+2
  );

  let mail_mac = new Sprite(resources[btn96x144Path].texture);
  mail_mac.position.set(1240, 302);

  let textMail_mac = new Text('Mail', textStyle144_56_black);
  textMail_mac.position.set(
    setMiddlePos(mail_mac, textMail_mac).x,
    setMiddlePos(mail_mac, textMail_mac).y+2
  );

  let town_mac = new Sprite(resources[btn144x144Path].texture);
  town_mac.position.set(1418, 380);

  let textTown_mac = new Text('Town', textStyle144_56_black);
  textTown_mac.position.set(
    setMiddlePos(town_mac, textTown_mac).x,
    setMiddlePos(town_mac, textTown_mac).y+2
  );

  summonBooks_mac = new Sprite(resources[btn144x144Path].texture);
  summonBooks_mac.position.set(1512, 108);

  textSummonBooks_mac = new Text('Summon\nBooks', textStyle144_56_black);
  textSummonBooks_mac.position.set(
    setMiddlePos(summonBooks_mac, textSummonBooks_mac).x,
    setMiddlePos(summonBooks_mac, textSummonBooks_mac).y+2
  );

  mainScreenIconsContainer.addChild(
    map_mac, textMap_mac, guild_mac, textGuild_mac, ranking_mac, textRanking_mac,
    friends_mac, textFriends_mac, crusade_mac, textCrusade_mac, mail_mac,
    textMail_mac, town_mac, textTown_mac, summonBooks_mac, textSummonBooks_mac
  );

}

function setScrollContainer() {
  scrollContainer = new Container();
  battleContainer = new Container();
  marketsContainer = new Container();

  scrollBtn192x72_mc = new Sprite(resources[scrollBtn192x72Path].texture);
  scrollBtn192x72_mc.position.set(1716, 12);

  scrollArrow72x36_mc = new Sprite(resources[scrollArrow72x36Path].texture);
  scrollArrow72x36_mc.anchor.set(0.5);
  scrollArrow72x36_mc.position.set(1812, 48);
  scrollArrow72x36_mc.scale.y = -1;
  // scrollArrow72x36_mc.interactive = true;
  // scrollArrow72x36_mc.buttonMode = true;
  // scrollArrow72x36_mc.on('pointerup', onClickScrollArrow => {
  //   scrollArrow72x36_mc.scale.y *= -1;
  //   if (scrollArrow72x36_mc.scale.y == -1) {
  //     scrollContainer.visible = false;
  //     if (battleContainer.visible) {
  //       battleContainer.visible = false;
  //       battleBackground_bac.visible = false;
  //     }
  //     if (marketsContainer.visible) {
  //       marketsContainer.visible = false;
  //       marketsBackground_mrc.visible = false;
  //     }
  //   } else {
  //     scrollContainer.visible = true;
  //   }
  // });

  // Icons in scrollContainer ('Heroes', 'Inventory', 'Tasks', ...)
  // + Scroll menu background and bottom part of scroll
  let scroll192x1068_sc = new Sprite(resources[scroll192x1068Path].texture);
  scroll192x1068_sc.position.set(1716, 12);

  let scrollBtn192x48_sc = new Sprite(resources[scrollBtn192x48Path].texture);
  scrollBtn192x48_sc.position.set(1716, 1032);

  let heroes_sc = new Sprite(resources[btn144x144Path].texture);
  heroes_sc.position.set(1740, 96);

  let textHeroes_sc = new Text('Heroes', textStyle144_56_black);
  textHeroes_sc.position.set(
    setMiddlePos(heroes_sc, textHeroes_sc).x,
    setMiddlePos(heroes_sc, textHeroes_sc).y+2
  );

  let inventory_sc = new Sprite(resources[btn144x144Path].texture);
  inventory_sc.position.set(1740, 252);

  let textInventory_sc = new Text('Inventory', textStyle144_56_black);
  textInventory_sc.position.set(
    setMiddlePos(inventory_sc, textInventory_sc).x,
    setMiddlePos(inventory_sc, textInventory_sc).y+2
  );

  let tasks_sc = new Sprite(resources[btn144x144Path].texture);
  tasks_sc.position.set(1740, 408);

  let textTasks_sc = new Text('Tasks', textStyle144_56_black);
  textTasks_sc.position.set(
    setMiddlePos(tasks_sc, textTasks_sc).x,
    setMiddlePos(tasks_sc, textTasks_sc).y+2
  );

  let trials_sc = new Sprite(resources[btn144x144Path].texture);
  trials_sc.position.set(1740, 564);

  let textTrials_sc = new Text('Trials', textStyle144_56_black);
  textTrials_sc.position.set(
    setMiddlePos(trials_sc, textTrials_sc).x,
    setMiddlePos(trials_sc, textTrials_sc).y+2
  );

  let battle_sc = new Sprite(resources[btn144x144Path].texture);
  battle_sc.position.set(1740, 720);
  battle_sc.interactive = true;
  battle_sc.buttonMode = true;
  battle_sc.on('pointerup', onClick => {
    if (battleContainer.visible) {
      battleContainer.visible = false;
      battleBackground_bac.visible = false;
    } else {
      battleContainer.visible = true;
      battleBackground_bac.visible = true;
    }
  });

  let textBattle_sc = new Text('Battle', textStyle144_56_black);
  textBattle_sc.position.set(
    setMiddlePos(battle_sc, textBattle_sc).x,
    setMiddlePos(battle_sc, textBattle_sc).y+2
  );

  let markets_sc = new Sprite(resources[btn144x144Path].texture);
  markets_sc.position.set(1740, 876);
  markets_sc.interactive = true;
  markets_sc.buttonMode = true;
  markets_sc.on('pointerup', onClick => {
    if (marketsContainer.visible) {
      marketsContainer.visible = false;
      marketsBackground_mrc.visible = false;
    } else {
      marketsContainer.visible = true;
      marketsBackground_mrc.visible = true;
    }
  });

  let textMarkets_sc = new Text('Markets', textStyle144_56_black);
  textMarkets_sc.position.set(
    setMiddlePos(markets_sc, textMarkets_sc).x,
    setMiddlePos(markets_sc, textMarkets_sc).y+2
  );

  // --- Battle Icons (battleContainer) ---
  arena_bac = new Sprite(resources[btn144x144Path].texture);
  arena_bac.position.set(1428, 720);

  textArena_bac = new Text('Arena', textStyle144_56_black);
  textArena_bac.position.set(
    setMiddlePos(arena_bac, textArena_bac).x,
    setMiddlePos(arena_bac, textArena_bac).y+2
  );

  gArena_bac = new Sprite(resources[btn144x144Path].texture);
  gArena_bac.position.set(1584, 720);

  textGArena_bac = new Text('Grand\nArena', textStyle144_56_black);
  textGArena_bac.position.set(
    setMiddlePos(gArena_bac, textGArena_bac).x,
    setMiddlePos(gArena_bac, textGArena_bac).y+2
  );

  battleBackground_bac = new Sprite(resources[scroll400x192Path].texture);
  battleBackground_bac.position.set(1404, 696);
  battleBackground_bac.visible = false;

  battleContainer.addChild(arena_bac, textArena_bac,
    gArena_bac, textGArena_bac);
  battleContainer.visible = false;

  // --- Markets Icons (marketsContainer) ---
  arenaShop_mrc = new Sprite(resources[btn144x144Path].texture);
  arenaShop_mrc.position.set(804, 876);

  textArenaShop_mrc = new Text('Arena\nShop', textStyle144_56_black);
  textArenaShop_mrc.position.set(
    setMiddlePos(arenaShop_mrc, textArenaShop_mrc).x,
    setMiddlePos(arenaShop_mrc, textArenaShop_mrc).y+2
  );

  gArenaShop_mrc = new Sprite(resources[btn144x144Path].texture);
  gArenaShop_mrc.position.set(960, 876);

  textGArenaShop_mrc = new Text('Grand\nArena\nShop', textStyle144_56_black);
  textGArenaShop_mrc.position.set(
    setMiddlePos(gArenaShop_mrc, textGArenaShop_mrc).x,
    setMiddlePos(gArenaShop_mrc, textGArenaShop_mrc).y+2
  );

  guildShop_mrc = new Sprite(resources[btn144x144Path].texture);
  guildShop_mrc.position.set(1116, 876);

  textGuildShop_mrc = new Text('Guild\nShop', textStyle144_56_black);
  textGuildShop_mrc.position.set(
    setMiddlePos(guildShop_mrc, textGuildShop_mrc).x,
    setMiddlePos(guildShop_mrc, textGuildShop_mrc).y+2
  );

  crusadeShop_mrc = new Sprite(resources[btn144x144Path].texture);
  crusadeShop_mrc.position.set(1272, 876);

  textCrusadeShop_mrc = new Text('Crusade\nShop', textStyle144_56_black);
  textCrusadeShop_mrc.position.set(
    setMiddlePos(crusadeShop_mrc, textCrusadeShop_mrc).x,
    setMiddlePos(crusadeShop_mrc, textCrusadeShop_mrc).y+2
  );

  fantasyShop_mrc = new Sprite(resources[btn144x144Path].texture);
  fantasyShop_mrc.position.set(1428, 876);

  textFantasyShop_mrc = new Text('Fantasy\nShop', textStyle144_56_black);
  textFantasyShop_mrc.position.set(
    setMiddlePos(fantasyShop_mrc, textFantasyShop_mrc).x,
    setMiddlePos(fantasyShop_mrc, textFantasyShop_mrc).y+2
  );

  shop_mrc = new Sprite(resources[btn144x144Path].texture);
  shop_mrc.position.set(1584, 876);

  textShop_mrc = new Text('Shop', textStyle144_56_black);
  textShop_mrc.position.set(
    setMiddlePos(shop_mrc, textShop_mrc).x,
    setMiddlePos(shop_mrc, textShop_mrc).y+2
  );

  marketsBackground_mrc = new Sprite(resources[scroll1068x192Path].texture);
  marketsBackground_mrc.position.set(780, 852);
  marketsBackground_mrc.visible = false;

  marketsContainer.addChild(arenaShop_mrc, textArenaShop_mrc,
    gArenaShop_mrc, textGArenaShop_mrc, guildShop_mrc, textGuildShop_mrc,
    crusadeShop_mrc, textCrusadeShop_mrc, fantasyShop_mrc, textFantasyShop_mrc,
    shop_mrc, textShop_mrc);
  marketsContainer.visible = false;

  scrollContainer.addChild(battleBackground_bac, marketsBackground_mrc,
    scroll192x1068_sc, scrollBtn192x48_sc, heroes_sc, textHeroes_sc,
    inventory_sc, textInventory_sc, tasks_sc, textTasks_sc,
    trials_sc, textTrials_sc, battle_sc, textBattle_sc, battleContainer,
    markets_sc, textMarkets_sc, marketsContainer);
  scrollContainer.visible = false;
}

// Setup tutorialContainer
function setTutorialContainer() {

  tutorialContainer = new Container();

  let backgroundDarker_tc = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker_tc.position.set(0, 0);

  handIcon_tc = new Sprite(resources[handIconPath].texture);
  handIcon_tc.position.set(
    summonBooks_mac.x+summonBooks_mac.width/4*3,
    summonBooks_mac.y+summonBooks_mac.height/4*3
  );
  handIcon_tc.scale.set(2);

  bubble_tc = new Sprite(resources[bubblePath].texture);
  bubble_tc.position.set(60, 744);

  textBubble_tc = new Text("Text", textStyleBubble_72_white);
  textBubble_tc.position.set(
    176,
    setMiddlePos(bubble_tc, textBubble_tc).y
  );

  tutorialContainer.addChild(backgroundDarker_tc);
}

function setSummonBooksContainer() {
  summonBooksContainer = new Container();

  let backgroundEmpty_sbc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_sbc.position.set(0, 0);

  let backgroundDarker_sbc = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker_sbc.position.set(0, 0);

  backIcon_sbc = new Sprite(resources[backIconPath].texture);
  backIcon_sbc.position.set(36, 36);

  let backgroundBook_sbc = new Sprite(resources[backgroundBookPath].texture);
  backgroundBook_sbc.position.set(
    GAME_WIDTH/2-backgroundBook_sbc.width/2,
    144
  );

  let bannerBoM_sbc = new Sprite(resources[banner620x98Path].texture);
  bannerBoM_sbc.position.set(304, 180);

  textBannerBoM_sbc = new Text('Book of Magic', textStyle144_56_black);
  textBannerBoM_sbc.position.set(
    setMiddlePos(bannerBoM_sbc, textBannerBoM_sbc).x,
    200
  );

  let bannerGBoM_sbc = new Sprite(resources[banner620x98Path].texture);
  bannerGBoM_sbc.position.set(986, 180);

  textBannerGBoM_sbc = new Text('Grand Book of Magic', textStyle144_56_black);
  textBannerGBoM_sbc.position.set(
    setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).x,
    200
  );

  let backgroundBoM_sbc = new Sprite(resources[summonBooksBackgroundPath].texture);
  backgroundBoM_sbc.position.set(329, 290);

  let boM_sbc = new Sprite(resources[bookOfMagicPath].texture);
  boM_sbc.position.set(
    setMiddlePos(backgroundBoM_sbc, boM_sbc).x,
    setMiddlePos(backgroundBoM_sbc, boM_sbc).y
  );

  let backgroundGBoM_sbc = new Sprite(resources[summonBooksBackgroundPath].texture);
  backgroundGBoM_sbc.position.set(1005, 290);

  let gBoM_sbc = new Sprite(resources[grandBookOfMagicPath].texture);
  gBoM_sbc.position.set(
    setMiddlePos(backgroundGBoM_sbc, gBoM_sbc).x,
    setMiddlePos(backgroundGBoM_sbc, gBoM_sbc).y
  );

  // Book of Magic Summon x1
  btnSummonx1BoM_sbc = new Sprite(resources[btnPurple248x80Path].texture);
  btnSummonx1BoM_sbc.position.set(353, 818);

  textBtnSummonx1BoM_sbc = new Text('Summon ×1', textStyleBtn80_48_black);
  textBtnSummonx1BoM_sbc.position.set(
    setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).x,
    setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).y
  );

  let lblGoldAboveBtnSummonx1BoM_sbc = new Sprite(resources[lblGoldPath].texture);
  lblGoldAboveBtnSummonx1BoM_sbc.position.set(353, 761);

  textLblGoldAboveBtnSummonx1BoM_sbc = new Text('Free', textStyleBtn80_48_black); // Free or 10000
  textLblGoldAboveBtnSummonx1BoM_sbc.position.set(
    setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).x,
    setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).y+2
  );

  textAboveLblGoldAboveBtnSummonx1BoM_sbc = new Text('Free Times '+freeCounter+'/5', textStyleBtn80_48_black);
  textAboveLblGoldAboveBtnSummonx1BoM_sbc.position.set(
    setMiddlePos(btnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc).x,
    720,
  );

  // Book of Magic Summon x10
  let btnSummonx10BoM_sbc = new Sprite(resources[btnPurple248x80Path].texture);
  btnSummonx10BoM_sbc.position.set(637, 818);

  textBtnSummonx10BoM_sbc = new Text('Summon ×10', textStyleBtn80_48_black);
  textBtnSummonx10BoM_sbc.position.set(
    setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).x,
    setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).y
  );

  let lblGoldAboveBtnSummonx10BoM_sbc = new Sprite(resources[lblGoldPath].texture);
  lblGoldAboveBtnSummonx10BoM_sbc.position.set(637, 761);

  textLblGoldAboveBtnSummonx10BoM_sbc = new Text('90000', textStyleBtn80_48_black);
  textLblGoldAboveBtnSummonx10BoM_sbc.position.set(
    setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).x,
    setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).y+2
  );

  let textLblGold10pOffBoM_sbc = new Text('10% OFF', textStyle10pOff);
  textLblGold10pOffBoM_sbc.position.set(
    lblGoldAboveBtnSummonx10BoM_sbc.x+lblGoldAboveBtnSummonx10BoM_sbc.width-textLblGold10pOffBoM_sbc.width-4,
    setMiddlePos(textLblGoldAboveBtnSummonx10BoM_sbc, textLblGold10pOffBoM_sbc).y
  );

  // Grand Book of magic Summon x1
  btnSummonx1GBoM_sbc = new Sprite(resources[btnPurple248x80Path].texture);
  btnSummonx1GBoM_sbc.position.set(1029, 818);

  textBtnSummonx1GBoM_sbc = new Text('Summon ×1', textStyleBtn80_48_black);
  textBtnSummonx1GBoM_sbc.position.set(
    setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).x,
    setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).y
  );

  let lblGoldAboveBtnSummonx1GBoM_sbc = new Sprite(resources[lblGoldPath].texture);
  lblGoldAboveBtnSummonx1GBoM_sbc.position.set(1029, 761);

  textLblGoldAboveBtnSummonx1GBoM_sbc = new Text('Free', textStyleBtn80_48_black); // Free or 288
  textLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
    setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).x,
    setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).y+2
  );

  textAboveLblGoldAboveBtnSummonx1GBoM_sbc = new Text('Free Time', textStyleBtn80_48_black);
  textAboveLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
    setMiddlePos(btnSummonx1GBoM_sbc, textAboveLblGoldAboveBtnSummonx1GBoM_sbc).x,
    720,
  );

  // Grand Book of magic Summon x10
  let btnSummonx10GBoM_sbc = new Sprite(resources[btnPurple248x80Path].texture);
  btnSummonx10GBoM_sbc.position.set(1313, 818);

  textBtnSummonx10GBoM_sbc = new Text('Summon ×10', textStyleBtn80_48_black);
  textBtnSummonx10GBoM_sbc.position.set(
    setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).x,
    setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).y
  );

  let lblGoldAboveBtnSummonx10GBoM_sbc = new Sprite(resources[lblGoldPath].texture);
  lblGoldAboveBtnSummonx10GBoM_sbc.position.set(1313, 761);

  textLblGoldAboveBtnSummonx10GBoM_sbc = new Text('2592', textStyleBtn80_48_black);
  textLblGoldAboveBtnSummonx10GBoM_sbc.position.set(
    setMiddlePos(btnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).x,
    setMiddlePos(lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).y+2
  );

  let textLblGold10pOffGBoM_sbc = new Text('10% OFF', textStyle10pOff);
  textLblGold10pOffGBoM_sbc.position.set(
    lblGoldAboveBtnSummonx10GBoM_sbc.x+lblGoldAboveBtnSummonx10GBoM_sbc.width-textLblGold10pOffGBoM_sbc.width-4,
    setMiddlePos(textLblGoldAboveBtnSummonx10GBoM_sbc, textLblGold10pOffGBoM_sbc).y
  );

  summonBooksContainer.addChild(
    backgroundEmpty_sbc, backgroundDarker_sbc,
    backIcon_sbc, backgroundBook_sbc,
    bannerBoM_sbc, textBannerBoM_sbc, backgroundBoM_sbc, boM_sbc,
    btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc,
    lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc,
    textAboveLblGoldAboveBtnSummonx1BoM_sbc,
    btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc,
    lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc,
    textLblGold10pOffBoM_sbc,
    bannerGBoM_sbc, textBannerGBoM_sbc, backgroundGBoM_sbc, gBoM_sbc,
    btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc,
    lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc,
    textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
    btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc,
    lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc,
    textLblGold10pOffGBoM_sbc
  );
}

function setSummonContainer() {
  summonContainer = new Container();

  let backgroundEmpty_suc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_suc.position.set(0, 0);

  let backgroundDarker_suc = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker_suc.position.set(0, 0);

  backIcon_suc = new Sprite(resources[backIconPath].texture);
  backIcon_suc.position.set(36, 36);

  let summoningBook_suc = new Sprite(resources[summoningBookPath].texture);
  summoningBook_suc.position.set(GAME_WIDTH/2-summoningBook_suc.width/2, -56);

  banner_suc = new Sprite(resources[banner620x98Path].texture);
  banner_suc.position.set(GAME_WIDTH/2-banner_suc.width/2, 48);

  textBanner_suc = new Text('Text', textStyle144_56_black);
  textBanner_suc.position.set(
    setMiddlePos(banner_suc, textBanner_suc).x,
    setMiddlePos(banner_suc, textBanner_suc).y-4
  );

  btn10More_suc = new Sprite(resources[btnPurple248x80Path].texture);
  btn10More_suc.position.set(632, 964);

  textBtn10More_suc = new Text('10 More', textStyleBtn80_48_black);
  textBtn10More_suc.position.set(
    setMiddlePos(btn10More_suc, textBtn10More_suc).x,
    setMiddlePos(btn10More_suc, textBtn10More_suc).y
  );

  lblLeft_suc = new Sprite(resources[lblGoldPath].texture);
  lblLeft_suc.position.set(
    296,
    setMiddlePos(btn10More_suc, lblLeft_suc).y
  );

  textLblLeft_suc = new Text('90000', textStyleBtn80_48_black);
  textLblLeft_suc.position.set(
    setMiddlePos(lblLeft_suc, textLblLeft_suc).x,
    setMiddlePos(lblLeft_suc, textLblLeft_suc).y
  );

  btn1More_suc = new Sprite(resources[btnPurple248x80Path].texture);
  btn1More_suc.position.set(1376, 964);

  textBtn1More_suc = new Text('1 More', textStyleBtn80_48_black);
  textBtn1More_suc.position.set(
    setMiddlePos(btn1More_suc, textBtn1More_suc).x,
    setMiddlePos(btn1More_suc, textBtn1More_suc).y
  );

  lblRight_suc = new Sprite(resources[lblGoldPath].texture);
  lblRight_suc.position.set(
    1040,
    setMiddlePos(btn1More_suc, lblRight_suc).y
  );

  textLblRight_suc = new Text('10000', textStyleBtn80_48_black);
  textLblRight_suc.position.set(
    setMiddlePos(lblRight_suc, textLblRight_suc).x,
    setMiddlePos(lblRight_suc, textLblRight_suc).y
  );

  summoningItem_suc = new Sprite(resources[summonLeryssaHeroPath].texture);
  summoningItem_suc.position.set(
    GAME_WIDTH/2-summoningItem_suc.width/2,
    GAME_HEIGHT/2-summoningItem_suc.height/2-48
  );

  summonContainer.addChild(
    backgroundEmpty_suc, backgroundDarker_suc, backIcon_suc,
    summoningBook_suc, banner_suc, textBanner_suc,
    lblLeft_suc, textLblLeft_suc,
    btn10More_suc, textBtn10More_suc,
    lblRight_suc, textLblRight_suc,
    btn1More_suc, textBtn1More_suc,
    handIcon_tc
  );
}
