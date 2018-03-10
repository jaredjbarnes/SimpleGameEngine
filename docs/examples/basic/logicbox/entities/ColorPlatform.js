import Entity from "./../../../../../src/Entity";
import State from "./../../../../../src/components/State"
import Position from "./../../../../../src/components/Position";
import Size from "./../../../../../src/components/Size";
import Collidable from "./../../../../../src/components/Collidable";
import Shape from "./../../../../../src/components/Shape";

export default class ColorPlatform extends Entity {
    constructor(x, y) {
        super();

        var position = new Position();
        var size = new Size();
        var collidable = new Collidable();
        var shape = new Shape();
        var state = new State();

        shape.points.push(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
            { x: 0, y: 0 }
        );

        shape.fillColor.red = 255;

        size.width = 100;
        size.height = 100;

        state.stateManagerName = "color-state-manager";
        state.name = "blue-state";

        position.x = x;
        position.y = y;
        position.isDirty = true;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
        this.addComponent(shape);
        this.addComponent(state);
    }
}