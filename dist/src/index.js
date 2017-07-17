"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var Dictionary_1 = require("./Dictionary");
exports.Dictionary = Dictionary_1.Dictionary;
var list2 = new List_1.default([new Date(2015, 2, 10, 0, 0, 0), new Date(2017, 1, 1, 0, 0, 0), new Date(1191, 1, 8, 23, 59, 59)]);
var date = new Date(2017, 1, 1, 0, 0, 0);
var match = list2.contains(date);
list2.dequeue();
var d = new Dictionary_1.Dictionary();
d.add(22, "x");
d.add(11, "y");
d.add(4, "z");
d.add(12, "y");
//d.removeByValue("y");
d.forEach(function (item) {
    xyz(item);
});
function xyz(item) {
    console.log(item.key);
    console.log(item.value);
}
var d2 = d.getRangeByValues(["y"]);
var output = d.get(4);
exports.default = List_1.default;
//# sourceMappingURL=index.js.map