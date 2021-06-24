//Create variables here
var dogimg, happydog;
var database;
var foodS, foodstock;
var fed, addFood;

	//load images here
  function preload()
{
  //load images here
  dogimg = loadImage("images/dog.png");
  happyDog = loadImage("images/HAPPYDOG.png")
}


function setup() {
  database = firebase.database();
	createCanvas(1000, 500);

  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogimg);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  foodobj = new Food();

  fed = createButton("Feed the dog");
  fed.position(700, 95)
  fed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800, 95)
  addFood.mousePressed(addfoods);
}

function draw() {  
  background(46, 139, 87);
  foodobj.display();

  fedTime=database.ref("feedTime");
  feedTime.on("value",function (data){
    lastfed = data.val();
  });

  fill(255,255,254)
  textSize(15)
  if (lastfed>=12){
    text("Lastfed :" + lastfed-12 + "pm", 350, 30)
  }
  else if (lastfed==0){
    text("Lastfed : 12 am", 350,30)
  }
  else{
    text("Lastfed :"+ lastfed + "am",350,30)
  }

  drawSprites();
  
}

function readStock(data){
    foodS = data.val()
    foodobj.updateFoodStock(foodS);
}

function feedDog(){
  if(foodobj.getFoodStock()<=0){
    foodobj.updateFoodStock(foodobj.getFoodStock()*0);
  }else{
    foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  }

  database.ref('/').update({
    food:foodobj.getFoodStock(),
    feedTime:hour()
  });
  
  dog.addImage(happyDog);
}

function addfoods(){
  foodS++
    console.log(x)
   database.ref('/').update({
     food:foodS
   }); 
}

