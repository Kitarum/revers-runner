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

    this.worldSpeed = 260;

    this.groundHeight = 140;
    this.groundY = this.h - this.groundHeight;

    this.player = new Player(this.w * 0.22, this.groundY);

    this.items = [];
    this.spawnTimer = 0;
    this.spawnInterval = 1.25;
  }

  get w() {
    return this.canvas._w ?? this.canvas.clientWidth ?? window.innerWidth;
  }

  get h() {
    return this.canvas._h ?? this.canvas.clientHeight ?? window.innerHeight;
  }

  onResize() {
    this.groundY = this.h - this.groundHeight;
    this.player.setGround(this.groundY);
    // удержим игрока в той же относительной позиции
    this.player.baseX = this.w * 0.22;
  }

  update(dt) {
    dt = Math.min(dt, 0.033);

    this.groundY = this.h - this.groundHeight;

    this.bg.update(dt, this.worldSpeed);

    this.player.update(dt, this.w, this.groundY);

    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnItem();
      this.spawnTimer = 0;
    }

    for (const item of this.items) {
      item.update(dt, this.input, this.w, this.h, this.groundY);
    }

    this.items = this.items.filter((item) => !item.offscreen);
  }

  draw() {
    const w = this.w;
    const h = this.h;

    this.ctx.clearRect(0, 0, w, h);

    this.bg.draw(this.ctx, w, h, this.groundY);
    this.bg.drawRoad(this.ctx, w, h, this.groundY);

    this.player.draw(this.ctx);
    for (const item of this.items) item.draw(this.ctx);
  }

  spawnItem() {
    const margin = 40;
    const x = margin + Math.random() * (this.w - margin * 2);
    this.items.push(new Item(x, -40));
  }
}