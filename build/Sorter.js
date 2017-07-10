"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter = (function () {
    function Sorter() {
    }
    Sorter.prototype.quickSort = function (comparerFunction, data, lowIndex, highIndex) {
        if (highIndex - lowIndex <= 1) {
            return;
        }
        var pivot = data[highIndex - 1];
        var splitIndex = lowIndex;
        for (var i = lowIndex; i < highIndex - 1; i++) {
            if (comparerFunction(data[i], pivot) <= 0) {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.quickSort(comparerFunction, data, lowIndex, splitIndex);
        this.quickSort(comparerFunction, data, splitIndex + 1, highIndex);
        return;
    };
    Sorter.prototype.swap = function (data, index1, index2) {
        var temp = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    };
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=Sorter.js.map