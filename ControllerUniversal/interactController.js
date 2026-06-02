function chopTree() {
    const exhaustion = 20;
    for (let i = 0; i < model.data.trees.length; i++) {
        const tree = model.data.trees[i];
        const distance = Math.hypot(
            model.data.player.position.x - tree.x,
            model.data.player.position.y - tree.y
        );

        if (distance < tree.hitbox && model.data.player.survival.stamina >= exhaustion) {
            // Give resources (inventory[0] = Wood, inventory[1] = Coconut)
            model.data.player.inventory[0].amount += tree.wood;
            model.data.player.inventory[1].amount += tree.coconuts;
            model.data.player.survival.stamina -= exhaustion;
            model.data.trees.splice(i, 1);  // Tree is gone
            updateView();
            break;
        }
    }
    checkMax()
    checkGatherMission()
}


function breakStone() {
    const hasPickaxe = model.data.player.inventory.find(item => item.name === "Pickaxe");
    const exhaustion = 30;
    for (let i = 0; i < model.data.stones.length; i++) {
        const stone = model.data.stones[i];
        const distance = Math.hypot(
            model.data.player.position.x - stone.x,
            model.data.player.position.y - stone.y
        );

        if (distance < stone.hitbox && model.data.player.survival.stamina >= exhaustion && hasPickaxe) {
            console.log("Full stone object:", stone);
            console.log("stone.stone value:", stone.stone);
            console.log("Current inventory[2]:", model.data.player.inventory[2]);
            // Give resources
            model.data.player.inventory[2].amount += stone.stone;
            model.data.player.survival.stamina -= exhaustion;
            // Add stone to inventory too if you have wood counter
            model.data.stones.splice(i, 1);
            updateView();
            break;
        }
    }
    checkMax()
    checkGatherMission()
}


function eatCoconut() {
    const coconut = model.data.player.inventory.find(item => item.name === "Coconut");
    const player = model.data.player.survival
    if (coconut.amount > 0) {
        player.hunger += coconut.food;
        player.thirst += coconut.water;
        player.stamina += coconut.energy;
        coconut.amount--;
        updateView();
    }
    checkMax()
}