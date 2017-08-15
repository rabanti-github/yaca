"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./src/List");
exports.List = List_1.default;
var Dictionary_1 = require("./src/Dictionary");
exports.Dictionary = Dictionary_1.Dictionary;
var SortedDictionary_1 = require("./src/SortedDictionary");
exports.SortedDictionary = SortedDictionary_1.SortedDictionary;
var KeyValuePair_1 = require("./src/KeyValuePair");
exports.KeyValuePair = KeyValuePair_1.KeyValuePair;
var Comparer_1 = require("./src/Comparer");
exports.Comparer = Comparer_1.Comparer;
var Utils_1 = require("./test/utils/Utils");
var Types_1 = require("./test/utils/Types");
var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8, 9], ["a", "b", "a", "b", "c", "a", "d", "e", "f"]);
var values = dict2.getValues();
var temp = new List_1.default(values);
temp.sort(Comparer_1.Comparer.compareStrings);
var result = temp[temp.length - 1];
console.log(result);
var dict; //["a","b","c"], [11,42,86]
dict = new SortedDictionary_1.SortedDictionary(); // Utils.setupDictionary(Types.string, Types.number, ["a","b","c"], [11,42,86]) as SortedDictionary<string, number>;
dict.add("a", 11);
dict.add("b", 42);
dict.add("c", 86);
var value = dict.getByIndex(1);
console.log(value);
//# sourceMappingURL=index.js.map