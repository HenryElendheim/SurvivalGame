function craft() {
    const recipe = model.data.crafting;
    const pickaxe = model.data.crafting.pickaxe;
    const inv = model.data.player.inventory;
    const player = model.data.player;

    if (inv[1].amount >= pickaxe.wood) {
        inv[1].amount -= pickaxe.wood
        inv.push({
            id: 100,
            name: "Pickaxe",
            duration: 10,
        });
        console.log("Pickaxe crafted!");
    } else {
        console.log("Not enough wood!");
    }
}

function renderCrafting() {
    const craftingDiv = document.getElementById('craftingPanel');
    if (!craftingDiv) return;


    craftingDiv.innerHTML = /*HTML*/ `
        <div>
            <h3>Crafting</h3>
            <div class="craftingMenu">
                <button onclick="craftItem('Pickaxe')">
                    Pickaxe (5 wood)
                </button>
                <button onclick="craftItem('Campfire')">
                    Campfire (3 wood + 2 stone)
                </button>
                <button onclick="craftItem('Sword')">
                    Sword (2 wood + 3 stone)
                </button>
                <button onclick="craftItem('Shelter')">
                    Shelter (10 wood + 10 stone)
                </button>
                <button onclick="craftItem('Bed')">
                    Bed (6 wood + 4 stone)
                </button>
            </div>
        </div>
    `;
}
renderCrafting()

function craftItem(item) {
    const wood = model.data.player.inventory.find(i => i.name === "Wood");
    const stone = model.data.player.inventory.find(i => i.name === "Stone");
    const hasItem = model.data.player.inventory.find(i => i.name === item);
    
    const recipes = {
        Pickaxe: { wood: 5, stone: 0, msg: "Pickaxe crafted!", id: 100 },
        Campfire: { wood: 3, stone: 2, msg: "Campfire crafted!", id: 101 },
        Sword: { wood: 2, stone: 3, msg: "Sword crafted!", id: 102 },
        Shelter: { wood: 10, stone: 10, msg: "Shelter crafted!", id: 103 },
        Bed: { wood: 6, stone: 4, msg: "Bed crafted!", id: 104 },
    };
    
    const recipe = recipes[item];
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
            damage: item === "Sword" ? 20 : undefined
        });
        console.log(recipe.msg);
        updateView();
        renderCrafting();
    } else {
        console.log(`Need ${recipe.wood} wood and ${recipe.stone} stone for ${item}`);
    }
}