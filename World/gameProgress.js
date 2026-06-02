// Game progression: missions, the SOS tower endgame, placement, survival timer,
// and the win / game-over states.

// Advance the mission tracker only if `expected` is the current mission,
// which keeps the sequence in order.
function advanceMission(expected) {
    const m = model.data.missions;
    if (m.currentMission !== expected) return;

    const idx = m.allMissions.indexOf(expected);
    if (idx >= 0 && idx < m.allMissions.length - 1) {
        m.currentMission = m.allMissions[idx + 1];
    } else {
        m.currentMission = "All missions complete!";
    }
    if (typeof updateView === 'function') updateView();
}

// First mission: completes once you have enough materials for the tower.
function checkGatherMission() {
    if (model.data.missions.currentMission !== "Gather wood and stone") return;
    const wood = model.data.player.inventory.find(i => i.name === "Wood");
    const stone = model.data.player.inventory.find(i => i.name === "Stone");
    const cost = (typeof getRecipe === 'function') ? getRecipe("SOS Tower") : { wood: 15, stone: 10 };
    if (wood && stone && wood.amount >= cost.wood && stone.amount >= cost.stone) {
        advanceMission("Gather wood and stone");
    }
}

// Drop a placeable item at the player's feet. Only the SOS Tower is placeable.
function placeItem(name) {
    if (name !== "SOS Tower") return;

    const item = model.data.player.inventory.find(i => i.name === name);
    if (!item) {
        console.log("You don't have an SOS Tower to place.");
        return;
    }
    if (model.data.sos.placed) {
        console.log("The SOS Tower is already placed.");
        return;
    }

    const px = model.data.player.position.x;
    const py = model.data.player.position.y;

    model.data.placeables.push({ name: "SOS Tower", x: px, y: py });

    const sos = model.data.sos;
    sos.placed = true;
    sos.active = true;
    sos.x = px;
    sos.y = py;
    sos.elapsedMs = 0;
    sos.lastTick = Date.now();

    advanceMission("Place the SOS Tower"); // -> "Survive the swarm!"
    startSurvivalAssault();

    if (typeof renderCrafting === 'function') renderCrafting();
    if (typeof updateView === 'function') updateView();
}

function playerInBubble() {
    const sos = model.data.sos;
    if (!sos.active) return false;
    const d = Math.hypot(
        model.data.player.position.x - sos.x,
        model.data.player.position.y - sos.y
    );
    return d <= sos.radius;
}

// Ramp up spawning into a swarm once the tower is active.
function startSurvivalAssault() {
    const limits = model.data.enemySpawn.limits;
    limits.basic.max = 14;
    limits.fast.max = 8;
    limits.tank.max = 3;

    if (typeof stopEnemySpawning === 'function') stopEnemySpawning();
    model.data.enemySpawn.spawnDelay = 2500; // a new enemy every 2.5s
    if (typeof startEnemySpawning === 'function') startEnemySpawning();

    // A few immediate arrivals so the pressure starts right away.
    for (let i = 0; i < 4; i++) {
        if (typeof spawnRandomEnemy === 'function') spawnRandomEnemy();
    }
}

// Advance the survival timer. Only counts while the player is inside the bubble;
// it pauses (but never resets) when the player steps out.
function updateSos() {
    const sos = model.data.sos;
    if (!sos.active) return;

    const now = Date.now();
    const dt = sos.lastTick ? (now - sos.lastTick) : 0;
    sos.lastTick = now;

    if (playerInBubble()) {
        sos.elapsedMs = Math.min(sos.requiredMs, sos.elapsedMs + dt);
        if (sos.elapsedMs >= sos.requiredMs) {
            winGame();
        }
    }
}

function winGame() {
    model.data.gameWon = true;
    model.data.sos.active = false;
    advanceMission("Survive the swarm!");
    if (typeof stopEnemySpawning === 'function') stopEnemySpawning();
    model.data.enemies = [];
    if (typeof updateView === 'function') updateView();
}

// ---- Drawing layers (called from draw()) ----

// Draws the SOS tower and its protective-looking bubble.
function drawPlaceables() {
    for (const p of model.data.placeables) {
        if (p.name !== "SOS Tower") continue;

        const sos = model.data.sos;
        const inside = playerInBubble();

        // Bubble fill + ring (green while you're inside and counting, amber when paused)
        ctx.beginPath();
        ctx.arc(p.x, p.y, sos.radius, 0, Math.PI * 2);
        ctx.fillStyle = inside ? 'rgba(60, 200, 255, 0.12)' : 'rgba(255, 170, 60, 0.10)';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = inside ? 'rgba(80, 220, 255, 0.9)' : 'rgba(255, 170, 60, 0.9)';
        ctx.stroke();
        ctx.lineWidth = 1;

        // Tower: base, mast, and a blinking beacon
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(p.x - 16, p.y - 6, 32, 18);          // base
        ctx.fillStyle = '#777';
        ctx.fillRect(p.x - 4, p.y - 60, 8, 56);           // mast
        // simple cross-braces
        ctx.strokeStyle = '#555';
        ctx.beginPath();
        ctx.moveTo(p.x - 4, p.y - 6); ctx.lineTo(p.x + 4, p.y - 30);
        ctx.moveTo(p.x + 4, p.y - 6); ctx.lineTo(p.x - 4, p.y - 30);
        ctx.stroke();
        // beacon (blinks ~twice a second)
        const on = Math.floor(Date.now() / 400) % 2 === 0;
        ctx.fillStyle = on ? '#ff3b3b' : '#7a1010';
        ctx.beginPath();
        ctx.arc(p.x, p.y - 64, 6, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Live survival countdown / status, drawn at the top-center of the canvas.
function drawSosHud() {
    const sos = model.data.sos;
    if (!sos.active || model.data.gameWon || model.data.gameOver) return;

    const remaining = Math.ceil((sos.requiredMs - sos.elapsedMs) / 1000);
    const inside = playerInBubble();
    const cx = canvas.width / 2;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`SURVIVE: ${remaining}s`, cx, 44);

    ctx.font = '18px Arial';
    ctx.fillStyle = inside ? '#0a7d24' : '#b34700';
    ctx.fillText(
        inside ? 'Inside the bubble — timer running' : 'Get back inside the bubble! — timer paused',
        cx, 70
    );

    // Progress bar
    const barW = 360, barH = 14, bx = cx - barW / 2, by = 82;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(bx, by, barW, barH);
    ctx.fillStyle = '#3cc8ff';
    ctx.fillRect(bx, by, barW * (sos.elapsedMs / sos.requiredMs), barH);
    ctx.textAlign = 'left';
}

function drawWinOverlay() {
    if (!model.data.gameWon) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 60px Arial';
    ctx.fillText('Rescue inbound!', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '26px Arial';
    ctx.fillText('You held the beacon for 30 seconds \u2014 You win!', canvas.width / 2, canvas.height / 2 + 30);
    ctx.font = '20px Arial';
    ctx.fillText('Refresh the page to play again', canvas.width / 2, canvas.height / 2 + 66);
    ctx.textAlign = 'left';
}

function drawGameOverOverlay() {
    if (!model.data.gameOver) return;
    ctx.fillStyle = 'rgba(20, 0, 0, 0.82)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff5252';
    ctx.font = 'bold 60px Arial';
    ctx.fillText('You died', canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText('The swarm overran the beacon \u2014 Refresh to try again', canvas.width / 2, canvas.height / 2 + 36);
    ctx.textAlign = 'left';
}
