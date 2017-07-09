"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter = (function () {
    function Sorter(baseValue, level) {
        this.baseValue = baseValue;
        this.level = level;
    }
    Sorter.prototype.addNextValue = function (sortFunction, nextValue) {
        if (sortFunction(this.baseValue, nextValue) > 0) {
            if (this.previousBucket == undefined) {
                this.previousBucket = new Sorter(nextValue, this.level - 1);
                return this.level - 1;
            }
            else {
                return this.previousBucket.addNextValue(sortFunction, nextValue);
            }
        }
        else {
            if (this.nextBucket == undefined) {
                this.nextBucket = new Sorter(nextValue, this.level + 1);
                return this.level + 1;
            }
            else {
                return this.nextBucket.addNextValue(sortFunction, nextValue);
            }
        }
    };
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=Sorter.js.map