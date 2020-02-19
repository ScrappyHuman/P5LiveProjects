class Images {
    constructor() {
        this.move_r;
        this.move_l;
        this.punch_r;
        this.punch_l;
        this.crouch_r;
        this.crouch_l;
    }
}

let w = 400;
let h = 200;
let bgccolor = 220;
let person;
let gravity = 0.5;
let img;
let bg;
let images = new Images();

const move = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    CROUCH: 'CROUCH',
    STAND: 'STAND',
    PUNCH: 'PUNCH',
};

class Person {

    constructor(x, y) {
        this.isJumping = false;
        this.vel = 0;
        this.acc = 0;
        this.movement =
        this.status = status.IDLE;
        this.ground = h - sprite.STAND.LEFT.height;
        this.pos = createVector(x, y);
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.movement = move.LEFT;
            this.pos.x += -2;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.movement = move.RIGHT;
            this.pos.x += 2;
        }
        if (keyIsDown(UP_ARROW)) {
            if (!this.isJumping) this.acc = -10;
        }
        if (keyIsDown(DOWN_ARROW)) {
            //this.pos.y += 0;
        }
        //update position
        this.acc += gravity;
        this.vel = this.acc;
        this.pos.y += this.vel;
        if (this.pos.y >= this.ground) {
            this.isJumping = false;
            this.acc = 0;
            this.vel = 0;
            this.pos.y = this.ground;
        } else {
            this.isJumping = true;
        }
    }

    getImageByStatus() {
        let isCrouch = false;
        let isAttacking = false;
        if (keyIsDown(DOWN_ARROW)) isCrouch = true;
        // 65 == a
        if (keyIsDown(65)) isAttacking = true;
        switch (this.movement) {
            case move.RIGHT:
                if (isAttacking) return sprite.PUNCH.RIGHT;
                if (isCrouch) return sprite.CROUCH.RIGHT;
                return sprite.STAND.RIGHT;
            case move.LEFT:
            default:
                if (isAttacking) return sprite.PUNCH.LEFT;
                if (isCrouch) return sprite.CROUCH.LEFT;
                return sprite.STAND.LEFT;
        }
    }

    draw() {
        fill(0);
        image(this.getImageByStatus(), this.pos.x, this.pos.y);
    }

}

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

    person = new Person(50, 50);
    createCanvas(w, h);
}

function draw() {
    image(bg, 0, 0);
    person.move();
    person.draw();
}