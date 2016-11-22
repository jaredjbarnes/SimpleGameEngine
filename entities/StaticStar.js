var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../Entity", "./../components/Shape", "./../components/Size", "./../components/Position", "./../components/Collidable"], function (require, exports, Entity, Shape, Size, Position, Collidable) {
    "use strict";
    var StaticStar = (function (_super) {
        __extends(StaticStar, _super);
        function StaticStar(config) {
            _super.call(this);
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
                });
                rotation += step;
                x = 0.5 + (Math.cos(rotation) * 0.25);
                y = 0.5 + (Math.sin(rotation) * 0.25);
                shape.points.push({
                    x: x,
                    y: y
                });
                rotation += step;
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
        return StaticStar;
    }(Entity));
    return StaticStar;
});
//# sourceMappingURL=StaticStar.js.map