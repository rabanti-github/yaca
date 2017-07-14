"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
var Dictionary = (function () {
    function Dictionary(keys, values) {
        this._iCounter = 0;
        this._length = 0;
        this._iDict = [];
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
    Dictionary.prototype.next = function (value) {
        throw new Error("Method not implemented.");
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
    Dictionary.prototype.getHashCode = function (key) {
        if (key === undefined) {
            throw new Error("No valid key was defined. The key must not be empty or undefined");
        }
        //let temp = key as Object;
        return key.toString();
    };
    Dictionary.prototype.getKeyValuePairsInternal = function () {
        var _this = this;
        var output = new Array(this._length);
        var item;
        //let x: V = this._iDict['asd'];
        //let item: IteratorItem<object> = new IteratorItem();
        //let output = new Array(this._length) as IteratorItem<object>[];
        var i = 0;
        var keys = Object.keys(this._iDict);
        keys.forEach(function (key) {
            item = { 'key': key, 'value': _this._iDict[key] };
            //item = new IteratorItem( {'key': key, 'value': this._iDict[key]});
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
        var keys = Object.keys(this._iDict);
        var len2 = keys.length;
        var j;
        var keyCheck = new List_1.default();
        for (var i = 0; i < len; i++) {
            for (j = 0; j < len2; j++) {
                if (this._iDict[keys[j]][1] === val[i]) {
                    if (keyCheck.contains(keys[j])) {
                        continue;
                    }
                    list.add(this._iDict[keys[j]][0]);
                    if (breakAfterFirst === true) {
                        return list;
                    }
                    keyCheck.add(keys[j]);
                }
            }
        }
        return list;
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
    Object.defineProperty(Dictionary.prototype, "length", {
        /**
         * Gets the number of elements of the List
         */
        get: function () {
            this._length = Object.keys(this._iDict).length;
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an element at the end of the List. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    Dictionary.prototype.add = function (key, value) {
        if (value === undefined) {
            throw new Error("No value was defined to add as Dictionary element");
        }
        var hashcode = this.getHashCode(key);
        this._iDict[hashcode][0] = key;
        this._iDict[hashcode][1] = value;
        this._length++;
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
            this.add(keys[i], values[i]);
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
    /**
     * Removes the passed key in the Dictionary. The method returns true if the key was found and removed, otherwise false
     * @param value Key (and attached value) to remove
     */
    Dictionary.prototype.remove = function (key) {
        if (this._length === 0) {
            return false;
        }
        var hashcode = this.getHashCode(key);
        if (this._iDict[hashcode][0] === undefined) {
            return false;
        }
        delete this._iDict[hashcode];
        this._length--;
        return true;
    };
    Dictionary.prototype.removeByValue = function (value) {
        if (this.length < 1) {
            return false;
        }
        var keys = Object.keys(this._iDict);
        var len = keys.length;
        var counter = this._length;
        for (var i = 0; i < len; i++) {
            if (this._iDict[keys[i]][1] === value) {
                delete this._iDict[keys[i]];
                this._length--;
            }
        }
        if (this._length !== counter) {
            return true;
        }
        else {
            return false;
        }
    };
    Dictionary.prototype.removeByValues = function (values) {
        var array;
        if (Array.isArray(values)) {
            array = values;
        }
        else {
            array = values.copyToArray();
        }
        var iLen = array.length;
        if (this._length === 0 || iLen === 0) {
            return;
        }
        var keyList;
        for (var i = 0; i < iLen; i++) {
            keyList =
            ;
        }
        //let newList: List<T> = new List<T>();
        for (var i = 0; i < this._length; i++) {
            if (list.containsValue(array[i])) {
                continue;
            }
            newList.add(this._iList[i]);
        }
        this.clear();
        this._iList = newList.copyToArray();
        this._length = this.length;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map