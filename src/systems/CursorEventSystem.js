import CursorEvents from "../components/CursorEvents";
import Entity from "../Entity";

export default class CursorEventSystem {
    constructor() {
        this.world = null;
        this.cursorEntity = null;
        this.cursorEventsEntity = null;
        this.cursorEvents = null;
        this.cursor = null;
        window.cursorEventSystem = this;
    }

    activated(world) {
        this.world = world;
        this.cursorEventsEntity = new Entity();
        this.cursorEvents = new CursorEvents();
        this.cursorEventsEntity.addComponent(this.cursorEvents);

        this.world.addEntity(this.cursorEventsEntity);

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (component.type === "cursor") {
            this.cursorEntity = null;
        }
    }

    createMouseDownEvent() {
        const cursorCollidable = this.cursorEntity.getComponent("collidable");
        const collisions = cursorCollidable.collisions;
        const collisionsClone = {};

        for (let id in collisions) {
            collisionsClone[id] = collisions[id];
        }

        this.cursorEvents.events.mouseDown = collisions;
    }

    createMouseUpEvent() {
        const cursorCollidable = this.cursorEntity.getComponent("collidable");
        const collisions = cursorCollidable.collisions;
        const collisionsClone = {};

        for (let id in collisions) {
            collisionsClone[id] = collisions[id];
        }

        this.cursorEvents.events.mouseUp = collisions;
    }

    createMouseOverEvent() {
        const cursorCollidable = this.cursorEntity.getComponent("collidable");
        this.cursorEvents.events.mouseOver = cursorCollidable.collisions;
    }

    createClickEvent() {
        const collisions = {};
        const events = this.cursorEvents.events;

        for (let id in events.mouseUp) {
            if (events.mouseDown[id]) {
                collisions[id] = events.mouseDown[id]
            }
        }

        events.click = collisions;
        console.log(collisions);
    }

    deactivated() {
        this.world.removeEntity(this.cursorEventsEntity);
        this.world = null;
        this.cursorEntity = null;
        this.cursorEventsEntity = null;
        this.cursor = null;
    }

    entityAdded(entity) {
        if (entity.hasComponent("cursor")) {
            this.cursorEntity = entity;
            this.cursor = this.cursorEntity.getComponent("cursor");
            this.createMouseOverEvent();
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponent("cursor")) {
            this.cursorEntity = null;
        }
    }

    isMouseDown() {
        const events = this.cursorEvents.events;
        const cursor = this.cursor;
        return events.mouseDown == null && cursor.isLeftButtonDown
    }

    isMouseUp() {
        const events = this.cursorEvents.events;
        const cursor = this.cursor;
        return events.mouseDown != null && !cursor.isLeftButtonDown;
    }

    ifFinished(){
        const events = this.cursorEvents.events;
        const cursor = this.cursor;
        return !this.cursor.isLeftButtonDown && this.cursorEvents.events.mouseUp != null;
    }

    update() {
        if (this.cursor) {
            const events = this.cursorEvents.events;
            const cursor = this.cursor;

            if (this.isMouseDown()) {
                this.createMouseDownEvent();
            } else if (this.isMouseUp()) {
                this.createMouseUpEvent();
                this.createClickEvent();
                this.cursorEvents.events.mouseDown = null;
            } else if (this.ifFinished()){
                this.cursorEvents.events.mouseUp = null;
                this.cursorEvents.events.click = null;
            }

            this.createMouseOverEvent();
        }
    }
}