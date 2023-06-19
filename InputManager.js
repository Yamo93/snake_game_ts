export class InputManager {
    constructor(snake) {
        this.snake = snake;
    }
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
//# sourceMappingURL=InputManager.js.map