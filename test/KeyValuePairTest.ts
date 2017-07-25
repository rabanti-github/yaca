import {KeyValuePair} from '../src/KeyValuePair';
import { Utils } from './utils/Utils';
import { expect } from 'chai';
import 'mocha';

// Test of the KeyValuePair Class

describe("KeyValuePair\n  ############\n",() => {
describe('Constructor', () => {

    it('should not throw an error when creating an object with K:string and V:number with initial parameters', () => {
        expect(function() { let test: KeyValuePair<string, number> = new KeyValuePair<string, number>("xyz",42); }).to.not.throw();
    });
    it('should throw an error when creating an object with K:string and V:number with undefined as value', () => {
        expect(function() { let test: KeyValuePair<string, number> = new KeyValuePair<string, number>("xyz",undefined); }).to.throw();
    });
    it('should throw an error when creating an object with K:string and V:number with undefined as key', () => {
        expect(function() { let test: KeyValuePair<string, number> = new KeyValuePair<string, number>(undefined,42); }).to.throw();
    });    

});
describe('getter', () => {
    it('should return 42 as key if the the object was initialized with this key', () => {
        let test: KeyValuePair<number, string> = new KeyValuePair<number, string>(42,"abc");
        expect(test.key).to.equal(42);
    });
    it('should return "abc" as value if the the object was initialized with this value', () => {
        let test: KeyValuePair<number, string> = new KeyValuePair<number, string>(42,"abc");
        expect(test.value).to.equal("abc");
    });
});


/************ */
});