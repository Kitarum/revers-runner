// js/input.js
export class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.down = false;

    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if (k === "a" || k === "arrowleft") this.left = true;
      if (k === "d" || k === "arrowright") this.right = true;
      if (k === "s" || k === "arrowdown") this.down = true;
    });

    window.addEventListener("keyup", (e) => {
      const k = e.key.toLowerCase();
      if (k === "a" || k === "arrowleft") this.left = false;
      if (k === "d" || k === "arrowright") this.right = false;
      if (k === "s" || k === "arrowdown") this.down = false;
    });
  }
}