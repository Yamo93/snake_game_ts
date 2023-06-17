"use strict";
function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "400");
    canvas.setAttribute("height", "400");
    document.body.append(canvas);
    return canvas;
}
const canvas = createCanvas();
const SNAKE_SPEED = 2;
const TILE_COUNT = 20;
let lastRenderTime = 0;
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
}
function clearScreen() {
    const context = canvas.getContext("2d");
    if (!context)
        throw new Error("2d context missing");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
