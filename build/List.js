"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IteratorItem_1 = require("./IteratorItem");
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
    // Implemented
    List.prototype.sort = function (sortFunction) {
        var qSort = new Sorter_1.Sorter();
        qSort.quickSort(sortFunction, this._iList, 0, this._length);
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
        return new IteratorItem_1.IteratorItem(val, lastItem);
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
    List.prototype.set = function (index, value) {
        if (index < 0 || index > this._length - 1) {
            throw new Error("The index " + index + " is out of range.");
        }
        this._iList[index] = value;
    };
    List.prototype.push = function (value) {
        this.insertAtIndex(0, value);
    };
    List.prototype.pop = function () {
        if (this._length == 0) {
            return undefined;
        }
        var value = this._iList[0];
        this.removeAt(0);
        return value;
    };
    List.prototype.enqueue = function (value) {
        this.add(value);
    };
    List.prototype.dequeue = function () {
        if (this._length == 0) {
            return undefined;
        }
        var value = this._iList[this._length - 1];
        this.removeAt(this._length - 1);
        return value;
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
    List.prototype.insertAtIndex = function (index, value) {
        if (index < 0 || index > this._length) {
            throw new Error("The index " + index + " is out of range.");
        }
        var firstPart, secondPart;
        if (index == 0) {
            firstPart = [];
        }
        else {
            firstPart = this.copyTo(0, index - 1, true);
        }
        if (index == this._length) {
            secondPart = [];
        }
        else {
            secondPart = this.copyTo(index, this._length - 1, true);
        }
        this.clear();
        var len = firstPart.length;
        var len2 = secondPart.length;
        this.addRange(firstPart);
        this.add(value);
        this.addRange(secondPart);
    };
    List.prototype.indexOf = function (value) {
        return this._iList.indexOf(value);
    };
    List.prototype.lastIndexOf = function (value) {
        var indices = this.indicesOf(value, true);
        var len = indices.length;
        if (len == 0) {
            return -1;
        }
        return indices.get(len - 1);
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
        var counter = 0;
        for (var i = startIndex; i <= endIndex; i++) {
            if (toArray == true) {
                output[counter] = this._iList[i];
                counter++;
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
    List.prototype.distinct = function () {
        if (this._length == 0) {
            return;
        }
        var newList = new List();
        for (var i = 0; i < this._length; i++) {
            if (newList.contains(this._iList[i]) == false) {
                newList.add(this._iList[i]);
            }
        }
        this.clear();
        this.addRange(newList);
    };
    return List;
}());
exports.List = List;
//# sourceMappingURL=List.js.map