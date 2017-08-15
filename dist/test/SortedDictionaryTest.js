"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortedDictionary_1 = require("../src/SortedDictionary");
//import {KeyValuePair} from '../src/KeyValuePair';
//import List from '../src/List';
//import {IteratorItem} from '../src/IteratorItem';
//import { Utils } from './utils/Utils';
//import {Types} from './utils/Types';
//import { TestClass } from './utils/TestClass';
var chai_1 = require("chai");
require("mocha");
// This file is to test the SortedDictionary<K,V> class
describe("SORTEDDICTIONARY<K,V>\n  ###############\n", function () {
    describe('getByIndex method', function () {
        var dict;
        it('should return the value 42 when performed with index 1', function () {
            dict = new SortedDictionary_1.SortedDictionary(["a", "b", "c"], [11, 42, 86]); // Utils.setupDictionary(Types.string, Types.number, ["a","b","c"], [11,42,86]) as SortedDictionary<string, number>;
            var value = dict.getByIndex(1);
            chai_1.expect(value).to.equal(42);
        });
    });
    /************ */
});
//# sourceMappingURL=SortedDictionaryTest.js.map