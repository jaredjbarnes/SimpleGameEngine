import DynamicLoader from "./DynamicLoader.js";

export default class ComponentLoader extends DynamicLoader {
    constructor() {
        super({
            "bitmap": "../components/Bitmap.js",
            "camera": "../components/Camera.js",
            "cursor": "../components/Cursor.js",
            "fixed": "../components/Fixed.js",
            "follower": "../components/Follower.js",
            "history-player": "../components/HistoryPlayer.js",
            "image": "../components/Image.js",
            "keyboard-controller": "../components/KeyboardController.js",
            "keyboard-input": "../components/KeyboardInput.js",
            "line": "../components/Line.js",
            "logic": "../components/Logic.js",
            "movable": "../components/Movable.js",
            "opacity": "../components/Opacity.js",
            "polygon": "../components/Polygon.js",
            "polygon-body": "../components/PolygonBody.js",
            "polygon-collider": "../components/PolygonCollider.js",
            "record": "../components/Record.js",
            "rectangle": "../components/Rectangle.js",
            "rectangle-collider": "../components/RectangleCollider.js",
            "relative-position": "../components/RelativePosition.js",
            "rigid-body": "../components/RigidBody.js",
            "selectable": "../components/Selectable.js",
            "shape": "../components/Shape.js",
            "sprite": "../components/Sprite.js",
            "sprite-set": "../components/SpriteSet.js",
            "state": "../components/State.js",
            "text": "../components/Text.js",
            "transform": "../components/Transform.js"
        });
    }
}

