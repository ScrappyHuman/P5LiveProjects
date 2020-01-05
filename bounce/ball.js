class Ball {

    constructor(x, y, mass) {
        this.pos = createVector(x, y);
        this.isDead = false;
        this.acc = 0;
        this.vel = 0;
        this.mass = mass;
    }

    move() {
        if (this.isDead) return;
        this.acc = this.mass * gravity * 0.05;
        this.vel += this.acc;
        this.pos.add(0, this.vel);
        if ((this.pos.y + this.mass / 2 > h)) {
            this.vel = this.vel * -1;
            if (abs(this.vel) < this.mass / 2) {
                this.isDead = true;
            }
        }
    }

    draw() {
        fill(255);
        circle(this.pos.x, this.pos.y, this.mass);
    }

}