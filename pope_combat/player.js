class Person {
    constructor(x, y, sprite, size) {
        this.sprite = sprite;
        this.pos = createVector(x, y);
        this.size = size;
        
        this.movements = {
            RIGHT: 'RIGHT',
            LEFT: 'LEFT',
            CROUCH: 'CROUCH',
            STAND: 'STAND',
            PUNCH: 'PUNCH',
        };
        this.direction = this.movements.RIGHT;
        this.action = this.movements.STAND;

        this.isJumping = false;
        this.vel = 0;
        this.acc = 0;
        
        this.status = status.IDLE;
        this.ground = h - this.size;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.direction = this.movements.LEFT;
            this.pos.x += -2;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.direction = this.movements.RIGHT;
            this.pos.x += 2;
        }
        if (keyIsDown(UP_ARROW)) {
            if (!this.isJumping) this.acc = -(10*(this.size/100));
        } 

        this.action = this.movements.STAND;
        if (keyIsDown(DOWN_ARROW)) {
            this.action = this.movements.CROUCH;
        }
        if (keyIsDown(65)) {
            this.action = this.movements.PUNCH;
        }

        //update position
        this.acc += gravity*(this.size/100);
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
        return this.sprite[this.action][this.direction];
    }

    draw() {
        fill(0);
        image(
            this.getImageByStatus(), 
            this.pos.x, 
            this.pos.y
        );
    }

}