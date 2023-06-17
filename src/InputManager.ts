import { Snake } from "./Snake.js";

export class InputManager {
  private readonly snake: Snake;
  constructor(snake: Snake) {
    this.snake = snake;
  }

  handleKeyboardEvents() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.snake.moveUp();
          break;
        case "ArrowDown":
          this.snake.moveDown();
          break;
        case "ArrowLeft":
          this.snake.moveLeft();
          break;
        case "ArrowRight":
          this.snake.moveRight();
          break;
        default:
          return;
      }
    });
  }
}
