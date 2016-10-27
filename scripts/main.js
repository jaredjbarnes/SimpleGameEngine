var star = new Star({
    spikes: 5,
    fillColor: {
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1
    },
    border: {
        color: {

        },
        thickness: 3
    }
});

var shapeRenderer = new ShapeRenderer();

var renderSystem = new RenderSystem(viewport);
renderSystem.addRenderer(shapeRenderer);

var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(star);

var game = new Game();

game.addSystem(keyboardInputSystem);
game.addSystem(renderSystem);
game.addSystem(controllerSystem);

game.addEntity(star);

game.play();

