"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter_1 = require("../src/Sorter");
var TestClass_1 = require("./utils/TestClass");
var chai_1 = require("chai");
require("mocha");
// Test of the KeyValuePair Class
describe("Sorter\n  ######n", function () {
    describe('Constructor', function () {
        it('should not throw an error when initialized with a number as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(22); }).to.not.throw();
        });
        it('should not throw an error when initialized with a undefined as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(undefined); }).to.not.throw();
        });
        it('should not throw an error when initialized with a empty string as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(""); }).to.not.throw();
        });
        it('should not throw an error when initialized with false as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(false); }).to.not.throw();
        });
    });
    describe('getter', function () {
        it('should return true on property isBasicType on a numeric sorter', function () {
            var test = new Sorter_1.Sorter(22);
            chai_1.expect(test.isBasicType).to.equal(true);
        });
        it('should return false on property isBasicType on a object sorter', function () {
            var test = new Sorter_1.Sorter(new Object());
            chai_1.expect(test.isBasicType).to.equal(false);
        });
        it('should return true on property isCommonType on a Date sorter', function () {
            var test = new Sorter_1.Sorter(new Date());
            chai_1.expect(test.isCommonType).to.equal(true);
        });
        it('should return true on property hasCompareToImplemented on a sorter for the prepared TestClass', function () {
            var test = new Sorter_1.Sorter(TestClass_1.TestClass.createRandomObject());
            chai_1.expect(test.hasCompareToImplemented).to.equal(true);
        });
        it('should return false on property hasCompareToImplemented on a class with a property compareTo which is not a function', function () {
            var test = new Sorter_1.Sorter(new Dummy1());
            chai_1.expect(test.hasCompareToImplemented).to.equal(false);
        });
        it('should return false on property hasCompareToImplemented on a class with a function compareTo which does not return a number', function () {
            var test = new Sorter_1.Sorter(new Dummy2());
            chai_1.expect(test.hasCompareToImplemented).to.equal(false);
        });
    });
    /************ */
});
/**
 * Dummy class for sorter testing
 */
var Dummy1 = (function () {
    function Dummy1() {
        this.compareTo = 0;
    }
    return Dummy1;
}());
/**
 * Dummy class for sorter testing
 */
var Dummy2 = (function () {
    function Dummy2() {
    }
    Dummy2.prototype.compareTo = function (value) {
        return value;
    };
    return Dummy2;
}());
//# sourceMappingURL=SorterTest.js.map