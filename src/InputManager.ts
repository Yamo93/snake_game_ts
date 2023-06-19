import { Snake } from "./Snake.js";

export class InputManager {
  constructor(private readonly snake: Snake) {}

  handleKeyboardEvents() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.snake.move("up");
          break;
        case "ArrowDown":
          this.snake.move("down");
          break;
        case "ArrowLeft":
          this.snake.move("left");
          break;
        case "ArrowRight":
          this.snake.move("right");
          break;
      }
    });
  }
}
