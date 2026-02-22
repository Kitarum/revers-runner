import { Player } from './player.js';
import { Item } from './item.js';
import { Input } from './input.js';

export class Game {
    constructor(canvas, ctx) {
        import { Player } from './player.js';
import { Item } from './item.js';
import { Input } from './input.js';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.input = new Input();

    // Земля (линия дороги)
    this.groundHeight = 100;
    this.groundY = this.canvas.height - this.groundHeight;

    // Старт по центру, чтобы точно видел
    this.player = new Player(this.canvas.width * 0.2, this.groundY);

    this.items = [];
    this.spawnTimer = 0;
    this.spawnInterval = 2;
  }

  update(dt) {
    // если вдруг dt огромный (первый кадр/сворачивал окно) — ограничим
    dt = Math.min(dt, 0.033);

    // на случай изменения размеров canvas
    this.groundY = this.canvas.height - this.groundHeight;

    this.player.update(dt, this.canvas.width, this.groundY);

    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnItem();
      this.spawnTimer = 0;
    }

    this.items.forEach(item => item.update(dt, this.input));
    this.items = this.items.filter(item => !item.offscreen);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Дорога
    this.ctx.fillStyle = "#444";
    this.ctx.fillRect(0, this.groundY, this.canvas.width, this.groundHeight);

    this.player.draw(this.ctx);

    this.items.forEach(item => item.draw(this.ctx));
  }

  spawnItem() {
    const x = Math.random() * this.canvas.width;
    this.items.push(new Item(x, 0));
  }
}

    update(dt) {
        this.player.update(dt);

        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnItem();
            this.spawnTimer = 0;
        }

        this.items.forEach(item => item.update(dt, this.input));
        this.items = this.items.filter(item => !item.offscreen);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw ground
        this.ctx.fillStyle = "#444";
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

        this.player.draw(this.ctx);

        this.items.forEach(item => item.draw(this.ctx));
    }

    spawnItem() {
        const x = Math.random() * this.canvas.width;
        this.items.push(new Item(x, 0));
    }
}