"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an iterator item
 */
var IteratorItem = (function () {
    /**
     * Default constructor with parameters
     * @param value Value of the iterator item
     * @param finished If true, the last item of the iterator is reached
     */
    function IteratorItem(value, finished) {
        this.isLastEntry = finished;
        this.value = value;
    }
    return IteratorItem;
}());
exports.IteratorItem = IteratorItem;
//# sourceMappingURL=IteratorItem.js.map