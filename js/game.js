// js/game.js
import { Player } from "./player.js";
import { Item } from "./item.js";
import { Input } from "./input.js";
import { Background } from "./background.js";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.input = new Input();
    this.bg = new Background();

    // Мировая скорость "бега вперёд" (фон едет назад)
    this.worldSpeed = 260;

    // Земля (дорога)
    this.groundHeight = 140;
    this.groundY = this.canvas.height - this.groundHeight;

    // Игрок держится примерно в одном месте (раннер)
    this.player = new Player(this.canvas.width * 0.22, this.groundY);

    this.items = [];
    this.spawnTimer = 0;
    this.spawnInterval = 1.25;
  }

  onResize() {
    this.groundY = this.canvas.height - this.groundHeight;
    this.player.setGround(this.groundY);
  }

  update(dt) {
    // защита от огромного dt (сворачивание, лаги)
    dt = Math.min(dt, 0.033);

    // пересчёт земли (на всякий, если размеры поменялись)
    this.groundY = this.canvas.height - this.groundHeight;

    // фон скроллится — создаём “ощущение бега”
    this.bg.update(dt, this.worldSpeed);

    // игрок “бежит”, но не путешествует по X как камера
    this.player.update(dt, this.canvas.width, this.groundY);

    // спавн предметов
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnItem();
      this.spawnTimer = 0;
    }

    // предметы падают + управляются
    for (const item of this.items) {
      item.update(dt, this.input, this.canvas.width, this.canvas.height, this.groundY);
    }

    this.items = this.items.filter((item) => !item.offscreen);
  }

  draw() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.clearRect(0, 0, w, h);

    // фон + деревья
    this.bg.draw(this.ctx, w, h, this.groundY);

    // дорога + “текстура/разметка”
    this.bg.drawRoad(this.ctx, w, h, this.groundY);

    // игрок и предметы
    this.player.draw(this.ctx);
    for (const item of this.items) item.draw(this.ctx);
  }

  spawnItem() {
    // спавним сверху в пределах canvas
    const margin = 40;
    const x = margin + Math.random() * (this.canvas.width - margin * 2);
    this.items.push(new Item(x, -40));
  }
}