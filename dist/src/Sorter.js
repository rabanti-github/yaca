"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparer_1 = require("./Comparer");
var KeyValuePair_1 = require("./KeyValuePair");
// ############### E N U M S ###############
/**
 * Enum for the sorter type
 */
var SorterType;
(function (SorterType) {
    /** A collection will be sorted by the default behavior of the objects  */
    SorterType[SorterType["sortByDefault"] = 0] = "sortByDefault";
    /** A collection will be sorted according to an implemented compareTo function */
    SorterType[SorterType["sortByImplementation"] = 1] = "sortByImplementation";
    /** A collection will be sorted according to a provided sorting function */
    SorterType[SorterType["sortByFunction"] = 2] = "sortByFunction";
})(SorterType || (SorterType = {}));
/**
 * Class for sorter algorithms
 */
var Sorter = /** @class */ (function () {
    function Sorter(sample, tupleSort) {
        // ############### P R I V A T E   V A R I A B L E S ###############
        this._iCompareToImplemented = false;
        this._iIsBasicType = false;
        this._iIsCommonType = false;
        this._iIsTupleSort = false;
        if (sample instanceof KeyValuePair_1.KeyValuePair && tupleSort !== undefined) {
            this._iIsTupleSort = tupleSort;
            this._iCompareToImplemented = this.isComparable(sample.key);
            this.checkBasicCommonType(sample.key);
        }
        else {
            this._iIsTupleSort = false;
            this._iCompareToImplemented = this.isComparable(sample);
            this.checkBasicCommonType(sample);
        }
    }
    Object.defineProperty(Sorter.prototype, "hasCompareToImplemented", {
        // ############### P R O P E R T I E S ###############
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
    Object.defineProperty(Sorter.prototype, "isTupleSort", {
        /**
         * Indicates whether single values or tuples are sorted. Tuples can only be sorted as KeyValuePairs
         */
        get: function () {
            return this._iIsTupleSort;
        },
        enumerable: true,
        configurable: true
    });
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Implementation of a Quicksort algorithm using a static compareTo function. This method is called recursively
     * @param comparisonFunction Comparison function to compare the list entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    Sorter.prototype.sortByFunction = function (comparisonFunction, data, lowIndex, highIndex) {
        this.internalSort(data, lowIndex, highIndex, SorterType.sortByFunction, comparisonFunction);
    };
    /**
     * Implementation of a Quicksort algorithm using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    Sorter.prototype.sortByImplementation = function (data, lowIndex, highIndex) {
        this.internalSort(data, lowIndex, highIndex, SorterType.sortByImplementation);
    };
    /**
     * Implementation of a Quicksort algorithm using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    Sorter.prototype.sortByDefault = function (data, lowIndex, highIndex) {
        this.internalSort(data, lowIndex, highIndex, SorterType.sortByDefault);
    };
    /**
     * Implementation of a Quicksort algorithm for key-value pairs, using a static compareTo function. This method is called recursively
     * @param comparisonFunction Comparison function to compare the temporary array entry of the passed lower and higher index position
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    Sorter.prototype.sortTupleByFunction = function (comparisonFunction, data, lowIndex, highIndex) {
        this.internalTupleSort(data, lowIndex, highIndex, SorterType.sortByFunction, comparisonFunction);
    };
    /**
     * Implementation of a Quicksort algorithm for key-value pairs, using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    Sorter.prototype.sortTupleByImplementation = function (data, lowIndex, highIndex) {
        this.internalTupleSort(data, lowIndex, highIndex, SorterType.sortByImplementation);
    };
    /**
     * Implementation of a Quicksort algorithm for key-value pairs, using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    Sorter.prototype.sortTupleByDefault = function (data, lowIndex, highIndex) {
        this.internalTupleSort(data, lowIndex, highIndex, SorterType.sortByDefault);
    };
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Internal function to perform a Quicksort by default, by a passed comparison function or by an implementation of the compareTo function
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     * @param type Type of the sorting implementation (byDefault, byFunction, byImplementation)
     * @param comparisonFunction Comparison function (optional) in case of sorting by function
     */
    Sorter.prototype.internalSort = function (data, lowIndex, highIndex, type, comparisonFunction) {
        if (highIndex - lowIndex <= 1) {
            return;
        }
        var pivot = data[highIndex - 1];
        var splitIndex = lowIndex;
        var compareResult;
        for (var i = lowIndex; i < highIndex - 1; i++) {
            if (type === SorterType.sortByFunction &&
                comparisonFunction !== undefined) {
                compareResult = comparisonFunction(data[i], pivot);
            }
            else if (type === SorterType.sortByImplementation) {
                compareResult = data[i].compareTo(pivot);
            }
            else {
                compareResult = this._iDefaultFunction(data[i], pivot);
            }
            if (compareResult <= 0) {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.internalSort(data, lowIndex, splitIndex, type, comparisonFunction);
        this.internalSort(data, splitIndex + 1, highIndex, type, comparisonFunction);
        return;
    };
    /**
     * Internal function to perform a Quicksort on a data tuple by default, by a passed comparison function or by an implementation of the compareTo function
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the temporary array to check
     * @param highIndex Higher index within the temporary array to check
     * @param type Type of the sorting implementation (byDefault, byFunction, byImplementation)
     * @param comparisonFunction Comparison function (optional) in case of sorting by function
     */
    Sorter.prototype.internalTupleSort = function (data, lowIndex, highIndex, type, comparisonFunction) {
        if (highIndex - lowIndex <= 1) {
            return;
        }
        var pivot = data[highIndex - 1].key;
        var splitIndex = lowIndex;
        var compareResult;
        for (var i = lowIndex; i < highIndex - 1; i++) {
            if (type === SorterType.sortByFunction &&
                comparisonFunction !== undefined) {
                compareResult = comparisonFunction(data[i].key, pivot);
            }
            else if (type === SorterType.sortByImplementation) {
                compareResult = data[i].key.compareTo(pivot);
            }
            else {
                compareResult = this._iDefaultFunction(data[i].key, pivot);
            }
            if (compareResult <= 0) {
                this.swapTuple(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swapTuple(data, highIndex - 1, splitIndex);
        this.internalTupleSort(data, lowIndex, splitIndex, type, comparisonFunction);
        this.internalTupleSort(data, splitIndex + 1, highIndex, type, comparisonFunction);
        return;
    };
    /**
     * Internal swap method for Quicksort
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
     * Internal swap method for Quicksort of tuples
     * @param data Data as array of the type KeyValuePair<T,any>
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    Sorter.prototype.swapTuple = function (data, index1, index2) {
        var temp = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    };
    /**
     * Checks whether the type is comparable due to the implementation of a compareTo function
     * @param obj Object toc check
     */
    Sorter.prototype.isComparable = function (obj) {
        try {
            if (obj.compareTo !== undefined) {
                if (typeof obj.compareTo === "function") {
                    var type = obj.compareTo(obj);
                    if (typeof type === "number") {
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
     * @param obj object to check
     */
    Sorter.prototype.checkBasicCommonType = function (obj) {
        if (obj === undefined) {
            // throw new Error("undefined as value is not allowed while sorting");
            this._iIsBasicType = false;
            this._iIsCommonType = false;
        }
        if (typeof obj === "number") {
            this._iDefaultFunction = Comparer_1.Comparer.compareNumbers;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === "boolean") {
            this._iDefaultFunction = Comparer_1.Comparer.compareBooleans;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === "string") {
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