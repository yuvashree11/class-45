var monkey, monkeyImage;
var banana, bananaImage, foodGroup;
var rock, rockImage, rockGroup;
var ground, groundImage, groundInvisible;;
var gameState="play";
var score=0;

function preload(){
  groundImage = loadImage("bg3.jpg");
  boyimg = loadAnimation("boy1.PNG","boy2.PNG","boy3.PNG","boy4.PNG","boy5.PNG",
  "boy6.PNG","boy7.PNG","boy8.PNG");
  candyimg1 = loadImage("candy1.png");
  candyimg2 = loadImage("candy2.png");
  candyimg3 = loadImage("candy4.png");
  candyimg4 = loadImage("candy5.png");
  candyimg5 = loadImage("candy6.png");
  candyimg6 = loadImage("candy7.png");
  dgimg = loadImage("Dragon3.jpg");
}
function setup() {
  
  createCanvas(550, 450);

  ground=createSprite(300,200,1500,20);
  ground.addImage(groundImage);
  ground.scale=1.1;
  
  groundInvisible=createSprite(300,430,1500,20);
  groundInvisible.visible=0;
  
 boy = createSprite(50,400,20,20);
 boy.addAnimation("Running",boyimg);
 boy .scale=0.15;
  
  
  foodGroup= new Group();
  rockGroup=new Group();
}

function draw() {
  background(220);
  
  boy.collide(groundInvisible);
  
  if(gameState=="play"){
    
    food();
    
    create_rock();
    
    ground.velocityX=-(5+5*(score/50));
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
   
    if(keyDown("space") && boy.y>270){
      boy.velocityY=-10;
    }
    boy.velocityY = boy.velocityY+0.5;
    
    if(foodGroup.isTouching(boy)){
      foodGroup.destroyEach();
      score=score+5;
      
    }
    
    if(rockGroup.isTouching(boy)){
      gameState="end";
     
    }
    

  }
  
  drawSprites();
  textSize(20);
  fill("red");
  text("Score: "+score,450,50);
  noFill();
  
      if(gameState=="end"){
        boy.velocityY=0;
        ground.velocityX=0;
        rockGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        rockGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
        textSize(18);
        fill("red");
        text("GAME OVER!!",200,180);
        text("PRESS SPACE TO RESTART.",200,200);
        noFill();
    }
  if(keyDown("space") && gameState=="end"){
    score=0;
    gameState="play";
    rockGroup.destroyEach();
    foodGroup.destroyEach();
  }
  
}

function create_rock(){
  
  if(Math.round(random(frameCount)%100)==0){
  rock=createSprite(500,400,20,20);
  rock.addImage(rockImage);
  rock.scale=0.15;
  rock.velocityX=-(8+5*(score/50));
  rock.lifetime=110;
  rockGroup.add(rock);
  }
  
}

function food(){
  
  if (frameCount%100==0){
  banana=createSprite(500,Math.round(random(150,300)),20,20);
  banana.addImage(bananaImage);
  banana.scale=0.06;
  banana.velocityX=-5;
  banana.lifetime=110;
  foodGroup.add(banana);
  }
}