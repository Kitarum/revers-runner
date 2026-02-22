export class Item {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.speed = 200;
        this.offscreen = false;
    }

    update(dt, input) {
        if (input.left) this.x -= 200 * dt;
        if (input.right) this.x += 200 * dt;
        if (input.down) this.y += 400 * dt;

        this.y += this.speed * dt;

        if (this.y > window.innerHeight) {
            this.offscreen = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - this.size / 2, this.y, this.size, this.size);
    }
}