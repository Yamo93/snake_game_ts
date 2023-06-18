import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";

type MoveDirection = "up" | "down" | "left" | "right";

type Coordinates = { x: number; y: number };

type Head = Coordinates;

type Velocity = Coordinates;

export class Snake {
  private readonly head: Head;
  private readonly velocity: Velocity;
  private readonly context: CanvasRenderingContext2D;
  private readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.head = { x: 10, y: 10 };
    this.velocity = { x: 0, y: 0 };
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    this.context = context;
  }

  private updatePosition() {
    this.head.x = this.head.x + this.velocity.x;
    this.head.y = this.head.y + this.velocity.y;
  }

  update() {
    this.updatePosition();
  }

  draw() {
    this.context.fillStyle = "orange";
    this.context.fillRect(
      this.head.x * TILE_COUNT,
      this.head.y * TILE_COUNT,
      tileSize(this.canvas),
      tileSize(this.canvas)
    );
  }

  move(direction: MoveDirection) {
    switch (direction) {
      case "up":
        if (this.velocity.y === 1) break;
        this.velocity.y = -1;
        this.velocity.x = 0;
        break;
      case "down":
        if (this.velocity.y === -1) break;
        this.velocity.y = 1;
        this.velocity.x = 0;
        break;
      case "left":
        if (this.velocity.x === 1) break;
        this.velocity.y = 0;
        this.velocity.x = -1;
        break;
      case "right":
        if (this.velocity.x === -1) break;
        this.velocity.y = 0;
        this.velocity.x = 1;
        break;
      default:
        throw new Error("Move direction not supported");
    }
  }
}
