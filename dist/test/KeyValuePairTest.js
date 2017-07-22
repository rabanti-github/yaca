"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValuePair_1 = require("../src/KeyValuePair");
var chai_1 = require("chai");
require("mocha");
// Test of the KeyValuePair Class
describe("KeyValuePair\n  ############\n", function () {
    describe('Constructor', function () {
        it('should not throw an error when creating an object wih K:string and V:number with initial parameters', function () {
            chai_1.expect(function () { var test = new KeyValuePair_1.KeyValuePair("xyz", 42); }).to.not.throw();
        });
        it('should throw an error when creating an object wih K:string and V:number with undefined as value', function () {
            chai_1.expect(function () { var test = new KeyValuePair_1.KeyValuePair("xyz", undefined); }).to.throw();
        });
        it('should throw an error when creating an object wih K:string and V:number with undefined as key', function () {
            chai_1.expect(function () { var test = new KeyValuePair_1.KeyValuePair(undefined, 42); }).to.throw();
        });
    });
    describe('getter', function () {
        it('should return 42 as key if the the object was initialized with this key', function () {
            var test = new KeyValuePair_1.KeyValuePair(42, "abc");
            chai_1.expect(test.key).to.equal(42);
        });
        it('should return "abc" as value if the the object was initialized with this value', function () {
            var test = new KeyValuePair_1.KeyValuePair(42, "abc");
            chai_1.expect(test.value).to.equal("abc");
        });
    });
    /************ */
});
//# sourceMappingURL=KeyValuePairTest.js.map