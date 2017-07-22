"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("../src/Dictionary");
var List_1 = require("../src/List");
//import {IteratorItem} from '../src/IteratorItem';
var Utils_1 = require("./utils/Utils");
var Types_1 = require("./utils/Types");
var chai_1 = require("chai");
require("mocha");
// This file is to test the Dictionary<K,V> class
describe("DICTIONARY<K,V>\n  ###############\n", function () {
    describe('constructors', function () {
        var dict;
        it('should not throw an error if initialized without parameters', function () {
            chai_1.expect(function () { dict = new Dictionary_1.Dictionary(); }).not.to.throw();
        });
        it('should return a length of 1 if initialized with one key and value', function () {
            dict = new Dictionary_1.Dictionary(42, "fortytwo");
            var length = dict.length;
            chai_1.expect(length).to.equal(1);
        });
        it('should return a length of 5 if initialized with an array of 5 keys and values', function () {
            var keys = [11, 22, 33, 44, 55];
            var values = ["11", "22", "33", "44", "55"];
            dict = new Dictionary_1.Dictionary(keys, values);
            var length = dict.length;
            chai_1.expect(length).to.equal(5);
        });
        it('should throw an error if initialized with an keys array of different length than the vales array', function () {
            var keys = [11, 22, 55];
            var values = ["11", "22", "33", "44", "55"];
            chai_1.expect(function () { dict = new Dictionary_1.Dictionary(keys, values); }).to.throw();
        });
        it('should return a lengt of 4 if initialized with 2 lists of 4 each 4 keys and values', function () {
            var keys = Utils_1.Utils.setupList(Types_1.Types.number, [11, 22, 33, 44]);
            var values = Utils_1.Utils.setupList(Types_1.Types.string, ["11", "22", "33", "44"]);
            dict = new Dictionary_1.Dictionary(keys, values);
            var length = dict.length;
            chai_1.expect(length).to.equal(4);
        });
        it('should return a length of 0 if initialized with two empty arrays as keys and values', function () {
            var keys = [];
            var values = [];
            dict = new Dictionary_1.Dictionary(keys, values);
            var length = dict.length;
            chai_1.expect(length).to.equal(0);
        });
    });
    describe('length property', function () {
        var dict;
        it('should return 0 on an initialized (empty) dictionary', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            chai_1.expect(dict.length).to.equal(0);
        });
        it('should return 9 on a dictionary with 9 elements', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            chai_1.expect(dict.length).to.equal(9);
        });
        it('should return 10 after adding one element to a dictionary of 9 elements', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.add(1, "y");
            chai_1.expect(dict.length).to.equal(10);
        });
        it('should return 8 after removing one element from a dictionary of 9 elements', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.remove(22.00001);
            chai_1.expect(dict.length).to.equal(8);
        });
        it('should return 9 after removing one element from a dictionary of 9 elements wit an non-existing key', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.remove(885);
            chai_1.expect(dict.length).to.equal(9);
        });
        it('should return 0 after execution of the clear() method', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [17, 18, 88, 22, 12, 0, -12, 11, 22.00001], ["x", "x", "x", "x", "x", "x", "x", "x", "x"]);
            dict.clear();
            chai_1.expect(dict.length).to.equal(0);
        });
        it('should return 0 after removing the last element of a dictionary', function () {
            dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, 17, "x");
            dict.remove(17);
            chai_1.expect(dict.length).to.equal(0);
        });
        describe('add method', function () {
            var dict;
            it('should add an element and increase the length of the dictionary by one', function () {
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
            it('should replace an existing item (same key) and not increase the length of 3 of an existing dictionary', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.add("one", 42);
                dict.add("two", 43);
                dict.add("One", 42.1);
                dict.add("two", -2);
                chai_1.expect(dict.length).to.equal(3);
            });
            it('should replace a Date value that differs just 1 ms from another as key instead of adding a new one (failing of toString)', function () {
                var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
                var d1 = new Date(2000, 1, 1, 1, 1, 1, 0);
                var d2 = new Date(2000, 1, 1, 1, 1, 1, 1);
                dict2.add(d1, 42);
                dict2.add(d2, 43);
                chai_1.expect(dict2.length).to.equal(1);
            });
            it('should not replace a Date value that differs just 1 ms from another as key instead of replacing it after definition of a override function for toString', function () {
                var dict2 = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
                var d1 = new Date(2000, 1, 1, 1, 1, 1, 0);
                var d2 = new Date(2000, 1, 1, 1, 1, 1, 1);
                dict2.overrideHashFunction(Utils_1.Utils.properDateHashFunction);
                dict2.add(d1, 42);
                dict2.add(d2, 43);
                chai_1.expect(dict2.length).to.equal(2);
            });
            it('should throw an error when adding undefined as key to a dictionary', function () {
                chai_1.expect(function () { dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number); dict.add(undefined, 22); }).to.throw();
            });
            it('should throw an error when adding undefined as value to a dictionary', function () {
                chai_1.expect(function () { dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number); dict.add("undefined", undefined); }).to.throw();
            });
            it('should throw an error when adding undefined as key and value to a dictionary', function () {
                chai_1.expect(function () { dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number); dict.add(undefined, undefined); }).to.throw();
            });
            it('should not throw an error when adding the string "undefined" as key to a dictionary', function () {
                chai_1.expect(function () { dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number); dict.add("undefined", 22); }).not.to.throw();
            });
        });
        describe('addRange method -> calls add()', function () {
            var keys = ["one", "two", "three", "four", "five"];
            var values = [1, 2, 3, 4, 5];
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
            it('should add five elements from two arrays (keys & values) to an empty dictionary and return five as length of the list', function () {
                dict.addRange(keys, values);
                chai_1.expect(dict.length).to.equal(5);
            });
            it('should add five elements from two Lists (keys & values) to an empty dictionary and return five as length of the list', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                var kL = new List_1.default(keys);
                var vL = new List_1.default(values);
                dict.addRange(kL, vL);
                chai_1.expect(dict.length).to.equal(5);
            });
            it('should add five elements from a dictionary to an empty dictionary and return five as length of the dictionary', function () {
                var newDict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                newDict.addRange(dict);
                chai_1.expect(newDict.length).to.equal(5);
            });
            it('should return the value 4 at the key "four" after adding a range of 5 elements', function () {
                var item = dict.get("four");
                chai_1.expect(item).to.equal(4);
            });
            it('should  throw an error if the arrays of keys and values are different', function () {
                chai_1.expect(function () { dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number); dict.addRange(["1", "2", "3"], [22, 33, 44, 55]); }).to.throw();
            });
            it('should  throw an error if the lists of keys and values are different', function () {
                var kL = new List_1.default(["k1", "k2", "k3"]);
                var vL = new List_1.default([22, 55]);
                chai_1.expect(function () { dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number); dict.addRange(kL, vL); }).to.throw();
            });
        });
        describe('clear method', function () {
            var dict;
            it('should return a length of zero after execution on a dictionary with 4 elements', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.boolean, ["1", "2", "3", "4"], [true, false, true, true]);
                dict.clear();
                chai_1.expect(dict.length).to.equal(0);
            });
            it('should return a length of zero after execution on a dictionary with zero elements', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.boolean);
                dict.clear();
                chai_1.expect(dict.length).to.equal(0);
            });
        });
        describe('containsKey method', function () {
            var dict;
            it('should return false with the key 42 on an empty dictionary', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean);
                var match = dict.containsKey(42);
                chai_1.expect(match).to.equal(false);
            });
            it('should return false with the key 42 on a dictionary where the key does not exist', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42.000000001], [false, true, false, true]);
                var match = dict.containsKey(42);
                chai_1.expect(match).to.equal(false);
            });
            it('should return true with the key 42 on a dictionary where the key does exist', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
                var match = dict.containsKey(42);
                chai_1.expect(match).to.equal(true);
            });
        });
        describe('containsKeys method', function () {
            var dict;
            it('should return false with the keys 42 and 22 on an empty dictionary', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean);
                var match = dict.containsKeys([42, 22]);
                chai_1.expect(match).to.equal(false);
            });
            it('should return false with the key 42 and 22 on a dictionary where the keys does not exist', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42.000000001], [false, true, false, true]);
                var match = dict.containsKeys([42, 22]);
                chai_1.expect(match).to.equal(false);
            });
            it('should return true with the keys 42 and 22 on a dictionary where the key 42 does exist', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
                var match = dict.containsKeys([42, 22]);
                chai_1.expect(match).to.equal(true);
            });
            it('should return true with the keys 42 and 22 on a dictionary where the key 42 does exist (passed as list)', function () {
                var kL = new List_1.default([42, 22]);
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
                var match = dict.containsKeys(kL);
                chai_1.expect(match).to.equal(true);
            });
            it('should return false with the keys 42 and 22 on a dictionary where only the key 42 does exist but the all parameter is set to true', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], [false, true, false, true]);
                var match = dict.containsKeys([42, 22], true);
                chai_1.expect(match).to.equal(false);
            });
            it('should return true with the keys 42 and 22 on a dictionary where the keys 42 and 22 exist and the all parameter is set to true', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 22, 45, 42], [false, true, false, true]);
                var match = dict.containsKeys([42, 22], true);
                chai_1.expect(match).to.equal(true);
            });
        });
        describe('containsValue method', function () {
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
        describe('containsValues method', function () {
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
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], ["one", "two", "5", "six"]);
                var match = dict.containsValues(["two", "three"], true);
                chai_1.expect(match).to.equal(false);
            });
            it('should return true with the values "two" and "three" on a dictionary where both value does exist and the all parameter is set to true', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42], ["one", "two", "three", "four"]);
                var match = dict.containsValues(["two", "three"], true);
                chai_1.expect(match).to.equal(false);
            });
            it('should return true with the values "two" and "three" on a dictionary where both value does exist multiple times and the all parameter is set to true', function () {
                dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, [41, 43, 45, 42, 55, 1], ["one", "two", "three", "four", "three", "two"]);
                var match = dict.containsValues(["two", "three"], true);
                chai_1.expect(match).to.equal(false);
            });
        });
    });
    /************ */
});
//# sourceMappingURL=DictionaryTest.js.map