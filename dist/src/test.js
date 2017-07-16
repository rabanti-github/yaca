"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("./Dictionary");
var d = new Dictionary_1.Dictionary();
d.add(22, "asdf");
d.add(11, "raben");
d.add(4, "zomgue");
d.forEach(function (item) {
    console.log(item);
});
//# sourceMappingURL=test.js.map