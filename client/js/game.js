'use strict';

const WebFont = require('webfontloader');
const PIXI = require('pixi.js');

let fontsLoaded = false;

// Loading WebFont from Google site
WebFont.load({
  google: {
    families: ['Josefin Sans:semi-bold']
  },
  loading: function() { console.log('Font(s) Loading'); },
  active: function() { console.log('Font(s) Loaded'); fontsLoaded = true; },
  inactive: function() { console.log('Font(s) Failure'); }
});

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
      // jpg = '.jpg',
      // loadingScreenPath = '/images/game/loading_screen'+jpg,
      // -------------------------- FOLDERS PATHS --------------------------
      backgroundsFolderPath = '/images/game/backgrounds/',
      buttonsFolderPath = '/images/game/buttons/',
      heroesFolderPath = '/images/game/heroes/',
      iconsFolderPath = '/images/game/icons/',
      glyphsFolderPath = '/images/game/icons/glyphs/',
      labelsFolderPath = '/images/game/labels/',
      mainscreenFolderPath = '/images/game/mainscreen/',
      tutorialFolderPath = '/images/game/tutorial/',
      // -----------------------------------------------------------------------
      backgroundEmptyPath = `${backgroundsFolderPath}background_empty${png}`,
      backgroundDarkerPath = `${backgroundsFolderPath}background_darker${png}`,
      apprenticePath = `${tutorialFolderPath}apprentice${png}`,
      playerPath = `${tutorialFolderPath}player${png}`,
      masterPath = `${tutorialFolderPath}master${png}`,
      bubblePath = `${tutorialFolderPath}bubble${png}`,
      arrowDown120x48Path = `${tutorialFolderPath}arrow_down${png}`,
      scrollBtn192x72Path = `${mainscreenFolderPath}scroll_btn_192x72${png}`,
      scroll192x1068Path = `${mainscreenFolderPath}scroll_192x1068${png}`,
      scrollBtn192x48Path = `${mainscreenFolderPath}scroll_btn_192x48${png}`,
      scrollArrow72x36Path = `${mainscreenFolderPath}scroll_arrow_72x36${png}`,
      scroll1068x192Path = `${mainscreenFolderPath}scroll_1068x192${png}`,
      scroll400x192Path = `${mainscreenFolderPath}scroll_400x192${png}`,
      btn144x144Path = `${buttonsFolderPath}btn_144x144${png}`,
      btn144x72Path = `${buttonsFolderPath}btn_144x72${png}`,
      btn96x144Path = `${buttonsFolderPath}btn_96x144${png}`,
      avatarBorderPath = `${mainscreenFolderPath}avatar_border_wood${png}`,
      avatarImagePath = `${iconsFolderPath}avatar_icon${png}`,
      avatarLevelBluePath = `${iconsFolderPath}avatar_level_blue_icon${png}`,
      avatarFieldPath = `${labelsFolderPath}avatar_field_label${png}`,
      barBackgroundPath = `${backgroundsFolderPath}bar_background${png}`,
      plusIconPath = `${iconsFolderPath}bar_plus_icon${png}`,
      goldIconPath = `${iconsFolderPath}gold_icon${png}`,
      diamondIconPath = `${iconsFolderPath}diamond_icon${png}`,
      handIconPath = `${iconsFolderPath}hand_icon${png}`,
      btnBackPath = `${buttonsFolderPath}btn_back${png}`,
      backgroundBookPath = `${backgroundsFolderPath}background_book${png}`,
      banner620x98Path = `${iconsFolderPath}banner_620x98${png}`,
      banner620x98GreyPath = `${iconsFolderPath}banner_620x98_grey${png}`,
      summonBooksBackgroundPath = `${backgroundsFolderPath}summon_books_background${png}`,
      lblSummonPath = `${labelsFolderPath}summon_label${png}`,
      bookOfMagicPath = `${iconsFolderPath}book_of_magic${png}`,
      grandBookOfMagicPath = `${iconsFolderPath}grand_book_of_magic${png}`,
      summoningBookPath = `${iconsFolderPath}summoning_book${png}`,
      lbl248x80Path = `${labelsFolderPath}gold_label_248x80${png}`,
      leryssaSummonIconPath = `${heroesFolderPath}leryssa/leryssa_summon_icon${png}`,
      leonaSummonIconPath = `${heroesFolderPath}leona/leona_summon_icon${png}`,
      avatarChangeNameBackgroundPath = `${backgroundsFolderPath}avatar_changename_background${png}`,
      avatarChangeNameNamefieldPath = `${labelsFolderPath}avatar_changename_namefield_label${png}`,
      dicePath = `${iconsFolderPath}dice_icon${png}`,
      btnGreen260x72Path = `${buttonsFolderPath}btn_green_260x72${png}`,
      btnGreen248x60Path = `${buttonsFolderPath}btn_green_248x60${png}`,
      avatarScreenBackgroundPath = `${backgroundsFolderPath}avatar_screen_background${png}`,
      btnClosePath = `${buttonsFolderPath}btn_close${png}`,
      // ------------------------ GLYPHS ---------------------------------------
      noGlyphIconPath = `${glyphsFolderPath}no_glyph_icon${png}`,
      // grey glyphs
      abilityPowerIconPath = `${glyphsFolderPath}grey/ability_power_icon${png}`,
      armorIconPath = `${glyphsFolderPath}grey/armor_icon${png}`,
      armorPenIconPath = `${glyphsFolderPath}grey/armor_pen_icon${png}`,
      attackDamageIconPath = `${glyphsFolderPath}grey/attack_damage_icon${png}`,
      attackForceIconPath = `${glyphsFolderPath}grey/attack_force_icon${png}`,
      critStrikeIconPath = `${glyphsFolderPath}grey/crit_strike_icon${png}`,
      doubleAttackIconPath = `${glyphsFolderPath}grey/double_attack_icon${png}`,
      energyRegenIconPath = `${glyphsFolderPath}grey/energy_regen_icon${png}`,
      hardinessIconPath = `${glyphsFolderPath}grey/hardiness_icon${png}`,
      healthIconPath = `${glyphsFolderPath}grey/health_icon${png}`,
      healthRegenIconPath = `${glyphsFolderPath}grey/health_regen_icon${png}`,
      magicForceIconPath = `${glyphsFolderPath}grey/magic_force_icon${png}`,
      magicPenIconPath = `${glyphsFolderPath}grey/magic_pen_icon${png}`,
      magicResistIconPath = `${glyphsFolderPath}grey/magic_resist_icon${png}`,
      regenerateIconPath = `${glyphsFolderPath}grey/regenerate_icon${png}`,
      // green glyphs
      aggressionIconPath = `${glyphsFolderPath}green/aggression_icon${png}`,
      avariceIconPath = `${glyphsFolderPath}green/avarice_icon${png}`,
      balanceIconPath = `${glyphsFolderPath}green/balance_icon${png}`,
      bloodthirstIconPath = `${glyphsFolderPath}green/bloodthirst_icon${png}`,
      braveryIconPath = `${glyphsFolderPath}green/bravery_icon${png}`,
      cardioIconPath = `${glyphsFolderPath}green/cardio_icon${png}`,
      defenseIconPath = `${glyphsFolderPath}green/defense_icon${png}`,
      divinePowerIconPath = `${glyphsFolderPath}green/divine_power_icon${png}`,
      enforcementIconPath = `${glyphsFolderPath}green/enforcement_icon${png}`,
      extraHealthIconPath = `${glyphsFolderPath}green/extra_health_icon${png}`,
      fortitudeIconPath = `${glyphsFolderPath}green/fortitude_icon${png}`,
      chivalryIconPath = `${glyphsFolderPath}green/chivalry_icon${png}`,
      illusionIconPath = `${glyphsFolderPath}green/illusion_icon${png}`,
      immortalityIconPath = `${glyphsFolderPath}green/immortality_icon${png}`,
      infinityIconPath = `${glyphsFolderPath}green/infinity_icon${png}`,
      magicShieldIconPath = `${glyphsFolderPath}green/magic_shield_icon${png}`,
      meditationIconPath = `${glyphsFolderPath}green/meditation_icon${png}`,
      natureIconPath = `${glyphsFolderPath}green/nature_icon${png}`,
      osmosisIconPath = `${glyphsFolderPath}green/osmosis_icon${png}`,
      providenceIconPath = `${glyphsFolderPath}green/providence_icon${png}`,
      prowessIconPath = `${glyphsFolderPath}green/prowess_icon${png}`,
      sublimityIconPath = `${glyphsFolderPath}green/sublimity_icon${png}`,
      valorIconPath = `${glyphsFolderPath}green/valor_icon${png}`,
      // blue glyphs
      // purple glyphs
      // orange glyphs
      // -----------------------------------------------------------------------
      leftArrowIconPath = `${iconsFolderPath}left_arrow_icon${png}`,
      rightArrowIconPath = `${iconsFolderPath}right_arrow_icon${png}`,
      bookmarkIconPath = `${iconsFolderPath}bookmarks/bookmark_icon${png}`,
      allIconPath = `${iconsFolderPath}bookmarks/all_icon${png}`,
      fighterIconPath = `${iconsFolderPath}bookmarks/fighter_icon${png}`,
      mageIconPath = `${iconsFolderPath}bookmarks/mage_icon${png}`,
      marksmanIconPath = `${iconsFolderPath}bookmarks/marksman_icon${png}`,
      supportIconPath = `${iconsFolderPath}bookmarks/support_icon${png}`,
      tankIconPath = `${iconsFolderPath}bookmarks/tank_icon${png}`,
      borderGreyPath = `${heroesFolderPath}border_grey${png}`,
      borderGreenPath = `${heroesFolderPath}border_green${png}`,
      borderGreenPlus1Path = `${heroesFolderPath}border_green+1${png}`,
      borderBluePath = `${heroesFolderPath}border_blue${png}`,
      borderBluePlus1Path = `${heroesFolderPath}border_blue+1${png}`,
      borderBluePlus2Path = `${heroesFolderPath}border_blue+2${png}`,
      starIconPath = `${iconsFolderPath}star_icon${png}`,
      pedestalPath = `${heroesFolderPath}pedestal${png}`,
      starBackgrounPath = `${backgroundsFolderPath}star_background${png}`,
      expBackgroundPath = `${backgroundsFolderPath}exp_pages_power_background${png}`,
      pageIconPath = `${iconsFolderPath}page_icon${png}`,
      heroesUpperBackgroundPath = `${backgroundsFolderPath}heroes_upper_background${png}`,
      heroesBottomBackgroundPath = `${backgroundsFolderPath}heroes_bottom_background${png}`,
      equipIconPath = `${iconsFolderPath}equip_icon${png}`,
      equipIconSelectedPath = `${iconsFolderPath}equip_icon_s${png}`,
      glyphsIconPath = `${iconsFolderPath}glyphs_icon${png}`,
      glyphsIconSelectedPath = `${iconsFolderPath}glyphs_icon_s${png}`,
      skillsIconPath = `${iconsFolderPath}skills_icon${png}`,
      skillsIconSelectedPath = `${iconsFolderPath}skills_icon_s${png}`,
      statsIconPath = `${iconsFolderPath}stats_icon${png}`,
      statsIconSelectedPath = `${iconsFolderPath}stats_icon_s${png}`,
      awakenIconPath = `${iconsFolderPath}awaken_icon${png}`,
      awakenIconBackgroundPath = `${backgroundsFolderPath}awaken_icon_background${png}`,
      nextGlyphsIconPath = `${iconsFolderPath}next_glyphs_icon${png}`,
      helpIconPath = `${iconsFolderPath}help_icon${png}`, // ? mark on btn
      // ------------------------ Heroes ---------------------------------------
      aeloisPath = `${heroesFolderPath}aelois/aelois_stats${png}`,
      amaraPath = `${heroesFolderPath}amara/amara_stats${png}`,
      crystalPath = `${heroesFolderPath}crystal/crystal_stats${png}`,
      diuwinPath = `${heroesFolderPath}diu_win/diu_win_stats${png}`,
      leonaPath = `${heroesFolderPath}leona/leona_stats${png}`,
      leryssaPath = `${heroesFolderPath}leryssa/leryssa_stats${png}`,
      nadiaPath = `${heroesFolderPath}nadia/nadia_stats${png}`,
      nyxPath = `${heroesFolderPath}nyx/nyx_stats${png}`,
      sinPath = `${heroesFolderPath}sin/sin_stats${png}`,
      zalajinPath = `${heroesFolderPath}zalajin/zalajin_stats${png}`,
      zayaPath = `${heroesFolderPath}zaya/zaya_stats${png}`,
      // -----------------------------------------------------------------------
      plusGreenIconPath = `${iconsFolderPath}plus_green_icon${png}`,
      plusOrangeIconPath = `${iconsFolderPath}plus_orange_icon${png}`
      ;

// Global variables
let renderer, stage, stats,
    // btnPurple248x80,
    storyTutorialContainer, tutorialContainer,
    mainScreenContainer, mainScreenIconsContainer, barContainer,
    avatarContainer, avatarScreenContainer, avatarChangeNameContainer,
    scrollContainer, battleContainer, marketsContainer,
    summonBooksContainer, summonContainer,
    heroesContainer;

let freeCounter;

// Define Textstyle variables
let textStyleBtn80_48_black, textStyleBubble_52_white, textStyle144_40_black,
  textStyleLevel_40_white, textStyleAvatar_28, textStyle_32left_black, textStyle_32center_black,
  textStyle_32right_black, textStyle10pOff;

let closeIcon;

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
  scrollBtn192x72_mc,
  scrollArrow72x36_mc,
  // Avatar in avatarContainer (ac = avatarContainer)
  avatarBorder_ac, avatarImage_ac, avatarLevel_ac, textAvatarLevel_ac,
  avatarNameField_ac, textAvatarNameField_ac, avatarExpField_ac, textAvatarExpField_ac,
  btnAvatarChangeName,
  // Button in mainScreenIconsContainer (mac = mainScreenIconsContainer)
  // map_mac, textMap_mac, guild_mac, textGuild_mac, ranking_mac, textRanking_mac,
  // friends_mac, textFriends_mac, crusade_mac, textCrusade_mac, mail_mac, textMail_mac,
  // town_mac, textTown_mac,
  summonBooks_mac, textSummonBooks_mac,
  // Bars in barContainer (bc = barContainer)
  // barBackgroundEnergy_bc, textBarEnergy_bc,
  // barBackgroundGold_bc, textBarGold_bc,
  // barBackgroundDiamond_bc, textBarDiamond_bc,
  // plusBarEnergy_bc,
  // plusGold_bc, goldIcon_bc,
  // plusDiamond_bc;
  // Scroll (in Mainscreen) variables in scrollContainer (sc = scrollContainer)
// let scroll192x1068_sc, scrollBtn192x48_sc,
  heroes_sc, //textHeroes_sc,
  // inventory_sc, textInventory_sc, tasks_sc, textTasks_sc,
  // trials_sc, textTrials_sc, battle_sc, textBattle_sc, markets_sc, textMarkets_sc;

// Summoning Books variables (sbc = summonBooksContainer)
  // backgroundEmpty_sbc, backgroundDarker_sbc,
  //backIcon_sbc, //backgroundBook_sbc,
  // bannerBoM_sbc,
  // textBannerBoM_sbc, //backgroundBoM_sbc, boM_sbc,
  btnSummonx1BoM_sbc, // textBtnSummonx1BoM_sbc,
  // textLblGoldAboveBtnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc,
  //lblGoldAboveBtnSummonx10BoM_sbc,
  // textLblGoldAboveBtnSummonx10BoM_sbc,
  //btnSummonx10BoM_sbc,
  // textBtnSummonx10BoM_sbc, //textAboveBtnSummonx10BoM_sbc,
  // bannerGBoM_sbc,
  // textBannerGBoM_sbc, //backgroundGBoM_sbc, gBoM_sbc,
  btnSummonx1GBoM_sbc,
  // textBtnSummonx1GBoM_sbc,
  //btnSummonx1GBoM_sbc,
  // textLblGoldAboveBtnSummonx1GBoM_sbc,
  // textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
  // btnSummonx10GBoM_sbc,
  // textBtnSummonx10GBoM_sbc,
  // textLblGoldAboveBtnSummonx10GBoM_sbc,
// Summon x1 (10) variables (suc = summonContainer)
  // backgroundEmpty_suc, backgroundDarker_suc,
  //backIcon_suc,
  summoningItem_suc//,
  // summoningBook_suc,
  // banner_suc, textBanner_suc,
  // lblLeft_suc, textLblLeft_suc, //btn10More_suc, //textBtn10More_suc,
  // lblRight_suc, textLblRight_suc, btn1More_suc//, textBtn1More_suc
  ;

// Heroes variables

// Inventory variables

// Tasks variables

// Trials variables

// Battle variables (bac = battleContainer)
// let battleBackground_bac,
  // arena_bac, textArena_bac, gArena_bac, textGArena_bac;

// Markets variables (mrc = marketsContainer)
// let marketsBackground_mrc,
//   arenaShop_mrc, textArenaShop_mrc, gArenaShop_mrc, textGArenaShop_mrc,
//   guildShop_mrc, textGuildShop_mrc, crusadeShop_mrc, textCrusadeShop_mrc,
//   fantasyShop_mrc, textFantasyShop_mrc, shop_mrc, textShop_mrc;

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
          // loadingScreenPath,
          backgroundEmptyPath, backgroundDarkerPath,
          apprenticePath, playerPath, masterPath, bubblePath, arrowDown120x48Path,
          scrollBtn192x72Path, scroll192x1068Path, scrollBtn192x48Path,
          scrollArrow72x36Path, scroll1068x192Path, scroll400x192Path,
          btn144x144Path, btn144x72Path, btn96x144Path,
          // Avatar
          avatarBorderPath, avatarImagePath, avatarLevelBluePath, avatarFieldPath,
          barBackgroundPath, plusIconPath, goldIconPath, diamondIconPath, handIconPath,
          btnBackPath, backgroundBookPath, banner620x98Path, banner620x98GreyPath,
          summonBooksBackgroundPath, lblSummonPath, bookOfMagicPath, grandBookOfMagicPath,
          summoningBookPath, lbl248x80Path, leryssaSummonIconPath, leonaSummonIconPath,
          avatarChangeNameBackgroundPath, avatarChangeNameNamefieldPath, dicePath,
          btnGreen260x72Path, btnGreen248x60Path, avatarScreenBackgroundPath,
          btnClosePath,
          // Grey Glyphs
          noGlyphIconPath, abilityPowerIconPath, armorIconPath, armorPenIconPath,
          attackDamageIconPath, attackForceIconPath, critStrikeIconPath,
          doubleAttackIconPath, energyRegenIconPath, hardinessIconPath,
          healthIconPath, healthRegenIconPath, magicForceIconPath, magicPenIconPath,
          magicResistIconPath, regenerateIconPath,
          // Green Glyphs
          aggressionIconPath, avariceIconPath, balanceIconPath, bloodthirstIconPath,
          braveryIconPath, cardioIconPath, defenseIconPath, divinePowerIconPath,
          enforcementIconPath, extraHealthIconPath, fortitudeIconPath, chivalryIconPath,
          illusionIconPath, immortalityIconPath, infinityIconPath, magicShieldIconPath,
          meditationIconPath, natureIconPath, osmosisIconPath, providenceIconPath,
          prowessIconPath, sublimityIconPath, valorIconPath,
          // Blue Glyphs
          // Purple Glyphs
          // Orange Glyphs
          // -----------------------------------------------------------------------
          // Heroes
          leftArrowIconPath, rightArrowIconPath, bookmarkIconPath, allIconPath,
          fighterIconPath, mageIconPath, marksmanIconPath, supportIconPath,
          tankIconPath, borderGreyPath, borderGreenPath, borderGreenPlus1Path, borderBluePath,
          borderBluePlus1Path, borderBluePlus2Path, starIconPath, pedestalPath, starBackgrounPath,
          expBackgroundPath, pageIconPath, heroesUpperBackgroundPath, heroesBottomBackgroundPath,
          equipIconPath, equipIconSelectedPath, glyphsIconPath, glyphsIconSelectedPath,
          skillsIconPath, skillsIconSelectedPath, statsIconPath, statsIconSelectedPath,
          awakenIconPath, awakenIconBackgroundPath, nextGlyphsIconPath, helpIconPath,
          // Heroes
          aeloisPath, amaraPath, crystalPath, diuwinPath, leonaPath, leryssaPath,
          nadiaPath, nyxPath, sinPath, zalajinPath, zayaPath
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

    let myFontFamily = 'Sans-serif';

    if (fontsLoaded) { myFontFamily = 'Josefin Sans'; }

    // TextStyle for button with 80px height
    textStyleBtn80_48_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 48,
      // align: 'center',
      fill: '#000'
    });

    // TextStyle for textBubble
    textStyleBubble_52_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 52,
      aligh: 'left',
      fill: '#fff'
    });

    // TextStyle for mainScreenIcons
    textStyle144_40_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 40,
      // fontWeight: 'bold',
      align: 'center',
      fill: '#000'
    });

    // TextStyle for avatarLevel, banners, text in barContainer
    textStyleLevel_40_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 40,
      align: 'center',
      fill: '#fff'
    });

    // TextStyle for name and exp in avatar
    textStyleAvatar_28 = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 28,
      align: 'center',
      fill: '#2b1100'
    });

    textStyle_32left_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'left',
      fill: '#000'
    });

    textStyle_32center_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      // fontWeight: '700',
      align: 'center',
      fill: '#000'
    });

    textStyle_32right_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'right',
      fill: '#000'
    });

    // TextStyle for
    textStyle10pOff = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 20,
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
    // setAvatarContainer(); // Add Avatar into the Main Screen (mainScreenContainer)

    // setAvatarChangeNameContainer();

    // setBarContainer(); // Add Bars into the Main Screen
    setMainScreenIconsContainer(); // Add Icons into the Main Screen
    // setScrollContainer(); // Add Scroll into the Main Screen
    setMainScreenContainer();

    // ----- TUTORIAL SCREEN -----
    setTutorialContainer();

    // ----- SUMMONBOOKS SCREEN -----
    // setSummonBooksContainer();

    // ----- SUMMON SCREEN -----
    // setSummonContainer();

    // setAvatarScreenContainer();
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
        textLblGold.text = '--Free--';
        textLblGold.x = btn.x+btn.width/2-textLblGold.width/2;
        textLblRight_suc.text = '--Free--';
        textLblRight_suc.x = lblRight_suc.x+lblRight_suc.width/2-textLblRight_suc.width/2;
        freeCounter--;
        textAboveLbl.text = '--Free Times '+freeCounter+'/5--';
        textAboveLbl.x = btn.x+btn.width/2-textAboveLbl.width/2;
      }
      if (countdownSocketOn === 'timer46hoursStarted') {
        textLblGold.text = '--Free--';
        textLblGold.x = btn.x+btn.width/2-textLblGold.width/2;
        textLblRight_suc.text = '--Free--';
        textLblRight_suc.x = lblRight_suc.x+lblRight_suc.width/2-textLblRight_suc.width/2;
        textAboveLbl.text = '--Free Time--';
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
      textAboveLbl.text = '--Free after --'+hours+':'+minutes+':'+seconds;
    }
  });
}

// Set child element position to middle (x and y) of parent element
function setMiddlePos(parent, child) {
  let x = parent.x+parent.width/2-child.width/2;
  let y = parent.y+parent.height/2-child.height/2;
  return {x, y};
}

// Set interactive
function setInteractive(item, value) {
  item.interactive = value;
  item.buttonMode = value;
}

// Add darker background to the Container
function addDarkerBackground(container) {
  let background = new Sprite(resources[backgroundDarkerPath].texture);
  background.position.set(0, 0);

  container.addChild(background);
}

// Add Banner with Text to the container
function addBanner(spritePath, parent, container) {
  let spriteBanner = new Sprite(resources[spritePath].texture);
  spriteBanner.position.set(
    GAME_WIDTH/2-spriteBanner.width/2,
    parent.y-spriteBanner.height/2+6
  );

  container.addChild(spriteBanner);
}

// Add Close icon to the Container
function addCloseIcon(container, parent) {
  closeIcon = new Sprite(resources[btnClosePath].texture);
  closeIcon.position.set(
    parent.x+parent.width-closeIcon.width/2-12,
    parent.y-closeIcon.height/2+12
  );

  setInteractive(closeIcon, true);

  container.addChild(closeIcon);

  // console.log(stage.children);

  closeIcon.on('pointerup', () => {
    console.log('closeIcon clicked');
    stage.removeChild(stage.children[stage.children.length-1]);
    setTimeout(() => {
      // if (scrollArrow72x36_mc.interactive === false) {
      //   setInteractive(scrollArrow72x36_mc, true);
      // }
      if (avatarContainer.interactive === false) {
        setInteractive(avatarContainer, true);
      }
      if (summonBooks_mac.interactive === false) {
        setInteractive(summonBooks_mac, true);
      }
    }, LATENCY*2);
  });
}

// Add Back icon to the Container
function addBackIcon(container) {
  let backIcon = new Sprite(resources[btnBackPath].texture);
  backIcon.position.set(36, 36);

  setInteractive(backIcon, true);

  container.addChild(backIcon);
  // console.log(stage.children);
  // console.log(stage.children.length);
  // let value = stage.children.length;
  // console.log(value);

  backIcon.on('pointerup', () => {
    setInteractive(backIcon, false);
    console.log('backIcon clicked');
    // setTimeout(() => {
      // stage.removeChild(stage.children[stage.children.length-1]);
      stage.removeChild(container);
      console.log(stage.children);
      console.log(stage.children.length);
      // console.log('stage children:', stage.children.length);
      // console.log('value:', value);
      // if (value === stage.children.length) {
      //   setInteractive(backIcon, false);
      //   console.log('hello');
      // }
      if (stage.children.length === 1) {
        setTimeout(() => {
        // if (scrollArrow72x36_mc.interactive === false) {
        //   setInteractive(scrollArrow72x36_mc, true);
        // }
        // if (avatarContainer.interactive === false) {
          // console.log('avatarContainer');
          setInteractive(avatarContainer, true);
        // }
        // if (summonBooks_mac.interactive === false) {
        //   console.log('summonBooks_mac');
          setInteractive(summonBooks_mac, true);
        // }
        // if (heroes_sc.interactive === false) {
        //   console.log('heroes_sc');
        //   setInteractive(heroes_sc, true);
        // }
        // if (btnSummonx1BoM_sbc.interactive === false) {
        //   setInteractive(btnSummonx1BoM_sbc, true);
        // }
        // if (btnSummonx1GBoM_sbc.interactive === false) {
        //   setInteractive(btnSummonx1GBoM_sbc, true);
        // }
        }, LATENCY);
      }
    // }, LATENCY);
  });
}

function setBookBackground(container) {
  let backgroundEmpty = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty.position.set(0, 0);

  let backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker.position.set(0, 0);

  let backgroundBook = new Sprite(resources[backgroundBookPath].texture);
  backgroundBook.position.set(
    GAME_WIDTH/2-backgroundBook.width/2,
    144
  );

  container.addChild(backgroundEmpty, backgroundDarker, backgroundBook);
}

// function setLoadingContainer() {
//   let loadingContainer = new Container();
//
//   let loadingScreen = new Sprite(resources[loadingScreenPath].texture);
//   loadingScreen.position.set(0, 0);
//
//   loadingContainer.addChild(loadingScreen);
//
//   stage.addChild(loadingContainer);
// }

// Setup storyTutorialContainer
function setStoryTutorialContainer() {
  storyTutorialContainer = new Container();

  let backgroundEmpty_stc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_stc.position.set(0, 0);

  let btnSkip_stc = new Sprite(resources[btnGreen248x60Path].texture);
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

  let textBubble_stc = new Text("Text", textStyleBubble_52_white);
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
      if (i === data.message.length) {
        console.log('end');
        socket.emit('btnSkipMsg', 'skip');
      }
      if (i < data.message.length) {
        // if (j === 0) {
          textBubble_stc.text = data.message[i].text;
          textBubble_stc.position.set(
            176,
            setMiddlePos(bubble_stc, textBubble_stc).y
          );
          if (data.message[i].speaker === 'A') {
            apprentice_stc.visible = true;
            master_stc.visible = false;
          } else if (data.message[i].speaker === 'M') {
            master_stc.visible = true;
            apprentice_stc.visible = false;
            player_stc.visible = false;
          } else if (data.message[i].speaker === 'P') {
            player_stc.visible = true;
            master_stc.visible = false;
          } else {
            apprentice_stc.visible = false;
          }
          // j = 1;
        // } else if (j === 1) {
        //   j = 0;
          i++;
          console.log('i', i);
        // }
      }
    });
  });
}

// Setup
function setScrollArrow(container) {

  scrollBtn192x72_mc = new Sprite(resources[scrollBtn192x72Path].texture);
  scrollBtn192x72_mc.position.set(1716, 12);

  scrollArrow72x36_mc = new Sprite(resources[scrollArrow72x36Path].texture);
  scrollArrow72x36_mc.anchor.set(0.5);
  scrollArrow72x36_mc.position.set(1812, 48);
  scrollArrow72x36_mc.scale.y = -1;

  // Scrool interaction
  scrollArrow72x36_mc.interactive = true;
  scrollArrow72x36_mc.buttonMode = true;
  scrollArrow72x36_mc.on('pointerup', () => {
    scrollArrow72x36_mc.scale.y *= -1;
    if (scrollArrow72x36_mc.scale.y == -1) {
      // console.log(stage.children[0].children[stage.children[0].children.length-1]);
      container.removeChild(stage.children[0].children[stage.children[0].children.length-1]);
      console.log(stage.children[0].children);
      // scrollContainer.visible = false;
      // if (battleContainer.visible) {
      //   battleContainer.visible = false;
      //   // battleBackground_bac.visible = false;
      // }
      // if (marketsContainer.visible) {
      //   marketsContainer.visible = false;
      //   // marketsBackground_mrc.visible = false;
      // }
    } else {
      // scrollContainer.visible = true;
      setScrollContainer(container);
      console.log(stage.children[0].children);
      // console.log(stage.children[0].children[stage.children[0].children.length-1]);
      // if (stage.children[0].children[stage.children[0].children.length-1] === container) {
        // console.log('yes container');
      // }
    }
  });
  container.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
}

// Setup
function setScrollArrowHeroes(container) {

  let scrollBtn192x72 = new Sprite(resources[scrollBtn192x72Path].texture);
  scrollBtn192x72.position.set(1716, 12);

  let scrollArrow72x36 = new Sprite(resources[scrollArrow72x36Path].texture);
  scrollArrow72x36.position.set(1812, 48);
  scrollArrow72x36.anchor.set(0.5);
  scrollArrow72x36.scale.y = -1;

  // Scrool interaction
  scrollArrow72x36.interactive = true;
  scrollArrow72x36.buttonMode = true;
  scrollArrow72x36.on('pointerup', () => {
    scrollArrow72x36.scale.y *= -1;
    if (scrollArrow72x36.scale.y == -1) {
      // console.log(stage.children[0].children[stage.children[0].children.length-1]);
      let i = stage.children.length-1;
      console.log(i);
      container.removeChild(stage.children[i].children[stage.children[i].children.length-1]);
      // console.log(stage.children);
    } else {
      // if (stage)
      // console.log(stage.children.length);
      setScrollContainer(container);
      // console.log('children:\n', stage.children[1].children);
      // console.log('children.children:\n', stage.children[0].children);
    }
  });
  container.addChild(scrollBtn192x72, scrollArrow72x36);
}

function addBackIconHeroes(container) {
  let backIcon = new Sprite(resources[btnBackPath].texture);
  backIcon.position.set(36, 36);

  setInteractive(backIcon, true);

  container.addChild(backIcon);

  backIcon.on('pointerup', () => {
    setInteractive(backIcon, false);
    console.log('backIconHeroes clicked');
      stage.removeChild(container);
      scrollArrow72x36_mc.scale.y = -1;
      mainScreenContainer.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
      console.log(stage.children);
      console.log(stage.children.length);
      if (stage.children.length === 1) {
        setTimeout(() => {
          setInteractive(avatarContainer, true);
          setInteractive(summonBooks_mac, true);
        }, LATENCY);
      }
  });
}

// Setup mainScreenContainer
function setMainScreenContainer() {
  mainScreenContainer = new Container();

  let backgroundEmpty_mc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_mc.position.set(0, 0);

  mainScreenContainer.addChild(backgroundEmpty_mc,
    mainScreenIconsContainer
    // , scrollContainer, scrollBtn192x72_mc, scrollArrow72x36_mc
  );

  setAvatarContainer();
  setBarContainer(mainScreenContainer); // Add Bars into the Main Screen
  // setMainScreenIconsContainer(); // Add Icons into the Main Screen
  // setScrollContainer(mainScreenContainer); // Add Scroll into the Main Screen
  setScrollArrow(mainScreenContainer);
  // mainScreenContainer.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
  stage.addChild(mainScreenContainer);
  // setScrollArrow(stage);

  socket.on('tutorialData', (data) => {
    setTimeout(() => {
      console.log(data.message);

      if (stage.children[0]) {
        storyTutorialContainer.removeChild(master_stc, arrowDown120x48_stc);
        stage.removeChild(storyTutorialContainer);
      }

// ---- !!!! This uncomments after change name screen will be implemented !!!!! ------

      // mainScreenIconsContainer.removeChild(summonBooks_mac, textSummonBooks_mac);
      //
      // summonBooks_mac.interactive = true;
      // summonBooks_mac.buttonMode = true;
      //
      // textBubble_tc.text = data.message[0].text;
      // master_stc.visible = true;
      //
      // tutorialContainer.addChild(
      //   master_stc, bubble_tc, textBubble_tc,
      //   summonBooks_mac, textSummonBooks_mac, handIcon_tc
      // );

// -- change name screen
      // let a = 4;
      // textBubble_tc.text = data.message[a].text;
      // // bubble_tc.interactive = true;
      // // bubble_tc.buttonMode = true;
      // master_stc.visible = true;
      //
      // tutorialContainer.addChild(
      //   master_stc, bubble_tc, textBubble_tc
      // );
// end change name screen
      // stage.addChild(
      //   mainScreenContainer,
      //   // tutorialContainer
      // );

      // stage.addChild(avatarScreenContainer);
      // console.log(stage.children);

      // stage.addChild(avatarChangeNameContainer);

// ---- !!!! This uncomments after change name screen will be implemented !!!!! ------

      // summonBooks_mac.on('pointerup', () => {
      //   setTimeout(() => {
      //     textBubble_tc.text = data.message[1].text;
      //     summonBooks_mac.interactive = false;
      //     summonBooks_mac.buttonMode = false;
      //
      //     bubble_tc.interactive = true;
      //     bubble_tc.buttonMode = true;
      //     let i = 1;
          // bubble_tc.on('pointerup', () => {
          //   if (i === 2) {
          //     setTimeout(() => {
          //       console.log('end');
          //       summonBooksContainer.removeChild(
          //         master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
          //       );
          //
          //       btnSummonx1BoM_sbc.interactive = true;
          //       btnSummonx1BoM_sbc.buttonMode = true;
          //
          //       handIcon_tc.position.set(
          //         btnSummonx1BoM_sbc.x+btnSummonx1BoM_sbc.width/4*3,
          //         btnSummonx1BoM_sbc.y+btnSummonx1BoM_sbc.height/2
          //       );
          //
          //       summonBooksContainer.addChild(handIcon_tc);
          //
          //       btnSummonx1BoM_sbc.on('pointerup', () => {
          //         setTimeout(() => {
          //           socket.emit('btnSummonx1BoMMsg', 'summonx1BoM');
          //
          //           btnSummonx1BoM_sbc.interactive = false;
          //           btnSummonx1BoM_sbc.buttonMode = false;
          //
          //           handIcon_tc.position.set(
          //             backIcon_suc.x+backIcon_suc.width/4*3,
          //             backIcon_suc.y+backIcon_suc.height/4*3
          //           );
          //
          //           textBanner_suc.text = textBannerBoM_sbc.text;
          //           textBanner_suc.x = setMiddlePos(banner_suc, textBanner_suc).x;
          //
          //           textLblLeft_suc.text = textLblGoldAboveBtnSummonx10BoM_sbc.text;
          //           textLblLeft_suc.x = setMiddlePos(lblLeft_suc, textLblLeft_suc).x;
          //
          //           textBtn10More_suc.text = textBtnSummonx10BoM_sbc.text;
          //           textBtn10More_suc.x = setMiddlePos(btn10More_suc, textBtn10More_suc).x;
          //
          //           textLblRight_suc.text = textLblGoldAboveBtnSummonx1BoM_sbc.text;
          //           textLblRight_suc.x = setMiddlePos(lblRight_suc, textLblRight_suc).x;
          //
          //           textBtn1More_suc.text = textBtnSummonx1BoM_sbc.text;
          //           textBtn1More_suc.x = setMiddlePos(btn1More_suc, textBtn1More_suc).x;
          //
          //           countdownTimer(
          //             'timer5minutesStarted', 'timer5minutesEnded', '10000',
          //             textLblGoldAboveBtnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc,
          //             btnSummonx1BoM_sbc
          //           );
          //
          //           socket.on('summonLeryssa', (data) => {
          //             console.log('send leryssa from server', data.message[0].heroes[0].urlName);
          //
          //             if (data.message[0].heroes[0].urlName === 'leryssa') {
          //               setTimeout(() => {
          //                 backIcon_suc.interactive = true;
          //                 backIcon_suc.buttonMode = true;
          //                 summonContainer.addChild(summoningItem_suc, handIcon_tc);
          //                 // console.log('1 sec');
          //               }, LATENCY*2);
          //             }
          //           });
          //
          //           backIcon_suc.on('pointerup', () => {
          //             backIcon_suc.interactive = false;
          //             backIcon_suc.buttonMode = false;
          //             setTimeout(() => {
          //               i++;
          //               console.log('i', i);
          //               summonContainer.removeChild(summoningItem_suc);
          //               stage.removeChild(summonContainer);
          //
          //               if (i === 3) {
          //                 textBubble_tc.text = data.message[i].text;
          //                 bubble_tc.interactive = true;
          //                 bubble_tc.buttonMode = true;
          //
          //                 bubble_tc.on('pointerup', () => {
          //                   // console.log('i', i);
          //                   if (i === 4) {
          //                     setTimeout(() => {
          //                       summonBooksContainer.removeChild(
          //                         master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
          //                       );
          //
          //                       handIcon_tc.position.set(
          //                         btnSummonx1GBoM_sbc.x+btnSummonx1GBoM_sbc.width/4*3,
          //                         btnSummonx1GBoM_sbc.y+btnSummonx1GBoM_sbc.height/2
          //                       );
          //
          //                       btnSummonx1GBoM_sbc.interactive = true;
          //                       btnSummonx1GBoM_sbc.buttonMode = true;
          //
          //                       summonBooksContainer.addChild(handIcon_tc);
          //
          //                       btnSummonx1GBoM_sbc.on('pointerup', () => {
          //                         setTimeout(() => {
          //                           socket.emit('btnSummonx1GBoMMsg', 'summonx1GBoM');
          //
          //                           btnSummonx1GBoM_sbc.interactive = false;
          //                           btnSummonx1GBoM_sbc.buttonMode = false;
          //
          //                           handIcon_tc.position.set(
          //                             backIcon_suc.x+backIcon_suc.width/4*3,
          //                             backIcon_suc.y+backIcon_suc.height/4*3
          //                           );
          //
          //                           textBanner_suc.text = textBannerGBoM_sbc.text;
          //                           textBanner_suc.x = setMiddlePos(banner_suc, textBanner_suc).x;
          //
          //                           textLblLeft_suc.text = textLblGoldAboveBtnSummonx10GBoM_sbc.text;
          //                           textLblLeft_suc.x = setMiddlePos(lblLeft_suc, textLblLeft_suc).x;
          //
          //                           textBtn10More_suc.text = textBtnSummonx10GBoM_sbc.text;
          //                           textBtn10More_suc.x = setMiddlePos(btn10More_suc, textBtn10More_suc).x;
          //
          //                           textLblRight_suc.text = textLblGoldAboveBtnSummonx1GBoM_sbc.text;
          //                           textLblRight_suc.x = setMiddlePos(lblRight_suc, textLblRight_suc).x;
          //
          //                           textBtn1More_suc.text = textBtnSummonx1GBoM_sbc.text;
          //                           textBtn1More_suc.x = setMiddlePos(btn1More_suc, textBtn1More_suc).x;
          //
          //                           countdownTimer(
          //                             'timer46hoursStarted', 'timer46hoursEnded', '288',
          //                             textLblGoldAboveBtnSummonx1GBoM_sbc, textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
          //                             btnSummonx1GBoM_sbc
          //                           );
          //
          //                           socket.on('summonLeona', (data) => {
          //                             console.log('send leona from server', data.message[0].heroes[0].urlName);
          //
          //                             if (data.message[0].heroes[0].urlName === 'leona') {
          //                               summoningItem_suc = new Sprite(resources[leonaSummonIconPath].texture);
          //                               summoningItem_suc.position.set(
          //                                 GAME_WIDTH/2-summoningItem_suc.width/2,
          //                                 GAME_HEIGHT/2-summoningItem_suc.height/2-48
          //                               );
          //                               setTimeout(() => {
          //                                 backIcon_suc.interactive = true;
          //                                 backIcon_suc.buttonMode = true;
          //                                 summonContainer.addChild(summoningItem_suc, handIcon_tc);
          //                                 // console.log('1 sec');
          //                               }, LATENCY*2);
          //                             }
          //                           });
          //                           stage.addChild(summonContainer);
          //                         }, LATENCY);
          //                       });
          //                     }, LATENCY);
          //                   }
          //                   if (i === 3) {
          //                     textBubble_tc.text = data.message[2].text;
          //                     i++;
          //                     console.log('i', i);
          //                   }
          //                 });
          //                 summonBooksContainer.addChild(
          //                   master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
          //                 );
          //               }
          //               if (i === 5) {
          //                 summonContainer.removeChild(handIcon_tc);
          //                 setTimeout(() => {
          //                   handIcon_tc.position.set(
          //                     backIcon_sbc.x+backIcon_sbc.width/4*3,
          //                     backIcon_sbc.y+backIcon_sbc.height/4*3
          //                   );
          //
          //                   backIcon_sbc.interactive = true;
          //                   backIcon_sbc.buttonMode = true;
          //
          //                   backIcon_sbc.on('pointerup', () => {
          //                     backIcon_sbc.interactive = false;
          //                     backIcon_sbc.buttonMode = false;
          //                     setTimeout(() => {
          //                       console.log('happy');
          //
          //                     }, LATENCY);
          //                   });
          //                   summonBooksContainer.addChild(handIcon_tc);
          //                 }, LATENCY);
          //               }
          //             }, LATENCY);
          //           });
          //           stage.addChild(summonContainer);
          //         }, LATENCY);
          //       });
          //     }, LATENCY);
          //   }
          //   if (i === 1) {
          //     textBubble_tc.text = data.message[2].text;
          //     i++;
          //     console.log(i);
          //   }
          // });
          // summonBooksContainer.addChild(
          //   barContainer, master_stc, bubble_tc, textBubble_tc, arrowDown120x48_stc
          // );
          // stage.addChild(summonBooksContainer);
      //   }, LATENCY);
      // });

// ---- !!!! This uncomments after change name screen will be implemented !!!!! ------ to co je nad timto

    }, LATENCY);
  });
}

// Setup avatarContainer
function setAvatarContainer() {
  avatarContainer = new Container();

  avatarBorder_ac = new Sprite(resources[avatarBorderPath].texture);
  avatarBorder_ac.position.set(36, 36);

  avatarImage_ac = new Sprite(resources[avatarImagePath].texture);
  avatarImage_ac.position.set(60, 60);

  avatarLevel_ac = new Sprite(resources[avatarLevelBluePath].texture);
  avatarLevel_ac.position.set(74, 169);

  avatarNameField_ac = new Sprite(resources[avatarFieldPath].texture);
  avatarNameField_ac.position.set(216, 100);

  avatarExpField_ac = new Sprite(resources[avatarFieldPath].texture);
  avatarExpField_ac.scale.set(0.85);
  avatarExpField_ac.position.set(216, 140);

  avatarContainer.addChild(avatarImage_ac, avatarBorder_ac,
    avatarLevel_ac, avatarNameField_ac, avatarExpField_ac);

  mainScreenContainer.addChild(avatarContainer);

  socket.on('avatarData', (data) => {
    console.log(data);

    textAvatarLevel_ac = new Text(data.playerLvl, textStyleLevel_40_white);
    textAvatarLevel_ac.position.set(
      setMiddlePos(avatarLevel_ac, textAvatarLevel_ac).x-2,
      setMiddlePos(avatarLevel_ac, textAvatarLevel_ac).y-8
    );

    textAvatarNameField_ac = new Text(data.nickname, textStyleAvatar_28);
    textAvatarNameField_ac.position.set(
      setMiddlePos(avatarNameField_ac, textAvatarNameField_ac).x,
      setMiddlePos(avatarNameField_ac, textAvatarNameField_ac).y-4
    );

    textAvatarExpField_ac = new Text(data.currentExp+'/'+data.nextLvlExp, textStyleAvatar_28);
    textAvatarExpField_ac.position.set(
      setMiddlePos(avatarExpField_ac, textAvatarExpField_ac).x,
      setMiddlePos(avatarExpField_ac, textAvatarExpField_ac).y-4
    );

    avatarContainer.addChild(textAvatarLevel_ac, textAvatarNameField_ac, textAvatarExpField_ac);
  });

  setInteractive(avatarContainer, true);

  if (avatarContainer.interactive) {
    avatarContainer.on('pointerup', () => {
      // console.log('hello');
      socket.emit('avatarScreen', 'avatarClicked');
      setAvatarScreenContainer();
    });
  }
}

// Setup avatarScreenContainer
function setAvatarScreenContainer() {
  avatarScreenContainer = new Container();

  addDarkerBackground(avatarScreenContainer);

  setInteractive(avatarContainer, false);
  setInteractive(summonBooks_mac, false);
  // setInteractive(scrollArrow72x36_mc, false);

  let background = new Sprite(resources[avatarScreenBackgroundPath].texture);
  background.position.set(
    GAME_WIDTH/2-background.width/2,
    GAME_HEIGHT/2-background.height/2
  );

  btnAvatarChangeName = new Sprite(resources[btnGreen248x60Path].texture);
  btnAvatarChangeName.position.set(1018, 490);

  let btnAvatarChangeAvatar = new Sprite(resources[btnGreen248x60Path].texture);
  btnAvatarChangeAvatar.position.set(656, 384);

  let btnAvatarChangeBorder = new Sprite(resources[btnGreen248x60Path].texture);
  btnAvatarChangeBorder.position.set(1018, 384);

  let btnAvatarAchievement = new Sprite(resources[btnGreen260x72Path].texture);
  btnAvatarAchievement.position.set(656, 904);

  let btnAvatarSystemSettings = new Sprite(resources[btnGreen260x72Path].texture);
  btnAvatarSystemSettings.position.set(1006, 904);

  let textChangeAvatar = new Text('', textStyle_32center_black);
  let textChangeBorder = new Text('', textStyle_32center_black);
  let textChangeName = new Text('', textStyle_32center_black);
  let textNickname = new Text('', textStyle_32left_black);
  let textLevel = new Text('', textStyle_32left_black);
  let textLevelValue = new Text('', textStyle_32right_black);
  let textPresentExp = new Text('', textStyle_32left_black);
  let textExpValue = new Text('', textStyle_32right_black);
  let textMaxHeroLvl = new Text('', textStyle_32left_black);
  let textMaxHeroLvlValue = new Text('', textStyle_32right_black);
  let textAccountID = new Text('', textStyle_32left_black);
  let textAchievement = new Text('', textStyle_32center_black);
  let textSystemSettings = new Text('', textStyle_32center_black);

  avatarScreenContainer.addChild(background, btnAvatarChangeAvatar, textChangeAvatar,
    btnAvatarChangeBorder, textChangeBorder, btnAvatarChangeName, textChangeName,
    textNickname, textLevel, textLevelValue, textPresentExp, textExpValue,
    textMaxHeroLvl, textMaxHeroLvlValue, textAccountID,
    btnAvatarAchievement, textAchievement, btnAvatarSystemSettings, textSystemSettings);
  addCloseIcon(avatarScreenContainer, background);

  socket.on('avatarScreenData', (data) => {
    // console.log('avatarScreenData: ', data);

    textChangeAvatar.text = data.btnChangeAvatar;
    textChangeAvatar.position.set(
      setMiddlePos(btnAvatarChangeAvatar, textChangeAvatar).x,
      setMiddlePos(btnAvatarChangeAvatar, textChangeAvatar).y
    );

    textChangeBorder.text = data.btnChangeBorder;
    textChangeBorder.position.set(
      setMiddlePos(btnAvatarChangeBorder, textChangeBorder).x,
      setMiddlePos(btnAvatarChangeBorder, textChangeBorder).y
    );

    textChangeName.text = data.btnChangeName;
    textChangeName.position.set(
      setMiddlePos(btnAvatarChangeName, textChangeName).x,
      setMiddlePos(btnAvatarChangeName, textChangeName).y
    );

    textNickname.text = data.nickname;
    textNickname.position.set(
      656,
      setMiddlePos(btnAvatarChangeName, textChangeName).y
    );

    textLevel.text = data.lblPlayerLvl;
    textLevel.position.set(656, 592);

    textLevelValue.text = data.playerLvl;
    textLevelValue.position.set(1266-textLevelValue.width, 592);

    textPresentExp.text = data.lblPresentExp;
    textPresentExp.position.set(656, 676);

    textExpValue.text = data.currentExp+'/'+data.nextLvlExp;
    textExpValue.position.set(1266-textExpValue.width, 676);

    textMaxHeroLvl.text = data.lblMaxHeroLvl;
    textMaxHeroLvl.position.set(656, 760);

    textMaxHeroLvlValue.text = data.maxHeroLvl;
    textMaxHeroLvlValue.position.set(1266-textMaxHeroLvlValue.width, 760);

    textAccountID.text = data.lblAccountID;
    textAccountID.position.set(656, 844);

    textAchievement.text = data.btnAchievement;
    textAchievement.position.set(
      setMiddlePos(btnAvatarAchievement, textAchievement).x,
      setMiddlePos(btnAvatarAchievement, textAchievement).y
    );

    textSystemSettings.text = data.btnSystemSettings;
    textSystemSettings.position.set(
      setMiddlePos(btnAvatarSystemSettings, textSystemSettings).x,
      setMiddlePos(btnAvatarSystemSettings, textSystemSettings).y
    );
  });

  stage.addChild(avatarScreenContainer);

  setInteractive(btnAvatarChangeName, true);

  if (btnAvatarChangeName.interactive) {
    btnAvatarChangeName.on('pointerup', () => {
      console.log('btnAvatarChangeName clicked');
      socket.emit('avatarChangeName', 'avatarChangeNameClicked');
      setAvatarChangeNameContainer();
    });
  }
}

// Setup avatarChangeNameContainer
function setAvatarChangeNameContainer() {
  avatarChangeNameContainer = new Container();

  setInteractive(btnAvatarChangeName, false);
  setInteractive(closeIcon, false);

  addDarkerBackground(avatarChangeNameContainer);

  let chNBackground = new Sprite(resources[avatarChangeNameBackgroundPath].texture);
  chNBackground.position.set(GAME_WIDTH/2-chNBackground.width/2, 196);

  let chNNamefield = new Sprite(resources[avatarChangeNameNamefieldPath].texture);
  chNNamefield.position.set(668, 274);

  let chNDice = new Sprite(resources[dicePath].texture);
  chNDice.position.set(1180, 274);

  let btnCancel = new Sprite(resources[btnGreen260x72Path].texture);
  btnCancel.position.set(GAME_WIDTH/2-btnCancel.width-12, 376);

  let btnConfirm = new Sprite(resources[btnGreen260x72Path].texture);
  btnConfirm.position.set(GAME_WIDTH/2+12, 376);

  // addBanner(banner620x98Path, chNBackground, avatarChangeNameContainer);
  let banner = new Sprite(resources[banner620x98Path].texture);
  banner.position.set(
    GAME_WIDTH/2-banner.width/2,
    chNBackground.y-banner.height/2+6
  );

  let textBanner = new Text('', textStyleLevel_40_white);
  let textBtnCancel = new Text('', textStyle_32center_black);
  let textBtnConfirm = new Text('', textStyle_32center_black);
  let textNickname = new Text('', textStyle_32center_black);

  avatarChangeNameContainer.addChild(chNBackground, banner, textBanner,
    chNNamefield, textNickname, chNDice, btnCancel, textBtnCancel,
    btnConfirm, textBtnConfirm);

  stage.addChild(avatarChangeNameContainer);

  socket.on('avatarChangeNameData', (data) => {
    // console.log('avatarChangeNameData: ', data);

    textBanner.text = data.bannerChangeName;
    textBanner.position.set(
      setMiddlePos(banner, textBanner).x,
      setMiddlePos(banner, textBanner).y-6
    );

    textBtnCancel.text = data.buttonCancel;
    textBtnCancel.position.set(
      setMiddlePos(btnCancel, textBtnCancel).x,
      setMiddlePos(btnCancel, textBtnCancel).y
    );

    textBtnConfirm.text = data.buttonConfirm;
    textBtnConfirm.position.set(
      setMiddlePos(btnConfirm, textBtnConfirm).x,
      setMiddlePos(btnConfirm, textBtnConfirm).y
    );

    textNickname.text = data.nickname;
    textNickname.position.set(
      setMiddlePos(chNNamefield, textNickname).x,
      setMiddlePos(chNNamefield, textNickname).y
    );

    setInteractive(chNNamefield, true);
    chNNamefield.on('pointerup', () => {
      console.log('change name');
    });
  });

  setInteractive(closeIcon, false);
  console.log(stage.children);

  setInteractive(btnCancel, true);
  if (btnCancel.interactive) {
    btnCancel.on('pointerup', () => {
      console.log('btnCancel clicked');
      stage.removeChild(stage.children[stage.children.length-1]);
      setTimeout(() => {
        setInteractive(closeIcon, true);
        setInteractive(btnAvatarChangeName, true);
      }, LATENCY);
    });
  }

  setInteractive(btnConfirm, true);
  if (btnConfirm.interactive) {
    btnConfirm.on('pointerup', () => {
      console.log('btnConfirm clicked');
      stage.removeChild(stage.children[stage.children.length-1]);
      setTimeout(() => {
        setInteractive(closeIcon, true);
        setInteractive(btnAvatarChangeName, true);
      }, LATENCY);
    });
  }
}

// Setup barContainer
function setBarContainer(container) {
  barContainer = new Container();

  socket.emit('barContainer', 'setBarContainer');

  let barBackgroundEnergy_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundEnergy_bc.position.set(472, 36);

  let plusBarEnergy_bc = new Sprite(resources[plusIconPath].texture);
  plusBarEnergy_bc.position.set(728, 36);

  let textBarEnergy_bc = new Text('', textStyleLevel_40_white);

  let barBackgroundGold_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundGold_bc.position.set(804, 36);

  let plusGold_bc = new Sprite(resources[plusIconPath].texture);
  plusGold_bc.position.set(1060, 36);

  let goldIcon_bc = new Sprite(resources[goldIconPath].texture);
  goldIcon_bc.position.set(796, 30);

  let textBarGold_bc = new Text('', textStyleLevel_40_white);

  let barBackgroundDiamond_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundDiamond_bc.position.set(1136, 36);

  let plusDiamond_bc = new Sprite(resources[plusIconPath].texture);
  plusDiamond_bc.position.set(1392, 36);

  let diamondIcon_bc = new Sprite(resources[diamondIconPath].texture);
  diamondIcon_bc.position.set(1128, 30);

  let textBarDiamond_bc = new Text('', textStyleLevel_40_white);

  barContainer.addChild(
    barBackgroundEnergy_bc, plusBarEnergy_bc, textBarEnergy_bc,
    barBackgroundGold_bc, plusGold_bc, goldIcon_bc, textBarGold_bc,
    barBackgroundDiamond_bc, plusDiamond_bc, diamondIcon_bc, textBarDiamond_bc);

  container.addChild(barContainer);

  socket.on('barContainerData', (data) => {

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
}

// Setup mainScreenIconsContainer
function setMainScreenIconsContainer() {
  mainScreenIconsContainer = new Container();

  let map_mac = new Sprite(resources[btn144x144Path].texture);
  map_mac.position.set(116, 428);

  let guild_mac = new Sprite(resources[btn144x144Path].texture);
  guild_mac.position.set(380, 216);

  let ranking_mac = new Sprite(resources[btn144x72Path].texture);
  ranking_mac.position.set(386, 454);

  let friends_mac = new Sprite(resources[btn96x144Path].texture);
  friends_mac.position.set(702, 256);

  let crusade_mac = new Sprite(resources[btn144x144Path].texture);
  crusade_mac.position.set(1060, 96);

  let mail_mac = new Sprite(resources[btn96x144Path].texture);
  mail_mac.position.set(1240, 302);

  let town_mac = new Sprite(resources[btn144x144Path].texture);
  town_mac.position.set(1418, 380);

  summonBooks_mac = new Sprite(resources[btn144x144Path].texture);
  summonBooks_mac.position.set(1512, 108);

  mainScreenIconsContainer.addChild(map_mac, guild_mac, ranking_mac,
    friends_mac, crusade_mac, mail_mac, town_mac, summonBooks_mac
  );

  socket.on('avatarData', (data) => {

    let textMap_mac = new Text(data.map, textStyle144_40_black);
    textMap_mac.position.set(
      setMiddlePos(map_mac, textMap_mac).x,
      setMiddlePos(map_mac, textMap_mac).y+2
    );

    let textGuild_mac = new Text(data.guild, textStyle144_40_black);
    textGuild_mac.position.set(
      setMiddlePos(guild_mac, textGuild_mac).x,
      setMiddlePos(guild_mac, textGuild_mac).y+2
    );

    let textRanking_mac = new Text(data.ranking, textStyle144_40_black);
    textRanking_mac.position.set(
      setMiddlePos(ranking_mac, textRanking_mac).x,
      setMiddlePos(ranking_mac, textRanking_mac).y+2
    );

    let textFriends_mac = new Text(data.friends, textStyle144_40_black);
    textFriends_mac.position.set(
      setMiddlePos(friends_mac, textFriends_mac).x,
      setMiddlePos(friends_mac, textFriends_mac).y+2
    );

    let textCrusade_mac = new Text(data.crusade, textStyle144_40_black);
    textCrusade_mac.position.set(
      setMiddlePos(crusade_mac, textCrusade_mac).x,
      setMiddlePos(crusade_mac, textCrusade_mac).y+2
    );

    let textMail_mac = new Text(data.mail, textStyle144_40_black);
    textMail_mac.position.set(
      setMiddlePos(mail_mac, textMail_mac).x,
      setMiddlePos(mail_mac, textMail_mac).y+2
    );

    let textTown_mac = new Text(data.town, textStyle144_40_black);
    textTown_mac.position.set(
      setMiddlePos(town_mac, textTown_mac).x,
      setMiddlePos(town_mac, textTown_mac).y+2
    );

    textSummonBooks_mac = new Text(data.summonBooks, textStyle144_40_black);
    textSummonBooks_mac.position.set(
      setMiddlePos(summonBooks_mac, textSummonBooks_mac).x,
      setMiddlePos(summonBooks_mac, textSummonBooks_mac).y+2
    );

    mainScreenIconsContainer.addChild(textMap_mac, textGuild_mac, textRanking_mac,
      textFriends_mac, textCrusade_mac, textMail_mac, textTown_mac,
      textSummonBooks_mac);
  });

  setInteractive(summonBooks_mac, true);
  if (summonBooks_mac.interactive) {
    summonBooks_mac.on('pointerup', () => {
      console.log('summonBooks_mac clicked');
      socket.emit('summonBooks', 'summonBooksClicked');
      setSummonBooksContainer();
    });
  }
}

// Setup scrollContainer (menu on the right side of game screen)
function setScrollContainer(container) {
  scrollContainer = new Container();
  battleContainer = new Container();
  marketsContainer = new Container();

  socket.emit('scrollContainer', 'setScrollContainer');

//   scrollBtn192x72_mc = new Sprite(resources[scrollBtn192x72Path].texture);
//   scrollBtn192x72_mc.position.set(1716, 12);
//
//   scrollArrow72x36_mc = new Sprite(resources[scrollArrow72x36Path].texture);
//   scrollArrow72x36_mc.anchor.set(0.5);
//   scrollArrow72x36_mc.position.set(1812, 48);
//   scrollArrow72x36_mc.scale.y = -1;
//
// // Scrool interaction
//   scrollArrow72x36_mc.interactive = true;
//   scrollArrow72x36_mc.buttonMode = true;
//   // setInteractive(scrollArrow72x36_mc);
//   scrollArrow72x36_mc.on('pointerup', onClickScrollArrow => {
//     scrollArrow72x36_mc.scale.y *= -1;
//     if (scrollArrow72x36_mc.scale.y == -1) {
//       scrollContainer.visible = false;
//       if (battleContainer.visible) {
//         battleContainer.visible = false;
//         battleBackground_bac.visible = false;
//       }
//       if (marketsContainer.visible) {
//         marketsContainer.visible = false;
//         marketsBackground_mrc.visible = false;
//       }
//     } else {
//       scrollContainer.visible = true;
//     }
//   });

  // Icons in scrollContainer ('Heroes', 'Inventory', 'Tasks', ...)
  // + Scroll menu background and bottom part of scroll
  let scroll192x1068_sc = new Sprite(resources[scroll192x1068Path].texture);
  scroll192x1068_sc.position.set(1716, 84); //1716, 12

  let scrollBtn192x48_sc = new Sprite(resources[scrollBtn192x48Path].texture);
  scrollBtn192x48_sc.position.set(1716, 1032);

  heroes_sc = new Sprite(resources[btn144x144Path].texture);
  heroes_sc.position.set(1740, 96);
  heroes_sc.interactive = true;
  heroes_sc.buttonMode = true;
  heroes_sc.on('pointerup', onClick => {
    if (heroes_sc.visible) {
      mainScreenContainer.removeChild(scrollContainer);
      mainScreenContainer.removeChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
      // console.log(stage.children.length);
      if (stage.children.length === 1) {
        setHeroesContainer();
      }
      // scrollContainer.visible = false;
    }
  });

  let textHeroes_sc = new Text('', textStyle144_40_black);

  let inventory_sc = new Sprite(resources[btn144x144Path].texture);
  inventory_sc.position.set(1740, 252);

  let textInventory_sc = new Text('', textStyle144_40_black);

  let tasks_sc = new Sprite(resources[btn144x144Path].texture);
  tasks_sc.position.set(1740, 408);

  let textTasks_sc = new Text('', textStyle144_40_black);

  let trials_sc = new Sprite(resources[btn144x144Path].texture);
  trials_sc.position.set(1740, 564);

  let textTrials_sc = new Text('', textStyle144_40_black);

  let battle_sc = new Sprite(resources[btn144x144Path].texture);
  battle_sc.position.set(1740, 720);
  // battle_sc.interactive = true;
  // battle_sc.buttonMode = true;
  // battle_sc.on('pointerup', () => {
  //   if (battleContainer.visible) {
  //     battleContainer.visible = false;
  //     battleBackground_bac.visible = false;
  //   } else {
  //     battleContainer.visible = true;
  //     battleBackground_bac.visible = true;
  //   }
  // });

  let textBattle_sc = new Text('', textStyle144_40_black);

  let markets_sc = new Sprite(resources[btn144x144Path].texture);
  markets_sc.position.set(1740, 876);
  // markets_sc.interactive = true;
  // markets_sc.buttonMode = true;
  // markets_sc.on('pointerup', () => {
  //   if (marketsContainer.visible) {
  //     marketsContainer.visible = false;
  //     marketsBackground_mrc.visible = false;
  //   } else {
  //     marketsContainer.visible = true;
  //     marketsBackground_mrc.visible = true;
  //   }
  // });

  let textMarkets_sc = new Text('', textStyle144_40_black);

  // --- Battle Icons (battleContainer) ---
  let battleBackground_bac = new Sprite(resources[scroll400x192Path].texture);
  battleBackground_bac.position.set(1404, 696);
  battleBackground_bac.visible = false;

  let arena_bac = new Sprite(resources[btn144x144Path].texture);
  arena_bac.position.set(1428, 720);

  let textArena_bac = new Text('', textStyle144_40_black);

  let gArena_bac = new Sprite(resources[btn144x144Path].texture);
  gArena_bac.position.set(1584, 720);

  let textGArena_bac = new Text('', textStyle144_40_black);

  battleContainer.addChild(arena_bac, textArena_bac, gArena_bac, textGArena_bac);
  battleContainer.visible = false;

  // --- Markets Icons (marketsContainer) ---
  let marketsBackground_mrc = new Sprite(resources[scroll1068x192Path].texture);
  marketsBackground_mrc.position.set(780, 852);
  marketsBackground_mrc.visible = false;

  let arenaShop_mrc = new Sprite(resources[btn144x144Path].texture);
  arenaShop_mrc.position.set(804, 876);

  let textArenaShop_mrc = new Text('', textStyle144_40_black);

  let gArenaShop_mrc = new Sprite(resources[btn144x144Path].texture);
  gArenaShop_mrc.position.set(960, 876);

  let textGArenaShop_mrc = new Text('', textStyle144_40_black);

  let guildShop_mrc = new Sprite(resources[btn144x144Path].texture);
  guildShop_mrc.position.set(1116, 876);

  let textGuildShop_mrc = new Text('', textStyle144_40_black);

  let crusadeShop_mrc = new Sprite(resources[btn144x144Path].texture);
  crusadeShop_mrc.position.set(1272, 876);

  let textCrusadeShop_mrc = new Text('', textStyle144_40_black);

  let fantasyShop_mrc = new Sprite(resources[btn144x144Path].texture);
  fantasyShop_mrc.position.set(1428, 876);

  let textFantasyShop_mrc = new Text('', textStyle144_40_black);

  let shop_mrc = new Sprite(resources[btn144x144Path].texture);
  shop_mrc.position.set(1584, 876);

  let textShop_mrc = new Text('', textStyle144_40_black);

  marketsContainer.addChild(arenaShop_mrc, textArenaShop_mrc,
    gArenaShop_mrc, textGArenaShop_mrc, guildShop_mrc, textGuildShop_mrc,
    crusadeShop_mrc, textCrusadeShop_mrc, fantasyShop_mrc, textFantasyShop_mrc,
    shop_mrc, textShop_mrc);
  marketsContainer.visible = false;

  scrollContainer.addChild(battleBackground_bac, marketsBackground_mrc,
    scroll192x1068_sc, scrollBtn192x48_sc, heroes_sc, textHeroes_sc,
    inventory_sc, textInventory_sc, tasks_sc, textTasks_sc,
    trials_sc, textTrials_sc, battle_sc, textBattle_sc, battleContainer,
    markets_sc, textMarkets_sc, marketsContainer
    // scrollBtn192x72_mc, scrollArrow72x36_mc
  );
  // scrollContainer.visible = false;

  container.addChild(scrollContainer);

  socket.on('scrollContainerData', (data) => {

    textHeroes_sc.text = data.heroes;
    textHeroes_sc.position.set(
      setMiddlePos(heroes_sc, textHeroes_sc).x,
      setMiddlePos(heroes_sc, textHeroes_sc).y+2
    );

    textInventory_sc.text = data.inventory;
    textInventory_sc.position.set(
      setMiddlePos(inventory_sc, textInventory_sc).x,
      setMiddlePos(inventory_sc, textInventory_sc).y+2
    );

    textTasks_sc.text = data.tasks;
    textTasks_sc.position.set(
      setMiddlePos(tasks_sc, textTasks_sc).x,
      setMiddlePos(tasks_sc, textTasks_sc).y+2
    );

    textTrials_sc.text = data.trials;
    textTrials_sc.position.set(
      setMiddlePos(trials_sc, textTrials_sc).x,
      setMiddlePos(trials_sc, textTrials_sc).y+2
    );

    textBattle_sc.text = data.battle;
    textBattle_sc.position.set(
      setMiddlePos(battle_sc, textBattle_sc).x,
      setMiddlePos(battle_sc, textBattle_sc).y+2
    );

    textMarkets_sc.text = data.markets;
    textMarkets_sc.position.set(
      setMiddlePos(markets_sc, textMarkets_sc).x,
      setMiddlePos(markets_sc, textMarkets_sc).y+2
    );

    // Battle Icons Text in 'battleContainer'
    textArena_bac.text = data.arena;
    textArena_bac.position.set(
      setMiddlePos(arena_bac, textArena_bac).x,
      setMiddlePos(arena_bac, textArena_bac).y+2
    );

    textGArena_bac.text = data.grandArena;
    textGArena_bac.position.set(
      setMiddlePos(gArena_bac, textGArena_bac).x,
      setMiddlePos(gArena_bac, textGArena_bac).y+2
    );

    // Markets Icons Text in 'marketsContainer'
    textArenaShop_mrc.text = data.arenaShop;
    textArenaShop_mrc.position.set(
      setMiddlePos(arenaShop_mrc, textArenaShop_mrc).x,
      setMiddlePos(arenaShop_mrc, textArenaShop_mrc).y+2
    );

    textGArenaShop_mrc.text = data.grandArenaShop;
    textGArenaShop_mrc.position.set(
      setMiddlePos(gArenaShop_mrc, textGArenaShop_mrc).x,
      setMiddlePos(gArenaShop_mrc, textGArenaShop_mrc).y+2
    );

    textGuildShop_mrc.text = data.guildShop;
    textGuildShop_mrc.position.set(
      setMiddlePos(guildShop_mrc, textGuildShop_mrc).x,
      setMiddlePos(guildShop_mrc, textGuildShop_mrc).y+2
    );

    textCrusadeShop_mrc.text = data.crusadeShop;
    textCrusadeShop_mrc.position.set(
      setMiddlePos(crusadeShop_mrc, textCrusadeShop_mrc).x,
      setMiddlePos(crusadeShop_mrc, textCrusadeShop_mrc).y+2
    );

    textFantasyShop_mrc.text = data.fantasyShop;
    textFantasyShop_mrc.position.set(
      setMiddlePos(fantasyShop_mrc, textFantasyShop_mrc).x,
      setMiddlePos(fantasyShop_mrc, textFantasyShop_mrc).y+2
    );

    textShop_mrc.text = data.shop;
    textShop_mrc.position.set(
      setMiddlePos(shop_mrc, textShop_mrc).x,
      setMiddlePos(shop_mrc, textShop_mrc).y+2
    );
  });
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

  textBubble_tc = new Text("Text", textStyleBubble_52_white);
  textBubble_tc.position.set(
    176,
    setMiddlePos(bubble_tc, textBubble_tc).y
  );

  tutorialContainer.addChild(backgroundDarker_tc); // !!!!!! this uncomment after change name screen implemented
}

// Setup summonBooksContainer (screen that will show after player click on 'Summon Books' icon)
function setSummonBooksContainer() {
  summonBooksContainer = new Container();

  setInteractive(avatarContainer, false);
  setInteractive(summonBooks_mac, false);
  // setInteractive(scrollArrow72x36_mc, false);

  // let backgroundEmpty_sbc = new Sprite(resources[backgroundEmptyPath].texture);
  // backgroundEmpty_sbc.position.set(0, 0);
  //
  // let backgroundDarker_sbc = new Sprite(resources[backgroundDarkerPath].texture);
  // backgroundDarker_sbc.position.set(0, 0);
  //
  // let backgroundBook_sbc = new Sprite(resources[backgroundBookPath].texture);
  // backgroundBook_sbc.position.set(
  //   GAME_WIDTH/2-backgroundBook_sbc.width/2,
  //   144
  // );
  setBookBackground(summonBooksContainer);

  let bannerBoM_sbc = new Sprite(resources[banner620x98Path].texture);
  bannerBoM_sbc.position.set(304, 180);

  let textBannerBoM_sbc = new Text('', textStyleLevel_40_white);

  let bannerGBoM_sbc = new Sprite(resources[banner620x98Path].texture);
  bannerGBoM_sbc.position.set(986, 180);

  let textBannerGBoM_sbc = new Text('', textStyleLevel_40_white);

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
  btnSummonx1BoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
  btnSummonx1BoM_sbc.position.set(341, 814);

  let textBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black);

  let lblGoldAboveBtnSummonx1BoM_sbc = new Sprite(resources[lblSummonPath].texture);
  lblGoldAboveBtnSummonx1BoM_sbc.position.set(353, 761);

  let leftGoldIcon = new Sprite(resources[goldIconPath].texture);
  leftGoldIcon.position.set(341, 758);
  leftGoldIcon.width = 48;
  leftGoldIcon.height = 48;

  let textLblGoldAboveBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black); // Free or 10000

  let textAboveLblGoldAboveBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black);

  // Book of Magic Summon x10
  let btnSummonx10BoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
  btnSummonx10BoM_sbc.position.set(637, 814);

  let textBtnSummonx10BoM_sbc = new Text('', textStyle_32center_black);

  let lblGoldAboveBtnSummonx10BoM_sbc = new Sprite(resources[lblSummonPath].texture);
  lblGoldAboveBtnSummonx10BoM_sbc.position.set(649, 761);

  let rightGoldIcon = new Sprite(resources[goldIconPath].texture);
  rightGoldIcon.position.set(637, 758);
  rightGoldIcon.width = 48;
  rightGoldIcon.height = 48;

  let textLblGoldAboveBtnSummonx10BoM_sbc = new Text('', textStyle_32center_black);

  let textLblGold10pOffBoM_sbc = new Text('', textStyle10pOff);

  // Grand Book of magic Summon x1
  btnSummonx1GBoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
  btnSummonx1GBoM_sbc.position.set(1017, 814);

  let textBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black);

  let lblGoldAboveBtnSummonx1GBoM_sbc = new Sprite(resources[lblSummonPath].texture);
  lblGoldAboveBtnSummonx1GBoM_sbc.position.set(1029, 761);

  let leftDiamondIcon = new Sprite(resources[diamondIconPath].texture);
  leftDiamondIcon.position.set(1017, 758);
  leftDiamondIcon.width = 48;
  leftDiamondIcon.height = 48;

  let textLblGoldAboveBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black); // Free or 288

  let textAboveLblGoldAboveBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black);

  // Grand Book of magic Summon x10
  let btnSummonx10GBoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
  btnSummonx10GBoM_sbc.position.set(1313, 814);

  let textBtnSummonx10GBoM_sbc = new Text('', textStyle_32center_black);

  let lblGoldAboveBtnSummonx10GBoM_sbc = new Sprite(resources[lblSummonPath].texture);
  lblGoldAboveBtnSummonx10GBoM_sbc.position.set(1325, 761);

  let rightDiamondIcon = new Sprite(resources[diamondIconPath].texture);
  rightDiamondIcon.position.set(1313, 758);
  rightDiamondIcon.width = 48;
  rightDiamondIcon.height = 48;

  let textLblGoldAboveBtnSummonx10GBoM_sbc = new Text('', textStyle_32center_black);

  let textLblGold10pOffGBoM_sbc = new Text('', textStyle10pOff);

  summonBooksContainer.addChild(
    // backgroundEmpty_sbc, backgroundDarker_sbc, backgroundBook_sbc,
    bannerBoM_sbc, textBannerBoM_sbc, backgroundBoM_sbc, boM_sbc,
    btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc,
    lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc,
    leftGoldIcon,
    textAboveLblGoldAboveBtnSummonx1BoM_sbc,
    btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc,
    lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc,
    rightGoldIcon, textLblGold10pOffBoM_sbc,
    bannerGBoM_sbc, textBannerGBoM_sbc, backgroundGBoM_sbc, gBoM_sbc,
    btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc,
    lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc,
    leftDiamondIcon,
    textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
    btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc,
    lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc,
    rightDiamondIcon, textLblGold10pOffGBoM_sbc
  );
  setBarContainer(summonBooksContainer);
  addBackIcon(summonBooksContainer);

  socket.on('summonBooksData', (data) => {

    textBannerBoM_sbc.text = data.bookOfMagic;
    textBannerBoM_sbc.position.set(
      setMiddlePos(bannerBoM_sbc, textBannerBoM_sbc).x,
      setMiddlePos(bannerBoM_sbc, textBannerBoM_sbc).y-8//200
    );

    textBannerGBoM_sbc.text = data.grandBookOfMagic;
    textBannerGBoM_sbc.position.set(
      setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).x,
      setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).y-8//200
    );

    textBtnSummonx1BoM_sbc.text = data.summonx1;
    textBtnSummonx1BoM_sbc.position.set(
      setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).x,
      setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).y
    );

    textLblGoldAboveBtnSummonx1BoM_sbc.text = data.free; // Free or 10000
    textLblGoldAboveBtnSummonx1BoM_sbc.position.set(
      setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).y+2
    );

    textAboveLblGoldAboveBtnSummonx1BoM_sbc.text = data.freeTimes+freeCounter+data.maxFreeSummon;
    textAboveLblGoldAboveBtnSummonx1BoM_sbc.position.set(
      setMiddlePos(btnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc).x,
      720,
    );

    textBtnSummonx10BoM_sbc.text = data.summonx10;
    textBtnSummonx10BoM_sbc.position.set(
      setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).x,
      setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).y
    );

    textLblGoldAboveBtnSummonx10BoM_sbc.text = data.gold10more;
    textLblGoldAboveBtnSummonx10BoM_sbc.position.set(
      setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).y+2
    );

    textLblGold10pOffBoM_sbc.text = data.discount10off;
    textLblGold10pOffBoM_sbc.position.set(
      lblGoldAboveBtnSummonx10BoM_sbc.x+lblGoldAboveBtnSummonx10BoM_sbc.width-textLblGold10pOffBoM_sbc.width-4,
      setMiddlePos(textLblGoldAboveBtnSummonx10BoM_sbc, textLblGold10pOffBoM_sbc).y
    );

    textBtnSummonx1GBoM_sbc.text = data.summonx1;
    textBtnSummonx1GBoM_sbc.position.set(
      setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).x,
      setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).y
    );

    textLblGoldAboveBtnSummonx1GBoM_sbc.text = data.free; // Free or 288
    textLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
      setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).y+2
    );

    textAboveLblGoldAboveBtnSummonx1GBoM_sbc.text = data.freeTime;
    textAboveLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
      setMiddlePos(btnSummonx1GBoM_sbc, textAboveLblGoldAboveBtnSummonx1GBoM_sbc).x,
      720,
    );

    textBtnSummonx10GBoM_sbc.text = data.summonx10;
    textBtnSummonx10GBoM_sbc.position.set(
      setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).x,
      setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).y
    );

    textLblGoldAboveBtnSummonx10GBoM_sbc.text = data.diamond10more;
    textLblGoldAboveBtnSummonx10GBoM_sbc.position.set(
      setMiddlePos(btnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).y+2
    );

    textLblGold10pOffGBoM_sbc.text = data.discount10off;
    textLblGold10pOffGBoM_sbc.position.set(
      lblGoldAboveBtnSummonx10GBoM_sbc.x+lblGoldAboveBtnSummonx10GBoM_sbc.width-textLblGold10pOffGBoM_sbc.width-4,
      setMiddlePos(textLblGoldAboveBtnSummonx10GBoM_sbc, textLblGold10pOffGBoM_sbc).y
    );
  });

  stage.addChild(summonBooksContainer);

  setInteractive(btnSummonx1BoM_sbc, true);
  if (btnSummonx1BoM_sbc.interactive) {
    btnSummonx1BoM_sbc.on('pointerup', () => {
      console.log('btnSummonx1BoM_sbc clicked');
      socket.emit('summonx1BoM', 'summonx1BoMClicked');
      setSummonContainer();
    });
  }

  setInteractive(btnSummonx1GBoM_sbc, true);
  if (btnSummonx1GBoM_sbc.interactive) {
    btnSummonx1GBoM_sbc.on('pointerup', () => {
      console.log('btnSummonx1GBoM_sbc clicked');
      socket.emit('summonx1GBoM', 'summonx1GBoMClicked');
      setSummonContainer();
    });
  }
}

// Setup summonContainer (when player click on 'Summon ×1 (×10)' button this screen is shown)
function setSummonContainer() {
  summonContainer = new Container();

  setInteractive(btnSummonx1BoM_sbc, false);
  setInteractive(btnSummonx1GBoM_sbc, false);

  let backgroundEmpty_suc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_suc.position.set(0, 0);

  let backgroundDarker_suc = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker_suc.position.set(0, 0);

  let summoningBook_suc = new Sprite(resources[summoningBookPath].texture);
  summoningBook_suc.position.set(GAME_WIDTH/2-summoningBook_suc.width/2, -56);

  let banner_suc = new Sprite(resources[banner620x98Path].texture);
  banner_suc.position.set(GAME_WIDTH/2-banner_suc.width/2, 48);

  let textBanner_suc = new Text('', textStyleLevel_40_white);

  let btn10More_suc = new Sprite(resources[btnGreen260x72Path].texture);
  btn10More_suc.position.set(620, 960);

  let textBtn10More_suc = new Text('', textStyle_32center_black);
  textBtn10More_suc.position.set(
    setMiddlePos(btn10More_suc, textBtn10More_suc).x,
    setMiddlePos(btn10More_suc, textBtn10More_suc).y
  );

  let lblLeft_suc = new Sprite(resources[lblSummonPath].texture);
  lblLeft_suc.position.set(
    284,
    setMiddlePos(btn10More_suc, lblLeft_suc).y
  );

  let goldIcon10More = new Sprite(resources[goldIconPath].texture);
  goldIcon10More.position.set(272, lblLeft_suc.y-13);

  let diamondIcon10More = new Sprite(resources[diamondIconPath].texture);

  let textLblLeft_suc = new Text('', textStyle_32center_black);

  let btn1More_suc = new Sprite(resources[btnGreen260x72Path].texture);
  btn1More_suc.position.set(1376, 960);

  let textBtn1More_suc = new Text('', textStyle_32center_black);

  let lblRight_suc = new Sprite(resources[lblSummonPath].texture);
  lblRight_suc.position.set(
    1040,
    setMiddlePos(btn1More_suc, lblRight_suc).y
  );

  let goldIcon1More = new Sprite(resources[goldIconPath].texture);
  goldIcon1More.position.set(1028, lblRight_suc.y-13);

  let diamondIcon1More = new Sprite(resources[diamondIconPath].texture);

  let textLblRight_suc = new Text('', textStyle_32center_black);

  summoningItem_suc = new Sprite(resources[leryssaSummonIconPath].texture);
  summoningItem_suc.position.set(
    GAME_WIDTH/2-summoningItem_suc.width/2,
    GAME_HEIGHT/2-summoningItem_suc.height/2-48
  );

  summonContainer.addChild(
    backgroundEmpty_suc, backgroundDarker_suc,
    summoningBook_suc, banner_suc, textBanner_suc,
    lblLeft_suc, textLblLeft_suc, goldIcon10More,
    btn10More_suc, textBtn10More_suc,
    lblRight_suc, textLblRight_suc, goldIcon1More,
    btn1More_suc, textBtn1More_suc
  );
  addBackIcon(summonContainer);

  socket.on('summonx1BoMData', (data) => {
    console.log('summonx1BoMData', data);

    textBanner_suc.text = data.bookOfMagic;
    textBanner_suc.position.set(
      setMiddlePos(banner_suc, textBanner_suc).x,
      setMiddlePos(banner_suc, textBanner_suc).y-8
    );

    textBtn1More_suc.text = data.more1;
    textBtn1More_suc.position.set(
      setMiddlePos(btn1More_suc, textBtn1More_suc).x,
      setMiddlePos(btn1More_suc, textBtn1More_suc).y
    );

    textBtn10More_suc.text = data.more10;
    textBtn10More_suc.position.set(
      setMiddlePos(btn10More_suc, textBtn10More_suc).x,
      setMiddlePos(btn10More_suc, textBtn10More_suc).y
    );

    textLblLeft_suc.text = data.gold10more;
    textLblLeft_suc.position.set(
      setMiddlePos(lblLeft_suc, textLblLeft_suc).x,
      setMiddlePos(lblLeft_suc, textLblLeft_suc).y
    );

    textLblRight_suc.text = data.gold1more;
    textLblRight_suc.position.set(
      setMiddlePos(lblRight_suc, textLblRight_suc).x,
      setMiddlePos(lblRight_suc, textLblRight_suc).y
    );
  });

  socket.on('summonx1GBoMData', (data) => {
    console.log('summonx1GBoMData', data);

    goldIcon10More.texture = diamondIcon10More.texture;
    goldIcon1More.texture = diamondIcon1More.texture;

    textBanner_suc.text = data.grandBookOfMagic;
    textBanner_suc.position.set(
      setMiddlePos(banner_suc, textBanner_suc).x,
      setMiddlePos(banner_suc, textBanner_suc).y-8
    );

    textBtn1More_suc.text = data.more1;
    textBtn1More_suc.position.set(
      setMiddlePos(btn1More_suc, textBtn1More_suc).x,
      setMiddlePos(btn1More_suc, textBtn1More_suc).y
    );

    textBtn10More_suc.text = data.more10;
    textBtn10More_suc.position.set(
      setMiddlePos(btn10More_suc, textBtn10More_suc).x,
      setMiddlePos(btn10More_suc, textBtn10More_suc).y
    );

    textLblLeft_suc.text = data.diamond10more;
    textLblLeft_suc.position.set(
      setMiddlePos(lblLeft_suc, textLblLeft_suc).x,
      setMiddlePos(lblLeft_suc, textLblLeft_suc).y
    );

    textLblRight_suc.text = data.diamond1more;
    textLblRight_suc.position.set(
      setMiddlePos(lblRight_suc, textLblRight_suc).x,
      setMiddlePos(lblRight_suc, textLblRight_suc).y
    );
  });

  stage.addChild(summonContainer);
}

let i = 1;
let sinNotSummon;

// Setup summonContainer (when player click on 'Summon ×1 (×10)' button this screen is shown)
function setHeroesContainer() {
  heroesContainer = new Container();

  socket.emit('heroesContainer', 'setHeroesContainer');

  setBookBackground(heroesContainer);
  setBarContainer(heroesContainer);
  setScrollArrowHeroes(heroesContainer);
  addArrows(heroesContainer);

  setInteractive(avatarContainer, false);
  setInteractive(summonBooks_mac, false);
  // setInteractive(heroes_sc, false);
  // setInteractive(battleContainer, false);

  addBookmark(heroesContainer, 456, 944, allIconPath);
  addBookmark(heroesContainer, 576, 944, tankIconPath);
  addBookmark(heroesContainer, 696, 944, fighterIconPath);
  addBookmark(heroesContainer, 1140, 944, marksmanIconPath);
  addBookmark(heroesContainer, 1260, 944, mageIconPath);
  addBookmark(heroesContainer, 1380, 944, supportIconPath);

  socket.on('heroesContainerData', (data) => {
    console.log('heroesContainerData\n', data);

    let x = 332;
    let y = 205;
    let l = 8;
    let len = data.heroesMsg.length;
    console.log(i);
    let page = 1;
    let sumPages = 1;
    let min = 0;
    let mod = 0;

    let heroesNames = [];

    for (let i = 0; i < len; i++) {
      // console.log(data.heroesMsg[i].name);
      heroesNames.push(data.heroesMsg[i].name);
    }
    console.log('heroesNames', heroesNames);

    for (let i = 0; i < heroesNames.length; i++) {
      switch (heroesNames[i]) {
        case 'Aelois':
          // console.log(i, heroesNames[i]);
          addHeroPortrait(heroesContainer, aeloisPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Amara':
          addHeroPortrait(heroesContainer, amaraPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Crystal':
          addHeroPortrait(heroesContainer, crystalPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Diu Win':
          addHeroPortrait(heroesContainer, diuwinPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Leona':
          addHeroPortrait(heroesContainer, leonaPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Leryssa':
          addHeroPortrait(heroesContainer, leryssaPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Nadia':
          addHeroPortrait(heroesContainer, nadiaPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Nyx':
          addHeroPortrait(heroesContainer, nyxPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Sin':
          addHeroPortrait(heroesContainer, sinPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Zalajin':
          addHeroPortrait(heroesContainer, zalajinPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
        case 'Zaya':
          addHeroPortrait(heroesContainer, zayaPath, i, data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned);
          break;
      }
    }

  });

  // heroesContainer.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);

  addBackIconHeroes(heroesContainer);

  // if (i === 2) {
  //   console.log('image already in scene');
  //   heroesContainer.addChild(sinNotSummon);
  // } else if (i === 1) {
  //   const myLoader = PIXI.loader;
  //   myLoader
  //     .add('sinNotSummon', '/images/game/heroes/sin/sin.png');
  //
  //   myLoader
  //     .on('complete', (loader, resources) => {
  //       sinNotSummon = new Sprite(myLoader.resources.sinNotSummon.texture);
  //       heroesContainer.addChild(sinNotSummon);
  //     });
  //
  //   myLoader
  //     .load();
  //   i = 2;
  //   // console.log('i:', i);
  // }

  stage.addChild(heroesContainer);
  console.log('heroes:\n', stage.children);
}

// Add hero portrait to the 'heroes screen' (after 'Heroes' clicked from scrollmenu)
function addHeroPortrait(container, heroNamePath, i, starCount, summoned) { // 332, 205 (195)
  const l = 8;

  let border = new Sprite(resources[borderGreyPath].texture);
  border.width = 278;
  border.height = 332;

  switch (i%l) {
    case 0:
      border.position.set(332, 205);
      break;
    case 1:
      border.position.set(634, 205);
      break;
    case 2:
      border.position.set(332, 561);
      break;
    case 3:
    border.position.set(634, 561);
      break;
    case 4:
      border.position.set(1008, 205);
      break;
    case 5:
      border.position.set(1310, 205);
      break;
    case 6:
      border.position.set(1008, 561);
      break;
    case 7:
      border.position.set(1310, 561);
      break;
  }
  setInteractive(border, true);

  let hero = new Sprite(resources[heroNamePath].texture);
  // hero.scale.set(0.8);
  hero.position.set(
    setMiddlePos(border, hero).x,
    setMiddlePos(border, hero).y
  );

  container.addChild(hero);

  let banner = new Sprite(resources[banner620x98GreyPath].texture);
  banner.width = 256;
  banner.height = 40;
  banner.position.set(
    setMiddlePos(border, banner).x,
    border.y+border.height-116
  );

  function addGlyphIcon(spritePath, offsetX) {
    let glyph = new Sprite(resources[spritePath].texture);
    glyph.position.set(
      setMiddlePos(border, glyph).x+offsetX,
      border.y+border.height-72
    );

    container.addChild(glyph);
  }

  if (summoned === 'yes') {
    addGlyphIcon(noGlyphIconPath, -28);
    addGlyphIcon(noGlyphIconPath, -84);
    addGlyphIcon(noGlyphIconPath, 28);
    addGlyphIcon(noGlyphIconPath, 84);
  }

  function addPageCounter() {
    let pageIcon = new Sprite(resources[pageIconPath].texture);
    pageIcon.scale.set(0.5);
    pageIcon.position.set(
      setMiddlePos(border, pageIcon).x-78,
      border.y+border.height-60
    );

    let barBackground = new Sprite(resources[expBackgroundPath].texture);
    barBackground.width = 152;
    barBackground.height = 28;
    barBackground.position.set(
      pageIcon.x+pageIcon.width,
      pageIcon.y
    );

    container.addChild(pageIcon, barBackground);
  }

  if (summoned === 'no') {
    addPageCounter();
  }

  function addStarIcon(offsetX) {
    let star = new Sprite(resources[starIconPath].texture);
    star.width = 24;
    star.height = 22;
    star.position.set(
      setMiddlePos(border, star).x+offsetX,
      border.y+border.height-141
    );

    container.addChild(star);
  }

  // let starCounter = starCount;

  switch (starCount) {
    case 2:
      addStarIcon(-13);
      addStarIcon(13);
      break;
    case 3:
      addStarIcon(-30);
      addStarIcon(0);
      addStarIcon(30);
      break;
    case 4:
      addStarIcon(-43);
      addStarIcon(-13);
      addStarIcon(13);
      addStarIcon(43);
      break;
    case 5:
      addStarIcon(-60);
      addStarIcon(-30);
      addStarIcon(0);
      addStarIcon(30);
      addStarIcon(60);
      break;
    default:
      addStarIcon(0);
  }

  container.addChild(border, banner);
}

// Add left and right arrow
function addArrows(container) {
  let leftArrow = new Sprite(resources[leftArrowIconPath].texture);
  leftArrow.position.set(36, 640);
  setInteractive(leftArrow, true);

  let rightArrow = new Sprite(resources[rightArrowIconPath].texture);
  rightArrow.position.set(1796, 640);
  setInteractive(rightArrow, true);

  container.addChild(leftArrow, rightArrow);
}

// Add bookmark to 'heroes' screen
function addBookmark(container, posX, posY, bookmarkIcon) {
  let bookmark = new Sprite(resources[bookmarkIconPath].texture);
  bookmark.position.set(posX, posY);

  let icon = new Sprite(resources[bookmarkIcon].texture);
  icon.position.set(
    setMiddlePos(bookmark, icon).x,
    setMiddlePos(bookmark, icon).y
  );

  container.addChild(bookmark, icon);
}
