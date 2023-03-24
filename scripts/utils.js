/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function getRandomInt(max,min=0) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min) + min);
}