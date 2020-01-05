class Brain {

    constructor() {
        this.positions = [];
        this.step = 0;
    }

    generate() {
        for (var a = [], i = 0; i < maxBrainSteps; ++i) {
            let random = Math.random();
            let posx = Math.random() > 0.5 ? 1 : -1;
            let posy = Math.random() > 0.5 ? 1 : -1;
            this.positions.push(createVector(posx, posy));
        }

    }

    getStep() {
        if (this.step >= maxBrainSteps) return;
        var newStep = this.positions[this.step];
        this.step++;
        return newStep;
    }

    clone() {
        var clone = new Brain();
        this.positions.forEach(function (pos) {
            clone.positions.push(pos);
        });
        return clone;
    }

}