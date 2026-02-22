export class Input {
    constructor() {
        this.left = false;
        this.right = false;
        this.down = false;

        window.addEventListener('keydown', e => {
            if (e.key === 'a') this.left = true;
            if (e.key === 'd') this.right = true;
            if (e.key === 's') this.down = true;
        });

        window.addEventListener('keyup', e => {
            if (e.key === 'a') this.left = false;
            if (e.key === 'd') this.right = false;
            if (e.key === 's') this.down = false;
        });
    }
