import { IteratorItem } from '../src/IteratorItem';
import { expect } from 'chai';
import 'mocha';
// Test of the IteratorItem Class
describe("IteratorItem\n  ############\n", () => {
    describe('Constructor', () => {
        let test;
        it('should not throw an error when creating an object with T:string with an initial parameter', () => {
            expect(function () { test = new IteratorItem("xyz"); }).to.not.throw();
        });
        it('should not throw an error when creating an object with T:string with an initial parameter of a value and a boolean (finished)', () => {
            expect(function () { test = new IteratorItem("xyz", true); }).to.not.throw();
        });
        it('should not throw an error when creating an object with T:string with an undefined initial parameter', () => {
            expect(function () { test = new IteratorItem(undefined); }).not.to.throw();
        });
        it('should throw an error when creating an object with T:string with an initial parameter of a value and undefined (finished)', () => {
            expect(function () { test = new IteratorItem("xyz", undefined); }).to.not.throw();
        });
    });
    describe('getter', () => {
        it('should return "xyz" as value if the the object was initialized with this value', () => {
            let test = new IteratorItem("xyz");
            expect(test.value).to.equal("xyz");
        });
        it('should return true as parameter isLastEntry if the the object was initialized with this value', () => {
            let test = new IteratorItem("xyz", true);
            expect(test.done).to.equal(true);
        });
    });
    /************ */
});
//# sourceMappingURL=IteratorItemTest.js.map