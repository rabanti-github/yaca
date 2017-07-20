import {Dictionary} from '../src/Dictionary';
import List from '../src/List';
//import {IteratorItem} from '../src/IteratorItem';
import { Utils } from './utils/Utils';
import {Types} from './utils/Types';
import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';

// Test of the testing utils (TESTCEPTION!)

describe("test/Utils\n  ##########\n",() => {
describe('static:compareNumbers', () => {
    it('should return -1 if the first variable is -12 and the second variable is 0', () => {
        let result: number = Utils.compareNumbers(-12, 0);
        expect(result).to.equal(-1);
    });
    it('should return 0 if the first variable is 5.1111 and the second variable is 5.1111', () => {
        let result: number = Utils.compareNumbers(5.1111, 5.1111);
        expect(result).to.equal(0);
    });
    it('should return 1 if the first variable is 22 and the second variable is 7.2', () => {
        let result: number = Utils.compareNumbers(22, 7.2);
        expect(result).to.equal(1);
    });

});
describe('static:compareDates', () => {
    it('should return -1 if the first variable is 2012-11-29 and the second variable is 2012-11-30', () => {
        let result: number = Utils.compareDates(new Date(2012,11,29), new Date(2012,11,30));
        expect(result).to.equal(-1);
    });
    it('should return 0 if both variables are 2017-07-07 22:10:22,555', () => {
        let result: number = Utils.compareDates(new Date(2017,7,7,22,10,22,555), new Date(2017,7,7,22,10,22,555));
        expect(result).to.equal(0);
    });
    it('should return 1 if the first variable is 2112-11-29 and the second variable is 2012-11-30', () => {
        let result: number = Utils.compareDates(new Date(2112,11,29), new Date(2012,11,30));
        expect(result).to.equal(1);
    });

});
describe('static:compareBooleans', () => {
    it('should return -1 if the first variable is false and the second variable is true', () => {
        let result: number = Utils.compareBooleans(false, true);
        expect(result).to.equal(-1);
    });
    it('should return 0 if the first variable is false and the second variable is false', () => {
        let result: number = Utils.compareBooleans(false, false);
        expect(result).to.equal(0);
    });
    it('should return 0 if the first variable is true and the second variable is true', () => {
        let result: number = Utils.compareBooleans(true, true);
        expect(result).to.equal(0);
    });
    it('should return 1 if the first variable is true and the second variable is false', () => {
        let result: number = Utils.compareBooleans(true, false);
        expect(result).to.equal(1);
    });

});

describe('static:setupList', () => {
    it('should return an empty instance of a List<string> if executed with the type string', () => {
        let list: List<string> = Utils.setupList(Types.string);
        let match: boolean = false;
        if (list instanceof List && list.length == 0){ match = true; }
        expect(match).to.equal(true);
    });
    it('should return an instance of a List<boolean> with the length 1 if executed with the type boolean and an initial values', () => {
        let list: List<boolean> = Utils.setupList(Types.boolean, true);
        let match: boolean = false;
        if (list instanceof List && list.length == 1){ match = true; }
        expect(match).to.equal(true);
    });
    it('should return an instance of a List<number> with the length 4 if executed with the type number and an initial array of 4 values', () => {
        let list: List<number> = Utils.setupList(Types.number, [1,2,3,4]);
        let match: boolean = false;
        if (list instanceof List && list.length == 4){ match = true; }
        expect(match).to.equal(true);
    });
});

describe('static:setupDictionary', () => {
    it('should return an empty instance of a Dictionary<number,string> if executed with the type number->string', () => {
        let dict: Dictionary<number, string> = Utils.setupDictionary(Types.number, Types.string);
        let match: boolean = false;
        if (dict instanceof Dictionary && dict.length == 0){ match = true; }
        expect(match).to.equal(true);
    });
    it('should return an instance of a Dictionary<date,number> with the length 1 if executed with the type Date->number and an initial key-value pair', () => {
        let dict: Dictionary<Date, number> = Utils.setupDictionary(Types.date, Types.number, new Date(), 22);
        let match: boolean = false;
        if (dict instanceof Dictionary && dict.length == 1){ match = true; }
        expect(match).to.equal(true);
    });
    it('should return an instance of a Dictionary<number,string> with the length 1 if executed with the type number->string and a key-value pair array with a length of 2', () => {
        let dict: Dictionary<number, string> = Utils.setupDictionary(Types.number, Types.string, [22,44], ["a","b"]);
        let match: boolean = false;
        if (dict instanceof Dictionary && dict.length == 2){ match = true; }
        expect(match).to.equal(true);
    });
});


/************ */
});