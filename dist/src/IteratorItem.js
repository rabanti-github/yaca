"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class represents an iterator item
 */
var IteratorItem = /** @class */ (function () {
    function IteratorItem(value, finished) {
        if (value !== undefined) {
            this.value = value;
        }
        if (finished !== undefined) {
            this.isLastEntry = finished;
        }
        else {
            this.isLastEntry = false;
        }
    }
    return IteratorItem;
}());
exports.IteratorItem = IteratorItem;
//# sourceMappingURL=IteratorItem.js.map