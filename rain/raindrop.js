class RainDrop {

    constructor(x, y) {
        this.startPos = createVector(x, y);
        this.pos = this.startPos.copy();
        this.mass = random(5, 15);
        this.acc = 0;
        this.vel = 0;
    }

    update() {
        this.acc = 0.05 * (this.mass / 3);
        //this.vel += this.acc;
        //this.pos.add(0,this.vel);
        this.pos.add(0, this.acc * 10);
        if (this.pos.y >= h) {
            this.pos = this.startPos.copy();
            this.vel = 0;
        }
    }

    draw() {
        fill(255);
        noStroke();
        rect(this.pos.x, this.pos.y, 1 * (this.mass / 5 * 0.5), this.mass);
    }

}