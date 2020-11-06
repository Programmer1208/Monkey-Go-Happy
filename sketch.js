

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(600,500);
  
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  
  monkey = createSprite(50, 460, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(70, 480, 1200, 10);
  ground.velocityX = -8;
  ground.x=ground.width/2;
  
  score = 0;
  survialTime = 0;
  
}


function draw() {
  

  background (180);
  
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 50, 50);
  

  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 500, 50);
  
  monkey.collide(ground);
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime =Math.round(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  

  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  
   if (gameState === END) {
    
     
     
     ground = createSprite(70, 480, 1200, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 250, 230);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 250, 270);
   }
 
  

  drawSprites();
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,400,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(300,400));
    banana.scale = 0.1;
    
    banana.velocityX = -6;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(600,460,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 600;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


