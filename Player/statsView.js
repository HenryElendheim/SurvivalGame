function statDecrease() {
    //health
    setInterval(() => {
        if (model.data.player.survival.hunger >= 80 && model.data.player.survival.thirst >= 80 && model.data.player.survival.health < 100) {
            model.data.player.survival.health += 1;
        } else if (model.data.player.survival.health <= 0) {
            model.data.player.survival.health = 0;
        }
    }, 3000)

    //hunger
    setInterval(() => {
        if (model.data.player.survival.hunger <= 0) {
            model.data.player.survival.hunger = 0;
            dmgOverTime()
        } else {
            model.data.player.survival.hunger -= 1;
        }
    }, 3500)

    //thirst
    setInterval(() => {
        if (model.data.player.survival.thirst <= 0) {
            model.data.player.survival.thirst = 0;
            dmgOverTime()
        } else {
            model.data.player.survival.thirst -= 1;
        }
    }, 2500)

    //stamina
    setInterval(() => {
        if (model.data.player.survival.stamina >= 100) {
            model.data.player.survival.stamina = 100;
        } else if (model.data.player.survival.stamina < 100) {
            model.data.player.survival.stamina += 1;
        }
    }, 100)
}
statDecrease()


function dmgOverTime() {
    let dmgAmount = 10;
    if (model.data.player.survival.health <= 0) {
        model.data.player.survival.health = 0;
    } else {
        model.data.player.survival.health -= dmgAmount;
    }
}