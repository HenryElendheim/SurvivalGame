window.addEventListener('keydown', (e) => model.data.player.movementKeys[e.key] = true);
window.addEventListener('keyup', (e) => model.data.player.movementKeys[e.key] = false);

window.addEventListener('keydown', (e) => {
    if (e.key === 'e') {
        chopTree();
        breakStone()
    }
    if (e.key === 'f') {
        eatCoconut();
    }
    if (e.key === 'r') {
        // Something at some point
    }
});