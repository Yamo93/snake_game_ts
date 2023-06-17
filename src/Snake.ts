import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";

export class Snake {
  private _headX = 10;
  private _headY = 10;
  private xVelocity = 0;
  private yVelocity = 0;
  private readonly context: CanvasRenderingContext2D;
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    this.context = context;
  }

  get headX() {
    return this._headX;
  }

  get headY() {
    return this._headY;
  }

  draw() {
    this.context.fillStyle = "orange";
    this.context.fillRect(
      this._headX * TILE_COUNT,
      this._headY * TILE_COUNT,
      tileSize(this.canvas),
      tileSize(this.canvas)
    );
  }
}
