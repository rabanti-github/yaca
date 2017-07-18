"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for sorter algorithms
 */
var Sorter = (function () {
    function Sorter() {
    }
    /**
     * Implementation of a quicksort algorithm. This method is called recursively
     * @param comparerFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
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
    /**
     * Internal swap method for quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    Sorter.prototype.swap = function (data, index1, index2) {
        var temp = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    };
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=Sorter.js.map