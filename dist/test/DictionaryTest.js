"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("../src/Dictionary");
var List_1 = __importDefault(require("../src/List"));
var Comparer_1 = require("../src/Comparer");
var Utils_1 = require("./utils/Utils");
var Types_1 = require("./utils/Types");
var TestClass_1 = require("./utils/TestClass");
var chai_1 = require("chai");
require("mocha");
// This file is to test the Dictionary<K,V> class
describe("DICTIONARY<K,V>\n  ###############\n", function () {
    describe("constructors", function () {
        var dict;
        it("should not throw an error if initialized without parameters", function () {
            chai_1.expect(function () {
                dict = new Dictionary_1.Dictionary();
            }).not.to.throw();
        });
        it("should not throw an error if initialized with an override function for hashing of keys", function () {
            var dict2;
            chai_1.expect(function () {
                dict2 = new Dictionary_1.Dictionary(Utils_1.Utils.properDateHashFunction);
            }).not.to.throw();
        });
        it("should return a length of 1 if initialized with one key and value", function () {
            dict = new Dictionary_1.Dictionary(42, "fortytwo");
            var length = dict.length;
            chai_1.expect(length).to.equal(1);
        });
        it("should return a length of 5 if initialized with an array of 5 keys and values", function () {
            var keys = [11, 22, 33, 44, 55];
            var values = ["11", "22", "33", "44", "55"];
            dict = new Dictionary_1.Dictionary(keys, values);
            var length = dict.length;
            chai_1.expect(length).to.equal(5);
        });
        it("should return a length of 5 if initialized with a dictionary of 5 keys and values", function () {
            var initDict = new Dictionary_1.Dictionary([11, 22, 33, 44, 55], ["11", "22", "33", "44", "55"]);
            dict = new Dictionary_1.Dictionary(initDict);
            var length = dict.length;
            chai_1.expect(length).to.equal(5);
        });
        it("should throw an error if initialized with an keys array of different length than the vales array", function () {
            var keys = [11, 22, 55];
            var values = ["11", "22", "33", "44", "55"];
            chai_1.expect(function () {
                dict = new Dictionary_1.Dictionary(keys, values);
            }).to.throw();
        });
        it("should return a lengt of 4 if initialized with 2 lists of 4 each 4 keys and values", function () {
            var keys = Utils_1.Utils.setupList(Types_1.Types.number, [11, 22, 33, 44]);
            var values = Utils_1.Utils.setupList(Types_1.Types.string, ["11", "22", "33", "44"]);
            dict = new Dictionary_1.Dictionary(keys, values);
            var length = dict.length;
            chai_1.expect(length).to.equal(4);
        });
        it("should return a length of 0 if initialized with two empty arrays as keys and values", function () {
            var keys = [];
            var values = [];
            dict = new Dictionary_1.Dictionary(keys, values);
            var length = dict.length;
            chai_1.expect(length).to.equal(0);
        });
    });
    describe("length property", function () {
        var dict;
        it("should return 0 on an initialized (empty) dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            chai_1.expect(dict.length).to.equal(0);
        });
        it("should return 9 on a dictionary with 9 elements", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            chai_1.expect(dict.length).to.equal(9);
        });
        it("should return 10 after adding one element to a dictionary of 9 elements", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.add(1, "y");
            chai_1.expect(dict.length).to.equal(10);
        });
        it("should return 8 after removing one element from a dictionary of 9 elements", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.remove(22.00001);
            chai_1.expect(dict.length).to.equal(8);
        });
        it("should return 9 after removing one element from a dictionary of 9 elements wit an non-existing key", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.remove(885);
            chai_1.expect(dict.length).to.equal(9);
        });
        it("should return 0 after execution of the clear() method", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.clear();
            chai_1.expect(dict.length).to.equal(0);
        });
        it("should return 0 after removing the last element of a dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, 17, "x");
            dict.remove(17);
            chai_1.expect(dict.length).to.equal(0);
        });
    });
    describe("add method", function () {
        var dict;
        it("should add an element and increase the length of the dictionary by one", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            dict.add("test", 22);
            chai_1.expect(dict.length).to.equal(1);
        });
        it('should return 42 as value at element with the key "one"', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            dict.add("one", 42);
            dict.add("two", 43);
            dict.add("One", 42.1);
            var entry = dict.get("one");
            chai_1.expect(entry).to.equal(42);
        });
        it("should replace an existing item (same key) and not increase the length of 3 of an existing dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            dict.add("one", 42);
            dict.add("two", 43);
            dict.add("One", 42.1);
            dict.add("two", -2);
            chai_1.expect(dict.length).to.equal(3);
        });
        it("should not replace a Date value that differs just 1 ms from another as key instead of adding a new one (failing of toString)", function () {
            var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
            var d1 = new Date(2000, 1, 1, 1, 1, 1, 0);
            var d2 = new Date(2000, 1, 1, 1, 1, 1, 1);
            dict2.add(d1, 42);
            dict2.add(d2, 43);
            chai_1.expect(dict2.length).not.to.equal(1);
        });
        it("should not replace a Date value that differs just 1 ms from another as key instead of replacing it after definition of a override function for toString", function () {
            var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
            var d1 = new Date(2000, 1, 1, 1, 1, 1, 0);
            var d2 = new Date(2000, 1, 1, 1, 1, 1, 1);
            dict2.overrideHashFunction(Utils_1.Utils.properDateHashFunction);
            dict2.add(d1, 42);
            dict2.add(d2, 43);
            chai_1.expect(dict2.length).to.equal(2);
        });
        it("should throw an error when adding undefined as key to a dictionary", function () {
            chai_1.expect(function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.add(undefined, 22);
            }).to.throw();
        });
        it("should throw an error when adding undefined as value to a dictionary", function () {
            chai_1.expect(function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.add("undefined", undefined);
            }).to.throw();
        });
        it("should throw an error when adding undefined as key and value to a dictionary", function () {
            chai_1.expect(function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.add(undefined, undefined);
            }).to.throw();
        });
        it('should not throw an error when adding the string "undefined" as key to a dictionary', function () {
            chai_1.expect(function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.add("undefined", 22);
            }).not.to.throw();
        });
    });
    describe("addRange method -> calls add()", function () {
        var keys = ["one", "two", "three", "four", "five"];
        var values = [1, 2, 3, 4, 5];
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
        it("should add five elements from two arrays (keys & values) to an empty dictionary and return five as length of the list", function () {
            dict.addRange(keys, values);
            chai_1.expect(dict.length).to.equal(5);
        });
        it("should add five elements from two Lists (keys & values) to an empty dictionary and return five as length of the list", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            var kL = new List_1.default(keys);
            var vL = new List_1.default(values);
            dict.addRange(kL, vL);
            chai_1.expect(dict.length).to.equal(5);
        });
        it("should add five elements from a dictionary to an empty dictionary and return five as length of the dictionary", function () {
            var newDict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            newDict.addRange(dict);
            chai_1.expect(newDict.length).to.equal(5);
        });
        it('should return the value 4 at the key "four" after adding a range of 5 elements', function () {
            var item = dict.get("four");
            chai_1.expect(item).to.equal(4);
        });
        it("should throw an error if the arrays of keys and values are different", function () {
            chai_1.expect(function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.addRange(["1", "2", "3"], [22, 33, 44, 55]);
            }).to.throw();
        });
        it("should throw an error if the lists of keys and values are different", function () {
            var kL = new List_1.default(["k1", "k2", "k3"]);
            var vL = new List_1.default([22, 55]);
            chai_1.expect(function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.addRange(kL, vL);
            }).to.throw();
        });
    });
    describe("clear method", function () {
        var dict;
        it("should return a length of zero after execution on a dictionary with 4 elements", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.boolean, ["1", "2", "3", "4"], [true, false, true, true]);
            dict.clear();
            chai_1.expect(dict.length).to.equal(0);
        });
        it("should return a length of zero after execution on a dictionary with zero elements", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.boolean);
            dict.clear();
            chai_1.expect(dict.length).to.equal(0);
        });
    });
    describe("containsKey method", function () {
        var dict;
        it("should return false with the key 42 on an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean);
            var match = dict.containsKey(42);
            chai_1.expect(match).to.equal(false);
        });
        it("should return false with the key 42 on a dictionary where the key does not exist", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42.000000001], [false, true, false, true]);
            var match = dict.containsKey(42);
            chai_1.expect(match).to.equal(false);
        });
        it("should return true with the key 42 on a dictionary where the key does exist", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
            var match = dict.containsKey(42);
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("containsKeys method", function () {
        var dict;
        it("should return false with the keys 42 and 22 on an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean);
            var match = dict.containsKeys([42, 22]);
            chai_1.expect(match).to.equal(false);
        });
        it("should return false with the key 42 and 22 on a dictionary where the keys does not exist", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42.000000001], [false, true, false, true]);
            var match = dict.containsKeys([42, 22]);
            chai_1.expect(match).to.equal(false);
        });
        it("should return true with the keys 42 and 22 on a dictionary where the key 42 does exist", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
            var match = dict.containsKeys([42, 22]);
            chai_1.expect(match).to.equal(true);
        });
        it("should return true with the keys 42 and 22 on a dictionary where the key 42 does exist (passed as list)", function () {
            var kL = new List_1.default([42, 22]);
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
            var match = dict.containsKeys(kL);
            chai_1.expect(match).to.equal(true);
        });
        it("should return false with the keys 42 and 22 on a dictionary where only the key 42 does exist but the all parameter is set to true", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
            var match = dict.containsKeys([42, 22], true);
            chai_1.expect(match).to.equal(false);
        });
        it("should return true with the keys 42 and 22 on a dictionary where the keys 42 and 22 exist and the all parameter is set to true", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 22, 45, 42], [false, true, false, true]);
            var match = dict.containsKeys([42, 22], true);
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("containsValue method", function () {
        var dict;
        it('should return false with the value "two" on an empty dictionary', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            var match = dict.containsValue("two");
            chai_1.expect(match).to.equal(false);
        });
        it('should return false with the value "two" on a dictionary where the value does not exist', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42.000000001], ["one", "six", "three", "four"]);
            var match = dict.containsValue("two");
            chai_1.expect(match).to.equal(false);
        });
        it('should return true with the value "two" on a dictionary where the value does exist', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42.000000001], ["one", "two", "three", "four"]);
            var match = dict.containsValue("two");
            chai_1.expect(match).to.equal(true);
        });
        it('should return true with the value "two" on a dictionary where the value does exist multiple times', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42.000000001], ["one", "two", "two", "two"]);
            var match = dict.containsValue("two");
            chai_1.expect(match).to.equal(true);
        });
        it('should return true with the value "" (empty) on a dictionary where the value does exist', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42.000000001], ["one", "two", "", "two"]);
            var match = dict.containsValue("");
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("containsValues method", function () {
        var dict;
        it('should return false with the value "two" and "three" on an empty dictionary', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            var match = dict.containsValues(["two", "three"]);
            chai_1.expect(match).to.equal(false);
        });
        it('should return false with the values "two" and "three" on a dictionary where the values does not exist', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42.000000001], ["one", "four", "5", "six"]);
            var match = dict.containsValues(["two", "three"]);
            chai_1.expect(match).to.equal(false);
        });
        it('should return true with the values "two" and "three" on a dictionary where the value "two" does exist', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42], ["one", "two", "5", "six"]);
            var match = dict.containsValues(["two", "three"]);
            chai_1.expect(match).to.equal(true);
        });
        it('should return true with the values "two" and "three" on a dictionary where the value "two" does exist (passed as list)', function () {
            var kL = new List_1.default(["two", "three"]);
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42], ["one", "two", "5", "six"]);
            var match = dict.containsValues(kL);
            chai_1.expect(match).to.equal(true);
        });
        it('should return false with the values "two" and "three" on a dictionary where only the value "two" does exist but the all parameter is set to true', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42], ["one", "two", "5", "six"]);
            var match = dict.containsValues(["two", "three"], true);
            chai_1.expect(match).to.equal(false);
        });
        it('should return true with the values "two" and "three" on a dictionary where both value does exist and the all parameter is set to true', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42], ["one", "two", "three", "four"]);
            var match = dict.containsValues(["two", "three"], true);
            chai_1.expect(match).to.equal(true);
        });
        it('should return true with the values "two" and "three" on a dictionary where both value does exist multiple times and the all parameter is set to true', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [41, 43, 45, 42, 55, 1], ["one", "two", "three", "four", "three", "two"]);
            var match = dict.containsValues(["two", "three"], true);
            chai_1.expect(match).to.equal(false);
        });
    });
    describe("distinct method", function () {
        it("should return a length of 6 on a dictionary with 8 entries and 3 identical strings values after execution", function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8], ["a", "b", "a", "c", "d", "c", "e", "f"]);
            dict.distinct();
            chai_1.expect(dict.length).to.equal(6);
        });
        it("should return length of 5 on a list with 6 entries of a complex class object (custom) with 2 duplicate values", function () {
            var dict2 = new Dictionary_1.Dictionary();
            dict2.add(1, TestClass_1.TestClass.createRandomObject());
            dict2.add(2, TestClass_1.TestClass.createRandomObject());
            var value = TestClass_1.TestClass.createRandomObject();
            dict2.add(3, value);
            dict2.add(4, TestClass_1.TestClass.createRandomObject());
            dict2.add(5, value);
            dict2.add(6, TestClass_1.TestClass.createRandomObject());
            dict2.distinct();
            chai_1.expect(dict2.length).to.equal(5);
        });
        it("should return length of 3 on a list with 3 date entries whwre two values only differs by 1 ms", function () {
            var dict2 = new Dictionary_1.Dictionary();
            dict2.add(1, new Date());
            var value = new Date(2017, 1, 1, 1, 1, 0, 0);
            var value2 = new Date(2017, 1, 1, 1, 1, 0, 1);
            dict2.add(2, value);
            dict2.add(3, value2);
            dict2.distinct();
            chai_1.expect(dict2.length).to.equal(3);
        });
        it("should return a length of 8 on a dictionary with 8 entries and no duplicates", function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8], ["a", "b", "c", "d", "e", "f", "g", "h"]);
            dict.distinct();
            chai_1.expect(dict.length).to.equal(8);
        });
        it("should not throw an error if executed on an empty dictionary", function () {
            var dict2 = new Dictionary_1.Dictionary();
            chai_1.expect(function () {
                dict2.distinct();
            }).not.to.throw();
        });
    });
    describe("forEach method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.number, [13, 11, 7, 5, 2], [1.11111, 22.2222, 333.333, 4444.44, 55555.5]);
        it("should return the value 135925.41963 after multiplication of each key-value pair and adding all up", function () {
            var value = 0;
            dict.forEach(function (item) {
                value = value + item.key * item.value;
            });
            chai_1.expect(value).to.equal(135925.41963);
        });
        it("should return the iteration counter 3 after execution of the forEach with a break (dict.break(); return) after 3 cycles", function () {
            var counter = -1;
            var dummy;
            dict.forEach(function (item) {
                counter++;
                if (counter === 3) {
                    dict.break();
                    return;
                }
                dummy = item;
            });
            chai_1.expect(counter).to.equal(3);
        });
        it("should return the iteration counter 4 after execution of the forEach with a continue (dict.continue(); return) after 3 cycles", function () {
            var counter = -1;
            var dummy;
            dict.forEach(function (item) {
                counter++;
                if (counter === 3) {
                    dict.continue();
                    return;
                }
                dummy = item;
            });
            chai_1.expect(counter).to.equal(4);
        });
        it("should return the iteration counter 4 after execution of the forEach with a return call after 3 cycles", function () {
            var counter = -1;
            var dummy;
            dict.forEach(function (item) {
                counter++;
                if (counter === 3) {
                    return;
                }
                dummy = item;
            });
            chai_1.expect(counter).to.equal(4);
        });
        it("should return the number of 5 iterations after the execution", function () {
            var i = 0;
            var dummy;
            dict.forEach(function (item) {
                i++;
                dummy = item;
            });
            chai_1.expect(i).to.equal(5);
        });
        it("should not trigger the callback function on a empty dictionary during the execution", function () {
            dict = new Dictionary_1.Dictionary();
            var hit = false;
            var dummy;
            dict.forEach(function (item) {
                hit = true;
                dummy = item;
            });
            chai_1.expect(hit).to.equal(false);
        });
    });
    describe("get method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, [17, 22, 88, 55, 12, 0, -12], [d1, d2, d3, d4, d5, d6, d7]);
        it("should return the date of 1017-1-1 at the key 55", function () {
            var value = dict.get(55);
            chai_1.expect(value.getTime()).to.equal(d4.getTime());
        });
        it("should throw an error when executed with the key 222 on a dictionary where this key does not exist", function () {
            chai_1.expect(function () {
                var value = dict.get(222);
                value.toString();
            }).to.throw();
        });
        it("should throw an error when executed with undefined as key on a dictionary", function () {
            chai_1.expect(function () {
                var value = dict.get(undefined);
                value.toString();
            }).to.throw();
        });
        it("should return the number 22 with a date object of  Date(2017,1,1,23,59,0,1) as key (using a proper date hashing function)", function () {
            var dict2 = new Dictionary_1.Dictionary(Utils_1.Utils.properDateHashFunction);
            dict2.addRange([d1, d2, d3, d4, d5, d6, d7], [17, 22, 88, 55, 12, 0, -12]);
            dict2.overrideHashFunction(Utils_1.Utils.properDateHashFunction);
            var value = dict2.get(d2);
            chai_1.expect(value).to.equal(22);
        });
        it("should not return the number 22 with a date object of  Date(2017,1,1,23,59,0,0) as key (using a proper date hashing function)", function () {
            var dict2 = new Dictionary_1.Dictionary(Utils_1.Utils.properDateHashFunction);
            dict2.addRange([d1, d2, d3, d4, d5, d6, d7], [17, 22, 88, 55, 12, 0, -12]);
            var value = dict2.get(d1);
            chai_1.expect(value).not.to.equal(22);
        });
        it("should not return the number 22 with a date object of  Date(2017,1,1,23,59,0,0) as key (without replacing the hashing function)", function () {
            var dict2 = new Dictionary_1.Dictionary([d1, d2, d3, d4, d5, d6, d7], [17, 22, 88, 55, 12, 0, -12]);
            var value = dict2.get(d1);
            chai_1.expect(value).not.to.equal(22);
        });
    });
    describe("getKeys method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.number, [13, 11, 7, 5, 2], [1.11111, 22.2222, 333.333, 4444.44, 55555.5]);
        it("should return an array of the size 5 when executed on a dictionary with the same size", function () {
            var keys = dict.getKeys();
            chai_1.expect(keys.length).to.equal(dict.length);
        });
        it("should return an empty array when executed on an empty dictionary", function () {
            var dict2 = new Dictionary_1.Dictionary();
            var keys = dict2.getKeys();
            chai_1.expect(keys.length).to.equal(0);
        });
        it("should return an array with numbers as data type when executed on a dictionary with this key type", function () {
            var keys = dict.getKeys();
            var match = true;
            for (var i = 0; i < keys.length; i++) {
                if (typeof keys[i] !== "number") {
                    match = false;
                }
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return the sum of 38 when executed on a dictionary numbers as keys", function () {
            var keys = dict.getKeys();
            var sum = 0;
            for (var i = 0; i < keys.length; i++) {
                sum += keys[i];
            }
            chai_1.expect(sum).to.equal(38);
        });
    });
    describe("getKeysAsList method -> calls getKeys()", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.number, [13, 11, 7, 5, 2], [1.11111, 22.2222, 333.333, 4444.44, 55555.5]);
        it("should return a List of the size 5 when executed on a dictionary with the same size", function () {
            var keys = dict.getKeysAsList();
            chai_1.expect(keys.length).to.equal(dict.length);
        });
        it("should return an empty List when executed on an empty dictionary", function () {
            var dict2 = new Dictionary_1.Dictionary();
            var keys = dict2.getKeysAsList();
            chai_1.expect(keys.length).to.equal(0);
        });
        it("should return the sum of 38 when executed on a dictionary numbers as keys", function () {
            var keys = dict.getKeysAsList();
            var sum = 0;
            keys.forEach(function (item) {
                sum += item;
            });
            chai_1.expect(sum).to.equal(38);
        });
    });
    describe("getKeysByValue method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var dict; // = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);
        it("should return the two keys 22 and 55 with the date 1017-1-1 as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValue(d4);
            var match = false;
            if ((result[0] === 22 || result[0] === 55) &&
                (result[1] === 22 || result[1] === 55)) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty array with the date 1990-1-1 as value which does no exist in the dictionary as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValue(d7);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an empty array with the date 1990-1-1 as value in an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
            var result = dict.getKeysByValue(d7);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return one key 17 date 2017-1-1 as value that differs only 1 ms from key 22", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7
            ]);
            var result = dict.getKeysByValue(d1);
            var match = false;
            if (result[0] === 17) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("getKeysByValue method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var dict; // = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);
        it("should return the two keys 22 and 55 with the date 1017-1-1 as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValue(d4);
            var match = true;
            for (var i = 0; i < result.length; i++) {
                if (result[i] !== 22 && result[i] !== 55) {
                    match = false;
                }
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty array with the date 1990-1-1 as value which does no exist in the dictionary as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValue(d7);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an empty array with the date 1990-1-1 as value in an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
            var result = dict.getKeysByValue(d7);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return one key 17 date 2017-1-1 as value that differs only 1 ms from key 22", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7
            ]);
            var result = dict.getKeysByValue(d1);
            var match = false;
            if (result[0] === 17 && result.length === 1) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("getKeysByValues method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var d8 = new Date(1990, 1, 2, 23, 59, 0, 0);
        var dict; // = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);
        it("should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValues([d4, d3]);
            var match = true;
            for (var i = 0; i < result.length; i++) {
                if (result[i] !== 22 && result[i] !== 55 && result[i] !== 12) {
                    match = false;
                }
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values (passed as List)", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            var values = new List_1.default([d4, d3]);
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValues(values);
            var match = true;
            for (var i = 0; i < result.length; i++) {
                if (result[i] !== 22 && result[i] !== 55 && result[i] !== 12) {
                    match = false;
                }
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty array with the dates 1990-1-1 and 1990-1-2 as values which does no exist in the dictionary as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValues([d7, d8]);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an empty array with the dates 1990-1-1 and 1990-1-2 as values in an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
            var result = dict.getKeysByValues([d7, d8]);
            chai_1.expect(result.length).to.equal(0);
        });
    });
    describe("getKeysByValuesAsList method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var d8 = new Date(1990, 1, 2, 23, 59, 0, 0);
        var dict; // = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);
        it("should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValuesAsList([d4, d3]);
            var match = false;
            if (result.contains(22) && result.contains(55) && result.contains(12)) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values (passed as List)", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            var values = new List_1.default([d4, d3]);
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValuesAsList(values);
            var match = false;
            if (result.contains(22) && result.contains(55) && result.contains(12)) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty list with the dates 1990-1-1 and 1990-1-2 as values which does no exist in the dictionary as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValuesAsList([d7, d8]);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an empty list with the dates 1990-1-1 and 1990-1-2 as values in an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
            var result = dict.getKeysByValuesAsList([d7, d8]);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an empty list if an empty array of vales is passed", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValuesAsList([]);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an list with the key 17, although the value 2017-1-1 was passed twice", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValuesAsList([d1, d1]);
            var match = false;
            if (result.length === 1 && result.contains(17)) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("getKeysByValueAsList method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2015, 1, 1, 23, 59, 0, 1);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var dict; // = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);
        it("should return the two keys 22 and 55 with the date 1017-1-1 as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d4,
                d3,
                d5,
                d6
            ]);
            var result = dict.getKeysByValueAsList(d4);
            var match = false;
            if (result.contains(22) && result.contains(55) && result.length === 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty List with the date 1990-1-1 as value which does no exist in the dictionary as value", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d4,
                d2,
                d3,
                d4,
                d5,
                d6
            ]);
            var result = dict.getKeysByValueAsList(d7);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return an empty List with the date 1990-1-1 as value in an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
            var result = dict.getKeysByValueAsList(d7);
            chai_1.expect(result.length).to.equal(0);
        });
        it("should return one key 17 date 2017-1-1 as value that differs only 1 ms from key 22", function () {
            var keys = [17, 22, 88, 55, 12, 0, -12];
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, keys, [
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7
            ]);
            var result = dict.getKeysByValueAsList(d1);
            var match = false;
            if (result.contains(17) && result.length === 1) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("getRange method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8, 9], ["a", "b", "a", "b", "c", "a", "d", "e", "f"]);
        it("should copy the whole dictionary (same length)", function () {
            var range = dict.getRange();
            chai_1.expect(dict.length).to.equal(range.length);
        });
        it('should return a dictionary with the values "b", "a" and "c" with the keys 2,3,5 passed as array', function () {
            var range = dict.getRange([2, 3, 5]);
            var match = false;
            if (range.containsValues(["a", "b", "c"], true) === true) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty dictionary wen executed with the keys 22 and 33 which do not exist in the original dictionary", function () {
            var range = dict.getRange([22, 33]);
            chai_1.expect(range.length).to.equal(0);
        });
        it('should return a dictionary with the values "b", "a" and "c" with the keys 2,3,5 passed as List', function () {
            var keys = new List_1.default([3, 5, 6]);
            var range = dict.getRange(keys);
            var match = false;
            if (range.containsValues(["a", "b", "c"], true) === true) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty dictionary when executed on an empty original dictionary", function () {
            var keys = new List_1.default([3, 5, 6]);
            var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            var range = dict2.getRange(keys);
            chai_1.expect(range.length).to.equal(0);
        });
    });
    describe("getRangeByValues method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8, 9], ["a", "b", "a", "b", "c", "a", "d", "e", "f"]);
        it('should return a dictionary with the keys 1,2,3,4,5 and 6 with the values "a", "b" and "c" passed as array', function () {
            var range = dict.getRangeByValues([
                "a",
                "b",
                "c"
            ]);
            var match = false;
            if (range.containsKeys([1, 2, 3, 4, 5, 6], true) === true) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return a dictionary with the keys 1,2,3,4,5 and 6 with the values "a", "b" and "c" passed as List', function () {
            var values = new List_1.default(["a", "b", "c"]);
            var range = dict.getRangeByValues(values);
            var match = false;
            if (range.containsKeys([1, 2, 3, 4, 5, 6], true) === true) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return an empty dictionary wen executed with the vales "x" and "y" which do not exist in the original dictionary', function () {
            var range = dict.getRangeByValues(["x", "y"]);
            chai_1.expect(range.length).to.equal(0);
        });
        it("should return an empty dictionary when executed on an empty original dictionary", function () {
            var values = new List_1.default(["a", "b", "c"]);
            var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            var range = dict2.getRangeByValues(values);
            chai_1.expect(range.length).to.equal(0);
        });
    });
    describe("getValues method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8, 9], ["a", "b", "a", "b", "c", "a", "d", "e", "f"]);
        it("should return an array with 9 elements of the type string", function () {
            var values = dict.getValues();
            chai_1.expect(values.length).to.equal(9);
        });
        it("should return an empty array with on a empty dictionary", function () {
            var dict2 = new Dictionary_1.Dictionary();
            var values = dict2.getValues();
            chai_1.expect(values.length).to.equal(0);
        });
        it('should return the value "f" at the last index position of the array, after sorting', function () {
            var values = dict.getValues();
            var temp = new List_1.default(values);
            temp.sort(Comparer_1.Comparer.compareStrings);
            var result = temp.get(temp.length - 1);
            chai_1.expect(result).to.equal("f");
        });
    });
    describe("getValuesAsList method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [1, 2, 3, 4, 5, 6, 7, 8, 9], ["a", "b", "a", "b", "c", "a", "d", "e", "f"]);
        it("should return a List with 9 elements of the type string", function () {
            var values = dict.getValuesAsList();
            chai_1.expect(values.length).to.equal(9);
        });
        it("should return an empty List with on a empty dictionary", function () {
            var dict2 = new Dictionary_1.Dictionary();
            var values = dict2.getValuesAsList();
            chai_1.expect(values.length).to.equal(0);
        });
    });
    describe("next method", function () {
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.number, [13, 11, 7, 5, 2], [1.11111, 22.2222, 333.333, 4444.44, 55555.5]);
        it("should return the value 135925.41963 when multiplying key and value of each key-value pair and adding all up after 5 calls", function () {
            var value = 0;
            var item;
            for (var i = 0; i < 5; i++) {
                item = dict.next()
                    .value;
                value = value + item.key * item.value;
            }
            chai_1.expect(value).to.equal(135925.41963);
        });
        it("should return the value 271850.83926 after 10 calls (2 rounds)", function () {
            var value = 0;
            var item;
            for (var i = 0; i < 10; i++) {
                item = dict.next()
                    .value;
                value = value + item.key * item.value;
            }
            chai_1.expect(value).to.equal(271850.83926);
        });
        it("should indicate that the last element is reached after 5 calls in a dictionary of 5 entries (for loop)", function () {
            var state;
            for (var i = 0; i < 5; i++) {
                state = dict.next()
                    .isLastEntry;
            }
            chai_1.expect(state).to.equal(true);
        });
        it("should indicate that the last element is reached after 7 calls in a dictionary of 5 entries if a forEach call was executed after the 2nd next call (reset)", function () {
            var state;
            var dummy;
            for (var i = 0; i < 7; i++) {
                if (i === 2) {
                    dict.forEach(function (item) {
                        dummy = item;
                    });
                }
                state = dict.next()
                    .isLastEntry;
            }
            chai_1.expect(state).to.equal(true);
        });
        it('should indicate that the last element is reached after 3 calls in a dictionary of 5 entries (for loop) and after passing "true" ath the 3rd iteration (break condition)', function () {
            var counter = 0;
            var item;
            for (var i = 0; i < 5; i++) {
                if (i === 2) {
                    item = dict.next(true);
                }
                else {
                    item = dict.next();
                }
                counter++;
                if (item.isLastEntry === true) {
                    break;
                }
            }
            chai_1.expect(counter).to.equal(3);
        });
    });
    describe("overrideHashFunction method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2017, 1, 1, 23, 59, 0, 2);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var values = [17, 22, 88, 55, 12, 0, -12];
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
        it("should return 7 entries after initial execution on a dictionary of 7 entries and 3 entries with dates as key which differs only 1 ms", function () {
            dict.overrideHashFunction(Utils_1.Utils.properDateHashFunction);
            dict.addRange([d1, d2, d3, d4, d5, d6, d7], values);
            chai_1.expect(dict.length).to.equal(7);
        });
        it("should return 7 entries after execution within constructor on a dictionary of 7 entries and 3 entries with dates as key which differs only 1 ms", function () {
            dict = new Dictionary_1.Dictionary(Utils_1.Utils.properDateHashFunction);
            dict.addRange([d1, d2, d3, d4, d5, d6, d7], values);
            chai_1.expect(dict.length).to.equal(7);
        });
        it("should throw an error if undefined was passed as function", function () {
            dict = new Dictionary_1.Dictionary();
            chai_1.expect(function () {
                var dict2 = new Dictionary_1.Dictionary();
                dict2.overrideHashFunction(undefined);
                dict2.addRange(values, values);
            }).to.throw();
        });
    });
    describe("remove method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2017, 1, 1, 23, 59, 0, 2);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var values = [17, 22, 88, 55, 12, 0, -12];
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
        it("should return a length of 6 after execution with the (existing) key 22 on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            dict.remove(22);
            chai_1.expect(dict.length).to.equal(6);
        });
        it("should return a length of 6 after execution with the (existing) key 2017-1-1 on a dictionary of 7 entries", function () {
            var dict2 = new Dictionary_1.Dictionary([d1, d2, d3, d4, d5, d6, d7], values);
            dict2.remove(d2);
            chai_1.expect(dict.length).to.equal(6);
        });
        it("should return a length of 4 after execution with the (existing) keys 22, 88 and 12 (passed as array) on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            dict.remove([12, 22, 88]);
            chai_1.expect(dict.length).to.equal(4);
        });
        it("should return a length of 4 after execution with the (existing) keys 22, 88 and 12 (passed as List) on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            var list = new List_1.default([12, 22, 88]);
            dict.remove(list);
            chai_1.expect(dict.length).to.equal(4);
        });
        it("should return a length of 0 after removal of all keys on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            dict.remove([17, 22, 88, 55, 12, 0, -12]);
            chai_1.expect(dict.length).to.equal(0);
        });
        it("should return true after execution with the (existing) key 22", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            var match = dict.remove(22);
            chai_1.expect(match).to.equal(true);
        });
        it("should return false after execution with the (not existing) key 122", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            var match = dict.remove(122);
            chai_1.expect(match).to.equal(false);
        });
        it("should not throw an error when executed on an empty dictionary", function () {
            dict = new Dictionary_1.Dictionary();
            chai_1.expect(function () {
                dict.remove(42);
            }).not.to.throw();
        });
    });
    describe("removeByValue method", function () {
        var d1 = new Date(2017, 1, 1, 23, 59, 0, 1);
        var d2 = new Date(2017, 1, 1, 23, 59, 0, 0);
        var d3 = new Date(2016, 1, 1, 23, 59, 0, 0);
        var d4 = new Date(1017, 1, 1, 23, 59, 0, 0);
        var d5 = new Date(2017, 1, 1, 23, 59, 0, 2);
        var d6 = new Date(2020, 1, 1, 23, 59, 0, 0);
        var d7 = new Date(1990, 1, 1, 23, 59, 0, 0);
        var values = [17, 22, 88, 55, 12, 0, -12];
        var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
        it("should return a length of 6 after execution with the (existing) value 2017-1-1 on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            dict.removeByValue(d4);
            chai_1.expect(dict.length).to.equal(6);
        });
        it("should return a length of 4 after execution with the (existing) values 2016-1-1, 2020-1-1 and 2017-1-1 (passed as array) on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            dict.removeByValue([d3, d4, d6]);
            chai_1.expect(dict.length).to.equal(4);
        });
        it("should return a length of 4 after execution with the (existing) values 2016-1-1, 2020-1-1 and 2017-1-1 (passed as List) on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            var list = new List_1.default([d3, d4, d6]);
            dict.removeByValue(list);
            chai_1.expect(dict.length).to.equal(4);
        });
        it("should return a length of 0 after removal of all values on a dictionary of 7 entries", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            dict.removeByValue([d1, d2, d3, d4, d5, d6, d7]);
            chai_1.expect(dict.length).to.equal(0);
        });
        it("should return true after execution with the (existing) value 2020-1-1", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            var match = dict.removeByValue(d6);
            chai_1.expect(match).to.equal(true);
        });
        it("should return false after execution with the (not existing) vlaue 2021-1-1", function () {
            dict = new Dictionary_1.Dictionary(values, [d1, d2, d3, d4, d5, d6, d7]);
            var d8 = new Date(2021, 1, 1, 23, 59, 0, 0);
            var match = dict.removeByValue(d8);
            chai_1.expect(match).to.equal(false);
        });
        it("should not throw an error when executed on an empty dictionary", function () {
            dict = new Dictionary_1.Dictionary();
            var d8 = new Date(2021, 1, 1, 23, 59, 0, 0);
            chai_1.expect(function () {
                dict.removeByValue(d8);
            }).not.to.throw();
        });
    });
    describe("set method", function () {
        var dict;
        it("should add an element and increase the length of an empty dictionary by one", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            dict.set("test", 22);
            chai_1.expect(dict.length).to.equal(1);
        });
        it('should return 42 as value at element with the key "one"', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            dict.set("one", 42);
            dict.set("two", 43);
            dict.set("One", 42.1);
            var entry = dict.get("one");
            chai_1.expect(entry).to.equal(42);
        });
        it("should replace an existing item (same key) and not increase the length of 3 of an existing dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            dict.set("one", 42);
            dict.set("two", 43);
            dict.set("One", 42.1);
            dict.set("two", -2);
            chai_1.expect(dict.length).to.equal(3);
        });
        it("should not replace a Date value that differs just 1 ms from another as key instead of replacing it after definition of a override function for toString", function () {
            var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
            var d1 = new Date(2000, 1, 1, 1, 1, 1, 0);
            var d2 = new Date(2000, 1, 1, 1, 1, 1, 1);
            dict2.overrideHashFunction(Utils_1.Utils.properDateHashFunction);
            dict2.set(d1, 42);
            dict2.set(d2, 43);
            chai_1.expect(dict2.length).to.equal(2);
        });
    });
    describe("swapValues method", function () {
        var dict;
        it('should return 42 as value at element with the key "two" and 43 at "one after swapping', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number, ["one", "two", "three"], [42, 43, 42.1]);
            dict.swapValues("one", "two");
            var entry1 = dict.get("one");
            var entry2 = dict.get("two");
            chai_1.expect(entry1 === 43 && entry2 === 42).to.equal(true);
        });
        it("should throw an error when executed on an empty dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            chai_1.expect(function () {
                dict.swapValues("one", "two");
            }).to.throw();
        });
        it("should throw an error when executed on with one non-existing key dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number, ["one", "two", "three"], [42, 43, 42.1]);
            chai_1.expect(function () {
                dict.swapValues("one", "four");
            }).to.throw();
        });
        it("should throw an error when executed on with two non-existing keys dictionary", function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number, ["one", "two", "three"], [42, 43, 42.1]);
            chai_1.expect(function () {
                dict.swapValues("six", "four");
            }).to.throw();
        });
    });
    /************ */
});
//# sourceMappingURL=DictionaryTest.js.map