var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroups;
var ghost,ghostImg;

var invisibleBlockGroups,invisibleBlock;
var gameState = "play"


function preload () {
  
  towerImg = loadImage ("tower.png");
  doorImg = loadImage ("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage ("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");
  
}

function setup () {
  createCanvas (windowWidth,windowHeight);
  
  spookySound.loop ();
  
  tower = createSprite(300,300);
  tower.addImage ("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group ();
  climbersGroup = new Group ();
  invisibleBlockGroups = new Group ();
  
  ghost = createSprite(200,200,10,12);
  ghost.scale = 0.5;
  ghost.addImage ("ghost",ghostImg);
    
}

function draw () {
  background ('black');
  
  if (gameState==="play") {
    
    if (keyDown("left_arrow")) {
      
      ghost.x = ghost.x -3;  
      
    }
  if (keyDown("right_arrow")) {
    
    ghost.x = ghost.x +3;
    
  }
  if (keyDown("space")) {
    
    ghost.velocityY = -5;
    
  }
  ghost.velocityY =ghost.velocityY +0.8
    
  if (tower.y >400) {
    
    tower.y = 300 
    
  }
  spawnDoors ();
    
  if(climbersGroup.isTouching(ghost)) {
    
    ghost.velocityY = 0;
    
  }
  if(invisibleBlockGroups.isTouching(ghost)||ghost.y>600) {
    
    ghost.destroy();
    gameState = "end"
    
  }
  drawSprites ();
  }
  if (gameState==="end") {
    
    stroke("#D10832");
    fill("#940926");
    textSize(20);
    text("welcome To De Gulag",230,250);
    
  }
  
  
}

function spawnDoors (){
  
  if (frameCount%240===0) {
    
    var door = createSprite(200,-50);
    var climber = createSprite(100,10);
    var invisibleBlock = createSprite(200,15);
    
   invisibleBlock.width = climber.width;
   invisibleBlock.heigth = 2;
   
   door.x = Math.round (random(120,400));
   climber.x = door.x;
   invisibleBlock.x = door.x;
    
   door.addImage(doorImg);
   climber.addImage(climberImg);
    
   door.velocityY = 1;
   climber.velocityY = 1;
   invisibleBlock.velocityY = 1;
    
   ghost.depth = door.depth;
   ghost.depth +=1;
   
   door.lifetime = 800
   climber.lifetime = 800
   invisibleBlock.lifetime = 800
    
   doorsGroup.add(door);
    
   
   climbersGroup.add(climber);
    
   invisibleBlockGroups.add(invisibleBlock); 
    
  } 
}