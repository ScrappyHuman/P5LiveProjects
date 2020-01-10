let w = innerWidth;
let h = w/2;
let gravity = 0.5;

let img;
let bg;
let person;


function preload() {
    img = loadImage('assets/papa.png');
    bg = loadImage('assets/bg.jpg');
}

function setup() {
    img.resize(2*h/5, 3*h/5);
    let size = img.width/2;
    sprite = {
        STAND : {
            RIGHT : img.get(0*size,0,size,size),
            LEFT : img.get(1*size,0,size,size),
        },
        PUNCH : {
            RIGHT : img.get(0*size,1*size,size,size),
            LEFT : img.get(1*size,1*size,size,size),
        },
        CROUCH : {
            RIGHT : img.get(0*size,2*size,size,size),
            LEFT : img.get(1*size,2*size,size,size),
        },
    }

    person = new Person(50, 50, sprite, size);
    createCanvas(w, h);
}

function draw() {
    background(bg);
    person.move();
    person.draw();
}