function updateView() {
    model.app.app.innerHTML = /*HTML*/ `
        <h1>Current mission: ${model.data.missions.currentMission}</h1>
        <p>Max in inv: ${model.data.player.inventoryMax}</p>
        ${model.data.player.inventory.map(item => `${item.name}: ${item.amount}`).join(' <br> ')}
    `;
}
updateView()