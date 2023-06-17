let isWorldSaved = false;
export function saveTheWorld() {
    if (isWorldSaved) {
        return `Too late, world has already been saved!`;
    }
    else {
        isWorldSaved = true;
        return `Hurray, you just saved the world!`;
    }
}
