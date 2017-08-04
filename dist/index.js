"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./src/List");
exports.List = List_1.default;
var Dictionary_1 = require("./src/Dictionary");
exports.Dictionary = Dictionary_1.Dictionary;
var KeyValuePair_1 = require("./src/KeyValuePair");
exports.KeyValuePair = KeyValuePair_1.KeyValuePair;
var Comparer_1 = require("./src/Comparer");
var test = new List_1.default();
test.sort(Comparer_1.Comparer.compareDates);
var dict = new Dictionary_1.Dictionary([22, 44], ["A", "B"]);
var v = dict.get(222);
//# sourceMappingURL=index.js.map