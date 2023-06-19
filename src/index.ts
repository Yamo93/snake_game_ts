import { Food } from "./Food.js";
import { GameManager } from "./GameManager.js";
import { InputManager } from "./InputManager.js";
import { Snake } from "./Snake.js";

function createHeading(text: string): HTMLHeadingElement {
  const heading = document.createElement("h1");
  heading.textContent = text;
  return heading;
}

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", width.toString());
  canvas.setAttribute("height", height.toString());
  return canvas;
}

function createButton(label: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = label;
  return button;
}

const topHeading = createHeading("Snake Game");
const canvas = createCanvas(400, 400);
const restartButton = createButton("Restart game");

document.body.append(topHeading);
document.body.append(canvas);
document.body.append(restartButton);

const context = canvas.getContext("2d");
if (!context) throw new Error("2d context missing");

const food = new Food(canvas);
const snake = new Snake(canvas);
const inputManager = new InputManager(snake);
const gameManager = new GameManager(snake, food, canvas);

restartButton.addEventListener("click", () => gameManager.restartGame());
window.requestAnimationFrame((time) => gameManager.gameLoop(time));
inputManager.handleKeyboardEvents();
