import Game = require("./Game");
import ShapeRenderer = require("./systems/renderers/ShapeRenderer");
import RenderSystem = require("./systems/RenderSystem");
import KeyboardInputSystem = require("./systems/KeyboardInputSystem");
import ControllerSystem = require("./systems/ControllerSystem");

import Star = require("./entities/Star");

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

var shapeRenderer = new ShapeRenderer(document);
var viewport = <HTMLCanvasElement>document.getElementById("viewport");
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

