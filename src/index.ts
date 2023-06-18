import { Food } from "./Food.js";
import { InputManager } from "./InputManager.js";
import { Snake } from "./Snake.js";
import { SNAKE_SPEED, TILE_COUNT } from "./const.js";

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
const snake = new Snake(canvas);
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
  handleEat();
  snake.update();
  handleLoss(snake);
}

function handleEat() {
  if (snake.eats(food)) {
    snake.grow();
    moveFood();
  }
}

function moveFood() {
  let randomFoodPosition = getRandomPosition();
  while (snake.collidesWith(randomFoodPosition)) {
    randomFoodPosition = getRandomPosition();
  }
  food.setPosition(randomFoodPosition);
}

function getRandomPosition() {
  return {
    x: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
    y: Math.abs(Math.floor(Math.random() * TILE_COUNT) - 1),
  };
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
  if (snake.hitsWall() || snake.runsIntoItself()) {
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
