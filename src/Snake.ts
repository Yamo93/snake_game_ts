import { Food } from "./Food.js";
import { TILE_COUNT } from "./const.js";
import { tileSize } from "./utils.js";

type MoveDirection = "up" | "down" | "left" | "right";

type Coordinates = { x: number; y: number };

type Head = Coordinates;

type Velocity = Coordinates;

type Body = Coordinates[];

const SNAKE_GROWTH = 2;

export class Snake {
  private readonly head: Head;
  private readonly velocity: Velocity;
  private readonly context: CanvasRenderingContext2D;
  private readonly canvas: HTMLCanvasElement;
  private readonly food: Food;
  private readonly body: Body;

  constructor(canvas: HTMLCanvasElement, food: Food) {
    this.food = food;
    this.head = { x: 10, y: 10 };
    this.body = [
      { x: 8, y: 10 },
      { x: 9, y: 10 },
    ];
    this.velocity = { x: 0, y: 0 };
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    this.context = context;
  }

  private updatePosition() {
    if (this.velocity.x === 0 && this.velocity.y === 0) return;
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
    this.ateFood();
    this.updatePosition();
    this.lost();
  }

  private lost() {
    // handled by game manager
    const outOfBounds =
      this.head.x > TILE_COUNT ||
      this.head.x < 0 ||
      this.head.y > TILE_COUNT ||
      this.head.y < 0;
    const ranIntoItself = this.body.some(
      (part) => part.x === this.head.x && part.y === this.head.y
    );
    if (outOfBounds || ranIntoItself) {
      if (confirm("You lost! Click OK to restart.")) {
        window.location.reload();
      }
    }
  }

  private ateFood() {
    if (this.head.x === this.food.x && this.head.y === this.food.y) {
      for (let i = 0; i < SNAKE_GROWTH; i++) {
        this.body.unshift({
          x: this.body[0].x + this.velocity.x,
          y: this.body[0].y + this.velocity.y,
        });
      }
      // should probably be handled by the game manager
      let randomFoodPosition = this.getRandomPosition();
      while (this.collidesWith(randomFoodPosition)) {
        randomFoodPosition = this.getRandomPosition();
      }
      this.food.setPosition(randomFoodPosition);
    }
  }

  private getRandomPosition() {
    return {
      x: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
      y: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
    };
  }

  private collidesWith(position: Coordinates): boolean {
    if (this.head.x === position.x && this.head.y === position.y) {
      return true;
    }
    if (
      this.body.some((part) => part.x === position.x && part.y === position.y)
    ) {
      return true;
    }
    return false;
  }
  draw() {
    this.context.fillStyle = "orange";
    this.context.fillRect(
      this.head.x * TILE_COUNT,
      this.head.y * TILE_COUNT,
      tileSize(this.canvas),
      tileSize(this.canvas)
    );
    for (const part of this.body) {
      this.context.fillRect(
        part.x * TILE_COUNT,
        part.y * TILE_COUNT,
        tileSize(this.canvas),
        tileSize(this.canvas)
      );
    }
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
        if (this.velocity.x === 0 && this.velocity.y === 0) break;
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
