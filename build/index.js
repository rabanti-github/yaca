"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
var test = new List_1.List();
test.add(11);
//test[0] = 558;
var v = test[0];
var w = test.length;
test.add(22);
test.add(33);
test.add(55);
test.add(66);
test.add(22);
test.add(21);
test.add(57);
test.forEach(function (value) {
    console.log(value);
});
var z = test.next();
z = test.next();
//test.remove(22);
var x = 1;
//# sourceMappingURL=index.js.map