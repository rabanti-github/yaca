"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("./Types");
var List_1 = require("../../src/List");
var Dictionary_1 = require("../../src/Dictionary");
/**
 * Utils class for testing
 */
var Utils = (function () {
    function Utils() {
    }
    /**
     * Function to test an overwritten hash function for dates (used in Dictionary)
     * @param date Date to get the hash
     */
    Utils.properDateHashFunction = function (date) {
        return date.getTime().toString();
    };
    /**
     * Function to setup instances of the List class
     * @param t Type of the list
     * @param initialValue Initial value as single value or array (optional)
     */
    Utils.setupList = function (t, initialValue) {
        if (initialValue === undefined) {
            if (t === Types_1.Types.boolean) {
                return new List_1.default();
            }
            else if (t === Types_1.Types.date) {
                return new List_1.default();
            }
            else if (t === Types_1.Types.number) {
                return new List_1.default();
            }
            else if (t === Types_1.Types.string) {
                return new List_1.default();
            }
            else {
                return new List_1.default();
            }
        }
        else {
            if (t === Types_1.Types.boolean) {
                return new List_1.default(initialValue);
            }
            else if (t === Types_1.Types.date) {
                return new List_1.default(initialValue);
            }
            else if (t === Types_1.Types.number) {
                return new List_1.default(initialValue);
            }
            else if (t === Types_1.Types.string) {
                return new List_1.default(initialValue);
            }
            else {
                return new List_1.default(initialValue);
            }
        }
    };
    Utils.setupDictionary = function (keyType, valueType, keys, values) {
        if (keys === undefined || values === undefined) {
            if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary();
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary();
            }
            else {
                return new Dictionary_1.Dictionary();
            }
        }
        else {
            if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.boolean && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.date && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.number && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.boolean) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.date) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.number) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else if (keyType === Types_1.Types.string && valueType === Types_1.Types.string) {
                return new Dictionary_1.Dictionary(keys, values);
            }
            else {
                return new Dictionary_1.Dictionary(keys, values);
            }
        }
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map