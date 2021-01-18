class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1image);
    car2 = createSprite(300,200);
    car2.addImage(car2image);
    car3 = createSprite(500,200);
    car3.addImage(car3image);
    car4 = createSprite(700,200);
    car4.addImage(car4image);
    cars = [car1, car2, car3, car4];
    PastFinished=false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767");
      //index of the array
      image(trackimage,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       textAlign(CENTER);
       textSize(20);
       fill("cyan");
       text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75)
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null&&PastFinished!==true){
  
      player.distance +=50
      player.update();
    }
    
    if(player.distance>3900 && PastFinished===false){
      Player.updateFinishedPlayers()
      player.rank=finishedPlayers
      player.update()
        PastFinished=true
    }
    drawSprites();
  }

  displayRanks(){
  camera.position.x=0;
  camera.position.y=0;
  imageMode(CENTER)
  Player.getPlayerInfo()
  image(gold,0,-100,200,240)
  image(silver,displayWidth/4,-100+displayHeight/9,200,240)
  image(bronze,displayWidth/-4,-100+displayHeight/9,200,240)
  textAlign(CENTER)
  textSize(50)
  for(var plr in allPlayers ){
    if(allPlayer[plr].rank===1){
      text("First: "+allPlayer[plr].name,0,85);
    }

    else if(allPlayer[plr].rank===2){
      text("Second: "+allPlayer[plr].name,displayWidth/4,displayHeight/9+75);
    }

    else if(allPlayer[plr].rank===3){
      text("Third: "+allPlayer[plr].name,displayWidth/-4,displayHeight/9+75);

      }

      else {
        text("Better Luck Next Time: "+allPlayer[plr].name,0,230);
      }
      
    
  }

  }
}
