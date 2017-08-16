"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("./Dictionary");
var KeyValuePair_1 = require("./KeyValuePair");
var List_1 = require("./List");
var Sorter_1 = require("./Sorter");
/**
 * Class representing a sorted Dictionary (Key and Value pairs) for generic Types with various Dictionary operations. The class is based ob the standard Dictionary<K,V>
 */
var SortedDictionary = (function (_super) {
    __extends(SortedDictionary, _super);
    function SortedDictionary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Gets the value by index. An error will be thrown if the index was not found
     * @param index Index of the entry
     */
    SortedDictionary.prototype.getByIndex = function (index) {
        var output = this.getByIndices([index]);
        return output[0]; // Wrong indices are checked in getByIndices
    };
    SortedDictionary.prototype.getByIndices = function (indices) {
        var ind;
        if (indices instanceof List_1.default) {
            ind = indices.copyToArray();
        }
        else {
            ind = indices;
        }
        var len = ind.length;
        var output = new Array(len);
        var values = _super.prototype.getValues.call(this);
        var len2 = this.length;
        for (var i = 0; i < len; i++) {
            this.checkIndex(ind[i], len2);
            output[i] = values[ind[i]];
        }
        return output;
    };
    SortedDictionary.prototype.getByIndicesAsList = function (indices) {
        if (indices instanceof List_1.default) {
            return new List_1.default(this.getByIndices(indices));
        }
        else {
            return new List_1.default(this.getByIndices(indices));
        }
    };
    /**
     * Gets the key by index. An error will be thrown if the index was not found
     * @param index Index of the entry
     */
    SortedDictionary.prototype.getKeyByIndex = function (index) {
        var output = this.getKeysByIndices([index]);
        return output[0]; // Wrong indices are checked in getByIndices
    };
    SortedDictionary.prototype.getKeysByIndices = function (indices) {
        var ind;
        if (indices instanceof List_1.default) {
            ind = indices.copyToArray();
        }
        else {
            ind = indices;
        }
        var len = ind.length;
        var output = new Array(len);
        var keys = _super.prototype.getKeys.call(this);
        var len2 = this.length;
        for (var i = 0; i < len; i++) {
            this.checkIndex(ind[i], len2);
            output[i] = keys[ind[i]];
        }
        return output;
    };
    SortedDictionary.prototype.getKeysByIndicesAsList = function (indices) {
        if (indices instanceof List_1.default) {
            return new List_1.default(this.getKeysByIndices(indices));
        }
        else {
            return new List_1.default(this.getKeysByIndices(indices));
        }
    };
    /**
     * Updates a value at the passed index. The key will not be changed. An error will be thrown if the index was not found
     * @param index Index to update
     * @param value Value to replace the existing value at the index position
     */
    SortedDictionary.prototype.setByIndex = function (index, value) {
        var key = this.getKeyByIndex(index);
        _super.prototype.set.call(this, key, value);
    };
    SortedDictionary.prototype.setByIndices = function (indices, values) {
        if (indices.length !== values.length) {
            throw new Error("The number of indices and values to replace must be identical");
        }
        var ind;
        var val;
        if (indices instanceof List_1.default && values instanceof List_1.default) {
            ind = indices.copyToArray();
            val = values.copyToArray();
        }
        else {
            ind = indices;
            val = values;
        }
        var keys = this.getKeysByIndices(ind);
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            _super.prototype.set.call(this, keys[i], val[i]);
        }
    };
    /**
     * Removes the entry at the defined index position. An error will be thrown if the index was not found
     * @param index Index position to be removed
     */
    SortedDictionary.prototype.removeByIndex = function (index) {
        this.removeByIndices([index]);
    };
    SortedDictionary.prototype.removeByIndices = function (index) {
        var keys;
        if (Array.isArray(index)) {
            keys = this.getKeysByIndices(index);
        }
        else {
            keys = this.getKeysByIndices(index);
        }
        _super.prototype.remove.call(this, keys);
    };
    SortedDictionary.prototype.sortByKey = function (sortFunction) {
        this.sortInternal(true, sortFunction);
    };
    SortedDictionary.prototype.sortByValue = function (sortFunction) {
        this.sortInternal(false, sortFunction);
    };
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Validates the passed index
     * @param index Index to check
     * @param length length of the dictionary
     */
    SortedDictionary.prototype.checkIndex = function (index, length) {
        if (index < 0 || index >= length) {
            throw new Error("The index " + index + " is out of bound");
        }
    };
    /**Internal method to sort the dictionary by its keys or values
     *
     * @param byKey If true, the dictionary will be sorted by key, otherwise ba value
     * @param sortFunction Optional comparison function
     */
    SortedDictionary.prototype.sortInternal = function (byKey, sortFunction) {
        if (this.length === 0) {
            return;
        }
        var data = new Array(this.length);
        var i = 0;
        this.forEach(function (item) {
            if (byKey) {
                data[i] = new KeyValuePair_1.KeyValuePair(item.key, item.value);
            }
            else {
                data[i] = new KeyValuePair_1.KeyValuePair(item.value, item.key);
            }
            i++;
        });
        var kLen = data.length;
        var qSort;
        if (byKey) {
            qSort = new Sorter_1.Sorter(data[0], true); // Pass the 1st object as sample for type checking
        }
        else {
            qSort = new Sorter_1.Sorter(data[0], true); // Pass the 1st object as sample for type checking
        }
        //let qSort: Sorter<K> = new Sorter<K>(keys[0] as K); // Pass the 1st object as sample for type checking
        if (sortFunction !== undefined) {
            qSort.sortTupleByFunction(sortFunction, data, 0, kLen);
        }
        else {
            if (qSort.hasCompareToImplemented === true) {
                qSort.sortTupleByImplementation(data, 0, kLen);
            }
            else if (qSort.isCommonType === true) {
                qSort.sortTupleByDefault(data, 0, kLen);
            }
            else {
                if (byKey) {
                    throw new Error("No suitable comparison method (a<>b) was found to sort by key (a<b:-1; a==b;0 a>b: 1)");
                }
                else {
                    throw new Error("No suitable comparison method (a<>b) was found to sort by value (a<b:-1; a==b;0 a>b: 1)");
                }
            }
        }
        this.clear();
        for (var i_1 = 0; i_1 < kLen; i_1++) {
            if (byKey) {
                this.add(data[i_1].key, data[i_1].value);
            }
            else {
                this.add(data[i_1].value, data[i_1].key);
            }
        }
    };
    return SortedDictionary;
}(Dictionary_1.Dictionary));
exports.SortedDictionary = SortedDictionary;
//# sourceMappingURL=SortedDictionary.js.map