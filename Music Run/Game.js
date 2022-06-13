class Game {

    constructor(){
        this.resetButton=createButton("");
        this.resetTitle=createElement("h2");
        this.leaderBoardTitle=createElement("h2");
        this.leader1=createElement("h2");
        this.leader2=createElement("h2")
    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",function(data)
        {gameState= data.val()});
    }

    update(state){
        database.ref("/").update({
            gameState: state
        });
    }

    start(){

        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();

        father = createSprite(width/2-50, height-100);
        father.addImage("p1", player1Img);
        father.scale = 0.2;
    
        daughter = createSprite(width/2+100, height-100);
        daughter.addImage("p2", player2Img);
        daughter.scale = 0.2;

        myPlayers = [father, daughter];
    }

    play(){
        this.handleElements();
        this.handleResetButton();
        Player.getPlayersInfo();
        if (allPlayers !== undefined){
            image(track, 0, -height*5, width, height*6);
            this.showLeaderBoard();
            var index = 0;
            for(var plr in allPlayers){
                index+=1;
                var x = allPlayers[plr].positionX;
                var y = height-allPlayers[plr].positionY;
                myPlayers[index-1].position.x = x;
                myPlayers[index-1].position.y = y;
                if(index==player.index){
                    stroke(10);
                    fill("purple");
                    ellipse(x, y, 60, 60);
                    camera.position.x = myPlayers[index-1].position.x;
                    camera.position.y = myPlayers[index-1].position.y;
                }
            }
            this.handlePlayerControls();
            drawSprites();
        }
    }

    handleElements(){
        form.hide();
        form.titleImg.position(40,50);
        form.titleImg.class("gameTitleAfterEffect");
        this.resetTitle.html("reset game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width/2+200, 40);
        this.resetButton.class("resetButton");
        this.resetButton.position(width/2+230, 100);
        this.leaderBoardTitle.html("leaderBoard");
        this.leaderBoardTitle.class("resetText");
        this.leaderBoardTitle.position(width/3-60, 40);
        this.leader1.class("leadersText");
        this.leader1.position(width/3-60, 80);
        this.leader2.class("leadersText");
        this.leader2.position(width/3-60, 130);
    }

    handlePlayerControls(){
        if(keyIsDown(UP_ARROW)){
            player.positionY+=10;
            player.update();
        }
        if(keyIsDown(LEFT_ARROW)){
            player.positionX-=10;
            player.update();
        }
        if(keyIsDown(RIGHT_ARROW)){
            player.positionX+=10;
            player.update();
        }
    }

    handleResetButton(){
        this.resetButton.mousePressed(()=>{
            database.ref("/").set({
                playerCount:0,
                gameState:0,
                players: {}
            });
            window.location.reload();
            })
    }

    showLeaderBoard(){
        var leader1;
        var leader2;
        var players = Object.values(allPlayers);
        if (players[0].rank==0 && players[1].rank==0 || players[0].rank==1){
            leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp" + players[0].score;
            leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp" + players[1].score;
        
            if(players[1].rank == 1){
                leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp" + players[1].score;  
                leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp" + players[0].score;
            }

            this.leader1.html(leader1);
            this.leader2.html(leader2);
        }
    }
}