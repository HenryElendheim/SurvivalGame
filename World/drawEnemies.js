function drawEnemies() {
    for (let enemy of model.data.enemies) {
        // Enemy body
        ctx.fillStyle = '#b61818';
        ctx.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);

        // Health bar above enemy
        const healthPercent = enemy.health / enemy.maxHealth;
        ctx.fillStyle = '#470c0c';
        ctx.fillRect(enemy.x - 20, enemy.y - 25, 40, 6);
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(enemy.x - 20, enemy.y - 25, 40 * healthPercent, 6);
    }
}