import { Snake } from "./Snake.js";
import { SNAKE_SPEED } from "./const.js";
function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "400");
    canvas.setAttribute("height", "400");
    document.body.append(canvas);
    return canvas;
}
const canvas = createCanvas();
const context = canvas.getContext("2d");
if (!context)
    throw new Error("2d context missing");
let lastRenderTime = 0;
const snake = new Snake(canvas);
function gameLoop(currentRenderTime) {
    window.requestAnimationFrame(gameLoop);
    const timeSinceLastRenderInSeconds = (currentRenderTime - lastRenderTime) / 1000;
    if (timeSinceLastRenderInSeconds < 1 / SNAKE_SPEED)
        return;
    lastRenderTime = currentRenderTime;
    update();
    draw();
}
window.requestAnimationFrame(gameLoop);
function update() { }
function draw() {
    clearScreen();
    snake.draw();
}
function clearScreen() {
    const context = canvas.getContext("2d");
    if (!context)
        throw new Error("2d context missing");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
