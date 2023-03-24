export class Point {

    /** @type {number}*/ #x;
    /** @type {number}*/ #y;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    };

    get x() { return this.#x; };
    get y() { return this.#y; };
};