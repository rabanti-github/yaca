import { Comparer } from '../src/Comparer';
import { expect } from 'chai';
import 'mocha';
// This file is to test the Dictionary<K,V> class
describe("SORTER\n  ######\n", () => {
    describe('static:compareNumbers', () => {
        it('should return -1 if the first variable is -12 and the second variable is 0', () => {
            let result = Comparer.compareNumbers(-12, 0);
            expect(result).to.equal(-1);
        });
        it('should return 0 if the first variable is 5.1111 and the second variable is 5.1111', () => {
            let result = Comparer.compareNumbers(5.1111, 5.1111);
            expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is 22 and the second variable is 7.2', () => {
            let result = Comparer.compareNumbers(22, 7.2);
            expect(result).to.equal(1);
        });
    });
    describe('static:compareDates', () => {
        it('should return -1 if the first variable is 2012-11-29 and the second variable is 2012-11-30', () => {
            let result = Comparer.compareDates(new Date(2012, 11, 29), new Date(2012, 11, 30));
            expect(result).to.equal(-1);
        });
        it('should return 0 if both variables are 2017-07-07 22:10:22,555', () => {
            let result = Comparer.compareDates(new Date(2017, 7, 7, 22, 10, 22, 555), new Date(2017, 7, 7, 22, 10, 22, 555));
            expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is 2112-11-29 and the second variable is 2012-11-30', () => {
            let result = Comparer.compareDates(new Date(2112, 11, 29), new Date(2012, 11, 30));
            expect(result).to.equal(1);
        });
    });
    describe('static:compareBooleans', () => {
        it('should return -1 if the first variable is false and the second variable is true', () => {
            let result = Comparer.compareBooleans(false, true);
            expect(result).to.equal(-1);
        });
        it('should return 0 if the first variable is false and the second variable is false', () => {
            let result = Comparer.compareBooleans(false, false);
            expect(result).to.equal(0);
        });
        it('should return 0 if the first variable is true and the second variable is true', () => {
            let result = Comparer.compareBooleans(true, true);
            expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is true and the second variable is false', () => {
            let result = Comparer.compareBooleans(true, false);
            expect(result).to.equal(1);
        });
    });
    describe('static:compareStrings', () => {
        it('should return -1 if the first variable is "abc" and the second variable is "bcd"', () => {
            let result = Comparer.compareStrings("abc", "bcd");
            expect(result).to.equal(-1);
        });
        it('should return 0 if both variables are "xyz"', () => {
            let result = Comparer.compareStrings("xyz", "xyz");
            expect(result).to.equal(0);
        });
        it('should return 0 if both variables are empty', () => {
            let result = Comparer.compareStrings("", "");
            expect(result).to.equal(0);
        });
        it('should return 1 if the first variable is "9" and the second variable is "8"', () => {
            let result = Comparer.compareStrings("9", "8");
            expect(result).to.equal(1);
        });
        it('should not throw an error if performed with a Date object and a boolean -> uses toString', () => {
            expect(function () {
                let result = Comparer.compareStrings(new Date(), true);
                result = undefined;
            }).not.to.throw();
        });
    });
});
//# sourceMappingURL=ComparerTest.js.map