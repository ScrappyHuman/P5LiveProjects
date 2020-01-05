const w = 800;
const h = 400;

const DROPS_NUMBER = 2000;

var drops = [];


function createDrops() {
    for (let i = 0; i < DROPS_NUMBER; i++) {
        drops.push(new RainDrop(random(1, w), random(-h * 1.5, -10)));
    }

}

function setup() {
    createCanvas(w, h);
    frameRate(120);
    createDrops();
    drop = new RainDrop(50, 50);
}

function draw() {
    background(0);
    drops.forEach(function (drop) {
        drop.update();
        drop.draw();
    });
}