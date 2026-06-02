// Crafting recipes for the SOS-tower game.
const RECIPES = {
    Pickaxe:    { wood: 5,  stone: 0,  id: 100, msg: "Pickaxe crafted! You can now mine stone." },
    Sword:      { wood: 2,  stone: 3,  id: 102, msg: "Sword crafted! Your attacks hit harder." },
    "SOS Tower":{ wood: 15, stone: 10, id: 105, msg: "SOS Tower built! Place it, then survive the swarm." },
};

function getRecipe(name) {
    return RECIPES[name];
}

function renderCrafting() {
    const craftingDiv = document.getElementById('craftingPanel');
    if (!craftingDiv) return;

    craftingDiv.innerHTML = /*HTML*/ `
        <div>
            <h3>Crafting</h3>
            <div class="craftingMenu">
                <button onclick="craftItem('Pickaxe')">
                    Pickaxe (5 wood) &mdash; needed to mine stone
                </button>
                <button onclick="craftItem('Sword')">
                    Sword (2 wood + 3 stone) &mdash; stronger attacks
                </button>
                <button onclick="craftItem('SOS Tower')">
                    SOS Tower (15 wood + 10 stone) &mdash; your way out
                </button>
            </div>
            <h3 style="margin-top:12px;">Place</h3>
            <div class="craftingMenu">
                ${getPlaceableButtons()}
            </div>
            <p style="margin:10px 0 0 0; opacity:0.75; font-size:13px;">
                WASD move &middot; E chop/mine &middot; F eat coconut &middot; Click or Space attack
            </p>
        </div>
    `;
}
renderCrafting()

function getPlaceableButtons() {
    const hasTower = model.data.player.inventory.some(i => i.name === "SOS Tower");
    if (hasTower && !model.data.sos.placed) {
        return `<button onclick="placeItem('SOS Tower')">Place SOS Tower (drops where you stand)</button>`;
    }
    if (model.data.sos.placed) {
        return '<p style="margin:0;opacity:0.7;">SOS Tower deployed &mdash; stay inside the bubble!</p>';
    }
    return '<p style="margin:0;opacity:0.7;">Build an SOS Tower to place it.</p>';
}

function craftItem(item) {
    const wood = model.data.player.inventory.find(i => i.name === "Wood");
    const stone = model.data.player.inventory.find(i => i.name === "Stone");
    const hasItem = model.data.player.inventory.find(i => i.name === item);

    const recipe = RECIPES[item];
    if (!recipe) return;

    if (hasItem) {
        console.log(`You already have a ${item}!`);
        return;
    }

    if (wood.amount >= recipe.wood && stone.amount >= recipe.stone) {
        wood.amount -= recipe.wood;
        stone.amount -= recipe.stone;
        model.data.player.inventory.push({
            id: recipe.id,
            name: item,
            amount: 1,
            damage: item === "Sword" ? 25 : undefined
        });
        console.log(recipe.msg);

        // Sword is a real damage upgrade for the fight.
        if (item === "Sword") {
            model.data.player.combat.attackDamage = 25;
        }
        if (item === "SOS Tower") {
            advanceMission("Build the SOS Tower");
        }

        updateView();
        renderCrafting();
    } else {
        console.log(`Need ${recipe.wood} wood and ${recipe.stone} stone for ${item}`);
    }
}
