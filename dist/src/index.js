"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
exports.List = List_1.default;
var Dictionary_1 = require("./Dictionary");
exports.Dictionary = Dictionary_1.Dictionary;
var KeyValuePair_1 = require("./KeyValuePair");
exports.KeyValuePair = KeyValuePair_1.KeyValuePair;
//export default List;
/*
        let list2: List<Date> = new List<Date>([new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)]);
        let date = new Date(2017,1,1,0,0,0);
        let match = list2.contains(date);
        list2.dequeue();
        let list3: List<Date> = list2.getRange(undefined,1);

        let list4: List<number> = new List<number>(22);
*/
var TestClass = (function () {
    function TestClass() {
    }
    TestClass.createRandomObject = function () {
        var o = new TestClass();
        o.value4 = new Date();
        o.value1 = o.value4.toDateString() + "_" + TestClass.counter.toString();
        o.value2 = o.value4.getMilliseconds() + TestClass.counter;
        var rnd;
        o.value3 = new Array(5);
        for (var i = 0; i < 5; i++) {
            rnd = Math.random();
            if (rnd > 0.5) {
                o.value3[i] = true;
            }
            else {
                o.value3[i] = false;
            }
        }
        TestClass.counter++;
        return o;
    };
    TestClass.counter = 0;
    return TestClass;
}());
/*
let sList: List<string> = new List<string>(["1","2","3"]);
sList.set(1, undefined);
*/
var list2 = new List_1.default();
list2.add(TestClass.createRandomObject());
list2.add(TestClass.createRandomObject());
var value = TestClass.createRandomObject();
list2.add(value);
list2.add(TestClass.createRandomObject());
//list2.removeAt(2);
list2.removeAll(value);
var d = new Dictionary_1.Dictionary();
var hit = false;
d.forEach(function (test) { hit = true; });
d.add(22, "x");
d.add(11, "y");
d.add(4, "z");
d.add(11, "new");
var n = d.length;
var dict2 = new Dictionary_1.Dictionary();
var d1 = new Date(2000, 1, 1, 1, 1, 1, 0);
var d2b = new Date(2000, 1, 1, 1, 1, 1, 1);
dict2.add(d1, 42);
dict2.add(d2b, 43);
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
//# sourceMappingURL=index.js.map