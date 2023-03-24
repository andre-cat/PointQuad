import { Box } from "./box.js";
import { Point } from "./point.js";

export class QuadTree {

    /** @type {Box}     */ #box;
    /** @type {number}  */ #size;
    /** @type {Point[]} */ #points;
    /** @type {boolean} */ #divided;

    /** @description four boxes named with cardinal points*/
    /** @type {QuadTree} */ #nw;
    /** @type {QuadTree} */ #ne;
    /** @type {QuadTree} */ #sw;
    /** @type {QuadTree} */ #se;

    /**
     * @param {Box} box 
     * @param {number} size
     */
    constructor(box, size) {
        this.#box = box;
        this.#points = [];
        this.#divided = false;
        this.#nw = undefined;
        this.#ne = undefined;
        this.#sw = undefined;
        this.#se = undefined;
        this.#size = size;
    };

    get box() { return this.#box; };
    get points() { return this.#points; };
    get divided() { return this.#divided; };
    get nw() { return this.#nw; };
    get ne() { return this.#ne; };
    get sw() { return this.#sw; };
    get se() { return this.#se; };
    get draw() { return this.#draw; };

    #divide() {
        /** @type {number} */ let x = this.#box.x;
        /** @type {number} */ let y = this.#box.y;
        /** @type {number} */ let w = this.#box.w / 2;
        /** @type {number} */ let h = this.#box.h / 2;

        /** @type {Box} */ let nwBox = new Box(x + 0, y + 0, w, h);
        /** @type {Box} */ let neBox = new Box(x + w, y + 0, w, h);
        /** @type {Box} */ let sWBox = new Box(x + 0, y + h, w, h);
        /** @type {Box} */ let seBox = new Box(x + w, y + h, w, h);

        this.#nw = new QuadTree(nwBox, this.#size);
        this.#ne = new QuadTree(neBox, this.#size);
        this.#sw = new QuadTree(sWBox, this.#size);
        this.#se = new QuadTree(seBox, this.#size);

        this.#divided = true;
    };

    /**
     * 
     * @param {Point} point 
     * @returns {boolean}
     */
    insert(point) {
        if (this.#box.inBox(point)) {
            if (this.#points.length < this.#size) {
                if (!this.#points.includes(point)) {
                    this.#points.push(point)
                }
            } else {
                if (!this.#divided) {
                    this.#divide();
                }
                if (!this.#nw.insert(point)) {
                    if (!this.#ne.insert(point)) {
                        if (!this.#sw.insert(point)) {
                            this.#se.insert(point);
                        }
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    };

    /**
     * 
     * @param {Two} two 
     */
    #draw(two) {

        /** @type {any} */ const figures = [];
        /** @type {QuadTree[]} */ const queue = [this];

        while (queue.length > 0) {
            /** @type {QuadTree} */ let quadTree = queue.shift();

            let x = Math.round(quadTree.box.x + quadTree.box.w / 2);
            let y = Math.round(quadTree.box.y + quadTree.box.h / 2);

            const rect = two.makeRectangle(x, y, quadTree.box.w, quadTree.box.h);
            rect.noFill();
            rect.stroke = 'gainsboro';
            rect.linewidth = 1;
            rect.opacity = 0.1;
            figures.push(rect);
            
            for (let point of quadTree.points) {
                const circ = two.makeCircle(point.x, point.y, 2);
                circ.fill = "ivory";
                circ.stroke = "slateblue";
                circ.linewidth = 2;
                circ.opacity = 1;
                figures.push(circ);
            }

            if (quadTree.divided) {
                queue.push(quadTree.ne, quadTree.nw, quadTree.se, quadTree.sw);
            }
        }

        var group = two.makeGroup(figures);
        group.translation.set(two.width / 2 - this.#box.w / 2, two.height / 2 - this.#box.h / 2);

        two.update();
    }
};