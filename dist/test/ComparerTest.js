"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparer_1 = require("../src/Comparer");
var chai_1 = require("chai");
require("mocha");
// This file is to test the Dictionary<K,V> class
describe("SORTER\n  ######\n", function () {
    describe("static:compareNumbers", function () {
        it("should return -1 if the first variable is -12 and the second variable is 0", function () {
            var result = Comparer_1.Comparer.compareNumbers(-12, 0);
            chai_1.expect(result).to.equal(-1);
        });
        it("should return 0 if the first variable is 5.1111 and the second variable is 5.1111", function () {
            var result = Comparer_1.Comparer.compareNumbers(5.1111, 5.1111);
            chai_1.expect(result).to.equal(0);
        });
        it("should return 1 if the first variable is 22 and the second variable is 7.2", function () {
            var result = Comparer_1.Comparer.compareNumbers(22, 7.2);
            chai_1.expect(result).to.equal(1);
        });
    });
    describe("static:compareDates", function () {
        it("should return -1 if the first variable is 2012-11-29 and the second variable is 2012-11-30", function () {
            var result = Comparer_1.Comparer.compareDates(new Date(2012, 11, 29), new Date(2012, 11, 30));
            chai_1.expect(result).to.equal(-1);
        });
        it("should return 0 if both variables are 2017-07-07 22:10:22,555", function () {
            var result = Comparer_1.Comparer.compareDates(new Date(2017, 7, 7, 22, 10, 22, 555), new Date(2017, 7, 7, 22, 10, 22, 555));
            chai_1.expect(result).to.equal(0);
        });
        it("should return 1 if the first variable is 2112-11-29 and the second variable is 2012-11-30", function () {
            var result = Comparer_1.Comparer.compareDates(new Date(2112, 11, 29), new Date(2012, 11, 30));
            chai_1.expect(result).to.equal(1);
        });
    });
    describe("static:compareBooleans", function () {
        it("should return -1 if the first variable is false and the second variable is true", function () {
            var result = Comparer_1.Comparer.compareBooleans(false, true);
            chai_1.expect(result).to.equal(-1);
        });
        it("should return 0 if the first variable is false and the second variable is false", function () {
            var result = Comparer_1.Comparer.compareBooleans(false, false);
            chai_1.expect(result).to.equal(0);
        });
        it("should return 0 if the first variable is true and the second variable is true", function () {
            var result = Comparer_1.Comparer.compareBooleans(true, true);
            chai_1.expect(result).to.equal(0);
        });
        it("should return 1 if the first variable is true and the second variable is false", function () {
            var result = Comparer_1.Comparer.compareBooleans(true, false);
            chai_1.expect(result).to.equal(1);
        });
    });
    describe("static:compareStrings", function () {
        it('should return -1 if the first variable is "abc" and the second variable is "bcd"', function () {
            var result = Comparer_1.Comparer.compareStrings("abc", "bcd");
            chai_1.expect(result).to.equal(-1);
        });
        it('should return 0 if both variables are "xyz"', function () {
            var result = Comparer_1.Comparer.compareStrings("xyz", "xyz");
            chai_1.expect(result).to.equal(0);
        });
        it("should return 0 if both variables are empty", function () {
            var result = Comparer_1.Comparer.compareStrings("", "");
            chai_1.expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is "9" and the second variable is "8"', function () {
            var result = Comparer_1.Comparer.compareStrings("9", "8");
            chai_1.expect(result).to.equal(1);
        });
        it("should not throw an error if performed with a Date object and a boolean -> uses toString", function () {
            chai_1.expect(function () {
                var result = Comparer_1.Comparer.compareStrings(new Date(), true);
                result = undefined;
            }).not.to.throw();
        });
    });
});
//# sourceMappingURL=ComparerTest.js.map