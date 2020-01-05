class Obj {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.x = this.position.x;
        this.y = this.position.y;
        this.w = 60;
        this.h = 30;
    }

    draw() {
        fill('blue');
        stroke('blue');
        rect(this.position.x, this.position.y, this.w, this.h);
    }

    hit(dot) {
        if (dot.pos.x >= this.x && dot.pos.x <= this.x + this.w) {
            if (dot.pos.y >= this.y && dot.pos.y <= this.y + this.h) {
                return true;
            }
        }
        return false;
    }

}