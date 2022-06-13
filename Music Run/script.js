var canvas;
var backgroundImg;
var player1, player1Img, player2, player2Img;
var notesLevel = 4;
var database;
var form;
var player;
var playerCount;
var gameState;
var myPlayers=[], father, daughter;

function preload(){
    backgroundImg = loadImage("Music Run Track.png");
    player1Img = loadImage("man.png");
    player2Img = loadImage("daughter.png");
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);

    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(backgroundImg);

    if(playerCount === 2){
        game.update(1);
    }

    if(gameState === 1){
        game.play();
    }

    if (notesLevel>0){
        rect(20,20, 200, 30);
        fill("red");
        rect(20,20, 200, 30);
    }

    drawSprites();
}

function resized(){
    resizeCanvas(windowWidth, windowHeight);
}