"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortedDictionary_1 = require("../src/SortedDictionary");
var Comparer_1 = require("../src/Comparer");
var List_1 = require("../src/List");
var chai_1 = require("chai");
require("mocha");
// This file is to test the SortedDictionary<K,V> class
describe("SORTEDDICTIONARY<K,V>\n  #####################\nThe class is derived from Dictionary<K,V>. Only overridden or new functions and properties will be tested\n------------------------------------------\n", function () {
    describe('forEach method -> Behavior check', function () {
        var dict = new SortedDictionary_1.SortedDictionary();
        it('should return the concatenated string "-a-b-c-x" when performed', function () {
            dict.add(11, "a");
            dict.add(48, "b");
            dict.add(56, "c");
            dict.add(-13, "x");
            var value = "";
            dict.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-a-b-c-x");
        });
    });
    describe('getByIndex method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c"], [11, 42, 86]);
        it('should return the value 42 when performed with index 1', function () {
            var value = dict.getByIndex(1);
            chai_1.expect(value).to.equal(42);
        });
        it('should throw an error if an index of -2 is passed', function () {
            chai_1.expect(function () {
                var value = dict.getByIndex(-2);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 3 is passed on a dictionary with 3 elements', function () {
            chai_1.expect(function () {
                var value = dict.getByIndex(3);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                var value = dict2.getByIndex(0);
                value = undefined;
            }).to.throw();
        });
    });
    describe('getByIndices method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "d"], [11, 42, 86, -0.257]);
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as array)', function () {
            var value = dict.getByIndices([1, 2]);
            var match = false;
            if ((value[0] === 42 || value[0] === 86) && (value[1] === 42 || value[1] === 86)) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as List)', function () {
            var indices = new List_1.default([1, 2]);
            var value = dict.getByIndices(indices);
            var match = false;
            if ((value[0] === 42 || value[0] === 86) && (value[1] === 42 || value[1] === 86)) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', function () {
            chai_1.expect(function () {
                var value = dict.getByIndices([1, -2]);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                var value = dict.getByIndices([1, 4]);
                value = undefined;
            }).to.throw();
        });
    });
    describe('getByIndicesAsList method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "d"], [11, 42, 86, -0.257]);
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as array)', function () {
            var value = dict.getByIndicesAsList([1, 2]);
            var match = false;
            if (value.contains(42) && value.contains(86) && value.length === 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as List)', function () {
            var indices = new List_1.default([1, 2]);
            var value = dict.getByIndicesAsList(indices);
            var match = false;
            if (value.contains(42) && value.contains(86) && value.length === 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', function () {
            chai_1.expect(function () {
                var indices = new List_1.default([1, -2]);
                var value = dict.getByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                var indices = new List_1.default([1, 4]);
                var value = dict.getByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
    });
    describe('getKeyByIndex method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
        it('should return the key "x" when performed with index 3', function () {
            var value = dict.getKeyByIndex(3);
            chai_1.expect(value).to.equal("x");
        });
        it('should throw an error if an index of -2 is passed', function () {
            chai_1.expect(function () {
                var value = dict.getKeyByIndex(-2);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 4 is passed on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                var value = dict.getKeyByIndex(4);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                var value = dict2.getKeyByIndex(0);
                value = undefined;
            }).to.throw();
        });
    });
    describe('getKeysByIndices method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
        it('should return the keys "a" and "x" when performed with the indices 0 and 3 (as array)', function () {
            var value = dict.getKeysByIndices([0, 3]);
            var match = false;
            if ((value[0] === "a" || value[0] === "x") && (value[1] === "a" || value[1] === "x")) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return the keys "a" and "x" when performed with the indices 0 and 3 (as array)', function () {
            var indices = new List_1.default([0, 3]);
            var value = dict.getKeysByIndices(indices);
            var match = false;
            if ((value[0] === "a" || value[0] === "x") && (value[1] === "a" || value[1] === "x")) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', function () {
            chai_1.expect(function () {
                var value = dict.getKeysByIndices([1, -2]);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                var value = dict.getKeysByIndices([1, 4]);
                value = undefined;
            }).to.throw();
        });
    });
    describe('getKeysByIndicesAsList method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
        it('should return the keys "b" and "x" when performed with the indices 1 and 3 (as array)', function () {
            var value = dict.getKeysByIndicesAsList([1, 3]);
            var match = false;
            if (value.contains("b") && value.contains("x") && value.length === 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return the keys "b" and "x" when performed with the indices 1 and 3 (as List)', function () {
            var indices = new List_1.default([1, 3]);
            var value = dict.getKeysByIndicesAsList(indices);
            var match = false;
            if (value.contains("b") && value.contains("x") && value.length === 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', function () {
            chai_1.expect(function () {
                var indices = new List_1.default([1, -2]);
                var value = dict.getKeysByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                var indices = new List_1.default([1, 4]);
                var value = dict.getKeysByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
    });
    describe('setByIndex method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
        it('should return the value 111 if performed on index 2 and checked on key "c"', function () {
            dict.setByIndex(2, 111);
            var value = dict.get("c");
            chai_1.expect(value).to.equal(111);
        });
        it('should throw an error if an index of -2 is used', function () {
            chai_1.expect(function () {
                dict.setByIndex(-2, 55);
            }).to.throw();
        });
        it('should throw an error if an index of 99 is used on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                dict.setByIndex(99, 55);
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.setByIndex(0, 0);
            }).to.throw();
        });
    });
    describe('setByIndices method', function () {
        var dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
        it('should return the value 111 at key "c" and 0.01 at key "a" if performed on index 0 and 2 (as arrays)', function () {
            dict.setByIndices([0, 2], [0.01, 111]);
            var match;
            if (dict.get("a") === 0.01 && dict.get("c") === 111) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return the value 112 at key "c" and 0.02 at key "a" if performed on index 0 and 2 (as Lists)', function () {
            var iList = new List_1.default([0, 2]);
            var vList = new List_1.default([0.02, 112]);
            dict.setByIndices(iList, vList);
            var match;
            if (dict.get("a") === 0.02 && dict.get("c") === 112) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should throw an error if the indices -2 and 1 are used', function () {
            chai_1.expect(function () {
                dict.setByIndices([-2, 1], [0.01, 111]);
            }).to.throw();
        });
        it('should throw an error if the indices 2 and 99 are used on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                dict.setByIndices([2, 99], [0.01, 111]);
            }).to.throw();
        });
        it('should throw an error if the index 0 is passed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.setByIndices([0], [0.01]);
            }).to.throw();
        });
        it('should throw an error if the arrays of indices and values does not have the same length (indices = 2, values = 3)', function () {
            chai_1.expect(function () {
                dict.setByIndices([2, 3], [0.01, 111, 333]);
            }).to.throw();
        });
        it('should throw an error if the arrays of indices and values does not have the same length (indices = 3 values = 1)', function () {
            chai_1.expect(function () {
                dict.setByIndices([2, 1, 0], [0.01]);
            }).to.throw();
        });
        it('should throw an error if the Lists of indices and values does not have the same length', function () {
            chai_1.expect(function () {
                var iList = new List_1.default([0, 2, 3]);
                var vList = new List_1.default([0.02, 112]);
                dict.setByIndices(iList, vList);
            }).to.throw();
        });
    });
    describe('removeByIndex method', function () {
        var dict;
        it('should return the value 86 at index position 1 after removing this index previously', function () {
            dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
            dict.removeByIndex(1);
            var value = dict.getByIndex(1);
            chai_1.expect(value).to.equal(86);
        });
        it('should return the concatenated string "-a-b-x" when performed with forEach after removal of index 2', function () {
            var dict2 = new SortedDictionary_1.SortedDictionary();
            dict2.add(11, "a");
            dict2.add(48, "b");
            dict2.add(56, "c");
            dict2.add(-13, "x");
            dict2.removeByIndex(2);
            var value = "";
            dict2.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-a-b-x");
        });
        it('should throw an error if an index of -2 is used', function () {
            chai_1.expect(function () {
                dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
                dict.removeByIndex(-2);
            }).to.throw();
        });
        it('should throw an error if an index of 5 is used on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
                dict.removeByIndex(5);
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.removeByIndex(0);
            }).to.throw();
        });
    });
    describe('removeByIndices method', function () {
        var dict;
        it('should return the value 0 at index position 1 after removing the indices 1 and 2 previously (as array)', function () {
            dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
            dict.removeByIndices([1, 2]);
            var value = dict.getByIndex(1);
            chai_1.expect(value).to.equal(0);
        });
        it('should return the value 0 at index position 1 after removing the indices 1 and 2 previously (as List)', function () {
            dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
            var indices = new List_1.default([1, 2]);
            dict.removeByIndices(indices);
            var value = dict.getByIndex(1);
            chai_1.expect(value).to.equal(0);
        });
        it('should return the concatenated string "-a-c-y" when performed with forEach after removal of indices 1, 3 and 4', function () {
            var dict2 = new SortedDictionary_1.SortedDictionary();
            dict2.add(11, "a");
            dict2.add(48, "b");
            dict2.add(56, "c");
            dict2.add(-13, "x");
            dict2.add(-3, "z");
            dict2.add(0.254, "y");
            dict2.removeByIndices([1, 3, 4]);
            var value = "";
            dict2.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-a-c-y");
        });
        it('should throw an error if an the indices 0 and -2 are used', function () {
            chai_1.expect(function () {
                dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
                dict.removeByIndices([-2, 0]);
            }).to.throw();
        });
        it('should not throw an error if an empty indices array is passed', function () {
            chai_1.expect(function () {
                dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
                dict.removeByIndices([]);
            }).not.to.throw();
        });
        it('should throw an error if the indices 1 and 5 are used on a SortedDictionary with 4 elements', function () {
            chai_1.expect(function () {
                dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c", "x"], [11, 42, 86, 0]);
                dict.removeByIndices([1, 5]);
            }).to.throw();
        });
        it('should throw an error if the indices of 0, 1 and 2 are passed on a SortedDictionary with 2 elements', function () {
            chai_1.expect(function () {
                dict = new SortedDictionary_1.SortedDictionary(["a", "b"], [11, 42]);
                dict.removeByIndices([0, 1, 2]);
            }).to.throw();
        });
    });
    describe('sortByKey method', function () {
        var dict;
        it('should return the concatenated string "-x-a-b-c" when performed without a comparison function as argument', function () {
            dict = new SortedDictionary_1.SortedDictionary();
            dict.add(11, "a");
            dict.add(48, "b");
            dict.add(56, "c");
            dict.add(-13, "x");
            dict.sortByKey();
            var value = "";
            dict.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-x-a-b-c");
        });
        it('should not throw an error if performed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.sortByKey();
            }).not.to.throw();
        });
        it('should return the concatenated string "-x-a-b-c" when performed with a comparison function for Dates as argument', function () {
            var dict2 = new SortedDictionary_1.SortedDictionary();
            dict2.add(new Date(1995, 1, 1), "a");
            dict2.add(new Date(1996, 1, 1), "b");
            dict2.add(new Date(1999, 1, 1), "c");
            dict2.add(new Date(1994, 1, 1), "x");
            dict2.sortByKey(Comparer_1.Comparer.compareDates);
            var value = "";
            dict2.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-x-a-b-c");
        });
        it('should return the concatenated string "-x-a-b-c" when performed with a implemented compareTo function in a test class', function () {
            var dict2 = new SortedDictionary_1.SortedDictionary();
            dict2.add(new SortTestClass("D"), "c");
            dict2.add(new SortTestClass("B"), "a");
            dict2.add(new SortTestClass("C"), "b");
            dict2.add(new SortTestClass("A"), "x");
            dict2.sortByKey();
            var value = "";
            dict2.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-x-a-b-c");
        });
        it('should throw an error when performed with a test class without implementation of a compareTo function', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.add(new SortTestClass2("D"), "c");
                dict2.add(new SortTestClass2("B"), "a");
                dict2.sortByKey();
            }).to.throw();
        });
    });
    describe('sortByValue method', function () {
        var dict;
        it('should return the concatenated string "-a-b-c-x" when performed without a comparison function as argument', function () {
            dict = new SortedDictionary_1.SortedDictionary();
            dict.add(11, "a");
            dict.add(48, "x");
            dict.add(56, "c");
            dict.add(-13, "b");
            dict.sortByValue();
            var value = "";
            dict.forEach(function (item) {
                value = value + "-" + item.value;
            });
            chai_1.expect(value).to.equal("-a-b-c-x");
        });
        it('should not throw an error if performed on a empty SortedDictionary', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.sortByValue();
            }).not.to.throw();
        });
        it('should return the concatenated string "-a-b-c-d" when performed with a comparison function for Dates as argument', function () {
            var dict2 = new SortedDictionary_1.SortedDictionary();
            dict2.add("b", new Date(1995, 1, 1));
            dict2.add("c", new Date(1996, 1, 1));
            dict2.add("d", new Date(1999, 1, 1));
            dict2.add("a", new Date(1994, 1, 1));
            dict2.sortByValue(Comparer_1.Comparer.compareDates);
            var value = "";
            dict2.forEach(function (item) {
                value = value + "-" + item.key;
            });
            chai_1.expect(value).to.equal("-a-b-c-d");
        });
        it('should return the concatenated string "-A-B-C-D" when performed with a implemented compareTo function in a test class', function () {
            var dict2 = new SortedDictionary_1.SortedDictionary();
            dict2.add(22, new SortTestClass("D"));
            dict2.add(33, new SortTestClass("B"));
            dict2.add(0, new SortTestClass("C"));
            dict2.add(-10, new SortTestClass("A"));
            dict2.sortByValue();
            var value = "";
            dict2.forEach(function (item) {
                value = value + "-" + item.value.value;
            });
            chai_1.expect(value).to.equal("-A-B-C-D");
        });
        it('should throw an error when performed with a test class without implementation of a compareTo function', function () {
            chai_1.expect(function () {
                var dict2 = new SortedDictionary_1.SortedDictionary();
                dict2.add("a", new SortTestClass2("D"));
                dict2.add("b", new SortTestClass2("B"));
                dict2.sortByValue();
            }).to.throw();
        });
    });
    /************ */
});
var SortTestClass = (function () {
    function SortTestClass(value) {
        this.value = value;
    }
    SortTestClass.prototype.compareTo = function (other) {
        return Comparer_1.Comparer.compareStrings(this.value, other.value);
    };
    SortTestClass.prototype.toString = function () {
        return this.value;
    };
    return SortTestClass;
}());
var SortTestClass2 = (function () {
    function SortTestClass2(value) {
        this.value = value;
    }
    SortTestClass2.prototype.toString = function () {
        return this.value;
    };
    return SortTestClass2;
}());
//# sourceMappingURL=SortedDictionaryTest.js.map