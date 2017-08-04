import {Sorter} from '../src/Sorter';
import { Utils } from './utils/Utils';
import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';

// Test of the KeyValuePair Class

describe("Sorter\n  ######n",() => {
describe('Constructor', () => {

    it('should not throw an error when initialized with a number as sample', () => {
        expect(function() { let test: Sorter<number> = new Sorter(22); }).to.not.throw();
    });
        it('should not throw an error when initialized with a undefined as sample', () => {
        expect(function() { let test: Sorter<number> = new Sorter(undefined); }).to.not.throw();
    });
        it('should not throw an error when initialized with a empty string as sample', () => {
        expect(function() { let test: Sorter<string> = new Sorter(""); }).to.not.throw();
    });
        it('should not throw an error when initialized with false as sample', () => {
        expect(function() { let test: Sorter<boolean> = new Sorter(false); }).to.not.throw();
    });      

});

describe('getter', () => {
    it('should return true on property isBasicType on a numeric sorter', () => {
        let test: Sorter<number> = new Sorter(22);
        expect(test.isBasicType).to.equal(true);
    });
    it('should return false on property isBasicType on a object sorter', () => {
        let test: Sorter<Object> = new Sorter(new Object());
        expect(test.isBasicType).to.equal(false);
    });
    it('should return true on property isCommonType on a Date sorter', () => {
        let test: Sorter<Date> = new Sorter(new Date());
        expect(test.isCommonType).to.equal(true);
    });
    it('should return true on property hasCompareToImplemented on a sorter for the prepared TestClass', () => {
        let test: Sorter<TestClass> = new Sorter(TestClass.createRandomObject());
        expect(test.hasCompareToImplemented).to.equal(true);
    });
});


/************ */
});