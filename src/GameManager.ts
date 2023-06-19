import { Food } from "./Food.js";
import { Snake } from "./Snake.js";
import { SNAKE_SPEED, TILE_COUNT } from "./const.js";

export class GameManager {
  constructor(
    private readonly snake: Snake,
    private readonly food: Food,
    private readonly canvas: HTMLCanvasElement,
    private lastRenderTime = 0,
    private gameOver = false,
    private score = 0
  ) {}

  gameLoop(currentRenderTime: number) {
    if (this.gameOver) return;
    window.requestAnimationFrame((time) => this.gameLoop(time));
    const timeSinceLastRenderInSeconds =
      (currentRenderTime - this.lastRenderTime) / 1000;
    if (timeSinceLastRenderInSeconds < 1 / SNAKE_SPEED) return;

    this.lastRenderTime = currentRenderTime;

    this.update();
    this.draw();
  }

  private update() {
    this.handleEat();
    this.snake.update();
    this.handleLoss();
  }

  private draw() {
    this.clearScreen();
    this.snake.draw();
    this.food.draw();
    this.drawScore();
  }

  private handleEat() {
    if (this.snake.eats(this.food)) {
      this.snake.grow();
      this.moveFood();
      this.score++;
    }
  }

  private moveFood() {
    let randomFoodPosition = this.getRandomPosition();
    while (this.snake.collidesWith(randomFoodPosition)) {
      randomFoodPosition = this.getRandomPosition();
    }
    this.food.setPosition(randomFoodPosition);
  }

  private getRandomPosition() {
    return {
      x: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
      y: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
    };
  }

  private handleLoss() {
    if (this.snake.hitsWall() || this.snake.runsIntoItself()) {
      this.gameOver = true;
      if (confirm("You lost. Press OK to restart the game.")) {
        this.restartGame();
      }
    }
  }

  restartGame() {
    this.clearScreen();
    this.gameOver = false;
    window.requestAnimationFrame((time) => this.gameLoop(time));
    this.lastRenderTime = 0;
    this.score = 0;
    this.snake.reset();
  }

  private clearScreen() {
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    context.fillStyle = "black";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawScore() {
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("2d context missing");
    context.fillStyle = "white";
    context.fillText("Score: " + this.score, 350, 15);
  }
}
