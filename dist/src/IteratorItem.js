"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an iterator item
 */
var IteratorItem = (function () {
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