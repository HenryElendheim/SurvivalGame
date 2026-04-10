function checkMax() {
    const inv = model.data.player.inventory;
    const invMax = model.data.player.inventoryMax;
    const survival = model.data.player.survival;
    const survivalMax = model.data.player.survivalMax;

    for (let i = 0; i < inv.length; i++) {
        if (inv[i].amount > invMax) {
            inv[i].amount = invMax;
        }
    }
        for (let stat in survival) {
        if (survival[stat] > survivalMax) {
            survival[stat] = survivalMax;
        }
    }
}