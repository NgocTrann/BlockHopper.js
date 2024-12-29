//* Block Hopper *//

// Canvas Sizing
var canvasWidth = 600;
var canvasHeight = 400;

// Player Variables
var player;
var playerYPosition = 200;
var fallSpeed = 10;
var isJumping = false;
var isFalling = false;
var jumpSpeed = 0;

// Block Variables
var block;
var blockYPosition = 200;

// Scoreboard Variables
var amountOfHits = 0;
var amountOfMisses = 0;

var interval = setInterval(updateCanvas, 20); // 20 milliseconds

function startgame() {
    gameCanvas.start();
    player = new createPlayer(30, 30, 40);
    block = new createBlock(30,randomY(),500);
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d"); /* Sets up the element cavas as 2D (important) */
     //   document.body.insertBefore(this.canvas, document.body.childNodes[0]); /* makes sure the canvas is the first thing added to the body */
        var canvasContainer = document.body.querySelector(".canvasContainer").appendChild(this.canvas);
    }
}

function randomY() {
    var numberToReturn = Math.floor(Math.random() * 300);
   // console.log(numberToReturn);
    return numberToReturn;
}

function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.makeFall = function() {
        if (isJumping != true) {
            this.y += fallSpeed;
            if (this.y != 375) {
                isFalling = true;
            }
            this.stopPlayer();
        }
    }
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            isFalling = false;
            this.y = ground;
        }
    }

    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 0.3;
        }
    }
    
}

function createBlock(width, height, x) {
    this.width = width;
    this.height = 210;
    this.x = x;
    this.y = canvasHeight - this.height;


    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "red"
        ctx.fillRect(this.x,this.y, this.width, this.height);

    }

    this.makeMove = function() {
        this.x += -5;
        if (this.x <= 0) {
            this.height = randomY();
            this.x = x;
            this.y = canvasHeight - this.height;

            //console.log(canvasHeight - this.height);
        }
    }

    this.stopBlock = function() {

    }
}

function detectCollision() {
    if (block.x == player.x) {
        if (player.y < (canvasHeight - block.height)) {
            amountOfMisses += 1;
            document.body.querySelector("#miss").textContent = "Miss: " + amountOfMisses;
            console.log("Miss");
        } else {
            amountOfHits += 1;
            document.body.querySelector("#hit").textContent = "Hit: " + amountOfHits;
            console.log("Hit");
            block.height = randomY();
            block.x = x;
            block.y = canvasHeight - block.height;
        }
    }
}


function updateCanvas() {
    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();

    block.draw();
    block.makeMove();

    detectCollision();

}

function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(input) {
    if (input.keyCode == 32 && isFalling == false) {
        isJumping = true;
        setTimeout(function() {resetJump();}, 1000); // Jump lasts for 1 second
    }
}