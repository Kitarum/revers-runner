export class Player {
  constructor(x, groundY) {
    this.x = x;
    this.groundY = groundY;

    this.speed = 220;
    this.direction = 1;
    this.animationTime = 0;

    // размеры для коллизий/отладки
    this.headRadius = 15;
    this.bodyLen = 35;
    this.legLen = 28;
  }

  update(dt, canvasWidth, groundY) {
    this.groundY = groundY;

    this.x += this.speed * this.direction * dt;

    // отражаемся от краёв CANVAS, не окна
    const margin = 30;
    if (this.x > canvasWidth - margin) {
      this.x = canvasWidth - margin;
      this.direction = -1;
    } else if (this.x < margin) {
      this.x = margin;
      this.direction = 1;
    }

    this.animationTime += dt * 10;
  }

  draw(ctx) {
    // Точка “ступни” персонажа — на земле
    const footY = this.groundY;
    const hipY = footY - this.legLen;
    const bodyTopY = hipY - this.bodyLen;
    const headY = bodyTopY - this.headRadius;

    const legSwing = Math.sin(this.animationTime) * 10;
    const armSwing = Math.sin(this.animationTime) * 10;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    // (DEBUG) маленькая точка, чтобы точно видеть, где он
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x - 2, footY - 2, 4, 4);

    // Голова
    ctx.beginPath();
    ctx.arc(this.x, headY, this.headRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Тело
    ctx.beginPath();
    ctx.moveTo(this.x, bodyTopY);
    ctx.lineTo(this.x, hipY);
    ctx.stroke();

    // Руки
    const shoulderY = bodyTopY + 10;
    ctx.beginPath();
    ctx.moveTo(this.x, shoulderY);
    ctx.lineTo(this.x - 18, shoulderY + armSwing);
    ctx.moveTo(this.x, shoulderY);
    ctx.lineTo(this.x + 18, shoulderY - armSwing);
    ctx.stroke();

    // Ноги
    ctx.beginPath();
    ctx.moveTo(this.x, hipY);
    ctx.lineTo(this.x - 14, footY - legSwing);
    ctx.moveTo(this.x, hipY);
    ctx.lineTo(this.x + 14, footY + legSwing);
    ctx.stroke();
  }
}