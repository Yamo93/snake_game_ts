import { Food } from "./Food.js";
import { GameManager } from "./GameManager.js";
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
  document.body.append(restartButton);
  return restartButton;
}

const canvas = createCanvas();
const restartButton = createRestartButton();

const context = canvas.getContext("2d");
if (!context) throw new Error("2d context missing");

const food = new Food(canvas);
const snake = new Snake(canvas);
const inputManager = new InputManager(snake);
const gameManager = new GameManager(snake, food, canvas);
restartButton.addEventListener("click", () => gameManager.restartGame());
window.requestAnimationFrame((time) => gameManager.gameLoop(time));
inputManager.handleKeyboardEvents();
