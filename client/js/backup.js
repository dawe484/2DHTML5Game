
//





// function setHeroesContainer() {
//   heroesContainer = new Container();
//
//   socket.emit('heroesContainer', 'setHeroesContainer');
//
//   // setBookBackground(heroesContainer);
//   // setBarContainer(heroesContainer);
//   // setScrollArrowHeroes(heroesContainer);
//
//   // setInteractive(avatarContainer, false);
//   // setInteractive(btnSummonBooks, false);
//   // setInteractive(btnHeroes, false);
//   // setInteractive(battleContainer, false);
//   // setInteractive(btnMap, false);
//
//   // addBookmark(heroesContainer, 456, 944, allIconPath);
//   // addBookmark(heroesContainer, 576, 944, tankIconPath);
//   // addBookmark(heroesContainer, 696, 944, fighterIconPath);
//   // addBookmark(heroesContainer, 1140, 944, marksmanIconPath);
//   // addBookmark(heroesContainer, 1260, 944, mageIconPath);
//   // addBookmark(heroesContainer, 1380, 944, supportIconPath);
//   //
//   // setHeroesPortraitContainer();
//   //
//   // addArrows(heroesContainer);
//   //
//   // addBackIconHeroes(heroesContainer);
//
//   // stage.addChild(heroesContainer);
//   // console.log('heroes:\n', stage.children);
// }



// // Setup
// function setScrollArrowHeroes(container) {
//
//   let scrollBtn192x72 = new Sprite(resources[scrollBtn192x72Path].texture);
//   scrollBtn192x72.position.set(1716, 12);
//
//   scrollArrow72x36 = new Sprite(resources[scrollArrow72x36Path].texture);
//   scrollArrow72x36.position.set(1812, 48);
//   scrollArrow72x36.anchor.set(0.5);
//   scrollArrow72x36.scale.y = -1;
//
//   // Scrool interaction
//   scrollArrow72x36.interactive = true;
//   scrollArrow72x36.buttonMode = true;
//   scrollArrow72x36.on('click', (event) => {
//     scrollArrow72x36.scale.y *= -1;
//     if (scrollArrow72x36.scale.y == -1) {
//       // console.log(stage.children[0].children[stage.children[0].children.length-1]);
//       let i = stage.children.length-1;
//       console.log(i);
//       container.removeChild(stage.children[i].children[stage.children[i].children.length-1]);
//       // console.log(stage.children);
//     } else {
//       // if (stage)
//       // console.log(stage.children.length);
//       // loadScrollData(container);
//       // setScrollContainer(container);
//       // console.log('children:\n', stage.children[1].children);
//       // console.log('children.children:\n', stage.children[0].children);
//     }
//   });
//   container.addChild(scrollBtn192x72, scrollArrow72x36);
// }
//


// //
// function addBackIconHeroes(container) {
//   let backIcon = new Sprite(resources[btnBackPath].texture);
//   backIcon.position.set(36, 36);
//
//   setInteractive(backIcon, true);
//
//   container.addChild(backIcon);
//
//   backIcon.on('click', (event) => {
//     setInteractive(backIcon, false);
//     console.log('backIconHeroes clicked');
//     // console.log('before remove', container.children);
//     stage.removeChild(container);
//     scrollArrow72x36_mc.scale.y = -1;
//     mainScreenContainer.addChild(scrollBtn192x72_mc, scrollArrow72x36_mc);
//     // console.log(stage.children);
//     // console.log(stage.children.length);
//     // if (stage.children.length === 1) {
//     //   setTimeout(() => {
//     //     setInteractive(avatarContainer, true);
//     //     // setInteractive(btnSummonBooks, true);
//     //     // setInteractive(btnMap, true);
//     //   }, LATENCY);
//     // }
//   });
// }


// // Setup tutorialContainer
// function setTutorialContainer() {
//
//   tutorialContainer = new Container();
//
//   let backgroundDarker_tc = new Sprite(resources[backgroundDarkerPath].texture);
//   backgroundDarker_tc.position.set(0, 0);
//
//   handIcon_tc = new Sprite(resources[handIconPath].texture);
//   handIcon_tc.position.set(
//     btnSummonBooks.x+btnSummonBooks.width/4*3,
//     btnSummonBooks.y+btnSummonBooks.height/4*3
//   );
//   handIcon_tc.scale.set(2);
//
//   bubble_tc = new Sprite(resources[bubblePath].texture);
//   bubble_tc.position.set(60, 744);
//
//   textBubble_tc = new Text("Text", textStyleBubble_52left_white);
//   textBubble_tc.position.set(
//     176,
//     setMiddlePos(bubble_tc, textBubble_tc).y
//   );
//
//   tutorialContainer.addChild(backgroundDarker_tc); // !!!!!! this uncomment after change name screen implemented
// }


// // Setup summonBooksContainer (screen that will show after player click on 'Summon Books' icon)
// function setSummonBooksContainer() {
//   summonBooksContainer = new Container();
//
//   // setInteractive(avatarContainer, false);
//   // setInteractive(btnSummonBooks, false);
//   // setInteractive(scrollArrow72x36_mc, false);
//   // setInteractive(btnMap, false);
//
//   // let backgroundEmpty_sbc = new Sprite(resources[backgroundEmptyPath].texture);
//   // backgroundEmpty_sbc.position.set(0, 0);
//   //
//   // let backgroundDarker_sbc = new Sprite(resources[backgroundDarkerPath].texture);
//   // backgroundDarker_sbc.position.set(0, 0);
//   //
//   // let backgroundBook_sbc = new Sprite(resources[backgroundBookPath].texture);
//   // backgroundBook_sbc.position.set(
//   //   GAME_WIDTH/2-backgroundBook_sbc.width/2,
//   //   144
//   // );
//   setBookBackground(summonBooksContainer);
//
//   let bannerBoM_sbc = new Sprite(resources[banner620x98Path].texture);
//   bannerBoM_sbc.position.set(304, 180);
//
//   let textBannerBoM_sbc = new Text('', textStyleLevel_40center_white);
//
//   let bannerGBoM_sbc = new Sprite(resources[banner620x98Path].texture);
//   bannerGBoM_sbc.position.set(986, 180);
//
//   let textBannerGBoM_sbc = new Text('', textStyleLevel_40center_white);
//
//   let backgroundBoM_sbc = new Sprite(resources[summonBooksBackgroundPath].texture);
//   backgroundBoM_sbc.position.set(329, 290);
//
//   let boM_sbc = new Sprite(resources[bookOfMagicPath].texture);
//   boM_sbc.position.set(
//     setMiddlePos(backgroundBoM_sbc, boM_sbc).x,
//     setMiddlePos(backgroundBoM_sbc, boM_sbc).y
//   );
//
//   let backgroundGBoM_sbc = new Sprite(resources[summonBooksBackgroundPath].texture);
//   backgroundGBoM_sbc.position.set(1005, 290);
//
//   let gBoM_sbc = new Sprite(resources[grandBookOfMagicPath].texture);
//   gBoM_sbc.position.set(
//     setMiddlePos(backgroundGBoM_sbc, gBoM_sbc).x,
//     setMiddlePos(backgroundGBoM_sbc, gBoM_sbc).y
//   );
//
//   // Book of Magic Summon x1
//   btnSummonx1BoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
//   btnSummonx1BoM_sbc.position.set(341, 814);
//
//   let textBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black);
//
//   let lblGoldAboveBtnSummonx1BoM_sbc = new Sprite(resources[lblSummonPath].texture);
//   lblGoldAboveBtnSummonx1BoM_sbc.position.set(353, 761);
//
//   let leftGoldIcon = new Sprite(resources[goldIconPath].texture);
//   leftGoldIcon.position.set(341, 758);
//   leftGoldIcon.width = 48;
//   leftGoldIcon.height = 48;
//
//   let textLblGoldAboveBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black); // Free or 10000
//
//   let textAboveLblGoldAboveBtnSummonx1BoM_sbc = new Text('', textStyle_32center_black);
//
//   // Book of Magic Summon x10
//   let btnSummonx10BoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
//   btnSummonx10BoM_sbc.position.set(637, 814);
//
//   let textBtnSummonx10BoM_sbc = new Text('', textStyle_32center_black);
//
//   let lblGoldAboveBtnSummonx10BoM_sbc = new Sprite(resources[lblSummonPath].texture);
//   lblGoldAboveBtnSummonx10BoM_sbc.position.set(649, 761);
//
//   let rightGoldIcon = new Sprite(resources[goldIconPath].texture);
//   rightGoldIcon.position.set(637, 758);
//   rightGoldIcon.width = 48;
//   rightGoldIcon.height = 48;
//
//   let textLblGoldAboveBtnSummonx10BoM_sbc = new Text('', textStyle_32center_black);
//
//   let textLblGold10pOffBoM_sbc = new Text('', textStyle10pOff_20right_red);
//
//   // Grand Book of magic Summon x1
//   btnSummonx1GBoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
//   btnSummonx1GBoM_sbc.position.set(1017, 814);
//
//   let textBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black);
//
//   let lblGoldAboveBtnSummonx1GBoM_sbc = new Sprite(resources[lblSummonPath].texture);
//   lblGoldAboveBtnSummonx1GBoM_sbc.position.set(1029, 761);
//
//   let leftDiamondIcon = new Sprite(resources[diamondIconPath].texture);
//   leftDiamondIcon.position.set(1017, 758);
//   leftDiamondIcon.width = 48;
//   leftDiamondIcon.height = 48;
//
//   let textLblGoldAboveBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black); // Free or 288
//
//   let textAboveLblGoldAboveBtnSummonx1GBoM_sbc = new Text('', textStyle_32center_black);
//
//   // Grand Book of magic Summon x10
//   let btnSummonx10GBoM_sbc = new Sprite(resources[btnGreen260x72Path].texture);
//   btnSummonx10GBoM_sbc.position.set(1313, 814);
//
//   let textBtnSummonx10GBoM_sbc = new Text('', textStyle_32center_black);
//
//   let lblGoldAboveBtnSummonx10GBoM_sbc = new Sprite(resources[lblSummonPath].texture);
//   lblGoldAboveBtnSummonx10GBoM_sbc.position.set(1325, 761);
//
//   let rightDiamondIcon = new Sprite(resources[diamondIconPath].texture);
//   rightDiamondIcon.position.set(1313, 758);
//   rightDiamondIcon.width = 48;
//   rightDiamondIcon.height = 48;
//
//   let textLblGoldAboveBtnSummonx10GBoM_sbc = new Text('', textStyle_32center_black);
//
//   let textLblGold10pOffGBoM_sbc = new Text('', textStyle10pOff_20right_red);
//
//   summonBooksContainer.addChild(
//     // backgroundEmpty_sbc, backgroundDarker_sbc, backgroundBook_sbc,
//     bannerBoM_sbc, textBannerBoM_sbc, backgroundBoM_sbc, boM_sbc,
//     btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc,
//     lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc,
//     leftGoldIcon,
//     textAboveLblGoldAboveBtnSummonx1BoM_sbc,
//     btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc,
//     lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc,
//     rightGoldIcon, textLblGold10pOffBoM_sbc,
//     bannerGBoM_sbc, textBannerGBoM_sbc, backgroundGBoM_sbc, gBoM_sbc,
//     btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc,
//     lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc,
//     leftDiamondIcon,
//     textAboveLblGoldAboveBtnSummonx1GBoM_sbc,
//     btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc,
//     lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc,
//     rightDiamondIcon, textLblGold10pOffGBoM_sbc
//   );
//   // setBarContainer(summonBooksContainer);
//   // addBackIcon(summonBooksContainer);
//
//   socket.on('summonBooksData', (data) => {
//
//     textBannerBoM_sbc.text = data.bookOfMagic;
//     textBannerBoM_sbc.position.set(
//       setMiddlePos(bannerBoM_sbc, textBannerBoM_sbc).x,
//       setMiddlePos(bannerBoM_sbc, textBannerBoM_sbc).y-8//200
//     );
//
//     textBannerGBoM_sbc.text = data.grandBookOfMagic;
//     textBannerGBoM_sbc.position.set(
//       setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).x,
//       setMiddlePos(bannerGBoM_sbc, textBannerGBoM_sbc).y-8//200
//     );
//
//     textBtnSummonx1BoM_sbc.text = data.summonx1;
//     textBtnSummonx1BoM_sbc.position.set(
//       setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).x,
//       setMiddlePos(btnSummonx1BoM_sbc, textBtnSummonx1BoM_sbc).y
//     );
//
//     textLblGoldAboveBtnSummonx1BoM_sbc.text = data.free; // Free or 10000
//     textLblGoldAboveBtnSummonx1BoM_sbc.position.set(
//       setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).x,
//       setMiddlePos(lblGoldAboveBtnSummonx1BoM_sbc, textLblGoldAboveBtnSummonx1BoM_sbc).y+2
//     );
//
//     textAboveLblGoldAboveBtnSummonx1BoM_sbc.text = data.freeTimes+freeCounter+data.maxFreeSummon;
//     textAboveLblGoldAboveBtnSummonx1BoM_sbc.position.set(
//       setMiddlePos(btnSummonx1BoM_sbc, textAboveLblGoldAboveBtnSummonx1BoM_sbc).x,
//       720,
//     );
//
//     textBtnSummonx10BoM_sbc.text = data.summonx10;
//     textBtnSummonx10BoM_sbc.position.set(
//       setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).x,
//       setMiddlePos(btnSummonx10BoM_sbc, textBtnSummonx10BoM_sbc).y
//     );
//
//     textLblGoldAboveBtnSummonx10BoM_sbc.text = data.gold10more;
//     textLblGoldAboveBtnSummonx10BoM_sbc.position.set(
//       setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).x,
//       setMiddlePos(lblGoldAboveBtnSummonx10BoM_sbc, textLblGoldAboveBtnSummonx10BoM_sbc).y+2
//     );
//
//     textLblGold10pOffBoM_sbc.text = data.discount10off;
//     textLblGold10pOffBoM_sbc.position.set(
//       lblGoldAboveBtnSummonx10BoM_sbc.x+lblGoldAboveBtnSummonx10BoM_sbc.width-textLblGold10pOffBoM_sbc.width-4,
//       setMiddlePos(textLblGoldAboveBtnSummonx10BoM_sbc, textLblGold10pOffBoM_sbc).y
//     );
//
//     textBtnSummonx1GBoM_sbc.text = data.summonx1;
//     textBtnSummonx1GBoM_sbc.position.set(
//       setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).x,
//       setMiddlePos(btnSummonx1GBoM_sbc, textBtnSummonx1GBoM_sbc).y
//     );
//
//     textLblGoldAboveBtnSummonx1GBoM_sbc.text = data.free; // Free or 288
//     textLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
//       setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).x,
//       setMiddlePos(lblGoldAboveBtnSummonx1GBoM_sbc, textLblGoldAboveBtnSummonx1GBoM_sbc).y+2
//     );
//
//     textAboveLblGoldAboveBtnSummonx1GBoM_sbc.text = data.freeTime;
//     textAboveLblGoldAboveBtnSummonx1GBoM_sbc.position.set(
//       setMiddlePos(btnSummonx1GBoM_sbc, textAboveLblGoldAboveBtnSummonx1GBoM_sbc).x,
//       720,
//     );
//
//     textBtnSummonx10GBoM_sbc.text = data.summonx10;
//     textBtnSummonx10GBoM_sbc.position.set(
//       setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).x,
//       setMiddlePos(btnSummonx10GBoM_sbc, textBtnSummonx10GBoM_sbc).y
//     );
//
//     textLblGoldAboveBtnSummonx10GBoM_sbc.text = data.diamond10more;
//     textLblGoldAboveBtnSummonx10GBoM_sbc.position.set(
//       setMiddlePos(btnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).x,
//       setMiddlePos(lblGoldAboveBtnSummonx10GBoM_sbc, textLblGoldAboveBtnSummonx10GBoM_sbc).y+2
//     );
//
//     textLblGold10pOffGBoM_sbc.text = data.discount10off;
//     textLblGold10pOffGBoM_sbc.position.set(
//       lblGoldAboveBtnSummonx10GBoM_sbc.x+lblGoldAboveBtnSummonx10GBoM_sbc.width-textLblGold10pOffGBoM_sbc.width-4,
//       setMiddlePos(textLblGoldAboveBtnSummonx10GBoM_sbc, textLblGold10pOffGBoM_sbc).y
//     );
//   });
//
//   stage.addChild(summonBooksContainer);
//
//   setInteractive(btnSummonx1BoM_sbc, true);
//   if (btnSummonx1BoM_sbc.interactive) {
//     btnSummonx1BoM_sbc.on('click', (event) => {
//       console.log('btnSummonx1BoM_sbc clicked');
//       socket.emit('summonx1BoM', 'summonx1BoMClicked');
//       setSummonContainer();
//     });
//   }
//
//   setInteractive(btnSummonx1GBoM_sbc, true);
//   if (btnSummonx1GBoM_sbc.interactive) {
//     btnSummonx1GBoM_sbc.on('click', (event) => {
//       console.log('btnSummonx1GBoM_sbc clicked');
//       socket.emit('summonx1GBoM', 'summonx1GBoMClicked');
//       setSummonContainer();
//     });
//   }
// }

// // Setup summonContainer (when player click on 'Summon ×1 (×10)' button this screen is shown)
// function setSummonContainer() {
//   summonContainer = new Container();
//
//   setInteractive(btnSummonx1BoM_sbc, false);
//   setInteractive(btnSummonx1GBoM_sbc, false);
//
//   let backgroundEmpty_suc = new Sprite(resources[backgroundEmptyPath].texture);
//   backgroundEmpty_suc.position.set(0, 0);
//
//   let backgroundDarker_suc = new Sprite(resources[backgroundDarkerPath].texture);
//   backgroundDarker_suc.position.set(0, 0);
//
//   let summoningBook_suc = new Sprite(resources[summoningBookPath].texture);
//   summoningBook_suc.position.set(GAME_WIDTH/2-summoningBook_suc.width/2, -56);
//
//   let banner_suc = new Sprite(resources[banner620x98Path].texture);
//   banner_suc.position.set(GAME_WIDTH/2-banner_suc.width/2, 48);
//
//   let textBanner_suc = new Text('', textStyleLevel_40center_white);
//
//   let btn10More_suc = new Sprite(resources[btnGreen260x72Path].texture);
//   btn10More_suc.position.set(620, 960);
//
//   let textBtn10More_suc = new Text('', textStyle_32center_black);
//   textBtn10More_suc.position.set(
//     setMiddlePos(btn10More_suc, textBtn10More_suc).x,
//     setMiddlePos(btn10More_suc, textBtn10More_suc).y
//   );
//
//   let lblLeft_suc = new Sprite(resources[lblSummonPath].texture);
//   lblLeft_suc.position.set(
//     284,
//     setMiddlePos(btn10More_suc, lblLeft_suc).y
//   );
//
//   let goldIcon10More = new Sprite(resources[goldIconPath].texture);
//   goldIcon10More.position.set(272, lblLeft_suc.y-13);
//
//   let diamondIcon10More = new Sprite(resources[diamondIconPath].texture);
//
//   let textLblLeft_suc = new Text('', textStyle_32center_black);
//
//   let btn1More_suc = new Sprite(resources[btnGreen260x72Path].texture);
//   btn1More_suc.position.set(1376, 960);
//
//   let textBtn1More_suc = new Text('', textStyle_32center_black);
//
//   let lblRight_suc = new Sprite(resources[lblSummonPath].texture);
//   lblRight_suc.position.set(
//     1040,
//     setMiddlePos(btn1More_suc, lblRight_suc).y
//   );
//
//   let goldIcon1More = new Sprite(resources[goldIconPath].texture);
//   goldIcon1More.position.set(1028, lblRight_suc.y-13);
//
//   let diamondIcon1More = new Sprite(resources[diamondIconPath].texture);
//
//   let textLblRight_suc = new Text('', textStyle_32center_black);
//
//   summoningItem_suc = new Sprite(resources[leryssaSummonIconPath].texture);
//   summoningItem_suc.position.set(
//     GAME_WIDTH/2-summoningItem_suc.width/2,
//     GAME_HEIGHT/2-summoningItem_suc.height/2-48
//   );
//
//   summonContainer.addChild(
//     backgroundEmpty_suc, backgroundDarker_suc,
//     summoningBook_suc, banner_suc, textBanner_suc,
//     lblLeft_suc, textLblLeft_suc, goldIcon10More,
//     btn10More_suc, textBtn10More_suc,
//     lblRight_suc, textLblRight_suc, goldIcon1More,
//     btn1More_suc, textBtn1More_suc
//   );
//   // addBackIcon(summonContainer);
//
//   socket.on('summonx1BoMData', (data) => {
//     console.log('summonx1BoMData', data);
//
//     textBanner_suc.text = data.bookOfMagic;
//     textBanner_suc.position.set(
//       setMiddlePos(banner_suc, textBanner_suc).x,
//       setMiddlePos(banner_suc, textBanner_suc).y-8
//     );
//
//     textBtn1More_suc.text = data.more1;
//     textBtn1More_suc.position.set(
//       setMiddlePos(btn1More_suc, textBtn1More_suc).x,
//       setMiddlePos(btn1More_suc, textBtn1More_suc).y
//     );
//
//     textBtn10More_suc.text = data.more10;
//     textBtn10More_suc.position.set(
//       setMiddlePos(btn10More_suc, textBtn10More_suc).x,
//       setMiddlePos(btn10More_suc, textBtn10More_suc).y
//     );
//
//     textLblLeft_suc.text = data.gold10more;
//     textLblLeft_suc.position.set(
//       setMiddlePos(lblLeft_suc, textLblLeft_suc).x,
//       setMiddlePos(lblLeft_suc, textLblLeft_suc).y
//     );
//
//     textLblRight_suc.text = data.gold1more;
//     textLblRight_suc.position.set(
//       setMiddlePos(lblRight_suc, textLblRight_suc).x,
//       setMiddlePos(lblRight_suc, textLblRight_suc).y
//     );
//   });
//
//   socket.on('summonx1GBoMData', (data) => {
//     console.log('summonx1GBoMData', data);
//
//     goldIcon10More.texture = diamondIcon10More.texture;
//     goldIcon1More.texture = diamondIcon1More.texture;
//
//     textBanner_suc.text = data.grandBookOfMagic;
//     textBanner_suc.position.set(
//       setMiddlePos(banner_suc, textBanner_suc).x,
//       setMiddlePos(banner_suc, textBanner_suc).y-8
//     );
//
//     textBtn1More_suc.text = data.more1;
//     textBtn1More_suc.position.set(
//       setMiddlePos(btn1More_suc, textBtn1More_suc).x,
//       setMiddlePos(btn1More_suc, textBtn1More_suc).y
//     );
//
//     textBtn10More_suc.text = data.more10;
//     textBtn10More_suc.position.set(
//       setMiddlePos(btn10More_suc, textBtn10More_suc).x,
//       setMiddlePos(btn10More_suc, textBtn10More_suc).y
//     );
//
//     textLblLeft_suc.text = data.diamond10more;
//     textLblLeft_suc.position.set(
//       setMiddlePos(lblLeft_suc, textLblLeft_suc).x,
//       setMiddlePos(lblLeft_suc, textLblLeft_suc).y
//     );
//
//     textLblRight_suc.text = data.diamond1more;
//     textLblRight_suc.position.set(
//       setMiddlePos(lblRight_suc, textLblRight_suc).x,
//       setMiddlePos(lblRight_suc, textLblRight_suc).y
//     );
//   });
//
//   stage.addChild(summonContainer);
// }







// // Setup the hero screen (after player clicked on specific hero)
// function setHeroContainer(heroName, iconClicked) {
//   let heroContainer = new Container();
//
//   // socket.emit('heroContainer', heroName);
//
//   setBookBackground(heroContainer);
//   // setBarContainer(heroContainer);
//   // setScrollArrowHeroes(heroesContainer);
//
//   setInteractive(stage.children[1].children[20], false); // rightArrow interactive -> false
//   setInteractive(stage.children[1].children[21], false); // back button interactive -> false
//   setInteractive(scrollArrow72x36, false);
//   // console.log(stage.children[1].children[18].children.length);
//   disableHeroPortraitsInteraction();
//   // for (let i = 0; i < stage.children[1].children[18].children.length; i++) {
//   //   let borderIndex = stage.children[1].children[18].children[i].children.length;
//   //   // console.log('borderIndex', borderIndex);
//   //   setInteractive(stage.children[1].children[18].children[i].children[borderIndex-2], false);
//   // }
//
//   addHeroBtnClose(heroContainer);
//
//   // TODO: pridat sipky vpravo, vlevo
//
//   // let heroUpperBackground = new Sprite(resources[heroUpperBackgroundPath].texture);
//   // heroUpperBackground.position.set(1008, 205);
//
//   let heroBottomBackground = new Sprite(resources[heroBottomBackgroundPath].texture);
//   heroBottomBackground.position.set(1008, 713);
//
//   let powerBar = new Sprite(resources[expBackgroundPath].texture);
//   powerBar.position.set(1168, 689);
//
//   let helpIcon = new Sprite(resources[helpIconPath].texture);
//   helpIcon.position.set(powerBar.x+powerBar.width, 689);
//
//   heroContainer.addChild(heroBottomBackground, powerBar,
//     helpIcon);
//   addHeroInfoIcons(heroContainer, iconClicked, heroName);
//
//   if (iconClicked === 'glyphs') {
//     addGlyphsContainer(heroContainer, heroName);
//   }
//
//   // console.log('heroes:\n', stage.children);
//   if (stage.children.length === 2) {
//     stage.addChild(heroContainer);
//   }
//   console.log('heroes2:\n', stage.children);
// }



// // Add bookmark to 'heroes' screen
// function addBookmark(container, posX, posY, bookmarkIcon, ...scale) {
//   let bookmark = new Sprite(resources[bookmarkIconPath].texture);
//   let icon = new Sprite(resources[bookmarkIcon].texture);
//
//   if (scale > 0) {
//     // console.log(scale);
//     bookmark.scale.set(scale);
//     icon.scale.set(scale);
//   }
//
//   bookmark.position.set(posX, posY);
//   icon.position.set(
//     setMiddlePos(bookmark, icon).x,
//     setMiddlePos(bookmark, icon).y
//   );
//
//   container.addChild(bookmark, icon);
// }
