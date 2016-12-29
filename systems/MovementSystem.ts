import Game = require("./../Game");
import Entity = require("./../Entity");
import Movable = require("./../components/Movable");
import Position = require("./../components/Position");

const MOVABLE = "movable";
const DEPENDENCIES = [MOVABLE,"position"];

class MovementSystem {
    game: Game;
    entities: Map<string, Entity>

    constructor(){
        this.game = null;
        this.entities = new Map();
    }

    update(){
        Array.from(this.entities.values()).forEach((entity)=>{
            var movable = entity.getComponent<Movable>("movable");
            var position = entity.getComponent<Position>("position");

            position.x += movable.x;
            position.y += movable.y; 

            movable.x = 0;
            movable.y = 0;
        });
    }

    activated(game: Game){
        this.game = game;
        this.game.getEntities().forEach((entity)=>{
            this.entityAdded(entity);
        });
    }

    deactivated(){
        this.game = null;
    }

    entityAdded(entity: Entity){
        if (entity.hasComponents(DEPENDENCIES)){
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity: Entity){
        if (entity.hasComponents(DEPENDENCIES)){
            this.entities.delete(entity.id);
        }
    }

    componentAdded(component, entity: Entity){
        if (entity.hasComponents(DEPENDENCIES)){
            this.entities.set(entity.id, entity);
        }
    }

    componentRemoved(component, entity: Entity){
        if (!entity.hasComponents(DEPENDENCIES)){
            this.entities.delete(entity.id);
        }
    }
    
}

export = MovementSystem;