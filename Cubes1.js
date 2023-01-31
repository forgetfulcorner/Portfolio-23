// Declare box dimensions
let boxX = 150;
let boxY = 150;
let boxZ = 150;

let numBox = 10;

let randH, randS, randB, randTop, randBot

function setup() {
  createCanvas(400, 600);
  noStroke();
  colorMode(HSB, 255);
  
  randH = random(50, 250);
  randS = random(150, 250);
  randB = random(180, 250);
  
  randTop = random(255);
  randBot = random(255);
  

  
  push();
  fill(randTop, 50, 250)
  rect(0,0,width,height/2)
  fill(randTop, 150, 250)
  rect(0,height/2,width,height/2)
  pop();
  
  frameRate(30);
}

function draw() {
  
  randH = random(50, 250);
  randS = random(150, 250);
  randB = random(180, 250);
  
  randTop = random(255);
  randBot = random(255);
  
  boxX = random(10,80)
  boxY = random(10,80)
  boxZ = random(10,60)
  
  // background(220);
  angleMode(DEGREES);
  
  // Horizon points
  
  let leftX = 0;
  let leftY = height/2;
  let rightX = width;
  let rightY = height/2;
  
  // Draw Horizon
//   noStroke();
//   stroke(0);
//   strokeWeight(1);
//   line(leftX, leftY, rightX, rightY);
//   noStroke();
  

  
  // Draw initial box edge
  // CAN COMMENT OUT
  
  let randX = random(50, width-50)
  let randY = random(height/2, height - 50)

  let edgeBottom = randY + boxZ;
  
  strokeWeight(2);
  line(randX, randY, randX, edgeBottom);
  
  noStroke();
  
  // Determine XY plane rotational bias
  // Must calculate distance from midpoint of horizon to the X position of initial edge
  // To then determine the position of the edge between the midpoint and either horizon end point
  // The XY dimensions of the shape are rotated from 45 degrees according to this proportion
  
  let rotationBias;
  let rotationAmount;
  let distanceFromMidpoint = abs(width/2 - randX);
  
  if (randX < width/2) {
    rotationBias = -1;
  } else if (randX == width/2) {
    rotationBias = 0;
  } else if (randX > width/2) {
    rotationBias = 1;
  }
  
  let leftAngle;
  let rightAngle;
  
  if (rotationBias == -1) {
    rotationAmount = map(distanceFromMidpoint, 0, width/2, 45, 90);
    leftAngle = rotationAmount;
    rightAngle = 90 - rotationAmount;
  }
  
  if (rotationBias == 0) {
    leftAngle = 45;
    rightAngle = 45;
  }
  
  if (rotationBias == 1) {
    rotationAmount = map(distanceFromMidpoint, 0, width/2, 45, 0);
    leftAngle = rotationAmount;
    rightAngle = 90 - rotationAmount;
  }
  
  // Using this rotated XY dimension, determine the left and right edges of the box
  
  let leftOffset = boxY * cos(leftAngle);
  let rightOffset = boxX * cos(rightAngle);
  
  // line(randX - leftOffset, randY, randX - leftOffset, edgeBottom);
  // line(randX + rightOffset, randY, randX + rightOffset, edgeBottom);
  
  // Define directional vectors and edges emitting from initial edge
  
  let topLeftVec = createVector(-randX, randY - height/2, 0);
  let botLeftVec = createVector(-randX, edgeBottom - height/2, 0);
  let topRightVec = createVector(width - randX, randY - height/2, 0);
  let botRightVec = createVector(width - randX, edgeBottom - height/2, 0);

  let topLeftAngle = topLeftVec.angleBetween(createVector(-1, 0, 0));
  let botLeftAngle = botLeftVec.angleBetween(createVector(-1, 0, 0));
  let topRightAngle = -1 * topRightVec.angleBetween(createVector(1, 0, 0));
  let botRightAngle = -1 * botRightVec.angleBetween(createVector(1, 0, 0));
  
  let topLeftOffset = leftOffset * tan(topLeftAngle);
  let botLeftOffset = leftOffset * tan(botLeftAngle);
  let topRightOffset = rightOffset * tan(topRightAngle);
  let botRightOffset = rightOffset * tan(botRightAngle);
  

  
  
  // Derive coordinate of bottom or top face
  
  // translate(0, height/2);
  
  let lastLeftVec = createVector(-(width - randX + leftOffset), -(randY - height/2 - topLeftOffset), 0);
  let lastRightVec = createVector((randX + rightOffset), (randY - height/2 - topRightOffset), 0);
  
  let leftSlope = (randY - height/2 - topLeftOffset) / (width - randX + leftOffset);
  let rightSlope = -(randY - height/2 - topRightOffset) / (randX + rightOffset);

  let lastRightAngle = lastLeftVec.angleBetween(createVector(-1, 0, 0));
  
  let rightShift = - width * tan(lastRightAngle);

  let lastX = rightShift / (leftSlope - rightSlope);
  let lastY = -(lastX * rightSlope) + height/2;
  


  
  if (frameCount < numBox) {
    
    // Draw left and right faces
    push();
    fill(randH,randS,randB);
    beginShape();
    vertex(randX, randY);
    vertex(randX - leftOffset, randY - topLeftOffset);
    vertex(randX - leftOffset, edgeBottom - botLeftOffset);
    vertex(randX, edgeBottom);
    vertex(randX, randY);
    endShape();
    pop();

    push();
    fill(randH,randS - 50,randB);
    beginShape();
    vertex(randX, randY);
    vertex(randX, edgeBottom);
    vertex(randX + rightOffset, edgeBottom - botRightOffset);
    vertex(randX + rightOffset, randY - topRightOffset);
    vertex(randX, randY);
    endShape();
    pop();
    
    // Draw top or bottom faces
  
    push();
    fill(randH,randS - 100,randB);
    beginShape();
    vertex(randX, randY);
    vertex(randX + rightOffset, randY - topRightOffset);
    vertex(lastX, lastY);
    vertex(randX - leftOffset, randY - topLeftOffset);
    vertex(randX, randY);
    endShape();
    pop();

  }  
}

