import Game from "./../Game";
import Entity from "./../Entity";
import Movable from "./../components/Movable";
import Position from "./../components/Position";

const DEPENDENCIES = ["movable", "position"];

class MovementEntity {
    position: Position;
    movable: Movable;

    constructor(entity: Entity) {
        this.movable = entity.getComponent<Movable>("movable");
        this.position = entity.getComponent<Position>("position");
    }
}

export default class MovementSystem {
    game: Game;
    entities: Map<string, MovementEntity>

    constructor() {
        this.game = null;
        this.entities = new Map();
    }

    update() {
        this.entities.forEach((entity) => {
            var position = entity.position;
            var movable = entity.movable;

            position.x += movable.x;
            position.y += movable.y;

            if (movable.x != 0 || movable.y != 0) {
                position.isDirty = true;
            }

            movable.x = 0;
            movable.y = 0;
        });
    }

    activated(game: Game) {
        this.game = game;
        this.game.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.game = null;
    }

    entityAdded(entity: Entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new MovementEntity(entity));
        }
    }

    entityRemoved(entity: Entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.delete(entity.id);
        }
    }

    componentAdded(entity: Entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new MovementEntity(entity));
        }
    }

    componentRemoved(entity: Entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

}