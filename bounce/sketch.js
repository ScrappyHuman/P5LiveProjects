const w = 500;
const h = 500;

const gravity = 1;

var ball;

function setup() {
    createCanvas(w, h);
    ball = new Ball(w / 2, 50, 30);
}

function draw() {
    background(0);
    if (ball.isDead) ball = new Ball(w / 2, 50, 30);
    ball.move();
    ball.draw();
}