"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValuePair_1 = require("./KeyValuePair");
var IteratorItem_1 = require("./IteratorItem");
var List_1 = require("./List");
/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
var Dictionary = (function () {
    function Dictionary(keys, values) {
        this._iCounter = 0;
        this._length = 0;
        this._iDict = [];
        this._iKeyIndex = [];
        if (keys !== undefined && values !== undefined) {
            if (Array.isArray(keys) && Array.isArray(values)) {
                this.addRange(keys, values);
            }
            else if (keys instanceof List_1.default && values instanceof List_1.default) {
                this.addRange(keys, values);
            }
            else if (values instanceof Dictionary) {
                this.addRange(keys);
            }
            else {
                this.add(keys, values);
            }
        }
    }
    Object.defineProperty(Dictionary.prototype, "length", {
        // ############### P R O P E R T I E S ###############
        /**
         * Gets the number of elements of the Dictionary
         */
        get: function () {
            this._length = this._iKeyIndex.length;
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.add = function (key, value, toStringFunction) {
        this.addInternal(key, value);
        this.refreshKeyIndex();
    };
    Dictionary.prototype.addRange = function (p1, p2) {
        var keys;
        var values;
        if (Array.isArray(p1) && Array.isArray(p2)) {
            keys = p1;
            values = p2;
        }
        else if (p1 instanceof List_1.default && p2 instanceof List_1.default) {
            keys = p1.copyToArray();
            values = p2.copyToArray();
        }
        else if (p1 instanceof Dictionary) {
            keys = p1.getKeys();
            values = p1.getValues();
        }
        else {
            keys = [];
            values = [];
        }
        if (keys.length !== values.length) {
            throw new Error("The length of the passed key and value arrays / lists is not identical");
        }
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            this.addInternal(keys[i], values[i]);
        }
        this.refreshKeyIndex();
    };
    Dictionary.prototype.getKeys = function () {
        if (this._length === 0) {
            return new Array();
        }
        var temp = this.getKeyValuePairsInternal();
        var output = Array(temp.length);
        for (var i = 0; i < this._length; i++) {
            output[i] = temp[i]['key'][0];
        }
        return output;
    };
    Dictionary.prototype.getKeysAsList = function () {
        var keys = this.getKeys();
        return new List_1.default(keys);
    };
    Dictionary.prototype.getValues = function () {
        if (this._length === 0) {
            return new Array();
        }
        var temp = this.getKeyValuePairsInternal();
        var output = Array(temp.length);
        for (var i = 0; i < this._length; i++) {
            output[i] = temp[i]['value'][1];
        }
        return output;
    };
    Dictionary.prototype.getValuesAsList = function () {
        var values = this.getValues();
        return new List_1.default(values);
    };
    Dictionary.prototype.getKeyValuePairsInternal = function () {
        var _this = this;
        var output = new Array(this._length);
        var item;
        var i = 0;
        //let keys: string[] = Object.keys(this._iDict);
        this._iKeyIndex.forEach(function (key) {
            item = { 'key': key, 'value': _this._iDict[key] };
            output[i] = item;
            i++;
        });
        return output;
    };
    Dictionary.prototype.getKeysByValuesAsList = function (values) {
        return this.getKeysByValuesAsListInternal(values, false);
    };
    Dictionary.prototype.getKeysByValues = function (values) {
        var list = this.getKeysByValuesAsListInternal(values, false);
        return list.copyToArray();
    };
    Dictionary.prototype.getKeysByValueAsList = function (value) {
        var v = [value];
        return this.getKeysByValuesAsListInternal(v, false);
    };
    Dictionary.prototype.getKeysByValue = function (value) {
        var list = this.getKeysByValueAsList(value);
        return list.copyToArray();
    };
    Dictionary.prototype.containsValues = function (values) {
        var list = this.getKeysByValuesAsListInternal(values, true);
        if (list.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Dictionary.prototype.containsValue = function (value) {
        var v = [value];
        var list = this.getKeysByValuesAsListInternal(v, true);
        if (list.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Updates a value of the Dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    Dictionary.prototype.set = function (key, value) {
        this.add(key, value);
    };
    Dictionary.prototype.remove = function (keys) {
        if (this._length === 0) {
            return false;
        }
        var keylist;
        if (Array.isArray(keys)) {
            keylist = keys;
        }
        else if (keys instanceof List_1.default) {
            keylist = keys.copyToArray();
        }
        else {
            keylist = [keys];
        }
        //let hashcode: string;
        var len = keylist.length;
        var status = false;
        var status2 = false;
        for (var i = 0; i < len; i++) {
            status2 = this.removeInternal(keylist[i]);
            if (status2 === true) {
                status = true;
            }
            //hashcode = this.getHashCode(keylist[i]);
        }
        this.refreshKeyIndex();
        return status;
    };
    Dictionary.prototype.removeInternal = function (key) {
        var hashcode = this.getHashCode(key);
        if (typeof this._iDict[hashcode] === undefined) {
            return false;
        }
        else {
            delete this._iDict[hashcode];
            this._length--;
            return true;
        }
    };
    Dictionary.prototype.removeByValue = function (values) {
        if (this._length === 0) {
            return false;
        }
        var keys;
        if (Array.isArray(values) || values instanceof List_1.default) {
            keys = this.getKeysByValuesAsListInternal(values, false);
        }
        else {
            keys = this.getKeysByValueAsList(values);
        }
        var len = keys.length;
        if (this._length === 0 || len === 0) {
            return false;
        }
        return this.remove(keys);
    };
    /**
     * Removes all elements of the Dictionary
     */
    Dictionary.prototype.clear = function () {
        if (this._length === 0) {
            return;
        }
        else {
            this._iDict = [];
            this._length = 0;
            this._iKeyIndex = [];
        }
    };
    /**
     * Gets the value of the Dictionary by the specified key
     * @param key Key
     */
    Dictionary.prototype.get = function (key) {
        var k = this.getHashCode(key);
        if (typeof this._iDict[k] !== undefined) {
            return this._iDict[k][1];
        }
        else {
            throw new Error("The key " + key + " was not found in the Dictionary");
        }
    };
    Dictionary.prototype.getRange = function (keys) {
        if (this._length === 0) {
            return new Dictionary();
        }
        //let allHashcodes: string[] = Object.keys(this._iDict);
        var hashcodes = new List_1.default();
        var temp = new Array();
        if (keys !== undefined && Array.isArray(keys)) {
            temp = keys;
        }
        else if (keys !== undefined && (Array.isArray(keys) === false)) {
            temp = keys.copyToArray();
        }
        // let len = allHashcodes.length;
        var len2 = temp.length;
        var j;
        for (var i = 0; i < this._length; i++) {
            if (keys === undefined) {
                hashcodes.add(this._iKeyIndex[i]);
                continue;
            }
            for (j = 0; j < len2; j++) {
                if (this.getHashCode(temp[j]) === this._iKeyIndex[i]) {
                    hashcodes.add(this._iKeyIndex[i]);
                    break;
                }
            }
        }
        if (keys !== undefined) {
            hashcodes.distinct();
        }
        return this.copyToInternal(hashcodes);
    };
    Dictionary.prototype.getRangeByValues = function (values) {
        if (this._length === 0) {
            return new Dictionary();
        }
        var keys = this.getKeysByValuesAsListInternal(values, false);
        return this.getRange(keys);
    };
    Dictionary.prototype.copyToInternal = function (keys) {
        var output = new Dictionary();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            if (typeof this._iDict[keys[i]] !== undefined) {
                output.addInternal(this._iDict[keys.get(i)][0], this._iDict[keys.get(i)][1]);
            }
        }
        output.refreshKeyIndex();
        return output;
    };
    /**
     * Check whether the Dictionary contains the specified key
     * @param key True if the value exists, otherwise false
     */
    Dictionary.prototype.containsKey = function (key) {
        if (this._length === 0) {
            return false;
        }
        var keyList = [key];
        return this.containsKeys(keyList);
    };
    Dictionary.prototype.containsKeys = function (keys) {
        if (this._length === 0) {
            return false;
        }
        var keyList;
        if (Array.isArray(keys)) {
            keyList = keys;
        }
        else {
            keyList = keys.copyToArray();
        }
        // let allHashcodes: string[] = Object.keys(this._iDict);
        for (var i = 0; i < this._length; i++) {
            if (this._iDict[this.getHashCode(keyList[i])] !== undefined) {
                return true;
            }
        }
        return false;
    };
    /**
     * Swaps the values of the two defined keys in the Dictionary
     * @param key1 Key 1
     * @param key2 Key 2
     */
    Dictionary.prototype.swapValues = function (key1, key2) {
        if (this.containsKey(key1) === false || this.containsKey(key2) === false) {
            throw new Error("One of the passed keys (" + key1.toString() + ", " + key2.toString() + ") does not exist");
        }
        var hc1 = this.getHashCode(key1);
        var hc2 = this.getHashCode(key2);
        var temp = this._iDict[hc1][1];
        this._iDict[hc1][1] = this._iDict[hc2][1];
        this._iDict[hc2][1] = temp;
    };
    /**
     * Removes all duplicates of values in the Dictionary. The keys of the remaining values cannot be determined
     */
    Dictionary.prototype.distinct = function () {
        if (this._length === 0) {
            return;
        }
        var newDict = new Dictionary();
        //let allHashcodes: string[] = Object.keys(this._iDict);
        for (var i = 0; i < this._length; i++) {
            if (newDict.containsKeys(this._iDict[this._iKeyIndex[i]][1]) === false) {
                newDict.addInternal(this._iDict[this._iKeyIndex[i]][0], this._iDict[this._iKeyIndex[i]][1]);
            }
        }
        this.clear();
        this.addRange(newDict);
    };
    // // *********************************************** Implemented Interfaces
    // /**
    //  * Sorts the List according to the passed function
    //  * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned.
    //  */
    // sort(sortFunction: ISortInterFace<T>) {
    //     let qSort: Sorter<T> = new Sorter();
    //     qSort.quickSort(sortFunction, this._iList as T[], 0, this._length);
    // }
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    Dictionary.prototype.forEach = function (callback) {
        if (this._length === 0) {
            return;
        }
        var done = false;
        var item;
        this._iCounter = 0;
        while (done === false) {
            item = this.next();
            done = item.isLastEntry;
            callback(item.value);
        }
    };
    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0.
     * @param value Can be ignored
     */
    Dictionary.prototype.next = function (value) {
        var val = new KeyValuePair_1.KeyValuePair(this._iDict[this._iKeyIndex[this._iCounter]][0], this._iDict[this._iKeyIndex[this._iCounter]][1]);
        var lastItem;
        if (this._iCounter < this.length - 1) {
            this._iCounter++;
            lastItem = false;
        }
        else {
            this._iCounter = 0;
            lastItem = true;
        }
        return new IteratorItem_1.IteratorItem(val, lastItem);
    };
    // ############### P R I V A T E   F U N C T I O N S ###############
    Dictionary.prototype.addInternal = function (key, value) {
        if (key === undefined) {
            throw new Error("No key was defined to add as Dictionary element");
        }
        if (value === undefined) {
            throw new Error("No value was defined to add as Dictionary element");
        }
        var hashcode = this.getHashCode(key);
        this._iDict[hashcode] = { 0: key, 1: value };
        if (this._iKeyIndex.indexOf(hashcode) < 0) {
            this._length++;
        }
    };
    Dictionary.prototype.getHashCode = function (key) {
        if (key === undefined) {
            throw new Error("No valid key was defined. The key must not be empty or undefined");
        }
        return "_" + key.toString(); // _ prevents problems with empty strings / defined types
    };
    Dictionary.prototype.getKeysByValuesAsListInternal = function (values, breakAfterFirst) {
        var list = new List_1.default();
        if (this._length === 0) {
            return list;
        }
        var val;
        if (Array.isArray(values)) {
            val = values;
        }
        else {
            val = values.copyToArray();
        }
        var len = val.length;
        if (len === 0) {
            return list;
        }
        //let keys: string[] = Object.keys(this._iDict);
        //let len2: number = keys.length;
        var j;
        var keyCheck = new List_1.default();
        for (var i = 0; i < len; i++) {
            for (j = 0; j < this._length; j++) {
                if (this._iDict[this._iKeyIndex[j]][1] === val[i]) {
                    if (keyCheck.contains(this._iKeyIndex[j])) {
                        continue;
                    }
                    list.add(this._iDict[this._iKeyIndex[j]][0]);
                    if (breakAfterFirst === true) {
                        return list;
                    }
                    keyCheck.add(this._iKeyIndex[j]);
                }
            }
        }
        return list;
    };
    Dictionary.prototype.refreshKeyIndex = function () {
        this._iKeyIndex = Object.keys(this._iDict);
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map