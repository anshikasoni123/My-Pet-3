//Create variables here
var dog, database;
var foodStock, foodOBJ, fedTime, lastFed, feedI;
var sadDog, happyDog, Bedroom, Garden, Washroom;
var feed, addfood;
var currentTime, gameState, readState;

function preload()
{
	//load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  feedIMG = loadImage("virtual pet images/Food Stock.png");
  Bedroom = loadImage("virtual pet images/Bed Room.png")
  Garden = loadImage("virtual pet images/Garden.png")
  Washroom = loadImage("virtual pet images/Wash Room.png")
}

function setup() {
	createCanvas(1000, 700);

  database = firebase.database();

  dog = createSprite(900, 350, 50, 50);
  dog.addImage(sadDog);
  dog.scale = 0.2;

  foodOBJ = new Food();
  form = new Form();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  readState = database.ref("gameState")
  readState.on("value", 
  (data)=>
  {
     gameState = data.val();
  })

  fedTime = database.ref("FeedTime")
  fedTime.on("value", function (data){
    lastFed = data.val()
  })

   feed = createButton("Feed The Dog")
   feed.position(700, 100)
   feed.mousePressed(feedDog)

   addfood = createButton("Add Food")
   addfood.position(850, 100)
   addfood.mousePressed(addFood);
  
}


function draw() {  

  background("green");

  form.display();

  currentTime = hour();

  if(currentTime === (lastFed + 1))
  {
    update("playing")
    foodOBJ.garden();
  }

  else if(currentTime === (lastFed + 2))
  {
    update("sleeping")
    foodOBJ.bedroom();
  }

  else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4))
  {
    update("bathing")
    foodOBJ.washroom();
  }

  else
  {
    update("hungry")
    foodOBJ.display();
  }

  if(gameState != "hungry")
  {
     feed.hide();
     addfood.hide();
     dog.remove();
  }

  else
  {
    feed.show()
    addfood.show()
    dog.addImage(sadDog)
  }

  drawSprites()
  //add styles here
}

function readStock(data)
{
   foodS = data.val()
   foodOBJ.updateFoodStock(foodS)
}

function feedDog()
{
  dog.addImage(happyDog)

  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1)
  database.ref('/').update({
    Food: foodOBJ.getFoodStock(),
    FeedTime : hour()
  })
}

function addFood()
{
  foodS++;

  database.ref('/').update({
    Food: foodS
  })
}

function update(state)
{
  database.ref("/").update({
    gameState : state
  })
}