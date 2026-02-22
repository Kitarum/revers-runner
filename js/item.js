// js/item.js
export class Item {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 30;

    // базовое падение
    this.fallSpeed = 220;

    // управление
    this.controlSpeedX = 260;
    this.controlSpeedY = 420;

    this.offscreen = false;
  }

  update(dt, input, canvasWidth, canvasHeight, groundY) {
    // управление
    if (input.left) this.x -= this.controlSpeedX * dt;
    if (input.right) this.x += this.controlSpeedX * dt;
    if (input.down) this.y += this.controlSpeedY * dt;

    // падение
    this.y += this.fallSpeed * dt;

    // держим X в пределах canvas
    const half = this.size / 2;
    this.x = Math.max(half, Math.min(canvasWidth - half, this.x));

    // если улетел вниз — убираем
    if (this.y > canvasHeight + this.size) {
      this.offscreen = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x - this.size / 2, this.y, this.size, this.size);
  }
}