class Goal {

    constructor() {
        this.pos = createVector(goalx, goaly);
    }


    draw() {
        fill('red');
        stroke('red');
        rect(goalx, goaly, goalw, goalh);
        fill('black');
        stroke('black');
    }


    hit(dot) {
        if (dot.pos.x >= goalx && dot.pos.x <= goalx + goalw) {
            if (dot.pos.y >= goaly && dot.pos.y <= goaly + goalh) {
                return true;
            }
        }
        return false;
    }

}