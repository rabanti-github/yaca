"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter_1 = require("../src/Sorter");
var KeyValuePair_1 = require("../src/KeyValuePair");
var TestClass_1 = require("./utils/TestClass");
var chai_1 = require("chai");
require("mocha");
// Test of the KeyValuePair Class
describe("Sorter\n  ######n", function () {
    describe('Constructor', function () {
        var dummy;
        it('should not throw an error when initialized with a number as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(22); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a undefined as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(undefined); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a empty string as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(""); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with false as sample', function () {
            chai_1.expect(function () { var test = new Sorter_1.Sorter(false); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a KeyValuePair without the identification as TupleSort', function () {
            var item = new KeyValuePair_1.KeyValuePair("22", new Date());
            chai_1.expect(function () { var test = new Sorter_1.Sorter(item); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a KeyValuePair with the identification as TupleSort', function () {
            var item = new KeyValuePair_1.KeyValuePair("22", new Date());
            chai_1.expect(function () { var test = new Sorter_1.Sorter(item, true); dummy = test.isCommonType; }).to.not.throw();
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
        it('should return true on property isTupleSort if initialized as TupleSort', function () {
            var item = new KeyValuePair_1.KeyValuePair("22", new Date());
            var test = new Sorter_1.Sorter(item, true);
            chai_1.expect(test.isTupleSort).to.equal(true);
        });
        it('should return false on property isTupleSort if initialized with a KeyValuePair but not set to TupleSort', function () {
            var item = new KeyValuePair_1.KeyValuePair("22", new Date());
            var test = new Sorter_1.Sorter(item);
            chai_1.expect(test.isTupleSort).to.equal(false);
        });
    });
    /************ */
});
/**
 * Dummy class for sorter testing
 */
var Dummy1 = /** @class */ (function () {
    function Dummy1() {
        this.compareTo = 0;
    }
    return Dummy1;
}());
/**
 * Dummy class for sorter testing
 */
var Dummy2 = /** @class */ (function () {
    function Dummy2() {
    }
    Dummy2.prototype.compareTo = function (value) {
        return value;
    };
    return Dummy2;
}());
//# sourceMappingURL=SorterTest.js.map