"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestClass_1 = require("./utils/TestClass");
var chai_1 = require("chai");
require("mocha");
// Test of the TestClass
describe("TestClass\n  #########\n", function () {
    describe("compareTo function", function () {
        it("should return -1 if object A has a value2 of 2 and object B a value2 of 3", function () {
            var objA = new TestClass_1.TestClass();
            var objB = new TestClass_1.TestClass();
            objA.value2 = 2;
            objB.value2 = 3;
            chai_1.expect(objA.compareTo(objB)).to.equal(-1);
        });
        it("should return 0 if object A has a value2 of 22 and object B a value2 of 22", function () {
            var objA = new TestClass_1.TestClass();
            var objB = new TestClass_1.TestClass();
            objA.value2 = 22;
            objB.value2 = 22;
            chai_1.expect(objA.compareTo(objB)).to.equal(0);
        });
        it("should return 1 if object A has a value2 of 25.8 and object B a value2 of 3", function () {
            var objA = new TestClass_1.TestClass();
            var objB = new TestClass_1.TestClass();
            objA.value2 = 25.8;
            objB.value2 = 3;
            chai_1.expect(objA.compareTo(objB)).to.equal(1);
        });
    });
    /************ */
});
//# sourceMappingURL=TestClassTest.js.map