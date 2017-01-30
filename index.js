var PIXI = require('pixi.js');

var renderer = new PIXI.CanvasRenderer(2525, 2338);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage;

var zombieTexture = PIXI.Texture.fromImage('03-bw.jpg');
var zombie = new PIXI.Sprite(zombieTexture);

zombie.position.x = 0;
zombie.position.y = 0;

stage.addChild(zombie);

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
}

draw();
