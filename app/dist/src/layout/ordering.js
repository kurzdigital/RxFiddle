"use strict";
const crossings_1 = require("./crossings");
const median_1 = require("./median");
const transpose_1 = require("./transpose");
/*
 * @see http://www.graphviz.org/Documentation/TSE93.pdf page 14
 *
 * 1. init order
 * 2. for maxiterations
 * 3. wmedian
 * 4. transpose
 * 5. if (crossing < crossing)
 * 6.   best = order
 * 7. return best
 *
 */
function ordering(order, g) {
    let best;
    let bestCrossings = Number.MAX_SAFE_INTEGER;
    let bestIt = -1;
    let sameCount = 0;
    let lastCrossings = Number.MAX_SAFE_INTEGER;
    let update = (next, i) => {
        try {
            // See if improved: store better results
            let crossings = crossings_1.order_crossings(next, g);
            if (crossings < bestCrossings) {
                best = next.map(o => o.slice(0));
                bestCrossings = crossings;
                bestIt = i;
            }
            // Abort if stable
            if (lastCrossings === crossings || crossings === 0) {
                sameCount++;
                if (sameCount > 3 || crossings === 0) {
                    return false;
                }
            }
            lastCrossings = crossings;
        }
        catch (e) {
            console.warn("Error working with", next);
            throw e;
        }
        return true;
    };
    update(order, 0);
    for (let i = 0; i < 40; i++) {
        median_1.wmedian(order, g, i % 2 === 0 ? "up" : "down");
        transpose_1.transpose(order, g, "down");
        transpose_1.transpose(order, g, "up");
        if (!update(order, i + 1)) {
            break;
        }
    }
    return best;
}
exports.ordering = ordering;
//# sourceMappingURL=ordering.js.map