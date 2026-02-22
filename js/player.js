// js/player.js
export class Player {
  constructor(x, groundY) {
    this.baseX = x;          // якорь по X (раннер)
    this.x = x;
    this.groundY = groundY;

    this.animationTime = 0;

    // размеры
    this.headRadius = 15;
    this.bodyLen = 35;
    this.legLen = 28;
  }

  setGround(groundY) {
    this.groundY = groundY;
  }

  update(dt, canvasWidth, groundY) {
    this.groundY = groundY;

    // держим игрока в фиксированной позиции,
    // но слегка “дышим”, чтобы не выглядело как статуя
    const breathe = Math.sin(this.animationTime * 0.6) * 1.5;
    this.x = Math.max(30, Math.min(canvasWidth - 30, this.baseX + breathe));

    // скорость анимации ног/рук
    this.animationTime += dt * 10;
  }

  draw(ctx) {
    const footY = this.groundY;
    const hipY = footY - this.legLen;
    const bodyTopY = hipY - this.bodyLen;
    const headY = bodyTopY - this.headRadius;

    const legSwing = Math.sin(this.animationTime) * 10;
    const armSwing = Math.sin(this.animationTime) * 10;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

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

    // Ноги (бег)
    ctx.beginPath();
    ctx.moveTo(this.x, hipY);
    ctx.lineTo(this.x - 14, footY - legSwing);
    ctx.moveTo(this.x, hipY);
    ctx.lineTo(this.x + 14, footY + legSwing);
    ctx.stroke();
  }
}