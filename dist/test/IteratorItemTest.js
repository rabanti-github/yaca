"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IteratorItem_1 = require("../src/IteratorItem");
var chai_1 = require("chai");
require("mocha");
// Test of the IteratorItem Class
describe("IteratorItem\n  ############\n", function () {
    describe("Constructor", function () {
        var test;
        it("should not throw an error when creating an object with T:string with an initial parameter", function () {
            chai_1.expect(function () {
                test = new IteratorItem_1.IteratorItem("xyz");
            }).to.not.throw();
        });
        it("should not throw an error when creating an object with T:string with an initial parameter of a value and a boolean (finished)", function () {
            chai_1.expect(function () {
                test = new IteratorItem_1.IteratorItem("xyz", true);
            }).to.not.throw();
        });
        it("should not throw an error when creating an object with T:string with an undefined initial parameter", function () {
            chai_1.expect(function () {
                test = new IteratorItem_1.IteratorItem(undefined);
            }).not.to.throw();
        });
        it("should throw an error when creating an object with T:string with an initial parameter of a value and undefined (finished)", function () {
            chai_1.expect(function () {
                test = new IteratorItem_1.IteratorItem("xyz", undefined);
            }).to.not.throw();
        });
    });
    describe("getter", function () {
        it('should return "xyz" as value if the the object was initialized with this value', function () {
            var test = new IteratorItem_1.IteratorItem("xyz");
            chai_1.expect(test.value).to.equal("xyz");
        });
        it("should return true as parameter isLastEntry if the the object was initialized with this value", function () {
            var test = new IteratorItem_1.IteratorItem("xyz", true);
            chai_1.expect(test.isLastEntry).to.equal(true);
        });
    });
    /************ */
});
//# sourceMappingURL=IteratorItemTest.js.map