"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValuePair_1 = require("./KeyValuePair");
var IteratorItem_1 = require("./IteratorItem");
var List_1 = require("./List");
var isEqual = require('lodash.isequal');
/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
var Dictionary = (function () {
    function Dictionary(keys, values) {
        this._iCounter = 0;
        this._length = 0;
        this._iDict = [];
        this._iKeyIndex = [];
        if (keys !== undefined) {
            if (values !== undefined) {
                if (Array.isArray(keys) && Array.isArray(values)) {
                    this.addRange(keys, values);
                }
                else if (keys instanceof List_1.default && values instanceof List_1.default) {
                    this.addRange(keys, values);
                }
                else {
                    this.add(keys, values);
                }
            }
            else {
                if (keys instanceof Function) {
                    this.overrideHashFunction(keys);
                }
                else {
                    this.addRange(keys);
                }
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
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Adds an element at the end of the List. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    Dictionary.prototype.add = function (key, value) {
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
        else {
            keys = p1.getKeys();
            values = p1.getValues();
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
     * Check whether the Dictionary contains the specified key
     * @param key Key to check
     */
    Dictionary.prototype.containsKey = function (key) {
        if (this._length === 0) {
            return false;
        }
        var keyList = [key];
        return this.containsKeys(keyList);
    };
    Dictionary.prototype.containsKeys = function (keys, all) {
        if (this._length === 0) {
            return false;
        }
        var keyList;
        var match = 0;
        if (Array.isArray(keys)) {
            keyList = keys;
        }
        else {
            keyList = keys.copyToArray();
        }
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            if (this._iDict[this.getHashCode(keyList[i])] !== undefined) {
                match++;
            }
        }
        if (all !== undefined && all === true) {
            if (match === len) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (match > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    /**
     * Check whether the Dictionary contains the specified value
     * @param value Values to check
     */
    Dictionary.prototype.containsValue = function (value) {
        var v = [value];
        var list = this.getKeysByValuesAsListInternal(v, false);
        if (list.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Dictionary.prototype.containsValues = function (values, all) {
        var list;
        if (all !== undefined && all === true) {
            list = this.getKeysByValuesAsListInternal(values, true);
            if (list.length === values.length) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            list = this.getKeysByValuesAsListInternal(values, false);
            if (list.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    /**
     * Removes all duplicates of values in the Dictionary. The keys of the remaining values cannot be determined
     */
    Dictionary.prototype.distinct = function () {
        if (this._length === 0) {
            return;
        }
        var newDict = new Dictionary();
        for (var i = 0; i < this._length; i++) {
            if (newDict.containsValues([this._iDict[this._iKeyIndex[i]][1]]) === false) {
                newDict.add(this._iDict[this._iKeyIndex[i]][0], this._iDict[this._iKeyIndex[i]][1]);
            }
        }
        this.clear();
        this.addRange(newDict);
    };
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
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
     * Gets the value of the Dictionary by the specified key
     * @param key Key
     */
    Dictionary.prototype.get = function (key) {
        var k = this.getHashCode(key);
        if (typeof this._iDict[k] !== "undefined") {
            return this._iDict[k][1];
        }
        else {
            throw new Error("The key " + key + " was not found in the Dictionary");
        }
    };
    /**
     * Gets all key of the Dictionary as Array of the type K
     */
    Dictionary.prototype.getKeys = function () {
        if (this._length === 0) {
            return new Array();
        }
        var temp = this.getKeyValuePairsInternal();
        var output = Array(temp.length);
        for (var i = 0; i < this._length; i++) {
            output[i] = temp[i]['value'][0];
        }
        return output;
    };
    /**
     * Gets all keys of the Dictionary as List of teh type <K>
     */
    Dictionary.prototype.getKeysAsList = function () {
        var keys = this.getKeys();
        return new List_1.default(keys);
    };
    /**
     * Get the keys that matches to the passed value
     * @param value Value to get all corresponding keys from
     */
    Dictionary.prototype.getKeysByValue = function (value) {
        return this.getKeysByValuesAsListInternal([value], true).copyToArray();
    };
    /**
     * Get the keys that matches to the passed value. The keys are returned as List ot the type K
     * @param value Value to get all corresponding keys from
     */
    Dictionary.prototype.getKeysByValueAsList = function (value) {
        return this.getKeysByValuesAsListInternal([value], true);
    };
    Dictionary.prototype.getKeysByValues = function (values) {
        var list = this.getKeysByValuesAsListInternal(values, true);
        return list.copyToArray();
    };
    Dictionary.prototype.getKeysByValuesAsList = function (values) {
        return this.getKeysByValuesAsListInternal(values, true);
    };
    Dictionary.prototype.getRange = function (keys) {
        if (this._length === 0) {
            return new Dictionary();
        }
        var hashcodes = new List_1.default();
        var temp = new Array();
        if (keys !== undefined && Array.isArray(keys)) {
            temp = keys;
        }
        else if (keys !== undefined && (Array.isArray(keys) === false)) {
            temp = keys.copyToArray();
        }
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
        var keys = this.getKeysByValuesAsListInternal(values, true);
        return this.getRange(keys);
    };
    /**
     * Gets all vales as array
     */
    Dictionary.prototype.getValues = function () {
        if (this._length === 0) {
            return new Array();
        }
        var temp = this.getKeyValuePairsInternal();
        var output = Array(temp.length);
        for (var i = 0; i < this._length; i++) {
            output[i] = temp[i]['value'];
        }
        return output;
    };
    /**
     * Gets all Values as List
     */
    Dictionary.prototype.getValuesAsList = function () {
        var values = this.getValues();
        return new List_1.default(values);
    };
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
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
        if (value !== undefined && value === true) {
            lastItem = true;
        } // Break-condition
        return new IteratorItem_1.IteratorItem(val, lastItem);
    };
    /**
     * Overrides the default hashing method for keys. Usually toString is used to generate unique hashes. The toString method of a class can be overwritten or alternatively defined by this function.\n
     * The passed function takes one value of the type K and should return a string.
     * @param overrideFunction Function which replaces the default method of generating hashes for the keys
     */
    Dictionary.prototype.overrideHashFunction = function (overrideFunction) {
        var type = {};
        if ((overrideFunction && type.toString.call(overrideFunction) === '[object Function]') === false || overrideFunction === undefined) {
            throw new Error("The passed object is not a function. It must be a function that accepts one variable of the key type (K) and returns a string");
        }
        this._iOverrideToStringFunction = overrideFunction;
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
        var len = keylist.length;
        var status = true;
        var status2;
        for (var i = 0; i < len; i++) {
            status2 = this.removeInternal(keylist[i]);
            if (status2 === false) {
                status = false;
            }
        }
        this.refreshKeyIndex();
        return status;
    };
    Dictionary.prototype.removeByValue = function (values) {
        if (this._length === 0) {
            return false;
        }
        var keys;
        if (Array.isArray(values) || values instanceof List_1.default) {
            keys = this.getKeysByValuesAsListInternal(values, true);
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
     * Updates a value of the Dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    Dictionary.prototype.set = function (key, value) {
        this.add(key, value);
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
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Internal method to add a key value pair
     * @param key Key to add
     * @param value Value to add
     */
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
    /**
     * Internal method to copy dictionary according to a a list of hashcodes
     * @param keys hashcodes of the items to copy
     */
    Dictionary.prototype.copyToInternal = function (keys) {
        var output = new Dictionary();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            //if (typeof this._iDict[keys[i]] !== undefined)
            //{
            output.addInternal(this._iDict[keys.get(i)][0], this._iDict[keys.get(i)][1]);
            // }
        }
        output.refreshKeyIndex();
        return output;
    };
    /**
     * Method to calculate the hash code of the key (default: toString)
     * @param key Key to process
     */
    Dictionary.prototype.getHashCode = function (key) {
        if (key === undefined) {
            throw new Error("No valid key was defined. The key must not be empty or undefined");
        }
        if (this._iOverrideToStringFunction === undefined) {
            if (key instanceof Date) {
                return key.getTime().toString();
            }
            else {
                return "_" + key.toString(); // _ prevents possible problems with empty strings / defined types
            }
        }
        else {
            return this._iOverrideToStringFunction(key);
        }
    };
    /**
     * Internal method to get keys by values as list
     * @param values values to look fot keys
     * @param all if true, all entries will be queried. Otherwise, the method returns after the first hit
     */
    Dictionary.prototype.getKeysByValuesAsListInternal = function (values, all) {
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
        var j;
        var keyCheck = new List_1.default();
        for (var i = 0; i < len; i++) {
            for (j = 0; j < this._length; j++) {
                if (isEqual(this._iDict[this._iKeyIndex[j]][1], val[i]) === true) {
                    if (keyCheck.contains(this._iKeyIndex[j])) {
                        continue;
                    }
                    list.add(this._iDict[this._iKeyIndex[j]][0]);
                    if (all === false) {
                        return list;
                    }
                    keyCheck.add(this._iKeyIndex[j]);
                }
            }
        }
        return list;
    };
    /**
     * Internal method to get key value pairs as object with two properties 'key' and 'value'
     */
    Dictionary.prototype.getKeyValuePairsInternal = function () {
        var _this = this;
        var output = new Array(this._length);
        var item;
        var i = 0;
        this._iKeyIndex.forEach(function (key) {
            item = { 'key': key, 'value': _this._iDict[key] };
            output[i] = item;
            i++;
        });
        return output;
    };
    /**
     * Internal method to refresh the key index of the dictionary
     */
    Dictionary.prototype.refreshKeyIndex = function () {
        this._iKeyIndex = Object.keys(this._iDict);
    };
    /**
     * Internal method to remove an entry
     * @param key Key to remove (with value)
     */
    Dictionary.prototype.removeInternal = function (key) {
        var hashcode = this.getHashCode(key);
        if (this._iDict[hashcode] === undefined) {
            return false;
        }
        else {
            delete this._iDict[hashcode];
            this._length--;
            return true;
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map