"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = (function () {
    function List() {
        this._iCounter = 0;
        this._length = 0;
        this._iList = [];
    }
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
        return new Item(val, lastItem);
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
        //     this.push(value);
        // this[]
    };
    List.prototype.get = function (index) {
        return this._iList[index];
    };
    return List;
}());
exports.List = List;
var Item = (function () {
    function Item(value, finished) {
        this.isLastEntry = finished;
        this.value = value;
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=List.js.map