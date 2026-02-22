// js/background.js
export class Background {
  constructor() {
    // разные слои с разной скоростью (parallax)
    this.layers = [
      { speedMul: 0.15, offset: 0, draw: this.drawFarTrees.bind(this) },
      { speedMul: 0.35, offset: 0, draw: this.drawNearTrees.bind(this) },
      { speedMul: 1.0, offset: 0, draw: this.drawRoadPattern.bind(this) },
    ];
  }

  update(dt, worldSpeed) {
    for (const layer of this.layers) {
      layer.offset = (layer.offset + worldSpeed * layer.speedMul * dt) % 1000000;
    }
  }

  draw(ctx, w, h, groundY) {
    // небо (простая "текстура" градиентом)
    const g = ctx.createLinearGradient(0, 0, 0, groundY);
    g.addColorStop(0, "#10131a");
    g.addColorStop(1, "#1d2430");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, groundY);

    // слои деревьев
    this.layers[0].draw(ctx, w, groundY, this.layers[0].offset);
    this.layers[1].draw(ctx, w, groundY, this.layers[1].offset);
  }

  drawRoad(ctx, w, h, groundY) {
    // асфальт
    ctx.fillStyle = "#3b3b3b";
    ctx.fillRect(0, groundY, w, h - groundY);

    // слой дорожной разметки/текстуры
    this.layers[2].draw(ctx, w, h, groundY, this.layers[2].offset);

    // линия горизонта дороги (чуть светлее)
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY + 2);
    ctx.lineTo(w, groundY + 2);
    ctx.stroke();
  }

  drawFarTrees(ctx, w, groundY, offset) {
    // дальние деревья: простые треугольники, реже, темнее
    const baseY = groundY - 70;
    const spacing = 140;
    const startX = -spacing - (offset % spacing);

    for (let x = startX; x < w + spacing; x += spacing) {
      const tx = x;
      const height = 40 + ((Math.floor((x + offset) / spacing) * 17) % 18);
      ctx.fillStyle = "#0f1a12";
      // ствол
      ctx.fillRect(tx + 10, baseY - 10, 6, 14);
      // крона
      ctx.beginPath();
      ctx.moveTo(tx, baseY);
      ctx.lineTo(tx + 13, baseY - height);
      ctx.lineTo(tx + 26, baseY);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawNearTrees(ctx, w, groundY, offset) {
    // ближние деревья: больше, ярче, чаще
    const baseY = groundY - 20;
    const spacing = 95;
    const startX = -spacing - (offset % spacing);

    for (let x = startX; x < w + spacing; x += spacing) {
      const tx = x;
      const height = 55 + ((Math.floor((x + offset) / spacing) * 23) % 25);
      ctx.fillStyle = "#173022";
      // ствол
      ctx.fillRect(tx + 14, baseY - 12, 7, 18);

      // крона (2 треугольника)
      ctx.beginPath();
      ctx.moveTo(tx + 2, baseY);
      ctx.lineTo(tx + 17, baseY - height);
      ctx.lineTo(tx + 32, baseY);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#1f3b2a";
      ctx.beginPath();
      ctx.moveTo(tx + 4, baseY - 8);
      ctx.lineTo(tx + 17, baseY - height - 12);
      ctx.lineTo(tx + 30, baseY - 8);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawRoadPattern(ctx, w, h, groundY, offset) {
    // "текстура" дороги: двигающиеся штрихи/шумы + разметка
    // центральная пунктирная линия
    const centerY = groundY + (h - groundY) * 0.5;
    const dashW = 38;
    const gap = 26;
    const period = dashW + gap;
    const startX = -period - (offset % period);

    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let x = startX; x < w + period; x += period) {
      ctx.fillRect(x, centerY, dashW, 4);
    }

    // легкий "шум" точки на асфальте (очень дёшево)
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    const noiseCount = Math.min(300, Math.floor(w / 4));
    for (let i = 0; i < noiseCount; i++) {
      const nx = (i * 17 + offset * 0.7) % w;
      const ny = groundY + ((i * 29) % Math.max(1, (h - groundY)));
      ctx.fillRect(nx, ny, 2, 2);
    }
  }
}