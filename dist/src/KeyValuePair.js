"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValuePair = (function () {
    function KeyValuePair(key, value) {
        if (key === undefined || value === undefined) {
            throw new Error("The key and/or value is undefined");
        }
        this._key = key;
        this._value = value;
    }
    Object.defineProperty(KeyValuePair.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyValuePair.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return KeyValuePair;
}());
exports.KeyValuePair = KeyValuePair;
//# sourceMappingURL=KeyValuePair.js.map