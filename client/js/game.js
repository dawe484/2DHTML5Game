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
  loading: function() {
    console.log('Font(s) Loading');
  },
  active: function() {
    console.log('Font(s) Loaded');
    fontsLoaded = true;
  },
  inactive: function() {
    console.log('Font(s) Failure');
  }
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
  // -------------------------- FOLDERS PATHS --------------------------
  backgroundsFolderPath = '/images/game/backgrounds/',
  buttonsFolderPath = '/images/game/buttons/',
  heroesFolderPath = '/images/game/heroes/',
  iconsFolderPath = '/images/game/icons/',
  glyphsFolderPath = '/images/game/icons/glyphs/',
  labelsFolderPath = '/images/game/labels/',
  mainscreenFolderPath = '/images/game/mainscreen/',
  tutorialFolderPath = '/images/game/tutorial/',
  enemiesFolderPath = '/images/game/enemies/',
  // -----------------------------------------------------------------------
  loadingBackgroundPath = `${backgroundsFolderPath}loading_background${png}`,
  backgroundEmptyPath = `${backgroundsFolderPath}background_empty${png}`,
  backgroundEmptyBlurPath = `${backgroundsFolderPath}background_empty_blur${png}`,
  backgroundDarkerPath = `${backgroundsFolderPath}background_darker${png}`,
  backgroundBattleOverPath = `${backgroundsFolderPath}battle_over_background${png}`,
  backgroundLevelUpPath = `${backgroundsFolderPath}level_up_background${png}`,
  // ----------
  apprenticePath = `${tutorialFolderPath}apprentice${png}`,
  playerPath = `${tutorialFolderPath}player${png}`,
  masterPath = `${tutorialFolderPath}master${png}`,
  bubblePath = `${tutorialFolderPath}bubble${png}`,
  arrowDown120x48Path = `${tutorialFolderPath}arrow_down${png}`,
  // ----------
  btn144x144Path = `${buttonsFolderPath}btn_144x144${png}`,
  btn144x72Path = `${buttonsFolderPath}btn_144x72${png}`,
  btn96x144Path = `${buttonsFolderPath}btn_96x144${png}`,
  avatarScreenBackgroundPath = `${backgroundsFolderPath}avatar_screen_background${png}`,
  helpIconPath = `${iconsFolderPath}help_icon${png}`, // ? mark on btn
  btnBackPath = `${buttonsFolderPath}btn_back${png}`,
  btnGreen260x72Path = `${buttonsFolderPath}btn_green_260x72${png}`,
  btnGreen248x60Path = `${buttonsFolderPath}btn_green_248x60${png}`,
  avatarChangeNameBackgroundPath = `${backgroundsFolderPath}avatar_changename_background${png}`,
  avatarChangeNameNamefieldPath = `${labelsFolderPath}avatar_changename_namefield_label${png}`,
  dicePath = `${iconsFolderPath}dice_icon${png}`,
  banner620x98Path = `${iconsFolderPath}banner_620x98${png}`,
  avatarImageJsonPath = `${iconsFolderPath}avatar/avatar_images.json`,
  avatarBorderJsonPath = `${iconsFolderPath}avatar/avatar_borders.json`,
  avatarLevelJsonPath = `${iconsFolderPath}avatar/avatar_levels.json`,
  barBackgroundPath = `${backgroundsFolderPath}bar_background${png}`,
  plusIconPath = `${iconsFolderPath}plus_icon${png}`,
  goldIconPath = `${iconsFolderPath}gold_icon${png}`,
  diamondIconPath = `${iconsFolderPath}diamond_icon${png}`,
  plusBarBackgroundPath = `${backgroundsFolderPath}plus_bar_background${png}`,
  btnClosePath = `${buttonsFolderPath}btn_close${png}`,
  scrollBtn192x72Path = `${mainscreenFolderPath}scroll_btn_192x72${png}`,
  scrollArrow72x36Path = `${mainscreenFolderPath}scroll_arrow_72x36${png}`,
  scroll192x1068Path = `${mainscreenFolderPath}scroll_192x1068${png}`,
  scrollBtn192x48Path = `${mainscreenFolderPath}scroll_btn_192x48${png}`,
  scroll312x192Path = `${mainscreenFolderPath}scroll_312x192${png}`,
  scroll936x192Path = `${mainscreenFolderPath}scroll_936x192${png}`,
  backgroundBookPath = `${backgroundsFolderPath}background_book${png}`,
  banner620x98GreyPath = `${iconsFolderPath}banner_620x98_grey${png}`,
  starIconPath = `${iconsFolderPath}star_icon${png}`,
  glyphsPath = `${glyphsFolderPath}glyphs.json`,
  glyphsNoPath = `${glyphsFolderPath}glyphs_no.json`,
  pageIconPath = `${iconsFolderPath}page_icon${png}`,
  expBackgroundPath = `${backgroundsFolderPath}exp_pages_power_background${png}`,
  leftArrowIconPath = `${iconsFolderPath}left_arrow_icon${png}`,
  rightArrowIconPath = `${iconsFolderPath}right_arrow_icon${png}`,
  heroUpperBackgroundPath = `${backgroundsFolderPath}hero_upper_background${png}`,
  heroBottomBackgroundPath = `${backgroundsFolderPath}hero_bottom_background${png}`,
  infoIconsPath = `${iconsFolderPath}info_icons.json`,
  awakenIconPath = `${iconsFolderPath}awaken_icon${png}`,
  awakenIconBackgroundPath = `${backgroundsFolderPath}awaken_icon_background${png}`,
  nextGlyphsIconPath = `${iconsFolderPath}next_glyphs_icon${png}`,
  starBackgroundPath = `${backgroundsFolderPath}star_background${png}`,
  pedestalPath = `${heroesFolderPath}pedestal${png}`,
  statsUpperBackgroundPath = `${backgroundsFolderPath}stats_upper_background${png}`,
  statsBottomBackgroundPath = `${backgroundsFolderPath}stats_bottom_background${png}`,
  statsGreyLabelPath = `${labelsFolderPath}stats_grey_label${png}`,
  statsWhiteLabelPath = `${labelsFolderPath}stats_white_label${png}`,
  skillBackgroundPath = `${backgroundsFolderPath}skill_background${png}`,
  skillLabelPath = `${labelsFolderPath}skill_label${png}`,
  // handIconPath = `${iconsFolderPath}hand_icon${png}`,
  summonBooksBackgroundPath = `${backgroundsFolderPath}summon_books_background${png}`,
  lblSummonPath = `${labelsFolderPath}summon_label${png}`,
  bookOfMagicPath = `${iconsFolderPath}book_of_magic${png}`,
  grandBookOfMagicPath = `${iconsFolderPath}grand_book_of_magic${png}`,
  summoningBookPath = `${iconsFolderPath}summoning_book${png}`,
  // leryssaSummonIconPath = `${heroesFolderPath}leryssa/leryssa_summon_icon${png}`,
  // leonaSummonIconPath = `${heroesFolderPath}leona/leona_summon_icon${png}`,
  // -----------------------------------------------------------------------
  // bookmarkIconPath = `${iconsFolderPath}bookmarks/bookmark_icon${png}`,
  // allIconPath = `${iconsFolderPath}bookmarks/all_icon${png}`,
  // fighterIconPath = `${iconsFolderPath}bookmarks/fighter_icon${png}`,
  // mageIconPath = `${iconsFolderPath}bookmarks/mage_icon${png}`,
  // marksmanIconPath = `${iconsFolderPath}bookmarks/marksman_icon${png}`,
  // supportIconPath = `${iconsFolderPath}bookmarks/support_icon${png}`,
  // tankIconPath = `${iconsFolderPath}bookmarks/tank_icon${png}`,
  // borderGreyPath = `${heroesFolderPath}border_grey${png}`,
  // borderGreenPath = `${heroesFolderPath}border_green${png}`,
  // borderGreenPlus1Path = `${heroesFolderPath}border_green+1${png}`,
  // borderBluePath = `${heroesFolderPath}border_blue${png}`,
  // borderBluePlus1Path = `${heroesFolderPath}border_blue+1${png}`,
  // borderBluePlus2Path = `${heroesFolderPath}border_blue+2${png}`,
  // equipIconPath = `${iconsFolderPath}equip_icon${png}`,
  // equipIconSelectedPath = `${iconsFolderPath}equip_icon_s${png}`,
  // glyphsIconPath = `${iconsFolderPath}glyphs_icon${png}`,
  // glyphsIconSelectedPath = `${iconsFolderPath}glyphs_icon_s${png}`,
  // skillsIconPath = `${iconsFolderPath}skills_icon${png}`,
  // skillsIconSelectedPath = `${iconsFolderPath}skills_icon_s${png}`,
  // statsIconPath = `${iconsFolderPath}stats_icon${png}`,
  // statsIconSelectedPath = `${iconsFolderPath}stats_icon_s${png}`,
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
  // ------------------------
  aeloisGoldPath = `${heroesFolderPath}aelois/aelois_gold${png}`,
  amaraGoldPath = `${heroesFolderPath}amara/amara_gold${png}`,
  crystalGoldPath = `${heroesFolderPath}crystal/crystal_gold${png}`,
  diuwinGoldPath = `${heroesFolderPath}diuwin/diuwin_gold${png}`,
  leonaGoldPath = `${heroesFolderPath}leona/leona_gold${png}`,
  leryssaGoldPath = `${heroesFolderPath}leryssa/leryssa_gold${png}`,
  nadiaGoldPath = `${heroesFolderPath}nadia/nadia_gold${png}`,
  nyxGoldPath = `${heroesFolderPath}nyx/nyx_gold${png}`,
  sinGoldPath = `${heroesFolderPath}sin/sin_gold${png}`,
  zalajinGoldPath = `${heroesFolderPath}zalajin/zalajin_gold${png}`,
  zayaGoldPath = `${heroesFolderPath}zaya/zaya_gold${png}`,
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
  // ------------------------ Heroes Icons ---------------------------------
  aeloisIconSPath = `${heroesFolderPath}aelois/aelois_icon_selected${png}`,
  amaraIconSPath = `${heroesFolderPath}amara/amara_icon_selected${png}`,
  crystalIconSPath = `${heroesFolderPath}crystal/crystal_icon_selected${png}`,
  diuwinIconSPath = `${heroesFolderPath}diuwin/diuwin_icon_selected${png}`,
  leonaIconSPath = `${heroesFolderPath}leona/leona_icon_selected${png}`,
  leryssaIconSPath = `${heroesFolderPath}leryssa/leryssa_icon_selected${png}`,
  nadiaIconSPath = `${heroesFolderPath}nadia/nadia_icon_selected${png}`,
  nyxIconSPath = `${heroesFolderPath}nyx/nyx_icon_selected${png}`,
  sinIconSPath = `${heroesFolderPath}sin/sin_icon_selected${png}`,
  zalajinIconSPath = `${heroesFolderPath}zalajin/zalajin_icon_selected${png}`,
  zayaIconSPath = `${heroesFolderPath}zaya/zaya_icon_selected${png}`,
  // ------------------------ Heroes Ultimate Skills --------------------------------------
  aeloisUltSkillPath = `${heroesFolderPath}aelois/skills/skill_1${png}`,
  amaraUltSkillPath = `${heroesFolderPath}amara/skills/skill_1${png}`,
  crystalUltSkillPath = `${heroesFolderPath}crystal/skills/skill_1${png}`,
  diuwinUltSkillPath = `${heroesFolderPath}diuwin/skills/skill_1${png}`,
  leonaUltSkillPath = `${heroesFolderPath}leona/skills/skill_1${png}`,
  leryssaUltSkillPath = `${heroesFolderPath}leryssa/skills/skill_1${png}`,
  nadiaUltSkillPath = `${heroesFolderPath}nadia/skills/skill_1${png}`,
  nyxUltSkillPath = `${heroesFolderPath}nyx/skills/skill_1${png}`,
  sinUltSkillPath = `${heroesFolderPath}sin/skills/skill_1${png}`,
  zalajinUltSkillPath = `${heroesFolderPath}zalajin/skills/skill_1${png}`,
  zayaUltSkillPath = `${heroesFolderPath}zaya/skills/skill_1${png}`,
  // -----------------------------------------------------------------------
  // leonaSkillIconPath = `${heroesFolderPath}leona/skills_icons.json`,
  // plusGreenIconPath = `${iconsFolderPath}plus_green_icon${png}`,
  // plusOrangeIconPath = `${iconsFolderPath}plus_orange_icon${png}`,
  // // statsBackgroundPath = `${backgroundsFolderPath}stats_background${png}`,
  mapBackgroundPath = `${backgroundsFolderPath}map_background${png}`,
  mapPath = `${backgroundsFolderPath}map${png}`,
  lockIconPath = `${iconsFolderPath}lock_icon${png}`,
  difficultyIconBackgroundPath = `${backgroundsFolderPath}difficulty_icon_background${png}`,
  difficultySelectedPath = `${backgroundsFolderPath}difficulty_selected${png}`,
  normalDifficultyIconPath = `${iconsFolderPath}normal_difficulty_icon${png}`,
  eliteDifficultyIconPath = `${iconsFolderPath}elite_difficulty_icon${png}`,
  legendDifficultyIconPath = `${iconsFolderPath}legend_difficulty_icon${png}`,
  stageIconPath = `${iconsFolderPath}stage_icon${png}`,
  stageNumberIconPath = `${iconsFolderPath}stage_number${png}`,
  paragraphBackgroundPath = `${backgroundsFolderPath}paragraph_background${png}`,
  btnSweepPath = `${buttonsFolderPath}btn_sweep${png}`,
  btnSweepNoPath = `${buttonsFolderPath}btn_sweep_no${png}`,
  btnStartPath = `${buttonsFolderPath}btn_start${png}`,
  selectUpperBackgroundPath = `${backgroundsFolderPath}select_upper_background${png}`,
  selectBottomBackgroundPath = `${backgroundsFolderPath}select_bottom_background${png}`,
  btnAttackPath = `${buttonsFolderPath}btn_attack${png}`,
  selectNameLabelPath = `${labelsFolderPath}select_name_label${png}`,
  selectLevelLabelPath = `${labelsFolderPath}select_level_label${png}`,
  selectIconLockedPath = `${iconsFolderPath}select_icon_locked${png}`,
  selectHeroIconPath = `${iconsFolderPath}select_hero_icon${png}`,
  yesIconPath = `${iconsFolderPath}yes_icon${png}`,
  backgroundPath = `${backgroundsFolderPath}attack_screen_background${png}`,
  timerBackgroundPath = `${backgroundsFolderPath}timer_background${png}`,
  btnAutoPath = `${buttonsFolderPath}btn_auto${png}`,
  btnAutoNoPath = `${buttonsFolderPath}btn_auto_no${png}`,
  pauseIconPath = `${iconsFolderPath}pause_icon${png}`,
  hpBarPath = `${iconsFolderPath}hp_bar${png}`,
  mpBarPath = `${iconsFolderPath}mp_bar${png}`,
  timerIconPath = `${iconsFolderPath}timer_icon${png}`,
  labelDarkGreyPath = `${labelsFolderPath}lbl_dark_grey_680x72${png}`,
  labelLightGreyPath = `${labelsFolderPath}lbl_light_grey_680x72${png}`,
  exitIconPath = `${iconsFolderPath}exit_icon${png}`,
  soundIconPath = `${iconsFolderPath}sound_icon${png}`,
  musicIconPath = `${iconsFolderPath}music_icon${png}`,
  continueIconPath = `${iconsFolderPath}continue_icon${png}`,
  btnStatisticsPath = `${buttonsFolderPath}btn_statistics${png}`,
  btnNextPath = `${buttonsFolderPath}btn_next${png}`,
  rigthArrowPath = `${iconsFolderPath}right_arrow${png}`,
  // itemUseBackgroundPath = `${backgroundsFolderPath}item_use_background${png}`
  // // stageNoIconPath = `${iconsFolderPath}stage_icon_no${png}`,
  enemy01Path = `${enemiesFolderPath}enemy_01/enemy_01${png}`,
  enemy02Path = `${enemiesFolderPath}enemy_02/enemy_02${png}`,
  enemy03Path = `${enemiesFolderPath}enemy_03/enemy_03${png}`,
  enemy04Path = `${enemiesFolderPath}enemy_04/enemy_04${png}`,
  enemy05Path = `${enemiesFolderPath}enemy_05/enemy_05${png}`,
  enemy06Path = `${enemiesFolderPath}enemy_06/enemy_06${png}`;

// Global variables
let renderer, stage, stats,
  // btnPurple248x80,
  storyTutorialContainer,
  tutorialContainer,
  mainScreenContainer, //mainScreenIconsContainer,
  avatarContainer, avatarScreenContainer,
  barContainer,
  // avatarChangeNameContainer,
  scrollContainer, // battleContainer, marketsContainer,
  summonBooksContainer, summonContainer,
  heroesContainer, // heroesPortraitContainer,
  statsContainer, glyphsContainer, skillsContainer, equipContainer,
  mapContainer;

let freeCounter, battleTimerCounter;

// Define Textstyle variables
let textStyleBtn60_44_black, textStyleBubble_52left_white, textStyle144_40center_black,
  textStyleLevel_40center_white, textStyleAvatar_28center_brown, textStyle_32left_black,
  textStyle_32center_black, textStyle_32right_black, textStyle10pOff_20right_red,
  textStyleHeroStats_28left_black, textStyleHeroStatsLevel_32left_white,
  textStylePlusEquip_32left_green, textStyleDifficultyNormal_32left_green,
  textStyleDifficultyElite_32left_orange, textStyleDifficultyLegend_32left_purple,
  textStyleDescription_48left_black, textStyleHeroSelectLevel_20left_white,
  textStyleHeroesLevel_16center_white, textStyleText_40left_black,
  textStyleHero_48center_white, textStyleExpPagesBar_30center_white,
  textStyleBtn60_44center_black, textStyleCalcAttack_32center_white,
  textStyleManaResult_32center_yellow, textStyleUltSill_36center_orange,
  textStyleResult_48left_white, textStyleBattleEnd_80center_yellow;

let interMainScreenArray = [],
  interScrollArray = [],
  interParagraphsArray = [],
  interBtnBackStartArray = [],
  interSelectHeroesArray = [];

// Story Tutorial variables (stc = storyTutorialContainer)
let
  // backgroundEmpty_stc,
  // spriteApprentice, spritePlayer, spriteBubble,
  // textSpriteBubble,
  // spriteMaster,
  spriteArrowDown;

// Tutorial variables (tc = tutorialContainer)
let
  // backgroundDarker_tc,
  handIcon_tc, bubble_tc, textBubble_tc;

// Mainscreen variables (mc = mainScreenContainer)
// let backgroundEmpty_mc,
// Scroll in mainScreenContainer
let scrollBtn192x72_mc,
  scrollArrow72x36_mc,
  // Avatar in avatarContainer (ac = avatarContainer)
  // avatarBorder, avatarImage, avatarLevelIcon, textAvatarLevelIcon,
  // avatarNameField, textAvatarNameField, avatarExpField, textAvatarExpField,
  btnBack, btnChangeName,
  // Button in mainScreenIconsContainer (mac = mainScreenIconsContainer)
  // btnMap, //textBtnMap, btnGuild, textBtnGuild, btnRanking, textBtnRanking,
  // btnFriends, textBtnFriends, btnCrusade, textBtnCrusade, btnMail, textBtnMail,
  // btnTown, textBtnTown,
  //btnSummonBooks,
  // textBtnSummonBooks,
  // Bars in barContainer (bc = barContainer)
  barEnergyBackground, textBarEnergy,
  barGoldBackground, textBarGold,
  barDiamondBackground, textBarDiamond,
  // plusBarEnergy,
  // plusBarGold, goldIcon,
  // plusBarDiamond;
  // Scroll (in Mainscreen) variables in scrollContainer (sc = scrollContainer)
  // let scrollBackground, scrollBottom,
  // btnHeroes, //textBtnHeroes,
  // btnInventory, textBtnInventory, btnTasks, textBtnTasks,
  // btnTrials, textBtnTrials, btnBattle, textBtnBattle, btnMarkets, textBtnMarkets;

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
  summoningItem_suc //,
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
// let battleScrollBackground,
// btnArena, textBtnArena, btnGrandArena, textBtnGrandArena;

// Markets variables (mrc = marketsContainer)
// let marketsScrollBackground,
//   btnArenaShop, textBtnArenaShop, btnGrandArenaShop, textBtnGrandArenaShop,
//   btnGuildShop, textBtnGuildShop, btnCrusadeShop, textBtnCrusadeShop,
//   btnFantasyShop, textBtnFantasyShop, btnShop, textBtnShop;

let aeloisContainer, amaraContainer, crystalContainer, diuwinContainer, leonaContainer,
  leryssaContainer, nadiaContainer, nyxContainer, sinContainer, zalajinContainer,
  zayaContainer;

let aeloisIconContainer, amaraIconContainer, crystalIconContainer, diuwinIconContainer,
  leonaIconContainer, leryssaIconContainer, nadiaIconContainer, nyxIconContainer,
  sinIconContainer, zalajinIconContainer, zayaIconContainer;

let aelois, amara, crystal, diuwin, leona, leryssa, nadia, nyx, sin, zalajin, zaya;

let enemy01Container, enemy02Container, enemy03Container, enemy04Container, enemy05Container,
  enemy06Container;

let enemy01, enemy02, enemy03, enemy04, enemy05, enemy06;

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
      .add([])
      .on("progress", loadProgressHandler)
      .load(setup);

  } else {
    // Use PIXI's built-in 'loader' module to load an image and run the 'setup' function when it's done
    loader
      .add([
        loadingBackgroundPath,
        backgroundEmptyPath, // backgroundEmptyBlurPath,
        backgroundDarkerPath,
        btn144x144Path, btn144x72Path, btn96x144Path, //avatarScreenBackgroundPath,
        btnBackPath, //backgroundBookPath,
        btnGreen248x60Path, btnGreen260x72Path,
        avatarImageJsonPath, avatarBorderJsonPath, avatarLevelJsonPath,
        barBackgroundPath, plusIconPath, goldIconPath, diamondIconPath, //handIconPath,
        btnClosePath,
        // avatarChangeNameBackgroundPath,
        // apprenticePath, playerPath, masterPath, bubblePath,
        arrowDown120x48Path,
        scrollBtn192x72Path, scrollArrow72x36Path, scroll192x1068Path,
        scrollBtn192x48Path,
        glyphsPath, glyphsNoPath,
        // scroll312x192Path,
        // // Avatar
        // // avatarBorderPath,
        // avatarImagePath, //avatarLevelBluePath, avatarFieldPath,
        banner620x98Path, // banner620x98GreyPath,
        summonBooksBackgroundPath, lblSummonPath, bookOfMagicPath, grandBookOfMagicPath,
        summoningBookPath, // leryssaSummonIconPath, leonaSummonIconPath,
        // //avatarChangeNameNamefieldPath, dicePath,
        // // Grey Glyphs
        // // noGlyphIconPath,
        // // abilityPowerIconPath, armorIconPath, armorPenIconPath,
        // // attackDamageIconPath, attackForceIconPath, critStrikeIconPath,
        // // doubleAttackIconPath, energyRegenIconPath, hardinessIconPath,
        // // healthIconPath, healthRegenIconPath, magicForceIconPath, magicPenIconPath,
        // // magicResistIconPath, regenerateIconPath,
        // // // // Green Glyphs
        // // aggressionIconPath, avariceIconPath, balanceIconPath, bloodthirstIconPath,
        // // braveryIconPath, cardioIconPath, defenseIconPath, divinePowerIconPath,
        // // enforcementIconPath, extraHealthIconPath, fortitudeIconPath, chivalryIconPath,
        // // illusionIconPath, immortalityIconPath, infinityIconPath, magicShieldIconPath,
        // // meditationIconPath, natureIconPath, osmosisIconPath, providenceIconPath,
        // // prowessIconPath, sublimityIconPath, valorIconPath,
        // // Blue Glyphs
        // // Purple Glyphs
        // // Orange Glyphs
        // // -----------------------------------------------------------------------
        // // Heroes
        // // leftArrowIconPath, rightArrowIconPath,
        // // bookmarkIconPath, // allIconPath,
        // // fighterIconPath, mageIconPath, marksmanIconPath, supportIconPath,
        // // tankIconPath, // borderGreyPath, borderGreenPath, borderGreenPlus1Path, borderBluePath,
        // // borderBluePlus1Path, borderBluePlus2Path,
        // //starIconPath,
        // // pedestalPath,
        // // starBackgroundPath,
        // // expBackgroundPath, // pageIconPath,
        // // heroUpperBackgroundPath, heroBottomBackgroundPath,
        // // equipIconPath, equipIconSelectedPath, glyphsIconPath, glyphsIconSelectedPath,
        // // skillsIconPath, skillsIconSelectedPath, // statsIconPath, statsIconSelectedPath,
        // // awakenIconPath, awakenIconBackgroundPath,
        // // nextGlyphsIconPath,
        // helpIconPath,
        // Heroes
        aeloisPath, amaraPath, crystalPath, diuwinPath, leonaPath, leryssaPath,
        nadiaPath, nyxPath, sinPath, zalajinPath, zayaPath,
        // Heroes Gold
        aeloisGoldPath, amaraGoldPath, crystalGoldPath, diuwinGoldPath, leonaGoldPath,
        leryssaGoldPath, nadiaGoldPath, nyxGoldPath, sinGoldPath, zalajinGoldPath,
        zayaGoldPath,
        // Heroes Stats
        aeloisStatsPath, amaraStatsPath, crystalStatsPath, diuwinStatsPath, leonaStatsPath,
        leryssaStatsPath, nadiaStatsPath, nyxStatsPath, sinStatsPath, zalajinStatsPath,
        zayaStatsPath,
        // Heroes Icons
        aeloisIconSPath, amaraIconSPath, crystalIconSPath, diuwinIconSPath, leonaIconSPath,
        leryssaIconSPath, nadiaIconSPath, nyxIconSPath, sinIconSPath, zalajinIconSPath,
        zayaIconSPath,
        // Heroes
        // ---------------------
        // leonaSkillIconPath,
        // skillBackgroundPath, skillLabelPath, // statsUpperBackgroundPath,
        // statsBottomBackgroundPath,
        // // statsGreyLabelPath, statsWhiteLabelPath,
        // mapBackgroundPath, mapPath,
        // difficultyIconBackgroundPath, normalDifficultyIconPath, eliteDifficultyIconPath,
        // legendDifficultyIconPath,
        // Enemies
        enemy01Path, enemy02Path, enemy03Path, enemy04Path, enemy05Path, enemy06Path
        // pauseIconPath
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
    renderer.resize(Math.ceil(GAME_WIDTH * ratio), Math.ceil(GAME_HEIGHT * ratio));
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

    if (fontsLoaded) {
      myFontFamily = 'Josefin Sans';
    }

    // TextStyle for button with 80px height
    textStyleBtn60_44_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 44,
      align: 'center',
      fill: '#000'
    });

    // TextStyle for textBubble
    textStyleBubble_52left_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 52,
      aligh: 'left',
      fill: '#fff'
    });

    // TextStyle for mainScreenIcons
    textStyle144_40center_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 40,
      // fontWeight: 'bold',
      align: 'center',
      fill: '#000'
    });

    // TextStyle for avatarLevelIcon, banners, text in barContainer
    textStyleLevel_40center_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 40,
      align: 'center',
      fill: '#fff'
    });

    // TextStyle for name and exp in avatar
    textStyleAvatar_28center_brown = new TextStyle({
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
    textStyle10pOff_20right_red = new TextStyle({
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

    textStylePlusEquip_32left_green = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'left',
      fill: '#00cc00'
    });

    textStyleDifficultyNormal_32left_green = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'left',
      fill: '#00FF33',
      fontWeight: 'bolder',
      stroke: '#009900',
      strokeThickness: 6,
      letterSpacing: 2
    });

    textStyleDifficultyElite_32left_orange = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'left',
      fill: '#FF9933',
      fontWeight: 'bolder',
      stroke: '#CC3300',
      strokeThickness: 6,
      letterSpacing: 2
    });

    textStyleDifficultyLegend_32left_purple = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'left',
      fill: '#9933CC',
      fontWeight: 'bolder',
      stroke: '#660099',
      strokeThickness: 6,
      letterSpacing: 2
    });

    // TextStyle for paragraph description
    textStyleDescription_48left_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 48,
      align: 'left',
      fill: '#000',
      letterSpacing: -2
    });

    //
    textStyleHeroSelectLevel_20left_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 20,
      align: 'left',
      fill: '#fff'
    });

    //
    textStyleHeroesLevel_16center_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 16,
      align: 'center',
      fill: '#fff'
    });

    //
    textStyleText_40left_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 40,
      align: 'left',
      fill: '#000',
      lineHeight: 56,
      letterSpacing: -2
    });

    //
    textStyleHero_48center_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 48,
      align: 'center',
      fill: '#fff'
    });

    textStyleExpPagesBar_30center_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 30,
      align: 'center',
      fill: '#fff'
      // letterSpacing: -2
    });

    textStyleBtn60_44center_black = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 44,
      align: 'center',
      fill: '#000'
    });

    textStyleCalcAttack_32center_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'center',
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 8
    });

    textStyleManaResult_32center_yellow = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 32,
      align: 'center',
      fill: '#ffff11',
      stroke: '#000',
      strokeThickness: 8
    });

    textStyleUltSill_36center_orange = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 36,
      align: 'center',
      fill: '#ff7700',
      stroke: '#000',
      strokeThickness: 10
    });

    textStyleResult_48left_white = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 48,
      align: 'left',
      fill: '#ffffff',
      fontWeight: 'bold'
    });

    textStyleBattleEnd_80center_yellow = new TextStyle({
      fontFamily: myFontFamily,
      fontSize: 160,
      align: 'center',
      fill: '#ffff11',
      fontWeight: 'bold',
      stroke: '#ff7700',
      strokeThickness: 16
    });

    spriteArrowDown = new Sprite(resources[arrowDown120x48Path].texture);
    spriteArrowDown.position.set(1690, 952);
    spriteArrowDown.vx = 0;
    spriteArrowDown.vy = 0;

    // setLoadingContainer();

    // ----- MAIN SCREEN (stage)-----
    // Avatar in avatarContainer ('avatarBorder', ...)
    // Bars in barContainer which is in mainScreenContainer ('stamina', 'gold', 'diamond')
    // Buttons in mainScreenContainer ('Map', 'Guild', 'Ranking', ...)
    // Scroll menu in mainScreenContainer
    // ----- SUMMON BOOKS (sbc = summonBooksContainer) -----
    // ----- SUMMON x1 (10) SCREEN (suc = summonContainer) -----

    // ----- STORY TUTORIAL SCREEN -----
    // loadStoryTutorialData();
    // setMainScreen();
    // socket.emit('storyTutorialEmit');
    // socket.on('storyTutorialDataEmit', data => {
    //   console.log(data);
    // });
    // socket.on('storyTutorialData', (data) => {
    // console.log(data.message);
    setStoryTutorialContainer(); // !!!!!!!!!!!!!!!!!!!
    // });

    // ----- MAIN SCREEN -----
    // loadMainScreenContainerData();
    //
    // loadAvatarContainerData('avatarContainer', 'avatarContainerData');
    // // setAvatarContainer(); // Add Avatar into the Main Screen (mainScreenContainer)
    // // loadBarContainerData('barContainer', 'barContainerData');
    // setBarContainer(); // Add Bars into the Main Screen

    // setScrollContainer(); // Add Scroll into the Main Screen

    // setMainScreenContainer(); // !!!!!
    // ----- TUTORIAL SCREEN -----
    // setTutorialContainer(); !!!!!

    // ----- SUMMONBOOKS SCREEN -----
    // setSummonBooksContainer();

    // ----- SUMMON SCREEN -----
    // setSummonContainer();

    // Server send data about game status (player level, heroes info, ...) if avatar.tutorial = 'no'
    // mainScreenContainer.addChild(backgroundEmpty_stc,
    //   mainScreenIconsContainer, avatarContainer, barContainer,
    //   scrollContainer, scrollBtn192x72_mc, scrollArrow72x36_mc,
    //   backgroundDarker_mc, btnSummonBooks, textBtnSummonBooks, handIcon_mc,
    //   bubble_mc);
    //
    // stage.addChild(mainScreenContainer);

    aeloisContainer = new Container();
    amaraContainer = new Container();
    crystalContainer = new Container();
    diuwinContainer = new Container();
    leonaContainer = new Container();
    leryssaContainer = new Container();
    nadiaContainer = new Container();
    nyxContainer = new Container();
    sinContainer = new Container();
    zalajinContainer = new Container();
    zayaContainer = new Container();

    aeloisIconContainer = new Container();
    amaraIconContainer = new Container();
    crystalIconContainer = new Container();
    diuwinIconContainer = new Container();
    leonaIconContainer = new Container();
    leryssaIconContainer = new Container();
    nadiaIconContainer = new Container();
    nyxIconContainer = new Container();
    sinIconContainer = new Container();
    zalajinIconContainer = new Container();
    zayaIconContainer = new Container();

    // Position heroes for animations // TODO: dodělat animace
    aelois = new Sprite(resources[aeloisPath].texture);
    aelois.position.set(0, 0);
    amara = new Sprite(resources[amaraPath].texture);
    amara.position.set(0, 0);
    crystal = new Sprite(resources[crystalPath].texture);
    crystal.position.set(0, 0);
    diuwin = new Sprite(resources[diuwinPath].texture);
    diuwin.position.set(0, 0);
    leona = new Sprite(resources[leonaPath].texture);
    leona.position.set(0, 0);
    leryssa = new Sprite(resources[leryssaPath].texture);
    leryssa.position.set(0, 0);
    nadia = new Sprite(resources[nadiaPath].texture);
    nadia.position.set(0, 0);
    nyx = new Sprite(resources[nyxPath].texture);
    nyx.position.set(0, 0);
    sin = new Sprite(resources[sinPath].texture);
    sin.position.set(0, 0);
    zalajin = new Sprite(resources[zalajinPath].texture);
    zalajin.position.set(0, 0);
    zaya = new Sprite(resources[zayaPath].texture);
    zaya.position.set(0, 0);

    enemy01Container = new Container();
    enemy02Container = new Container();
    enemy03Container = new Container();
    enemy04Container = new Container();
    enemy05Container = new Container();
    enemy06Container = new Container();

    // Position enemies for animations // TODO: dodělat animace
    enemy01 = new Sprite(resources[enemy01Path].texture);
    enemy01.position.set(0, 0);
    enemy02 = new Sprite(resources[enemy02Path].texture);
    enemy02.position.set(0, 0);
    enemy03 = new Sprite(resources[enemy03Path].texture);
    enemy03.position.set(0, 0);
    enemy04 = new Sprite(resources[enemy04Path].texture);
    enemy04.position.set(0, 0);
    enemy05 = new Sprite(resources[enemy05Path].texture);
    enemy05.position.set(0, 0);
    enemy06 = new Sprite(resources[enemy06Path].texture);
    enemy06.position.set(0, 0);

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
// Logic in 'gameScene'
function playing() {

  goUpAndDown(spriteArrowDown, 952, 0.5);

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
  if (item.y === pos - 12) {
    item.vy = -speed;
  }
  if (item.y === pos) {
    item.vy = speed;
  }
}

// Countdown Timers (in summonBooksContainer) - 5 minutes, 46 hours
function countdownTimer(countdownSocketOn, countdownSocketEmit, value, textLblGold, textAboveLbl, btn) {
  textLblGold.text = value;
  textLblGold.x = btn.x + btn.width / 2 - textLblGold.width / 2;
  textLblRight_suc.text = value;
  textLblRight_suc.x = lblRight_suc.x + lblRight_suc.width / 2 - textLblRight_suc.width / 2;
  socket.on(countdownSocketOn, (data) => {
    textAboveLbl.x = btn.x + btn.width / 2 - textAboveLbl.width / 2;
    if (data.countdown === 0) {
      if (countdownSocketOn === 'timer5minutesStarted') {
        textLblGold.text = '--Free--';
        textLblGold.x = btn.x + btn.width / 2 - textLblGold.width / 2;
        textLblRight_suc.text = '--Free--';
        textLblRight_suc.x = lblRight_suc.x + lblRight_suc.width / 2 - textLblRight_suc.width / 2;
        freeCounter--;
        textAboveLbl.text = '--Free Times ' + freeCounter + '/5--';
        textAboveLbl.x = btn.x + btn.width / 2 - textAboveLbl.width / 2;
      }
      if (countdownSocketOn === 'timer46hoursStarted') {
        textLblGold.text = '--Free--';
        textLblGold.x = btn.x + btn.width / 2 - textLblGold.width / 2;
        textLblRight_suc.text = '--Free--';
        textLblRight_suc.x = lblRight_suc.x + lblRight_suc.width / 2 - textLblRight_suc.width / 2;
        textAboveLbl.text = '--Free Time--';
        textAboveLbl.x = btn.x + btn.width / 2 - textAboveLbl.width / 2;
      }
      console.log('Countdown ' + countdownSocketOn + ' Finished!');
      socket.emit(countdownSocketEmit);
    } else {
      let hours = ~~(data.countdown / 3600);
      if (hours < 10) {
        hours = '0' + hours;
      }
      let minutes = ~~(data.countdown / 60);
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      let seconds = data.countdown % 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      // console.log(hours+':'+minutes+':'+seconds);
      textAboveLbl.text = '--Free after --' + hours + ':' + minutes + ':' + seconds;
    }
  });
}

// Battle Countdown Timer - 1:30 minutes
function battleCountdownTimer(countdownSocketOn, countdownSocketEmit,
  counterText, backgroundSprite) {
  socket.on(countdownSocketOn, (data) => {
    if (data.countdown === 0) {
      counterText.text = '00:00';
      console.log(`Battle ${countdownSocketOn} Finished!`);
      socket.emit(countdownSocketEmit);
    } else {
      let minutes = ~~(data.countdown / 60);
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      let seconds = data.countdown % 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      // console.log(minutes+':'+seconds);
      counterText.text = minutes + ':' + seconds;
    }
  });
}

// Set child element position to middle (x and y) of parent element
function setMiddlePos(parent, child) {
  let x = parent.x + parent.width / 2 - child.width / 2;
  let y = parent.y + parent.height / 2 - child.height / 2;
  return {
    x,
    y
  };
}

// Set interactive
function setInteractive(item, value) {
  item.interactive = value;
  item.buttonMode = value;
}

let loadingBackground, loadingText, textLoading;

// Add loadingSprite to `stage`
function addLoadingBackground(container, text) {
  loadingBackground = new Sprite(resources[loadingBackgroundPath].texture);
  loadingBackground.position.set(
    GAME_WIDTH / 2 - loadingBackground.width / 2,
    GAME_HEIGHT / 2 - loadingBackground.height / 2
  );

  textLoading = new Text(text, textStyleBtn60_44_black);
  textLoading.position.set(
    setMiddlePos(loadingBackground, textLoading).x,
    setMiddlePos(loadingBackground, textLoading).y + 2
  );

  container.addChild(loadingBackground, textLoading);
}

// Add darker background to the Container
function addDarkerBackground(container) {
  const spriteBackground = new Sprite(resources[backgroundDarkerPath].texture);
  spriteBackground.position.set(0, 0);

  container.addChild(spriteBackground);
}

// // Add Close icon to the Container
// function addCloseIcon(container, parent) {
//   closeIcon = new Sprite(resources[btnClosePath].texture);
//   closeIcon.width = 96;
//   closeIcon.height = 96;
//   closeIcon.position.set(
//     parent.x+parent.width-closeIcon.width/2-12,
//     parent.y-closeIcon.height/2+12
//   );
//
//   setInteractive(closeIcon, true);
//
//   container.addChild(closeIcon);
//
//   // console.log(stage.children);
//
//   closeIcon.on('click', (event) => {
//     console.log('closeIcon clicked');
//     stage.removeChild(stage.children[stage.children.length-1]);
//     // setTimeout(() => {
//     //   if (scrollArrow72x36_mc.interactive === false) {
//     //     setInteractive(scrollArrow72x36_mc, true);
//     //   }
//     //   if (avatarContainer.interactive === false) {
//     //     setInteractive(avatarContainer, true);
//     //   }
//     //   if (btnSummonBooks.interactive === false) {
//     //     setInteractive(btnSummonBooks, true);
//     //   }
//     //   setInteractive(btnMap, true);
//     // }, LATENCY*2);
//   });
// }

// function setBookBackground(container) {
//   let backgroundEmpty = new Sprite(resources[backgroundEmptyPath].texture);
//   backgroundEmpty.position.set(0, 0);
//
//   let backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
//   backgroundDarker.position.set(0, 0);
//
//   let backgroundBook = new Sprite(resources[backgroundBookPath].texture);
//   backgroundBook.position.set(
//     GAME_WIDTH/2-backgroundBook.width/2,
//     144
//   );
//
//   container.addChild(backgroundEmpty, backgroundDarker, backgroundBook);
// }

// Setup storyTutorialContainer
function setStoryTutorialContainer() {
  socket.on('startData', (data) => {
    console.log(data);
    loadingText = data.loading;
    if (data.dataStory === 'yes') {
      storyTutorialContainer = new Container();

      const backgroundEmpty = new Sprite(resources[backgroundEmptyPath].texture);
      backgroundEmpty.position.set(0, 0);

      const btnSkip = new Sprite(resources[btnGreen248x60Path].texture);
      btnSkip.position.set(1600, 72);

      storyTutorialContainer.addChild(backgroundEmpty, btnSkip);
      addLoadingBackground(storyTutorialContainer, loadingText);

      function loadStoryTutorialImages() {
        if (apprenticePath in loader.resources && playerPath in loader.resources &&
          masterPath in loader.resources && bubblePath in loader.resources
          // && arrowDown120x48Path in loader.resources
        ) {
          console.log(`${apprenticePath} - already in stage`);
          console.log(`${playerPath} - already in stage`);
          console.log(`${masterPath} - already in stage`);
          console.log(`${bubblePath} - already in stage`);
          // console.log(`${arrowDown120x48Path} - already in stage`);
          addStoryTutorialImages();
        } else {
          loader
            .add([
              apprenticePath, playerPath, masterPath, bubblePath //, arrowDown120x48Path
            ]);
        }

        loader
          .once('complete', (loader, resources) => {
            addStoryTutorialImages();
          });
      }

      function addStoryTutorialImages() {
        const spriteApprentice = new Sprite(resources[apprenticePath].texture);
        spriteApprentice.position.set(120, 494);

        const spritePlayer = new Sprite(resources[playerPath].texture);
        spritePlayer.position.set(120, 494);
        spritePlayer.visible = false;

        const spriteMaster = new Sprite(resources[masterPath].texture);
        spriteMaster.position.set(1400, 494);
        spriteMaster.visible = false;

        const spriteBubble = new Sprite(resources[bubblePath].texture);
        spriteBubble.position.set(60, 744);

        storyTutorialContainer.addChild(spriteApprentice, spritePlayer, spriteMaster,
          spriteBubble, spriteArrowDown);

        socket.emit('storyTutorial');
        socket.on('storyTutorialData', data => {
          console.log('storyTutorialData', data);

          const
            skipText = data.skipText,
            storyText = data.message;

          socket.off('storyTutorialData');

          const textBtnSkip = new Text(skipText, textStyleBtn60_44_black);
          textBtnSkip.position.set(
            setMiddlePos(btnSkip, textBtnSkip).x,
            setMiddlePos(btnSkip, textBtnSkip).y + 2
          );

          setInteractive(btnSkip, true);
          btnSkip.on('click', () => {
            console.log('btnSkip clicked');
            socket.emit('btnSkip', 'btnSkip clicked');
            stage.removeChild(storyTutorialContainer);
            setMainScreenContainer();
          });

          let textSpriteBubble = new Text(storyText[0].text, textStyleBubble_52left_white);
          textSpriteBubble.position.set(
            176,
            setMiddlePos(spriteBubble, textSpriteBubble).y
          );

          let i = 1;
          // let j = 0; // for 2-times click on bubble with story text
          setInteractive(spriteBubble, true);
          spriteBubble.on('click', () => {
            if (i === storyText.length) {
              console.log('end');
              socket.emit('btnSkip');
              stage.removeChild(storyTutorialContainer);
              setMainScreenContainer();
            }
            if (i < storyText.length) {
              // if (j === 0) {
              textSpriteBubble.text = storyText[i].text;
              textSpriteBubble.position.set(
                176,
                setMiddlePos(spriteBubble, textSpriteBubble).y
              );
              if (storyText[i].speaker === 'A') {
                spriteApprentice.visible = true;
                spriteMaster.visible = false;
              } else if (storyText[i].speaker === 'M') {
                spriteMaster.visible = true;
                spriteApprentice.visible = false;
                spritePlayer.visible = false;
              } else if (storyText[i].speaker === 'P') {
                spritePlayer.visible = true;
                spriteMaster.visible = false;
              } else {
                spriteApprentice.visible = false;
              }
              // j = 1;
              // } else if (j === 1) {
              //   j = 0;
              i++;
              // console.log('i', i);
              // }
            }
          });
          storyTutorialContainer.addChild(textBtnSkip, textSpriteBubble);
          storyTutorialContainer.removeChild(loadingBackground, textLoading);
        });
      }
      loadStoryTutorialImages();
      stage.addChild(storyTutorialContainer);
    } else {
      setMainScreenContainer();
    }
  });
}

// Setup `mainScreenContainer`
function setMainScreenContainer() {
  mainScreenContainer = new Container();

  const backgroundEmpty = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty.position.set(0, 0);

  mainScreenContainer.addChild(backgroundEmpty);

  addLoadingBackground(mainScreenContainer, loadingText);

  const btnMap = new Sprite(resources[btn144x144Path].texture);
  btnMap.position.set(116, 428);

  const btnGuild = new Sprite(resources[btn144x144Path].texture);
  btnGuild.position.set(380, 216);

  const btnRanking = new Sprite(resources[btn144x72Path].texture);
  btnRanking.position.set(386, 454);

  const btnFriends = new Sprite(resources[btn96x144Path].texture);
  btnFriends.position.set(702, 256);

  const btnCrusade = new Sprite(resources[btn144x144Path].texture);
  btnCrusade.position.set(1060, 96);

  const btnMail = new Sprite(resources[btn96x144Path].texture);
  btnMail.position.set(1240, 302);

  const btnTown = new Sprite(resources[btn144x144Path].texture);
  btnTown.position.set(1418, 380);

  const btnSummonBooks = new Sprite(resources[btn144x144Path].texture);
  btnSummonBooks.position.set(1512, 108);

  mainScreenContainer.addChild(btnMap, btnGuild, btnRanking, btnFriends, btnCrusade,
    btnMail, btnTown, btnSummonBooks);

  socket.emit('mainScreenContainer');
  socket.on('mainScreenContainerData', (data) => {
    console.log('mainScreenContainerData', data);

    const
      mapText = data.map,
      guildText = data.guild,
      rankingText = data.ranking,
      friendsText = data.friends,
      crusadeText = data.crusade,
      mailText = data.mail,
      townText = data.town,
      summonBooksText = data.summonBooks,
      heroesText = data.heroes,
      inventoryText = data.inventory,
      tasksText = data.tasks,
      trialsText = data.trials,
      battleText = data.battle,
      marketsText = data.markets,
      arenaText = data.arena,
      grandArenaText = data.grandArena,
      arenaShopText = data.arenaShop,
      grandArenaShopText = data.grandArenaShop,
      guildShopText = data.guildShop,
      crusadeShopText = data.crusadeShop,
      fantasyShopText = data.fantasyShop,
      shopText = data.shop;

    socket.off('mainScreenContainerData');

    const textBtnMap = new Text(mapText, textStyle144_40center_black);
    textBtnMap.position.set(
      setMiddlePos(btnMap, textBtnMap).x,
      setMiddlePos(btnMap, textBtnMap).y + 2
    );

    setInteractive(btnMap, true);
    interMainScreenArray.push(btnMap);

    btnMap.on('click', () => {
      console.log('btnMap clicked');
      // // if (btnMap.visible) {
      //   mainScreenContainer.removeChild(scrollContainer);
      //   mainScreenContainer.removeChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
      //   console.log('stage.children.length', stage.children.length);
      //   if (stage.children.length === 2) {
      //     console.log(mapContainer.children[mapContainer.children.length-1]);
      //     scrollArrow72x36_mc.scale.y = -1;
      //     mapContainer.removeChild(mapContainer.children[mapContainer.children.length-1]);
      //   }
      // if (stage.children.length === 1) {
      setMapContainer();
      // }
      // // }
    });

    const textBtnGuild = new Text(guildText, textStyle144_40center_black);
    textBtnGuild.position.set(
      setMiddlePos(btnGuild, textBtnGuild).x,
      setMiddlePos(btnGuild, textBtnGuild).y + 2
    );

    const textBtnRanking = new Text(rankingText, textStyle144_40center_black);
    textBtnRanking.position.set(
      setMiddlePos(btnRanking, textBtnRanking).x,
      setMiddlePos(btnRanking, textBtnRanking).y + 2
    );

    const textBtnFriends = new Text(friendsText, textStyle144_40center_black);
    textBtnFriends.position.set(
      setMiddlePos(btnFriends, textBtnFriends).x,
      setMiddlePos(btnFriends, textBtnFriends).y + 2
    );

    const textBtnCrusade = new Text(crusadeText, textStyle144_40center_black);
    textBtnCrusade.position.set(
      setMiddlePos(btnCrusade, textBtnCrusade).x,
      setMiddlePos(btnCrusade, textBtnCrusade).y + 2
    );

    const textBtnMail = new Text(mailText, textStyle144_40center_black);
    textBtnMail.position.set(
      setMiddlePos(btnMail, textBtnMail).x,
      setMiddlePos(btnMail, textBtnMail).y + 2
    );

    const textBtnTown = new Text(townText, textStyle144_40center_black);
    textBtnTown.position.set(
      setMiddlePos(btnTown, textBtnTown).x,
      setMiddlePos(btnTown, textBtnTown).y + 2
    );

    const textBtnSummonBooks = new Text(summonBooksText, textStyle144_40center_black);
    textBtnSummonBooks.position.set(
      setMiddlePos(btnSummonBooks, textBtnSummonBooks).x,
      setMiddlePos(btnSummonBooks, textBtnSummonBooks).y + 2
    );

    setInteractive(btnSummonBooks, true);
    interMainScreenArray.push(btnSummonBooks);

    btnSummonBooks.on('click', () => {
      console.log('btnSummonBooks clicked');
      setSummonBooksContainer();
    });

    mainScreenContainer.addChild(textBtnMap, textBtnGuild, textBtnRanking,
      textBtnFriends, textBtnCrusade, textBtnMail, textBtnTown, textBtnSummonBooks);
    mainScreenContainer.removeChild(loadingBackground, textLoading);
    loadAvatarContainerData('avatarContainer', 'avatarContainerData');
    setBarContainer();
    setScrollArrow(mainScreenContainer, heroesText, inventoryText, tasksText,
      trialsText, battleText, marketsText, arenaText, grandArenaText, arenaShopText,
      grandArenaShopText, guildShopText, crusadeShopText, fantasyShopText, shopText);
  });
  stage.addChild(mainScreenContainer);
}

// Load `avatarContainer` data from DB = only data that shown in avatar (left corner of screen)
function loadAvatarContainerData(socketEmit, socketOn) {
  avatarContainer = new Container();

  socket.emit(socketEmit);
  socket.on(socketOn, (data) => {
    console.log(socketOn, data);

    const
      avatarBorderTextPath = data.avatarBorder,
      avatarImageTextPath = data.avatarImage,
      avatarLevelIconTextPath = data.avatarLevelIcon,
      nicknameText = data.nickname,
      playerLvlText = data.playerLvl,
      currentExpText = data.currentExp,
      nextLvlExpText = data.nextLvlExp;

    socket.off(socketOn);

    function addAvatarImage(imagePath) {
      let id = resources[avatarImageJsonPath].textures;

      let avatarImage = new Sprite(id[`${imagePath}${png}`]);
      avatarImage.scale.set(0.67);
      avatarImage.position.set(60, 60);

      avatarContainer.addChild(avatarImage);
    }

    function addAvatarBorder(imagePath) {
      let id = resources[avatarBorderJsonPath].textures;

      let avatarBorder = new Sprite(id[`${imagePath}${png}`]);
      avatarBorder.scale.set(0.67);
      avatarBorder.position.set(36, 36);

      let textAvatarNameField = new Text(nicknameText, textStyleAvatar_28center_brown);
      textAvatarNameField.position.set(346 - textAvatarNameField.width / 2, 102);

      let textAvatarExpField = new Text(currentExpText + '/' + nextLvlExpText, textStyleAvatar_28center_brown);
      textAvatarExpField.position.set(326 - textAvatarExpField.width / 2, 138);

      avatarContainer.addChild(avatarBorder, textAvatarNameField, textAvatarExpField);
    }

    function addAvatarLevel(imagePath) {
      let id = resources[avatarLevelJsonPath].textures;

      let avatarLevelIcon = new Sprite(id[`${imagePath}${png}`]);
      avatarLevelIcon.position.set(74, 169);

      let textAvatarLevelIcon = new Text(playerLvlText, textStyleLevel_40center_white);
      textAvatarLevelIcon.position.set(
        setMiddlePos(avatarLevelIcon, textAvatarLevelIcon).x - 2,
        setMiddlePos(avatarLevelIcon, textAvatarLevelIcon).y - 8
      );

      avatarContainer.addChild(avatarLevelIcon, textAvatarLevelIcon);
    }

    addAvatarImage(avatarImageTextPath);
    addAvatarBorder(avatarBorderTextPath);
    addAvatarLevel(avatarLevelIconTextPath);
    mainScreenContainer.addChild(avatarContainer);

    setInteractive(avatarContainer, true);
    interMainScreenArray.push(avatarContainer);
    avatarContainer.on('click', () => {
      console.log('avatarContainer clicked');
      setAvatarScreenContainer();
    });
  });
}

// Setup `avatarScreenContainer`
function setAvatarScreenContainer() {
  for (let item of interMainScreenArray) {
    setInteractive(item, false);
  }

  for (let item of interScrollArray) {
    setInteractive(item, false);
  }

  avatarScreenContainer = new Container();

  // Loading Image in middle of screen
  addLoadingBackground(avatarScreenContainer, loadingText);

  function loadAvatarScreenIcon() {
    if (avatarScreenBackgroundPath in loader.resources) {
      console.log(`${avatarScreenBackgroundPath} - already in stage`);
      loadHelpIcon(avatarScreenBackgroundPath);
    } else {
      loader
        .add(avatarScreenBackgroundPath);
    }

    loader
      .once('complete', (loader, resources) => {
        loadHelpIcon(avatarScreenBackgroundPath);
      });
  }

  function loadHelpIcon(_avatarScreenBackgroundPath) {
    if (helpIconPath in loader.resources) {
      console.log(`${helpIconPath} - already in stage`);
      addIcons(_avatarScreenBackgroundPath, helpIconPath);
    } else {
      loader
        .add(helpIconPath);
    }

    loader
      .once('complete', (loader, resources) => {
        addIcons(_avatarScreenBackgroundPath, helpIconPath);
      });
  }

  function addIcons(_avatarScreenBackgroundPath, _helpIconPath) {

    addDarkerBackground(avatarScreenContainer);

    const spriteBackground = new Sprite(resources[_avatarScreenBackgroundPath].texture);
    spriteBackground.position.set(
      GAME_WIDTH / 2 - spriteBackground.width / 2,
      GAME_HEIGHT / 2 - spriteBackground.height / 2
    );

    btnBack = new Sprite(resources[btnBackPath].texture);
    btnBack.position.set(36, 36);
    setInteractive(btnBack, true);
    btnBack.on('click', () => {
      setTimeout(() => {
        backIconClicked(btnBack, avatarScreenContainer);
      }, LATENCY / 2);
    });

    const btnFaq = new Sprite(resources[btnGreen248x60Path].texture);
    btnFaq.position.set(1100, 76);

    const spriteHelpIcon = new Sprite(resources[_helpIconPath].texture);
    spriteHelpIcon.position.set(1106, 82);

    const btnChangeAvatar = new Sprite(resources[btnGreen248x60Path].texture);
    btnChangeAvatar.position.set(656, 384);

    const btnChangeBorder = new Sprite(resources[btnGreen248x60Path].texture);
    btnChangeBorder.position.set(1018, 384);

    btnChangeName = new Sprite(resources[btnGreen248x60Path].texture);
    btnChangeName.position.set(1018, 490);

    const btnAchievement = new Sprite(resources[btnGreen260x72Path].texture);
    btnAchievement.position.set(656, 904);

    const btnSystemSettings = new Sprite(resources[btnGreen260x72Path].texture);
    btnSystemSettings.position.set(1006, 904);

    avatarScreenContainer.addChild(
      spriteBackground, btnFaq, spriteHelpIcon, btnChangeAvatar, btnChangeBorder,
      btnChangeName, btnAchievement, btnSystemSettings, btnBack
    );

    socket.emit('avatarScreen');
    socket.on('avatarScreenData', (data) => {
      console.log('avatarScreenData', data);

      const
        avatarBorderTextPath = data.avatarBorder,
        avatarImageTextPath = data.avatarImage,
        nicknameText = data.nickname,
        lblPlayerLvlText = data.lblPlayerLvl,
        playerLvlText = data.playerLvl,
        lblPresentExpText = data.lblPresentExp,
        currentExpText = data.currentExp,
        nextLvlExpText = data.nextLvlExp,
        lblMaxHeroLvlText = data.lblMaxHeroLvl,
        maxHeroLvlText = data.maxHeroLvl,
        lblAccountIDText = data.lblAccountID,
        avatarBorderText = data.avatarBorder,
        btnFaqText = data.btnFaq,
        btnChangeAvatarText = data.btnChangeAvatar,
        btnChangeBorderText = data.btnChangeBorder,
        btnChangeNameText = data.btnChangeName,
        btnAchievementText = data.btnAchievement,
        btnSystemSettingsText = data.btnSystemSettings;

      socket.off('avatarScreenData');

      function addAvatarImage(imagePath) {
        let id = resources[avatarImageJsonPath].textures;

        let avatarImage = new Sprite(id[`${imagePath}${png}`]);
        avatarImage.position.set(656, 134);

        avatarScreenContainer.addChild(avatarImage);
      }

      function addAvatarBorder(imagePath) {
        let id = resources[avatarBorderJsonPath].textures;

        let avatarBorder = new Sprite(id[`${imagePath}${png}`]);
        avatarBorder.position.set(setMiddlePos(spriteBackground, avatarBorder).x, 100);

        avatarScreenContainer.addChild(avatarBorder);
      }

      const textBtnFaq = new Text(btnFaqText, textStyle_32center_black);
      textBtnFaq.position.set(
        setMiddlePos(btnFaq, textBtnFaq).x + 24,
        setMiddlePos(btnFaq, textBtnFaq).y + 4
      );

      const textBtnChangeAvatar = new Text(btnChangeAvatarText, textStyle_32center_black);
      textBtnChangeAvatar.position.set(
        setMiddlePos(btnChangeAvatar, textBtnChangeAvatar).x,
        setMiddlePos(btnChangeAvatar, textBtnChangeAvatar).y
      );

      const textBtnChangeBorder = new Text(btnChangeBorderText, textStyle_32center_black);
      textBtnChangeBorder.position.set(
        setMiddlePos(btnChangeBorder, textBtnChangeBorder).x,
        setMiddlePos(btnChangeBorder, textBtnChangeBorder).y
      );

      const textBtnChangeName = new Text(btnChangeNameText, textStyle_32center_black);
      textBtnChangeName.position.set(
        setMiddlePos(btnChangeName, textBtnChangeName).x,
        setMiddlePos(btnChangeName, textBtnChangeName).y
      );

      setInteractive(btnChangeName, true);
      btnChangeName.on('click', () => {
        console.log('btnChangeName clicked');
        setAvatarChangeNameContainer();
      });

      const textBtnAchievement = new Text(btnAchievementText, textStyle_32center_black);
      textBtnAchievement.position.set(
        setMiddlePos(btnAchievement, textBtnAchievement).x,
        setMiddlePos(btnAchievement, textBtnAchievement).y
      );

      const textBtnSystemSettings = new Text(btnSystemSettingsText, textStyle_32center_black);
      textBtnSystemSettings.position.set(
        setMiddlePos(btnSystemSettings, textBtnSystemSettings).x,
        setMiddlePos(btnSystemSettings, textBtnSystemSettings).y
      );

      let textNickname = new Text(nicknameText, textStyle_32left_black);
      textNickname.position.set(
        656,
        setMiddlePos(btnChangeName, textBtnChangeName).y
      );

      let textLevel = new Text(lblPlayerLvlText, textStyle_32left_black);
      textLevel.position.set(656, 592);

      let textLevelValue = new Text(playerLvlText, textStyle_32right_black);
      textLevelValue.position.set(1266 - textLevelValue.width, 592);

      let textPresentExp = new Text(lblPresentExpText, textStyle_32left_black);
      textPresentExp.position.set(656, 676);

      let textExpValue = new Text(currentExpText + '/' + nextLvlExpText, textStyle_32right_black);
      textExpValue.position.set(1266 - textExpValue.width, 676);

      let textMaxHeroLvl = new Text(lblMaxHeroLvlText, textStyle_32left_black);
      textMaxHeroLvl.position.set(656, 760);

      let textMaxHeroLvlValue = new Text(maxHeroLvlText, textStyle_32right_black);
      textMaxHeroLvlValue.position.set(1266 - textMaxHeroLvlValue.width, 760);

      let textAccountID = new Text(lblAccountIDText, textStyle_32left_black);
      textAccountID.position.set(656, 844);

      avatarScreenContainer.addChild(textBtnFaq, textBtnChangeAvatar, textBtnChangeBorder,
        textBtnChangeName, textBtnChangeName, textBtnAchievement, textBtnSystemSettings,
        textNickname, textLevel, textLevelValue, textPresentExp, textExpValue,
        textMaxHeroLvl, textMaxHeroLvlValue, textAccountID);
      addAvatarImage(avatarImageTextPath);
      addAvatarBorder(avatarBorderTextPath);
      avatarScreenContainer.removeChild(loadingBackground, textLoading);
    });
  }
  loadAvatarScreenIcon();
  stage.addChild(avatarScreenContainer);
}

// Setup function when player clicked on `btnBack` in `avatarScreenContainer`
function backIconClicked(btnBack, container) {
  console.log('btnBack clicked');
  stage.removeChild(container);
  mainScreenContainer.removeChild(avatarContainer);
  // interMainScreenArray.splice(3, 1);
  console.log(stage.children);
  if (stage.children.length === 1) {
    // stage.removeChild(stage.children[0].children[stage.children.length-1]);
    loadAvatarContainerData('avatarContainer', 'avatarContainerData');
    setTimeout(() => {
      for (let item of interMainScreenArray) {
        setInteractive(item, true);
      }
      for (let item of interScrollArray) {
        setInteractive(item, true);
      }
    }, LATENCY);
  }
}

// Setup function when player clicked on `btnBack` in `avatarScreenContainer`
function backIconInParagraphsClicked(container) {
  console.log('btnBack in paragraph clicked');
  mapContainer.removeChild(container);
  // interMainScreenArray.splice(3, 1);
  console.log(stage.children);
  // if (stage.children.length === 1) {
  setTimeout(() => {
    for (let item of interParagraphsArray) {
      setInteractive(item, true);
    }
    setInteractive(btnBack, true);
  }, LATENCY);
  // }
}

// Setup function when player clicked on `btnBack` in `avatarScreenContainer`
function backIconInSummon(container) {
  console.log('btnBack in summon clicked');
  stage.removeChild(container);
  setTimeout(() => {
    for (let item of interSummonArray) {
      setInteractive(item, true);
    }
    // setInteractive(btnBack, true);
  }, LATENCY);
}

// Setup `avatarChangeNameContainer`
function setAvatarChangeNameContainer() {
  setInteractive(btnChangeName, false);
  setInteractive(btnBack, false);

  const avatarChangeNameContainer = new Container();

  // Loading Image in middle of screen
  addLoadingBackground(avatarChangeNameContainer, loadingText);

  function loadAvatarChangeNameIcons() {
    if (
      avatarChangeNameBackgroundPath in loader.resources && avatarChangeNameNamefieldPath in loader.resources &&
      dicePath in loader.resources
    ) {
      console.log(`${avatarChangeNameBackgroundPath} - already in stage`);
      console.log(`${avatarChangeNameNamefieldPath} - already in stage`);
      console.log(`${dicePath} - already in stage`);
      addIcons(avatarChangeNameBackgroundPath, avatarChangeNameNamefieldPath, dicePath);
    } else {
      loader
        .add([
          avatarChangeNameBackgroundPath, avatarChangeNameNamefieldPath, dicePath
        ]);
    }

    loader
      .once('complete', (loader, resources) => {
        addIcons(avatarChangeNameBackgroundPath, avatarChangeNameNamefieldPath, dicePath);
      });
  }

  function addIcons(_avatarChangeNameBackgroundPath, _avatarChangeNameNamefieldPath,
    _dicePath) {

    addDarkerBackground(avatarChangeNameContainer);

    const spriteBackground = new Sprite(resources[_avatarChangeNameBackgroundPath].texture);
    spriteBackground.position.set(GAME_WIDTH / 2 - spriteBackground.width / 2, 196);

    const changeNamefield = new Sprite(resources[_avatarChangeNameNamefieldPath].texture);
    changeNamefield.position.set(668, 274);

    const changeNameDice = new Sprite(resources[_dicePath].texture);
    changeNameDice.position.set(1180, 274);

    const btnCancel = new Sprite(resources[btnGreen260x72Path].texture);
    btnCancel.position.set(GAME_WIDTH / 2 - btnCancel.width - 12, 376);

    const btnConfirm = new Sprite(resources[btnGreen260x72Path].texture);
    btnConfirm.position.set(GAME_WIDTH / 2 + 12, 376);

    avatarChangeNameContainer.addChild(spriteBackground, changeNamefield, changeNameDice,
      btnCancel, btnConfirm);
    avatarChangeNameContainer.removeChild(loadingBackground, textLoading);

    socket.emit('avatarChangeName');
    socket.on('avatarChangeNameData', (data) => {
      console.log('avatarChangeNameData', data);

      const
        btnCancelText = data.buttonCancel,
        btnConfirmText = data.buttonConfirm,
        bannerChangeNameText = data.bannerChangeName,
        nicknameText = data.nickname;

      socket.off('avatarChangeNameData');

      let textNickname = new Text(nicknameText, textStyle_32center_black);
      textNickname.position.set(
        setMiddlePos(changeNamefield, textNickname).x,
        setMiddlePos(changeNamefield, textNickname).y
      );

      setInteractive(changeNamefield, true);
      changeNamefield.on('click', () => {
        console.log('change name');
      });

      const textBtnCancel = new Text(btnCancelText, textStyle_32center_black);
      textBtnCancel.position.set(
        setMiddlePos(btnCancel, textBtnCancel).x,
        setMiddlePos(btnCancel, textBtnCancel).y + 4
      );

      setInteractive(btnCancel, true);
      btnCancel.on('click', () => {
        console.log('btnCancel clicked');
        stage.removeChild(avatarChangeNameContainer);
        setTimeout(() => {
          setInteractive(btnBack, true);
          setInteractive(btnChangeName, true);
        }, LATENCY);
      });

      const textBtnConfirm = new Text(btnConfirmText, textStyle_32center_black);
      textBtnConfirm.position.set(
        setMiddlePos(btnConfirm, textBtnConfirm).x,
        setMiddlePos(btnConfirm, textBtnConfirm).y + 4
      );

      setInteractive(btnConfirm, true);
      btnConfirm.on('click', () => {
        console.log('btnConfirm clicked');
        stage.removeChild(avatarChangeNameContainer);
        console.log('confirm', stage.children);
        stage.removeChild(avatarScreenContainer);
        setAvatarScreenContainer();
        // TODO: dodělat až po `changeNamefield` - změna jména -> poté je uložit do DB
        // a přepsat nickname v `avatarContainer` - vycházet z kódu u `plusGoldContainer` pro změnu textu !!
        // setTimeout(() => {
        //   setInteractive(btnBack, true);
        //   setInteractive(btnChangeName, true);
        // }, LATENCY);
      });

      function loadBannerIcon() {
        addLoadingBackground(avatarChangeNameContainer, loadingText);
        if (banner620x98Path in loader.resources) {
          console.log(`${banner620x98Path} - already in stage`);
          addBannerIcon(banner620x98Path);
        } else {
          loader
            .add(banner620x98Path);
        }

        loader
          .once('complete', (loader, resources) => {
            addBannerIcon(banner620x98Path);
          });
      }

      function addBannerIcon(_banner620x98Path) {
        const banner = new Sprite(resources[_banner620x98Path].texture);
        banner.position.set(
          GAME_WIDTH / 2 - banner.width / 2,
          spriteBackground.y - banner.height / 2 + 6
        );

        const textBanner = new Text(bannerChangeNameText, textStyleLevel_40center_white);
        textBanner.position.set(
          setMiddlePos(banner, textBanner).x,
          setMiddlePos(banner, textBanner).y - 6
        );

        avatarChangeNameContainer.addChild(banner, textBanner);
        avatarChangeNameContainer.removeChild(loadingBackground, textLoading);
      }

      avatarChangeNameContainer.addChild(textNickname, textBtnCancel, textBtnConfirm);
      loadBannerIcon();
    });
  }
  loadAvatarChangeNameIcons();
  stage.addChild(avatarChangeNameContainer);
}

// Setup `setBarContainer`
function setBarContainer() {
  barContainer = new Container();

  barEnergyBackground = new Sprite(resources[barBackgroundPath].texture);
  barEnergyBackground.position.set(472, 36);

  const plusBarEnergy = new Sprite(resources[plusIconPath].texture);
  plusBarEnergy.width = plusBarEnergy.height = 56;
  plusBarEnergy.position.set(728, 36);

  barGoldBackground = new Sprite(resources[barBackgroundPath].texture);
  barGoldBackground.position.set(804, 36);

  const plusBarGold = new Sprite(resources[plusIconPath].texture);
  plusBarGold.width = plusBarGold.height = 56;
  plusBarGold.position.set(1060, 36);
  setInteractive(plusBarGold, true);
  if (plusBarGold in interMainScreenArray) {
    console.log(`'plusBarGold' is in 'interMainScreenArray'`);
  } else {
    interMainScreenArray.push(plusBarGold);
  }
  plusBarGold.on('click', () => {
    console.log('plusBarGold clicked');
    setPlusGoldContainer();
  });

  const goldIcon = new Sprite(resources[goldIconPath].texture);
  goldIcon.position.set(796, 30);

  barDiamondBackground = new Sprite(resources[barBackgroundPath].texture);
  barDiamondBackground.position.set(1136, 36);

  const plusBarDiamond = new Sprite(resources[plusIconPath].texture);
  plusBarDiamond.width = plusBarDiamond.height = 56;
  plusBarDiamond.position.set(1392, 36);

  const diamondIcon = new Sprite(resources[diamondIconPath].texture);
  diamondIcon.position.set(1128, 30);

  barContainer.addChild(
    barEnergyBackground, plusBarEnergy,
    barGoldBackground, plusBarGold, goldIcon,
    barDiamondBackground, plusBarDiamond, diamondIcon,
  );

  loadBarContainerData('barContainer', 'barContainerData');
}

// `loadBarContainerData`
function loadBarContainerData(socketEmit, socketOn) {
  socket.emit(socketEmit);

  addLoadingBackground(barContainer, loadingText);

  socket.on(socketOn, (data) => {
    console.log(socketOn, data);

    const
      currentEnergyText = data.currentEnergy,
      maxEnergyText = data.maxEnergy,
      goldText = data.gold,
      diamondText = data.diamond;

    socket.off(socketOn);

    textBarEnergy = new Text(currentEnergyText + '/' + maxEnergyText, textStyleLevel_40center_white);
    textBarEnergy.position.set(
      setMiddlePos(barEnergyBackground, textBarEnergy).x,
      setMiddlePos(barEnergyBackground, textBarEnergy).y
    );

    textBarGold = new Text(goldText, textStyleLevel_40center_white);
    textBarGold.position.set(
      setMiddlePos(barGoldBackground, textBarGold).x,
      setMiddlePos(barGoldBackground, textBarGold).y
    );

    textBarDiamond = new Text(diamondText, textStyleLevel_40center_white);
    textBarDiamond.position.set(
      setMiddlePos(barDiamondBackground, textBarDiamond).x,
      setMiddlePos(barDiamondBackground, textBarDiamond).y
    );

    barContainer.addChild(textBarEnergy, textBarGold, textBarDiamond);
    barContainer.removeChild(loadingBackground, textLoading);

    mainScreenContainer.addChild(barContainer);
  });
}

// Setup `plusGoldContainer`
function setPlusGoldContainer() {
  for (let item of interMainScreenArray) {
    setInteractive(item, false);
  }

  for (let item of interScrollArray) {
    setInteractive(item, false);
  }

  const plusGoldContainer = new Container();

  // Loading Image in middle of screen
  addLoadingBackground(plusGoldContainer, loadingText);

  function loadPlusBarBackgroundIcons() {
    if (plusBarBackgroundPath in loader.resources) {
      console.log(`${plusBarBackgroundPath} - already in stage`);
      addIcons(plusBarBackgroundPath, btnGreen260x72Path);
    } else {
      loader
        .add(plusBarBackgroundPath);
    }

    loader
      .once('complete', (loader, resources) => {
        addIcons(plusBarBackgroundPath, btnGreen260x72Path);
      });
  }

  function addIcons(_plusBarBackgroundPath, btnGreen260x72Path) {

    addDarkerBackground(plusGoldContainer);

    const spriteBackground = new Sprite(resources[_plusBarBackgroundPath].texture);
    spriteBackground.position.set(GAME_WIDTH / 2 - spriteBackground.width / 2, 296);

    const btnClose = new Sprite(resources[btnClosePath].texture);
    btnClose.width = btnClose.height = 96;
    btnClose.position.set(
      spriteBackground.x + spriteBackground.width - btnClose.width / 2 - 12,
      spriteBackground.y - btnClose.height / 2 + 12
    );

    const goldIcon = new Sprite(resources[goldIconPath].texture);
    goldIcon.width = goldIcon.height = 56;
    goldIcon.position.set(
      setMiddlePos(spriteBackground, goldIcon).x - 88,
      setMiddlePos(spriteBackground, goldIcon).y - 26
    );

    const diamondIcon = new Sprite(resources[diamondIconPath].texture);
    diamondIcon.width = diamondIcon.height = 56;
    diamondIcon.position.set(
      setMiddlePos(spriteBackground, diamondIcon).x - 144,
      setMiddlePos(spriteBackground, diamondIcon).y + 28
    );

    const btnBuy = new Sprite(resources[btnGreen260x72Path].texture);
    btnBuy.position.set(1024, setMiddlePos(spriteBackground, btnBuy).y);
    setInteractive(btnBuy, true);
    btnBuy.on('click', () => {
      console.log('btnBuy clicked');
      socket.emit('sendBuyGold');
      stage.removeChild(plusGoldContainer);

      socket.on('lowDiamonds', (data) => {
        console.log('lowDiamonds', data);
        const lowDiamondContainer = new Container();
        addDarkerBackground(lowDiamondContainer);
        const textRecharge = new Text(data.rechargeText, textStyle144_40center_black);
        textRecharge.position.set(setMiddlePos(loadingBackground, textRecharge).x, 440);

        const btnConfirm = new Sprite(resources[btnGreen260x72Path].texture);
        btnConfirm.position.set(setMiddlePos(loadingBackground, btnConfirm).x, 572);
        setInteractive(btnConfirm, true);
        btnConfirm.on('click', () => {
          console.log('btnConfirm clicked');
          stage.removeChild(lowDiamondContainer);
          // TODO: az bude hotova recharge stranka, tak dodelat - po kliknuti
          // na btn `OK` zobrazeni `recharge stranky`
          setTimeout(() => {
            for (let item of interMainScreenArray) {
              setInteractive(item, true);
            }
            for (let item of interScrollArray) {
              setInteractive(item, true);
            }
          }, LATENCY);
        });

        const textBtnConfirm = new Text(data.okBtnText, textStyle_32center_black);
        textBtnConfirm.position.set(
          setMiddlePos(btnConfirm, textBtnConfirm).x,
          setMiddlePos(btnConfirm, textBtnConfirm).y
        );

        socket.off('lowDiamonds');
        lowDiamondContainer.addChild(loadingBackground, textRecharge, btnConfirm, textBtnConfirm);
        stage.addChild(lowDiamondContainer);
      });

      socket.on('barContainerDiamondData', (data) => {
        console.log('barContainerDiamondData', data);
        textBarGold.text = data.gold;
        textBarGold.position.set(
          setMiddlePos(barGoldBackground, textBarGold).x,
          setMiddlePos(barGoldBackground, textBarGold).y
        );
        textBarDiamond.text = data.diamond;
        textBarDiamond.position.set(
          setMiddlePos(barDiamondBackground, textBarDiamond).x,
          setMiddlePos(barDiamondBackground, textBarDiamond).y
        );
        socket.off('barContainerDiamondData');
        setTimeout(() => {
          for (let item of interMainScreenArray) {
            setInteractive(item, true);
          }
          for (let item of interScrollArray) {
            setInteractive(item, true);
          }
        }, LATENCY);
      });
    });

    plusGoldContainer.addChild(spriteBackground, btnClose, btnBuy, goldIcon, diamondIcon);

    socket.emit('goldScreen');
    socket.on('goldScreenData', (data) => {
      console.log('goldScreenData', data);

      const
        plusGoldText = data.goldPlus,
        priceText = data.priceInDiamond,
        buyText = data.buyText,
        costText = data.costText,
        btnBuyText = data.btnBuy;

      socket.off('goldScreenData');

      let text = new Text(buyText + ' ' + plusGoldText + '\n' + costText + ' ' + priceText, textStyleText_40left_black);
      text.position.set(636, setMiddlePos(spriteBackground, text).y + 6);

      const textBtnBuy = new Text(btnBuyText, textStyleBtn60_44_black);
      textBtnBuy.position.set(
        setMiddlePos(btnBuy, textBtnBuy).x,
        setMiddlePos(btnBuy, textBtnBuy).y
      );

      setInteractive(btnClose, true);
      btnClose.on('click', () => {
        console.log('btnClose clicked');
        stage.removeChild(plusGoldContainer);
        setTimeout(() => {
          for (let item of interMainScreenArray) {
            setInteractive(item, true);
          }
          for (let item of interScrollArray) {
            setInteractive(item, true);
          }
        }, LATENCY);
        console.log(stage.children);
      });

      plusGoldContainer.addChild(text, textBtnBuy);
      plusGoldContainer.removeChild(loadingBackground, textLoading);
    });
  }
  loadPlusBarBackgroundIcons();
  stage.addChild(plusGoldContainer);
}

// Setup
function setScrollArrow(container, heroesText, inventoryText, tasksText,
  trialsText, battleText, marketsText, arenaText, grandArenaText, arenaShopText,
  grandArenaShopText, guildShopText, crusadeShopText, fantasyShopText, shopText) {

  scrollBtn192x72_mc = new Sprite(resources[scrollBtn192x72Path].texture);
  scrollBtn192x72_mc.position.set(1716, 12);

  scrollArrow72x36_mc = new Sprite(resources[scrollArrow72x36Path].texture);
  scrollArrow72x36_mc.anchor.set(0.5);
  scrollArrow72x36_mc.position.set(1812, 48);
  scrollArrow72x36_mc.scale.y = -1;

  // Scrool interaction
  scrollArrow72x36_mc.interactive = true;
  scrollArrow72x36_mc.buttonMode = true;
  interMainScreenArray.push(scrollArrow72x36_mc);

  scrollArrow72x36_mc.on('click', () => {
    scrollArrow72x36_mc.scale.y *= -1;
    if (scrollArrow72x36_mc.scale.y == -1) {
      console.log(stage.children);
      interScrollArray.splice(0, 3);
      mainScreenContainer.removeChild(scrollContainer);
    } else {
      // loadScrollData(container);
      setScrollContainer(heroesText, inventoryText, tasksText, trialsText,
        battleText, marketsText, arenaText, grandArenaText, arenaShopText,
        grandArenaShopText, guildShopText, crusadeShopText, fantasyShopText,
        shopText);
    }
  });
  container.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
}

// Setup scrollContainer (menu on the right side of game screen)
function setScrollContainer(heroesText, inventoryText, tasksText, trialsText,
  battleText, marketsText, arenaText, grandArenaText, arenaShopText,
  grandArenaShopText, guildShopText, crusadeShopText, fantasyShopText, shopText) {

  scrollContainer = new Container();

  const
    battleContainer = new Container(),
    marketsContainer = new Container();

  // Icons in scrollContainer ('Heroes', 'Inventory', 'Tasks', ...)
  // + Scroll menu background and bottom part of scroll
  const scrollBackground = new Sprite(resources[scroll192x1068Path].texture);
  scrollBackground.position.set(1716, 84); //1716, 12

  const scrollBottom = new Sprite(resources[scrollBtn192x48Path].texture);
  scrollBottom.position.set(1716, 1032);

  const btnHeroes = new Sprite(resources[btn144x144Path].texture);
  btnHeroes.position.set(1740, 96);
  interScrollArray.push(btnHeroes);
  console.log(interMainScreenArray);
  console.log(interScrollArray);
  setInteractive(btnHeroes, true);
  btnHeroes.on('click', () => {
    console.log('btnHeroes clicked');
    // if (btnHeroes.visible) {
    // mainScreenContainer.removeChild(scrollContainer);
    // mainScreenContainer.removeChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
    // console.log('stage.children.length', stage.children.length);
    // if (stage.children.length === 2) {
    //   // console.log(heroesContainer.children[heroesContainer.children.length-1]);
    //   scrollArrow72x36.scale.y = -1;
    //   // heroesContainer.removeChild(heroesContainer.children[heroesContainer.children.length-1]);
    //   stage.removeChild(stage.children[stage.children.length-1]);
    // }
    if (stage.children.length === 1) {
      loadHeroesContainerData();
      // setHeroesContainer();
    }
    // }
  });

  const textBtnHeroes = new Text(heroesText, textStyle144_40center_black);
  textBtnHeroes.position.set(
    setMiddlePos(btnHeroes, textBtnHeroes).x,
    setMiddlePos(btnHeroes, textBtnHeroes).y + 2
  );

  const btnInventory = new Sprite(resources[btn144x144Path].texture);
  btnInventory.position.set(1740, 252);
  setInteractive(btnInventory, true);
  interScrollArray.push(btnInventory);
  btnInventory.on('click', e => {
    setInventoryContainer();
  });

  const textBtnInventory = new Text(inventoryText, textStyle144_40center_black);
  textBtnInventory.position.set(
    setMiddlePos(btnInventory, textBtnInventory).x,
    setMiddlePos(btnInventory, textBtnInventory).y + 2
  );

  const btnTasks = new Sprite(resources[btn144x144Path].texture);
  btnTasks.position.set(1740, 408);

  const textBtnTasks = new Text(tasksText, textStyle144_40center_black);
  textBtnTasks.position.set(
    setMiddlePos(btnTasks, textBtnTasks).x,
    setMiddlePos(btnTasks, textBtnTasks).y + 2
  );

  const btnTrials = new Sprite(resources[btn144x144Path].texture);
  btnTrials.position.set(1740, 564);

  const textBtnTrials = new Text(trialsText, textStyle144_40center_black);
  textBtnTrials.position.set(
    setMiddlePos(btnTrials, textBtnTrials).x,
    setMiddlePos(btnTrials, textBtnTrials).y + 2
  );

  const btnBattle = new Sprite(resources[btn144x144Path].texture);
  btnBattle.position.set(1740, 720);
  setInteractive(btnBattle, true);
  interScrollArray.push(btnBattle);
  let tb = true;
  btnBattle.on('click', () => {
    console.log('btnBattle clicked');
    if (!tb) {
      scrollContainer.removeChild(battleContainer);
      tb = true;
    } else {
      setBattleContainer();
      tb = false;
    }
  });

  const textBtnBattle = new Text(battleText, textStyle144_40center_black);
  textBtnBattle.position.set(
    setMiddlePos(btnBattle, textBtnBattle).x,
    setMiddlePos(btnBattle, textBtnBattle).y + 2
  );

  // --- Battle Icons (battleContainer) ---
  function setBattleContainer() {
    function loadBattleImages() {
      if (scroll312x192Path in loader.resources) {
        console.log(`${scroll312x192Path} - already in stage`);
        addImages(scroll312x192Path);
      } else {
        loader
          .add(scroll312x192Path);
      }
      loader
        .once('complete', (loader, resources) => {
          addImages(scroll312x192Path);
        });
    }

    function addImages(_scroll312x192Path) {
      const battleScrollBackground = new Sprite(resources[_scroll312x192Path].texture);
      battleScrollBackground.position.set(1404, 696);

      const btnArena = new Sprite(resources[btn144x144Path].texture);
      btnArena.position.set(1428, 720);

      const textBtnArena = new Text(arenaText, textStyle144_40center_black);
      textBtnArena.position.set(
        setMiddlePos(btnArena, textBtnArena).x,
        setMiddlePos(btnArena, textBtnArena).y + 2
      );

      const btnGrandArena = new Sprite(resources[btn144x144Path].texture);
      btnGrandArena.position.set(1584, 720);

      const textBtnGrandArena = new Text(grandArenaText, textStyle144_40center_black);
      textBtnGrandArena.position.set(
        setMiddlePos(btnGrandArena, textBtnGrandArena).x,
        setMiddlePos(btnGrandArena, textBtnGrandArena).y + 2
      );

      battleContainer.addChild(battleScrollBackground, btnArena, textBtnArena,
        btnGrandArena, textBtnGrandArena);

      scrollContainer.addChild(battleContainer);
    }

    loadBattleImages();
  }

  const btnMarkets = new Sprite(resources[btn144x144Path].texture);
  btnMarkets.position.set(1740, 876);
  setInteractive(btnMarkets, true);
  interScrollArray.push(btnMarkets);
  let tm = true;
  btnMarkets.on('click', () => {
    console.log('btnMarkets clicked');
    if (!tm) {
      scrollContainer.removeChild(marketsContainer);
      tm = true;
    } else {
      setMarketsContainer();
      tm = false;
    }
  });

  const textBtnMarkets = new Text(marketsText, textStyle144_40center_black);
  textBtnMarkets.position.set(
    setMiddlePos(btnMarkets, textBtnMarkets).x,
    setMiddlePos(btnMarkets, textBtnMarkets).y + 2
  );

  // --- Markets Icons (marketsContainer) ---
  function setMarketsContainer() {
    function loadMarketsImages() {
      if (scroll936x192Path in loader.resources) {
        console.log(`${scroll936x192Path} - already in stage`);
        addImages(scroll936x192Path);
      } else {
        loader
          .add(scroll936x192Path);
      }
      loader
        .once('complete', (loader, resources) => {
          addImages(scroll936x192Path);
        });
    }

    function addImages(scroll936x192Path) {
      const marketsScrollBackground = new Sprite(resources[scroll936x192Path].texture);
      marketsScrollBackground.position.set(780, 852);

      const btnArenaShop = new Sprite(resources[btn144x144Path].texture);
      btnArenaShop.position.set(804, 876);

      const textBtnArenaShop = new Text(arenaShopText, textStyle144_40center_black);
      textBtnArenaShop.position.set(
        setMiddlePos(btnArenaShop, textBtnArenaShop).x,
        setMiddlePos(btnArenaShop, textBtnArenaShop).y + 2
      );

      const btnGrandArenaShop = new Sprite(resources[btn144x144Path].texture);
      btnGrandArenaShop.position.set(960, 876);

      const textBtnGrandArenaShop = new Text(grandArenaShopText, textStyle144_40center_black);
      textBtnGrandArenaShop.position.set(
        setMiddlePos(btnGrandArenaShop, textBtnGrandArenaShop).x,
        setMiddlePos(btnGrandArenaShop, textBtnGrandArenaShop).y + 2
      );

      const btnGuildShop = new Sprite(resources[btn144x144Path].texture);
      btnGuildShop.position.set(1116, 876);

      const textBtnGuildShop = new Text(guildShopText, textStyle144_40center_black);
      textBtnGuildShop.position.set(
        setMiddlePos(btnGuildShop, textBtnGuildShop).x,
        setMiddlePos(btnGuildShop, textBtnGuildShop).y + 2
      );

      const btnCrusadeShop = new Sprite(resources[btn144x144Path].texture);
      btnCrusadeShop.position.set(1272, 876);

      const textBtnCrusadeShop = new Text(crusadeShopText, textStyle144_40center_black);
      textBtnCrusadeShop.position.set(
        setMiddlePos(btnCrusadeShop, textBtnCrusadeShop).x,
        setMiddlePos(btnCrusadeShop, textBtnCrusadeShop).y + 2
      );

      const btnFantasyShop = new Sprite(resources[btn144x144Path].texture);
      btnFantasyShop.position.set(1428, 876);

      const textBtnFantasyShop = new Text(fantasyShopText, textStyle144_40center_black);
      textBtnFantasyShop.position.set(
        setMiddlePos(btnFantasyShop, textBtnFantasyShop).x,
        setMiddlePos(btnFantasyShop, textBtnFantasyShop).y + 2
      );

      const btnShop = new Sprite(resources[btn144x144Path].texture);
      btnShop.position.set(1584, 876);

      const textBtnShop = new Text(shopText, textStyle144_40center_black);
      textBtnShop.position.set(
        setMiddlePos(btnShop, textBtnShop).x,
        setMiddlePos(btnShop, textBtnShop).y + 2
      );

      marketsContainer.addChild(marketsScrollBackground, btnArenaShop, textBtnArenaShop,
        btnGrandArenaShop, textBtnGrandArenaShop, btnGuildShop, textBtnGuildShop,
        btnCrusadeShop, textBtnCrusadeShop, btnFantasyShop, textBtnFantasyShop,
        btnShop, textBtnShop);

      scrollContainer.addChild(marketsContainer);
    }
    loadMarketsImages();
  }

  scrollContainer.addChild(
    scrollBackground, scrollBottom, btnHeroes, textBtnHeroes,
    btnInventory, textBtnInventory, btnTasks, textBtnTasks,
    btnTrials, textBtnTrials, btnBattle, textBtnBattle,
    btnMarkets, textBtnMarkets,
  );

  mainScreenContainer.addChild(scrollContainer);
}

const portraitsPerPage = 8;
let heroIconClicked = 'glyphs';
// let numberOfHeroes;

// Setup `loadHeroesContainerData` - after player clicked on `Heroes` button in scroll menu
function loadHeroesContainerData() {
  for (let item of interMainScreenArray) {
    if (item.interactive === true) {
      setInteractive(item, false);
    }
  }

  for (let item of interScrollArray) {
    if (item.interactive === true) {
      setInteractive(item, false);
    }
  }

  heroesContainer = new Container();

  // Loading Image in middle of screen
  addLoadingBackground(heroesContainer, loadingText);

  // Load `backgroundEmptyBlurPath` string path
  function loadBackgroundEmptyBlurImage() {
    if (backgroundEmptyBlurPath in loader.resources) {
      console.log(`${backgroundEmptyBlurPath} - already in stage`);
      addBackgroundEmptyBlurImage();
    } else {
      loader
        .add(backgroundEmptyBlurPath);
    }
    loader
      .once('complete', (loader, resources) => {
        addBackgroundEmptyBlurImage();
      });
  }

  function addBackgroundEmptyBlurImage() {
    const backgroundEmptyBlur = new Sprite(resources[backgroundEmptyBlurPath].texture);
    backgroundEmptyBlur.position.set(0, 0);

    heroesContainer.addChild(backgroundEmptyBlur);
  }

  function loadBackgroundBookImage() {
    if (backgroundBookPath in loader.resources) {
      console.log(`${backgroundBookPath} - already in stage`);
      addBackgroundBookImage();
    } else {
      loader
        .add(backgroundBookPath);
    }
    loader
      .once('complete', (loader, resources) => {
        addBackgroundBookImage();
      });
  }

  function addBackgroundBookImage() {

    addDarkerBackground(heroesContainer);

    const backgroundBook = new Sprite(resources[backgroundBookPath].texture);
    backgroundBook.position.set(GAME_WIDTH / 2 - backgroundBook.width / 2, 144);

    btnBack = new Sprite(resources[btnBackPath].texture);
    btnBack.position.set(36, 36);
    setInteractive(btnBack, true);
    btnBack.on('click', () => {
      setTimeout(() => {
        backIconClicked(btnBack, heroesContainer);
      }, LATENCY / 2);
    });

    heroesContainer.addChild(backgroundBook, btnBack);

    const heroesPortraitContainer = new Container();
    socket.emit('heroesContainer');
    socket.on('heroesContainerData', (data) => {
      console.log('heroesContainerData\n', data);

      heroesContainer.removeChild(loadingBackground, textLoading);

      socket.off('heroesContainerData');

      let heroesNames = [];
      let bookPages = [];
      let sumPages = 0;

      const numberOfHeroes = data.heroesMsg.length;

      for (let i = 0; i < data.heroesMsg.length; i++) {
        // console.log(data.heroesMsg[i].name);
        heroesNames.push(data.heroesMsg[i].name);
        if (i < portraitsPerPage) {
          bookPages[i] = 0;
          // console.log('bookPages[i]', i, ':', bookPages[i]);
        } else if (i > portraitsPerPage - 1 && i < 2 * portraitsPerPage) {
          bookPages[i] = 1;
          sumPages = 1;
        } else if (i > 2 * portraitsPerPage - 1 && i < 3 * portraitsPerPage) {
          bookPages[i] = 2;
          sumPages = 2;
        } else if (i > 3 * portraitsPerPage - 1 && i < 4 * portraitsPerPage) {
          bookPages[i] = 3;
          sumPages = 3;
        }
      }

      addLoadingBackground(heroesContainer, loadingText);

      console.log('heroesNames', heroesNames);
      // console.log('bookPages', bookPages);
      // console.log('sumPages', sumPages);

      function heroNotSummon(urlName, i) {
        let heroNotSummonPath = `${heroesFolderPath}${urlName}/${urlName}_stats_grey.png`;

        if (heroNotSummonPath in loader.resources) {
          console.log(`${heroNotSummonPath} - already in stage`);
          addHeroPortrait(heroNotSummonPath, i, bookPages[i], heroesNames[i],
            data.heroesMsg[i].urlName, data.heroesMsg[i].color,
            data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
            data.heroesMsg[i].class, data.heroesMsg[i].level
          );
        } else {
          loader
            .add(heroNotSummonPath);
        }

        loader
          .once('complete', (loader, resources) => {
            addHeroPortrait(heroNotSummonPath, i, bookPages[i], heroesNames[i],
              data.heroesMsg[i].urlName, data.heroesMsg[i].color,
              data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
              data.heroesMsg[i].class, data.heroesMsg[i].level
            );
          });
      }

      for (let i = 0; i < heroesNames.length; i++) {
        switch (heroesNames[i]) {
          case 'Aelois':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(aeloisStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Amara':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(amaraStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Crystal':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(crystalStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Diu Win':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(diuwinStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Leona':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(leonaStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Leryssa':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(leryssaStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Nadia':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(nadiaStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Nyx':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(nyxStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Sin':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(sinStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Zalajin':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(zalajinStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
          case 'Zaya':
            if (data.heroesMsg[i].summoned === 'no') {
              heroNotSummon(data.heroesMsg[i].urlName, i);
            } else if (data.heroesMsg[i].summoned === 'yes') {
              addHeroPortrait(zayaStatsPath, i, bookPages[i], heroesNames[i],
                data.heroesMsg[i].urlName, data.heroesMsg[i].color,
                data.heroesMsg[i].stars, data.heroesMsg[i].summoned,
                data.heroesMsg[i].class, data.heroesMsg[i].level
              );
            }
            break;
        }
      }

      // Add hero portrait to the 'heroes screen' (after 'Heroes' clicked from scrollmenu)
      function addHeroPortrait(heroNamePath, i, bPi, name, urlName, color, starCount,
        summoned, classText, levelText) { // 332, 205 (195)
        // console.log(`hero info: ${heroNamePath}, ${i}, ${bPi}, ${name}, ${urlName},
        //   ${color}, ${starCount}, ${summoned}`);
        console.log(`add: ${name}`);
        const heroPortraitContainer = new Container();
        let borderPath;

        function loadBorderImages(_color) {
          switch (_color) {
            case 'Green':
              borderPath = `${heroesFolderPath}border_green${png}`;
              break;
            case 'Green +1':
              borderPath = `${heroesFolderPath}border_green+1${png}`;
              break;
            case 'Blue':
              borderPath = `${heroesFolderPath}border_blue${png}`;
              break;
            case 'Blue +1':
              borderPath = `${heroesFolderPath}border_blue+1${png}`;
              break;
            case 'Blue +2':
              borderPath = `${heroesFolderPath}border_blue+2${png}`;
              break;
            default:
              borderPath = `${heroesFolderPath}border_grey${png}`;
          }

          if (borderPath in loader.resources) {
            // console.log(`${borderPath} - already in loader`);
            addHeroPortraitBorder(borderPath, heroNamePath, classText, levelText);
          } else {
            loader
              .add(borderPath);
          }

          loader
            .once('complete', (loader, resources) => {
              addHeroPortraitBorder(borderPath, heroNamePath, classText, levelText);
            });
        }

        function addHeroPortraitBorder(_borderPath, _heroNamePath, _classText, _levelText) {
          let border = new Sprite(resources[_borderPath].texture);
          border.width = 278;
          border.height = 332;

          switch (i % portraitsPerPage) {
            case 0:
              border.position.set(1920 * bPi + 332, 205);
              break;
            case 1:
              border.position.set(1920 * bPi + 634, 205);
              break;
            case 2:
              border.position.set(1920 * bPi + 332, 561);
              break;
            case 3:
              border.position.set(1920 * bPi + 634, 561);
              break;
            case 4:
              border.position.set(1920 * bPi + 1008, 205);
              break;
            case 5:
              border.position.set(1920 * bPi + 1310, 205);
              break;
            case 6:
              border.position.set(1920 * bPi + 1008, 561);
              break;
            case 7:
              border.position.set(1920 * bPi + 1310, 561);
              break;
          }

          setInteractive(border, true);
          border.on('click', () => {
            if (summoned === 'yes') {
              console.log('you clicked on', urlName, 'portrait');
              setHeroContainer(urlName, heroIconClicked);
            } else if (summoned === 'no') {
              console.log(urlName, 'not summoned yet.');
            }
          });

          let hero = new Sprite(resources[_heroNamePath].texture);
          let grey = new RegExp('\_grey');

          if (!grey.test(heroNamePath)) {
            hero.scale.set(0.5);
          }

          hero.position.set(
            setMiddlePos(border, hero).x,
            setMiddlePos(border, hero).y
          );

          function loadBannerImages() {
            if (summoned === 'yes') {
              if (banner620x98Path in loader.resources) {
                // console.log(`${banner620x98Path} - already in loader`);
                addBanner(banner620x98Path);
              } else {
                loader
                  .add(banner620x98Path);
              }

              loader
                .once('complete', (loader, resources) => {
                  addBanner(banner620x98Path);
                });
            } else if (summoned === 'no') {
              if (banner620x98GreyPath in loader.resources) {
                // console.log(`${banner620x98GreyPath} - already in loader`);
                addBanner(banner620x98GreyPath);
              } else {
                loader
                  .add(banner620x98GreyPath);
              }

              loader
                .once('complete', (loader, resources) => {
                  addBanner(banner620x98GreyPath);
                });
            }

            function addBanner(_bannerPath) {
              let banner = new Sprite(resources[_bannerPath].texture);
              banner.width = 256;
              banner.height = 40;
              banner.position.set(
                setMiddlePos(border, banner).x,
                border.y + border.height - 116
              );

              let textBanner = new Text(name, textStyleHeroSelectLevel_20left_white);
              textBanner.position.set(
                setMiddlePos(banner, textBanner).x,
                setMiddlePos(banner, textBanner).y - 2
              );

              let textLevel = new Text(_levelText, textStyleHeroesLevel_16center_white);
              textLevel.position.set(
                banner.x + 34 - textLevel.width / 2,
                setMiddlePos(banner, textLevel).y - 2
              );

              heroPortraitContainer.addChild(banner, textBanner, textLevel);
            }
          }

          let classIconPath;

          function loadClassIcons(classText) {
            switch (classText) {
              case 'Tank':
                classIconPath = `${iconsFolderPath}bookmarks/tank_icon${png}`;
                break;
              case 'Fighter':
                classIconPath = `${iconsFolderPath}bookmarks/fighter_icon${png}`;
                break;
              case 'Marksman':
                classIconPath = `${iconsFolderPath}bookmarks/marksman_icon${png}`;
                break;
              case 'Mage':
                classIconPath = `${iconsFolderPath}bookmarks/mage_icon${png}`;
                break;
              case 'Support':
                classIconPath = `${iconsFolderPath}bookmarks/support_icon${png}`;
                break;
              default:
                classIconPath = `${iconsFolderPath}bookmarks/all_icon${png}`;
            }

            if (classIconPath in loader.resources) {
              // console.log(`${classIconPath} - already in loader`);
              addClassIcon(classIconPath);
            } else {
              loader
                .add(classIconPath);
            }

            loader
              .once('complete', (loader, resources) => {
                addClassIcon(classIconPath);
              });
          }

          function addClassIcon(_classIconPath) {
            let classIcon = new Sprite(resources[_classIconPath].texture);
            classIcon.scale.set(0.25);
            classIcon.position.set(
              setMiddlePos(border, classIcon).x + 94,
              setMiddlePos(border, classIcon).y + 68
            );

            heroPortraitContainer.addChild(classIcon);
          }

          heroPortraitContainer.addChild(hero, border);

          loadBannerImages();
          loadClassIcons(_classText);

          function loadStarIcon(offsetX) {
            if (starIconPath in loader.resources) {
              // console.log(`${starIconPath} - already in loader`);
              addStarIcon(starIconPath, offsetX);
            } else {
              loader
                .add(starIconPath);
            }

            loader
              .once('complete', (loader, resources) => {
                addStarIcon(starIconPath, offsetX);
              });
          }

          function addStarIcon(_starIconPath, _offsetX) {
            let star = new Sprite(resources[_starIconPath].texture);
            star.width = 24;
            star.height = 22;
            star.position.set(
              setMiddlePos(border, star).x + _offsetX,
              border.y + border.height - 141
            );

            heroPortraitContainer.addChild(star);
          }

          if (summoned === 'yes') {
            switch (starCount) {
              case 2:
                loadStarIcon(-13);
                loadStarIcon(13);
                break;
              case 3:
                loadStarIcon(-30);
                loadStarIcon(0);
                loadStarIcon(30);
                break;
              case 4:
                loadStarIcon(-43);
                loadStarIcon(-13);
                loadStarIcon(13);
                loadStarIcon(43);
                break;
              case 5:
                loadStarIcon(-60);
                loadStarIcon(-30);
                loadStarIcon(0);
                loadStarIcon(30);
                loadStarIcon(60);
                break;
              default:
                loadStarIcon(0);
            }
          }

          function addGlyphIcon(glyphName, offsetX, equipped) {
            let id = resources[glyphsPath].textures;
            let idNo = resources[glyphsNoPath].textures;

            let glyph = new Sprite(id[`${glyphName}${png}`]);
            let glyphNo = new Sprite(idNo[`${glyphName}_no${png}`]);

            if (equipped === 'no') {
              glyph.texture = glyphNo.texture;
            }
            glyph.width = glyph.height = 48;
            glyph.position.set(
              setMiddlePos(border, glyph).x + offsetX,
              border.y + border.height - 72
            );

            heroPortraitContainer.addChild(glyph);
          }

          function loadPageCounterIcons() {
            if (pageIconPath in loader.resources && expBackgroundPath in loader.resources) {
              // console.log(`${pageIconPath}, ${expBackgroundPath} - already in stage`);
              addPageCounter();
            } else {
              loader
                .add([
                  pageIconPath, expBackgroundPath
                ]);
            }
            loader
              .once('complete', (loader, resources) => {
                addPageCounter();
              });
          }

          function addPageCounter() {
            let pageIcon = new Sprite(resources[pageIconPath].texture);
            pageIcon.scale.set(0.5);
            pageIcon.position.set(
              setMiddlePos(border, pageIcon).x - 78,
              border.y + border.height - 60
            );

            let barBackground = new Sprite(resources[expBackgroundPath].texture);
            barBackground.width = 152;
            barBackground.height = 28;
            barBackground.position.set(
              pageIcon.x + pageIcon.width,
              pageIcon.y
            );

            heroPortraitContainer.addChild(pageIcon, barBackground);
          }

          if (summoned === 'yes') {
            for (let item of data.heroesMsg[i].glyphs_rarity) {
              if (item.current_status === data.heroesMsg[i].color) {
                // console.log('item', item);
                for (let it of item.glyphs) {
                  // console.log('it', it.icon_path);
                  let index = item.glyphs.indexOf(it);
                  switch (index) {
                    case 0:
                      addGlyphIcon(it.icon_path, -28, it.equipped);
                      break;
                    case 1:
                      addGlyphIcon(it.icon_path, -84, it.equipped);
                      break;
                    case 2:
                      addGlyphIcon(it.icon_path, 28, it.equipped);
                      break;
                    case 3:
                      addGlyphIcon(it.icon_path, 84, it.equipped);
                      break;
                  }
                }
              }
            }
          } else if (summoned === 'no') {
            loadPageCounterIcons();
          }
        }

        loadBorderImages(color);

        // if (heroesPortraitContainer.children.length < numberOfHeroes) {
        heroesPortraitContainer.addChild(heroPortraitContainer);
        // } else if (heroesPortraitContainer.children.length === numberOfHeroes) {
        //   heroesContainer.removeChild(loadingBackground, textLoading);
        // }
      }

      heroesContainer.addChild(heroesPortraitContainer);

      function loadArrowsIcons() {
        if (leftArrowIconPath in loader.resources && rightArrowIconPath in loader.resources) {
          console.log(`${leftArrowIconPath}, ${rightArrowIconPath} - already in stage`);
          addArrowsIcons(leftArrowIconPath, rightArrowIconPath);
        } else {
          loader
            .add([
              leftArrowIconPath, rightArrowIconPath
            ]);
        }
        loader
          .once('complete', (loader, resources) => {
            addArrowsIcons(leftArrowIconPath, rightArrowIconPath);
          });
      }

      function addArrowsIcons(_leftArrowIconPath, _rightArrowIconPath) {
        let currentPage = 0;
        let pages = 1; //sumPages;

        const leftArrow = new Sprite(resources[_leftArrowIconPath].texture);
        leftArrow.position.set(36, 640);
        leftArrow.visible = false;

        const rightArrow = new Sprite(resources[_rightArrowIconPath].texture);
        rightArrow.position.set(1796, 640);
        setInteractive(rightArrow, true);

        leftArrow.on('click', () => {
          console.log('leftArrow clicked', currentPage, pages);
          if (currentPage > 0 && currentPage < pages) {
            heroesPortraitContainer.position.x += 1920;
            currentPage--;
          }

          if (currentPage === pages) {
            heroesPortraitContainer.position.x += 1920;
            currentPage--;
            if (rightArrow.visible === false) {
              rightArrow.visible = true;
              setInteractive(rightArrow, true);
            }
            if (leftArrow.visible = false) {
              leftArrow.visible = false;
              setInteractive(leftArrow, false);
            }
          }
        });

        rightArrow.on('click', () => {
          console.log('rightArrow clicked', currentPage, pages);
          if (currentPage < pages) {
            currentPage++;
            heroesPortraitContainer.position.x -= 1920;
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

        heroesContainer.addChild(leftArrow, rightArrow);
        heroesContainer.removeChild(loadingBackground, textLoading);
      }

      loadArrowsIcons();
    });
  }

  loadBackgroundEmptyBlurImage();
  loadBackgroundBookImage();

  stage.addChild(heroesContainer);
  // console.log('stage:', stage.children);
}

// Setup the hero screen (after player clicked on specific hero)
function setHeroContainer(heroName, iconClicked) {
  const heroContainer = new Container();

  function addBackgroundEmptyBlurImage() {
    const backgroundEmptyBlur = new Sprite(resources[backgroundEmptyBlurPath].texture);
    backgroundEmptyBlur.position.set(0, 0);

    heroContainer.addChild(backgroundEmptyBlur);
  }

  function addBackgroundBookImage() {
    addDarkerBackground(heroContainer);

    const backgroundBook = new Sprite(resources[backgroundBookPath].texture);
    backgroundBook.position.set(GAME_WIDTH / 2 - backgroundBook.width / 2, 144);

    btnBack = new Sprite(resources[btnBackPath].texture);
    btnBack.position.set(36, 36);
    setInteractive(btnBack, true);
    btnBack.on('click', () => {
      console.log('btnBack clicked');
      stage.removeChild(heroContainer);
      console.log(stage.children);
      setTimeout(() => {
        loadHeroesContainerData();
      }, LATENCY / 2);
    });

    heroContainer.addChild(backgroundBook, btnBack);

    // TODO: pridat sipky vpravo, vlevo

    function loadBackgroundsImages() {
      // Loading Image in middle of screen
      addLoadingBackground(heroContainer, loadingText);

      if (heroUpperBackgroundPath in loader.resources && heroBottomBackgroundPath in loader.resources) {
        console.log(`${heroUpperBackgroundPath}, ${heroBottomBackgroundPath} - already in stage`);
        addBackgroundsImages(heroBottomBackgroundPath);
      } else {
        loader
          .add([
            heroUpperBackgroundPath, heroBottomBackgroundPath
          ]);
      }
      loader
        .once('complete', (loader, resources) => {
          addBackgroundsImages(heroBottomBackgroundPath);
        });
    }

    function loadPowerBarImages() {
      // if (expBackgroundPath in loader.resources) {
      //   console.log(`${expBackgroundPath} - already in stage`);
      //   loadHelpIcon(expBackgroundPath);
      // } else {
      //   loader
      //     .add(expBackgroundPath);
      // }
      // loader
      //   .once('complete', (loader, resources) => {
      loadHelpIcon(expBackgroundPath);
      // });
    }

    function loadHelpIcon(_expBackgroundPath) {
      if (helpIconPath in loader.resources) {
        console.log(`${helpIconPath} - already in stage`);
        addPowerBar(_expBackgroundPath, helpIconPath);
      } else {
        loader
          .add(helpIconPath);
      }
      loader
        .once('complete', (loader, resources) => {
          addPowerBar(_expBackgroundPath, helpIconPath);
        });
    }

    function addPowerBar(_expBackgroundPath, _helpIconPath) {
      let powerBar = new Sprite(resources[_expBackgroundPath].texture);
      powerBar.position.set(1148, 701);

      let btnHelp = new Sprite(resources[_helpIconPath].texture);
      btnHelp.position.set(powerBar.x + powerBar.width, 701);

      heroContainer.addChild(powerBar, btnHelp);
      if (iconClicked === 'glyphs') {
        heroContainer.removeChild(loadingBackground, textLoading);
        addGlyphsContainer(heroContainer, heroName);
      }
    }

    function addBackgroundsImages(heroBottomBackgroundPath) {
      let heroBottomBackground = new Sprite(resources[heroBottomBackgroundPath].texture);
      heroBottomBackground.position.set(1008, 725);

      heroContainer.addChild(heroBottomBackground);
      addHeroInfoIcons(heroContainer, iconClicked, heroName);
      loadPowerBarImages();
    }

    loadBackgroundsImages();
  }

  addBackgroundEmptyBlurImage();
  addBackgroundBookImage();

  stage.removeChild(heroesContainer);
  stage.addChild(heroContainer);
  console.log('stage:', stage.children);
  // setBarContainer(heroContainer);
  // setScrollArrowHeroes(heroesContainer);
}

//
function addHeroInfoIcons(container, iconClicked, heroName) {
  console.log('iconClicked', iconClicked);

  function loadInfoIcons() {
    // const
    //   infoIconsPath = `${iconsFolderPath}info_icon${png}`,
    //   _infoIconSelectedPath = `${iconsFolderPath}info_icon_s${png}`;

    if (infoIconsPath in loader.resources) {
      console.log(`${infoIconsPath} - already in stage`);
      addInfoIcons(infoIconsPath);
    } else {
      loader
        .add(infoIconsPath);
    }
    loader
      .once('complete', (loader, resources) => {
        addInfoIcons(infoIconsPath);
      });
  }

  function addInfoIcons(_infoIconsPath) {
    let idNoSelected = resources[_infoIconsPath].textures;
    let idSelected = resources[_infoIconsPath].textures;

    let infoIconNoSelected = new Sprite(idNoSelected[`info_icon${png}`]);
    let infoIconSelected = new Sprite(idSelected[`info_icon_s${png}`]);

    let statsIcon = new Sprite(idNoSelected[`info_icon${png}`]);
    statsIcon.position.set(1050, 753);
    setInteractive(statsIcon, true);
    statsIcon.on('click', () => {
      console.log('statsIcon clicked');
      switch (iconClicked) {
        case 'glyphs':
          setSelectedIcon(glyphsIcon, statsIcon);
          iconClicked = 'stats';
          container.removeChild(glyphsContainer);
          addStatsContainer(container, heroName);
          break;
        case 'skills':
          setSelectedIcon(skillsIcon, statsIcon);
          iconClicked = 'stats';
          container.removeChild(skillsContainer);
          addStatsContainer(container, heroName);
          break;
        case 'equip':
          setSelectedIcon(equipIcon, statsIcon);
          iconClicked = 'stats';
          container.removeChild(equipContainer);
          addStatsContainer(container, heroName);
          break;
      }
    });

    let glyphsIcon = new Sprite(idNoSelected[`info_icon${png}`]);
    setInteractive(glyphsIcon, true);
    if (iconClicked === 'glyphs') {
      glyphsIcon.texture = infoIconSelected.texture;
      setInteractive(glyphsIcon, false);
    }
    glyphsIcon.position.set(1178, 753);
    glyphsIcon.on('click', () => {
      console.log('glyphsIcon clicked');
      switch (iconClicked) {
        case 'stats':
          setSelectedIcon(statsIcon, glyphsIcon);
          iconClicked = 'glyphs';
          container.removeChild(statsContainer);
          addGlyphsContainer(container, heroName);
          break;
        case 'skills':
          setSelectedIcon(skillsIcon, glyphsIcon);
          iconClicked = 'glyphs';
          container.removeChild(skillsContainer);
          addGlyphsContainer(container, heroName);
          break;
        case 'equip':
          setSelectedIcon(equipIcon, glyphsIcon);
          iconClicked = 'glyphs';
          container.removeChild(equipContainer);
          addGlyphsContainer(container, heroName);
          break;
      }
    });

    let skillsIcon = new Sprite(idNoSelected[`info_icon${png}`]);
    skillsIcon.position.set(1306, 753);
    setInteractive(skillsIcon, true);
    skillsIcon.on('click', () => {
      console.log('skillsIcon clicked');
      switch (iconClicked) {
        case 'stats':
          setSelectedIcon(statsIcon, skillsIcon);
          iconClicked = 'skills';
          container.removeChild(statsContainer);
          addSkillsContainer(container, heroName);
          break;
        case 'glyphs':
          setSelectedIcon(glyphsIcon, skillsIcon);
          iconClicked = 'skills';
          container.removeChild(glyphsContainer);
          addSkillsContainer(container, heroName);
          break;
        case 'equip':
          setSelectedIcon(equipIcon, skillsIcon);
          iconClicked = 'skills';
          container.removeChild(equipContainer);
          addSkillsContainer(container, heroName);
          break;
      }
    });

    let equipIcon = new Sprite(idNoSelected[`info_icon${png}`]);
    equipIcon.position.set(1434, 753);
    setInteractive(equipIcon, true);
    equipIcon.on('click', () => {
      console.log('equipIcon clicked');
      switch (iconClicked) {
        case 'stats':
          setSelectedIcon(statsIcon, equipIcon);
          iconClicked = 'equip';
          container.removeChild(statsContainer);
          addEquipContainer(container, heroName);
          break;
        case 'glyphs':
          setSelectedIcon(glyphsIcon, equipIcon);
          iconClicked = 'equip';
          container.removeChild(glyphsContainer);
          addEquipContainer(container, heroName);
          break;
        case 'skills':
          setSelectedIcon(skillsIcon, equipIcon);
          iconClicked = 'equip';
          container.removeChild(skillsContainer);
          addEquipContainer(container, heroName);
          break;
      }
    });

    function setSelectedIcon(selectedIcon, notSelectedIcon) {
      selectedIcon.texture = infoIconNoSelected.texture;
      notSelectedIcon.texture = infoIconSelected.texture;
      setInteractive(selectedIcon, true);
      setInteractive(notSelectedIcon, false);
    }

    container.addChild(statsIcon, glyphsIcon, skillsIcon, equipIcon);

    socket.emit('heroInfoIcons');
    socket.on('heroInfoIconsData', (data) => {
      console.log('heroInfoIconsData', data);

      const
        statsText = data.stats,
        glyphsText = data.glyphs,
        skillsText = data.skills,
        equipText = data.equip;

      socket.off('heroInfoIconsData');

      const textStatsIcon = new Text(statsText, textStyle_32center_black);
      textStatsIcon.position.set(
        setMiddlePos(statsIcon, textStatsIcon).x,
        setMiddlePos(statsIcon, textStatsIcon).y
      );

      const textGlyphsIcon = new Text(glyphsText, textStyle_32center_black);
      textGlyphsIcon.position.set(
        setMiddlePos(glyphsIcon, textGlyphsIcon).x,
        setMiddlePos(glyphsIcon, textGlyphsIcon).y
      );

      const textSkillsIcon = new Text(skillsText, textStyle_32center_black);
      textSkillsIcon.position.set(
        setMiddlePos(skillsIcon, textSkillsIcon).x,
        setMiddlePos(skillsIcon, textSkillsIcon).y
      );

      const textEquipIcon = new Text(equipText, textStyle_32center_black);
      textEquipIcon.position.set(
        setMiddlePos(equipIcon, textEquipIcon).x,
        setMiddlePos(equipIcon, textEquipIcon).y
      );

      container.addChild(textStatsIcon, textGlyphsIcon, textSkillsIcon, textEquipIcon);
    });
  }

  loadInfoIcons();
}

// `Glyphs` part of `heroContainer`
function addStatsContainer(container, heroName) {
  statsContainer = new Container();
  console.log('heroName from statsContainer', heroName);

  const heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);

  statsContainer.addChild(heroUpperBackground);

  function addHeroSprite(heroSpritePath) {
    let heroSprite = new Sprite(resources[heroSpritePath].texture);
    heroSprite.position.set(332, 205); //344, 217

    statsContainer.addChild(heroSprite);
  }

  switch (heroName) {
    case 'aelois':
      addHeroSprite(aeloisGoldPath);
      break;
    case 'amara':
      addHeroSprite(amaraGoldPath);
      break;
    case 'crystal':
      addHeroSprite(crystalGoldPath);
      break;
    case 'diuwin':
      addHeroSprite(diuwinGoldPath);
      break;
    case 'leona':
      addHeroSprite(leonaGoldPath);
      break;
    case 'leryssa':
      addHeroSprite(leryssaGoldPath);
      break;
    case 'nadia':
      addHeroSprite(nadiaGoldPath);
      break;
    case 'nyx':
      addHeroSprite(nyxGoldPath);
      break;
    case 'sin':
      addHeroSprite(sinGoldPath);
      break;
    case 'zalajin':
      addHeroSprite(zalajinGoldPath);
      break;
    case 'zaya':
      addHeroSprite(zayaGoldPath);
      break;
  }

  socket.emit('statsContainer', heroName);
  socket.on('statsContainerData', (data) => {
    console.log('statsContainerData', data);

    const
      descriptionText = data.description,
      baseStatText = data.baseStatTitle,
      plusEquipText = data.plusEquipTitle,
      powerValue = data.power,
      powerText = data.powerText,
      statsTextArray = [data.healthTitle, data.attackDamageTitle, data.abilityPowerTitle,
        data.armorTitle, data.magicResistTitle, data.attackSpeedTitle, data.healthRegenTitle,
        data.movementSpeedTitle, data.energyRegenTitle, data.critDamageLevelTitle,
        data.critStrikeLevelTitle, data.hitLevelTitle, data.dodgeLevelTitle, data.lifeStealLevelTitle,
        data.energyStealTitle, data.energyBoostTitle, data.armorPenetrationTitle,
        data.magicPenetrationTitle, data.healingEffectTitle, data.shieldEffectTitle
      ],
      statsValueArray = [data.health, data.attackDamage, data.abilityPower,
        data.armor, data.magicResist, data.attackSpeed, data.healthRegen,
        data.movementSpeed, data.energyRegen, data.critDamageLevel,
        data.critStrikeLevel, data.hitLevel, data.dodgeLevel, data.lifeStealLevel,
        data.energySteal, data.energyBoost, data.armorPenetration, data.magicPenetration,
        data.healingEffect, data.shieldEffect
      ];

    socket.off('statsContainerData');

    function loadStatsBackgroundImages() {
      // Loading Image in middle of screen
      addLoadingBackground(statsContainer, loadingText);

      if (statsUpperBackgroundPath in loader.resources && statsBottomBackgroundPath in loader.resources &&
        statsGreyLabelPath in loader.resources && statsWhiteLabelPath in loader.resources) {
        console.log(`${statsUpperBackgroundPath} - already in stage`);
        console.log(`${statsBottomBackgroundPath} - already in stage`);
        console.log(`${statsGreyLabelPath} - already in stage`);
        console.log(`${statsWhiteLabelPath} - already in stage`);
        addStatsBackgroundImages(statsUpperBackgroundPath, statsBottomBackgroundPath,
          statsGreyLabelPath, statsWhiteLabelPath);
      } else {
        loader
          .add([
            statsUpperBackgroundPath, statsBottomBackgroundPath, statsGreyLabelPath,
            statsWhiteLabelPath
          ]);
      }
      loader
        .once('complete', (loader, resources) => {
          addStatsBackgroundImages(statsUpperBackgroundPath, statsBottomBackgroundPath,
            statsGreyLabelPath, statsWhiteLabelPath);
        });
    }

    function addStatsBackgroundImages(_statsUpperBackgroundPath, _statsBottomBackgroundPath,
      _statsGreyLabelPath, _statsWhiteLabelPath) {
      let statsUpperBackground = new Sprite(resources[_statsUpperBackgroundPath].texture);
      statsUpperBackground.position.set(1032, 229);

      let statsBottomBackgroundContainer = new Container();
      statsBottomBackgroundContainer.x = 1044;
      statsBottomBackgroundContainer.y = 412;
      statsBottomBackgroundContainer.interactive = true;

      let statsBottomBackground = new Sprite(resources[_statsBottomBackgroundPath].texture);
      statsBottomBackground.position.set(1032, 399); // 1032, 399

      let textStatsUpperBackground = new Text(descriptionText, textStyleHeroStats_28left_black);
      textStatsUpperBackground.position.set(1050, 244);

      let textBaseStat = new Text(baseStatText, textStyle_32left_black);
      textBaseStat.position.set(1136, 361);

      let textPlusEquip = new Text(plusEquipText, textStylePlusEquip_32left_green);
      textPlusEquip.position.set(textBaseStat.x + textBaseStat.width, textBaseStat.y);

      let textPowerBar = new Text(powerText + powerValue, textStyleLevel_40center_white);
      textPowerBar.position.set(setMiddlePos(statsBottomBackground, textPowerBar).x - 8, 703);

      //
      function addGreyLabel(i, atribute, value) {
        let statsLabel;
        if (i % 2 === 0) {
          statsLabel = new Sprite(resources[_statsGreyLabelPath].texture);
        } else if (i % 2 === 1) {
          statsLabel = new Sprite(resources[_statsWhiteLabelPath].texture);
        }
        statsLabel.position.set(0, i * statsLabel.height);

        let textStats = new Text(atribute, textStyleHeroStats_28left_black);
        textStats.position.set(12, i * statsLabel.height);

        let valueStats = new Text(value, textStyleHeroStats_28left_black);
        valueStats.position.set(
          statsLabel.x + statsLabel.width - 12 - valueStats.width,
          i * statsLabel.height
        );

        statsBottomBackgroundContainer.addChild(statsLabel, textStats, valueStats);
      }

      let n = 0;
      for (let i = 0; i < statsValueArray.length; i++) {
        if (statsValueArray[i] > 0) {
          // console.log(`${n}: ${statsTextArray[i]} - ${statsValueArray[i]}`);
          addGreyLabel(n, statsTextArray[i], statsValueArray[i]);
          n++;
        }
      }

      statsContainer.addChild(statsUpperBackground, textStatsUpperBackground,
        textBaseStat, textPlusEquip, statsBottomBackground, statsBottomBackgroundContainer,
        textPowerBar);

      // Create mask rectangle
      const myMask = new Sprite(resources[statsBottomBackgroundPath].texture);
      myMask.position.set(1032, 399);

      statsContainer.addChild(myMask);

      statsBottomBackgroundContainer.mask = myMask;

      // Methods for dragging 'statsBottomBackgroundContainer'
      statsBottomBackgroundContainer
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointermove', onDragMoveY)
        .on('pointerupoutside', onDragOutside);

      statsContainer.removeChild(loadingBackground, textLoading);
    }

    loadStatsBackgroundImages();

    container.addChild(statsContainer);
  });
}

// `Glyphs` part of `heroContainer`
function addGlyphsContainer(container, heroName) {
  glyphsContainer = new Container();
  console.log(stage.children);
  console.log('heroName from glyphsContainer', heroName);

  let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);

  glyphsContainer.addChild(heroUpperBackground);

  socket.emit('glyphsContainer', heroName);
  socket.on('glyphsContainerData', (data) => {
    console.log('glyphsContainerData', data);

    const
      awakenText = data.awakenText,
      classText = data.class,
      colorText = data.color,
      levelText = data.level,
      nameText = data.name,
      powerValue = data.power,
      powerText = data.powerText,
      starsText = data.stars,
      heroImagePath = data.imagePath,
      expText = data.expText,
      currExpValue = data.currExp,
      nextExpValue = data.nextExp,
      currPagesValue = data.currPages,
      nextPagesValue = data.nextPages;

    socket.off('glyphsContainerData');

    function loadGlyphImages() {
      // Loading Image in middle of screen
      addLoadingBackground(glyphsContainer, loadingText);

      if (awakenIconPath in loader.resources && awakenIconBackgroundPath in loader.resources &&
        nextGlyphsIconPath in loader.resources) {
        console.log(`${awakenIconPath} - already in stage`);
        console.log(`${awakenIconBackgroundPath} - already in stage`);
        console.log(`${nextGlyphsIconPath} - already in stage`);
        addImages(awakenIconPath, awakenIconBackgroundPath, nextGlyphsIconPath);
      } else {
        loader
          .add([
            awakenIconPath, awakenIconBackgroundPath, nextGlyphsIconPath
          ]);
      }
      loader
        .once('complete', (loader, resources) => {
          addImages(awakenIconPath, awakenIconBackgroundPath, nextGlyphsIconPath);
        });
    }

    function addImages(_awakenIconPath, _awakenIconBackgroundPath, _nextGlyphsIconPath) {
      let awakenIconBackground = new Sprite(resources[_awakenIconBackgroundPath].texture);
      awakenIconBackground.position.set(1032, 229);

      let awakenIcon = new Sprite(resources[_awakenIconPath].texture);
      awakenIcon.position.set(1048, 241);

      let textAwakenIcon = new Text(awakenText, textStyle_32left_black);
      textAwakenIcon.position.set(1192, setMiddlePos(awakenIconBackground, textAwakenIcon).y + 4);

      let nextGlyphsIcon = new Sprite(resources[_nextGlyphsIconPath].texture);
      nextGlyphsIcon.position.set(1516, 617);

      let textPowerBar = new Text(powerText + powerValue, textStyleLevel_40center_white);
      textPowerBar.position.set(setMiddlePos(awakenIconBackground, textPowerBar).x - 8, 703);

      glyphsContainer.addChild(awakenIconBackground, awakenIcon, textAwakenIcon,
        nextGlyphsIcon, textPowerBar);
    }

    loadGlyphImages();

    function addGlyphIcon(glyphName, equipped, posX, posY) {
      let id = resources[glyphsPath].textures;
      let idNo = resources[glyphsNoPath].textures;

      let glyph = new Sprite(id[`${glyphName}${png}`]);
      let glyphNo = new Sprite(idNo[`${glyphName}_no${png}`]);

      if (equipped === 'no') {
        glyph.texture = glyphNo.texture;
      }

      glyph.position.set(posX, posY);

      glyphsContainer.addChild(glyph);
    }

    for (let glyph of data.glyphJson.currentGlyphs) {
      let index = data.glyphJson.currentGlyphs.indexOf(glyph);
      switch (index) {
        case 0:
          addGlyphIcon(glyph.icon_path, glyph.equipped, 1158, 393);
          break;
        case 1:
          addGlyphIcon(glyph.icon_path, glyph.equipped, 1310, 393);
          break;
        case 2:
          addGlyphIcon(glyph.icon_path, glyph.equipped, 1158, 545);
          break;
        case 3:
          addGlyphIcon(glyph.icon_path, glyph.equipped, 1310, 545);
          break;
      }
    }

    function loadStarBackgroundImage() {
      if (starBackgroundPath in loader.resources) {
        console.log(`${starBackgroundPath} - already in stage`);
        addStarBackgroundImage(starBackgroundPath);
      } else {
        loader
          .add(starBackgroundPath);
      }

      loader
        .once('complete', (loader, resources) => {
          addStarBackgroundImage(starBackgroundPath);
        });
    }

    function addStarBackgroundImage(_starBackgroundPath) {
      let starBackground = new Sprite(resources[_starBackgroundPath].texture);
      starBackground.position.set(394, 752);

      glyphsContainer.addChild(starBackground);

      function addStarIcon(offsetX) {
        let star = new Sprite(resources[starIconPath].texture);
        star.position.set(
          setMiddlePos(starBackground, star).x + offsetX,
          setMiddlePos(starBackground, star).y
        );

        glyphsContainer.addChild(star);
      }

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
    }

    loadStarBackgroundImage();

    let borderPath;

    function loadBorderImages(_color) {
      glyphsContainer.removeChild(loadingBackground, textLoading);
      // Loading Image in middle of screen
      addLoadingBackground(glyphsContainer, loadingText);

      switch (_color) {
        case 'Green':
          borderPath = `${heroesFolderPath}border_green${png}`;
          break;
        case 'Green +1':
          borderPath = `${heroesFolderPath}border_green+1${png}`;
          break;
        case 'Blue':
          borderPath = `${heroesFolderPath}border_blue${png}`;
          break;
        case 'Blue +1':
          borderPath = `${heroesFolderPath}border_blue+1${png}`;
          break;
        case 'Blue +2':
          borderPath = `${heroesFolderPath}border_blue+2${png}`;
          break;
        default:
          borderPath = `${heroesFolderPath}border_grey${png}`;
      }

      if (pedestalPath in loader.resources) {
        console.log(`${pedestalPath} - already in stage`);
        addHeroPortrait(borderPath, pedestalPath);
      } else {
        loader
          .add(pedestalPath);
      }
      loader
        .once('complete', (loader, resources) => {
          addHeroPortrait(borderPath, pedestalPath);
        });
    }

    function addHeroPortrait(_borderPath, _pedestalPath) {
      let border = new Sprite(resources[_borderPath].texture);
      border.position.set(374, 242);

      let banner = new Sprite(resources[banner620x98Path].texture);
      banner.position.set(312, 204);

      let textBanner = new Text(nameText, textStyleHero_48center_white);
      textBanner.position.set(
        setMiddlePos(banner, textBanner).x,
        setMiddlePos(banner, textBanner).y - 2
      );

      let textLevel = new Text(levelText, textStyleLevel_40center_white);
      textLevel.position.set(
        banner.x + 80 - textLevel.width / 2,
        setMiddlePos(banner, textLevel).y - 4
      );

      let pedestal = new Sprite(resources[pedestalPath].texture);
      pedestal.position.set(setMiddlePos(border, pedestal).x, 643);

      let classIconPath;

      function loadClassIcons(_classText) {
        switch (_classText) {
          case 'Tank':
            classIconPath = `${iconsFolderPath}bookmarks/tank_icon${png}`;
            break;
          case 'Fighter':
            classIconPath = `${iconsFolderPath}bookmarks/fighter_icon${png}`;
            break;
          case 'Marksman':
            classIconPath = `${iconsFolderPath}bookmarks/marksman_icon${png}`;
            break;
          case 'Mage':
            classIconPath = `${iconsFolderPath}bookmarks/mage_icon${png}`;
            break;
          case 'Support':
            classIconPath = `${iconsFolderPath}bookmarks/support_icon${png}`;
            break;
        }

        addClassIcon(classIconPath);
      }

      function addClassIcon(_classIconPath) {
        let classIcon = new Sprite(resources[_classIconPath].texture);
        classIcon.scale.set(0.6);
        classIcon.position.set(
          banner.x + banner.width - 80 - classIcon.width / 2,
          setMiddlePos(banner, classIcon).y - 4
        );

        glyphsContainer.addChild(classIcon);
      }

      glyphsContainer.addChild(border, banner, textBanner, textLevel, pedestal);

      function addHeroSprite(heroSpritePath) {
        let heroSprite = new Sprite(resources[heroSpritePath].texture);
        heroSprite.position.set(setMiddlePos(border, heroSprite).x, 667 - heroSprite.height);

        glyphsContainer.addChild(heroSprite);
        glyphsContainer.removeChild(loadingBackground, textLoading);
      }

      switch (heroName) {
        case 'aelois':
          addHeroSprite(aeloisPath);
          break;
        case 'amara':
          addHeroSprite(amaraPath);
          break;
        case 'crystal':
          addHeroSprite(crystalPath);
          break;
        case 'diuwin':
          addHeroSprite(diuwinPath);
          break;
        case 'leona':
          addHeroSprite(leonaPath);
          break;
        case 'leryssa':
          addHeroSprite(leryssaPath);
          break;
        case 'nadia':
          addHeroSprite(nadiaPath);
          break;
        case 'nyx':
          addHeroSprite(nyxPath);
          break;
        case 'sin':
          addHeroSprite(sinPath);
          break;
        case 'zalajin':
          addHeroSprite(zalajinPath);
          break;
        case 'zaya':
          addHeroSprite(zayaPath);
          break;
      }

      loadClassIcons(classText);
    }

    loadBorderImages(colorText);

    function addBars() {
      let expBar = new Sprite(resources[expBackgroundPath].texture);
      expBar.position.set(341, 845);

      let textHeroExpOfLevels = new Text(`${expText}${currExpValue}/${nextExpValue}`,
        textStyleExpPagesBar_30center_white);
      textHeroExpOfLevels.position.set(
        expBar.x + 6,
        setMiddlePos(expBar, textHeroExpOfLevels).y
      );

      let expBarPlusIcon = new Sprite(resources[plusIconPath].texture);
      expBarPlusIcon.width = expBarPlusIcon.height = 56;
      expBarPlusIcon.position.set(
        expBar.x + expBar.width - expBarPlusIcon.width,
        expBar.y - 4
      );

      let pageBar = new Sprite(resources[expBackgroundPath].texture);
      pageBar.position.set(643, 845);

      let pageIcon = new Sprite(resources[pageIconPath].texture);
      pageIcon.position.set(pageBar.x, pageBar.y - 4);

      let pageBarPlusIcon = new Sprite(resources[plusIconPath].texture);
      pageBarPlusIcon.width = pageBarPlusIcon.height = 56;
      pageBarPlusIcon.position.set(
        pageBar.x + pageBar.width - pageBarPlusIcon.width,
        pageBar.y - 4
      );

      let textNumberOfPages = new Text(`${currPagesValue}/${nextPagesValue}`,
        textStyleExpPagesBar_30center_white);
      if (nextPagesValue === 0) {
        textNumberOfPages.text = 'MAX';
      }
      textNumberOfPages.position.set(
        setMiddlePos(pageBar, textNumberOfPages).x,
        setMiddlePos(pageBar, textNumberOfPages).y
      );

      glyphsContainer.addChild(expBar, textHeroExpOfLevels, expBarPlusIcon, pageBar,
        pageIcon, pageBarPlusIcon, textNumberOfPages);
    }

    addBars();
    container.addChild(glyphsContainer);
  });
}

//
function addSkillsContainer(container, heroName) {
  skillsContainer = new Container();
  console.log(stage.children);
  console.log('heroName from skillsContainer', heroName);

  let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);

  skillsContainer.addChild(heroUpperBackground);

  socket.emit('skillsContainer', heroName);
  socket.on('skillsContainerData', (data) => {
    console.log('skillsContainerData', data);

    const
      classText = data.class,
      levelText = data.level,
      nameText = data.name,
      powerValue = data.power,
      powerText = data.powerText,
      skillsTextArray = data.skills;

    socket.off('skillsContainerData');

    function loadVideo(heroName, filenamePath, index) {
      // Loading Image in middle of screen
      addLoadingBackground(glyphsContainer, loadingText);

      let videoFilePath = `${heroesFolderPath}${heroName}/video/${filenamePath}.png`; // later mkv or mp4, ...

      if (videoFilePath in loader.resources) {
        console.log(`${videoFilePath} - already loaded`);
        addVideo(videoFilePath, index);
      } else {
        loader
          .add(videoFilePath);
      }

      loader
        .once('complete', (loader, resources) => {
          // TODO: video - http://pixijs.io/examples/?v=dev#/basics/video.js
          // - http://www.html5gamedevs.com/topic/16450-pixi-loading-video-files/
          addVideo(videoFilePath, index);
        });
    }

    function addVideo(_videoFilePath, _index) {
      let video = new Sprite(resources[_videoFilePath].texture);
      video.position.set(1032, 229);

      let videoBanner = new Sprite(resources[banner620x98Path].texture);
      videoBanner.width = 476;
      videoBanner.height = 76;
      videoBanner.position.set(1059, 172);

      let textVideoBanner = new Text(skillsTextArray[_index].title, textStyleLevel_40center_white);
      textVideoBanner.position.set(
        setMiddlePos(videoBanner, textVideoBanner).x,
        setMiddlePos(videoBanner, textVideoBanner).y - 4
      );

      skillsContainer.addChild(video, videoBanner, textVideoBanner);
    }

    loadVideo(heroName, 'video_1', 0);

    function loadSkill(heroName) {
      if (skillBackgroundPath in loader.resources && skillLabelPath in loader.resources) {
        console.log(`${skillBackgroundPath} - already loaded`);
        console.log(`${skillLabelPath} - already loaded`);
        loadSkillsIcons(heroName);
      } else {
        loader
          .add([
            skillBackgroundPath, skillLabelPath
          ]);
      }

      loader
        .once('complete', (loader, resources) => {
          loadSkillsIcons(heroName);
        });
    }

    loadSkill(heroName);

    // function loadSkillIcon(_heroName, _index) {
    //   const skillIconPath = `${heroesFolderPath}${_heroName}/skills_icons.json`;
    //   // leonaSkillIconPath = `${heroesFolderPath}leona/skills_icons.json`,
    //
    //   if (skillIconPath in loader.resources) {
    //     console.log(`${skillIconPath} - already loaded`);
    //     addSkillBackground(_heroName, _index, skillIconPath);
    //   } else {
    //     loader
    //       .add(skillIconPath);
    //   }
    //
    //   loader
    //     .once('complete', (loader, resources) => {
    //       addSkillBackground(_heroName, _index, skillIconPath);
    //     });
    // }
    //
    // function addSkillBackground(heroName, index, skillIconPath) {
    //   const skillBackground = new Sprite(resources[skillBackgroundPath].texture);
    //   skillBackground.position.set(332, 359+136*index);
    //
    //   // console.log(eval('`${heroesFolderPath}${heroName}/skills_icons.json`'), `skill_${index}${png}`,
    //   // skillIconPath);
    //   const id = resources[skillIconPath].textures;
    //   const skillIcon = new Sprite(id[`skill_${index}${png}`]);
    //   // const ida = resources[avatarImageJsonPath].textures;
    //   // const avatarImage = new Sprite(ida[`${imagePath}${png}`]);
    //   skillIcon.position.set(352, 373+136*index);
    //
    //   skillsContainer.addChild(skillBackground, skillIcon);
    // }
    //
    // for (let i = 0; i < skillsTextArray.length; i++) {
    //   loadSkill(heroName, i);
    // }
    function loadSkillsIcons(heroName) {
      let skill1IconPath = `${heroesFolderPath}${heroName}/skills/skill_1${png}`;
      let skill2IconPath = `${heroesFolderPath}${heroName}/skills/skill_2${png}`;
      let skill3IconPath = `${heroesFolderPath}${heroName}/skills/skill_3${png}`;
      let skill4IconPath = `${heroesFolderPath}${heroName}/skills/skill_4${png}`;

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
        .once('complete', (loader, resources) => {
          addSkills();
        });

      function addSkillBackground(x, y, offsetY) {
        let skillBackground = new Sprite(resources[skillBackgroundPath].texture);
        skillBackground.position.set(x, y + offsetY); //136

        let skillLabel = new Sprite(resources[skillLabelPath].texture);
        skillLabel.position.set(x + 128, y + 62 + offsetY);

        let textSkill1 = new Text('', textStyle_32left_black);
        let textSkill2 = new Text('', textStyle_32left_black);
        let textSkill3 = new Text('', textStyle_32left_black);
        let textSkill4 = new Text('', textStyle_32left_black);

        let textSkillLevel1 = new Text('Lv. ', textStyle_32right_black);
        let textSkillLevel2 = new Text('Lv. ', textStyle_32right_black);
        let textSkillLevel3 = new Text('Lv. ', textStyle_32right_black);
        let textSkillLevel4 = new Text('Lv. ', textStyle_32right_black);

        textSkill1.text = data.skills[0].title;
        textSkill1.position.set(460, 384);

        textSkillLevel1.text = textSkillLevel1.text + data.skills[0].skill_level;
        textSkillLevel1.position.set(734, 428);

        textSkill2.text = data.skills[1].title;
        textSkill2.position.set(460, 520);

        textSkillLevel2.text = textSkillLevel2.text + data.skills[1].skill_level;
        textSkillLevel2.position.set(734, 564);

        textSkill3.text = data.skills[2].title;
        textSkill3.position.set(460, 656);

        textSkillLevel3.text = textSkillLevel3.text + data.skills[2].skill_level;
        textSkillLevel3.position.set(734, 700);

        textSkill4.text = data.skills[3].title;
        textSkill4.position.set(460, 792);

        textSkillLevel4.text = textSkillLevel4.text + data.skills[3].skill_level;
        textSkillLevel4.position.set(734, 836);

        skillsContainer.addChild(skillBackground, skillLabel,
          textSkill1, textSkill2, textSkill3, textSkill4,
          textSkillLevel1, textSkillLevel2, textSkillLevel3, textSkillLevel4
        );
      }

      function addSkillIcon(spritePath, x, y, offsetY, i) {
        let skillIcon = new Sprite(resources[spritePath].texture);
        skillIcon.position.set(x, y + offsetY);
        setInteractive(skillIcon, true);

        skillIcon.on('click', (event) => {
          console.log(`skill ${i} clicked`);
          // TODO: dodelat preklikavani mezi jednotlivymi skilly + zmena nahledu video v prave casti obrazovky
        });

        let skillPlusIcon = new Sprite(resources[plusIconPath].texture);
        skillPlusIcon.position.set(x + 464, y + 12 + offsetY);
        setInteractive(skillPlusIcon, true);

        skillPlusIcon.on('click', (event) => {
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
    }

    // loadSkillsIcons(heroName);

    let skillsBanner = new Sprite(resources[banner620x98Path].texture);
    skillsBanner.position.set(312, 204);

    let textSkillsBanner = new Text(nameText, textStyleHero_48center_white);
    textSkillsBanner.position.set(
      setMiddlePos(skillsBanner, textSkillsBanner).x,
      setMiddlePos(skillsBanner, textSkillsBanner).y - 2
    );

    let textLevel = new Text(levelText, textStyleLevel_40center_white);
    textLevel.position.set(
      skillsBanner.x + 80 - textLevel.width / 2,
      setMiddlePos(skillsBanner, textLevel).y - 4
    );

    let classIconPath;

    function loadClassIcons(_classText) {
      switch (_classText) {
        case 'Tank':
          classIconPath = `${iconsFolderPath}bookmarks/tank_icon${png}`;
          break;
        case 'Fighter':
          classIconPath = `${iconsFolderPath}bookmarks/fighter_icon${png}`;
          break;
        case 'Marksman':
          classIconPath = `${iconsFolderPath}bookmarks/marksman_icon${png}`;
          break;
        case 'Mage':
          classIconPath = `${iconsFolderPath}bookmarks/mage_icon${png}`;
          break;
        case 'Support':
          classIconPath = `${iconsFolderPath}bookmarks/support_icon${png}`;
          break;
      }
      addClassIcon(classIconPath);
    }

    function addClassIcon(_classIconPath) {
      let classIcon = new Sprite(resources[_classIconPath].texture);
      classIcon.scale.set(0.6);
      classIcon.position.set(
        skillsBanner.x + skillsBanner.width - 80 - classIcon.width / 2,
        setMiddlePos(skillsBanner, classIcon).y - 4
      );

      skillsContainer.addChild(classIcon);
    }

    // TODO: dodelat ceny jednotlivych skillu + v DB vytvorit tabulku s cenami
    // jednotlivych skillu pro dany level skillu

    let textPowerBar = new Text(powerText + powerValue, textStyleLevel_40center_white);
    textPowerBar.position.set(1290 - textPowerBar.width / 2, 703);

    skillsContainer.addChild(textPowerBar, skillsBanner, textSkillsBanner,
      textLevel);
    loadClassIcons(classText);
    container.addChild(skillsContainer);
    skillsContainer.removeChild(loadingBackground, textLoading);
  });
}

// let textBanner = new Text('', textStyleLevel_40center_white);
//
// function addVideo(videoFilePath) {
//   let video = new Sprite(resources[videoFilePath].texture);
//   video.position.set(1032, 229);
//
//   skillsContainer.addChild(heroUpperBackground, video, banner, textBanner);
// }
//
// function loadVideo(heroName, filenamePath) {
//   // const myLoader = PIXI.loader;
//   let videoFilePath = `${heroesFolderPath}${heroName}/video/${filenamePath}.png`; // later mkv or mp4, ...
//
//   if (videoFilePath in loader.resources) {
//     console.log('video already loaded');
//     addVideo(videoFilePath);
//   } else {
//     loader
//       .add(videoFilePath);
//   }
//
//   loader
//     .once('complete', (loader, resources) => {
//       // TODO: video - http://pixijs.io/examples/?v=dev#/basics/video.js
//       // - http://www.html5gamedevs.com/topic/16450-pixi-loading-video-files/
//       addVideo(videoFilePath);
//     });
// }
//
// loadVideo(heroName, 'video_1');
//
// let textPowerBar = new Text('', textStyleLevel_40center_white);
// // textPowerBar.position.set(
// //   setMiddlePos(banner, textPowerBar).x,
// //   692
// // );
// // console.log('power.x', setMiddlePos(banner, textPowerBar).x);
//
// let textSkill1 = new Text('', textStyle_32left_black);
// let textSkill2 = new Text('', textStyle_32left_black);
// let textSkill3 = new Text('', textStyle_32left_black);
// let textSkill4 = new Text('', textStyle_32left_black);
//
// let textSkillLevel1 = new Text('Lv. ', textStyle_32right_black);
// let textSkillLevel2 = new Text('Lv. ', textStyle_32right_black);
// let textSkillLevel3 = new Text('Lv. ', textStyle_32right_black);
// let textSkillLevel4 = new Text('Lv. ', textStyle_32right_black);
//
// // TODO: dodelat ceny jednotlivych skillu + v DB vytvorit tabulku s cenami
// // jednotlivych skillu pro dany level skillu
//
// function loadSkillsIcons(heroName) {
//   let skill1IconPath = `${heroesFolderPath}${heroName}/skills/skill_1${png}`;
//   let skill2IconPath = `${heroesFolderPath}${heroName}/skills/skill_2${png}`;
//   let skill3IconPath = `${heroesFolderPath}${heroName}/skills/skill_3${png}`;
//   let skill4IconPath = `${heroesFolderPath}${heroName}/skills/skill_4${png}`;
//
//   function addSkillBackground(x, y, offsetY) {
//     let skillBackground = new Sprite(resources[skillBackgroundPath].texture);
//     skillBackground.position.set(x, y+offsetY); //136
//
//     let skillLabel = new Sprite(resources[skillLabelPath].texture);
//     skillLabel.position.set(x+128, y+62+offsetY);
//
//     skillsContainer.addChild(skillBackground, skillLabel,
//       textSkill1, textSkill2, textSkill3, textSkill4,
//       textSkillLevel1, textSkillLevel2, textSkillLevel3, textSkillLevel4
//     );
//   }
//
//   function addSkillIcon(spritePath, x, y, offsetY, i) {
//     let skillIcon = new Sprite(resources[spritePath].texture);
//     skillIcon.position.set(x, y+offsetY);
//     setInteractive(skillIcon, true);
//
//     skillIcon.on('click', (event) => {
//       console.log(`skill ${i} clicked`);
//       // TODO: dodelat preklikavani mezi jednotlivymi skilly + zmena nahledu video v prave casti obrazovky
//     });
//
//     let skillPlusIcon = new Sprite(resources[plusIconPath].texture);
//     skillPlusIcon.position.set(x+464, y+12+offsetY);
//     setInteractive(skillPlusIcon, true);
//
//     skillPlusIcon.on('click', (event) => {
//       console.log(`plus for skill ${i} was pressed`);
//     });
//
//     skillsContainer.addChild(skillIcon, skillPlusIcon);
//   }
//
//   function addSkills() {
//     let offsetY = 0;
//     for (let i = 0; i < 4; i++) {
//       addSkillBackground(332, 359, offsetY);
//       switch (i) {
//         case 0:
//           addSkillIcon(skill1IconPath, 352, 373, offsetY, i);
//           break;
//         case 1:
//           addSkillIcon(skill2IconPath, 352, 373, offsetY, i);
//           break;
//         case 2:
//           addSkillIcon(skill3IconPath, 352, 373, offsetY, i);
//           break;
//         case 3:
//           addSkillIcon(skill4IconPath, 352, 373, offsetY, i);
//           break;
//       }
//       offsetY += 136;
//     }
//   }
//
//   if (skill1IconPath in loader.resources && skill2IconPath in loader.resources &&
//     skill3IconPath in loader.resources && skill4IconPath in loader.resources) {
//     console.log('skill icons already loaded');
//     addSkills();
//   } else {
//     loader
//       .add([
//         skill1IconPath, skill2IconPath, skill3IconPath, skill4IconPath
//       ]);
//   }
//
//   loader
//     .once('complete', (loader, resources) => {
//       addSkills();
//     });
// }
//
// loadSkillsIcons(heroName);
//
// let skillsBanner = new Sprite(resources[banner620x98Path].texture);
// skillsBanner.position.set(312, 204);
//
// let textSkillsBanner = new Text('', textStyleBubble_52left_white);
//
// let textLevel = new Text('', textStyleLevel_40center_white);
// textLevel.position.set(392, 228);
//
// let classIcon = new Sprite(resources[allIconPath].texture);
//
// socket.on('heroContainerData', (data) => {
//   console.log('heroContainerData\n', data);
//
//   textBanner.text = data.skills[0].title;
//   textBanner.position.set(
//     setMiddlePos(banner, textBanner).x,
//     setMiddlePos(banner, textBanner).y-4
//   );
//
//   textPowerBar.text = data.textPower+data.power;
//   textPowerBar.position.set(
//     setMiddlePos(banner, textPowerBar).x,
//     692
//   );
//
//   textSkillsBanner.text = data.name;
//   textSkillsBanner.position.set(
//     setMiddlePos(skillsBanner, textSkillsBanner).x,
//     setMiddlePos(skillsBanner, textSkillsBanner).y-4
//   );
//
//   textLevel.text = data.level;
//   textLevel.position.set(
//     textLevel.x-textLevel.width/2,
//     228
//   );
//
//   selectClass(classIcon, data.class);
//   classIcon.scale.set(0.6);
//   classIcon.position.set(830, 230);
//
//   textSkill1.text = data.skills[0].title;
//   textSkill1.position.set(460, 384);
//
//   textSkillLevel1.text = textSkillLevel1.text+data.skills[0].skill_level;
//   textSkillLevel1.position.set(734, 428);
//
//   textSkill2.text = data.skills[1].title;
//   textSkill2.position.set(460, 520);
//
//   textSkillLevel2.text = textSkillLevel2.text+data.skills[1].skill_level;
//   textSkillLevel2.position.set(734, 564);
//
//   textSkill3.text = data.skills[2].title;
//   textSkill3.position.set(460, 656);
//
//   textSkillLevel3.text = textSkillLevel3.text+data.skills[2].skill_level;
//   textSkillLevel3.position.set(734, 700);
//
//   textSkill4.text = data.skills[3].title;
//   textSkill4.position.set(460, 792);
//
//   textSkillLevel4.text = textSkillLevel4.text+data.skills[3].skill_level;
//   textSkillLevel4.position.set(734, 836);
//
//   // socket.removeAllListeners();
//   socket.off('heroContainerData');
// });
//
// skillsContainer.addChild(textPowerBar, skillsBanner,
//   textSkillsBanner, textLevel, classIcon);
// container.addChild(skillsContainer);
// }

//
function addEquipContainer(container, heroName) {
  equipContainer = new Container();
  // console.log(stage.children);

  let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
  heroUpperBackground.position.set(1008, 205);

  equipContainer.addChild(heroUpperBackground);

  // socket.emit('equipContainer', heroName);
  //
  // socket.on('equipContainerData', (data) => {
  //   console.log('equipContainerData', data);
  //
  //   // const
  //   //   awakenText = data.awakenText,
  //   //   classText = data.class;
  //
  //   socket.off('equipContainerData');
  //
  //
  // });

  // Loading Image in middle of screen
  addLoadingBackground(equipContainer, 'Coming soon.');

  container.addChild(equipContainer);
}

let selectedDifficulty;

// Setup 'MAP' = 'mapContainer' for main PvE screen
function setMapContainer() {
  for (let item of interMainScreenArray) {
    setInteractive(item, false);
  }

  for (let item of interScrollArray) {
    setInteractive(item, false);
  }

  mapContainer = new Container();

  // Loading Image in middle of screen
  addLoadingBackground(mapContainer, loadingText);

  // socket.emit('mapContainer', 'setMapContainer'); potreba pro level 1-1, ..
  function loadStarIcon() {
    if (starIconPath in loader.resources) {
      console.log(`${starIconPath} - already loaded`);
      loadBackgroundImages();
    } else {
      loader
        .add(starIconPath);
    }
    loader
      .once('complete', (loader, resources) => {
        loadBackgroundImages();
      });
  }

  function loadBackgroundImages() {
    if (mapBackgroundPath in loader.resources && mapPath in loader.resources &&
      difficultyIconBackgroundPath in loader.resources &&
      difficultySelectedPath in loader.resources &&
      normalDifficultyIconPath in loader.resources &&
      eliteDifficultyIconPath in loader.resources &&
      legendDifficultyIconPath in loader.resources) {
      console.log(`${mapBackgroundPath} - already loaded`);
      console.log(`${mapPath} - already loaded`);
      console.log(`${difficultyIconBackgroundPath} - already loaded`);
      console.log(`${difficultySelectedPath} - already loaded`);
      console.log(`${normalDifficultyIconPath} - already loaded`);
      console.log(`${eliteDifficultyIconPath} - already loaded`);
      console.log(`${legendDifficultyIconPath} - already loaded`);
      addBackground();
    } else {
      loader
        .add([
          mapBackgroundPath, mapPath, difficultyIconBackgroundPath,
          difficultySelectedPath, normalDifficultyIconPath,
          eliteDifficultyIconPath, legendDifficultyIconPath
        ]);
    }

    loader
      .once('complete', (loader, resources) => {
        addBackground();
      });
  }

  function addBackground() {
    let spriteBackground = new Sprite(resources[mapBackgroundPath].texture);
    spriteBackground.position.set(0, 0);

    btnBack = new Sprite(resources[btnBackPath].texture);
    btnBack.position.set(36, 36);
    setInteractive(btnBack, true);
    btnBack.on('click', () => {
      setTimeout(() => {
        backIconClicked(btnBack, mapContainer);
      }, LATENCY / 2);
    });

    let mapImageContainer = new Container();
    mapImageContainer.interactive = true;
    interParagraphsArray.push(mapImageContainer);

    let map = new Sprite(resources[mapPath].texture);
    map.position.set(48, GAME_HEIGHT / 2 - map.height / 2 + 12);

    mapImageContainer.addChild(map);
    mapContainer.addChild(spriteBackground, mapImageContainer, btnBack);
    mapContainer.removeChild(loadingBackground, textLoading);

    // Methods for dragging 'statsBottomBackgroundContainer'
    mapImageContainer
      .on('pointerdown', dragMapStart)
      .on('pointerup', dragMapEnd)
      .on('pointermove', dragMapMove);
    // .on('pointerupoutside', onDragOutside);

    let difficultyIconsContainer = new Container();

    function addDifficultyIcon(spritePosX, difficultyIconPath,
      difficulty, opened, text, chapter, selected) {
      let sprite = new Sprite(resources[difficultyIconBackgroundPath].texture);
      sprite.position.set(spritePosX, GAME_HEIGHT - 24 - sprite.height);

      let difficultyIcon = new Sprite(resources[difficultyIconPath].texture);
      difficultyIcon.position.set(sprite.x + 6, sprite.y + 6);

      if (selected) {
        selectedDifficulty = difficulty;
        let spriteFrame = new Sprite(resources[difficultySelectedPath].texture);
        spriteFrame.position.set(sprite.x - 12, sprite.y - 12);

        difficultyIconsContainer.addChild(spriteFrame);
      }

      let textColor;

      switch (difficulty) {
        case 'Elite':
          textColor = textStyleDifficultyElite_32left_orange;
          break;
        case 'Legend':
          textColor = textStyleDifficultyLegend_32left_purple;
          break;
        default:
          textColor = textStyleDifficultyNormal_32left_green;
      }

      let textDifficulty = new Text(difficulty, textColor);
      textDifficulty.position.set(
        difficultyIcon.x + difficultyIcon.width + 8,
        difficultyIcon.y - 6
      );

      let textProgress = new Text(text + ': ' + chapter, textStyleHeroStats_28left_black);
      textProgress.position.set(
        difficultyIcon.x + difficultyIcon.width + 8,
        difficultyIcon.y + difficultyIcon.height - textProgress.height + 2,
      );

      difficultyIconsContainer.addChild(sprite, difficultyIcon, textDifficulty, textProgress);
      mapContainer.addChild(difficultyIconsContainer);

      function addLockIcon(spritePath) {
        let lockIcon = new Sprite(resources[spritePath].texture);
        lockIcon.position.set(
          sprite.x + sprite.width - lockIcon.width - 6,
          sprite.y + sprite.height - lockIcon.height - 6
        );

        difficultyIconsContainer.addChild(lockIcon);
      }

      function chapterLocked() {
        if (lockIconPath in loader.resources) {
          console.log(`${lockIconPath} - already loaded`);
          addLockIcon(lockIconPath);
        } else {
          loader
            .add(lockIconPath);
        }
        loader
          .once('complete', (loader, resources) => {
            addLockIcon(lockIconPath);
          });
      }

      if (opened === 'no') {
        chapterLocked();
      }
    }

    socket.emit('progress');
    socket.on('progressData', (data) => {
      console.log('progressData\n', data);

      addDifficultyIcon(504, normalDifficultyIconPath,
        data.progress[0].difficulty, data.progress[0].opened, data.progress[0].text,
        data.progress[0].chapter, data.progress[0].selected);
      addDifficultyIcon(820, eliteDifficultyIconPath,
        data.progress[1].difficulty, data.progress[1].opened, data.progress[1].text,
        data.progress[1].chapter, data.progress[1].selected);
      addDifficultyIcon(1136, legendDifficultyIconPath,
        data.progress[2].difficulty, data.progress[2].opened, data.progress[2].text,
        data.progress[2].chapter, data.progress[2].selected);

      socket.off('progressData');
    });

    function addParagraphsIcons(posX, posY, chapter, bannerTitle, description,
      maxNumberOfStars, numberOfStars, staminaConsume, reward, consume, enemies,
      enemiesPower, possibleRewards, sweep, sweepx10, start) {

      function loadChapterParagraphIcons() {
        if (stageIconPath in loader.resources && stageNumberIconPath in loader.resources) {
          // console.log(`${stageIconPath} - already loaded`);
          // console.log(`${stageNumberIconPath} - already loaded`);
          addParagraphIcon(stageIconPath, stageNumberIconPath);
        } else {
          loader
            .add([
              stageIconPath, stageNumberIconPath
            ]);
        }
        loader
          .once('complete', (loader, resources) => {
            addParagraphIcon(stageIconPath, stageNumberIconPath);
          });
      }

      function addParagraphIcon(spritePath, spriteNumberPath) {
        let sprite = new Sprite(resources[spritePath].texture);
        sprite.position.set(posX, posY);
        setInteractive(sprite, true);
        interParagraphsArray.push(sprite);

        sprite.on('click', () => {
          console.log('chapter clicked');
          // mapContainer.removeChild(mapImageContainer);
          loadParagraphsData(chapter, bannerTitle, description, maxNumberOfStars,
            numberOfStars, staminaConsume, reward, consume, enemies, enemiesPower,
            possibleRewards, sweep, sweepx10, start);
          // setChapterParagraphContainer(chapter, bannerTitle, description, maxNumberOfStars,
          //   numberOfStars, staminaConsume, reward, consume, enemies, enemiesPower,
          //   possibleRewards, sweep, sweepx10, start);
        })

        let spriteNumber = new Sprite(resources[spriteNumberPath].texture);
        spriteNumber.position.set(
          setMiddlePos(sprite, spriteNumber).x,
          sprite.y - 6 - spriteNumber.height
        );

        let textChapter = new Text(chapter, textStyleHeroStatsLevel_32left_white);
        textChapter.position.set(
          setMiddlePos(spriteNumber, textChapter).x,
          setMiddlePos(spriteNumber, textChapter).y
        );

        mapImageContainer.addChild(sprite, spriteNumber, textChapter);
      }

      loadChapterParagraphIcons();
    }

    socket.emit('paragraphs');
    socket.on('paragraphsData', (data) => {
      console.log('paragraphsData\n', data);

      for (let index in data.paragraphs) {
        let p_opened = data.paragraphs[index].p_opened,
          p_chapter = data.paragraphs[index].p_chapter,
          p_bannerTitle = data.paragraphs[index].p_bannerTitle,
          p_description = data.paragraphs[index].p_description,
          p_maxNumberOfStars = data.paragraphs[index].p_maxNumberOfStars,
          p_numberOfStars = data.paragraphs[index].p_numberOfStars,
          p_staminaConsume = data.paragraphs[index].p_staminaConsume,
          p_reward = data.paragraphs[index].p_reward,
          p_consume = data.consume,
          p_enemies = data.enemies,
          p_enemiesPower = data.enemiesPower,
          p_possibleRewards = data.possibleRewards,
          p_sweep = data.sweep,
          p_sweepx10 = data.sweepx10,
          p_start = data.start;

        console.log('chapter', p_chapter, 'open -', p_opened);

        if (p_opened === 'yes') {
          switch (p_chapter) {
            case '1-1':
              addParagraphsIcons(708, 320, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //660, 300
              break;
            case '1-2':
              addParagraphsIcons(892, 396, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //844, 376
              break;
            case '1-3':
              addParagraphsIcons(754, 604, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //706, 584
              break;
            case '1-4':
              addParagraphsIcons(1050, 534, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //1002, 514
              break;
            case '1-5':
              addParagraphsIcons(1338, 412, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //1290, 392
              break;
            case '1-6':
              addParagraphsIcons(1678, 326, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //1630, 306
              break;
            case '2-1':
              addParagraphsIcons(2088, 402, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //2040, 382
              break;
            case '2-2':
              addParagraphsIcons(2348, 566, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //2300, 546
              break;
            case '2-3':
              addParagraphsIcons(2658, 522, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //2610, 502
              break;
            case '2-4':
              addParagraphsIcons(2616, 284, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //2568, 264
              break;
            case '2-5':
              addParagraphsIcons(2942, 520, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //2894, 500
              break;
            case '2-6':
              addParagraphsIcons(3276, 340, p_chapter, p_bannerTitle, p_description,
                p_maxNumberOfStars, p_numberOfStars, p_staminaConsume, p_reward,
                p_consume, p_enemies, p_enemiesPower, p_possibleRewards, p_sweep,
                p_sweepx10, p_start); //3228, 320
              break;
          }
        }
      }

      socket.off('paragraphsData');
    });
  }

  loadStarIcon();

  stage.addChild(mapContainer);
  console.log('mapContainer:\n', stage.children);
}

//
function loadParagraphsData(chapter, bannerTitle, description, maxNumberOfStars,
  numberOfStars, staminaConsume, reward, consume, enemies, enemiesPower,
  possibleRewards, sweep, sweepx10, start) {

  let difficulty = selectedDifficulty;
  console.log(`difficulty: ${difficulty}`);

  let enemiesPath = [];
  let possibleRewardsPath = [];
  let enemiesSumPower = 0;
  let selectedEnemies = [];

  socket.emit('selectedParagraph', difficulty, chapter);
  socket.on('selectedParagraphData', (data) => {
    console.log('selectedParagraphData\n', data);

    for (let enemy of data.enemiesData) {
      // console.log(enemy.icon_path);
      let enemyPath = enemy.icon_path;
      enemiesPath.push(enemyPath);
      selectedEnemies.push(enemy.name);
      enemiesSumPower += enemy.power;
    }
    console.log('enemiesPath', enemiesPath);
    console.log('selectedEnemies', selectedEnemies);

    for (let pr of data.possibleRewardsData) {
      let prPath = pr.icon_path;
      possibleRewardsPath.push(prPath);
    }
    console.log('possibleRewardsPath', possibleRewardsPath);

    socket.off('selectedParagraphData');
    setChapterParagraphContainer(difficulty, chapter, bannerTitle, description, maxNumberOfStars,
      numberOfStars, staminaConsume, reward, consume, enemies, enemiesPower,
      possibleRewards, sweep, sweepx10, start, enemiesPath, possibleRewardsPath,
      enemiesSumPower, selectedEnemies)
  });
}

// Setup chapterParagraphContainer() for individual paragraph of chapter
function setChapterParagraphContainer(difficulty, chapter, bannerTitle, description, maxNumberOfStars,
  numberOfStars, staminaConsume, reward, consume, enemies, enemiesPower,
  possibleRewards, sweep, sweepx10, start, enemiesPath, possibleRewardsPath,
  enemiesSumPower, selectedEnemies) {

  for (let item of interParagraphsArray) {
    setInteractive(item, false);
  }

  setInteractive(btnBack, false);

  let chapterParagraphContainer = new Container();

  let backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker.position.set(0, 0);

  let btnBackInParagraph = new Sprite(resources[btnBackPath].texture);
  btnBackInParagraph.position.set(36, 36);
  setInteractive(btnBackInParagraph, true);
  interBtnBackStartArray.push(btnBackInParagraph);
  btnBackInParagraph.on('click', () => {
    setTimeout(() => {
      backIconInParagraphsClicked(chapterParagraphContainer);
    }, LATENCY / 2);
  });

  chapterParagraphContainer.addChild(backgroundDarker, btnBackInParagraph);

  function addParagraphScreen(posX, posY) {
    function loadBannerImage() {
      if (banner620x98Path in loader.resources) {
        console.log(`${banner620x98Path} - already loaded`);
        loadHelpIcon();
      } else {
        loader
          .add(banner620x98Path);
      }
      loader
        .once('complete', (loader, resources) => {
          loadHelpIcon();
        });
    }

    function loadHelpIcon() {
      if (helpIconPath in loader.resources) {
        console.log(`${helpIconPath} - already loaded`);
        loadParagraphImages();
      } else {
        loader
          .add(helpIconPath);
      }
      loader
        .once('complete', (loader, resources) => {
          loadParagraphImages();
        });
    }

    function loadParagraphImages() {
      if (paragraphBackgroundPath in loader.resources && btnSweepPath in loader.resources &&
        btnSweepNoPath in loader.resources && btnStartPath in loader.resources) {
        console.log(`${paragraphBackgroundPath} - already loaded`);
        console.log(`${btnSweepPath} - already loaded`);
        console.log(`${btnSweepNoPath} - already loaded`);
        console.log(`${btnStartPath} - already loaded`);
        addParagraphImages(paragraphBackgroundPath, btnSweepPath, btnSweepNoPath,
          btnStartPath, enemiesPath, possibleRewardsPath, enemiesSumPower,
          selectedEnemies);
      } else {
        loader
          .add([
            paragraphBackgroundPath, btnSweepPath, btnSweepNoPath, btnStartPath
          ]);
      }

      loader
        .once('complete', (loader, resources) => {
          addParagraphImages(paragraphBackgroundPath, btnSweepPath, btnSweepNoPath,
            btnStartPath, enemiesPath, possibleRewardsPath, enemiesSumPower,
            selectedEnemies);
        });
    }

    function addParagraphImages(paragraphBackgroundPath, btnSweepPath, btnSweepNoPath,
      btnStartPath, enemiesPath, possibleRewardsPath, enemiesSumPower,
      selectedEnemies) {

      let spriteBackground = new Sprite(resources[paragraphBackgroundPath].texture);
      spriteBackground.position.set(posX, posY);

      let banner = new Sprite(resources[banner620x98Path].texture);
      banner.scale.set(1.2);
      banner.position.set(
        setMiddlePos(spriteBackground, banner).x,
        spriteBackground.y - banner.height / 2 + 6
      );

      let textBannerTitle = new Text(bannerTitle, textStyleBubble_52left_white);
      textBannerTitle.position.set(
        setMiddlePos(banner, textBannerTitle).x,
        setMiddlePos(banner, textBannerTitle).y - 6
      );

      let textDescription = new Text(description, textStyleText_40left_black);
      textDescription.position.set(posX + 88, posY + 92);

      chapterParagraphContainer.addChild(spriteBackground, banner,
        textBannerTitle, textDescription);

      for (let i = 0; i < maxNumberOfStars; i++) {
        let star = new Sprite(resources[starIconPath].texture);
        star.scale.set(2.5);
        star.position.set(posX + 1064 + 132 * i, posY + 90); //132
        // console.log(star.x, star.y);
        chapterParagraphContainer.addChild(star);
      }

      let textConsume = new Text(consume + ' ' + staminaConsume, textStyleDescription_48left_black);
      textConsume.position.set(posX + 124, posY + 320); //280, 500

      let textEnemies = new Text(enemies, textStyleDescription_48left_black);
      textEnemies.position.set(textConsume.x, posY + 416); //+96

      let textPossibleRewards = new Text(possibleRewards, textStyle_32left_black);
      textPossibleRewards.position.set(posX + 368, posY + 636); //532, 806

      let btnSweepNo = new Sprite(resources[btnSweepNoPath].texture);
      btnSweepNo.position.set(posX + 958, posY + 696); //1114, 856

      let textBtnSweepNo = new Text(sweep, textStyle_32center_black);
      textBtnSweepNo.position.set(
        setMiddlePos(btnSweepNo, textBtnSweepNo).x,
        setMiddlePos(btnSweepNo, textBtnSweepNo).y
      );

      let btnSweepNoX10 = new Sprite(resources[btnSweepNoPath].texture);
      btnSweepNoX10.position.set(posX + 1134, btnSweepNo.y);

      let textBtnSweepNoX10 = new Text(sweepx10, textStyle_32center_black);
      textBtnSweepNoX10.position.set(
        setMiddlePos(btnSweepNoX10, textBtnSweepNoX10).x,
        setMiddlePos(btnSweepNoX10, textBtnSweepNoX10).y
      );

      let btnStart = new Sprite(resources[btnStartPath].texture);
      btnStart.position.set(posX + 1310, posY + 688); //848
      setInteractive(btnStart, true);
      interBtnBackStartArray.push(btnStart);
      btnStart.on('click', () => {
        console.log('btnStart clicked');
        // stage.removeChild(mapContainer);
        // console.log(stage.children);
        loadSelectedHeroes(difficulty, chapter, possibleRewardsPath, selectedEnemies);
      });

      let textBtnStart = new Text(start, textStyleBtn60_44_black);
      textBtnStart.position.set(
        setMiddlePos(btnStart, textBtnStart).x,
        setMiddlePos(btnStart, textBtnStart).y
      );

      let helpIcon = new Sprite(resources[helpIconPath].texture);
      helpIcon.position.set(posX + 1364, posY + 322); //1520, 482

      let textEnemiesPower = new Text('Enemies Power: ' + enemiesSumPower, textStyleDescription_48left_black);
      textEnemiesPower.position.set(
        helpIcon.x - textEnemiesPower.width - 12,
        posY + 320
      );
      // console.log('enemies power:', enemiesSumPower);

      chapterParagraphContainer.addChild(textConsume, textEnemies, textEnemiesPower,
        textPossibleRewards, btnSweepNo, textBtnSweepNo, btnSweepNoX10, textBtnSweepNoX10,
        btnStart, textBtnStart, helpIcon
      );

      for (let i in enemiesPath) {
        // console.log(enemiesPath[i], i); enemiesFolderPath = '/images/game/enemies/',
        let enemyPath = eval('`${enemiesFolderPath}${enemiesPath[i]}${png}`');
        console.log(`enemyPath: ${enemyPath}`);

        function loadEnemyImages() {
          if (enemyPath in loader.resources) {
            console.log(`${enemyPath} - already loaded`);
            addEnemyImages(enemyPath);
          } else {
            loader
              .add(enemyPath);
          }
          loader
            .once('complete', (loader, resources) => {
              addEnemyImages(enemyPath);
            });
        }

        function addEnemyImages(enemyPath) {
          let sprite = new Sprite(resources[enemyPath].texture);
          sprite.position.set(posX + 436 + 168 * i, posY + 412); //592, 572

          chapterParagraphContainer.addChild(sprite);
        }

        loadEnemyImages();
      }

      for (let i in possibleRewardsPath) {
        // let possibleRewardPath = eval('`${enemiesFolderPath}${possibleRewardsPath[i]}${png}`');
        // console.log(`possibleRewardPath: ${possibleRewardPath}, ${possibleRewardsPath[i]}`);
        let id = resources[glyphsPath].textures;
        let reward = new Sprite(id[`${possibleRewardsPath[i]}${png}`]);
        reward.position.set(posX + 86 + 156 * i, posY + 704);

        chapterParagraphContainer.addChild(reward);
      }
    }

    loadBannerImage();
  }

  addParagraphScreen(156, 170);
  mapContainer.addChild(chapterParagraphContainer);
}

// Load information about player's summoned heroes from DB, that can be used in battle
function loadSelectedHeroes(difficulty, chapter, possibleRewardsPath, selectedEnemies) {
  console.log('chapterrr:::', chapter, difficulty);

  socket.emit('selectedHeroes');

  let heroesIconPathList = [];
  // let selectedHeroesSumPower = 0;
  let heroesPositionNumberList = [];
  let heroesNameList = [];
  let heroesLevelList = [];
  let heroesClassList = [];
  let heroesStarsList = [];
  let heroesColorList = [];
  let heroesPowerList = [];

  socket.on('selectedHeroesData', (data) => {
    console.log('selectedHeroesData', data);

    for (let hero of data.heroes) {
      // console.log(enemy.icon_path);
      let heroIconPath = hero.icon_selected_path;
      let heroPositionNumber = hero.position_number;
      let heroName = hero.name;
      let heroLevel = hero.level;
      let heroClass = hero.class;
      let heroStars = hero.stars;
      let heroColor = hero.color;
      let heroPower = hero.power;

      heroesIconPathList.push(heroIconPath);
      heroesPositionNumberList.push(heroPositionNumber);
      heroesNameList.push(heroName);
      heroesLevelList.push(heroLevel);
      heroesClassList.push(heroClass);
      heroesStarsList.push(heroStars);
      heroesColorList.push(heroColor);
      heroesPowerList.push(heroPower);
    }

    let attackText = data.attack;
    let selectHeroesText = data.selectHeroes;
    let textPower = data.textPower;
    let lowHeroesText = data.lowHeroes;

    socket.off('selectedHeroesData');
    setParagraphSelectHeroesContainer(difficulty, chapter, heroesIconPathList, attackText,
      selectHeroesText, textPower, lowHeroesText, heroesPositionNumberList, heroesNameList,
      heroesLevelList, heroesClassList, heroesStarsList, heroesColorList,
      heroesPowerList, possibleRewardsPath, selectedEnemies);
  });
}

const summonedHeroesPerPage = 5;

//
function setParagraphSelectHeroesContainer(difficulty, chapter, heroesIconPathList, attack,
  selectHeroes, textPower, lowHeroesText, heroesPositionNumberList, heroesNameList,
  heroesLevelList, heroesClassList, heroesStarsList, heroesColorList,
  heroesPowerList, possibleRewardsPath, selectedEnemiesList) {

  for (let item of interBtnBackStartArray) {
    setInteractive(item, false);
  }

  let paragraphSelectHeroesContainer = new Container();

  // Load `backgroundEmptyBlurPath` string path
  function loadBackEmptyBlurImage() {
    if (backgroundEmptyBlurPath in loader.resources) {
      console.log(`${backgroundEmptyBlurPath} - already in stage`);
      addBackEmptyBlurImage();
    } else {
      loader
        .add(backgroundEmptyBlurPath);
    }
    loader
      .once('complete', (loader, resources) => {
        addBackEmptyBlurImage();
      });
  }

  function addBackEmptyBlurImage() {
    let backgroundEmptyBlur = new Sprite(resources[backgroundEmptyBlurPath].texture);
    backgroundEmptyBlur.position.set(0, 0);

    let btnBackInSelectHeroes = new Sprite(resources[btnBackPath].texture);
    btnBackInSelectHeroes.position.set(36, 36);
    setInteractive(btnBackInSelectHeroes, true);
    interSelectHeroesArray.push(btnBackInSelectHeroes);
    btnBackInSelectHeroes.on('click', () => {
      setTimeout(() => {
        stage.removeChild(paragraphSelectHeroesContainer);
        for (let item of interBtnBackStartArray) {
          setInteractive(item, true);
        }
      }, LATENCY);
    });

    paragraphSelectHeroesContainer.addChild(backgroundEmptyBlur, btnBackInSelectHeroes);
  }

  loadBackEmptyBlurImage();

  function loadSelectHeroesImages() {
    if (selectUpperBackgroundPath in loader.resources && selectBottomBackgroundPath in loader.resources &&
      btnAttackPath in loader.resources && selectNameLabelPath in loader.resources &&
      selectLevelLabelPath in loader.resources && selectIconLockedPath in loader.resources &&
      selectHeroIconPath in loader.resources && yesIconPath in loader.resources
      // && itemUseBackgroundPath in loader.resources
    ) {
      console.log(`${selectUpperBackgroundPath} - already in stage`);
      console.log(`${selectBottomBackgroundPath} - already in stage`);
      console.log(`${btnAttackPath} - already in stage`);
      console.log(`${selectNameLabelPath} - already in stage`);
      console.log(`${selectLevelLabelPath} - already in stage`);
      console.log(`${selectIconLockedPath} - already in stage`);
      console.log(`${selectHeroIconPath} - already in stage`);
      console.log(`${yesIconPath} - already in stage`);
      // console.log(`${itemUseBackgroundPath} - already in stage`);
      addSelectHeroesImages();
    } else {
      loader
        .add([
          selectUpperBackgroundPath, selectBottomBackgroundPath, btnAttackPath,
          selectNameLabelPath, selectLevelLabelPath, selectIconLockedPath,
          selectHeroIconPath, yesIconPath //, itemUseBackgroundPath
        ]);
    }

    loader
      .once('complete', (loader, resources) => {
        addSelectHeroesImages();
      });
  }

  function addStarIcon(offsetX, sprite, container) {
    let star = new Sprite(resources[starIconPath].texture);
    star.scale.set(0.7);
    star.position.set(
      setMiddlePos(sprite, star).x + offsetX,
      sprite.y + 6
    );
    container.addChild(star);
  }

  function addSelectHeroesImages() {
    let selectedHeroPositionList = [];
    let selectedHeroList = [];
    let selectedHeroContainerList = [];
    let selectedHeroListCoordinateList = [];
    let powerSelectedHeroList = [];
    let selectedHeroesSumPower = 0;
    let numberOfSelecedHeroes = 5;

    let upperBackground = new Sprite(resources[selectUpperBackgroundPath].texture);
    upperBackground.position.set(172, 72);

    let bottomBackground = new Sprite(resources[selectBottomBackgroundPath].texture);
    bottomBackground.position.set(
      upperBackground.x,
      upperBackground.y + upperBackground.height + 24
    );

    let banner = new Sprite(resources[banner620x98Path].texture);
    banner.scale.set(1.2);
    banner.position.set(
      setMiddlePos(upperBackground, banner).x,
      upperBackground.y - banner.height / 2 + 6
    );

    let textBannerTitle = new Text(selectHeroes, textStyleBubble_52left_white);
    textBannerTitle.position.set(
      setMiddlePos(banner, textBannerTitle).x,
      setMiddlePos(banner, textBannerTitle).y - 6
    );

    let btnAttack = new Sprite(resources[btnAttackPath].texture);
    btnAttack.position.set(1722, bottomBackground.y + 72);

    let textBtnAttack = new Text(attack, textStyleBtn60_44_black);
    textBtnAttack.position.set(
      setMiddlePos(btnAttack, textBtnAttack).x,
      setMiddlePos(btnAttack, textBtnAttack).y
    );

    setInteractive(btnAttack, true);
    interSelectHeroesArray.push(btnAttack);
    btnAttack.on('click', () => {
      console.log('btnAttack clicked');
      console.log('numberOfSelecedHeroes', numberOfSelecedHeroes);
      if (numberOfSelecedHeroes !== selectedHeroList.length) {
        for (let item of interSelectHeroesArray) {
          setInteractive(item, false);
        }
        let itemUseBackground = new Sprite(resources[loadingBackgroundPath].texture);
        itemUseBackground.position.set(
          GAME_WIDTH / 2 - itemUseBackground.width / 2,
          GAME_HEIGHT / 2 - itemUseBackground.height / 2,
        );
        // TODO: dodělat text uprostřed 'itemUseBackground', kde bude napsáno, že není splněn maximální počet hrdinů,
        // které lze vybrat a začít poté souboj - text zanést do databáze
        let textLowHeroes = new Text(lowHeroesText, textStyleBtn60_44_black);
        textLowHeroes.position.set(
          setMiddlePos(itemUseBackground, textLowHeroes).x,
          setMiddlePos(itemUseBackground, textLowHeroes).y
        );
        // console.log('bb', stage.children[stage.children.length-1]);
        let spriteBackground = new Sprite(resources[backgroundDarkerPath].texture);
        spriteBackground.position.set(0, 0);
        setInteractive(spriteBackground, true);
        spriteBackground.on('click', () => {
          for (let item of interSelectHeroesArray) {
            setInteractive(item, true);
          }
          paragraphSelectHeroesContainer.removeChild(spriteBackground, itemUseBackground,
            textLowHeroes);
        });

        paragraphSelectHeroesContainer.addChild(spriteBackground, itemUseBackground,
          textLowHeroes);
      } else {
        stage.removeChild(paragraphSelectHeroesContainer, mapContainer);
        console.log(stage.children);
        setAttackScreenContainer(selectedHeroList, difficulty, chapter, possibleRewardsPath,
          selectedEnemiesList);
      }
    });

    let powerBanner = new Sprite(resources[banner620x98Path].texture);
    powerBanner.scale.set(0.8);
    powerBanner.position.set(
      setMiddlePos(bottomBackground, powerBanner).x,
      bottomBackground.y - powerBanner.height / 2 + 6
    );

    let textPowerBanner = new Text('', textStyleLevel_40center_white);

    paragraphSelectHeroesContainer.addChild(upperBackground, bottomBackground, banner,
      textBannerTitle, btnAttack, textBtnAttack);

    const bookmarkX = upperBackground.x + upperBackground.width;
    const SCALE = 0.87;

    // addBookmark(paragraphSelectHeroesContainer, bookmarkX, 96, allIconPath, SCALE); //+12
    // addBookmark(paragraphSelectHeroesContainer, bookmarkX, 202, tankIconPath, SCALE);
    // addBookmark(paragraphSelectHeroesContainer, bookmarkX, 308, fighterIconPath, SCALE);
    // addBookmark(paragraphSelectHeroesContainer, bookmarkX, 414, marksmanIconPath, SCALE);
    // addBookmark(paragraphSelectHeroesContainer, bookmarkX, 520, mageIconPath, SCALE);
    // addBookmark(paragraphSelectHeroesContainer, bookmarkX, 626, supportIconPath, SCALE);

    const progress = chapter;
    const diff = difficulty;
    //const diff = 'Normal'; // TODO: pokud pri zmene na 'Elite' obtiznost nefunguje kod nize,
    // dopsat diff dle hodnoty, ktera bude predavana spolu s hodnotou 'chapter'

    for (let i = 0; i < summonedHeroesPerPage; i++) {
      let sprite = new Sprite(resources[selectIconLockedPath].texture);
      sprite.position.set(278 + 280 * i, bottomBackground.y + 36);
      // console.log(sprite.x, sprite.y);

      paragraphSelectHeroesContainer.addChild(sprite);
    }

    if (progress === '1-1' || progress === '1-2' || progress === '1-3' ||
      progress === '1-4' || progress === '1-5' || progress === '1-6') {

      numberOfSelecedHeroes = 4;
      // console.log('numberOfSelecedHeroes', numberOfSelecedHeroes);

      let textComplete = new Text('Complete 1-6', textStyle_32center_black);
      textComplete.position.set(284, 990); //985

      // console.log(loader.resources);
      let lockSprite = new Sprite(resources['/images/game/icons/lock_icon.png'].texture);
      lockSprite.scale.set(2);
      lockSprite.position.set(384 - lockSprite.width / 2 - 5, bottomBackground.y + 76);

      paragraphSelectHeroesContainer.addChild(textComplete, lockSprite);
    }

    if (progress === '1-1' || progress === '1-2' || progress === '1-3') {

      numberOfSelecedHeroes = 3;
      // console.log('numberOfSelecedHeroes', numberOfSelecedHeroes);

      let textComplete = new Text('Complete 1-3', textStyle_32center_black);
      textComplete.position.set(564, 990); //985

      let lockSprite = new Sprite(resources['/images/game/icons/lock_icon.png'].texture);
      lockSprite.scale.set(2);
      lockSprite.position.set(664 - lockSprite.width / 2 - 5, bottomBackground.y + 76);

      paragraphSelectHeroesContainer.addChild(textComplete, lockSprite);
    }

    function bubbleSort(heroesArray, heroesPositionNumberArray, heroesPowerArray,
      heroesContainerArray, coordinateArray) {
      for (let i = 0; i < heroesArray.length - 1; i++) {
        for (let j = 0; j < heroesArray.length - i - 1; j++) {
          if (heroesPositionNumberArray[j] > heroesPositionNumberArray[j + 1]) {
            let tempHeroes = heroesArray[j];
            // console.log(tempHeroes);
            heroesArray[j] = heroesArray[j + 1];
            // console.log(heroesArray[j]);
            heroesArray[j + 1] = tempHeroes;
            let tempPos = heroesPositionNumberArray[j];
            heroesPositionNumberArray[j] = heroesPositionNumberArray[j + 1];
            heroesPositionNumberArray[j + 1] = tempPos;
            let tempPower = heroesPowerArray[j];
            heroesPowerArray[j] = heroesPowerArray[j + 1];
            heroesPowerArray[j + 1] = tempPower;
            let tempContainer = heroesContainerArray[j];
            heroesContainerArray[j] = heroesContainerArray[j + 1];
            heroesContainerArray[j + 1] = tempContainer;
            let tempCoordinate = coordinateArray[j];
            coordinateArray[j] = coordinateArray[j + 1];
            coordinateArray[j + 1] = tempCoordinate;
          }
        }
      }
    }

    for (let index in heroesIconPathList) {
      // console.log('index', index);
      console.log('heroesIconPathList[index]', heroesIconPathList[index]);
      let heroIconContainer = new Container();
      let heroIconContainerCopy = new Container();

      let sprite = new Sprite(resources[heroesIconPathList[index]].texture);
      let spriteCopy = new Sprite(resources[heroesIconPathList[index]].texture);
      let selectHeroIcon = new Sprite(resources[selectHeroIconPath].texture);
      let yesIcon = new Sprite(resources[yesIconPath].texture);

      let positionX = index % summonedHeroesPerPage;
      let positionY = ~~(index / summonedHeroesPerPage);
      // console.log(positionX, '-', positionY);

      switch (positionX) {
        case 0:
          heroIconContainer.position.set(278 + 280 * positionX, 148 + 264 * positionY); //+8
          heroIconContainerCopy.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.visible = false;
          yesIcon.position.set(
            setMiddlePos(selectHeroIcon, yesIcon).x,
            setMiddlePos(selectHeroIcon, yesIcon).y
          );
          yesIcon.visible = false;
          break;
        case 1:
          heroIconContainer.position.set(278 + 280 * positionX, 148 + 264 * positionY);
          heroIconContainerCopy.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.visible = false;
          yesIcon.position.set(
            setMiddlePos(selectHeroIcon, yesIcon).x,
            setMiddlePos(selectHeroIcon, yesIcon).y
          );
          yesIcon.visible = false;
          break;
        case 2:
          heroIconContainer.position.set(278 + 280 * positionX, 148 + 264 * positionY);
          heroIconContainerCopy.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.visible = false;
          yesIcon.position.set(
            setMiddlePos(selectHeroIcon, yesIcon).x,
            setMiddlePos(selectHeroIcon, yesIcon).y
          );
          yesIcon.visible = false;
          break;
        case 3:
          heroIconContainer.position.set(278 + 280 * positionX, 148 + 264 * positionY);
          heroIconContainerCopy.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.visible = false;
          yesIcon.position.set(
            setMiddlePos(selectHeroIcon, yesIcon).x,
            setMiddlePos(selectHeroIcon, yesIcon).y
          );
          yesIcon.visible = false;
          break;
        case 4:
          heroIconContainer.position.set(278 + 280 * positionX, 148 + 264 * positionY);
          heroIconContainerCopy.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.position.set(heroIconContainer.x, heroIconContainer.y);
          selectHeroIcon.visible = false;
          yesIcon.position.set(
            setMiddlePos(selectHeroIcon, yesIcon).x,
            setMiddlePos(selectHeroIcon, yesIcon).y
          );
          yesIcon.visible = false;
          break;
      }

      let nameSprite = new Sprite(resources[selectNameLabelPath].texture);
      nameSprite.position.set(sprite.x, sprite.y + sprite.height - 16); //312
      let nameSpriteCopy = new Sprite(resources[selectNameLabelPath].texture);
      nameSpriteCopy.position.set(nameSprite.x, nameSprite.y); //312

      let textNameSprite = new Text(heroesNameList[index], textStyle_32center_black);
      textNameSprite.position.set(
        setMiddlePos(nameSprite, textNameSprite).x,
        setMiddlePos(nameSprite, textNameSprite).y
      );
      let textNameSpriteCopy = new Text(heroesNameList[index], textStyle_32center_black);
      textNameSpriteCopy.position.set(textNameSprite.x, textNameSprite.y);

      let levelSprite = new Sprite(resources[selectLevelLabelPath].texture);
      levelSprite.position.set(sprite.x, sprite.y + sprite.height - 28 - levelSprite.height); //264
      let levelSpriteCopy = new Sprite(resources[selectLevelLabelPath].texture);
      levelSpriteCopy.position.set(levelSprite.x, levelSprite.y); //264

      let textLevelSprite = new Text(heroesLevelList[index], textStyleHeroSelectLevel_20left_white);
      textLevelSprite.position.set(
        levelSprite.x + levelSprite.width - textLevelSprite.width - 12,
        setMiddlePos(levelSprite, textLevelSprite).y
      );
      let textLevelSpriteCopy = new Text(heroesLevelList[index], textStyleHeroSelectLevel_20left_white);
      textLevelSpriteCopy.position.set(textLevelSprite.x, textLevelSprite.y);

      heroIconContainer.addChild(sprite, nameSprite, textNameSprite, levelSprite,
        textLevelSprite);
      heroIconContainerCopy.addChild(spriteCopy, nameSpriteCopy, textNameSpriteCopy,
        levelSpriteCopy, textLevelSpriteCopy);

      switch (heroesStarsList[index]) {
        case 2:
          addStarIcon(-18, sprite, heroIconContainer);
          addStarIcon(18, sprite, heroIconContainer);
          addStarIcon(-18, sprite, heroIconContainerCopy);
          addStarIcon(18, sprite, heroIconContainerCopy);
          break;
        case 3:
          addStarIcon(-36, sprite, heroIconContainer);
          addStarIcon(0, sprite, heroIconContainer);
          addStarIcon(36, sprite, heroIconContainer);
          addStarIcon(-36, sprite, heroIconContainerCopy);
          addStarIcon(0, sprite, heroIconContainerCopy);
          addStarIcon(36, sprite, heroIconContainerCopy);
          break;
        case 4:
          addStarIcon(-54, sprite, heroIconContainer);
          addStarIcon(-18, sprite, heroIconContainer);
          addStarIcon(18, sprite, heroIconContainer);
          addStarIcon(54, sprite, heroIconContainer);
          addStarIcon(-54, sprite, heroIconContainerCopy);
          addStarIcon(-18, sprite, heroIconContainerCopy);
          addStarIcon(18, sprite, heroIconContainerCopy);
          addStarIcon(54, sprite, heroIconContainerCopy);
          break;
        case 5:
          addStarIcon(-72, sprite, heroIconContainer);
          addStarIcon(-36, sprite, heroIconContainer);
          addStarIcon(0, sprite, heroIconContainer);
          addStarIcon(36, sprite, heroIconContainer);
          addStarIcon(72, sprite, heroIconContainer);
          addStarIcon(-72, sprite, heroIconContainerCopy);
          addStarIcon(-36, sprite, heroIconContainerCopy);
          addStarIcon(0, sprite, heroIconContainerCopy);
          addStarIcon(36, sprite, heroIconContainerCopy);
          addStarIcon(72, sprite, heroIconContainerCopy);
          break;
        default:
          addStarIcon(0, sprite, heroIconContainer);
          addStarIcon(0, sprite, heroIconContainerCopy);
      }

      paragraphSelectHeroesContainer.addChild(heroIconContainer, selectHeroIcon,
        yesIcon, heroIconContainerCopy);

      setInteractive(heroIconContainerCopy, true);
      interSelectHeroesArray.push(heroIconContainerCopy);
      heroIconContainerCopy.on('click', () => {
        // console.log('heroIconContainerCopy', heroIconContainerCopy.x, heroIconContainerCopy.y);
        if (selectedHeroList.includes(heroesNameList[index]) === true) {
          const i = selectedHeroList.indexOf(heroesNameList[index]);
          console.log('index "i":', i, heroesNameList[index]);
          if (i > -1) {
            heroIconContainerCopy.position.set(selectedHeroListCoordinateList[i][0], selectedHeroListCoordinateList[i][1]);

            selectedHeroesSumPower -= powerSelectedHeroList[i];
            console.log('selectedHeroesSumPower', selectedHeroesSumPower);

            if (isNaN(selectedHeroesSumPower)) {
              selectedHeroesSumPower = 0;
            }

            selectedHeroList.splice(i, 1);
            selectedHeroPositionList.splice(i, 1);
            powerSelectedHeroList.splice(i, 1);
            selectedHeroContainerList.splice(i, 1);
            selectedHeroListCoordinateList.splice(i, 1);

            console.log('selectedHeroList', selectedHeroList);
            console.log('selectedHeroPositionList', selectedHeroPositionList);
            console.log('powerSelectedHeroList', powerSelectedHeroList);
            console.log('selectedHeroContainerList', selectedHeroContainerList);
            console.log('selectedHeroListCoordinateList', selectedHeroListCoordinateList);

            // console.log('selectedHeroesSumPower', selectedHeroesSumPower);
            textPowerBanner.text = textPower + selectedHeroesSumPower;
            textPowerBanner.position.set(
              setMiddlePos(powerBanner, textPowerBanner).x,
              setMiddlePos(powerBanner, textPowerBanner).y - 4
            );

            for (let ii = 0; ii < selectedHeroList.length; ii++) {
              selectedHeroContainerList[ii].position.set(1398 - 280 * ii, 804);
            }

            if (selectHeroIcon.visible === true) {
              selectHeroIcon.visible = false;
              yesIcon.visible = false;
            }
          }
        } else {
          if (selectedHeroList.length < numberOfSelecedHeroes) {

            selectedHeroList.push(heroesNameList[index]);
            selectedHeroPositionList.push(heroesPositionNumberList[index]);
            powerSelectedHeroList.push(heroesPowerList[index]);
            selectedHeroContainerList.push(heroIconContainerCopy);
            selectedHeroListCoordinateList.push([heroIconContainerCopy.x, heroIconContainerCopy.y]);

            bubbleSort(selectedHeroList, selectedHeroPositionList, powerSelectedHeroList,
              selectedHeroContainerList, selectedHeroListCoordinateList);

            console.log('selectedHeroList', selectedHeroList);
            console.log('selectedHeroPositionList', selectedHeroPositionList);
            console.log('powerSelectedHeroList', powerSelectedHeroList);
            console.log('selectedHeroContainerList', selectedHeroContainerList);
            console.log('selectedHeroListCoordinateList', selectedHeroListCoordinateList);

            selectedHeroesSumPower += heroesPowerList[index];
            // console.log('selectedHeroesSumPower', selectedHeroesSumPower);
            textPowerBanner.text = textPower + selectedHeroesSumPower;
            textPowerBanner.position.set(
              setMiddlePos(powerBanner, textPowerBanner).x,
              setMiddlePos(powerBanner, textPowerBanner).y - 4
            );

            for (let ii = 0; ii < selectedHeroList.length; ii++) {
              selectedHeroContainerList[ii].position.set(1398 - 280 * ii, 804);
            }

            if (selectHeroIcon.visible === false) {
              selectHeroIcon.visible = true;
              yesIcon.visible = true;
            }
          }
        }
      });
    }

    textPowerBanner.text = textPower + selectedHeroesSumPower;
    textPowerBanner.position.set(
      setMiddlePos(powerBanner, textPowerBanner).x,
      setMiddlePos(powerBanner, textPowerBanner).y - 4
    );

    paragraphSelectHeroesContainer.addChild(powerBanner, textPowerBanner);
  }

  loadSelectHeroesImages();
  stage.addChild(paragraphSelectHeroesContainer);
}

let battleProgress = 0;
const battleProgressEnd = 3;
let attackScreenContainer;

//
function setAttackScreenContainer(selectedHeroList, difficulty, chapter, possibleRewardsPath,
  selectedEnemiesList) {

  console.log('attack screen');
  console.log('selectedHeroList:', selectedHeroList);
  console.log('selectedEnemiesList:', selectedEnemiesList);

  attackScreenContainer = new Container();

  function loadAttackScreenImages() {
    if (backgroundPath in loader.resources && timerBackgroundPath in loader.resources &&
      btnAutoPath in loader.resources && btnAutoNoPath in loader.resources &&
      pauseIconPath in loader.resources && hpBarPath in loader.resources &&
      timerIconPath in loader.resources && exitIconPath in loader.resources &&
      soundIconPath in loader.resources && musicIconPath in loader.resources &&
      continueIconPath in loader.resources && btnStatisticsPath in loader.resources &&
      btnNextPath in loader.resources && btnStatisticsPath in loader.resources
    ) {
      console.log(`${backgroundPath} - already in stage`);
      console.log(`${timerBackgroundPath} - already in stage`);
      console.log(`${btnAutoPath} - already in stage`);
      console.log(`${btnAutoNoPath} - already in stage`);
      console.log(`${pauseIconPath} - already in stage`);
      console.log(`${hpBarPath} - already in stage`);
      console.log(`${timerIconPath} - already in stage`);
      console.log(`${exitIconPath} - already in stage`)
      console.log(`${soundIconPath} - already in stage`);
      console.log(`${musicIconPath} - already in stage`);
      console.log(`${continueIconPath} - already in stage`);
      console.log(`${btnStatisticsPath} - already in stage`);
      console.log(`${btnNextPath} - already in stage`);
      console.log(`${backgroundBattleOverPath} - already in stage`);
      addAttackScreenImages();
    } else {
      loader
        .add([
          backgroundPath, timerBackgroundPath, btnAutoPath, btnAutoNoPath,
          pauseIconPath, hpBarPath, timerIconPath,
          exitIconPath, soundIconPath, musicIconPath, continueIconPath,
          btnStatisticsPath, btnNextPath, backgroundBattleOverPath
        ]);
    }

    loader
      .once('complete', (loader, resources) => {
        addAttackScreenImages();
      });
  }

  function addAttackScreenImages() {

    let rand = getRandomInt(0, 99);
    console.log(`rand: ${rand}`);
    chooseReward(rand, possibleRewardsPath);
    resultRewards = rewards.slice(0);
    console.log(rewards);
    //    console.log(resultRewards);

    let whichHeroDroppedItem = [];

    if (rewards.length > 0) {
      if (rewards.length === 1) {
        let r = getRandomInt(0, 99);
        if (r < 50) whichHeroDroppedItem.push(0);
        else whichHeroDroppedItem.push(1);
      } else whichHeroDroppedItem.push(0, 1);
    }

    console.log(`whichHeroDroppedItem: ${whichHeroDroppedItem}`);

    let selectedHeroesList = [];
    for (let hero of selectedHeroList) selectedHeroesList.push(hero);
    console.log(`selectedHeroesList:`, selectedHeroesList);

    // let selectedEnemiesList = ['Enemy 3', 'Enemy 4', 'Enemy 5', 'Enemy 6'];

    let numberOfEnemiesArray = [];
    for (let i in selectedEnemiesList) numberOfEnemiesArray.push(i);

    let battleListOfHeroesIcons = [];
    let battleListOfHeroes = [];
    let battleListOfEnemies = [];

    const attack_delay = 400;
    const manaBarWidth = 192;

    let spriteBackground = new Sprite(resources[backgroundPath].texture);
    spriteBackground.position.set(0, 0);

    let pauseIcon = new Sprite(resources[pauseIconPath].texture);
    pauseIcon.position.set(36, 36);
    // setInteractive(pauseIcon, true);
    // pauseIcon.on('click', () => {
    //   console.log('pauseIcon clicked');
    // });

    // let battleProgressBackground = new Sprite(resources[timerBackgroundPath].texture);
    // battleProgressBackground.position.set(
    //   GAME_WIDTH / 2 - battleProgressBackground.width - 36,
    //   setMiddlePos(pauseIcon, battleProgressBackground).y
    // );
    //
    // battleProgress++;
    //
    // let textBattleProgressBackground = new Text(`Progress: ${battleProgress}/${battleProgressEnd}`,
    //   textStyle_32center_black);
    // textBattleProgressBackground.position.set(
    //   setMiddlePos(battleProgressBackground, textBattleProgressBackground).x,
    //   setMiddlePos(battleProgressBackground, textBattleProgressBackground).y + 2
    // );

    let timerBackground = new Sprite(resources[timerBackgroundPath].texture);
    timerBackground.position.set(
      GAME_WIDTH / 2 + 36,
      setMiddlePos(pauseIcon, timerBackground).y
    );

    let timerIcon = new Sprite(resources[timerIconPath].texture);
    timerIcon.position.set(
      timerBackground.x + timerBackground.width - timerIcon.width / 2,
      setMiddlePos(timerBackground, timerIcon).y
    );

    let textTimerIcon = new Text(`00:00`, textStyle_32center_black);
    textTimerIcon.position.set(
      setMiddlePos(timerBackground, textTimerIcon).x - 8,
      setMiddlePos(timerBackground, textTimerIcon).y + 2
    );

    let btnAuto = new Sprite(resources[btnAutoNoPath].texture);
    btnAuto.position.set(72, 824);

    let moneyBackground = new Sprite(resources[timerBackgroundPath].texture);
    moneyBackground.position.set(1672, setMiddlePos(pauseIcon, moneyBackground).y);

    let moneyIcon = new Sprite(resources[goldIconPath].texture);
    moneyIcon.position.set(
      moneyBackground.x + moneyBackground.width - moneyIcon.width / 2,
      setMiddlePos(moneyBackground, moneyIcon).y
    );

    let money = 0;
    let chests = 0;

    let textMoneyBackground = new Text(`${money}`, textStyle_32center_black);
    textMoneyBackground.position.set(
      setMiddlePos(moneyBackground, textMoneyBackground).x,
      setMiddlePos(moneyBackground, textMoneyBackground).y
    );

    let chestBackground = new Sprite(resources[timerBackgroundPath].texture);
    chestBackground.position.set(1672, moneyBackground.y + 100);

    let chestIcon = new Sprite(resources[timerIconPath].texture);
    chestIcon.position.set(
      chestBackground.x + chestBackground.width - chestIcon.width / 2,
      setMiddlePos(chestBackground, chestIcon).y
    );

    let textChestBackground = new Text(`${chests}`, textStyle_32center_black);
    textChestBackground.position.set(
      setMiddlePos(chestBackground, textChestBackground).x,
      setMiddlePos(chestBackground, textChestBackground).y
    );

    attackScreenContainer.addChild(spriteBackground, //pauseIcon, battleProgressBackground,
      // textBattleProgressBackground,
      timerBackground, timerIcon, textTimerIcon, btnAuto, moneyBackground,
      moneyIcon, textMoneyBackground, chestBackground, chestIcon, textChestBackground);

    socket.emit('battle');
    socket.emit('battleHeroes', selectedHeroList, difficulty, chapter);
    // socket.emit('battleEnemies', difficulty, chapter);
    // battleCountdownTimer('battleTimerStarted', 'battleTimerEnded',
    //   textTimerIcon, timerBackground);

    socket.on('battleData', (data) => {
      console.log('battleData', data);

      const autoText = data.auto;

      socket.off('battleData');

      let textBtnAuto = new Text(autoText, textStyleBtn60_44_black);
      textBtnAuto.position.set(
        setMiddlePos(btnAuto, textBtnAuto).x,
        setMiddlePos(btnAuto, textBtnAuto).y
      );

      attackScreenContainer.addChild(textBtnAuto);
    });

    socket.on('battleHeroesData', (data) => {
      console.log('battleHeroesData', data);

      let
        heroObject = data.heroArray,
        heroesBattleCoorArray = data.heroesBattleCoordination,
        enemiesBattleCoorArray = data.enemiesBattleCoordination,
        enemyObject = data.enemiesArray;

      socket.off('battleData');

      function addSelectedHeroIcon(heroIconPath, i) {
        const heroIconContainer = new Container();

        let heroIcon = new Sprite(resources[heroIconPath].texture);
        heroIcon.position.set(1648 - 248 * i, 810);
        //        setInteractive(heroIcon, true);
        heroIcon.on('click', () => {
          console.log(`${selectedHeroList[i].name} used ultimate skill!`);
          iconManaBar.outer.width = 0;
          fullIconManaBar.visible = false;
          setInteractive(heroIcon, false);
          chooseHeroUltSkill(i);
        });

        const iconHealthBar = new Container();
        iconHealthBar.position.set(heroIcon.x + 4, heroIcon.y + heroIcon.height + 10);

        let innerIconHealthBar = new Sprite(resources[hpBarPath].texture);
        innerIconHealthBar.position.set(heroIcon.x, heroIcon.y + heroIcon.height + 6);

        let outerIconHealthBar = new PIXI.Graphics();
        outerIconHealthBar.beginFill(0x00ff00);
        outerIconHealthBar.drawRect(0, 0, 192, 16);
        outerIconHealthBar.endFill();
        iconHealthBar.addChild(outerIconHealthBar);

        iconHealthBar.outer = outerIconHealthBar;

        const iconManaBar = new Container();
        iconManaBar.position.set(iconHealthBar.x, iconHealthBar.y + iconHealthBar.height + 14);

        let innerIconManaBar = new Sprite(resources[hpBarPath].texture);
        innerIconManaBar.position.set(innerIconHealthBar.x, innerIconHealthBar.y + innerIconHealthBar.height + 6);

        let outerIconManaBar = new PIXI.Graphics();
        outerIconManaBar.beginFill(0xffff11);
        outerIconManaBar.drawRect(0, 0, 180.000001, 16);
        outerIconManaBar.endFill();
        iconManaBar.addChild(outerIconManaBar);

        iconManaBar.outer = outerIconManaBar;

        let fullIconManaBar = new PIXI.Graphics();
        fullIconManaBar.beginFill(0xff7700);
        fullIconManaBar.drawRect(0, 0, 192, 16);
        fullIconManaBar.endFill();
        fullIconManaBar.visible = false;
        iconManaBar.addChild(fullIconManaBar);

        heroIconContainer.addChild(heroIcon, innerIconHealthBar, iconHealthBar,
          innerIconManaBar, iconManaBar);
        battleListOfHeroesIcons.push(heroIconContainer);

        attackScreenContainer.addChild(heroIconContainer);
      }

      // let heroesPosition = [];
      // let heroesAmount = 0;
      // let enemiesPosition = [];
      // let enemiesAmount = 0;
      // let numberOfEnemies = 0;
      // let enemiesList = [];
      //
      // let aeloisPosX, amaraPosX, crystalPosX, diuwinPosX, leonaPosX, leryssaPosX,
      //   nadiaPosX, nyxPosX, sinPosX, zalajinPosX, zayaPosX;
      // let enemy1PosX, enemy2PosX, enemy3PosX, enemy4PosX, enemy5PosX, enemy6PosX;

      let frontHeroes = [];
      let heroesAmount = 0;
      let frontEnemies = [];
      let enemiesAmount = 0;

      // function heroMove(hero, endPosX) {
      //   // console.log(`hero: ${hero.x}, ${endPosX}`);
      //   hero.x += hero.vx;
      //   if (hero.x === endPosX) {
      //     hero.vx = 0;
      //   } else if (hero.x > endPosX) {
      //     hero.vx = 0;
      //     hero.x = endPosX;
      //   }
      // }

      function addEnemy(container, enemy, i, speedX, speedY) {
        container.vx = speedX;
        container.vy = speedY;

        enemy.scale.set(1.6);

        enemy.x = 0;
        enemy.y = 0;

        container.x = GAME_WIDTH - enemy.width;

        const enemyHealthBar = new Container();

        let innerEnemyHealthBar = new Sprite(resources[hpBarPath].texture);

        let outerEnemyHealthBar = new PIXI.Graphics();
        outerEnemyHealthBar.beginFill(0xff0000);
        outerEnemyHealthBar.drawRect(0, 0, 192, 16);
        outerEnemyHealthBar.endFill();
        enemyHealthBar.addChild(outerEnemyHealthBar);

        enemyHealthBar.x = enemy.x + 4 + enemy.width / 2 - enemyHealthBar.width / 2;
        innerEnemyHealthBar.x = enemy.x + enemy.width / 2 - enemyHealthBar.width / 2;
        enemyHealthBar.outer = outerEnemyHealthBar;

        if (i % 2 === 0) {
          container.y = 636 - enemy.height / 2; //624
          enemyHealthBar.y = enemy.y - 8 - enemyHealthBar.height;
          innerEnemyHealthBar.y = enemy.y - 12 - enemyHealthBar.height;
          // console.log('enemy:', container.x, container.y);
          container.addChild(enemy, innerEnemyHealthBar, enemyHealthBar);
          frontEnemies.push(container);
        } else if (i % 2 === 1) {
          container.y = 446 - enemy.height / 2; //462
          enemyHealthBar.y = enemy.y - 8 - enemyHealthBar.height;
          innerEnemyHealthBar.y = enemy.y - 12 - enemyHealthBar.height;
          // console.log('enemy:', container.x, container.y);
          container.addChild(enemy, innerEnemyHealthBar, enemyHealthBar);
          attackScreenContainer.addChild(container);
        }

        enemiesAmount++;
      }

      function enemyAutoAttackTimer(enemyObj, enemyName) {
        const enemyAA = 1000 * (Math.round10(attack_delay / (enemyObj.attack_speed + enemyObj.attack_speed_inc * (enemyObj.level - 1)), -2));
        console.log(`${enemyName}: ${enemyAA}`);

        let temp = 0,
          t = 0;
        let calcArmor, calcMagicResist;

        if (heroObject[temp].armor >= 0) {
          calcArmor = 100 / (100 + heroObject[temp].armor);
        } else {
          calcArmor = 2 - (100 - (100 - heroObject[temp].armor));
        }

        if (heroObject[temp].magic_resist >= 0) {
          calcMagicResist = 100 / (100 + heroObject[temp].magic_resist);
        } else {
          calcMagicResist = 2 - (100 - (100 - heroObject[temp].magic_resist));
        }

        let enemyTimerAA = setInterval(() => {
          if (enemyObj.health > 0) {
            if (heroObject[temp].health > 0) {
              let calcAttack;

              if (enemyObj.basic_atk_type === 'physical') {
                calcAttack = Math.round(calcArmor * enemyObj.attack_damage);
                // console.log(calcAttack, enemyObj.name);
              } else if (enemyObj.basic_atk_type === 'magic') {
                calcAttack = Math.round(calcMagicResist * enemyObj.ability_power);
                // console.log(calcAttack, enemyObj.name);
              }

              if (countdown != 0) {
                // console.log(`${enemyName} - ${countdown}, ${heroObject[temp].name} - ${heroObject[temp].health}`);
                let heroHealth = heroObject[temp].health;
                // console.log(battleListOfHeroesIcons[temp].children[4]);
                let healthOneHundred = battleListOfHeroes[temp].children[2].outer.width;
                let healthResult = healthOneHundred - Math.round(healthOneHundred * calcAttack / heroHealth);
                // console.log('healthResult:', healthResult);
                let manaOneHundred = Math.round(battleListOfHeroesIcons[temp].children[4].outer.width);
                let manaResult = Math.round(manaBarWidth * calcAttack / 1000);
                // console.log('manaResult:', manaResult);//, 'manaOneHundred:', manaOneHundred);
                if (healthResult > 0) {
                  if ((manaResult + manaOneHundred) >= manaBarWidth) {
                    battleListOfHeroesIcons[temp].children[4].outer.width = manaBarWidth;
                    battleListOfHeroesIcons[temp].children[4].children[1].visible = true;

                    let heroIcon = battleListOfHeroesIcons[temp].children[0];
                    setInteractive(heroIcon, true);
                  } else {
                    battleListOfHeroes[temp].children[2].outer.width = healthResult;
                    battleListOfHeroesIcons[temp].children[2].outer.width = healthResult;
                    battleListOfHeroesIcons[temp].children[4].outer.width += manaResult;
                    let textManaResult = new Text('+' + manaResult, textStyleManaResult_32center_yellow);
                    let randX = getRandomInt(
                      battleListOfHeroes[temp].position.x + 20,
                      battleListOfHeroes[temp].position.x + battleListOfHeroes[temp].width - 20
                    );
                    let randY = getRandomInt(
                      battleListOfHeroes[temp].position.y + 20,
                      battleListOfHeroes[temp].position.y + battleListOfHeroes[temp].height - 20
                    );
                    textManaResult.position.set(randX, randY);
                    attackScreenContainer.addChild(textManaResult);
                    setTimeout(() => {
                      attackScreenContainer.removeChild(textManaResult);
                    }, 600);
                  }
                } else {
                  battleListOfHeroes[temp].children[2].outer.width = 0;
                  setTimeout(() => {
                    if (selectedHeroesList.length > 0) {
                      selectedHeroesList.splice(0, 1);
                      battleListOfHeroesIcons[temp].children[2].outer.width = 0;
                      battleListOfHeroesIcons[temp].children[4].outer.width = 0;
                      battleListOfHeroesIcons[temp].children[4].children[1].visible = false;
                      setInteractive(battleListOfHeroesIcons[temp].children[0], false);

                      attackScreenContainer.removeChild(battleListOfHeroes[temp]);
                      console.log(`${enemyName} killed ${heroObject[temp].name}!`);

                      if (selectedHeroesList.length === 0) {
                        console.log('All heroes died! You lost!');
                        clearInterval(enemyTimerAA);
                        clearInterval(myTimer);
                        for (let index in battleListOfHeroesIcons) {
                          setInteractive(battleListOfHeroesIcons[index].children[0], false);
                        }
                        setTimeout(() => {
                          setDefeatScreenContainer();
                        }, 2000);
                      }
                    }
                  }, 600);
                }

                let textCalcAttack = new Text('-' + calcAttack, textStyleCalcAttack_32center_white);

                let randX = getRandomInt(
                  battleListOfHeroes[temp].position.x + 20,
                  battleListOfHeroes[temp].position.x + battleListOfHeroes[temp].width - 20
                );

                let randY = getRandomInt(
                  battleListOfHeroes[temp].position.y + 20,
                  battleListOfHeroes[temp].position.y + battleListOfHeroes[temp].height - 20
                );

                textCalcAttack.position.set(randX, randY);
                attackScreenContainer.addChild(textCalcAttack);

                setTimeout(() => {
                  attackScreenContainer.removeChild(textCalcAttack);
                }, 600);

                heroObject[temp].health -= calcAttack;
                console.log(`${countdown}: ${enemyName} attack: ${calcAttack}, ${heroObject[temp].name} health: ${heroObject[temp].health}`);
              }
            } else {
              temp++;
              if (temp === heroObject.length) {
                clearInterval(enemyTimerAA);
                clearInterval(myTimer);
              }
            }
          }
        }, enemyAA);
      }

      for (let index in selectedEnemiesList) {
        // console.log('enemyIndex:', index, selectedEnemiesList[index]);
        switch (selectedEnemiesList[index]) {
          case 'Enemy 1':
            addEnemy(enemy01Container, enemy01, index, 4, 0);
            battleListOfEnemies.push(enemy01Container);
            break;
          case 'Enemy 2':
            addEnemy(enemy02Container, enemy02, index, 4, 0);
            battleListOfEnemies.push(enemy02Container);
            break;
          case 'Enemy 3':
            addEnemy(enemy03Container, enemy03, index, 4, 0);
            battleListOfEnemies.push(enemy03Container);
            break;
          case 'Enemy 4':
            addEnemy(enemy04Container, enemy04, index, 2, 0);
            battleListOfEnemies.push(enemy04Container);
            break;
          case 'Enemy 5':
            addEnemy(enemy05Container, enemy05, index, 4, 0);
            battleListOfEnemies.push(enemy05Container);
            break;
          case 'Enemy 6':
            addEnemy(enemy06Container, enemy06, index, 4, 0);
            battleListOfEnemies.push(enemy06Container);
            break;
        }
      }

      if (enemiesAmount === selectedEnemiesList.length) {
        for (let enemyContainer of frontEnemies) {
          attackScreenContainer.addChild(enemyContainer);
        }
      }

      let leryssaUltSkill, leonaUltSkill;

      function addSelectedHero(container, hero, i, speedX, speedY, heroUltSkillPath) {
        function loadSkills() {
          if (heroUltSkillPath in loader.resources) {
            console.log(`${heroUltSkillPath} - already in stage`);
            // addAttackScreenImages();
          } else {
            loader
              .add([
                heroUltSkillPath
              ]);
          }

          loader
            .once('complete', (loader, resources) => {
              // addAttackScreenImages();
            });
        }

        loadSkills();

        container.vx = speedX / 100;
        container.vy = speedY;

        hero.scale.set(0.8);
        hero.x = 0;
        hero.y = 0;
        container.x = 0;

        const heroHealthBar = new Container();

        let innerHeroHealthBar = new Sprite(resources[hpBarPath].texture);

        let outerHeroHealthBar = new PIXI.Graphics();
        outerHeroHealthBar.beginFill(0x00ff00);
        outerHeroHealthBar.drawRect(0, 0, 192, 16);
        outerHeroHealthBar.endFill();
        heroHealthBar.addChild(outerHeroHealthBar);

        heroHealthBar.x = hero.x + 4 + hero.width / 2 - heroHealthBar.width / 2;
        innerHeroHealthBar.x = hero.x + hero.width / 2 - heroHealthBar.width / 2;
        heroHealthBar.outer = outerHeroHealthBar;

        if (i % 2 === 0) {
          container.y = 636 - hero.height / 2; //624
          heroHealthBar.y = hero.y - 8 - heroHealthBar.height;
          innerHeroHealthBar.y = hero.y - 12 - heroHealthBar.height;
          // console.log('container:', container.x, container.y);
          container.addChild(hero, innerHeroHealthBar, heroHealthBar);
          // Add front heroes (from game's view) to the array and later add them to the scene after all back heroes in scene
          frontHeroes.push(container);
        } else if (i % 2 === 1) {
          container.y = 446 - hero.height / 2; //462
          heroHealthBar.y = hero.y - 8 - heroHealthBar.height;
          innerHeroHealthBar.y = hero.y - 12 - heroHealthBar.height;
          // console.log('container:', container.x, container.y);
          container.addChild(hero, innerHeroHealthBar, heroHealthBar);
          // Add back heroes (from game's view) to the scene
          attackScreenContainer.addChild(container);
        }

        heroesAmount++;
      }

      function heroAutoAttackTimer(heroObj, heroName, i) {
        const heroAA = 1000 * (Math.round10(attack_delay / (heroObj.attack_speed + heroObj.attack_speed_inc * (heroObj.level - 1)), -2));
        console.log(`${heroName}: ${heroAA}`);

        let temp = 0;
        let calcArmor, calcMagicResist;
        let manaBarWidth = 192;

        if (enemyObject[temp].armor >= 0) {
          calcArmor = 100 / (100 + enemyObject[temp].armor);
        } else {
          calcArmor = 2 - (100 - (100 - enemyObject[temp].armor));
        }

        if (enemyObject[temp].magic_resist >= 0) {
          calcMagicResist = 100 / (100 + enemyObject[temp].magic_resist);
        } else {
          calcMagicResist = 2 - (100 - (100 - enemyObject[temp].magic_resist));
        }

        let heroTimerAA = setInterval(() => {
          if (heroObj.health > 0) {
            if (enemyObject[temp].health > 0) {
              let calcAttack;

              if (heroObj.basic_atk_type === 'physical') {
                calcAttack = Math.round(calcArmor * heroObj.attack_damage);
              } else if (heroObj.basic_atk_type === 'magic') {
                calcAttack = Math.round(calcMagicResist * heroObj.ability_power);
              }

              if (countdown != 0) {
                // console.log(`${heroName} - ${countdown}, ${enemyObject[temp].name} - ${enemyObject[temp].health}`);
                let enemyHealth = enemyObject[temp].health;
                let healthOneHundred = battleListOfEnemies[temp].children[2].outer.width;
                let healthResult = healthOneHundred - Math.round(healthOneHundred * calcAttack / enemyHealth);

                if (healthResult > 0) {
                  battleListOfEnemies[temp].children[2].outer.width = healthResult;
                } else {
                  battleListOfEnemies[temp].children[2].outer.width = 0;

                  setTimeout(() => {
                    if (selectedEnemiesList.length > 0) {
                      selectedEnemiesList.splice(0, 1);
                      numberOfEnemiesArray.splice(0, 1);
                      // console.log(battleListOfEnemies[temp]);
                      if (rewards.length > 0) {
                        enemyKilled(
                          Math.round(battleListOfEnemies[temp].x + battleListOfEnemies[temp].width / 2),
                          Math.round(battleListOfEnemies[temp].y + battleListOfEnemies[temp].height),
                          whichHeroDroppedItem, temp, textChestBackground, chests
                        );
                      }

                      attackScreenContainer.removeChild(battleListOfEnemies[temp]);
                      console.log(`${heroName} killed ${enemyObject[temp].name}!`);

                      let mana = battleListOfHeroesIcons[i].children[4].outer.width;
                      let inc_mana = mana + manaBarWidth * heroObj.energy_regen / 1000;
                      battleListOfHeroesIcons[i].children[4].outer.width = Math.round(inc_mana);

                      if (battleListOfHeroesIcons[i].children[4].outer.width >= manaBarWidth) {
                        battleListOfHeroesIcons[i].children[4].outer.width = manaBarWidth;
                        battleListOfHeroesIcons[i].children[4].children[1].visible = true;

                        let heroIcon = battleListOfHeroesIcons[i].children[0];
                        setInteractive(heroIcon, true);
                      }

                      money += enemyObject[temp].money_reward;
                      // console.log('money', money);
                      textMoneyBackground.text = `${money}`;
                      textMoneyBackground.position.set(
                        setMiddlePos(moneyBackground, textMoneyBackground).x,
                        setMiddlePos(moneyBackground, textMoneyBackground).y
                      );

                      if (selectedEnemiesList.length === 0) {
                        clearInterval(heroTimerAA);
                        clearInterval(myTimer);
                        console.log('All enemies died! You won!');
                        setInteractive(pauseIcon, false);
                        for (let index in battleListOfHeroesIcons)
                          setInteractive(battleListOfHeroesIcons[index].children[0], false);

                        if (glyphArray.length > 0) {
                          for (let glyph of glyphArray) {
                            setInteractive(glyph, false);
                            setTimeout(() => {
                              chests = textChestBackground.text;
                              chests++;
                              textChestBackground.text = chests;
                              attackScreenContainer.removeChild(glyph);
                            }, 1000);
                          }
                          setTimeout(() => {
                            setVictoryScreenContainer(money, resultRewards);
                          }, 2000);
                        } else {
                          setTimeout(() => {
                            setVictoryScreenContainer(money, resultRewards);
                          }, 2000);
                        }
                      }
                    }
                  }, 600);
                }

                let textCalcAttack = new Text('-' + calcAttack, textStyleCalcAttack_32center_white);

                let randX = getRandomInt(
                  battleListOfEnemies[temp].position.x + 20,
                  battleListOfEnemies[temp].position.x + battleListOfEnemies[temp].width - 20
                );

                let randY = getRandomInt(
                  battleListOfEnemies[temp].position.y + 20,
                  battleListOfEnemies[temp].position.y + battleListOfEnemies[temp].height - 20
                );

                textCalcAttack.position.set(randX, randY);
                attackScreenContainer.addChild(textCalcAttack);

                setTimeout(() => {
                  attackScreenContainer.removeChild(textCalcAttack);
                }, 600);

                let h = enemyObject[temp].health;
                h -= calcAttack;
                enemyObject[temp].health = h;
                console.log(`${countdown}: ${heroName} attack: ${calcAttack}, ${enemyObject[temp].name} health: ${enemyObject[temp].health}`);
              }
            } else {
              temp++;
              if (temp === enemyObject.length) {
                clearInterval(heroTimerAA);
                clearInterval(myTimer);
                // console.log('You won!');
              }
            }
          }
        }, heroAA);
      }

      for (let index in selectedHeroesList) {
        // console.log('heroIndex:', index, selectedHeroesList[index]);
        switch (selectedHeroesList[index]) {
          case 'Aelois':
            addSelectedHeroIcon(aeloisIconSPath, index);
            addSelectedHero(aeloisContainer, aelois, index, heroObject[index].movement_speed, 0, aeloisUltSkillPath);
            battleListOfHeroes.push(aeloisContainer);
            break;
          case 'Amara':
            addSelectedHeroIcon(amaraIconSPath, index);
            addSelectedHero(amaraContainer, amara, index, heroObject[index].movement_speed, 0, amaraUltSkillPath);
            battleListOfHeroes.push(amaraContainer);
            break;
          case 'Crystal':
            addSelectedHeroIcon(crystalIconSPath, index);
            addSelectedHero(crystalContainer, crystal, index, heroObject[index].movement_speed, 0, crystalUltSkillPath);
            battleListOfHeroes.push(crystalContainer);
            break;
          case 'Diu Win':
            addSelectedHeroIcon(diuwinIconSPath, index);
            addSelectedHero(diuwinContainer, diuwin, index, heroObject[index].movement_speed, 0, diuwinUltSkillPath);
            battleListOfHeroes.push(diuwinContainer);
            break;
          case 'Leona':
            addSelectedHeroIcon(leonaIconSPath, index);
            addSelectedHero(leonaContainer, leona, index, heroObject[index].movement_speed, 0, leonaUltSkillPath);
            battleListOfHeroes.push(leonaContainer);
            break;
          case 'Leryssa':
            addSelectedHeroIcon(leryssaIconSPath, index);
            addSelectedHero(leryssaContainer, leryssa, index, heroObject[index].movement_speed, 0, leryssaUltSkillPath);
            battleListOfHeroes.push(leryssaContainer);
            break;
          case 'Nadia':
            addSelectedHeroIcon(nadiaIconSPath, index);
            addSelectedHero(nadiaContainer, nadia, index, heroObject[index].movement_speed, 0, nadiaUltSkillPath);
            battleListOfHeroes.push(nadiaContainer);
            break;
          case 'Nyx':
            addSelectedHeroIcon(nyxIconSPath, index);
            addSelectedHero(nyxContainer, nyx, index, heroObject[index].movement_speed, 0, nyxUltSkillPath);
            battleListOfHeroes.push(nyxContainer);
            break;
          case 'Sin':
            addSelectedHeroIcon(sinIconSPath, index);
            addSelectedHero(sinContainer, sin, index, heroObject[index].movement_speed, 0, sinUltSkillPath);
            battleListOfHeroes.push(sinContainer);
            break;
          case 'Zalajin':
            addSelectedHeroIcon(zalajinIconSPath, index);
            addSelectedHero(zalajinContainer, zalajin, index, heroObject[index].movement_speed, 0, zalajinUltSkillPath);
            battleListOfHeroes.push(zalajinContainer);
            break;
          case 'Zaya':
            addSelectedHeroIcon(zayaIconSPath, index);
            addSelectedHero(zayaContainer, zaya, index, heroObject[index].movement_speed, 0, zayaUltSkillPath);
            battleListOfHeroes.push(zayaContainer);
            break;
        }
      }

      if (heroesAmount === selectedHeroesList.length) {
        for (let heroContainer of frontHeroes) {
          attackScreenContainer.addChild(heroContainer);
        }
      }

      let countdown = 80;
      let myTimer = null;
      console.log(countdown);

      function startTimer() {
        let myTimer = setInterval(() => {
          countdown--;
          if (countdown === 0) {
            textTimerIcon.text = '00:00';
            // console.log(selectedEnemiesList.length);
            if (selectedEnemiesList.length > 0) {
              console.log('You did not killed all enemies. You lost!');
              // setDefeatScreenContainer();
            }
            console.log(`Battle Finished!`);
            setInteractive(pauseIcon, false);
            for (let index in battleListOfHeroesIcons) {
              setInteractive(battleListOfHeroesIcons[index].children[0], false);
            }
            // console.log(`${battleListOfHeroesIcons}`);
            clearInterval(myTimer);
            setTimeout(() => {
              setDefeatScreenContainer();
            }, 2000);
          } else {
            let minutes = ~~(countdown / 60);
            if (minutes < 10) {
              minutes = '0' + minutes;
            }
            let seconds = countdown % 60;
            if (seconds < 10) {
              seconds = '0' + seconds;
            }
            // console.log(minutes+':'+seconds);
            textTimerIcon.text = minutes + ':' + seconds;
            // console.log(`selectedEnemiesList.length: ${selectedEnemiesList.length}`);
          }
        }, 1000);
      }
      startTimer();

      function chooseHeroUltSkill(index) {
        // console.log(`${heroObject[i].name}`);
        switch (heroObject[index].name) {
          case 'Aelois':
            break;
          case 'Amara':
            break;
          case 'Crystal':
            castLeryssaUltSkill(heroObject[0]);
            break;
          case 'Diu Win':
            castLeryssaUltSkill(heroObject[0]);
            break;
          case 'Leona':
            castLeryssaUltSkill(heroObject[0]);
            break;
          case 'Leryssa':
            castLeryssaUltSkill(heroObject[index]);
            break;
          case 'Nadia':
            break;
          case 'Nyx':
            break;
          case 'Sin':
            castLeryssaUltSkill(heroObject[0]);
            break;
          case 'Zalajin':
            break;
          case 'Zaya':
            break;
        }
      }

      function castLeryssaUltSkill(hero) {
        const cd = 1000 * hero.skills[0].skill_cd;
        // console.log(`cd: ${cd}`);

        const ultSkillContainer = new Container();

        const img = new Sprite(resources[leryssaUltSkillPath].texture);
        img.position.set(1000, 500);

        ultSkillContainer.addChild(img);

        let wave = 0;
        let waveDmg = Math.round(hero.skills[0].flat_dmg + hero.ability_power / 10);

        (function cast() {
          attackScreenContainer.addChild(ultSkillContainer);
          // let waveDmg = Math.round(hero.skills[0].flat_dmg+hero.ability_power/10);

          // wave++;
          setTimeout(() => {
            console.log(`wave: ${wave+1}, dmg: ${waveDmg}`);
            // console.log(`${battleListOfEnemies.length}`);
            // console.log(numberOfEnemiesArray);
            for (let index of numberOfEnemiesArray) {
              // console.log(`index: ${index}, ${enemyObject[index].name}, ${enemyObject[index].health}`);
              // console.log(battleListOfEnemies[index].children[2].outer.width);
              if (enemyObject[index].health > 0) {
                let enemyHealth = enemyObject[index].health;
                let healthOneHundred = battleListOfEnemies[index].children[2].outer.width;
                let healthResult = healthOneHundred - Math.round(healthOneHundred * waveDmg / enemyHealth);

                if (healthResult >= 0) {
                  battleListOfEnemies[index].children[2].outer.width = healthResult;
                } else {
                  battleListOfEnemies[index].children[2].outer.width = 0;
                  setTimeout(() => {
                    if (selectedEnemiesList.length > 0) {
                      let filteredEnemies = selectedEnemiesList.filter(f => f !== enemyObject[index].name);
                      // console.log(filteredEnemies);
                      selectedEnemiesList = filteredEnemies;
                      // console.log(selectedEnemiesList);

                      if (rewards.length > 0) {
                        enemyKilled(
                          Math.round(battleListOfEnemies[index].x + battleListOfEnemies[index].width / 2),
                          Math.round(battleListOfEnemies[index].y + battleListOfEnemies[index].height),
                          whichHeroDroppedItem, index, textChestBackground, chests
                        );
                      }

                      attackScreenContainer.removeChild(battleListOfEnemies[index]);
                      console.log(`${hero.name} killed ${enemyObject[index].name}!`);
                      numberOfEnemiesArray.splice(numberOfEnemiesArray.indexOf(index), 1);

                      let mana = battleListOfHeroesIcons[index].children[4].outer.width;
                      let inc_mana = mana + manaBarWidth * hero.energy_regen / 1000;
                      battleListOfHeroesIcons[index].children[4].outer.width = Math.round(inc_mana);

                      if (battleListOfHeroesIcons[index].children[4].outer.width >= manaBarWidth) {
                        battleListOfHeroesIcons[index].children[4].outer.width = manaBarWidth;
                        battleListOfHeroesIcons[index].children[4].children[1].visible = true;

                        let heroIcon = battleListOfHeroesIcons[index].children[0];
                        setInteractive(heroIcon, true);
                      }

                      money += enemyObject[index].money_reward;
                      // console.log('money E', money);
                      textMoneyBackground.text = `${money}`;
                      textMoneyBackground.position.set(
                        setMiddlePos(moneyBackground, textMoneyBackground).x,
                        setMiddlePos(moneyBackground, textMoneyBackground).y
                      );

                      if (selectedEnemiesList.length === 0) {
                        clearInterval(heroTimerAA);
                        clearInterval(myTimer);
                        console.log('All enemies died! You won!');
                        setInteractive(pauseIcon, false);
                        for (let ind in battleListOfHeroesIcons)
                          setInteractive(battleListOfHeroesIcons[ind].children[0], false);

                        if (glyphArray.length > 0) {
                          for (let glyph of glyphArray) {
                            setInteractive(glyph, false);
                            setTimeout(() => {
                              chests = textChestBackground.text;
                              chests++;
                              textChestBackground.text = chests;
                              attackScreenContainer.removeChild(glyph);
                            }, 1000);
                          }
                          setTimeout(() => {
                            // setVictoryScreenContainer(money, resultRewards);
                          }, 2000);
                        } else {
                          setTimeout(() => {
                            // setVictoryScreenContainer(money, resultRewards);
                          }, 2000);
                        }
                      }
                    }
                  }, 600);
                }

                let textCalcAttack = new Text('-' + waveDmg, textStyleUltSill_36center_orange);

                let randX = getRandomInt(
                  battleListOfEnemies[index].position.x + 20,
                  battleListOfEnemies[index].position.x + battleListOfEnemies[index].width - 20
                );

                let randY = getRandomInt(
                  battleListOfEnemies[index].position.y + 20,
                  battleListOfEnemies[index].position.y + battleListOfEnemies[index].height - 20
                );

                textCalcAttack.position.set(randX, randY);
                attackScreenContainer.addChild(textCalcAttack);

                setTimeout(() => {
                  attackScreenContainer.removeChild(textCalcAttack);
                }, 500);

                let h = enemyObject[index].health;
                h -= waveDmg;
                enemyObject[index].health = h;
                console.log(`${countdown}: ${hero.name} attack: ${waveDmg}, ${enemyObject[index].name} health: ${enemyObject[index].health}`);
              }
            }
            attackScreenContainer.removeChild(ultSkillContainer);
            wave++;
            if (wave === 4) clearTimeout(w);
          }, cd - 500);

          let w = setTimeout(cast, cd);
          // if (wave === 4) clearTimeout(w);
        })();
      }

      let heroHitArr = [];
      for (let hero of selectedHeroList) heroHitArr.push(hero);
      console.log('heroHitArr', heroHitArr);

      let enemyHitArr = [];
      for (let enemy of selectedEnemiesList) enemyHitArr.push(enemy);
      console.log('enemyHitArr', enemyHitArr);

      function heroAttackStarted(heroContainer, hero, index) {
        let heroHit = false;
        // Move the hero inside the battle scene
        heroMove(heroContainer);

        // Check for a collision (distance) between the hero and the enemy
        if (hitTestRectangle(heroContainer, battleListOfEnemies[0], heroObject[index])) {
          heroContainer.vx = 0;
          heroHit = true;
          // heroContainer.x -= 2;
          if (heroHitArr[index] === heroObject[index].name) {
            // console.log(heroObject[index].name, ': Hit!!');
            let filteredHeroes = heroHitArr.filter(f => f !== heroObject[index].name);
            // console.log(filteredHeroes);
            heroHitArr = filteredHeroes;
            // heroHitArr.push(heroObject[index].name);
          }
          // heroAutoAttackTimer(heroObject[index], selectedHeroesList[index], index);
        } else {
          heroHit = false;
        }
      }

      function enemyAttackStarted(enemyContainer, enemy, index) {
        let enemyHit = false;
        // Move the enemy inside the battle scene
        enemyMove(enemyContainer);

        // Check for a collision (distance) between the enemy and the hero
        if (hitTestRectangle(enemyContainer, battleListOfHeroes[0], enemyObject[index])) {
          enemyContainer.vx = 0;
          enemyHit = true;
          // enemyContainer.x -= 2;
          if (enemyHitArr[index] === enemyObject[index].name) {
            // console.log(enemyObject[index].name,': Hit!!');
            let filteredEnemies = enemyHitArr.filter(f => f !== enemyObject[index].name);
            // console.log(filteredEnemies);
            enemyHitArr = filteredEnemies;
            // enemyHitArr.push(enemyObject[index].name);
          }
        } else {
          enemyHit = false;
        }
      }

      function battle() {
        setTimeout(() => {
          for (let index in selectedEnemiesList) {
            switch (selectedEnemiesList[index]) {
              case 'Enemy 1':
                enemyAttackStarted(enemy01Container, enemy01, index);
                break;
              case 'Enemy 2':
                enemyAttackStarted(enemy02Container, enemy02, index);
                break;
              case 'Enemy 3':
                enemyAttackStarted(enemy03Container, enemy03, index);
                // battleListOfEnemies.push(enemy03);
                break;
              case 'Enemy 4':
                enemyAttackStarted(enemy04Container, enemy04, index);
                break;
              case 'Enemy 5':
                enemyAttackStarted(enemy05Container, enemy05, index);
                break;
              case 'Enemy 6':
                enemyAttackStarted(enemy06Container, enemy06, index);
                break;
            }
          }

          for (let index in selectedHeroesList) {
            switch (selectedHeroesList[index]) {
              case 'Aelois':
                break;
              case 'Amara':
                break;
              case 'Crystal':
                heroAttackStarted(crystalContainer, crystal, index);
                break;
              case 'Diu Win':
                heroAttackStarted(diuwinContainer, diuwin, index);
                break;
              case 'Leona':
                heroAttackStarted(leonaContainer, leona, index);
                break;
              case 'Leryssa':
                heroAttackStarted(leryssaContainer, leryssa, index);
                break;
              case 'Nadia':
                break;
              case 'Nyx':
                break;
              case 'Sin':
                heroAttackStarted(sinContainer, sin, index);
                break;
              case 'Zalajin':
                break;
              case 'Zaya':
                break;
            }
          }
        }, 1000);

        if (heroHitArr.length === 0) {
          //            console.log('Playing');
          state = playing;

          for (let index in selectedHeroesList) {
            switch (selectedHeroesList[index]) {
              case 'Aelois':
                break;
              case 'Amara':
                break;
              case 'Crystal':
                heroAutoAttackTimer(heroObject[index], selectedHeroesList[index], index);
                break;
              case 'Diu Win':
                heroAutoAttackTimer(heroObject[index], selectedHeroesList[index], index);
                break;
              case 'Leona':
                heroAutoAttackTimer(heroObject[index], selectedHeroesList[index], index);
                break;
              case 'Leryssa':
                heroAutoAttackTimer(heroObject[index], selectedHeroesList[index], index);
                break;
              case 'Nadia':
                break;
              case 'Nyx':
                break;
              case 'Sin':
                heroAutoAttackTimer(heroObject[index], selectedHeroesList[index], index);
                break;
              case 'Zalajin':
                break;
              case 'Zaya':
                break;
            }
          }

          for (let index in selectedEnemiesList) {
            switch (selectedEnemiesList[index]) {
              case 'Enemy 1':
                enemyAutoAttackTimer(enemyObject[index], selectedEnemiesList[index]);
                break;
              case 'Enemy 2':
                enemyAutoAttackTimer(enemyObject[index], selectedEnemiesList[index]);
                break;
              case 'Enemy 3':
                enemyAutoAttackTimer(enemyObject[index], selectedEnemiesList[index]);
                break;
              case 'Enemy 4':
                enemyAutoAttackTimer(enemyObject[index], selectedEnemiesList[index]);
                break;
              case 'Enemy 5':
                enemyAutoAttackTimer(enemyObject[index], selectedEnemiesList[index]);
                break;
              case 'Enemy 6':
                enemyAutoAttackTimer(enemyObject[index], selectedEnemiesList[index]);
                break;
            }
          }
        }
      }

      state = battle;
    });
  }

  loadAttackScreenImages();
  stage.addChild(attackScreenContainer);
}

let glyphDrops;
let rewards = [];
let resultRewards = [];
let rewardInScreen = false;

function chooseReward(r, possibleRewards) {
  r = 87;
  // console.log(`r: ${r}`);
  // keep count how many enemies did drop item (glyph, elixir, ...)
  if (r < 90) {
    if (r < 80) {
      if (r < 40) glyphDrops = 1;
      else glyphDrops = 2;
    } else glyphDrops = 3;
  } else glyphDrops = 0;

  console.log(`glyphDrops: ${glyphDrops}`);

  // let rewardPaths = [];
  //
  // for (let i in possibleRewards) {
  //   console.log(`possibleRewards: ${possibleRewards}, ${possibleRewards[i]}`);
  //   let id = resources[glyphsPath].textures;
  //   let rew = new Sprite(id[`${possibleRewards[i]}${png}`]);
  //   rewardPaths.push();
  // }

  switch (glyphDrops) {
    case 1:
      rewards.push(possibleRewards[0]);
      break;
    case 2:
      rewards.push(possibleRewards[1]);
      break;
    case 3:
      rewards.push(possibleRewards[0], possibleRewards[1]);
      break;
    default:
      console.log(`Sorry, no item for you. Try again.`);
  }
}

let glyphArray = [];

function enemyKilled(posX, posY, whichHero, t, textChestBackground, chests) {
  // console.log(posX, posY);
  // console.log(whichHero, t);

  function displayReward(i) {
    // console.log(`rewards: ${rewards}`);
    let id = resources[glyphsPath].textures;
    let glyph = new Sprite(id[`${rewards[i]}${png}`]);
    // console.log(`glyph: ${glyph}`);
    glyph.scale.set(0.7);
    glyph.position.set(posX, posY);
    setInteractive(glyph, true);
    // console.log(`chests: ${chests}, ${textChestBackground.text}`);
    glyph.on('click', () => {
      // countRewards(glyph, i, textChestBackground, chests);
      console.log(`glyph ${i} clicked`);
      glyphArray.splice(i, 1);
      chests = textChestBackground.text;
      chests++;
      // console.log(`chests: ${chests}, ${textChestBackground.text}`);
      textChestBackground.text = chests;
      attackScreenContainer.removeChild(glyph);
    });
    glyphArray.push(glyph);
    attackScreenContainer.addChild(glyph);
    rewards.splice(0, 1);
  }

  for (let i of whichHero) {
    if (i == t) {
      displayReward(0);
      // console.log(`displaying reward...`);
    }
  }
}

function setPauseScreenContainer() {
  const pauseScreenContainer = new Container();

  const backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker.position.set(0, 0);

  const exitIcon = new Sprite(resources[exitIconPath].texture);
  exitIcon.position.set(420, GAME_HEIGHT / 2 - exitIcon.height / 2);

  const soundIcon = new Sprite(resources[soundIconPath].texture);
  soundIcon.position.set(720, GAME_HEIGHT / 2 - soundIcon.height / 2);

  const musicIcon = new Sprite(resources[musicIconPath].texture);
  musicIcon.position.set(1020, GAME_HEIGHT / 2 - musicIcon.height / 2);

  const continueIcon = new Sprite(resources[continueIconPath].texture);
  continueIcon.position.set(1320, GAME_HEIGHT / 2 - continueIcon.height / 2);
  setInteractive(continueIcon, true);
  continueIcon.on('click', () => {
    console.log(`continue clicked`);
    setInteractive(continueIcon, false);
    setInteractive(pauseIcon, true);
    stage.removeChild(pauseScreenContainer);
  });

  pauseScreenContainer.addChild(backgroundDarker, exitIcon, soundIcon, musicIcon, continueIcon);
  stage.addChild(pauseScreenContainer);
}

function setVictoryScreenContainer(gold, rr) {
  console.log('Victory screen');
  console.log(rr);

  stage.removeChild(attackScreenContainer);

  const victoryScreenContainer = new Container();

  const backgroundBattleOver = new Sprite(resources[backgroundBattleOverPath].texture);
  backgroundBattleOver.position.set(0, 0);

  const btnStatistics = new Sprite(resources[btnStatisticsPath].texture);
  btnStatistics.position.set(36, 840);

  const btnNext = new Sprite(resources[btnNextPath].texture);
  btnNext.position.set(1704, 840);
  setInteractive(btnNext, true);
  btnNext.on('click', () => {
    console.log(`btnNext clicked`);
    stage.removeChild(victoryScreenContainer);
    setMapContainer();
  });

  const back = new Container();

  const resultLine = new PIXI.Graphics();
  resultLine.beginFill(0x0000ff);
  resultLine.drawRect(510, 362, 920, 80);
  resultLine.endFill();

  const upperLine = new PIXI.Graphics();
  upperLine.beginFill(0x0000ff);
  upperLine.drawRect(300, 464, 1320, 12);
  upperLine.endFill();

  const bottomLine = new PIXI.Graphics();
  bottomLine.beginFill(0x0000ff);
  bottomLine.drawRect(300, 802, 1320, 12);
  bottomLine.endFill();

  const textResult = new Text(`Lv: 00    EXP: +6    -----/-----`, textStyleResult_48left_white);
  textResult.position.set(546, 378);

  const goldIcon = new Sprite(resources[goldIconPath].texture);
  goldIcon.position.set(textResult.x + 672, 370);

  const textMoney = new Text(`${gold}`, textStyleResult_48left_white);
  textMoney.position.set(1312, 378);

  back.addChild(resultLine, textResult, goldIcon, textMoney, upperLine, bottomLine);

  const textVictory = new Text(`VICTORY`, textStyleBattleEnd_80center_yellow);
  textVictory.position.set(GAME_WIDTH / 2 - textVictory.width / 2, 144);

  // TODO: pridat ikony ze select screen ( ty co maji hvezdicky, lvl, ...)

  victoryScreenContainer.addChild(backgroundBattleOver, //btnStatistics,
    btnNext, back, textVictory);

  // function displayReward(index) {
  //   let reward = new Sprite(resources[rr[index]].texture);
  //   reward.position.set(348 + 168 * index, 864);
  //
  //   victoryScreenContainer.addChild(reward);
  // }
  //
  // for (let i in rr) {
  //   displayReward(i);
  // }

  stage.addChild(victoryScreenContainer);
  // setLevelUpScreenContainer();
}

function setDefeatScreenContainer() {
  console.log('Defeat screen');

  stage.removeChild(attackScreenContainer);

  const defeatScreenContainer = new Container();

  const backgroundBattleOver = new Sprite(resources[backgroundBattleOverPath].texture);
  backgroundBattleOver.position.set(0, 0);

  const btnNext = new Sprite(resources[btnNextPath].texture);
  btnNext.position.set(1704, 840);
  setInteractive(btnNext, true);
  btnNext.on('click', () => {
    console.log(`btnNext clicked`);
    stage.removeChild(defeatScreenContainer);
    setMapContainer();
  });

  const back = new Container();

  const upperLine = new PIXI.Graphics();
  upperLine.beginFill(0x0000ff);
  upperLine.drawRect(300, 464, 1320, 12);
  upperLine.endFill();

  const bottomLine = new PIXI.Graphics();
  bottomLine.beginFill(0x0000ff);
  bottomLine.drawRect(300, 802, 1320, 12);
  bottomLine.endFill();

  // const textResult = new Text(`Lv: 00    EXP: +6    -----/-----`, textStyleResult_48left_white);
  // textResult.position.set(546, 378);

  // const goldIcon = new Sprite(resources[goldIconPath].texture);
  // goldIcon.position.set(textResult.x+672, 370);

  // const textMoney = new Text(`${gold}`, textStyleResult_48left_white);
  // textMoney.position.set(1312, 378);

  back.addChild( // textResult, goldIcon, textMoney,
    upperLine, bottomLine);

  const textDefeat = new Text(`DEFEAT`, textStyleBattleEnd_80center_yellow);
  textDefeat.position.set(GAME_WIDTH / 2 - textDefeat.width / 2, 144);

  // pridat ikony ze select screen ( ty co maji hvezdicky, lvl, ...)

  defeatScreenContainer.addChild(backgroundBattleOver, btnNext, back, textDefeat);
  stage.addChild(defeatScreenContainer);
}

function setLevelUpScreenContainer() {
  const levelUpContainer = new Container();

  const backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker.position.set(0, 0);

  function loadImages() {
    if (backgroundLevelUpPath in loader.resources && labelDarkGreyPath in loader.resources &&
      labelLightGreyPath in loader.resources && rigthArrowPath in loader.resources
    ) {
      console.log(`${backgroundLevelUpPath} - already in stage`);
      console.log(`${labelDarkGreyPath} - already in stage`);
      console.log(`${labelLightGreyPath} - already in stage`);
      console.log(`${rigthArrowPath} - already in stage`);
      addImages();
    } else {
      loader
        .add([
          backgroundLevelUpPath, labelDarkGreyPath, labelLightGreyPath, rigthArrowPath
        ]);
    }

    loader
      .once('complete', (loader, resources) => {
        addImages();
      });
  }

  function addImages() {
    const backgroundLevelUp = new Sprite(resources[backgroundLevelUpPath].texture);
    backgroundLevelUp.position.set(GAME_WIDTH / 2 - backgroundLevelUp.width / 2, GAME_HEIGHT / 2 - backgroundLevelUp.height / 2);

    const labelLevel = new Sprite(resources[labelDarkGreyPath].texture);
    labelLevel.position.set(GAME_WIDTH / 2 - labelLevel.width / 2, backgroundLevelUp.y + 100);

    const textLevel = new Text('Level', textStyle_32center_black);
    textLevel.position.set(
      labelLevel.x + 36,
      setMiddlePos(labelLevel, textLevel).y
    );

    const rightArrowLevel = new Sprite(resources[rigthArrowPath].texture);
    rightArrowLevel.position.set(
      setMiddlePos(labelLevel, rightArrowLevel).x + 192,
      setMiddlePos(labelLevel, rightArrowLevel).y
    );

    const labelCurrentStamina = new Sprite(resources[labelLightGreyPath].texture);
    labelCurrentStamina.position.set(GAME_WIDTH / 2 - labelCurrentStamina.width / 2, labelLevel.y + 84);

    const textCurrentStamina = new Text('Current Stamina', textStyle_32center_black);
    textCurrentStamina.position.set(
      labelCurrentStamina.x + 36,
      setMiddlePos(labelCurrentStamina, textCurrentStamina).y
    );

    const rightArrowCurrentStamina = new Sprite(resources[rigthArrowPath].texture);
    rightArrowCurrentStamina.position.set(
      setMiddlePos(labelCurrentStamina, rightArrowCurrentStamina).x + 192,
      setMiddlePos(labelCurrentStamina, rightArrowCurrentStamina).y
    );

    const labelMaxStamina = new Sprite(resources[labelDarkGreyPath].texture);
    labelMaxStamina.position.set(GAME_WIDTH / 2 - labelMaxStamina.width / 2, labelCurrentStamina.y + 84);

    const textMaxStamina = new Text('Max Stamina', textStyle_32center_black);
    textMaxStamina.position.set(
      labelMaxStamina.x + 36,
      setMiddlePos(labelMaxStamina, textMaxStamina).y
    );

    const rightArrowMaxStamina = new Sprite(resources[rigthArrowPath].texture);
    rightArrowMaxStamina.position.set(
      setMiddlePos(labelMaxStamina, rightArrowMaxStamina).x + 192,
      setMiddlePos(labelMaxStamina, rightArrowMaxStamina).y
    );

    const labelMaxHeroLevel = new Sprite(resources[labelLightGreyPath].texture);
    labelMaxHeroLevel.position.set(GAME_WIDTH / 2 - labelMaxHeroLevel.width / 2, labelMaxStamina.y + 84);

    const textMaxHeroLevel = new Text('Max Hero Level', textStyle_32center_black);
    textMaxHeroLevel.position.set(
      labelMaxHeroLevel.x + 36,
      setMiddlePos(labelMaxHeroLevel, textMaxHeroLevel).y
    );

    const rightArrowMaxHeroLevel = new Sprite(resources[rigthArrowPath].texture);
    rightArrowMaxHeroLevel.position.set(
      setMiddlePos(labelMaxHeroLevel, rightArrowMaxHeroLevel).x + 192,
      setMiddlePos(labelMaxHeroLevel, rightArrowMaxHeroLevel).y
    );

    const btnOK = new Sprite(resources[btnGreen260x72Path].texture);
    btnOK.position.set(GAME_WIDTH / 2 - btnOK.width / 2, labelMaxHeroLevel.y + 168);
    setInteractive(btnOK, true);
    btnOK.on('click', () => {
      console.log(`btnOK clicked`);
      stage.removeChild(levelUpContainer);
    });

    const textBtnOK = new Text('OK', textStyle_32center_black);
    textBtnOK.position.set(
      setMiddlePos(btnOK, textBtnOK).x,
      setMiddlePos(btnOK, textBtnOK).y
    );

    // const btnClose = new Sprite(resources[btnClosePath].texture);
    // btnClose.width = btnClose.height = 96;
    // btnClose.position.set(
    //   backgroundLevelUp.x+backgroundLevelUp.width-60,
    //   backgroundLevelUp.y-36
    // );
    // setInteractive(btnClose, true);
    // btnClose.on('click', () => {
    //   console.log(`btnClose clicked`);
    //   stage.removeChild(levelUpContainer);
    // });

    levelUpContainer.addChild(backgroundDarker, backgroundLevelUp, labelLevel,
      labelCurrentStamina, labelMaxStamina, labelMaxHeroLevel, btnOK, textBtnOK, //btnClose,
      textLevel, textCurrentStamina, textMaxStamina, textMaxHeroLevel,
      rightArrowLevel, rightArrowCurrentStamina, rightArrowMaxStamina, rightArrowMaxHeroLevel);

    stage.addChild(levelUpContainer);
  }

  loadImages();
}

function setSummonBooksContainer() {
  for (let item of interMainScreenArray) {
    setInteractive(item, false);
  }

  for (let item of interScrollArray) {
    setInteractive(item, false);
  }

  summonBooksContainer = new Container();

  // Load `backgroundEmptyBlurPath` string path
  function loadBackgroundEmptyBlurImage() {
    if (backgroundEmptyBlurPath in loader.resources) {
      console.log(`${backgroundEmptyBlurPath} - already in stage`);
      addBackgroundEmptyBlurImage();
    } else {
      loader
        .add(backgroundEmptyBlurPath);
    }

    loader
      .once('complete', (loader, resources) => {
        addBackgroundEmptyBlurImage();
      });
  }

  function addBackgroundEmptyBlurImage() {
    const backgroundEmptyBlur = new Sprite(resources[backgroundEmptyBlurPath].texture);
    backgroundEmptyBlur.position.set(0, 0);

    summonBooksContainer.addChild(backgroundEmptyBlur);
  }

  function loadBackgroundBookImage() {
    if (backgroundBookPath in loader.resources) {
      console.log(`${backgroundBookPath} - already in stage`);
      addBackgroundBookImage();
    } else {
      loader
        .add(backgroundBookPath);
    }

    loader
      .once('complete', (loader, resources) => {
        addBackgroundBookImage();
      });
  }

  function addBackgroundBookImage() {
    const backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
    backgroundDarker.position.set(0, 0);

    const backgroundBook = new Sprite(resources[backgroundBookPath].texture);
    backgroundBook.position.set(GAME_WIDTH / 2 - backgroundBook.width / 2, 144);

    btnBack = new Sprite(resources[btnBackPath].texture);
    btnBack.position.set(36, 36);
    setInteractive(btnBack, true);
    interSummonArray.push(btnBack);
    btnBack.on('click', () => {
      setTimeout(() => {
        backIconClicked(btnBack, summonBooksContainer);
      }, LATENCY / 2);
    });

    summonBooksContainer.addChild(backgroundDarker, backgroundBook, btnBack);

    let bannerArena = new Sprite(resources[banner620x98Path].texture);
    bannerArena.position.set(304, 180);

    let textBannerArena = new Text('Book of Magic', textStyleLevel_40center_white);
    textBannerArena.position.set(
      setMiddlePos(bannerArena, textBannerArena).x,
      setMiddlePos(bannerArena, textBannerArena).y - 8 //200
    );

    let bannerGBoM_sbc = new Sprite(resources[banner620x98Path].texture);
    bannerGBoM_sbc.position.set(986, 180);

    let textBannerGBoM_sbc = new Text('Grand Book of Magic', textStyleLevel_40center_white);
    textBannerGBoM_sbc.position.set(
      setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).x,
      setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).y - 8 //200
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
    btnSummonx1BoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
    btnSummonx1BoM_sbc.position.set(341, 814);

    let textBtnSummonx1BoM_sbc = new Text('Summon x1', textStyle_32center_black);
    textBtnSummonx1BoM_sbc.position.set(
      setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).x,
      setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).y
    );

    let lblGoldAboveBtnSummonx1BoM_sbc = new Sprite(resources[lblSummonPath].texture);
    lblGoldAboveBtnSummonx1BoM_sbc.position.set(353, 761);

    let leftGoldIcon = new Sprite(resources[goldIconPath].texture);
    leftGoldIcon.position.set(341, 758);
    leftGoldIcon.width = 48;
    leftGoldIcon.height = 48;

    let textLblGoldAboveBtnSummonx1BoM_sbc = new Text('Free', textStyle_32center_black); // Free or 10000
    textLblGoldAboveBtnSummonx1BoM_sbc.position.set(
      setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).y + 2
    );

    let textAboveLblGoldAboveBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black);
    textAboveLblGoldAboveBtnSummonx1BoM_sbc.position.set(
      setMiddlePos(btnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc).x,
      720,
    );

    // Book of Magic Summon x10
    let btnSummonx10BoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
    btnSummonx10BoM_sbc.position.set(637, 814);

    let textBtnSummonx10BoM_sbc = new Text('Summon x10', textStyle_32center_black);
    textBtnSummonx10BoM_sbc.position.set(
      setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).x,
      setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).y
    );

    let lblGoldAboveBtnSummonx10BoM_sbc = new Sprite(resources[lblSummonPath].texture);
    lblGoldAboveBtnSummonx10BoM_sbc.position.set(649, 761);

    let rightGoldIcon = new Sprite(resources[goldIconPath].texture);
    rightGoldIcon.position.set(637, 758);
    rightGoldIcon.width = 48;
    rightGoldIcon.height = 48;

    let textLblGoldAboveBtnSummonx10BoM_sbc = new Text('90000', textStyle_32center_black);
    textLblGoldAboveBtnSummonx10BoM_sbc.position.set(
      setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).y + 2
    );

    let textLblGold10pOffBoM_sbc = new Text('10% OFF', textStyle10pOff_20right_red);
    textLblGold10pOffBoM_sbc.position.set(
      lblGoldAboveBtnSummonx10BoM_sbc.x + lblGoldAboveBtnSummonx10BoM_sbc.width - textLblGold10pOffBoM_sbc.width - 4,
      setMiddlePos(textLblGoldAboveBtnSummonx10BoM_sbc, textLblGold10pOffBoM_sbc).y
    );

    // Grand Book of magic Summon x1
    btnSummonx1GBoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
    btnSummonx1GBoM_sbc.position.set(1017, 814);

    let textBtnSummonx1GBoM_sbc = new Text('Summon x1', textStyle_32center_black);
    textBtnSummonx1GBoM_sbc.position.set(
      setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).x,
      setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).y
    );

    let lblGoldAboveBtnSummonx1GBoM_sbc = new Sprite(resources[lblSummonPath].texture);
    lblGoldAboveBtnSummonx1GBoM_sbc.position.set(1029, 761);

    let leftDiamondIcon = new Sprite(resources[diamondIconPath].texture);
    leftDiamondIcon.position.set(1017, 758);
    leftDiamondIcon.width = 48;
    leftDiamondIcon.height = 48;

    let textLblGoldAboveBtnSummonx1GBoM_sbc = new Text('Free', textStyle_32center_black); // Free or 288
    textLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
      setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).y + 2
    );

    let textAboveLblGoldAboveBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black);
    textAboveLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
      setMiddlePos(btnSummonx1GBoM_sbc, textAboveLblGoldAboveBtnSummonx1GBoM_sbc).x,
      720,
    );

    // Grand Book of magic Summon x10
    let btnSummonx10GBoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
    btnSummonx10GBoM_sbc.position.set(1313, 814);

    let textBtnSummonx10GBoM_sbc = new Text('Summon x10', textStyle_32center_black);
    textBtnSummonx10GBoM_sbc.position.set(
      setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).x,
      setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).y
    );

    let lblGoldAboveBtnSummonx10GBoM_sbc = new Sprite(resources[lblSummonPath].texture);
    lblGoldAboveBtnSummonx10GBoM_sbc.position.set(1325, 761);

    let rightDiamondIcon = new Sprite(resources[diamondIconPath].texture);
    rightDiamondIcon.position.set(1313, 758);
    rightDiamondIcon.width = 48;
    rightDiamondIcon.height = 48;

    let textLblGoldAboveBtnSummonx10GBoM_sbc = new Text('2590', textStyle_32center_black);
    textLblGoldAboveBtnSummonx10GBoM_sbc.position.set(
      setMiddlePos(btnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).x,
      setMiddlePos(lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).y + 2
    );

    let textLblGold10pOffGBoM_sbc = new Text('10% OFF', textStyle10pOff_20right_red);
    textLblGold10pOffGBoM_sbc.position.set(
      lblGoldAboveBtnSummonx10GBoM_sbc.x + lblGoldAboveBtnSummonx10GBoM_sbc.width - textLblGold10pOffGBoM_sbc.width - 4,
      setMiddlePos(textLblGoldAboveBtnSummonx10GBoM_sbc, textLblGold10pOffGBoM_sbc).y
    );

    summonBooksContainer.addChild(
      // backgroundEmpty_sbc, backgroundDarker_sbc, backgroundBook_sbc,
      bannerArena, textBannerArena, backgroundBoM_sbc, boM_sbc,
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

    setInteractive(btnSummonx1BoM_sbc, true);
    interSummonArray.push(btnSummonx1BoM_sbc);
    btnSummonx1BoM_sbc.on('pointerup', () => {
      console.log('btnSummonx1BoM_sbc clicked');
      //      socket.emit('summonx1BoM', 'summonx1BoMClicked');
      setSummonContainer(1);
    });

    setInteractive(btnSummonx1GBoM_sbc, true);
    interSummonArray.push(btnSummonx1GBoM_sbc);
    btnSummonx1GBoM_sbc.on('pointerup', () => {
      console.log('btnSummonx1GBoM_sbc clicked');
      //      socket.emit('summonx1GBoM', 'summonx1GBoMClicked');
      setSummonContainer(2);
    });
  }

  loadBackgroundEmptyBlurImage();
  loadBackgroundBookImage();

  stage.addChild(summonBooksContainer);
}

const b_rewards = ['ability_power_icon', 'armor_icon', 'armor_pen_icon', 'attack_damage_icon',
  'attack_force_icon', 'crit_strike_icon', 'double_attack_icon', 'energy_regen_icon',
  'hardiness_icon', 'health_icon', 'health_regen_icon', 'magic_force_icon',
  'magic_pen_icon', 'magic_resist_icon', 'regenerate_icon'
];

const gb_rewards = ['aggression_icon', 'avarice_icon', 'balance_icon', 'bloodthirst_icon', 'bravery_icon',
  'cardio_icon', 'defense_icon', 'divine_power_icon', 'enforcement_icon', 'extra_health_icon',
  'fortitude_icon', 'chivalry_icon', 'illusion_icon', 'immortality_icon', 'infinity_icon',
  'magic_shield_icon', 'meditation_icon', 'nature_icon', 'osmosis_icon', 'providence_icon',
  'prowess_icon', 'sublimity_icon', 'valor_icon'
];

let interSummonArray = [];

//
function setSummonContainer(num) {
  //    console.log(`${b_rewards[getRandomInt(0, b_rewards.length-1)]}.png`);
  let summonReward;

  if (num === 1) {
    summonReward = b_rewards[getRandomInt(0, b_rewards.length - 1)];
    setTimeout(() => {
      socket.emit('saveItem', summonReward);
      // console.log(summonReward);
    }, 100);
  } else if (num === 2) {
    summonReward = gb_rewards[getRandomInt(0, gb_rewards.length - 1)];
    setTimeout(() => {
      socket.emit('saveItem', summonReward);
      // console.log(summonReward);
    }, 100);
  }

  function addGlyphIcon(reward) {
    let id = resources[glyphsPath].textures;
    let glyph = new Sprite(id[`${reward}${png}`]);

    //        glyph.width = glyph.height = 48;
    glyph.position.set(
      GAME_WIDTH / 2 - glyph.width / 2,
      GAME_HEIGHT / 2 - glyph.height / 2 - 48
    );

    setTimeout(() => {
      summonContainer.addChild(glyph);
    }, 1000);
  }

  const summonContainer = new Container();

  for (let item of interSummonArray) {
    setInteractive(item, false);
  }

  // setInteractive(btnSummonx1BoM_sbc, false);
  // setInteractive(btnSummonx1GBoM_sbc, false);
  // setInteractive(btnBack, false);

  let backgroundEmpty_suc = new Sprite(resources[backgroundEmptyPath].texture);
  backgroundEmpty_suc.position.set(0, 0);

  let backgroundDarker_suc = new Sprite(resources[backgroundDarkerPath].texture);
  backgroundDarker_suc.position.set(0, 0);

  let summoningBook_suc = new Sprite(resources[summoningBookPath].texture);
  summoningBook_suc.position.set(GAME_WIDTH / 2 - summoningBook_suc.width / 2, -56);

  let banner_suc = new Sprite(resources[banner620x98Path].texture);
  banner_suc.position.set(GAME_WIDTH / 2 - banner_suc.width / 2, 48);

  let textBanner_suc = new Text('Summoning Book', textStyleLevel_40center_white);
  textBanner_suc.position.set(
    setMiddlePos(banner_suc, textBanner_suc).x,
    setMiddlePos(banner_suc, textBanner_suc).y - 8
  );

  let btn10More_suc = new Sprite(resources[btnGreen260x72Path].texture);
  btn10More_suc.position.set(620, 960);

  let textBtn10More_suc = new Text('10 more', textStyle_32center_black);
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
  goldIcon10More.position.set(272, lblLeft_suc.y - 13);

  let diamondIcon10More = new Sprite(resources[diamondIconPath].texture);

  let textLblLeft_suc = new Text('90000 / 2590', textStyle_32center_black);
  textLblLeft_suc.position.set(
    setMiddlePos(lblLeft_suc, textLblLeft_suc).x,
    setMiddlePos(lblLeft_suc, textLblLeft_suc).y
  );

  let btn1More_suc = new Sprite(resources[btnGreen260x72Path].texture);
  btn1More_suc.position.set(1376, 960);
  setInteractive(btn1More_suc, true);
  btn1More_suc.on('pointerup', () => {
    //      console.log('btnSummonx1BoM_sbc clicked');
    stage.removeChild(summonContainer);
    setSummonContainer(num);
  });

  let textBtn1More_suc = new Text('1 more', textStyle_32center_black);
  textBtn1More_suc.position.set(
    setMiddlePos(btn1More_suc, textBtn1More_suc).x,
    setMiddlePos(btn1More_suc, textBtn1More_suc).y
  );

  let lblRight_suc = new Sprite(resources[lblSummonPath].texture);
  lblRight_suc.position.set(
    1040,
    setMiddlePos(btn1More_suc, lblRight_suc).y
  );

  let goldIcon1More = new Sprite(resources[goldIconPath].texture);
  goldIcon1More.position.set(1028, lblRight_suc.y - 13);

  let diamondIcon1More = new Sprite(resources[diamondIconPath].texture);

  let textLblRight_suc = new Text('1000 / 288', textStyle_32center_black);
  textLblRight_suc.position.set(
    setMiddlePos(lblRight_suc, textLblRight_suc).x,
    setMiddlePos(lblRight_suc, textLblRight_suc).y
  );

  let btnBackInSummon = new Sprite(resources[btnBackPath].texture);
  btnBackInSummon.position.set(36, 36);
  setInteractive(btnBackInSummon, true);
  // interBtnBackStartArray.push(btnBackInSummon);
  btnBackInSummon.on('click', () => {
    setTimeout(() => {
      backIconInSummon(summonContainer);
    }, LATENCY / 2);
  });

  summonContainer.addChild(
    backgroundEmpty_suc, backgroundDarker_suc, btnBackInSummon,
    summoningBook_suc, banner_suc, textBanner_suc,
    lblLeft_suc, textLblLeft_suc, goldIcon10More,
    btn10More_suc, textBtn10More_suc,
    lblRight_suc, textLblRight_suc, goldIcon1More,
    btn1More_suc, textBtn1More_suc
  );

  addGlyphIcon(summonReward);

  stage.addChild(summonContainer);
}

//
function setInventoryContainer() {
  const inventoryContainer = new Container();

  for (let item of interMainScreenArray) {
    setInteractive(item, false);
  }

  for (let item of interScrollArray) {
    setInteractive(item, false);
  }

  // socket.emit('getInventory');
  // socket.on('getInventoryData', data => {
  //   console.log('getInventoryData', data);
  //
  //   let inventory = data.inventory;
  //
  //   // for (let item of inventory) addItem(item, inventory.indexOf(item));
  //
  //   socket.off('getInventoryData');
  // });

  // Load `backgroundEmptyBlurPath` string path
  function loadBackgroundEmptyBlurImage() {
    if (backgroundEmptyBlurPath in loader.resources) {
      console.log(`${backgroundEmptyBlurPath} - already in stage`);
      addBackgroundEmptyBlurImage();
    } else {
      loader
        .add(backgroundEmptyBlurPath);
    }
    loader
      .once('complete', (loader, resources) => {
        addBackgroundEmptyBlurImage();
      });
  }

  function addBackgroundEmptyBlurImage() {
    const backgroundEmptyBlur = new Sprite(resources[backgroundEmptyBlurPath].texture);
    backgroundEmptyBlur.position.set(0, 0);

    inventoryContainer.addChild(backgroundEmptyBlur);

    function loadBackgroundBookImage() {
      if (backgroundBookPath in loader.resources) {
        console.log(`${backgroundBookPath} - already in stage`);
        addBackgroundBookImage();
      } else {
        loader
          .add(backgroundBookPath);
      }
      loader
        .once('complete', (loader, resources) => {
          addBackgroundBookImage();
        });
    }

    function addBackgroundBookImage() {

      //        addDarkerBackground(heroesContainer);
      const backgroundDarker = new Sprite(resources[backgroundDarkerPath].texture);
      backgroundDarker.position.set(0, 0);

      const backgroundBook = new Sprite(resources[backgroundBookPath].texture);
      backgroundBook.position.set(GAME_WIDTH / 2 - backgroundBook.width / 2, 144);

      btnBack = new Sprite(resources[btnBackPath].texture);
      btnBack.position.set(36, 36);
      setInteractive(btnBack, true);
      btnBack.on('click', () => {
        console.log('btnBack clicked');
        setTimeout(() => {
          backIconClicked(btnBack, inventoryContainer);
        }, LATENCY / 2);
      });

      inventoryContainer.addChild(backgroundDarker, backgroundBook, btnBack);

      // let inventoryItemContainer = new Container();
      // inventoryItemContainer.x = 1030;
      // inventoryItemContainer.y = 200;
      // inventoryItemContainer.interactive = true;

      function addItem(item, index) {
        let t = ~~(index / 4);
        let z = index % 4;
        // console.log(index, t, z);

        let id = resources[glyphsPath].textures;
        let glyph = new Sprite(id[`${item}${png}`]);

        let x = 1030 + (glyph.width + 12) * z;
        let y = 200 + (glyph.height + 12) * t;

        glyph.position.set(x, y);

        setTimeout(() => {
          inventoryContainer.addChild(glyph);
        }, 100);
      }

      socket.emit('getInventory');
      socket.on('getInventoryData', data => {
        console.log('getInventoryData', data);

        let inventory = data.inventory;

        for (let i = 0; i < inventory.length; i++) addItem(inventory[i], i);

        socket.off('getInventoryData');
      });

      // inventoryContainer.addChild(inventoryItemContainer);
      //
      // // Create mask rectangle
      // const myMask = new Sprite(resources[statsBottomBackgroundPath].texture);
      // myMask.position.set(1030, 200);
      //
      // inventoryContainer.addChild(myMask);
      //
      // inventoryItemContainer.mask = myMask;
      //
      // // Methods for dragging 'statsBottomBackgroundContainer'
      // inventoryItemContainer
      //   .on('pointerdown', onDragStart)
      //   .on('pointerup', onDragEnd)
      //   .on('pointermove', onDragMoveY)
      //   .on('pointerupoutside', onDragOutside);

    }

    loadBackgroundBookImage();
  }

  loadBackgroundEmptyBlurImage();

  stage.addChild(inventoryContainer);
}

function heroMove(heroContainer) {
  // console.log(`hero: ${hero.x}, ${endPosX}`);
  // console.log('heroContainer:', heroContainer);
  // hero.x += hero.vx;
  heroContainer.x += heroContainer.vx;
  contain(heroContainer, {
    x: -12 - heroContainer.width,
    y: 0,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  });

  // hero.position.set(
  // -12-hero.width,
  // heroesBattleCoorArray[i][1]-hero.height/2
  // );

  // if (hero.x > endPosX) {
  // hero.vx = 0;
  // hero.x = endPosX;
  // heroAttack(heroObject[index], index);
  // }
}

function enemyMove(enemyContainer) {
  // console.log(`enemy: ${enemy.x}, ${endPosX}`);
  // console.log('enemyContainer.x:', enemyContainer.x);
  // console.log('enemy.x:', enemyContainer[0].children[0].x);
  enemyContainer.x -= enemyContainer.vx;
  contain(enemyContainer, {
    x: 0,
    y: 0,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  });

  // // enemy.y -= enemy.vy;
  // if (enemy.x === endPosX) {
  //   enemy.vx = 0;
  // } else if (enemy.x < endPosX) {
  //   enemy.vx = 0;
  //   enemy.x = endPosX;
  // }
  // // if (enemy.y === endPosY) {
  // //   enemy.vy = 0;
  // // }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function hitTestRectangle(r1, r2, obj) {
  // Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  // hit will determine whether there's a collision
  hit = false;

  // Find the center points of each sprite
  r1.centerX = Math.abs(r1.x) + r1.width / 2;
  r1.centerY = Math.abs(r1.y) + r1.height / 2;
  r2.centerX = Math.abs(r2.x) + r2.width / 2;
  r2.centerY = Math.abs(r2.y) + r2.height / 2;

  // Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  // Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  // Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth + obj.attack_range;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  // Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    // A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      // There's definitely a collision happening
      hit = true;
      // console.log(combinedHalfWidths, combinedHalfHeights);
    } else {
      // There's no collision on the y axis
      hit = false;
    }
  } else {
    // There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}

// ----------------------------------------------------------
//
function contain(sprite, container) {
  let collision = undefined;

  // Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  // Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  // Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  // Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  // Return the `collision` value
  return collision;
}

// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();



//----- DRAGGING -----//

let mouseYPos = 0;
let delta = 0;
let minDrag = 0;
let maxDrag = 0;

// Dragging functions
function onDragStart(event) {
  this.data = event.data;
  this.dragging = true;
  mouseYPos = event.data.getLocalPosition(stage).y;
  delta = mouseYPos - this.y;
  minDrag = this.y;
  maxDrag = this.parent.height;
}

function onDragEnd() {
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMoveY() {
  if (this.dragging) {
    this.y = this.data.getLocalPosition(this.parent).y - delta;
  }
}

function onDragOutside() {
  if (this.dragging) {
    this.y = this.data.getLocalPosition(this.parent).y - delta;
    if (this.y + delta <= 412) {
      this.dragging = false;
      this.y = maxDrag - this.height - 36;
      this.data = null;
    }
    if (this.y + delta >= 676) { //876
      this.dragging = false;
      this.y = 412;
      this.data = null;
    }
  }
}

function dragMapStart(event) {
  this.data = event.data;
  this.dragging = true;
  mouseYPos = event.data.getLocalPosition(stage).x;
  delta = mouseYPos - this.x;
}

function dragMapEnd() {
  this.dragging = false;
  this.data = null;
}

function dragMapMove() {
  if (this.dragging) {
    this.x = this.data.getLocalPosition(stage).x - delta;
    if (this.x + this.width <= GAME_WIDTH / 8) {
      this.dragging = false;
      this.x = 0 - this.width + GAME_WIDTH - 96; //((GAME_WIDTH-48)-this.width-48);
      this.data = null;
    }
    if (this.x >= 7 * GAME_WIDTH / 8) {
      this.dragging = false;
      this.x = 0;
      this.data = null;
    }
  }
}