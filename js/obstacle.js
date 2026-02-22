// js/obstacle.js
export const OBSTACLE_TYPE = {
  JUMP: "jump",   // нужно прыгать
  SLIDE: "slide", // нужно подкатиться
};

export class Obstacle {
  constructor(x, groundY, type) {
    this.x = x;
    this.type = type;

    this.groundY = groundY;

    this.width = 48;

    // JUMP: невысокий блок на земле
    // SLIDE: "перекладина" сверху (опасная зона в верхней части)
    if (type === OBSTACLE_TYPE.JUMP) {
      this.height = 34;
      this.y = groundY - this.height;
    } else {
      this.height = 18;
      this.y = groundY - 78; // высота перекладины
    }

    this.offscreen = false;
  }

  update(dt, worldSpeed) {
    this.x -= worldSpeed * dt;
    if (this.x + this.width < -50) this.offscreen = true;
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.width, h: this.height };
  }

  draw(ctx) {
    if (this.type === OBSTACLE_TYPE.JUMP) {
      ctx.fillStyle = "#7a3cff";
    } else {
      ctx.fillStyle = "#00bcd4";
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}