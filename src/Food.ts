import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";

export class Food {
  private x: number;
  private y: number;
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.x = 5;
    this.y = 5;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    this.context = context;
  }

  draw() {
    this.context.fillStyle = "red";
    this.context.fillRect(
      this.x * TILE_COUNT,
      this.y * TILE_COUNT,
      tileSize(this.canvas),
      tileSize(this.canvas)
    );
  }
}
