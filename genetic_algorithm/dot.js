class Dot {

    constructor(brain, ischamp) {
        this.pos = createVector(startx, starty);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.moves = 0;
        this.isChampion = ischamp;
        this.brain = brain;
        let brainclone = brain.clone();
        this.brainclone = brainclone;
        this.isDead = false;
    }

    draw() {
        fill(0);
        stroke(0);
        if (this.isChampion) {
            fill('red');
            stroke('red');
            rect(this.pos.x, this.pos.y, 5, 5);
            fill(0);
            stroke(0);
            return;
        }
        rect(this.pos.x, this.pos.y, 1, 1);
    }

    move() {
        this.moves++;
        let newAcc = this.brain.getStep();
        this.acc = newAcc;
        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        // is he dead?
        if (newAcc == undefined) {
            this.isDead = true;
            return;
        }
        if (this.pos.x >= w || this.pos.x <= 0) {
            this.isDead = true;
            return;
        }
        if (this.pos.y >= h || this.pos.y <= 0) {
            this.isDead = true;
        }
    }
}