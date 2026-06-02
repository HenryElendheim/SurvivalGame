// World generation + one-time game initialization.
// This file is loaded LAST, so every function from the other files is defined.

model.data.player.position.x = canvas.width / 2;
model.data.player.position.y = canvas.height / 2;

function rngX() {
    return Math.floor(Math.random() * canvas.width);
}

function rngY() {
    return Math.floor(Math.random() * canvas.height);
}

// Random integer between min and max (inclusive)
function rngBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function awayFromPlayer(x, y, minDist) {
    return Math.hypot(model.data.player.position.x - x, model.data.player.position.y - y) >= minDist;
}

// Generate a fixed, reasonable number of trees and stones,
// each with at least 1 resource so harvesting is always useful.
const TREE_COUNT = 30;
const STONE_COUNT = 20;

let placed = 0;
while (placed < TREE_COUNT) {
    const x = rngX();
    const y = rngY();
    if (!awayFromPlayer(x, y, 80)) continue;
    model.data.trees.push({
        x, y,
        wood: rngBetween(1, 8),
        coconuts: rngBetween(1, 4),
        hitbox: 35
    });
    placed++;
}

placed = 0;
while (placed < STONE_COUNT) {
    const x = rngX();
    const y = rngY();
    if (!awayFromPlayer(x, y, 80)) continue;
    model.data.stones.push({
        x, y,
        stone: rngBetween(1, 6),
        hitbox: 35
    });
    placed++;
}

// One-time initialization (these must NOT run inside the draw loop).
setupPlayerAttack();
initEnemies();
updateView();
