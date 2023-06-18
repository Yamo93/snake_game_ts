import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";
export class Food {
    constructor(canvas) {
        this.canvas = canvas;
        this._x = 5;
        this._y = 5;
        const context = this.canvas.getContext("2d");
        if (!context)
            throw new Error("2d context missing");
        this.context = context;
    }
    draw() {
        this.context.fillStyle = "red";
        this.context.fillRect(this._x * TILE_COUNT, this._y * TILE_COUNT, tileSize(this.canvas), tileSize(this.canvas));
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    setPosition(position) {
        this._x = position.x;
        this._y = position.y;
    }
}
//# sourceMappingURL=Food.js.map