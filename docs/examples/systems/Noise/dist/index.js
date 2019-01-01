/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utilities_Noise__ = __webpack_require__(1);



const noise = new __WEBPACK_IMPORTED_MODULE_0__src_utilities_Noise__["a" /* default */](1234567000000000321);
const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const getColor = (x, y) => {
    return Math.floor(((noise.perlin(x / 20, y / 20) + 1) / 2) * 255);
};

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const value = getColor(x, y);
        context.fillStyle = `rgba(${value}, ${value}, ${value}, 1)`;
        context.fillRect(x, y, 1, 1);
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. rowou may use it as you see fit, but
 * attribution is appreciated.
 *
 */

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(x, y) {
        return this.x * x + this.y * y;
    }
}

class Noise {
    constructor(seed) {
        this.directionalVectors = [new Vector(1, 1), new Vector(-1, 1), new Vector(1, -1), new Vector(-1, -1),
        new Vector(1, 0), new Vector(-1, 0), new Vector(1, 0), new Vector(-1, 0),
        new Vector(0, 1), new Vector(0, -1), new Vector(0, 1), new Vector(0, -1)];

        this.whiteNoise = [151, 160, 137, 91, 90, 15,
            131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
            190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
            88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
            77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
            102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
            135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
            5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
            223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
            129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
            251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
            49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
            138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
        // To remove the need for index wrapping, double the permutation table length
        this.permutation = new Array(512);
        this.vectorNoise = new Array(512);

        this.seed(seed || 0);
    }

    seed(seed) {
        if (seed > 0 && seed < 1) {
            // Scale the seed out
            seed *= 65536;
        }

        seed = Math.floor(seed);
        if (seed < 256) {
            seed |= seed << 8;
        }

        let whiteNoise = this.whiteNoise;
        for (let i = 0; i < 256; i++) {
            let value;
            if (i & 1) {
                value = whiteNoise[i] ^ (seed & 255);
            } else {
                value = whiteNoise[i] ^ ((seed >> 8) & 255);
            }

            let permutation = this.permutation;
            let vectorNoise = this.vectorNoise;
            permutation[i] = permutation[i + 256] = value;
            vectorNoise[i] = vectorNoise[i + 256] = this.directionalVectors[value % 12];
        }
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    perlin(x, y) {
        // Find unit grid cell containing point
        let column = Math.floor(x), row = Math.floor(y);
        // Get relative xy coordinates of point within that cell
        x = x - column; y = y - row;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        column = column & 255; row = row & 255;

        // Calculate noise contributions from each of the four corners
        let permutation = this.permutation;
        let vectorNoise = this.vectorNoise;
        let corner1 = vectorNoise[column + permutation[row]].dot(x, y);
        let corner2 = vectorNoise[column + permutation[row + 1]].dot(x, y - 1);
        let corner3 = vectorNoise[column + 1 + permutation[row]].dot(x - 1, y);
        let corner4 = vectorNoise[column + 1 + permutation[row + 1]].dot(x - 1, y - 1);

        // Compute the fade curve value for x
        let u = this.fade(x);

        // Interpolate the four results
        return this.lerp(
            this.lerp(corner1, corner3, u),
            this.lerp(corner2, corner4, u),
            this.fade(y));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Noise);



/***/ })
/******/ ]);