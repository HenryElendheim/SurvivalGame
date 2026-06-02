function drawEnemies() {
    for (let enemy of model.data.enemies) {
        // Set color based on enemy type and state
        if (enemy.hitFlash) {
            ctx.fillStyle = '#ffffff';
        } else if (enemy.isAttacking) {
            ctx.fillStyle = '#ff8888';
        } else {
            // Use enemy's specific color
            ctx.fillStyle = enemy.color || '#b61818';
        }
        
        // Draw enemy
        ctx.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
        
        // Draw type indicator (small icon or letter)
        ctx.fillStyle = '#ffffff';
        ctx.font = `${enemy.size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let typeIcon = '?';
        if (enemy.type === 'basic') typeIcon = 'B';
        if (enemy.type === 'fast') typeIcon = 'F';
        if (enemy.type === 'tank') typeIcon = 'T';
        ctx.fillText(typeIcon, enemy.x, enemy.y);
        
        // Health bar
        const healthPercent = enemy.health / enemy.maxHealth;
        ctx.fillStyle = '#470c0c';
        ctx.fillRect(enemy.x - 20, enemy.y - 25, 40, 6);
        
        // Color code health bar by enemy type
        if (enemy.type === 'tank') {
            ctx.fillStyle = '#ff6600';
        } else if (enemy.type === 'fast') {
            ctx.fillStyle = '#ffcc00';
        } else {
            ctx.fillStyle = '#ff4444';
        }
        ctx.fillRect(enemy.x - 20, enemy.y - 25, 40 * healthPercent, 6);
        
        // Show enemy type name
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.fillText(enemy.typeName || 'Enemy', enemy.x - 15, enemy.y - 28);
    }
}

function updateEnemies() {
    const player = model.data.player;
    const enemies = model.data.enemies;
    const sos = model.data.sos;

    for (let enemy of enemies) {
        // Distance to the player (used for attacking in both modes)
        const pdx = player.position.x - enemy.x;
        const pdy = player.position.y - enemy.y;
        const playerDist = Math.sqrt(pdx * pdx + pdy * pdy);

        if (sos.active) {
            // The beacon has drawn them in — now they hunt the player from
            // anywhere on the map and attack on contact.
            if (playerDist <= (enemy.attackRange || 10)) {
                attackPlayer(enemy);
            } else if (playerDist > 1) {
                moveTowardsPlayer(enemy, pdx, pdy, playerDist);
            }
        } else {
            // Normal behaviour: only react within attraction range of the player.
            const attractionRange = enemy.attractionRange || 200;
            if (playerDist < attractionRange) {
                if (playerDist <= (enemy.attackRange || 10)) {
                    attackPlayer(enemy);
                } else if (playerDist > 1) {
                    moveTowardsPlayer(enemy, pdx, pdy, playerDist);
                }
            }
        }
    }
}

function moveTowardsPlayer(enemy, dx, dy, distance) {
    const speed = enemy.speed || 1.5;
    const moveX = (dx / distance) * speed;
    const moveY = (dy / distance) * speed;

    enemy.x += moveX;
    enemy.y += moveY;
}

function attackPlayer(enemy) {
    // Add cooldown to prevent too many attacks
    if (!enemy.attackCooldown || Date.now() > enemy.attackCooldown) {
        // Use enemy-specific damage (default to 15 if not set)
        const damage = enemy.damage || 15;
        
        // Reduce player health
        model.data.player.survival.health = Math.max(0, model.data.player.survival.health - damage);
        
        // Set attack cooldown using enemy's specific cooldown time
        const cooldownTime = enemy.attackCooldownTime || 1000;
        enemy.attackCooldown = Date.now() + cooldownTime;
        
        // Visual feedback - flash enemy red
        enemy.isAttacking = true;
        setTimeout(() => {
            enemy.isAttacking = false;
        }, 200);
        
        if (enemy.type === 'tank') {
            // Tank enemies cause more screen shake
            screenShake(5);
            console.log(`Heavy attack from Tank! -${damage} health`);
        } else if (enemy.type === 'fast') {
            // Fast enemies attack rapidly
            console.log(`Quick slash from Fast enemy! -${damage} health`);
        } else {
            console.log(`${enemy.type || 'Enemy'} attacked! -${damage} health`);
        }
        
        // Check if player died
        if (model.data.player.survival.health <= 0) {
            console.log("Player died!");
            handlePlayerDeath();
        }
    }
}


function screenShake(intensity) {
    if (!canvas) return;
    let shaketime = 0;
    const shakeInterval = setInterval(() => {
        if (shaketime >= intensity) {
            canvas.style.transform = 'none';
            clearInterval(shakeInterval);
        } else {
            const x = Math.random() * intensity - intensity/2;
            const y = Math.random() * intensity - intensity/2;
            canvas.style.transform = `translate(${x}px, ${y}px)`;
            shaketime++;
        }
    }, 50);
}


function spawnEnemyType(x, y, type) {
    model.data.enemies.push({
        x: x,
        y: y,
        size: type.size,
        health: type.health,
        maxHealth: type.health,
        damage: type.damage,
        speed: type.speed,
        color: type.color,
        attractionRange: type.attractionRange,
        attackRange: type.attackRange,
        attackCooldownTime: type.attackCooldown,
        attackCooldown: null,
        isAttacking: false,
        type: type.key,
        typeName: type.name
    });
}


function spawnBasicEnemy(x, y) {
    spawnEnemyType(x, y, model.data.enemyTypes.basic);
}

function spawnFastEnemy(x, y) {
    spawnEnemyType(x, y, model.data.enemyTypes.fast);
}

function spawnTankEnemy(x, y) {
    spawnEnemyType(x, y, model.data.enemyTypes.tank);
}


function getRandomSpawnPosition() {
    const padding = 50; // Keep enemies away from edges
    
    // Random position within canvas bounds
    const x = Math.random() * (canvas.width - padding * 2) + padding;
    const y = Math.random() * (canvas.height - padding * 2) + padding;
    
    return { x, y };
}


// Update enemy counts
function updateEnemyCounts() {
    let tankCount = 0;
    let fastCount = 0;
    let basicCount = 0;
    
    for (let enemy of model.data.enemies) {
        if (enemy.type === 'tank') tankCount++;
        else if (enemy.type === 'fast') fastCount++;
        else if (enemy.type === 'basic') basicCount++;
    }
    
    model.data.enemySpawn.limits.tank.current = tankCount;
    model.data.enemySpawn.limits.fast.current = fastCount;
    model.data.enemySpawn.limits.basic.current = basicCount;
    
    return { tankCount, fastCount, basicCount };
}


// Check if an enemy type can be spawned
function canSpawnEnemy(type) {
    const limits = model.data.enemySpawn.limits;
    
    switch(type) {
        case 'tank':
            return limits.tank.current < limits.tank.max;
        case 'fast':
            return limits.fast.current < limits.fast.max;
        case 'basic':
            return limits.basic.current < limits.basic.max;
        default:
            return false;
    }
}


// Spawn random enemy type
function spawnRandomEnemy() {
    // Update current enemy counts
    updateEnemyCounts();
    
    // Check if we can spawn any enemies
    const canSpawnTank = canSpawnEnemy('tank');
    const canSpawnFast = canSpawnEnemy('fast');
    const canSpawnBasic = canSpawnEnemy('basic');
    
    if (!canSpawnTank && !canSpawnFast && !canSpawnBasic) {
        console.log("Maximum enemies reached! Cannot spawn more.");
        return false;
    }
    
    // Create weighted random selection (40% basic, 40% fast, 20% tank with limits)
    let availableTypes = [];
    
    if (canSpawnTank) availableTypes.push('tank', 'tank'); // 20%
    if (canSpawnFast) availableTypes.push('fast', 'fast', 'fast', 'fast'); // 40%
    if (canSpawnBasic) availableTypes.push('basic', 'basic', 'basic', 'basic'); // 40%
    
    if (availableTypes.length === 0) return false;
    
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const spawnPos = getRandomSpawnPosition();
    
    // Spawn the enemy
    switch(randomType) {
        case 'basic':
            spawnBasicEnemy(spawnPos.x, spawnPos.y);
            console.log(`Spawned Basic enemy at (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.y)})`);
            break;
        case 'fast':
            spawnFastEnemy(spawnPos.x, spawnPos.y);
            console.log(`Spawned Fast enemy at (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.y)})`);
            break;
        case 'tank':
            spawnTankEnemy(spawnPos.x, spawnPos.y);
            console.log(`Spawned Tank enemy at (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.y)})`);
            break;
    }
    
    // Update counts after spawning
    updateEnemyCounts();
    return true;
}

// Start enemy spawning
function startEnemySpawning() {
    if (model.data.enemySpawn.isSpawning) {
        console.log("Enemy spawning already active");
        return;
    }
    
    // Initial spawn: create 3 random enemies to start
    console.log("Starting initial enemies...");
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            spawnRandomEnemy();
        }, i * 1000); // Spawn them slightly apart
    }
    
    // Set up interval for continuous spawning
    model.data.enemySpawn.spawnInterval = setInterval(() => {
        // Only spawn if player is alive (you can adjust this condition)
        if (model.data.player.survival.health > 0) {
            const spawned = spawnRandomEnemy();
            if (spawned) {
                console.log("Enemy spawn tick - Current counts:", {
                    tank: model.data.enemySpawn.limits.tank.current,
                    fast: model.data.enemySpawn.limits.fast.current,
                    basic: model.data.enemySpawn.limits.basic.current,
                    total: model.data.enemies.length
                });
            }
        }
    }, model.data.enemySpawn.spawnDelay);
    
    model.data.enemySpawn.isSpawning = true;
    console.log(`Enemy spawning started! New enemies every ${model.data.enemySpawn.spawnDelay / 1000} seconds`);
}


function stopEnemySpawning() {
    if (model.data.enemySpawn.spawnInterval) {
        clearInterval(model.data.enemySpawn.spawnInterval);
        model.data.enemySpawn.spawnInterval = null;
        model.data.enemySpawn.isSpawning = false;
        console.log("Enemy spawning stopped");
    }
}


function initEnemies() {
    model.data.enemies = [];
    
    // Reset spawn counts
    model.data.enemySpawn.limits.tank.current = 0;
    model.data.enemySpawn.limits.fast.current = 0;
    model.data.enemySpawn.limits.basic.current = 0;
    
    // Start spawning system
    startEnemySpawning();
}


function forceSpawnEnemy(type) {
    const spawnPos = getRandomSpawnPosition();
    switch(type) {
        case 'basic':
            if (canSpawnEnemy('basic')) {
                spawnBasicEnemy(spawnPos.x, spawnPos.y);
                updateEnemyCounts();
                return true;
            }
            break;
        case 'fast':
            if (canSpawnEnemy('fast')) {
                spawnFastEnemy(spawnPos.x, spawnPos.y);
                updateEnemyCounts();
                return true;
            }
            break;
        case 'tank':
            if (canSpawnEnemy('tank')) {
                spawnTankEnemy(spawnPos.x, spawnPos.y);
                updateEnemyCounts();
                return true;
            }
            break;
    }
    console.log(`Cannot spawn ${type} - limit reached!`);
    return false;
}