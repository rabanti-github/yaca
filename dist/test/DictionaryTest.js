"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("../src/Dictionary");
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
            it('should add an element and increase the counter by one', function () {
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
            /*
            it('should not throw an error when adding a number to a list of numbers', () => {
                expect(function() { let list: List<number> = Utils.setupList(Types.number); list.add(21); }).to.not.throw();
            });
            it('should not throw an error when adding a string to a list of string', () => {
                expect(function() { let list: List<string> = Utils.setupList(Types.string); list.add("test"); }).to.not.throw();
            });
            it('should not throw an error when adding an empty string to a list of string', () => {
                expect(function() { let list: List<string> = Utils.setupList(Types.string); list.add(""); }).to.not.throw();
            });
            it('should not throw an error when adding a boolean to a list of booleans', () => {
                expect(function() { let list: List<boolean> = Utils.setupList(Types.boolean); list.add(true); }).to.not.throw();
            });
            it('should not throw an error when adding a date to a list of dates', () => {
                expect(function() { let list: List<Date> = Utils.setupList(Types.date); list.add(new Date()); }).to.not.throw();
            });
            */
        });
    });
    /************ */
});
//# sourceMappingURL=DictionaryTest.js.map