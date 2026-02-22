// js/main.js
import { Game } from "./game.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);

  // css size
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;

  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";

  // real buffer size
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);

  // нормализуем координаты под CSS-пиксели
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

const game = new Game(canvas, ctx);
game.onResize();

// debounce resize
let resizeT = 0;
window.addEventListener("resize", () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => {
    resizeCanvas();
    game.onResize();
  }, 80);
});

let lastTime = 0;
function gameLoop(timestamp) {
  const dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  game.update(dt);
  game.draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);