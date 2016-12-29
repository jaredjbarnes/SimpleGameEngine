import RigidBody = require("./../components/RigidBody");
import Position = require("./../components/Position");
import Game = require("./../Game");
import Entity = require("./../Entity");

const DEPENDENCIES = ["character-collidable", "rigid-body", "position"];

class CharacterCollisionSystem {
    game: Game;
    entities: Map<string, Entity>;

    constructor() {
        this.entities = new Map();
        this.game = null;
    }

    update() {
        this.entities.forEach( (entity)=> {
            this.updateEntity(entity);
        });
    }

    activated(game: Game) {
        this.game = game;
        game.getEntities().forEach( (entity) =>{
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.game = null;
        this.entities.clear();
    }

    entityAdded(entity: Entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity: Entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity:Entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity:Entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1){
            this.entities.delete(entity.id); 
        }
    }

    updateEntity(entity: Entity) {
        var activeCollisions = entity.getComponent<RigidBody>("rigid-body").activeCollisions;
        var collisions = Array.from(activeCollisions.values());
        var position = entity.getComponent<Position>("position");

        collisions.forEach((collision) => {
            if (collision.endTimestamp == null) {
                position.x = position.x + Math.round(collision.penetration.x);
                position.y = position.y + Math.round(collision.penetration.y);
            }
        });

    }

}



