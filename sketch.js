var rover, roverImage;
var bg, bgImage;
var asteroid, asteroidImage;
var star, starImage;
var spaceship, spaceshipImage;
var bomb, bombImage;
var aliensGroup,starsGroup,asteroidsGroup;
var gameState = "play";
var score = 0;
var starsC = 0;
var line1;
function preload(){
roverImage = loadImage("ClipartKey_1388246.png")
  bgImage = loadImage("federico-beccari-L8126OwlroY-unsplash.jpg")
  asteroidImage = loadImage("PngItem_1172914.png")
  starImage = loadImage("star-png-transparent-background-13.png")
  spaceshipImage = loadImage("15-156564_unidentified-flying-object.png")
  bombImage = loadImage("ClipartKey_1687328.png")
}

function setup() {
  createCanvas(400, 300)
  bg = createSprite(200, 150, 400, 400);
  bg.addImage("adding", bgImage);
  bg.scale = 0.1
  rover = createSprite(100, 150, 30, 30);
  rover.addImage("adding", roverImage)
  rover.scale = 0.05
  bomb = createSprite(100, 150, 30, 30);
  bomb.addImage("adding", bombImage);
  bomb.scale = 0.02;
  asteroidsGroup = createGroup();
  starsGroup = createGroup();
  aliensGroup = createGroup();
  
  line1 = createSprite(50, 200, 10, 400);
  line1.visible = false;

}

function draw() {
  background("white")
  bg.velocityX = -2
  if(bg.x<150){
    bg.x = 200;
  }

 if(gameState == "play"){ 

  if(keyDown("space")){
    bomb.velocityX = 8;
    bomb.visible = true;
  }
  if(bomb.x>390){
    bomb.x = rover.x;
    bomb.y = rover.y;
    bomb.velocityX = 0;
    bomb.visible = false;
    
  }
  
  if(bomb.x === 100){
    bomb.visible = false;
  }
  
  if(keyDown("down_arrow")&&rover.y<300){
    rover.y = rover.y+10;
    if(bomb.x === 100){
    bomb.y = bomb.y+10;
    }
  }
  if(keyDown("up_arrow")&&rover.y>0){
    rover.y = rover.y-10;
    if(bomb.x === 100)
    bomb.y = bomb.y-10;
  }
  console.log(bg.y)
  
  if(bomb.isTouching(aliensGroup)&&bomb.x>100){
    aliensGroup.destroyEach();
    bomb.x = rover.x;
    bomb.y = rover.y;
    bomb.velocityX = 0;
    score = score+1;
  }
  
  if(rover.isTouching(starsGroup)){
    starsGroup.destroyEach()
    starsC = starsC+1;
  }
  
  
  obstacles();
  stars()
  spaceships()
 }
  if(asteroidsGroup.isTouching(rover)||aliensGroup.isTouching(rover)){
    background("black");
    rover.destroy();
    gameState = "end"
  }
  
  if(aliensGroup.isTouching(line1)){
     background("black");
    rover.destroy();
    gameState = "end"
  }

 drawSprites();
 if(gameState == "end"){ 
   background("black")
   textSize(30);
   fill("white")
   text("Game Over", 100, 150)
  }
  textFont("calibri")
  fill("white")
  textSize(20)
  text("Score: "+score, 60, 50)
  text("Stars collected ~ "+starsC, 160, 50)
  

  for (var i = 0; i < 400; i=i+20) {
  strokeWeight(4);
  line(50, i, 50, i+10);
  }
  
  if(frameCount<50){
    fill("white")
    textSize(17);
    text("Shoot all the aliens", 100, 70);
    text("by pressing space", 100, 100);
    text("and don't let them touch the line", 100, 130);
  }
  
  
}



function obstacles(){
    if(frameCount%100 == 0){
      asteroid = createSprite(400, Math.round(random(40, 260)), 30, 30);
      asteroid.scale = 0.07;
      asteroid.addImage("adding", asteroidImage);
      asteroid.velocityX = -5;
      asteroid.lifetime = 80;
      
      asteroidsGroup.add(asteroid);
    }
}
function stars(){
  if (frameCount%92 == 0){
  star = createSprite(400, Math.round(random(40, 260)), 30, 30);
  star.addImage("adding", starImage);
  star.velocityX = -2;
  star.lifetime = 200;
  star.scale = 0.02;
    
    starsGroup.add(star)
  }
}
function spaceships(){
  if(frameCount%200 == 0){
  spaceship = createSprite(400, Math.round(random(40, 260)), 30 , 30);
  spaceship.addImage("adding", spaceshipImage);
  spaceship.velocityX = -3
  spaceship.scale = 0.07;
    
    aliensGroup.add(spaceship)
  }
} 
