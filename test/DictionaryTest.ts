import {Dictionary} from '../src/Dictionary';
import List from '../src/List';
//import {IteratorItem} from '../src/IteratorItem';
import { Utils } from './utils/Utils';
import {Types} from './utils/Types';
import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';

// This file is to test the Dictionary<K,V> class

describe("DICTIONARY<K,V>\n  ###############\n",() => {
describe('constructors', () => {
    let dict: Dictionary<number, string>;
    it('should not throw an error if initialized without parameters', () => {
        expect(function(){ dict = new Dictionary<number,string>(); }).not.to.throw();
    });
    it('should return a length of 1 if initialized with one key and value', () => {
        dict = new Dictionary<number,string>(42, "fortytwo");
        let length: number = dict.length;
        expect(length).to.equal(1);
    });
    it('should return a length of 5 if initialized with an array of 5 keys and values', () => {
        let keys: number[] = [11,22,33,44,55];
        let values: string[] = ["11","22","33","44","55"];
        dict = new Dictionary<number,string>(keys,values);
        let length: number = dict.length;
        expect(length).to.equal(5);
    });
    it('should throw an error if initialized with an keys array of different length than the vales array', () => {
        let keys: number[] = [11,22,55];
        let values: string[] = ["11","22","33","44","55"];        
        expect(function(){ dict = new Dictionary<number,string>(keys, values); }).to.throw();
    });
    it('should return a lengt of 4 if initialized with 2 lists of 4 each 4 keys and values', () => {
        let keys = Utils.setupList(Types.number, [11,22,33,44]);
        let values = Utils.setupList(Types.string, ["11","22","33","44"]);
        dict = new Dictionary<number,string>(keys, values);
        let length: number = dict.length;
        expect(length).to.equal(4);
    });
    it('should return a length of 0 if initialized with two empty arrays as keys and values', () => {
        let keys: number[] = [];
        let values: string[] = [];
        dict = new Dictionary<number,string>(keys, values);
        let length: number = dict.length;
        expect(length).to.equal(0);
    });
});
/*

// Pending
describe('length property', () => {
    let dict: Dictionary<string,number>;

    it('should return 0 on an initialized (empty) list', () => {
        dict = Utils.setupList(Types.number);
        expect(list.length).to.equal(0);
    });
    it('should return 9 on a list with 9 elements', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
        expect(list.length).to.equal(9);
    });
    it('should return 10 after adding one element to a list of 9 elements', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
        list.add(1);
        expect(list.length).to.equal(10);
    });
    it('should return 8 after removing one element to a list of 9 elements', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
        list.removeAt(0);
        expect(list.length).to.equal(8);
    });
    it('should return 0 after execution of the clear() method', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);
        list.clear();
        expect(list.length).to.equal(0);
    });
    it('should return 0 after removing the last element of a list', () => {
        list = Utils.setupList(Types.number,17);
        list.removeAt(0);
        expect(list.length).to.equal(0);
    });

});
*/

/************ */
});