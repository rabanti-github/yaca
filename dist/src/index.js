"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("./List");
exports.List = List_1.default;
var Dictionary_1 = require("./Dictionary");
exports.Dictionary = Dictionary_1.Dictionary;
var KeyValuePair_1 = require("./KeyValuePair");
exports.KeyValuePair = KeyValuePair_1.KeyValuePair;
var Utils_1 = require("../test/utils/Utils");
var TestClass_1 = require("../test/utils/TestClass");
var Types_1 = require("../test/utils/Types");
//export default List;
/*
        let list2: List<Date> = new List<Date>([new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)]);
        let date = new Date(2017,1,1,0,0,0);
        let match = list2.contains(date);
        list2.dequeue();
        let list3: List<Date> = list2.getRange(undefined,1);

        let list4: List<number> = new List<number>(22);
*/
/*
let sList: List<string> = new List<string>(["1","2","3"]);
sList.set(1, undefined);
*/
var list2 = new List_1.default();
list2.add(TestClass_1.TestClass.createRandomObject());
list2.add(TestClass_1.TestClass.createRandomObject());
var value = TestClass_1.TestClass.createRandomObject();
list2.add(value);
list2.add(TestClass_1.TestClass.createRandomObject());
//list2.removeAt(2);
list2.removeAll(value);
var d = new Dictionary_1.Dictionary();
var hit = false;
d.forEach(function (test) { hit = true; });
d.add(22, "x");
d.add(11, "y");
d.add(4, "x");
d.add(111, "new");
var keys = d.getKeys();
var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8, 9], ["a", "b", "a", "b", "c", "a", "d", "e", "f"]);
var range = dict.getRangeByValues(["a", "b", "c"]);
d.distinct();
var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
var dict3 = new Dictionary_1.Dictionary();
dict3.addRange([17, 22, 88, 55, 12, 0, -12], [d1, d2, d3, d4, d5, d6, d7]);
dict3.removeByValue([d1, d2, d3, d4, d5, d6, d7]);
//let value3: number = dict3.get(d1);
var d8 = new Date(1995, 1, 1, 23, 59, 0, 0);
//let match: boolean = dict3.remove(d8);
// match = dict3.remove(d3);
var n = d.length;
/*
let dict2: Dictionary<Date, number> =  new Dictionary<Date, number>();

        let d1: Date = new Date(2000, 1,1,1,1,1,0);
        let d2b: Date = new Date(2000, 1,1,1,1,1,1);
        dict2.add(d1, 42);
        dict2.add(d2b, 43);
*/
//d.removeByValue("y");
d.forEach(function (item) {
    xyz(item);
});
function xyz(item) {
    console.log(item.key);
    console.log(item.value);
}
//let d2: Dictionary<number, string> = d.getRangeByValues(["y"]);
var output = d.get(4);
//# sourceMappingURL=index.js.map