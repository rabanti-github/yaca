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
    /*
    
    // Pending
    describe('length property', () => {
        let dict: Dictionary<string,number>;
    
        it('should return 0 on an initialized (empty) list', () => {
            dict = Utils.setupList(Types.number);
            expect(list.length).to.equal(0);
        });
        it('should return 9 on a list with 9 elements', () => {
            list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
            expect(list.length).to.equal(9);
        });
        it('should return 10 after adding one element to a list of 9 elements', () => {
            list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
            list.add(1);
            expect(list.length).to.equal(10);
        });
        it('should return 8 after removing one element to a list of 9 elements', () => {
            list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
            list.removeAt(0);
            expect(list.length).to.equal(8);
        });
        it('should return 0 after execution of the clear() method', () => {
            list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
            list.clear();
            expect(list.length).to.equal(0);
        });
        it('should return 0 after removing the last element of a list', () => {
            list = Utils.setupList(Types.number,17);
            list.removeAt(0);
            expect(list.length).to.equal(0);
        });
    
    });
    */
    /************ */
});
//# sourceMappingURL=DictionaryTest.js.map