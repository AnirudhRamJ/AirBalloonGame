var bg, balloon, balloonAnimation, height;
var database, balloonPosition;
var edges;

function preload() {
  bg = loadImage("cityImage.png");
  balloonAnimation = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
}

// Function to setup initial environment
function setup() {
  createCanvas(1500, 700);

  edges = createEdgeSprites();

  database = firebase.database();

  balloon = createSprite(450, 250, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonAnimation);
  balloon.scale = 0.5;

  balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    updateHeight(-10, 0);

  } else if (keyDown(RIGHT_ARROW)) {
    updateHeight(10, 0);

  } else if (keyDown(UP_ARROW)) {
    updateHeight(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonAnimation);
    balloon.scale = balloon.scale - 0.01;

  } else if (keyDown(DOWN_ARROW)) {
    updateHeight(0, 10);
    balloon.scale = balloon.scale + 0.01;
  }

  if (balloon.isTouching(edges)) {
    fill("red");
    textSize(25);
    text("Hey! Don't go out of the city!", 750, 40);
    balloon.bounceOff(edges);
  }

  fill(0);
  textSize(25);
  text("**Use arrow keys to move the Balloon!", 40, 40);
  drawSprites();
}

function updateHeight(x, y) {
  database.ref('balloon/height').set({
    'x' : height.x + x ,
    'y' : height.y + y
  })
}

function readPosition(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
  
function showError(){
  console.log("Error while writing to the database!!");
}
