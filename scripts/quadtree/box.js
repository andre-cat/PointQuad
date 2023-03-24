import { Point } from "./point.js";

export class Box {

    /** @type {number} */ #x;
    /** @type {number} */ #y;
    /** @type {number} */ #w;
    /** @type {number} */ #h;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     */
    constructor(x, y, w, h) {
        this.#x = x;
        this.#y = y;
        this.#w = w;
        this.#h = h;
    };

    get x() { return this.#x; };
    get y() { return this.#y; };
    get w() { return this.#w; };
    get h() { return this.#h; };
    get inBox() { return this.#inBox; };

    /**
     * 
     * @param {Point} point 
     * @returns {boolean}
     */
    #inBox(point) {
        return (
            point.x >= this.#x &&
            point.x <= this.#x + this.#w &&
            point.y >= this.#y &&
            point.y <= this.#y + this.#h
        );
    };
};