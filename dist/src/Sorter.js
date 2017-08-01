"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for sorter algorithms
 */
var Sorter = (function () {
    function Sorter() {
        this._iCompareToImplemented = false;
        this._iIsBasicType = false;
        var obj = new Object();
        this._iCompareToImplemented = this.isComparable(obj);
    }
    Object.defineProperty(Sorter.prototype, "hasCompareToImplemented", {
        /**
         * Indicated whether type T is sortable due to the implementation of a compareTo function ort if it is a basic type like number, boolean, string or Date
         */
        get: function () {
            return this._iCompareToImplemented;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sorter.prototype, "isBasicType", {
        /**
         * Indicates whether type T is a basic type such as number, boolean, string or Date
         */
        get: function () {
            return this._iIsBasicType;
        },
        enumerable: true,
        configurable: true
    });
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
    /**
     * Checks whether the type T is comparable due to the implementation of a compareTo function
     * @param obj
     */
    Sorter.prototype.isComparable = function (obj) {
        try {
            if (obj.compareTo !== undefined) {
                if (typeof (obj.compareTo) === 'function') {
                    var type = obj.compareTo(obj);
                    if (typeof type === 'number') {
                        return true;
                    }
                }
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };
    Sorter.prototype.getInstance = function (type) {
        return new type();
    };
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=Sorter.js.map