import easings from "./easings";

export default class AnimationManager {
    constructor() {
        this.name = "animation-manager-service";
        this.animations = [];
        this.currentTime = 0;
        this.world = null;
    }

    addAnimation(animation) {
        this.animations.push(animation);
    }

    removeAnimation(animation) {
        let index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
        }
    }

    cleanAnimations() {
        this.animations = this.animations.filter((animation) => {
            return !animation.isComplete;
        });
    }

    updateAnimations() {
        let animations = this.animations;
        let length = animations.length;
        let currentTime = this.currentTime;

        for (let x = 0; x < length; x++) {
            let animation = animations[x];
            let change = animation.endValue - animation.startValue;
            let target = animation.target;
            let property = animation.property;

            if (animation.startTime > currentTime) {
                return;
            }

            if (property == null || target == null) {
                return;
            }

            if (animation.endValue === 0 || animation.duration === 0) {
                target[property] = animation.endValue;
                return;
            }

            let onIteration = Math.floor((currentTime - animation.startTime) / animation.duration);

            // Handle repeat
            if (onIteration < animation.repeat) {
                let overlap;
                let easing = easings[animation.easing] || easings.linear;

                //Handle directions.
                if (animation.repeatDirection === 0) {

                    overlap = (currentTime - animation.startTime) % animation.duration;

                } else {

                    // If divisable by 2 then its going forward.
                    if (onIteration % 2 === 0) {
                        overlap = (currentTime - animation.startTime) % animation.duration;
                    } else {
                        overlap = animation.duration - ((currentTime - animation.startTime) % animation.duration);
                    }

                }

                if (animation.isInteger) {
                    target[property] = Math.round(easing(overlap, animation.startValue, change, animation.duration));
                } else {
                    target[property] = easing(overlap, animation.startValue, change, animation.duration);
                }

            } else {

                if (animation.repeatDirection === 0) {
                    target[property] = animation.endValue;
                } else {
                    if (onIteration % 2 === 0) {
                        target[property] = animation.startValue;
                    } else {
                        target[property] = animation.endValue;
                    }
                }

                animation.isComplete = true;

            }

            animation.iterations = onIteration;
            animation.progress = target[property] / (animation.endValue - animation.startValue);

        }

    }

    update(currentTime) {
        this.currentTime = currentTime;
        this.updateAnimations();
        this.cleanAnimations();
    }

    activated(world) {
        this.world = world;
    }

    deactivated() {
        this.world = null;
    }

}


