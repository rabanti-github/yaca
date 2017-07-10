"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var test = new List_1.List();
function sorter(v1, v2) {
    if (v1 < v2) {
        return -1;
    }
    else if (v1 > v2) {
        return 1;
    }
    else {
        return 0;
    }
}
test.add(11);
//test[0] = 558;
var v = test[0];
var w = test.length;
test.add(22);
test.add(33);
test.add(66);
test.add(55);
test.add(6);
test.add(22);
test.add(6);
test.add(57);
test.insertAtIndex(8, 666);
test.distinct();
test.forEach(function (value) {
    console.log(value);
});
test.sort(sorter);
test.remove(22);
//test.removeAll(22);
var part = test.getRange(1, 5);
var part2 = test.copyToArray(1, 5);
test.reverse();
var z = test.next();
z = test.next();
var x = 1;
//# sourceMappingURL=index.js.map