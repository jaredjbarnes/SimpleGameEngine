import Animation from "./../../../../services/animation/Animation";

const DEPENDECIES = ["position", "size", "solid-body"];

const getRandomNumber = (min, max) => {
    let range = max - min;

    return parseInt(min + (Math.random() * range), 10);
};

export default class AnimateMoveSystem {
    constructor() {
        this.world = null;
        this.entities = [];
        this.animationManager = null;
        this.animations = {};
    }

    _addAnimation(entity) {
        let id = entity.id;
        let animation = new Animation();
        let position = entity.getComponent("position");

        animation.target = position;
        animation.property = "x";
        animation.startValue = position.x;
        animation.endValue = position.x + getRandomNumber(10, 150);
        animation.duration = getRandomNumber(500, 1000);
        animation.repeat = Infinity;
        animation.repeatDirection = 1;
        animation.easing = "easeInOutQuad";
        animation.isInteger = true;

        this.animationManager.addAnimation(animation);
        this.animations[id] = animation;
    }

    _removeAnimation(entity) {
        let id = entity.id;
        let animation = this.animations[id];

        delete this.animations[id];
        this.animationManager.removeAnimation(animation);
    }

    activated(world) {
        this.world = world;
        this.animationManager = world.getService("animationManager");
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDECIES)) {
            this.entities.push(entity);
            this._addAnimation(entity);
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDECIES.indexOf(component.type) > -1) {
            let index = this.entities.indexOf();
            if (index > -1) {
                this.entities.splice(index, 1);
                this._removeAnimation(entity);
            }
        }
    }

    deactivated() {
        this.world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDECIES)) {
            this.entities.push(entity);
            this._addAnimation(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDECIES)) {
            let index = this.entities.indexOf(entity);
            if (index > -1) {
                this.entities.splice(index, 1);
                this._removeAnimation(entity);
            }
        }
    }

    update() {
        this.entities.forEach((entity) => {
            let _entity = entity;
            _entity.getComponent("position").isDirty = true;
        });
    }
}