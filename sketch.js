var canvas, backgroundImage;
var trackimage,car1image,car2image,car3image,car4image;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var gold,silver,bronze;
var finishedPlayers=0;
var PastFinished;

var form, player, game;

var cars, car1, car2, car3, car4;

function preload(){
car1image=loadImage("images/car1.png")
car2image=loadImage("images/car2.png")
car3image=loadImage("images/car3.png")
car4image=loadImage("images/car4.png")
trackimage=loadImage("images/track.jpg")
gold=loadImage("images/gold.png")
silver=loadImage("images/silver.png")
bronze=loadImage("images/bronze.png")



}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background("grey")
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedPlayers===4){
    game.update(2)

  }
if(gameState===2 && finishedPlayers===4){
  game.displayRanks()
}
}
