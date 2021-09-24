var bg
var bottomGround, topGround
var balloon, balloonImg
var obstacleTop, obstacleTopImg
var obstacleBottom, obstacleBottom1, obstacleBottom2
var backgroundImg;
var jumpSound

var score = 0;


function preload(){
  bgImg = loadImage("assets/bg.png")
  bgImg2 = loadImage("assets/bgImg2.jpg")

  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  
  obsTop1 = loadImage("assets/obsTop1.png")
  obsTop2 = loadImage("assets/obsTop2.png")
  
  obsBottom1 = loadImage("assets/obsBottom1.png")
  obsBottom2 = loadImage("assets/obsBottom2.png")
  obsBottom3 = loadImage("assets/obsBottom3.png")

  jumpSound = loadSound("assets/jump.mp3")

}

function setup(){

  createCanvas(displayWidth,displayHeight-200)
//background image
bg = createSprite(0,displayHeight/2,displayWidth,displayHeight-200);
getBackgroundImg();


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug = true;


//initialising groups
topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();



}

function draw() {
  

  

    //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      jumpSound.play();
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;

     
    Bar();

     //spawning top and bottom obstacles
     spawnObstaclesTop();
     spawnObstaclesBottom();



  
    drawSprites();
    Score();     
  }

function spawnObstaclesTop() 
{
  if(World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400,200,40,50);

//obstacleTop.addImage(obsTop1);

obstacleTop.scale = 0.2;
obstacleTop.velocityX = -4;

//random y positions for top obstacles
obstacleTop.y = Math.round(random(10,100));

//generate random top obstacles
var rand = Math.round(random(1,2));
switch(rand) {
  case 1: obstacleTop.addImage(obsTop1);
          break;
  case 2: obstacleTop.addImage(obsTop2);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleTop.lifetime = 100;

balloon.depth = balloon.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}

function spawnObstaclesBottom() 
{
  if(World.frameCount % 60 === 0) {
    obstacleBottom = createSprite(400,450,40,50);

obstacleBottom.addImage(obsBottom1);
obstacleBottom.debug=true


obstacleBottom.scale = 0.08;
obstacleBottom.velocityX = -4;



//generate random bottom obstacles
var rand = Math.round(random(1,3));
switch(rand) {
  case 1: obstacleBottom.addImage(obsBottom1);
          break;
  case 2: obstacleBottom.addImage(obsBottom2);
          break;
  case 3: obstacleBottom.addImage(obsBottom3);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleBottom.lifetime = 100;

balloon.depth = balloon.depth + 1;

bottomObstaclesGroup.add(obstacleBottom);

  }
}



 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
        
          
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;

          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(balloon.isTouching(barGroup))
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(30);
        fill("yellow");
        text("Score: "+ score, 250, 50);
       
  
}

// using API calls to set the background image according to time
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
    
    bg.addImage(bgImg);
    bg.scale = 1.3
  }
  else{
    
    bg.addImage(bgImg2);
    bg.scale = 1.5
    bg.x=200
    bg.y=200
  }

}