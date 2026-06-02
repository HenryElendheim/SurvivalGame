window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'a' || k === 's' || k === 'd') {
        model.data.player.movementKeys[k] = true;
    }
});
window.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'a' || k === 's' || k === 'd') {
        model.data.player.movementKeys[k] = false;
    }
});

window.addEventListener('keydown', (e) => {
    if (model.data.gameWon || model.data.gameOver) return;
    const k = e.key.toLowerCase();
    if (k === 'e') {
        chopTree();
        breakStone();
    }
    if (k === 'f') {
        eatCoconut();
    }
});