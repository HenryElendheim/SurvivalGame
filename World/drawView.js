function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgb(240, 204, 126)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTrees();
    drawStones();
    drawPlaceables();   // SOS tower + bubble
    drawPlayer();
    drawPlayerStats();
    drawEnemies();
    if (!model.data.gameWon && !model.data.gameOver) {
        updateEnemies();
        updateSos();
    }
    drawSosHud();
    drawCombatUI();
    drawWinOverlay();
    drawGameOverOverlay();
}