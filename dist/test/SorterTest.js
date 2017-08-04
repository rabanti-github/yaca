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
    });
    /************ */
});
//# sourceMappingURL=SorterTest.js.map