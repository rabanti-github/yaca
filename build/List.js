"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item_1 = require("./Item");
var Sorter_1 = require("./Sorter");
var List = (function () {
    function List(values) {
        this._iCounter = 0;
        this._length = 0;
        this._iList = [];
        if (values != undefined) {
            if (Array.isArray(values)) {
                this.addRange(values);
            }
            else if (values instanceof List) {
                this.addRange(values);
            }
            else {
                this.add(values);
            }
        }
    }
    List.prototype.sort = function (sortFunction) {
        var indicator;
        if (this._length < 2) {
            return;
        }
        var base = new Sorter_1.Sorter(this._iList[0], 0);
        var level;
        var bottomLevel = 0;
        for (var i = 1; i < this._length; i++) {
            level = base.addNextValue(sortFunction, this._iList[i]);
            if (level < bottomLevel) {
                bottomLevel = level;
            }
        }
        var x = 0;
    };
    List.prototype.forEach = function (callback) {
        var done = false;
        var item;
        while (done == false) {
            item = this.next();
            done = item.isLastEntry;
            callback(item.value);
        }
    };
    List.prototype.next = function (value) {
        var val = this._iList[this._iCounter];
        var lastItem;
        if (this._iCounter < this.length - 1) {
            this._iCounter++;
            lastItem = false;
        }
        else {
            this._iCounter = 0;
            lastItem = true;
        }
        return new Item_1.Item(val, lastItem);
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            this._length = Object.keys(this._iList).length;
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.add = function (value) {
        this._iList[this._length] = value;
        this._length++;
    };
    List.prototype.addRange = function (values) {
        if (Array.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                this.add(values[i]);
            }
        }
        else {
            for (var i = 0; i < values.length; i++) {
                this.add(values.get(i));
            }
        }
    };
    List.prototype.get = function (index) {
        var value = this._iList[index];
        if (value != undefined) {
            return value;
        }
        else {
            throw new Error("The index " + index + " was not found in the list");
        }
    };
    List.prototype.clear = function () {
        if (this._length == 0) {
            return;
        }
        else {
            this._iList = [];
            this._length = 0;
        }
    };
    List.prototype.indexOf = function (value) {
        return this._iList.indexOf(value);
    };
    List.prototype.indicesOf = function (value, asList) {
        var indices = new List();
        for (var i = 0; i < this._length; i++) {
            if (this._iList[i] === value) {
                indices.add(i);
            }
        }
        if (asList != undefined && asList == true) {
            return indices;
        }
        else {
            return indices.copyToArray();
        }
    };
    List.prototype.contains = function (value) {
        if (this._length == 0) {
            return false;
        }
        var index = this.indexOf(value);
        if (index < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    List.prototype.remove = function (value) {
        if (this._length == 0) {
            return false;
        }
        var oIndex = this.indexOf(value);
        if (oIndex < 0) {
            return false;
        }
        else {
            var indices = new List(oIndex);
            this.removeAtIndices(indices);
            return true;
        }
    };
    List.prototype.removeAll = function (value) {
        if (this._length == 0) {
            return false;
        }
        var indices = this.indicesOf(value, true);
        if (indices.length == 0) {
            return false;
        }
        else {
            this.removeAtIndices(indices);
            return true;
        }
    };
    List.prototype.removeAt = function (index) {
        var i = new List(index);
    };
    List.prototype.removeAtIndices = function (indices) {
        var list;
        if (Array.isArray(indices)) {
            list = new List(indices);
        }
        else {
            list = indices;
        }
        var iLen = list.length;
        if (this._length == 0 || iLen == 0) {
            return;
        }
        var newList = new List();
        for (var i = 0; i < this._length; i++) {
            if (list.contains(i)) {
                continue;
            }
            newList.add(this._iList[i]);
        }
        this.clear();
        this._iList = newList.copyToArray();
        this._length = this.length;
    };
    List.prototype.copyToArray = function (start, end) {
        return this.copyTo(start, end, true);
    };
    List.prototype.getRange = function (start, end) {
        return this.copyTo(start, end, false);
    };
    List.prototype.copyTo = function (start, end, toArray) {
        var startIndex = 0;
        var endIndex = this._length - 1;
        if (start != undefined) {
            startIndex = start;
        }
        if (end != undefined) {
            endIndex = end;
        }
        if (startIndex < 0 || startIndex > endIndex) {
            throw new Error("The passed start index " + start + " is out of range");
        }
        if (endIndex < startIndex || endIndex > this._length - 1) {
            throw new Error("The passed end index " + end + " is out of range");
        }
        var output;
        if (toArray == true) {
            output = new Array(endIndex - startIndex + 1);
        }
        else {
            output = new List();
        }
        for (var i = startIndex; i <= endIndex; i++) {
            if (toArray == true) {
                output[i] = this._iList[i];
            }
            else {
                output.add(this._iList[i]);
            }
        }
        return output;
    };
    List.prototype.reverse = function () {
        if (this._length == 0) {
            return;
        }
        var halfLength = Math.floor(this._length / 2);
        var i1 = 0;
        var i2 = this._length - 1;
        var temp;
        for (var i = 0; i < halfLength; i++) {
            this.swapValuesInternal(i1, i2, temp);
            i1++;
            i2--;
        }
    };
    List.prototype.swapValues = function (index1, index2) {
        if (index1 < 0 || index1 > this._length - 1 || index2 < 0 || index2 > this._length - 1) {
            throw new Error("The passed indices (" + index1 + ", " + index2 + ") are out of range");
        }
        var temp;
        this.swapValuesInternal(index1, index2, temp);
    };
    List.prototype.swapValuesInternal = function (index1, index2, tempParameter) {
        tempParameter = this._iList[index1];
        this._iList[index1] = this._iList[index2];
        this._iList[index2] = tempParameter;
    };
    return List;
}());
exports.List = List;
//# sourceMappingURL=List.js.map