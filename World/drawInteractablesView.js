const canvas = document.getElementById('gameMap');
const ctx = canvas.getContext('2d');

function hoveringText() {
    ctx.fillStyle = 'white';
    ctx.font = '16px monospace';
    ctx.shadowColor = 'black';
}


function drawTrees() {
    // Draw trees
    for (let tree of model.data.trees) {
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(tree.x - 8, tree.y - 15, 16, 30);
        ctx.fillStyle = '#3c9e3c';
        ctx.beginPath();
        ctx.arc(tree.x, tree.y - 18, 12, 0, Math.PI * 2);
        ctx.fill();
    }


    // Check if you're near any trees
    let nearTree = false;
    for (let tree of model.data.trees) {
        const distance = Math.hypot(
            model.data.player.position.x - tree.x,
            model.data.player.position.y - tree.y
        );
        if (distance < tree.hitbox) {
            nearTree = true;
            break;
        }
    }


    // Draw "Press E" text
    if (nearTree) {
        hoveringText()
        ctx.fillText('Press E to chop', model.data.player.position.x - 60, model.data.player.position.y - 25);
    }

}


function drawStones() {
    // Draw stones
    for (let stone of model.data.stones) {
        ctx.fillStyle = '#777777';
        ctx.beginPath();
        ctx.arc(stone.x, stone.y - 15, 16, 0, Math.PI * 2);
        ctx.fill();
    }

    // Check if you're near any stones
    let nearStone = false;
    for (let stone of model.data.stones) {
        const distance = Math.hypot(
            model.data.player.position.x - stone.x,
            model.data.player.position.y - stone.y
        );
        if (distance < stone.hitbox) {
            nearStone = true;
            break;
        }
    }

    // Do you have a pickaxe to break the stone?
    const hasPickaxe = model.data.player.inventory.find(item => item.name === "Pickaxe");

    if (nearStone && hasPickaxe) {
        hoveringText()
        ctx.fillText('Press E to break', model.data.player.position.x - 60, model.data.player.position.y - 25);
    } else if (nearStone) {
        hoveringText()
        ctx.fillText('Need a pickaxe', model.data.player.position.x - 60, model.data.player.position.y - 25);
    }
}