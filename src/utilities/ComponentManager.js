import Camera from "./../components/Camera";
import SolidBody from "./../components/SolidBody";
import Collidable from "./../components/Collidable";
import FixedPosition from "./../components/FixedPosition";
import Force from "./../components/Force";
import Image from "./../components/Image";
import KeyboardController from "./../components/KeyboardController";
import KeyboardInput from "./../components/KeyboardInput";
import Movable from "./../components/Movable";
import Physics from "./../components/Physics";
import Position from "./../components/Position";
import NarrowPhaseCollidable from "./../components/NarrowPhaseCollidable";
import Serializable from "./../components/Serializable";
import Shape from "./../components/Shape";
import Size from "./../components/Size";
import Sprite from "./../components/Sprite";
import State from "./../components/State";
import TextTexture from "./../components/TextTexture";
import ZIndex from "./../components/ZIndex";

export default class ComponentManager {
    constructor() {
        this.types = {
            "camera": Camera,
            "solid-body": SolidBody,
            "collidable": Collidable,
            "fixed-position": FixedPosition,
            "force": Force,
            "image": Image,
            "keyboard-controller": Camera,
            "keyboard-input": KeyboardInput,
            "movable": Movable,
            "position": Position,
            "narrow-phase-collidable": NarrowPhaseCollidable,
            "serializable": Serializable,
            "shape": Shape,
            "size": Size,
            "sprite": Sprite,
            "state": State,
            "text-texture": TextTexture,
            "z-index": ZIndex,
        };
    }

    createComponent(type, properties) {
        var ComponentType = this.types[type];

        if (ComponentType == null) {
            throw new Error(`Couldn't find type: ${type}`);
        }

        var defaultComponent = new ComponentType();
        return Object.assign(defaultComponent, properties);
    }
}