model.data.player.position.x = canvas.width / 2;
model.data.player.position.y = canvas.height / 2;

for (let i = 0; i < rngX(); i++) {
    model.data.trees.push({
        x: rngX(), y: rngY(), wood: rng10(), coconuts: rng10(), hitbox: 35
    })
    model.data.stones.push({
        x: rngX(), y: rngY(), stone: rng10(), hitbox: 35
    })
}


function rngX() {
    return Math.floor(Math.random() * 2500)
}


function rngY() {
    return Math.floor(Math.random() * 990)
}


function rng10() {
    return Math.floor(Math.random() * 10)
}


model.data.enemies.push({
    x: canvas.width / 2 + 100,
    y: canvas.height / 2 + 100,
    size: 32,
    health: 30,
    maxHealth: 30,
    damage: 10,
    speed: 1.5,
    hitbox: 35
});