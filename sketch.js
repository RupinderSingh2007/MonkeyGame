
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,groundImage;
var PLAY=1;
var END=0;
var gameState=1;
var survivalTime;
var invisible;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  
}



function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(50,200,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.debug = false;
  monkey.scale=0.1;
  
  ground=createSprite(300,390,1200,30);
  ground.addImage(groundImage);
  ground.scale=1.5;
  ground.velocityX = -4;
  

  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  score = 0;
  survivalTime=0;
  
  invisible = createSprite(300,390,1200,30);
  invisible.visible = false;
}


function draw() {
  background("lightblue");
  if(gameState === PLAY){
    food();
    obstacles();
    if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 1;
    }
    survivalTime=Math.round(frameCount/frameRate());
    if (ground.x < 0){
    ground.x = ground.width/2;
    } 
    if(keyDown("space")){
      monkey.velocityY = -15;
    }  
    monkey.velocityY = monkey.velocityY + 0.8;  
    monkey.collide(ground);
    obstacleGroup.collide(invisible);
  }
  
  
  
  if(gameState === END){
    fill("red")  
    textSize(15);
    text("GAME OVER!",200,200);  

    ground.velocityX = 0;
    monkey.velocityY = 0; 
    foodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0) 
  
    obstacleGroup.setLifetimeEach(-1)
    foodGroup.setLifetimeEach(-1)
    
  }
  
  fill("blue"); 
  textSize(15);
  text("SURVIVAL TIME : "+ survivalTime, 200,50); 
  
  fill("yellow");
  textSize(13);
  text("Banana Collect : "+ score,220,70);
  drawSprites();
}

function food(){
  
if(frameCount%100===0){
  
  banana = createSprite(490,250,30,30);
  banana.y = Math.round(random(220,300));  
  banana.addImage(bananaImage);  
  banana.scale = 0.1;  
  
  banana.velocityX = -5;  
  banana.lifetime = 100;
  foodGroup.add(banana);  
  
}
}

function obstacles(){
  if(frameCount%6000===0){
    obstacle = createSprite(600,380,10,10);  
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;  
  
    obstacle.velocityX = -5;  
    obstacle.lifetime = 100;  
    obstacleGroup.add(obstacle);  
}    
}






