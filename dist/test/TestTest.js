"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("../src/Dictionary");
var List_1 = require("../src/List");
//import {IteratorItem} from '../src/IteratorItem';
var Utils_1 = require("./utils/Utils");
var Types_1 = require("./utils/Types");
var chai_1 = require("chai");
require("mocha");
// Test of the testing utils (TESTCEPTION!)
describe("test/Utils\n  ##########\n", function () {
    describe('static:compareNumbers', function () {
        it('should return -1 if the first variable is -12 and the second variable is 0', function () {
            var result = Utils_1.Utils.compareNumbers(-12, 0);
            chai_1.expect(result).to.equal(-1);
        });
        it('should return 0 if the first variable is 5.1111 and the second variable is 5.1111', function () {
            var result = Utils_1.Utils.compareNumbers(5.1111, 5.1111);
            chai_1.expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is 22 and the second variable is 7.2', function () {
            var result = Utils_1.Utils.compareNumbers(22, 7.2);
            chai_1.expect(result).to.equal(1);
        });
    });
    describe('static:compareDates', function () {
        it('should return -1 if the first variable is 2012-11-29 and the second variable is 2012-11-30', function () {
            var result = Utils_1.Utils.compareDates(new Date(2012, 11, 29), new Date(2012, 11, 30));
            chai_1.expect(result).to.equal(-1);
        });
        it('should return 0 if both variables are 2017-07-07 22:10:22,555', function () {
            var result = Utils_1.Utils.compareDates(new Date(2017, 7, 7, 22, 10, 22, 555), new Date(2017, 7, 7, 22, 10, 22, 555));
            chai_1.expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is 2112-11-29 and the second variable is 2012-11-30', function () {
            var result = Utils_1.Utils.compareDates(new Date(2112, 11, 29), new Date(2012, 11, 30));
            chai_1.expect(result).to.equal(1);
        });
    });
    describe('static:compareBooleans', function () {
        it('should return -1 if the first variable is false and the second variable is true', function () {
            var result = Utils_1.Utils.compareBooleans(false, true);
            chai_1.expect(result).to.equal(-1);
        });
        it('should return 0 if the first variable is false and the second variable is false', function () {
            var result = Utils_1.Utils.compareBooleans(false, false);
            chai_1.expect(result).to.equal(0);
        });
        it('should return 0 if the first variable is true and the second variable is true', function () {
            var result = Utils_1.Utils.compareBooleans(true, true);
            chai_1.expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is true and the second variable is false', function () {
            var result = Utils_1.Utils.compareBooleans(true, false);
            chai_1.expect(result).to.equal(1);
        });
    });
    describe('static:setupList', function () {
        it('should return an empty instance of a List<string> if executed with the type string', function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.string);
            var match = false;
            if (list instanceof List_1.default && list.length == 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return an instance of a List<boolean> with the length 1 if executed with the type boolean and an initial values', function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.boolean, true);
            var match = false;
            if (list instanceof List_1.default && list.length == 1) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return an instance of a List<number> with the length 4 if executed with the type number and an initial array of 4 values', function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.number, [1, 2, 3, 4]);
            var match = false;
            if (list instanceof List_1.default && list.length == 4) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    describe('static:setupDictionary', function () {
        it('should return an empty instance of a Dictionary<number,string> if executed with the type number->string', function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length == 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return an instance of a Dictionary<date,number> with the length 1 if executed with the type Date->number and an initial key-value pair', function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number, new Date(), 22);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length == 1) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it('should return an instance of a Dictionary<number,string> with the length 1 if executed with the type number->string and a key-value pair array with a length of 2', function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [22, 44], ["a", "b"]);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length == 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    /************ */
});
//# sourceMappingURL=TestTest.js.map