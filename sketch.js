var cloud;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacleGroup;
var cloudGroup;
var trexImage;
var gameOver, restart
var gameOverImage, restartImage;

var score;
var xyz;

var dieSound, checkPointSound, jumpSound;

var obstacle;
var obstacle1, obstacle2, obstacle3,
obstacle4, obstacle5, obstacle6;

var PLAY = 1;
var END = 0
var gameState = PLAY


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  dieSound = loadSound ("die.mp3");
  jumpSound = loadSound ("jump.mp3");
  checkPointSound = loadSound ("checkPoint.mp3");
  
  groundImage = loadImage("ground2.png");
  
 cloudImage = loadImage("cloud.png")

  gameOverImage = loadImage ("gameOver.png");
  restartImage = loadImage ("restart.png");
  
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
   
  trexImage = loadImage("trex2.png");
}

function setup() {
  
  score = 0
  
  createCanvas(600,200)
  
  gameOver = createSprite(300, 70);
  restart = createSprite (300, 110);
  gameOver.addImage(gameOverImage);
  restart.addImage(restartImage);
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("T-rex Collided", trex_collided);
  trex.scale = 0.5;
  
  gameOver.scale = 0.5
  restart.scale = 0.08
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group ();
  cloudGroup = new Group ();
  //generate random numbers
  
}

function spawnObstacles () {
  
  
  if (frameCount % 60 === 0){
   
   obstacle = createSprite(600, 165, 20, 20); 
   obstacle.velocityX = -(5+3*score/100);
   var abc = Math.round(random(1, 6));
    obstacleGroup.add(obstacle) 
    
   switch (abc) {
       
     case 1: obstacle.addImage (obstacle1);
       break;
       
    case 2: obstacle.addImage (obstacle2);
       break;
       
    case 3: obstacle.addImage (obstacle3);
       break;
       
    case 4: obstacle.addImage (obstacle4);
       break;
       
    case 5: obstacle.addImage (obstacle5);
       break;
       
    case 6: obstacle.addImage (obstacle6);
       break;
       
       default: break;
       
      
   }
  
  obstacle.scale = 0.45
    obstacle.lifetime = 300

  }
}

function draw() {
  //set background color
  background(20);
  
  
  // trex's image boundaries ("shape", x offset, y offset, {IF RECT/SQ - width} radius/height)
  
  trex.setCollider("circle", 0, 0, 35)
   trex.debug = false
  
  stroke("#52CAFF");
  strokeWeight(7);
  fill(20);
  textFont("Calibri");
  textSize (14.5);
  text("Score: " + score, 500, 30);
  
  if(gameState === PLAY){
    
  
      ground.velocityX = -(4 + 3*score/100);
    gameOver.visible = false;
    restart.visible = false;
    
     score = score + Math.round(getFrameRate()/60);
     if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = (-13.5);
       jumpSound.play();
  }
     trex.velocityY = trex.velocityY + 0.8
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   spawnClouds();
  
  spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)){
      dieSound.play();
      gameState = END
     }
    if(score%150 === 0 && score>0){
      checkPointSound.play();  
    }
    
  }
  else if(gameState === END){
     
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach (0);
    obstacleGroup.setVelocityXEach (0);
    trex.changeAnimation("T-rex Collided", trex_collided)
    if(mousePressedOver(restart)){
    reset();   
       }
    cloudGroup.setLifetimeEach (-1);
    obstacleGroup.setLifetimeEach (-1);
    trex.velocityY = 0
    gameOver.visible = true;
    restart.visible = true;
    
    
   
  }
  
 
  
  // jump when the space key is pressed
 
  
  //gravity for the T-rex 
 
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
 

  drawSprites();
  
}


function reset(){
  score = 0;
  gameState = PLAY
  trex.changeAnimation("running", trex_running);
  cloudGroup.destroyEach() 
  obstacleGroup.destroyEach()
   
}




//function to spawn the clouds
function spawnClouds(){ 
  
  
  xyz = Math.round(random(0, 575));
  
  if (frameCount % xyz === 0){
   
   cloud = createSprite(600, 60, 20, 20);
   cloud.addImage (cloudImage);
   cloud.scale = 0.5; 
   cloud.velocityX = -3;
   cloud.depth = trex.depth;
   trex.depth = trex.depth+1;
  gameOver.depth = cloud.depth
    cloud.depth = cloud.depth -1;
   cloud.y = Math.round(random(10, 100));
   cloud.lifetime = 220;
   cloudGroup.add(cloud) 
  }
          

 
 // write your code here 
}


