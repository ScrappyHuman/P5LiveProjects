const w = 500;
const h = 500;

let goalx = 250;
let goaly = 50;
const goalw = 10;
const goalh = 10;

const startx = 250;
const starty = 450;

let maxBrainSteps = 1000;

let start = false;
let goal;
let dotArray = [];
let generation = 0;
let objArray = [];
let noHitPopulations = 0;


function init(champ) {
  if (!start) return;
  generation++;
  console.log(generation);
  dotArray = [];
  let champBrain;
  if (champ) {
    // allora esiste un campione
    champBrain = new Brain();
    champBrain = champ.brainclone;
    let c = new Dot(champBrain, true);
    dotArray.push(c);
  }
// create dots
  for (let i = 0; i < 500; ++i) {
    let brain = new Brain();

    if (!champBrain) {
      brain.generate();
    } else {
      let newBrain = [];
      champBrain.positions.forEach(function (pos) {
        let rnd = Math.random();
        let poz;
        if (rnd >= 0.95) {
          poz = p5.Vector.random2D();
        } else {
          poz = pos.copy();
        }
        newBrain.push(poz);
      });
      brain.positions = newBrain;
    }
    let dot = new Dot(brain, false);
    dotArray.push(dot);
  }

}

function getChampion() {
  if (!dotArray || dotArray.length == 0) return;
  let champion = dotArray[0];
  let minDist = champion.pos.dist(goal.pos);
  dotArray.forEach(function (dot) {
    let curDist = dot.pos.dist(goal.pos);
    if (curDist < minDist) {
      minDist = curDist;
      champion = dot;
    }
  });
  return champion;
}

function getFirstHit() {
  let champion;
  dotArray.forEach(function (dot) {
    if (goal.hit(dot)) {
      if (!champion) {
        champion = dot;
      } else {
        if (champion.moves > dot.moves) {
          champion = dot;
        }
      }
    }
  });
  return champion;
}

function areAllDead() {
  let allDead = true;
  dotArray.forEach(function (dot) {
    if (!dot.isDead) allDead = false;
  });
  return allDead;
}

function createObstacles() {
  for (var a = [], i = 0; i < 1; ++i) {
    let obj = new Obj(230, 400);
    objArray.push(obj);
  }
}

function drawObstacles() {
  objArray.forEach(function (obj) {
    obj.draw();
  });
}

function killDotOnObstacles() {
  dotArray.forEach(function (dot) {
    if (!dot.isDead) {
      objArray.forEach(function (obj) {
        if (obj.hit(dot)) {
          dot.isDead = true;
        }
      });
    }
  });
}

function mousePressed() {
  if (mouseButton === LEFT) {
    let obj = new Obj(mouseX, mouseY);
    objArray.push(obj);
  }
  if (mouseButton === CENTER) {
    goalx = mouseX;
    goaly = mouseY;
  }
  if (mouseButton === RIGHT) {
    //triangle(23, 75, 50, 20, 78, 75);
  }

}

function keyPressed() {
  if (keyCode == CONTROL) {
    start = true;
  }
}


function setup() {
  createCanvas(w, h);
  frameRate(60);
  goal = new Goal();
  background(255);
  init();
  //createObstacles();
}


function draw() {
  //background(220);

  // draw the goal
  goal.draw();
  ////////////////////

  killDotOnObstacles();
  drawObstacles();

  let hitter = getFirstHit();
  if (hitter || areAllDead()) {
    if (hitter) {
      init(hitter);
    } else {
      //se sono tutti morti
      if (noHitPopulations >= 20) {
        noHitPopulations = 0;
        init();
      } else {
        noHitPopulations++;
        init(getChampion());
      }
    }
  }

  // move dots
  dotArray.forEach(function (dot) {
    if (!dot.isDead) {
      dot.move();
    }
    dot.draw();
  });


}






