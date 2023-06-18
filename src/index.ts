import { Food } from "./Food.js";
import { InputManager } from "./InputManager.js";
import { Snake } from "./Snake.js";
import { SNAKE_SPEED } from "./const.js";

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", "400");
  canvas.setAttribute("height", "400");
  document.body.append(canvas);
  return canvas;
}

function createRestartButton(): HTMLButtonElement {
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart game";
  restartButton.addEventListener("click", () => restartGame());
  document.body.append(restartButton);
  return restartButton;
}

const canvas = createCanvas();
createRestartButton();

const context = canvas.getContext("2d");
if (!context) throw new Error("2d context missing");

let lastRenderTime = 0;

const food = new Food(canvas);
const snake = new Snake(canvas, food);
const inputManager = new InputManager(snake);
let gameOver = false;
let requestId = 0;

function gameLoop(currentRenderTime: number) {
  if (gameOver) return;
  requestId = window.requestAnimationFrame(gameLoop);
  const timeSinceLastRenderInSeconds =
    (currentRenderTime - lastRenderTime) / 1000;
  if (timeSinceLastRenderInSeconds < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentRenderTime;

  update();
  draw();
}

requestId = window.requestAnimationFrame(gameLoop);
inputManager.handleKeyboardEvents();

function update() {
  snake.update();
  handleLoss(snake);
}

function draw() {
  clearScreen();
  snake.draw();
  food.draw();
}

function clearScreen() {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("2d context missing");
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function handleLoss(snake: Snake) {
  if (snake.hitWall() || snake.ranIntoItself()) {
    gameOver = true;
    if (confirm("You lost. Press OK to restart the game.")) {
      restartGame();
    }
  }
}

function restartGame() {
  clearScreen();
  gameOver = false;
  requestId = window.requestAnimationFrame(gameLoop);
  lastRenderTime = 0;
  snake.reset();
}
