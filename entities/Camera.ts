import Entity = require("./../Entity");
import CameraComponent = require("./../components/Camera");
import Size = require("./../components/Size");
import Position = require("./../components/Position");


class Camera extends Entity {
    constructor(name?) {
        super();

        var camera = new CameraComponent();
        camera.name = name || null;

        var position = new Position();
        var size = new Size();

        this.addComponent(camera);
        this.addComponent(position);
        this.addComponent(size);
    }
}

export = Camera;