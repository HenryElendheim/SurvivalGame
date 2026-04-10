function drawPlayer() {
    // Draw player
    ctx.fillStyle = '#a03797';
    ctx.fillRect(model.data.player.position.x - 16, model.data.player.position.y - 16, 32, 32);
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