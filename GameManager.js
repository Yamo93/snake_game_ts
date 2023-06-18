import { SNAKE_SPEED, TILE_COUNT } from "./const.js";
export class GameManager {
    constructor(snake, food, canvas, lastRenderTime = 0, gameOver = false) {
        this.snake = snake;
        this.food = food;
        this.canvas = canvas;
        this.lastRenderTime = lastRenderTime;
        this.gameOver = gameOver;
    }
    gameLoop(currentRenderTime) {
        if (this.gameOver)
            return;
        window.requestAnimationFrame((time) => this.gameLoop(time));
        const timeSinceLastRenderInSeconds = (currentRenderTime - this.lastRenderTime) / 1000;
        if (timeSinceLastRenderInSeconds < 1 / SNAKE_SPEED)
            return;
        this.lastRenderTime = currentRenderTime;
        this.update();
        this.draw();
    }
    update() {
        this.handleEat();
        this.snake.update();
        this.handleLoss();
    }
    draw() {
        this.clearScreen();
        this.snake.draw();
        this.food.draw();
    }
    handleEat() {
        if (this.snake.eats(this.food)) {
            this.snake.grow();
            this.moveFood();
        }
    }
    moveFood() {
        let randomFoodPosition = this.getRandomPosition();
        while (this.snake.collidesWith(randomFoodPosition)) {
            randomFoodPosition = this.getRandomPosition();
        }
        this.food.setPosition(randomFoodPosition);
    }
    getRandomPosition() {
        return {
            x: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
            y: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
        };
    }
    handleLoss() {
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
        this.snake.reset();
    }
    clearScreen() {
        const context = this.canvas.getContext("2d");
        if (!context)
            throw new Error("2d context missing");
        context.fillStyle = "black";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//# sourceMappingURL=GameManager.js.map