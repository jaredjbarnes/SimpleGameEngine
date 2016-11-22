define(["require", "exports", "./Game", "./systems/renderers/ShapeRenderer", "./systems/RenderSystem", "./systems/KeyboardInputSystem", "./systems/ControllerSystem", "./entities/Star"], function (require, exports, Game, ShapeRenderer, RenderSystem, KeyboardInputSystem, ControllerSystem, Star) {
    "use strict";
    var star = new Star({
        spikes: 5,
        fillColor: {
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1
        },
        border: {
            color: {},
            thickness: 3
        }
    });
    var shapeRenderer = new ShapeRenderer(document);
    var viewport = document.getElementById("viewport");
    var renderSystem = new RenderSystem(viewport);
    renderSystem.addRenderer(shapeRenderer);
    var keyboardInputSystem = new KeyboardInputSystem(document);
    var controllerSystem = new ControllerSystem();
    var game = new Game(document);
    game.addSystem(keyboardInputSystem);
    game.addSystem(renderSystem);
    game.addSystem(controllerSystem);
    game.addEntity(star);
    game.play();
});
//# sourceMappingURL=main.js.map