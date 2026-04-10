function move() {
    let speed = 2;

    if (model.data.player.movementKeys.w) model.data.player.position.y -= speed;
    if (model.data.player.movementKeys.a) model.data.player.position.x -= speed;
    if (model.data.player.movementKeys.s) model.data.player.position.y += speed;
    if (model.data.player.movementKeys.d) model.data.player.position.x += speed;

    //console.log(model.data.player.position.x, model.data.player.position.y);

    boundPlayer();
    draw();
    updateView();
    requestAnimationFrame(move);
}
move();


function boundPlayer() {
    const halfSize = 16;  // half your player width/height

    model.data.player.position.x = Math.max(halfSize, Math.min(canvas.width - halfSize, model.data.player.position.x));
    model.data.player.position.y = Math.max(halfSize, Math.min(canvas.height - halfSize, model.data.player.position.y));
}