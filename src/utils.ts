import { TILE_COUNT } from "./const.js";

export function tileSize(canvas: HTMLCanvasElement) {
  return canvas.width / TILE_COUNT - 2;
}
