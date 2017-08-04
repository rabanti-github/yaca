"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparer_1 = require("./Comparer");
/**
 * Class for sorter algorithms
 */
var Sorter = (function () {
    /**
     * Constructor of the sorter object
     * @param sample The sample is necessary to determine whether T is a basic / common type and whether a compareTo function was implemented
     */
    function Sorter(sample) {
        this._iCompareToImplemented = false;
        this._iIsBasicType = false;
        this._iIsCommonType = false;
        this._iCompareToImplemented = this.isComparable(sample);
        this.checkBasicCommonType(sample);
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
         * Indicates whether type T is a basic type such as number, boolean or string
         */
        get: function () {
            return this._iIsBasicType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sorter.prototype, "isCommonType", {
        /**
         * Indicates whether type T is a commonly used type such as number, boolean, string or Date
         */
        get: function () {
            return this._iIsCommonType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Implementation of a quicksort algorithm using a static compareTo function. This method is called recursively
     * @param comparerFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    Sorter.prototype.sortByFunction = function (comparerFunction, data, lowIndex, highIndex) {
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
        this.sortByFunction(comparerFunction, data, lowIndex, splitIndex);
        this.sortByFunction(comparerFunction, data, splitIndex + 1, highIndex);
        return;
    };
    /**
     * Implementation of a quicksort algorithm using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    Sorter.prototype.sortByImplementation = function (data, lowIndex, highIndex) {
        if (highIndex - lowIndex <= 1) {
            return;
        }
        var pivot = data[highIndex - 1];
        var splitIndex = lowIndex;
        for (var i = lowIndex; i < highIndex - 1; i++) {
            if (data[i].compareTo(pivot) <= 0) {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.sortByImplementation(data, lowIndex, splitIndex);
        this.sortByImplementation(data, splitIndex + 1, highIndex);
        return;
    };
    /**
     * Implementation of a quicksort algorithm using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    Sorter.prototype.sortByDefault = function (data, lowIndex, highIndex) {
        if (highIndex - lowIndex <= 1) {
            return;
        }
        var pivot = data[highIndex - 1];
        var splitIndex = lowIndex;
        for (var i = lowIndex; i < highIndex - 1; i++) {
            if (this._iDefaultFunction(data[i], pivot) <= 0) {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.sortByDefault(data, lowIndex, splitIndex);
        this.sortByDefault(data, splitIndex + 1, highIndex);
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
     * Checks whether the type is comparable due to the implementation of a compareTo function
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
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Checks the type of the passed object and sets the appropriate compareTo function if applicable
     * @param obj object to check the type
     */
    Sorter.prototype.checkBasicCommonType = function (obj) {
        if (obj === undefined) {
            // throw new Error("undefined as value is not allowed while sorting");
            this._iIsBasicType = false;
            this._iIsCommonType = false;
        }
        if (typeof obj === 'number') {
            this._iDefaultFunction = Comparer_1.Comparer.compareNumbers;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === 'boolean') {
            this._iDefaultFunction = Comparer_1.Comparer.compareBooleans;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === 'string') {
            this._iDefaultFunction = Comparer_1.Comparer.compareStrings;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (obj instanceof Date) {
            this._iDefaultFunction = Comparer_1.Comparer.compareDates;
            this._iIsCommonType = true;
        }
    };
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=Sorter.js.map