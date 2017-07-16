"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var Dictionary_1 = require("./Dictionary");
exports.Dictionary = Dictionary_1.Dictionary;
var d = new Dictionary_1.Dictionary();
d.add(22, "asdf");
d.add(11, "raben");
d.add(4, "zomgue");
d.add(12, "raben");
//d.removeByValue("raben");
d.forEach(function (item) {
    xyz(item);
});
function xyz(item) {
    console.log(item.key);
    console.log(item.value);
}
var d2 = d.getRangeByValues(["raben"]);
var output = d.get(4);
exports.default = List_1.default;
//# sourceMappingURL=index.js.map