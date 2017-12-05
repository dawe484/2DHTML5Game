'use strict';

const WebFont = require('webfontloader');
const PIXI = require('pixi.js');
const Hammer = require('hammerjs');

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
      plusIconPath = `${iconsFolderPath}plus_icon${png}`,
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
      starBackgroundPath = `${backgroundsFolderPath}star_background${png}`,
      expBackgroundPath = `${backgroundsFolderPath}exp_pages_power_background${png}`,
      pageIconPath = `${iconsFolderPath}page_icon${png}`,
      heroUpperBackgroundPath = `${backgroundsFolderPath}hero_upper_background${png}`,
      heroBottomBackgroundPath = `${backgroundsFolderPath}hero_bottom_background${png}`,
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
      aeloisPath = `${heroesFolderPath}aelois/aelois${png}`,
      amaraPath = `${heroesFolderPath}amara/amara${png}`,
      crystalPath = `${heroesFolderPath}crystal/crystal${png}`,
      diuwinPath = `${heroesFolderPath}diuwin/diuwin${png}`,
      leonaPath = `${heroesFolderPath}leona/leona${png}`,
      leryssaPath = `${heroesFolderPath}leryssa/leryssa${png}`,
      nadiaPath = `${heroesFolderPath}nadia/nadia${png}`,
      nyxPath = `${heroesFolderPath}nyx/nyx${png}`,
      sinPath = `${heroesFolderPath}sin/sin${png}`,
      zalajinPath = `${heroesFolderPath}zalajin/zalajin${png}`,
      zayaPath = `${heroesFolderPath}zaya/zaya${png}`,
      // ------------------------ Heroes Stats ---------------------------------
      aeloisStatsPath = `${heroesFolderPath}aelois/aelois_stats${png}`,
      amaraStatsPath = `${heroesFolderPath}amara/amara_stats${png}`,
      crystalStatsPath = `${heroesFolderPath}crystal/crystal_stats${png}`,
      diuwinStatsPath = `${heroesFolderPath}diuwin/diuwin_stats${png}`,
      leonaStatsPath = `${heroesFolderPath}leona/leona_stats${png}`,
      leryssaStatsPath = `${heroesFolderPath}leryssa/leryssa_stats${png}`,
      nadiaStatsPath = `${heroesFolderPath}nadia/nadia_stats${png}`,
      nyxStatsPath = `${heroesFolderPath}nyx/nyx_stats${png}`,
      sinStatsPath = `${heroesFolderPath}sin/sin_stats${png}`,
      zalajinStatsPath = `${heroesFolderPath}zalajin/zalajin_stats${png}`,
      zayaStatsPath = `${heroesFolderPath}zaya/zaya_stats${png}`,
      // -----------------------------------------------------------------------
      plusGreenIconPath = `${iconsFolderPath}plus_green_icon${png}`,
      plusOrangeIconPath = `${iconsFolderPath}plus_orange_icon${png}`,
      skillBackgroundPath = `${backgroundsFolderPath}skill_background${png}`,
      skillLabelPath = `${labelsFolderPath}skill_label${png}`,
      statsUpperBackgroundPath = `${backgroundsFolderPath}stats_upper_background${png}`,
      statsBottomBackgroundPath = `${backgroundsFolderPath}stats_bottom_background${png}`,
      statsGreyLabelPath = `${labelsFolderPath}stats_grey_label${png}`,
      statsWhiteLabelPath = `${labelsFolderPath}stats_white_label${png}`,
      statsBackgroundPath = `${backgroundsFolderPath}stats_background${png}`
      ;

// Global variables
let renderer, stage, stats,
    // btnPurple248x80,
    storyTutorialContainer, tutorialContainer,
    mainScreenContainer, mainScreenIconsContainer, barContainer,
    avatarContainer, avatarScreenContainer, avatarChangeNameContainer,
    scrollContainer, battleContainer, marketsContainer,
    summonBooksContainer, summonContainer,
    heroesContainer, heroesPortraitContainer;

let freeCounter;

// Define Textstyle variables
let textStyleBtn80_48_black, textStyleBubble_52_white, textStyle144_40_black,
  textStyleLevel_40_white, textStyleAvatar_28, textStyle_32left_black, textStyle_32center_black,
  textStyle_32right_black, textStyle10pOff, textStyleHeroStats_28left_black,
  textStyleHeroStatsLevel_32left_white;

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
let scrollArrow72x36;

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
          borderBluePlus1Path, borderBluePlus2Path, starIconPath, pedestalPath, starBackgroundPath,
          expBackgroundPath, pageIconPath, heroUpperBackgroundPath, heroBottomBackgroundPath,
          equipIconPath, equipIconSelectedPath, glyphsIconPath, glyphsIconSelectedPath,
          skillsIconPath, skillsIconSelectedPath, statsIconPath, statsIconSelectedPath,
          awakenIconPath, awakenIconBackgroundPath, nextGlyphsIconPath, helpIconPath,
          // Heroes
          aeloisPath, amaraPath, crystalPath, diuwinPath, leonaPath, leryssaPath,
          nadiaPath, nyxPath, sinPath, zalajinPath, zayaPath,
          // Heroes Stats
          aeloisStatsPath, amaraStatsPath, crystalStatsPath, diuwinStatsPath, leonaStatsPath, leryssaStatsPath,
          nadiaStatsPath, nyxStatsPath, sinStatsPath, zalajinStatsPath, zayaStatsPath,
          // ---------------------
          skillBackgroundPath, skillLabelPath, statsUpperBackgroundPath, statsBottomBackgroundPath,
          statsGreyLabelPath, statsWhiteLabelPath, statsBackgroundPath
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

    textStyleHeroStats_28left_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 28,
      align: 'left',
      fill: '#000'
    });

    textStyleHeroStatsLevel_32left_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'left',
      fill: '#fff'
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
  closeIcon.width = 96;
  closeIcon.height = 96;
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

  scrollArrow72x36 = new Sprite(resources[scrollArrow72x36Path].texture);
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
    // console.log('before remove', container.children);
    stage.removeChild(container);
    scrollArrow72x36_mc.scale.y = -1;
    mainScreenContainer.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
    // console.log(stage.children);
    // console.log(stage.children.length);
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
  plusBarEnergy_bc.width = plusBarEnergy_bc.height = 56;
  plusBarEnergy_bc.position.set(728, 36);

  let textBarEnergy_bc = new Text('', textStyleLevel_40_white);

  let barBackgroundGold_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundGold_bc.position.set(804, 36);

  let plusGold_bc = new Sprite(resources[plusIconPath].texture);
  plusGold_bc.width = plusGold_bc.height = 56;
  plusGold_bc.position.set(1060, 36);

  let goldIcon_bc = new Sprite(resources[goldIconPath].texture);
  goldIcon_bc.position.set(796, 30);

  let textBarGold_bc = new Text('', textStyleLevel_40_white);

  let barBackgroundDiamond_bc = new Sprite(resources[barBackgroundPath].texture);
  barBackgroundDiamond_bc.position.set(1136, 36);

  let plusDiamond_bc = new Sprite(resources[plusIconPath].texture);
  plusDiamond_bc.width = plusDiamond_bc.height = 56;
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
      console.log('stage.children.length', stage.children.length);
      if (stage.children.length === 2) {
        console.log(heroesContainer.children[heroesContainer.children.length-1]);
        scrollArrow72x36.scale.y = -1;
        heroesContainer.removeChild(heroesContainer.children[heroesContainer.children.length-1]);
      }
      if (stage.children.length === 1) {
        setHeroesContainer();
      }
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

// let i = 1;
// let sinNotSummon;
const portraitsPerPage = 8;
// let sumPages = 0;
// let currentPage = 0;

// Setup summonContainer (when player click on 'Summon ×1 (×10)' button this screen is shown)
function setHeroesContainer() {
  heroesContainer = new Container();

  socket.emit('heroesContainer', 'setHeroesContainer');

  setBookBackground(heroesContainer);
  setBarContainer(heroesContainer);
  setScrollArrowHeroes(heroesContainer);

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

  setHeroesPortraitContainer();

  addArrows(heroesContainer);

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

let numberOfHeroes;

// Setup hero's portraits in heroesContainer
function setHeroesPortraitContainer() {
  heroesPortraitContainer = new Container();

  socket.on('heroesContainerData', (data) => {
    console.log('heroesContainerData\n', data);

    let heroesNames = [];
    let bookPages = [];
    let sumPages = 0;

    numberOfHeroes = data.heroesMsg.length;

    for (let i = 0; i < data.heroesMsg.length; i++) {
      // console.log(data.heroesMsg[i].name);
      heroesNames.push(data.heroesMsg[i].name);
      // console.log('i', i);
      if (i < portraitsPerPage) {
        bookPages[i] = 0;
        // console.log('bookPages[i]', i, ':', bookPages[i]);
      } else if (i > portraitsPerPage-1 && i < 2*portraitsPerPage) {
        bookPages[i] = 1;
        sumPages = 1;
      } else if (i > 2*portraitsPerPage-1 && i < 3*portraitsPerPage) {
        bookPages[i] = 2;
        sumPages = 2;
      }
    }

    // console.log('heroesNames', heroesNames);
    // console.log('bookPages', bookPages);
    // console.log('sumPages', sumPages);

    function heroNotSummon(urlName, i) {
      const myLoader = PIXI.loader;
      let heroNotSummonPath = `/images/game/heroes/${urlName}/${urlName}_stats_grey.png`;

      if (heroNotSummonPath in loader.resources) {
        console.log('already in stage');
        addHeroPortrait(heroNotSummonPath, i, bookPages[i],
          data.heroesMsg[i].urlName,
          data.heroesMsg[i].color,
          data.heroesMsg[i].stars,
          data.heroesMsg[i].summoned
        );
      } else {
        loader
          .add(heroNotSummonPath);
      }

      loader
        .on('complete', (loader, resources) => {
          addHeroPortrait(heroNotSummonPath, i, bookPages[i],
            data.heroesMsg[i].urlName,
            data.heroesMsg[i].color,
            data.heroesMsg[i].stars,
            data.heroesMsg[i].summoned
          );
        });
      // console.log('resources', loader.resources);
    }

    for (let i = 0; i < heroesNames.length; i++) {
      switch (heroesNames[i]) {
        case 'Aelois':
          // console.log(i, heroesNames[i]);
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(aeloisStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Amara':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(amaraStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Crystal':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(crystalStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Diu Win':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(diuwinStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Leona':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(leonaStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Leryssa':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(leryssaStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Nadia':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(nadiaStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Nyx':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(nyxStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Sin':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(sinStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Zalajin':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(zalajinStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
        case 'Zaya':
          if (data.heroesMsg[i].summoned === 'no') {
            heroNotSummon(data.heroesMsg[i].urlName, i);
          }
          if (data.heroesMsg[i].summoned === 'yes') {
            addHeroPortrait(zayaStatsPath, i, bookPages[i],
              data.heroesMsg[i].urlName,
              data.heroesMsg[i].color,
              data.heroesMsg[i].stars,
              data.heroesMsg[i].summoned
            );
          }
          break;
      }
    }
    // socket.removeAllListeners();
    socket.off('heroesContainerData');
  });

  // heroesPortraitContainer.position.x = 0;
  heroesContainer.addChild(heroesPortraitContainer);
}

let heroIconClicked = 'glyphs';

function selectBorder(border, color) {
  // let border = new Sprite(resources[borderGreyPath].texture);

  let borderGreen = new Sprite(resources[borderGreenPath].texture);
  let borderGreenPlus1 = new Sprite(resources[borderGreenPlus1Path].texture);
  let borderBlue = new Sprite(resources[borderBluePath].texture);
  let borderBluePlus1 = new Sprite(resources[borderBluePlus1Path].texture);
  let borderBluePlus2 = new Sprite(resources[borderBluePlus2Path].texture);

  // console.log('color', color);

  switch (color) {
    case 'Green':
      border.texture = borderGreen.texture;
      break;
    case 'Green +1':
      border.texture = borderGreenPlus1.texture;
      break;
    case 'Blue':
      border.texture = borderBlue.texture;
      break;
    case 'Blue +1':
      border.texture = borderBluePlus1.texture;
      break;
    case 'Blue +2':
      border.texture = borderBluePlus2.texture;
      break;
  }
}

function selectClass(classIcon, textClass) {

  let tankIcon = new Sprite(resources[tankIconPath].texture);
  let fighterIcon = new Sprite(resources[fighterIconPath].texture);
  let marksmanIcon = new Sprite(resources[marksmanIconPath].texture);
  let mageIcon = new Sprite(resources[mageIconPath].texture);
  let supportIcon = new Sprite(resources[supportIconPath].texture);

  switch (textClass) {
    case 'Tank':
      classIcon.texture = tankIcon.texture;
      break;
    case 'Fighter':
      classIcon.texture = fighterIcon.texture;
      break;
    case 'Marksman':
      classIcon.texture = marksmanIcon.texture;
      break;
    case 'Mage':
      classIcon.texture = mageIcon.texture;
      break;
    case 'Support':
      classIcon.texture = supportIcon.texture;
      break;
  }
}

// Add hero portrait to the 'heroes screen' (after 'Heroes' clicked from scrollmenu)
function addHeroPortrait(heroNamePath, i, bPi, urlName, color, starCount, summoned) { // 332, 205 (195)

  let heroPortraitContainer = new Container();

  let border = new Sprite(resources[borderGreyPath].texture);
  selectBorder(border, color);

  border.width = 278;
  border.height = 332;

  switch (i%portraitsPerPage) {
    case 0:
      border.position.set(1920*bPi+332, 205);
      break;
    case 1:
      border.position.set(1920*bPi+634, 205);
      break;
    case 2:
      border.position.set(1920*bPi+332, 561);
      break;
    case 3:
    border.position.set(1920*bPi+634, 561);
      break;
    case 4:
      border.position.set(1920*bPi+1008, 205);
      break;
    case 5:
      border.position.set(1920*bPi+1310, 205);
      break;
    case 6:
      border.position.set(1920*bPi+1008, 561);
      break;
    case 7:
      border.position.set(1920*bPi+1310, 561);
      break;
  }
  setInteractive(border, true);

  border.on('pointerup', () => {
    if (summoned === 'yes') {
      console.log('you clicked on', urlName, 'portrait');
      setHeroContainer(urlName, heroIconClicked);
    } else if (summoned === 'no') {
      console.log(urlName, 'not summoned yet.');
    }
  });

  let hero = new Sprite(resources[heroNamePath].texture);
  // console.log(heroNamePath);
  let grey = new RegExp('\_grey');
  // console.log(grey.test(heroNamePath));
  if (!grey.test(heroNamePath)) {
    hero.scale.set(0.5);
  }
  hero.position.set(
    setMiddlePos(border, hero).x,
    setMiddlePos(border, hero).y
  );

  heroPortraitContainer.addChild(hero);

  let banner = new Sprite(resources[banner620x98GreyPath].texture);
  banner.width = 256;
  banner.height = 40;
  banner.position.set(
    setMiddlePos(border, banner).x,
    border.y+border.height-116
  );

  // TODO: pridat ikony dle tridy hrdiny (tank, support, ...)

  function addGlyphIcon(spritePath, offsetX) {
    let glyph = new Sprite(resources[spritePath].texture);
    glyph.width = glyph.height = 48;
    glyph.position.set(
      setMiddlePos(border, glyph).x+offsetX,
      border.y+border.height-72
    );

    heroPortraitContainer.addChild(glyph);
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

    heroPortraitContainer.addChild(pageIcon, barBackground);
  }

  function addStarIcon(offsetX) {
    let star = new Sprite(resources[starIconPath].texture);
    star.width = 24;
    star.height = 22;
    star.position.set(
      setMiddlePos(border, star).x+offsetX,
      border.y+border.height-141
    );

    heroPortraitContainer.addChild(star);
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

  if (summoned === 'yes') {
    addGlyphIcon(noGlyphIconPath, -28);
    addGlyphIcon(noGlyphIconPath, -84);
    addGlyphIcon(noGlyphIconPath, 28);
    addGlyphIcon(noGlyphIconPath, 84);
  } else if (summoned === 'no') {
    addPageCounter();
  }

  heroPortraitContainer.addChild(border, banner);
  // console.log('delka:', heroesPortraitContainer.children.length);
  // console.log('i', i);
  // console.log('numberOfHeroes', numberOfHeroes);
  if (heroesPortraitContainer.children.length < numberOfHeroes) {
    heroesPortraitContainer.addChild(heroPortraitContainer);
  }
}

function disableHeroPortraitsInteraction() {
  for (let i = 0; i < stage.children[1].children[18].children.length; i++) {
    let borderIndex = stage.children[1].children[18].children[i].children.length;
    // console.log('borderIndex', borderIndex);
    setInteractive(stage.children[1].children[18].children[i].children[borderIndex-2], false);
  }
}

// Add close icon (button) to the heroContainer
function addHeroBtnClose(container) {
  let btnClose = new Sprite(resources[btnClosePath].texture);
  btnClose.position.set(GAME_WIDTH-36-btnClose.width, 36);
  setInteractive(btnClose, true);

  container.addChild(btnClose);

  btnClose.on('pointerup', () => {
    console.log('hero close clicked');
    stage.removeChild(stage.children[stage.children.length-1]);
    setTimeout(() => {
      setInteractive(stage.children[1].children[20], true); // rightArrow interactive -> true
      setInteractive(stage.children[1].children[21], true); // back button interactive -> true
      setInteractive(scrollArrow72x36, true);
      for (let i = 0; i < stage.children[1].children[18].children.length; i++) {
        let borderIndex = stage.children[1].children[18].children[i].children.length;
        // console.log('borderIndex', borderIndex);
        setInteractive(stage.children[1].children[18].children[i].children[borderIndex-2], true);
      }
    }, LATENCY);
  });
}

// Stats part of Hero screen
function addStatsContainer(container, heroName) {
  let statsContainer = new Container();
  console.log('heroName from statsContainer', heroName);

  socket.emit('heroContainer', heroName);

  let statsBackground = new Sprite(resources[statsBackgroundPath].texture);
  statsBackground.position.set(1008, 205);

  let banner = new Sprite(resources[banner620x98Path].texture);
  banner.width = 476;
  banner.height = 76;
  banner.position.set(344+(556/2-banner.width/2), 780);

  let textBanner = new Text('', textStyleLevel_40_white);

  let textLevel = new Text('', textStyleHeroStatsLevel_32left_white);
  textLevel.position.set(452, 794);

  let classIcon = new Sprite(resources[allIconPath].texture);

  function addHeroSprite(heroSpritePath) {
    let heroSprite = new Sprite(resources[heroSpritePath].texture);
    heroSprite.position.set(344, 217);

    statsContainer.addChild(heroSprite, banner, textBanner, textLevel, classIcon);
  }

  switch (heroName) {
    case 'aelois':
      addHeroSprite(aeloisStatsPath);
      break;
    case 'amara':
      addHeroSprite(amaraStatsPath);
      break;
    case 'crystal':
      addHeroSprite(crystalStatsPath);
      break;
    case 'diuwin':
      addHeroSprite(diuwinStatsPath);
      break;
    case 'leona':
      addHeroSprite(leonaStatsPath);
      break;
    case 'leryssa':
      addHeroSprite(leryssaStatsPath);
      break;
    case 'nadia':
      addHeroSprite(nadiaStatsPath);
      break;
    case 'nyx':
      addHeroSprite(nyxStatsPath);
      break;
    case 'sin':
      addHeroSprite(sinStatsPath);
      break;
    case 'zalajin':
      addHeroSprite(zalajinStatsPath);
      break;
    case 'zaya':
      addHeroSprite(zayaStatsPath);
      break;
  }

  function addStarIcon(offsetX) {
    let star = new Sprite(resources[starIconPath].texture);
    star.position.set(
      setMiddlePos(banner, star).x+offsetX,
      736
    );

    statsContainer.addChild(star);
  }

  let statsUpperBackground = new Sprite(resources[statsUpperBackgroundPath].texture);
  statsUpperBackground.position.set(1032, 229);

  let statsBottomBackgroundContainer = new Container();
  statsBottomBackgroundContainer.x = 1044;
  statsBottomBackgroundContainer.y = 412;
  // statsBottomBackgroundContainer.width = 508;
  // statsBottomBackgroundContainer.height = 254;
  statsBottomBackgroundContainer.interactive = true;
  statsBottomBackgroundContainer.buttonMode = true;
  // statsBottomBackgroundContainer.anchor.set(0.5);

  let statsBottomBackground = new Sprite(resources[statsBottomBackgroundPath].texture);
  statsBottomBackground.position.set(1032, 399); // 1032, 399

  let textStatsUpperBackground = new Text('', textStyleHeroStats_28left_black);

  // let textStatsBottomBackground = new Text('', textStyleHeroStats_28left_black);

  let textPowerBar = new Text('Power: ', textStyleLevel_40_white);
  textPowerBar.position.set(
    setMiddlePos(statsUpperBackground, textPowerBar).x,
    692
  );

  socket.emit('stats', '');

  //
  function addGreyLabel(i, atribute, value) {
    let statsLabel;
    let maxY = statsBottomBackground.y+statsBottomBackground.height;

    if (i%2 === 0) {
      statsLabel = new Sprite(resources[statsGreyLabelPath].texture);
    } else if (i%2 === 1) {
      statsLabel = new Sprite(resources[statsWhiteLabelPath].texture);
    }

    statsLabel.position.set(0, i*statsLabel.height);
    // console.log('statsLabel:', statsLabel.x, statsLabel.y);

    statsBottomBackgroundContainer.addChild(statsLabel);

    let textStats = new Text('', textStyleHeroStats_28left_black);
    let valueStats = new Text('', textStyleHeroStats_28left_black);

    socket.on('statsData', (data) => {
      // console.log('statsData', data);
      switch (atribute) {
        case 'health':
          textStats.text = data.health;
          break;
        case 'attackDamage':
          textStats.text = data.attackDamage;
          break;
        case 'abilityPower':
          textStats.text = data.abilityPower;
          break;
        case 'armor':
          textStats.text = data.armor;
          break;
        case 'magicResist':
          textStats.text = data.magicResist;
          break;
        case 'attackSpeed':
          textStats.text = data.attackSpeed;
          break;
        case 'healthRegen':
          textStats.text = data.healthRegen;
          break;
        case 'energyRegen':
          textStats.text = data.energyRegen;
          break;
        case 'critDamageLevel':
          textStats.text = data.critDamageLevel;
          break;
        case 'critStrikeLevel':
          textStats.text = data.critStrikeLevel;
          break;
        case 'dodgeLevel':
          textStats.text = data.dodgeLevel;
          break;
        case 'lifeStealLevel':
          textStats.text = data.lifeStealLevel;
          break;
        case 'energySteal':
          textStats.text = data.energySteal;
          break;
        case 'energyBoost':
          textStats.text = data.energyBoost;
          break;
        case 'armorPenetration':
          textStats.text = data.armorPenetration;
          break;
        case 'magicPenetration':
          textStats.text = data.magicPenetration;
          break;
        case 'healingEffect':
          textStats.text = data.healingEffect;
          break;
        case 'shieldEffect':
          textStats.text = data.shieldEffect;
          break;
      }

      textStats.position.set(12, i*statsLabel.height);

      valueStats.text = value;
      valueStats.position.set(
        statsLabel.x+statsLabel.width-12-valueStats.width,
        i*statsLabel.height
      );

      // console.log('valueStats', valueStats.y+statsBottomBackground.y);
      // console.log(statsBottomBackground.y+statsBottomBackground.height);
      // if (statsLabel.y+statsBottomBackground.y >= maxY) {
      //   statsLabel.visible = false;
      //   textStats.visible = false;
      //   valueStats.visible = false;
      // }

      // console.log('text:', textStats.x, textStats.y, textStats.text);

      statsBottomBackgroundContainer.addChild(textStats, valueStats);
    });
  }


  statsContainer.addChild(statsBottomBackground);
  statsContainer.addChild(statsBottomBackgroundContainer);
  statsContainer.addChild(statsUpperBackground, textStatsUpperBackground,
    textPowerBar, statsBackground);
  container.addChild(statsContainer);

  console.log('stage', stage.children[2].children[16].children[6].children);

  // Methods for dragging 'statsBottomBackgroundContainer'
  statsBottomBackgroundContainer
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointermove', onDragMoveY);

  socket.on('heroContainerData', (data) => {
    console.log('heroContainerData\n', data);

    let i = 0;
    for (let item in data) {
      // console.log(item);
      if (data[item] > 0) {
        if (item !== 'stars' && item !== 'currPages' && item !== 'nextPages'
        && item !== 'level' && item !== 'heroNextLvlExp' && item !== 'heroCurrLvlExp'
        && item !== 'power' && item !== 'hitLevel' && item !== 'movementSpeed'
        && item !== 'attackRange') {
          let grey = new RegExp('Inc');
          if (!grey.test(item)) {
            console.log(item,'-', data[item]);
            addGreyLabel(i, item, data[item]);
            i++;
          }
        }
      }
    }
    console.log('pocet', i);

    textBanner.text = data.name;
    textBanner.position.set(
      setMiddlePos(banner, textBanner).x,
      setMiddlePos(banner, textBanner).y-4
    );

    textLevel.text = data.level;
    textLevel.position.set(
      textLevel.x-textLevel.width/2,
      794
    );

    selectClass(classIcon, data.class);
    classIcon.scale.set(0.5);
    classIcon.position.set(782, 798);

    textPowerBar.text = textPowerBar.text+data.power;
    textPowerBar.position.set(
      setMiddlePos(statsUpperBackground, textPowerBar).x,
      692
    );

    switch (data.stars) {
      case 2:
        addStarIcon(-26);
        addStarIcon(26);
        break;
      case 3:
        addStarIcon(-52);
        addStarIcon(0);
        addStarIcon(52);
        break;
      case 4:
        addStarIcon(-78);
        addStarIcon(-26);
        addStarIcon(26);
        addStarIcon(78);
        break;
      case 5:
        addStarIcon(-104);
        addStarIcon(-52);
        addStarIcon(0);
        addStarIcon(52);
        addStarIcon(104);
        break;
      default:
        addStarIcon(0);
    }

    textStatsUpperBackground.text = data.description;
    textStatsUpperBackground.position.set(1050, 244);

    // socket.removeAllListeners();
    socket.off('heroContainerData');
  });
}

// Glyph part of Hero screen
function addGlyphsContainer(container, heroName) {
  let glyphsContainer = new Container();
  console.log('heroName from glyphsContainer', heroName);

  socket.emit('heroContainer', heroName);
  // console.log('glyphsContainer', stage.children);

  let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);

  let awakenIconBackground = new Sprite(resources[awakenIconBackgroundPath].texture);
  awakenIconBackground.position.set(1032, 229);

  let awakenIcon = new Sprite(resources[awakenIconPath].texture);
  awakenIcon.position.set(1048, 241);

  // TODO: zanest u kazdeho hrdiny tuto informaci o awaken statusu
  let textAwakenIcon = new Text(`This hero's mysterious
power has not been
awakened. Stay tuned!`, textStyle_32left_black);
  textAwakenIcon.position.set(1192, setMiddlePos(awakenIconBackground, textAwakenIcon).y+4);

  function addGlyphIcon(spritePath, index, equipped) {
    // console.log(index+' '+spritePath);
    let glyph = new Sprite(resources[spritePath].texture);
    // setInteractive(glyph, true);
    let noGlyphIcon = new Sprite(resources[noGlyphIconPath].texture);

    if (equipped === 'no') {
      switch (index) {
        case 0:
          glyph.position.set(1158, 393);
          noGlyphIcon.position.set(1158, 393);
          break;
        case 1:
          glyph.position.set(1310, 393);
          noGlyphIcon.position.set(1310, 393);
          break;
        case 2:
          glyph.position.set(1158, 545);
          noGlyphIcon.position.set(1158, 545);
          break;
        case 3:
          glyph.position.set(1310, 545);
          noGlyphIcon.position.set(1310, 545);
          break;
      }
      glyphsContainer.addChild(glyph, noGlyphIcon);
    } else {
      switch (index) {
        case 0:
          glyph.position.set(1158, 393);
          break;
        case 1:
          glyph.position.set(1310, 393);
          break;
        case 2:
          glyph.position.set(1158, 545);
          break;
        case 3:
          glyph.position.set(1310, 545);
          break;
      }
      glyphsContainer.addChild(glyph);
    }
  }

  let border = new Sprite(resources[borderGreyPath].texture);
  border.position.set(374, 242);

  let banner = new Sprite(resources[banner620x98Path].texture);
  banner.position.set(312, 204);

  let textBanner = new Text('', textStyleBubble_52_white);
  let textLevel = new Text('', textStyleLevel_40_white);
  textLevel.position.set(392, 228);

  let classIcon = new Sprite(resources[allIconPath].texture);

  let pedestal = new Sprite(resources[pedestalPath].texture);

  let starBackground = new Sprite(resources[starBackgroundPath].texture);
  starBackground.position.set(394, 752);

  let textPowerBar = new Text('Power: ', textStyleLevel_40_white);
  textPowerBar.position.set(
    setMiddlePos(awakenIconBackground, textPowerBar).x,
    692
  );

  //
  function addStarIcon(offsetX) {
    let star = new Sprite(resources[starIconPath].texture);
    star.position.set(
      setMiddlePos(starBackground, star).x+offsetX,
      setMiddlePos(starBackground, star).y
    );

    glyphsContainer.addChild(star);
  }

  let expBar = new Sprite(resources[expBackgroundPath].texture);
  expBar.position.set(341, 845);

  let textHeroExpOfLevels = new Text('', textStyleLevel_40_white);

  let pageBar = new Sprite(resources[expBackgroundPath].texture);
  pageBar.position.set(643, 845);

  let pageIcon = new Sprite(resources[pageIconPath].texture);
  pageIcon.position.set(pageBar.x, pageBar.y-4);

  let expBarPlusIcon = new Sprite(resources[plusIconPath].texture);
  expBarPlusIcon.width = expBarPlusIcon.height = 56;
  expBarPlusIcon.position.set(
    expBar.x+expBar.width-expBarPlusIcon.width,
    expBar.y-4
  );

  let pageBarPlusIcon = new Sprite(resources[plusIconPath].texture);
  pageBarPlusIcon.width = pageBarPlusIcon.height = 56;
  pageBarPlusIcon.position.set(
    pageBar.x+pageBar.width-pageBarPlusIcon.width,
    pageBar.y-4
  );

  let textNumberOfPages = new Text('', textStyleLevel_40_white);

  let nextGlyphsIcon = new Sprite(resources[nextGlyphsIconPath].texture);
  nextGlyphsIcon.position.set(1516, 617);

  socket.on('heroContainerData', (data) => {
    console.log('heroContainerData\n', data);

    selectBorder(border, data.color);
    border.position.set(374, 242);

    textBanner.text = data.name;
    textBanner.position.set(
      setMiddlePos(banner, textBanner).x,
      setMiddlePos(banner, textBanner).y-4
    );

    textLevel.text = data.level;
    textLevel.position.set(
      textLevel.x-textLevel.width/2,
      228
    );

    selectClass(classIcon, data.class);
    classIcon.scale.set(0.6);
    classIcon.position.set(830, 230);

    pedestal.position.set(
      setMiddlePos(border, pedestal).x,
      643
    );

    switch (data.stars) {
      case 2:
        addStarIcon(-26);
        addStarIcon(26);
        break;
      case 3:
        addStarIcon(-52);
        addStarIcon(0);
        addStarIcon(52);
        break;
      case 4:
        addStarIcon(-78);
        addStarIcon(-26);
        addStarIcon(26);
        addStarIcon(78);
        break;
      case 5:
        addStarIcon(-104);
        addStarIcon(-52);
        addStarIcon(0);
        addStarIcon(52);
        addStarIcon(104);
        break;
      default:
        addStarIcon(0);
    }

    textPowerBar.text = textPowerBar.text+data.power;
    textPowerBar.position.set(
      setMiddlePos(awakenIconBackground, textPowerBar).x,
      692
    );

    if (data.nextPages === 0) {
      textNumberOfPages.text = 'MAX';
    } else {
      textNumberOfPages.text = data.currPages+'/'+data.nextPages;
    }
    textNumberOfPages.position.set(
      setMiddlePos(pageBar, textNumberOfPages).x,
      setMiddlePos(pageBar, textNumberOfPages).y
    );

    textHeroExpOfLevels.text = data.heroCurrLvlExp+'/'+data.heroNextLvlExp;
    textHeroExpOfLevels.position.set(
      setMiddlePos(expBar, textHeroExpOfLevels).x,
      setMiddlePos(expBar, textHeroExpOfLevels).y
    );

    for (let i of data.glyphsRarity) {
      // console.log('i', i);
      if (i.current_status === data.color) {
        for (const item of i.glyphs) {
          let index = i.glyphs.indexOf(item);
          // console.log(index+': '+item.title+' - '+item.equipped); //i.glyphs., i.glyphs.equipped);
          let spriteGlyphIconPath;
          switch (item.title) {
            case 'Ability Power':
              spriteGlyphIconPath = abilityPowerIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Armor':
              spriteGlyphIconPath = armorIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Armor Penetration':
              spriteGlyphIconPath = armorPenIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Attack Damage':
              spriteGlyphIconPath = attackDamageIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Attack Force':
              spriteGlyphIconPath = attackForceIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Crit Strike':
              spriteGlyphIconPath = critStrikeIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Double Attack':
              spriteGlyphIconPath = doubleAttackIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Energy Regen':
              spriteGlyphIconPath = energyRegenIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Hardiness':
              spriteGlyphIconPath = hardinessIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Health':
              spriteGlyphIconPath = healthIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Health Regen':
              spriteGlyphIconPath = healthRegenIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Magic Force':
              spriteGlyphIconPath = magicForceIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Magic Penetration':
              spriteGlyphIconPath = magicPenIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Magic Resist':
              spriteGlyphIconPath = magicResistIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Regenerate':
              spriteGlyphIconPath = regenerateIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Aggression':
              spriteGlyphIconPath = aggressionIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Avarice':
              spriteGlyphIconPath = avariceIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Balance':
              spriteGlyphIconPath = balanceIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Bloodthirst':
              spriteGlyphIconPath = bloodthirstIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Bravery':
              spriteGlyphIconPath = braveryIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Cardio':
              spriteGlyphIconPath = cardioIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Chivalry':
              spriteGlyphIconPath = chivalryIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Defense':
              spriteGlyphIconPath = defenseIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Divine Power':
              spriteGlyphIconPath = divinePowerIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Enforcement':
              spriteGlyphIconPath = enforcementIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Extra Health':
              spriteGlyphIconPath = extraHealthIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Fortitude':
              spriteGlyphIconPath = fortitudeIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Illusion':
              spriteGlyphIconPath = illusionIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Immortality':
              spriteGlyphIconPath = immortalityIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Infinity':
              spriteGlyphIconPath = infinityIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Magic Shield':
              spriteGlyphIconPath = magicShieldIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Meditation':
              spriteGlyphIconPath = meditationIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Nature':
              spriteGlyphIconPath = natureIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Osmosis':
              spriteGlyphIconPath = osmosisIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Providence':
              spriteGlyphIconPath = providenceIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Prowess':
              spriteGlyphIconPath = prowessIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Sublimity':
              spriteGlyphIconPath = sublimityIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
            case 'Valor':
              spriteGlyphIconPath = valorIconPath;
              addGlyphIcon(spriteGlyphIconPath, index, item.equipped);
              break;
          }
        }
      }
    }

    // socket.removeAllListeners();
    socket.off('heroContainerData');
  });

  glyphsContainer.addChild(heroUpperBackground, awakenIconBackground, awakenIcon,
    textAwakenIcon, starBackground, pedestal, textPowerBar,
    expBar, expBarPlusIcon, textHeroExpOfLevels,
    pageBar, pageIcon, pageBarPlusIcon, textNumberOfPages,
    nextGlyphsIcon);

  //
  function addHero(heroPath) {
    let hero = new Sprite(resources[heroPath].texture);
    hero.position.set(
      setMiddlePos(border, hero).x,
      667-hero.height
    );
    glyphsContainer.addChild(hero);
  }

  switch (heroName) {
    case 'aelois':
      addHero(aeloisPath);
      // let aelois = new Sprite(resources[aeloisPath].texture);
      // aelois.position.set(
      //   setMiddlePos(border, aelois).x,
      //   667-aelois.height
      // );
      // glyphsContainer.addChild(aelois);
      break;
    case 'amara':
      addHero(amaraPath);
      break;
    case 'crystal':
      addHero(crystalPath);
      break;
    case 'diuwin':
      addHero(diuwinPath);
      break;
    case 'leona':
      addHero(leonaPath);
      break;
    case 'leryssa':
      addHero(leryssaPath);
      break;
    case 'nadia':
      addHero(nadiaPath);
      break;
    case 'nyx':
      addHero(nyxPath);
      break;
    case 'sin':
      addHero(sinPath);
      break;
    case 'zalajin':
      addHero(zalajinPath);
      break;
    case 'zaya':
      addHero(zayaPath);
      break;
  }

  glyphsContainer.addChild(border, banner, textBanner, textLevel, classIcon);
  container.addChild(glyphsContainer);
}

//
function addSkillsContainer(container, heroName) {
  let skillsContainer = new Container();
  console.log('heroName from skillsContainer', heroName);

  console.log(stage.children[1].children[18].children);

  socket.emit('heroContainer', heroName);

  let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);

  let banner = new Sprite(resources[banner620x98Path].texture);
  banner.width = 476;
  banner.height = 76;
  banner.position.set(1059, 172);

  let textBanner = new Text('', textStyleLevel_40_white);

  function addVideo(videoFilePath) {
    let video = new Sprite(resources[videoFilePath].texture);
    video.position.set(1032, 229);

    skillsContainer.addChild(heroUpperBackground, video, banner, textBanner);
  }

  function loadVideo(heroName, filenamePath) {
    // const myLoader = PIXI.loader;
    let videoFilePath = `${heroesFolderPath}${heroName}/video/${filenamePath}.png`; // later mkv or mp4, ...

    if (videoFilePath in loader.resources) {
      console.log('video already loaded');
      addVideo(videoFilePath);
    } else {
      loader
        .add(videoFilePath);
    }

    loader
      .on('complete', (loader, resources) => {
        // TODO: video - http://pixijs.io/examples/?v=dev#/basics/video.js
        // - http://www.html5gamedevs.com/topic/16450-pixi-loading-video-files/
        addVideo(videoFilePath);
      });
  }

  loadVideo(heroName, 'video_1');

  let textPowerBar = new Text('Power: ', textStyleLevel_40_white);
  textPowerBar.position.set(
    setMiddlePos(banner, textPowerBar).x,
    692
  );
  // console.log('power.x', setMiddlePos(banner, textPowerBar).x);

  let textSkill1 = new Text('', textStyle_32left_black);
  let textSkill2 = new Text('', textStyle_32left_black);
  let textSkill3 = new Text('', textStyle_32left_black);
  let textSkill4 = new Text('', textStyle_32left_black);

  let textSkillLevel1 = new Text('Lv. ', textStyle_32right_black);
  let textSkillLevel2 = new Text('Lv. ', textStyle_32right_black);
  let textSkillLevel3 = new Text('Lv. ', textStyle_32right_black);
  let textSkillLevel4 = new Text('Lv. ', textStyle_32right_black);

  // TODO: dodelat ceny jednotlivych skillu + v DB vytvorit tabulku s cenami
  // jednotlivych skillu pro dany level skillu

  function loadSkillsIcons(heroName) {
    let skill1IconPath = `${heroesFolderPath}${heroName}/skills/skill_1${png}`;
    let skill2IconPath = `${heroesFolderPath}${heroName}/skills/skill_2${png}`;
    let skill3IconPath = `${heroesFolderPath}${heroName}/skills/skill_3${png}`;
    let skill4IconPath = `${heroesFolderPath}${heroName}/skills/skill_4${png}`;

    function addSkillBackground(x, y, offsetY) {
      let skillBackground = new Sprite(resources[skillBackgroundPath].texture);
      skillBackground.position.set(x, y+offsetY); //136

      let skillLabel = new Sprite(resources[skillLabelPath].texture);
      skillLabel.position.set(x+128, y+62+offsetY);

      skillsContainer.addChild(skillBackground, skillLabel,
        textSkill1, textSkill2, textSkill3, textSkill4,
        textSkillLevel1, textSkillLevel2, textSkillLevel3, textSkillLevel4
      );
    }

    function addSkillIcon(spritePath, x, y, offsetY, i) {
      let skillIcon = new Sprite(resources[spritePath].texture);
      skillIcon.position.set(x, y+offsetY);
      setInteractive(skillIcon, true);

      skillIcon.on('pointerup', () => {
        console.log(`skill ${i} clicked`);
        // TODO: dodelat preklikavani mezi jednotlivymi skilly + zmena nahledu video v prave casti obrazovky
      });

      let skillPlusIcon = new Sprite(resources[plusIconPath].texture);
      skillPlusIcon.position.set(x+464, y+12+offsetY);
      setInteractive(skillPlusIcon, true);

      skillPlusIcon.on('pointerup', () => {
        console.log(`plus for skill ${i} was pressed`);
      });

      skillsContainer.addChild(skillIcon, skillPlusIcon);
    }

    function addSkills() {
      let offsetY = 0;
      for (let i = 0; i < 4; i++) {
        addSkillBackground(332, 359, offsetY);
        switch (i) {
          case 0:
            addSkillIcon(skill1IconPath, 352, 373, offsetY, i);
            break;
          case 1:
            addSkillIcon(skill2IconPath, 352, 373, offsetY, i);
            break;
          case 2:
            addSkillIcon(skill3IconPath, 352, 373, offsetY, i);
            break;
          case 3:
            addSkillIcon(skill4IconPath, 352, 373, offsetY, i);
            break;
        }
        offsetY += 136;
      }
    }

    if (skill1IconPath in loader.resources && skill2IconPath in loader.resources &&
      skill3IconPath in loader.resources && skill4IconPath in loader.resources) {
      console.log('skill icons already loaded');
      addSkills();
    } else {
      loader
        .add([
          skill1IconPath, skill2IconPath, skill3IconPath, skill4IconPath
        ]);
    }

    loader
      .on('complete', (loader, resources) => {
        addSkills();
      });
  }

  loadSkillsIcons(heroName);

  let skillsBanner = new Sprite(resources[banner620x98Path].texture);
  skillsBanner.position.set(312, 204);

  let textSkillsBanner = new Text('', textStyleBubble_52_white);

  let textLevel = new Text('', textStyleLevel_40_white);
  textLevel.position.set(392, 228);

  let classIcon = new Sprite(resources[allIconPath].texture);

  socket.on('heroContainerData', (data) => {
    console.log('heroContainerData\n', data);

    textBanner.text = data.skills[0].title;
    textBanner.position.set(
      setMiddlePos(banner, textBanner).x,
      setMiddlePos(banner, textBanner).y-4
    );

    textPowerBar.text = textPowerBar.text+data.power;
    textPowerBar.position.set(
      setMiddlePos(banner, textPowerBar).x,
      692
    );

    textSkillsBanner.text = data.name;
    textSkillsBanner.position.set(
      setMiddlePos(skillsBanner, textSkillsBanner).x,
      setMiddlePos(skillsBanner, textSkillsBanner).y-4
    );

    textLevel.text = data.level;
    textLevel.position.set(
      textLevel.x-textLevel.width/2,
      228
    );

    selectClass(classIcon, data.class);
    classIcon.scale.set(0.6);
    classIcon.position.set(830, 230);

    textSkill1.text = data.skills[0].title;
    textSkill1.position.set(460, 384);

    textSkillLevel1.text = textSkillLevel1.text+data.skills[0].skill_level;
    textSkillLevel1.position.set(734, 428);

    textSkill2.text = data.skills[1].title;
    textSkill2.position.set(460, 520);

    textSkillLevel2.text = textSkillLevel2.text+data.skills[1].skill_level;
    textSkillLevel2.position.set(734, 564);

    textSkill3.text = data.skills[2].title;
    textSkill3.position.set(460, 656);

    textSkillLevel3.text = textSkillLevel3.text+data.skills[2].skill_level;
    textSkillLevel3.position.set(734, 700);

    textSkill4.text = data.skills[3].title;
    textSkill4.position.set(460, 792);

    textSkillLevel4.text = textSkillLevel4.text+data.skills[3].skill_level;
    textSkillLevel4.position.set(734, 836);

    // socket.removeAllListeners();
    socket.off('heroContainerData');
  });

  skillsContainer.addChild(textPowerBar, skillsBanner,
    textSkillsBanner, textLevel, classIcon);
  container.addChild(skillsContainer);
}

//
function addEquipContainer(container, heroName) {
  let equipContainer = new Container();

  // console.log('equipContainer', stage.children);

  let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);



  equipContainer.addChild(heroUpperBackground);
  container.addChild(equipContainer);
}

//
function addHeroInfoIcons(container, iconClicked, heroName) {
  console.log('iconClicked', iconClicked);

  socket.emit('heroInfoIcons', heroName);

  let infoIcon = new Sprite(resources[statsIconPath].texture);
  let infoIconSelected = new Sprite(resources[statsIconSelectedPath].texture);

  let statsIcon = new Sprite(resources[statsIconPath].texture);
  statsIcon.position.set(1050, 741);
  setInteractive(statsIcon, true);

  let textStatsIcon = new Text('', textStyle_32center_black);

  let glyphsIcon = new Sprite(resources[glyphsIconPath].texture);
  setInteractive(glyphsIcon, true);
  if (iconClicked === 'glyphs') {
    glyphsIcon.texture = infoIconSelected.texture;
    setInteractive(glyphsIcon, false);
  }
  glyphsIcon.position.set(1178, 741);

  let textGlyphsIcon = new Text('', textStyle_32center_black);

  let skillsIcon = new Sprite(resources[skillsIconPath].texture);
  skillsIcon.position.set(1306, 741);
  setInteractive(skillsIcon, true);

  let textSkillsIcon = new Text('', textStyle_32center_black);

  let equipIcon = new Sprite(resources[equipIconPath].texture);
  equipIcon.position.set(1434, 741);
  setInteractive(equipIcon, true);

  let textEquipIcon = new Text('', textStyle_32center_black);

  function setSelectedIcon(selectedIcon, notSelectedIcon) {
    selectedIcon.texture = infoIcon.texture;
    notSelectedIcon.texture = infoIconSelected.texture;
    setInteractive(selectedIcon, true);
    setInteractive(notSelectedIcon, false);
  }

  socket.on('heroInfoIconsData', (data) => {
    console.log('heroInfoIconsData\n', data);

    textStatsIcon.text = data.stats;
    textStatsIcon.position.set(
      setMiddlePos(statsIcon, textStatsIcon).x,
      setMiddlePos(statsIcon, textStatsIcon).y
    );

    textGlyphsIcon.text = data.glyphs;
    textGlyphsIcon.position.set(
      setMiddlePos(glyphsIcon, textGlyphsIcon).x,
      setMiddlePos(glyphsIcon, textGlyphsIcon).y
    );

    textSkillsIcon.text = data.skills;
    textSkillsIcon.position.set(
      setMiddlePos(skillsIcon, textSkillsIcon).x,
      setMiddlePos(skillsIcon, textSkillsIcon).y
    );

    textEquipIcon.text = data.equip;
    textEquipIcon.position.set(
      setMiddlePos(equipIcon, textEquipIcon).x,
      setMiddlePos(equipIcon, textEquipIcon).y
    );

    socket.off('heroInfoIconsData');
  });

  statsIcon.on('pointerup', () => {
    console.log('statsIcon clicked');
    console.log('iconClicked', iconClicked);
    console.log(stage.children[1].children[18].children);
    // for (let i = 0; i < stage.children[1].children[18].children.length; i++) {
    //   let borderIndex = stage.children[1].children[18].children[i].children.length;
    //   // console.log('borderIndex', borderIndex);
    //   setInteractive(stage.children[1].children[18].children[i].children[borderIndex-2], false);
    // }
    switch (iconClicked) {
      case 'glyphs':
        setSelectedIcon(glyphsIcon, statsIcon);
        iconClicked = 'stats';
        // console.log(container.children[15]);
        container.removeChild(container.children[container.children.length-1]);
        addStatsContainer(container, heroName);
        break;
      case 'skills':
        setSelectedIcon(skillsIcon, statsIcon);
        iconClicked = 'stats';
        container.removeChild(container.children[container.children.length-1]);
        addStatsContainer(container, heroName);
        break;
      case 'equip':
        setSelectedIcon(equipIcon, statsIcon);
        iconClicked = 'stats';
        container.removeChild(container.children[container.children.length-1]);
        addStatsContainer(container, heroName);
        break;
    }
    // console.log('after iconClicked', iconClicked);
  });

  glyphsIcon.on('pointerup', () => {
    console.log('glyphsIcon clicked');
    console.log('iconClicked', iconClicked);
    console.log(stage.children[1].children[18].children);
    switch (iconClicked) {
      case 'stats':
        setSelectedIcon(statsIcon, glyphsIcon);
        iconClicked = 'glyphs';
        container.removeChild(container.children[container.children.length-1]);
        addGlyphsContainer(container, heroName);
        break;
      case 'skills':
        setSelectedIcon(skillsIcon, glyphsIcon);
        iconClicked = 'glyphs';
        container.removeChild(container.children[container.children.length-1]);
        addGlyphsContainer(container, heroName);
        break;
      case 'equip':
        setSelectedIcon(equipIcon, glyphsIcon);
        iconClicked = 'glyphs';
        container.removeChild(container.children[container.children.length-1]);
        addGlyphsContainer(container, heroName);
        break;
    }
    // console.log('after iconClicked', iconClicked);
  });

  skillsIcon.on('pointerup', () => {
    console.log('skillsIcon clicked');
    console.log('iconClicked', iconClicked);
    console.log(stage.children[1].children[18].children);
    switch (iconClicked) {
      case 'stats':
        setSelectedIcon(statsIcon, skillsIcon);
        iconClicked = 'skills';
        container.removeChild(container.children[container.children.length-1]);
        addSkillsContainer(container, heroName);
        break;
      case 'glyphs':
        setSelectedIcon(glyphsIcon, skillsIcon);
        iconClicked = 'skills';
        container.removeChild(container.children[container.children.length-1]);
        addSkillsContainer(container, heroName);
        break;
      case 'equip':
        setSelectedIcon(equipIcon, skillsIcon);
        iconClicked = 'skills';
        container.removeChild(container.children[container.children.length-1]);
        addSkillsContainer(container, heroName);
        break;
    }
    // console.log('after iconClicked', iconClicked);
  });

  equipIcon.on('pointerup', () => {
    console.log('equipIcon clicked');
    console.log('iconClicked', iconClicked);
    console.log(stage.children[1].children[18].children);
    switch (iconClicked) {
      case 'stats':
        setSelectedIcon(statsIcon, equipIcon);
        iconClicked = 'equip';
        container.removeChild(container.children[container.children.length-1]);
        addEquipContainer(container, heroName);
        break;
      case 'glyphs':
        setSelectedIcon(glyphsIcon, equipIcon);
        iconClicked = 'equip';
        container.removeChild(container.children[container.children.length-1]);
        addEquipContainer(container, heroName);
        break;
      case 'skills':
        setSelectedIcon(skillsIcon, equipIcon);
        iconClicked = 'equip';
        container.removeChild(container.children[container.children.length-1]);
        addEquipContainer(container, heroName);
        break;
    }
    // console.log('after iconClicked', iconClicked);
  });

  container.addChild(statsIcon, textStatsIcon, glyphsIcon, textGlyphsIcon,
    skillsIcon, textSkillsIcon, equipIcon, textEquipIcon);
}

// Setup the hero screen (after player clicked on specific hero)
function setHeroContainer(heroName, iconClicked) {
  let heroContainer = new Container();

  // socket.emit('heroContainer', heroName);

  setBookBackground(heroContainer);
  setBarContainer(heroContainer);
  // setScrollArrowHeroes(heroesContainer);

  setInteractive(stage.children[1].children[20], false); // rightArrow interactive -> false
  setInteractive(stage.children[1].children[21], false); // back button interactive -> false
  setInteractive(scrollArrow72x36, false);
  // console.log(stage.children[1].children[18].children.length);
  disableHeroPortraitsInteraction();
  // for (let i = 0; i < stage.children[1].children[18].children.length; i++) {
  //   let borderIndex = stage.children[1].children[18].children[i].children.length;
  //   // console.log('borderIndex', borderIndex);
  //   setInteractive(stage.children[1].children[18].children[i].children[borderIndex-2], false);
  // }

  addHeroBtnClose(heroContainer);

  // TODO: pridat sipky vpravo, vlevo

  // let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  // heroUpperBackground.position.set(1008, 205);

  let heroBottomBackground = new Sprite(resources[heroBottomBackgroundPath].texture);
  heroBottomBackground.position.set(1008, 713);

  let powerBar = new Sprite(resources[expBackgroundPath].texture);
  powerBar.position.set(1168, 689);

  let helpIcon = new Sprite(resources[helpIconPath].texture);
  helpIcon.position.set(powerBar.x+powerBar.width, 689);

  heroContainer.addChild(heroBottomBackground, powerBar,
    helpIcon);
  addHeroInfoIcons(heroContainer, iconClicked, heroName);

  if (iconClicked === 'glyphs') {
    addGlyphsContainer(heroContainer, heroName);
  }

  // console.log('heroes:\n', stage.children);
  if (stage.children.length === 2) {
    stage.addChild(heroContainer);
  }
  console.log('heroes2:\n', stage.children);
}

// Add left and right arrow
function addArrows(container) {
  let currentPage = 0;
  let pages = 1;//sumPages;

  // console.log('currentPage', currentPage, 'pages', pages);

  let leftArrow = new Sprite(resources[leftArrowIconPath].texture);
  leftArrow.position.set(36, 640);
  leftArrow.visible = false;

  let rightArrow = new Sprite(resources[rightArrowIconPath].texture);
  rightArrow.position.set(1796, 640);
  setInteractive(rightArrow, true);

  // heroesPortraitContainer.position.x = 0;
  // console.log('heroPortraitContainer', heroesPortraitContainer.x);

  leftArrow.on('pointerup', () => {
    console.log('leftArrow clicked', currentPage, pages);
    if (currentPage > 0 && currentPage < pages) {
      // setTimeout(() => {
        heroesPortraitContainer.position.x += 1920;
        // console.log('heroPortraitContainer', heroesPortraitContainer.x);
        currentPage--;
        // console.log('currentPage', currentPage);
      // }, LATENCY);
    }

    if (currentPage === pages) {
      // setTimeout(() => {
        heroesPortraitContainer.position.x += 1920;
        // console.log('heroPortraitContainer', heroesPortraitContainer.x);
        currentPage--;
        // console.log('currentPage', currentPage);
        if (rightArrow.visible === false) {
          rightArrow.visible = true;
          setInteractive(rightArrow, true);
        }
        if (leftArrow.visible = false) {
          leftArrow.visible = false;
          setInteractive(leftArrow, false);
        }
      // }, LATENCY);
    }
  });

  rightArrow.on('pointerup', () => {
    console.log('rightArrow clicked', currentPage, pages);
    // console.log('heroesPortraitContainer', heroesPortraitContainer.x);

    if (currentPage < pages) {
      currentPage++;
      // console.log('currentPage', currentPage);
      heroesPortraitContainer.position.x -= 1920;
      // console.log('heroesPortraitContainer', heroesPortraitContainer.x);
    }

    if (currentPage === pages) {
      rightArrow.visible = false;
      setInteractive(rightArrow, false);
    }

    if (leftArrow.visible === false) {
      leftArrow.visible = true;
      setInteractive(leftArrow, true);
    }
  });

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

let mouseYPos = 0;
let delta = 0;
let minDrag = 0;
let maxDrag = 0;

// Dragging functions
function onDragStart(event) {
  this.data = event.data;
  // this.alpha = 0.5;
  this.dragging = true;
  mouseYPos = event.data.getLocalPosition(stage).y;
  delta = mouseYPos-this.y;
  minDrag = this.y;
  maxDrag = this.parent.height;
  // console.log(minDrag, maxDrag);
  // console.log(this.y, '+', this.height, '=', this.y+this.height);
  // console.log(stage.children[2].children[10]); //12, 14
  setInteractive(stage.children[2].children[10], false);
  setInteractive(stage.children[2].children[12], false);
  setInteractive(stage.children[2].children[14], false);
}

function onDragEnd() {
  // this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
  setInteractive(stage.children[2].children[10], true);
  setInteractive(stage.children[2].children[12], true);
  setInteractive(stage.children[2].children[14], true);
}

function onDragMoveY() {
  if (this.dragging) {
    this.y = this.data.getLocalPosition(this.parent).y-delta;
    // console.log(this.y, this.height);
    if (this.y <= 229) { //229 = statsUpperBackground.y
      this.dragging = false;
      this.y = maxDrag-this.height-12;
      onDragEnd;
    }
    if (this.y+this.height >= 876) {
      this.dragging = false;
      this.y = minDrag;
      onDragEnd;
    }
  }
}
