import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';
// Test of the TestClass
describe("TestClass\n  #########\n", () => {
    describe('compareTo function', () => {
        it('should return -1 if object A has a value2 of 2 and object B a value2 of 3', () => {
            let objA = new TestClass();
            let objB = new TestClass();
            objA.value2 = 2;
            objB.value2 = 3;
            expect(objA.compareTo(objB)).to.equal(-1);
        });
        it('should return 0 if object A has a value2 of 22 and object B a value2 of 22', () => {
            let objA = new TestClass();
            let objB = new TestClass();
            objA.value2 = 22;
            objB.value2 = 22;
            expect(objA.compareTo(objB)).to.equal(0);
        });
        it('should return 1 if object A has a value2 of 25.8 and object B a value2 of 3', () => {
            let objA = new TestClass();
            let objB = new TestClass();
            objA.value2 = 25.8;
            objB.value2 = 3;
            expect(objA.compareTo(objB)).to.equal(1);
        });
    });
    /************ */
});
//# sourceMappingURL=TestClassTest.js.map