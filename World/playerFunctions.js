function handlePlayerDeath() {
    if (model.data.gameWon || model.data.gameOver) return;

    // During the SOS survival phase, dying ends the run.
    if (model.data.sos.active) {
        model.data.gameOver = true;
        model.data.sos.active = false;
        if (typeof stopEnemySpawning === 'function') stopEnemySpawning();
        model.data.enemies = [];
        if (typeof updateView === 'function') updateView();
        return;
    }

    // Otherwise: fair respawn while gathering / building.
    model.data.deaths++;
    const s = model.data.player.survival;
    s.health = 100;
    s.hunger = 50;
    s.thirst = 80;
    s.stamina = 100;
    model.data.player.position.x = canvas.width / 2;
    model.data.player.position.y = canvas.height / 2;
    model.data.enemies = [];
}

function setupPlayerAttack() {
    window.addEventListener('click', (e) => {
        if (model.data.gameWon || model.data.gameOver) return;
        // Use the actual game canvas element
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate direction from player to mouse
        const dx = mouseX - model.data.player.position.x;
        const dy = mouseY - model.data.player.position.y;
        const angle = Math.atan2(dy, dx);

        // Perform attack
        playerAttack(angle);
    });

    window.addEventListener('keydown', (e) => {
        if (model.data.gameWon || model.data.gameOver) return;
        if (e.code === 'Space') {
            e.preventDefault();
            // Attack in the direction player is facing
            let direction = { x: 1, y: 0 }; // Default right
            if (model.data.player.movementKeys.w) direction = { x: 0, y: -1 };
            if (model.data.player.movementKeys.s) direction = { x: 0, y: 1 };
            if (model.data.player.movementKeys.a) direction = { x: -1, y: 0 };
            if (model.data.player.movementKeys.d) direction = { x: 1, y: 0 };

            const angle = Math.atan2(direction.y, direction.x);
            playerAttack(angle);
        }
    });
}

function playerAttack(angle) {
    const player = model.data.player;
    const now = Date.now();

    // Check cooldown
    if (now < player.combat.attackCooldown) {
        return;
    }

    // Set attacking animation
    player.combat.isAttacking = true;
    player.combat.attackDirection = angle;
    setTimeout(() => {
        player.combat.isAttacking = false;
    }, 200);

    // Calculate attack hitbox
    const attackRange = player.combat.attackRange;
    const playerX = player.position.x;
    const playerY = player.position.y;

    // Get direction vector from angle
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    // Find enemies in range
    let hitEnemy = false;
    for (let enemy of model.data.enemies) {
        const toEnemyX = enemy.x - playerX;
        const toEnemyY = enemy.y - playerY;
        const distance = Math.sqrt(toEnemyX * toEnemyX + toEnemyY * toEnemyY);

        if (distance <= attackRange) {
            const enemyAngle = Math.atan2(toEnemyY, toEnemyX);
            let angleDiff = Math.abs(angle - enemyAngle);

            if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;

            const coneAngle = Math.PI / 3;
            if (angleDiff <= coneAngle) {
                hitEnemy = true;

                // Calculate damage based on enemy type
                let damage = player.combat.attackDamage;

                // Different damage multipliers for different enemy types
                if (enemy.type === 'tank') {
                    damage = Math.floor(damage * 0.7); // Tank takes 30% less damage
                    console.log(`Tank enemy reduced damage to ${damage}`);
                } else if (enemy.type === 'fast') {
                    damage = Math.floor(damage * 1.2); // Fast takes 20% more damage
                    console.log(`Fast enemy took bonus damage: ${damage}`);
                }

                // Apply damage
                enemy.health -= damage;

                // Knockback effect (reduced for tank enemies)
                let knockbackForce = 20;
                if (enemy.type === 'tank') {
                    knockbackForce = 10; // Tanks are harder to push
                } else if (enemy.type === 'fast') {
                    knockbackForce = 30; // Fast enemies get pushed more
                }

                const knockbackDirX = toEnemyX / distance;
                const knockbackDirY = toEnemyY / distance;
                enemy.x += knockbackDirX * knockbackForce;
                enemy.y += knockbackDirY * knockbackForce;

                // Visual feedback
                enemy.hitFlash = true;
                setTimeout(() => {
                    if (enemy) enemy.hitFlash = false;
                }, 150);

                // Check if enemy died
                if (enemy.health <= 0) {
                    const index = model.data.enemies.indexOf(enemy);
                    if (index > -1) {
                        model.data.enemies.splice(index, 1);
                    }
                }
            }
        }
    }

    // Set cooldown
    player.combat.attackCooldown = now + 500;

    // Reduce stamina
    player.survival.stamina = Math.max(0, player.survival.stamina - 5);
}