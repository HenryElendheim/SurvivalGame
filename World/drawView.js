function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgb(240, 204, 126)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTrees();
    drawStones();
    drawPlayer();
    drawPlayerStats();
    drawEnemies();
    updateEnemies();
    setupPlayerAttack();
    initEnemies();
}