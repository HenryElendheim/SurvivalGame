function drawPlayer() {
    // Draw player
    ctx.fillStyle = '#a03797';
    ctx.fillRect(model.data.player.position.x - 16, model.data.player.position.y - 16, 32, 32);

    if (model.data.player.combat.isAttacking) {
        const angle = model.data.player.combat.attackDirection;
        const range = model.data.player.combat.attackRange;
        const startX = model.data.player.position.x;
        const startY = model.data.player.position.y;
        const endX = startX + Math.cos(angle) * range;
        const endY = startY + Math.sin(angle) * range;

        // Draw attack arc/slash effect
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Draw cone indicator
        const coneAngle = Math.PI / 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.arc(startX, startY, range, angle - coneAngle / 2, angle + coneAngle / 2);
        ctx.fillStyle = 'rgba(255, 200, 0, 0.3)';
        ctx.fill();

        // Resets line width
        ctx.lineWidth = 1;
    }

    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.arc(model.data.player.position.x, model.data.player.position.y, model.data.player.combat.attackRange, 0, Math.PI * 2);
    ctx.stroke();
}

function drawPlayerStats() {
    // Status bars
    const healthPercent = model.data.player.survival.health / 100;
    const hungerPercent = model.data.player.survival.hunger / 100;
    const thirstPercent = model.data.player.survival.thirst / 100;
    const staminaPercent = model.data.player.survival.stamina / 100;


    // Health
    ctx.fillStyle = '#470c0c';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 70, 60, 6);
    ctx.fillStyle = '#ff4141';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 70, 60 * healthPercent, 6);


    // Hunger
    ctx.fillStyle = '#47260c';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 60, 60, 6);
    ctx.fillStyle = '#ffa641';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 60, 60 * hungerPercent, 6);


    // Thirst
    ctx.fillStyle = '#0c2447';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 50, 60, 6);
    ctx.fillStyle = '#41a3ff';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 50, 60 * thirstPercent, 6);


    // Stamina
    ctx.fillStyle = '#0c1547';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 40, 60, 6);
    ctx.fillStyle = '#4441ff';
    ctx.fillRect(model.data.player.position.x - 30, model.data.player.position.y - 40, 60 * staminaPercent, 6);
}

function drawCombatUI() {
    const player = model.data.player;
    const now = Date.now();
    const cooldownRemaining = Math.max(0, player.combat.attackCooldown - now);
    const cooldownPercent = cooldownRemaining / 500; // 500ms cooldown
    
    // Draw cooldown indicator
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 70, 120, 20);
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(10, 70, 120 * (1 - cooldownPercent), 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText('Attack Ready', 15, 85);
    
    if (cooldownRemaining > 0) {
        ctx.fillStyle = '#ff0000';
        ctx.fillText(`${Math.ceil(cooldownRemaining/100) / 10}s`, 15, 85);
    }
    
    // Show attack range text
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.fillText(`Attack Range: ${player.combat.attackRange}px`, 10, 110);
}