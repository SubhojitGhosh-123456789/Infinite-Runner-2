var track;
var main;
var mainImg;
var g1 = "main";
var ground;
var hurdle;
var runner;
var runner_running;
var coinImg;
var coinGroup;
var obstaclesGroup;
var collided;
var rules, rulesImg;
var gameOver, gameOverImg;
var title1;
var title2;

var distance = 0;
var score = 0;
var ccoin = 0;

function preload()
{
  mainImg = loadImage("main.jpg");
  track = loadImage("track.jpg");
  hurdle = loadImage("hurdle.png");
  runner_running = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png");
  coinImg = loadImage("coin.png");
  rulesImg = loadImage("rules.jpg");

}

function setup() {
  createCanvas(900, 600);

  main = createSprite(450,300,900,600);
  main.addImage(mainImg);
  main.visible = true;

  rules = createSprite(450,300,900,600);
  rules.addImage(rulesImg);
  rules.scale = 0.7;
  rules.visible = false;

  start = createButton("Start");
  start.position(540,550);
  start.mousePressed(rulePlay);
  start.show();

  play = createButton("Proceed To Play");
  play.position(520,550);
  play.mousePressed(gamePlay);
  play.hide();

  runner = createSprite(100,480,10,40);
  runner.addAnimation("Running",runner_running);
  runner.velocityX = 10;
  runner.scale = 0.8;
  runner.visible = false;
  
  ground = createSprite(450,550,100000000000000,10);
  ground.x=ground.width/2;
  ground.visible=false;

  coinGroup = new Group();
  obstaclesGroup = new Group();

  title1 = createElement('h1');
  title1.html("Game Over!!!!");
  title1.position(530, 100);
  title1.hide();

  title2 = createElement('h2');
  title2.html("Better Luck Next Time.");
  title2.position(500, 150);
  title2.hide();

}


function draw() {  

  background(track);

  drawSprites();
 
  if(g1 === "play"){

    runner.collide(ground);

    distance += 0.5;

    runner.visible = true;

    camera.position.x =runner.x;

    if(keyDown("space") && runner.y >=450){
      runner.velocityY = -17;
    } 
    
    runner.velocityY = runner.velocityY+0.8;

    if(coinGroup.isTouching(runner)){
      coinGroup.destroyEach();
      score = score + 20;
      ccoin = ccoin + 1;
    }
    if(obstaclesGroup.isTouching(runner)){
      g1 = "end";
    }

    spawnObstacles();
    coins();

    drawSprites();
    
  }

  if(g1 === "end"){
    runner.velocityX=0;
    runner.velocityY=0;
    runner.visible = false;
    title1.show();
    title2.show();

    fill(0);
    textSize(35);
    text("Results", runner.x - 30, runner.y - 260);

    fill(0);
    textSize(25);
    text("Score: "+score+" points", runner.x - 60, runner.y - 200);

    fill(0);
    textSize(25);
    text("Coins Collected: "+ ccoin + " coins", runner.x - 60, runner.y - 140);

    fill(0);
    textSize(25);
    text("Distance Ran:  " + distance + "  metres", runner.x - 80, runner.y - 80);
  }

}

function spawnObstacles() {
  if(frameCount % 350 === 0) {
    var obstacle = createSprite(800,510,10,40);
    obstacle.x = runner.x + 1000;
    obstacle.addImage(hurdle);
    obstacle.scale = 0.3;
    runner.depth = obstacle.depth + 1;
    obstacle.lifetime = 350;
    obstaclesGroup.add(obstacle);
  }
}
function coins() {
  if(frameCount % 150 === 0) {
    var coin = createSprite(800,470,10,40);
    coin.x = runner.x + 1000;
    coin.addImage(coinImg);
    coin.scale = 0.2;
    runner.depth = coin.depth + 1;
    coin.lifetime = 350;
    coinGroup.add(coin);
  }
}
function rulePlay(){
  main.visible = false;
  rules.visible = true;
  play.show();
  start.hide();

}
function gamePlay(){
  rules.visible = false;
  play.hide();
  g1 = "play";

}

