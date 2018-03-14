// These helper methods are static for optimization purposes. 
// The optional references allows the developer to choose where the
// result is saved to. This is huge for GC.

export default class Vector {

    static add(vectorA, vectorB, reference = {}) {
        reference.x = vectorA.x + vectorB.x;
        reference.y = vectorA.y + vectorB.y;

        return reference;
    }

    static subtract(vectorA, vectorB, reference = {}) {
        reference.x = vectorA.x - vectorB.x;
        reference.y = vectorA.y - vectorB.y;

        return reference;
    }

    static multiply(vectorA, vectorB, reference = {}) {
        reference.x = vectorA.x * vectorB.x;
        reference.y = vectorA.y * vectorB.y;

        return reference;
    }

    static divide(vectorA, vectorB, reference = {}) {
        reference.x = vectorA.x / vectorB.x;
        reference.y = vectorA.y / vectorB.y;

        return reference;
    }

    static scale(vector, scale, reference = {}) {
        reference.x = scale * vector.x;
        reference.y = scale * vector.y;

        return reference;
    }

    static project(vectorA, vectorB, reference = {}) {
        var scale;

        var firstDot = Vector.dot(vectorA, vectorB);
        var secondDot = Vector.dot(vectorB, vectorB);

        if (!firstDot || !secondDot) {
            scale = 0;
        } else {
            scale = firstDot / secondDot;
        }

        return Vector.scale(vectorB, scale, reference);
    }

    static getLeftNormal(vector, reference = {}) {
        reference.x = -vector.y;
        reference.y = vector.x;

        return reference;
    }

    static getRightNormal(vector, reference = {}) {
        reference.x = vector.y;
        reference.y = -vector.x;

        return reference;
    }

    static magnitude(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    }

    static dot(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    }

    static negate(vector, reference = {}) {
        reference.x = -vector.x;
        refernece.y = -vector.y;

        return reference;
    }

    static rotate(vector, angle, reference = {}) {
        const radians = angle * Math.PI / 180;
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        const x = vector.x;
        const y = vector.y;

        // The multiplying and dividing is to limit the floating point.
        reference.x = Math.round(1000 * (x * cos - y * sin)) / 1000;
        reference.y = Math.round(1000 * (x * sin + y * cos)) / 1000;

        return reference;
    }

    static normalize(vector, reference = {}) {

        var magnitude = Vector.magnitude(vector);

        if (magnitude === 0) {
            reference.x = 0;
            reference.y = 0;
        }

        reference.x = vector.x / magnitude;
        reference.y = vector.y / magnitude;

        return reference;
    }
}