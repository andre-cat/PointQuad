import { Point } from "./point.js";
import { QuadTree } from "./quadtree.js";
import { Box } from "./box.js";
import * as Utils from "./../utils.js";

/**
 * 
 * @param {number} n
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} s
 */
export function simpleQuadTree(n,x,y,w,h,s) {
    var options = { fullscreen: true };
    var element = document.body;
    var two = new Two(options).appendTo(element);
    two.renderer.domElement.style.background = '#131e29';

    /** @type {Box} */ let box = new Box(x, y, w, h);
    /** @type {QuadTree} */ let quadTree = new QuadTree(box, s);

    for (let i = 1; i <= n; i++) {
        /** @type {Point} */ let point = new Point(Utils.getRandomInt(quadTree.box.w), Utils.getRandomInt(quadTree.box.h));
        quadTree.insert(point);
    }

    quadTree.draw(two);

    two.update();
}