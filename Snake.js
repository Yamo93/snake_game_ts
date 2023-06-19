import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";
const SNAKE_GROWTH = 2;
export class Snake {
    constructor(canvas) {
        this.head = { x: 10, y: 10 };
        this.body = [
            { x: 8, y: 10 },
            { x: 9, y: 10 },
        ];
        this.velocity = { x: 0, y: 0 };
        this.canvas = canvas;
        const context = this.canvas.getContext("2d");
        if (!context)
            throw new Error("2d context missing");
        this.context = context;
    }
    updatePosition() {
        if (this.velocity.x === 0 && this.velocity.y === 0)
            return;
        for (let i = 0; i < this.body.length - 1; i++) {
            const p = this.body[i];
            p.x = this.body[i + 1].x;
            p.y = this.body[i + 1].y;
        }
        this.body[this.body.length - 1].x = this.head.x;
        this.body[this.body.length - 1].y = this.head.y;
        this.head.x = this.head.x + this.velocity.x;
        this.head.y = this.head.y + this.velocity.y;
    }
    update() {
        this.updatePosition();
    }
    hitsWall() {
        return (this.head.x > TILE_COUNT ||
            this.head.x < 0 ||
            this.head.y > TILE_COUNT ||
            this.head.y < 0);
    }
    runsIntoItself() {
        return this.body.some((part) => part.x === this.head.x && part.y === this.head.y);
    }
    eats(food) {
        return this.head.x === food.x && this.head.y === food.y;
    }
    grow() {
        for (let i = 0; i < SNAKE_GROWTH; i++) {
            this.body.unshift({
                x: this.body[0].x + this.velocity.x,
                y: this.body[0].y + this.velocity.y,
            });
        }
    }
    collidesWith(position) {
        if (this.head.x === position.x && this.head.y === position.y) {
            return true;
        }
        if (this.body.some((part) => part.x === position.x && part.y === position.y)) {
            return true;
        }
        return false;
    }
    draw() {
        this.context.fillStyle = "orange";
        this.context.fillRect(this.head.x * TILE_COUNT, this.head.y * TILE_COUNT, tileSize(this.canvas), tileSize(this.canvas));
        for (const part of this.body) {
            this.context.fillRect(part.x * TILE_COUNT, part.y * TILE_COUNT, tileSize(this.canvas), tileSize(this.canvas));
        }
    }
    move(direction) {
        switch (direction) {
            case "up":
                if (this.velocity.y === 1)
                    break;
                this.velocity.y = -1;
                this.velocity.x = 0;
                break;
            case "down":
                if (this.velocity.y === -1)
                    break;
                this.velocity.y = 1;
                this.velocity.x = 0;
                break;
            case "left":
                if (this.velocity.x === 1)
                    break;
                if (this.velocity.x === 0 && this.velocity.y === 0)
                    break;
                this.velocity.y = 0;
                this.velocity.x = -1;
                break;
            case "right":
                if (this.velocity.x === -1)
                    break;
                this.velocity.y = 0;
                this.velocity.x = 1;
                break;
            default:
                throw new Error("Move direction not supported");
        }
    }
    reset() {
        this.head.x = 10;
        this.head.y = 10;
        this.body.splice(0, this.body.length);
        this.body.push({ x: 8, y: 10 }, { x: 9, y: 10 });
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}
//# sourceMappingURL=Snake.js.map