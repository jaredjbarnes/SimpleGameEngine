﻿import Entity = require("./../Entity");
import Shape = require("./../components/Shape");
import Size = require("./../components/Size");
import Position = require("./../components/Position");
import KeyboardInput = require("./../components/KeyboardInput");
import KeyboardController = require("./../components/KeyboardController");
import Collidable = require("./../components/Collidable");

class StaticStar extends Entity {
    constructor(config?) {
        super();

        config = config || {};

        var spikes = config.spikes || 5;

        var fillColor = config.fillColor || {
            red: 70,
            green: 180,
            blue: 70,
            alpha: 1
        };

        var border = config.border || {
            thickness: 1,
            color: {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 0
            }
        };

        if (typeof spikes !== "number") {
            spikes = 5;
        }

        if (spikes < 3) {
            spikes = 3;
        }

        var shape = new Shape();
        var step = Math.PI / spikes;
        var rotation = Math.PI / 2 * 3;
        var x;
        var y;

        for (var i = 0; i < spikes; i++) {
            x = 0.5 + (Math.cos(rotation) * 0.45);
            y = 0.5 + (Math.sin(rotation) * 0.45);

            shape.points.push({
                x: x,
                y: y
            })

            rotation += step

            x = 0.5 + (Math.cos(rotation) * 0.25);
            y = 0.5 + (Math.sin(rotation) * 0.25);

            shape.points.push({
                x: x,
                y: y
            });

            rotation += step
        }

        shape.fillColor = fillColor;
        shape.border = border;

        var position = new Position();
        var size = new Size();
        var collidable = new Collidable();

        size.width = 100;
        size.height = 100;

        this.addComponent(shape);
        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
    }
}

export = StaticStar;