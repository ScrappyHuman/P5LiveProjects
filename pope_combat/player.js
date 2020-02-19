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