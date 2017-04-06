define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector {
        static add(vectorA, vectorB, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = vectorA.x + vectorB.x;
            optionalVector.y = vectorA.y + vectorB.y;
            return optionalVector;
        }
        static subtract(vectorA, vectorB, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = vectorA.x - vectorB.x;
            optionalVector.y = vectorA.y - vectorB.y;
            return optionalVector;
        }
        static multiply(vectorA, vectorB, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = vectorA.x * vectorB.x;
            optionalVector.y = vectorA.y * vectorB.y;
            return optionalVector;
        }
        static divide(vectorA, vectorB, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = vectorA.x / vectorB.x;
            optionalVector.y = vectorA.y / vectorB.y;
            return optionalVector;
        }
        static scale(vector, scale, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = scale * vector.x;
            optionalVector.y = scale * vector.y;
            return optionalVector;
        }
        static project(vectorA, vectorB, optionalVector) {
            var scale;
            var firstDot = Vector.dot(vectorA, vectorB);
            var secondDot = Vector.dot(vectorB, vectorB);
            if (!firstDot || !secondDot) {
                scale = 0;
            }
            else {
                scale = firstDot / secondDot;
            }
            return Vector.scale(vectorB, scale, optionalVector);
        }
        static getLeftNormal(vector, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = -vector.y;
            optionalVector.y = vector.x;
            return optionalVector;
        }
        static getRightNormal(vector, optionalVector) {
            optionalVector = optionalVector || {};
            optionalVector.x = vector.y;
            optionalVector.y = -vector.x;
            return optionalVector;
        }
        static magnitude(vector) {
            return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
        }
        static dot(vectorA, vectorB) {
            return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
        }
        static negate(vector) {
            return { x: -vector.x, y: -vector.y };
        }
        static normalize(vector, optionalVector) {
            optionalVector = optionalVector || {};
            var magnitude = Vector.magnitude(vector);
            if (magnitude === 0) {
                optionalVector.x = 0;
                optionalVector.y = 0;
            }
            optionalVector.x = vector.x / magnitude;
            optionalVector.y = vector.y / magnitude;
            return optionalVector;
        }
    }
    exports.default = Vector;
});
//# sourceMappingURL=Vector.js.map