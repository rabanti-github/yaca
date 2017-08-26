/**
 * Class representing an iterator item
 */
export class IteratorItem {
    constructor(value, finished) {
        if (value !== undefined) {
            this.value = value;
        }
        if (finished !== undefined) {
            this.done = finished;
        }
        else {
            this.done = false;
        }
    }
}
//# sourceMappingURL=IteratorItem.js.map