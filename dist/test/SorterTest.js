import { Sorter } from '../src/Sorter';
import { KeyValuePair } from '../src/KeyValuePair';
import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';
// Test of the KeyValuePair Class
describe("Sorter\n  ######n", () => {
    describe('Constructor', () => {
        let dummy;
        it('should not throw an error when initialized with a number as sample', () => {
            expect(function () { let test = new Sorter(22); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a undefined as sample', () => {
            expect(function () { let test = new Sorter(undefined); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a empty string as sample', () => {
            expect(function () { let test = new Sorter(""); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with false as sample', () => {
            expect(function () { let test = new Sorter(false); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a KeyValuePair without the identification as TupleSort', () => {
            let item = new KeyValuePair("22", new Date());
            expect(function () { let test = new Sorter(item); dummy = test.isCommonType; }).to.not.throw();
        });
        it('should not throw an error when initialized with a KeyValuePair with the identification as TupleSort', () => {
            let item = new KeyValuePair("22", new Date());
            expect(function () { let test = new Sorter(item, true); dummy = test.isCommonType; }).to.not.throw();
        });
    });
    describe('getter', () => {
        it('should return true on property isBasicType on a numeric sorter', () => {
            let test = new Sorter(22);
            expect(test.isBasicType).to.equal(true);
        });
        it('should return false on property isBasicType on a object sorter', () => {
            let test = new Sorter(new Object());
            expect(test.isBasicType).to.equal(false);
        });
        it('should return true on property isCommonType on a Date sorter', () => {
            let test = new Sorter(new Date());
            expect(test.isCommonType).to.equal(true);
        });
        it('should return true on property hasCompareToImplemented on a sorter for the prepared TestClass', () => {
            let test = new Sorter(TestClass.createRandomObject());
            expect(test.hasCompareToImplemented).to.equal(true);
        });
        it('should return false on property hasCompareToImplemented on a class with a property compareTo which is not a function', () => {
            let test = new Sorter(new Dummy1());
            expect(test.hasCompareToImplemented).to.equal(false);
        });
        it('should return false on property hasCompareToImplemented on a class with a function compareTo which does not return a number', () => {
            let test = new Sorter(new Dummy2());
            expect(test.hasCompareToImplemented).to.equal(false);
        });
        it('should return true on property isTupleSort if initialized as TupleSort', () => {
            let item = new KeyValuePair("22", new Date());
            let test = new Sorter(item, true);
            expect(test.isTupleSort).to.equal(true);
        });
        it('should return false on property isTupleSort if initialized with a KeyValuePair but not set to TupleSort', () => {
            let item = new KeyValuePair("22", new Date());
            let test = new Sorter(item);
            expect(test.isTupleSort).to.equal(false);
        });
    });
    /************ */
});
/**
 * Dummy class for sorter testing
 */
class Dummy1 {
    constructor() {
        this.compareTo = 0;
    }
}
/**
 * Dummy class for sorter testing
 */
class Dummy2 {
    compareTo(value) {
        return value;
    }
}
//# sourceMappingURL=SorterTest.js.map