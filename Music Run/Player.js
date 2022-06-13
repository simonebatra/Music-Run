class Player {

    constructor(){
     this.name=null;
     this.index=null;
     this.positionX=0;
     this.positionY=0; 
     this.rank=0;
     this.score=0;
    }


    addPlayer(){
        var playerIndex = "players/player" + this.index;

        if(this.index === 1){
            this.positionX = width/2 - 100;
        }

        else{
            this.positionX = width/2 + 100;
        }

        database.ref(playerIndex).set(
            {name: this.name,
            positionX: this.positionX,
            positionY: this.positionY,
            rank:this.rank,
            score:this.score
        }
        )
    }

    getDistance(){
        var playerDistanceRef = database.ref("players/player"+this.index);
        playerDistanceRef.on("value", data=>{
            var data = data.val();
            this.positionX = data.positionX;
            this.positionY = data.positionY;
        }
        );
    }

    getCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value",function(data)
        {playerCount = data.val()});
        /*.on() - to keep listening to the changes that happen in the ‘playerCount’ field of the database. .val() - to copy the value from the database to the global variable of the code. .update - to store value from global variable to the database field ‘playerCount’.*/
    }

    updateCount(count){
        database.ref("/").update(
            {playerCount: count}
        )
    }

    update(){
        var playerIndex = "players/player"+this.index;
        database.ref(playerIndex.update(
            {
                positionX: this.positionX,
                positionY: this.positionY,
                rank: this.rank,
                score: this.score
            }
        ));
    }

    static getPlayersInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data=>
        {allPlayers = data.val();
        })
    }
}