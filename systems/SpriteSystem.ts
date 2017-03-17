import Sprite = require("./../components/Sprite");
import Game = require("./../Game");
import Entity = require("./../Entity");

const DEPENDENCIES = ["sprite", "image-texture"];

class SpriteSystem {
    game: Game;
    entities: Map<string, Entity>;

    constructor() {
        this.game = null;
        this.entities = new Map();
    }

    cacheEntities() {
        this.game.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update() {

        this.entities.forEach((entity) => {
            var sprite = entity.getComponent<Sprite>("sprite");
            var imageTexture = entity.getComponent<any>("image-texture");
            var position = entity.getComponent<any>("position");

            var index = Math.floor(sprite.index);
            var newImageTexture = sprite.images[index];

            if (newImageTexture == null) {
                return;
            }

            Object.keys(newImageTexture).forEach(function (key) {
                if (key === "type") {
                    return;
                }
                imageTexture[key] = newImageTexture[key];
            });

            imageTexture.isDirty = true;

            sprite.index += (sprite.timeScale * 1);
            sprite.index = sprite.index >= sprite.images.length ? 0 : sprite.index;

        });


    }

    entityAdded(entity: Entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity: Entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.set(entity.id, entity);
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

    activated(game: Game) {
        this.game = game;
        this.cacheEntities();
    }

    deactivated() {
        this.game = null;
        this.entities = new Map();
    }

}

export = SpriteSystem;


