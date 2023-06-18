import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";

export class Food {
  private _x: number;
  private _y: number;
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this._x = 5;
    this._y = 5;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    this.context = context;
  }

  draw() {
    this.context.fillStyle = "red";
    this.context.fillRect(
      this._x * TILE_COUNT,
      this._y * TILE_COUNT,
      tileSize(this.canvas),
      tileSize(this.canvas)
    );
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
