import {Dictionary} from '../src/Dictionary';
import {KeyValuePair} from '../src/KeyValuePair';
import { List } from '../src/List';
import {Comparer} from '../src/Comparer';
import {IteratorItem} from '../src/IteratorItem';
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
    it('should not throw an error if initialized with an override function for hashing of keys', () => {
        let dict2: Dictionary<Date, string>;
        expect(function(){ dict2 = new Dictionary<Date,string>(Utils.properDateHashFunction); }).not.to.throw();
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
    it('should return a length of 5 if initialized with a dictionary of 5 keys and values', () => {
        let initDict: Dictionary<number,string> = new Dictionary<number, string>([11,22,33,44,55], ["11","22","33","44","55"]);
        dict = new Dictionary<number,string>(initDict);
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


describe('length property', () => {
    let dict: Dictionary<number,string>;

    it('should return 0 on an initialized (empty) dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.string);
        expect(dict.length).to.equal(0);
    });
    it('should return 9 on a dictionary with 9 elements', () => {
        dict = Utils.setupDictionary(Types.number, Types.string , [17,18,88,22,12,0,-12,11,22.00001], ["x","x","x","x","x","x","x","x","x"]);
        expect(dict.length).to.equal(9);
    });
    it('should return 10 after adding one element to a dictionary of 9 elements', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [17,18,88,22,12,0,-12,11,22.00001], ["x","x","x","x","x","x","x","x","x"]);
        dict.add(1,"y");
        expect(dict.length).to.equal(10);
    });
    it('should return 8 after removing one element from a dictionary of 9 elements', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [17,18,88,22,12,0,-12,11,22.00001], ["x","x","x","x","x","x","x","x","x"]);
        dict.remove(22.00001);
        expect(dict.length).to.equal(8);
    });
    it('should return 9 after removing one element from a dictionary of 9 elements wit an non-existing key', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [17,18,88,22,12,0,-12,11,22.00001], ["x","x","x","x","x","x","x","x","x"]);
        dict.remove(885);
        expect(dict.length).to.equal(9);
    });
    it('should return 0 after execution of the clear() method', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [17,18,88,22,12,0,-12,11,22.00001], ["x","x","x","x","x","x","x","x","x"]);
        dict.clear();
        expect(dict.length).to.equal(0);
    });
    it('should return 0 after removing the last element of a dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.string,17, "x");
        dict.remove(17);
        expect(dict.length).to.equal(0);
    });
});    
    
describe('add method', () => {
    let dict: Dictionary<string,number>;
    it('should add an element and increase the length of the dictionary by one', () => {
        dict = Utils.setupDictionary(Types.string, Types.number);
        dict.add("test", 22);
        expect(dict.length).to.equal(1);
    });
    it('should return 42 as value at element with the key "one"', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number);
        dict.add("one", 42);
        dict.add("two", 43);
        dict.add("One", 42.1);
        let entry: number = dict.get("one");
        expect(entry).to.equal(42);
    });
    it('should replace an existing item (same key) and not increase the length of 3 of an existing dictionary', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number);
        dict.add("one", 42);
        dict.add("two", 43);
        dict.add("One", 42.1);
        dict.add("two",-2);
        expect(dict.length).to.equal(3);
    });
    it('should not replace a Date value that differs just 1 ms from another as key instead of adding a new one (failing of toString)', () => {
        let dict2: Dictionary<Date, number> =  Utils.setupDictionary(Types.date, Types.number);
        let d1: Date = new Date(2000, 1,1,1,1,1,0);
        let d2: Date = new Date(2000, 1,1,1,1,1,1);
        dict2.add(d1, 42);
        dict2.add(d2, 43);
        expect(dict2.length).not.to.equal(1);
    });
    it('should not replace a Date value that differs just 1 ms from another as key instead of replacing it after definition of a override function for toString', () => {
        let dict2: Dictionary<Date, number> =  Utils.setupDictionary(Types.date, Types.number);
        let d1: Date = new Date(2000, 1,1,1,1,1,0);
        let d2: Date = new Date(2000, 1,1,1,1,1,1);
        dict2.overrideHashFunction(Utils.properDateHashFunction);
        dict2.add(d1, 42);
        dict2.add(d2, 43);
        expect(dict2.length).to.equal(2);
    });

    it('should throw an error when adding undefined as key to a dictionary', () => {
        expect(function() { dict =  Utils.setupDictionary(Types.string, Types.number); dict.add(undefined, 22); }).to.throw();
    });
    it('should throw an error when adding undefined as value to a dictionary', () => {
        expect(function() { dict =  Utils.setupDictionary(Types.string, Types.number); dict.add("undefined", undefined); }).to.throw();
    });
    it('should throw an error when adding undefined as key and value to a dictionary', () => {
        expect(function() { dict =  Utils.setupDictionary(Types.string, Types.number); dict.add(undefined, undefined); }).to.throw();
    });    
     it('should not throw an error when adding the string "undefined" as key to a dictionary', () => {
        expect(function() { dict =  Utils.setupDictionary(Types.string, Types.number); dict.add("undefined", 22); }).not.to.throw();
    });

});    
describe('addRange method -> calls add()', () => {
    let keys: string[] = ["one", "two", "three", "four", "five"];
    let values: number[] = [1,2,3,4,5];
    let dict: Dictionary<string,number> = Utils.setupDictionary(Types.string, Types.number);
    it('should add five elements from two arrays (keys & values) to an empty dictionary and return five as length of the list', () => {
        dict.addRange(keys, values);
        expect(dict.length).to.equal(5);
    });
    it('should add five elements from two Lists (keys & values) to an empty dictionary and return five as length of the list', () => {
        dict = Utils.setupDictionary(Types.string, Types.number);
        let kL: List<string> = new List<string>(keys);
        let vL: List<number> = new List<number>(values);
        dict.addRange(kL, vL);
        expect(dict.length).to.equal(5);
    });    
    it('should add five elements from a dictionary to an empty dictionary and return five as length of the dictionary', () => {
        let newDict: Dictionary<string, number> = Utils.setupDictionary(Types.string, Types.number);
        newDict.addRange(dict);
        expect(newDict.length).to.equal(5);
    });
    it('should return the value 4 at the key "four" after adding a range of 5 elements', () => {
        let item: number = dict.get("four");
        expect(item).to.equal(4);
    });
    it('should throw an error if the arrays of keys and values are different', () => {
        expect(function() { dict =  Utils.setupDictionary(Types.string, Types.number); dict.addRange(["1","2","3"], [22,33,44,55]); }).to.throw();
    });
    it('should throw an error if the lists of keys and values are different', () => {
        let kL: List<string> = new List<string>(["k1","k2","k3"]);
        let vL: List<number> = new List<number>([22,55]);
        expect(function() { dict =  Utils.setupDictionary(Types.string, Types.number); dict.addRange(kL, vL); }).to.throw();
    });

});
describe('clear method', () => {
    let dict: Dictionary<string,boolean>;
    it('should return a length of zero after execution on a dictionary with 4 elements', () => {
        dict = Utils.setupDictionary(Types.string, Types.boolean, ["1","2","3","4"], [true, false, true, true]);
        dict.clear();
        expect(dict.length).to.equal(0);
    });
    it('should return a length of zero after execution on a dictionary with zero elements', () => {
        dict = Utils.setupDictionary(Types.string, Types.boolean);
        dict.clear();
        expect(dict.length).to.equal(0);
    });
});
describe('containsKey method', () => {
    let dict: Dictionary<number,boolean>;
    it('should return false with the key 42 on an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean);
        let match: boolean = dict.containsKey(42);
        expect(match).to.equal(false);
    });
    it('should return false with the key 42 on a dictionary where the key does not exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,43,45,42.000000001], [false, true, false, true]);
        let match: boolean = dict.containsKey(42);
        expect(match).to.equal(false);
    });
    it('should return true with the key 42 on a dictionary where the key does exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,43,45,42], [false, true, false, true]);
        let match: boolean = dict.containsKey(42);
        expect(match).to.equal(true);
    });
});

describe('containsKeys method', () => {
    let dict: Dictionary<number,boolean>;
    it('should return false with the keys 42 and 22 on an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean);
        let match: boolean = dict.containsKeys([42,22]);
        expect(match).to.equal(false);
    });
    it('should return false with the key 42 and 22 on a dictionary where the keys does not exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,43,45,42.000000001], [false, true, false, true]);
        let match: boolean = dict.containsKeys([42,22]);
        expect(match).to.equal(false);
    });
    it('should return true with the keys 42 and 22 on a dictionary where the key 42 does exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,43,45,42], [false, true, false, true]);
        let match: boolean = dict.containsKeys([42,22]);
        expect(match).to.equal(true);
    });
    it('should return true with the keys 42 and 22 on a dictionary where the key 42 does exist (passed as list)', () => {
        let kL: List<number> = new List<number>([42,22]);
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,43,45,42], [false, true, false, true]);
        let match: boolean = dict.containsKeys(kL);
        expect(match).to.equal(true);
    });    
    it('should return false with the keys 42 and 22 on a dictionary where only the key 42 does exist but the all parameter is set to true', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,43,45,42], [false, true, false, true]);
        let match: boolean = dict.containsKeys([42,22], true);
        expect(match).to.equal(false);
    });
    it('should return true with the keys 42 and 22 on a dictionary where the keys 42 and 22 exist and the all parameter is set to true', () => {
        dict = Utils.setupDictionary(Types.number, Types.boolean, [41,22,45,42], [false, true, false, true]);
        let match: boolean = dict.containsKeys([42,22], true);
        expect(match).to.equal(true);
    });
});
describe('containsValue method', () => {
    let dict: Dictionary<number,string>;
    it('should return false with the value "two" on an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.string);
        let match: boolean = dict.containsValue("two");
        expect(match).to.equal(false);
    });
    it('should return false with the value "two" on a dictionary where the value does not exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42.000000001], ["one","six","three","four"]);
        let match: boolean = dict.containsValue("two");
        expect(match).to.equal(false);
    });
    it('should return true with the value "two" on a dictionary where the value does exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42.000000001], ["one","two","three","four"]);
        let match: boolean = dict.containsValue("two");
        expect(match).to.equal(true);
    });
    it('should return true with the value "two" on a dictionary where the value does exist multiple times', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42.000000001], ["one","two","two","two"]);
        let match: boolean = dict.containsValue("two");
        expect(match).to.equal(true);
    });
    it('should return true with the value "" (empty) on a dictionary where the value does exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42.000000001], ["one","two","","two"]);
        let match: boolean = dict.containsValue("");
        expect(match).to.equal(true);
    });
});
describe('containsValues method', () => {
    let dict: Dictionary<number,string>;
    it('should return false with the value "two" and "three" on an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.string);
        let match: boolean = dict.containsValues(["two","three"]);
        expect(match).to.equal(false);
    });
    it('should return false with the values "two" and "three" on a dictionary where the values does not exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42.000000001], ["one", "four", "5", "six"]);
        let match: boolean = dict.containsValues(["two", "three"]);
        expect(match).to.equal(false);
    });
    it('should return true with the values "two" and "three" on a dictionary where the value "two" does exist', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42], ["one", "two", "5", "six"]);
        let match: boolean = dict.containsValues(["two", "three"]);
        expect(match).to.equal(true);
    });
    it('should return true with the values "two" and "three" on a dictionary where the value "two" does exist (passed as list)', () => {
        let kL: List<string> = new List<string>(["two", "three"]);
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42], ["one", "two", "5", "six"]);
        let match: boolean = dict.containsValues(kL);
        expect(match).to.equal(true);
    });    
    it('should return false with the values "two" and "three" on a dictionary where only the value "two" does exist but the all parameter is set to true', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42], ["one", "two", "5", "six"]);
        let match: boolean = dict.containsValues(["two", "three"], true);
        expect(match).to.equal(false);
    });
    it('should return true with the values "two" and "three" on a dictionary where both value does exist and the all parameter is set to true', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42], ["one", "two", "three", "four"]);
        let match: boolean = dict.containsValues(["two", "three"], true);
        expect(match).to.equal(true);
    });
    it('should return true with the values "two" and "three" on a dictionary where both value does exist multiple times and the all parameter is set to true', () => {
        dict = Utils.setupDictionary(Types.number, Types.string, [41,43,45,42,55,1], ["one", "two", "three", "four","three","two"]);
        let match: boolean = dict.containsValues(["two", "three"], true);
        expect(match).to.equal(false);
    });
});
describe('distinct method', () => {
    it('should return a length of 6 on a dictionary with 8 entries and 3 identical strings values after execution', () => {
        let dict: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string, [1,2,3,4,5,6,7,8],["a","b","a","c","d","c","e","f"]);
        dict.distinct();
        expect(dict.length).to.equal(6);
    });
    
    it('should return length of 5 on a list with 6 entries of a complex class object (custom) with 2 duplicate values', () => {
        let dict2: Dictionary<number,TestClass> = new Dictionary<number,TestClass>();
        dict2.add(1,TestClass.createRandomObject());
        dict2.add(2,TestClass.createRandomObject());
        let value: TestClass = TestClass.createRandomObject();
        dict2.add(3,value);
        dict2.add(4,TestClass.createRandomObject());
        dict2.add(5,value);
        dict2.add(6,TestClass.createRandomObject());
        dict2.distinct();
        expect(dict2.length).to.equal(5);
    });

    it('should return length of 3 on a list with 3 date entries whwre two values only differs by 1 ms', () => {
        let dict2: Dictionary<number,Date> = new Dictionary<number,Date>();
        dict2.add(1,new Date());
        let value: Date = new Date(2017,1,1,1,1,0,0);
        let value2: Date = new Date(2017,1,1,1,1,0,1);
        dict2.add(2,value);
        dict2.add(3,value2);
        dict2.distinct();
        expect(dict2.length).to.equal(3);
    });    
    
    it('should return a length of 8 on a dictionary with 8 entries and no duplicates', () => {
        let dict: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string, [1,2,3,4,5,6,7,8],["a","b","c","d","e","f","g","h"]);
        dict.distinct();
        expect(dict.length).to.equal(8);
    });
    it('should not throw an error if executed on an empty dictionary', () => {
        let dict2: Dictionary<number,Date> = new Dictionary<number,Date>();
        expect(function() { dict2.distinct(); }).not.to.throw();
    });
});

describe('forEach method', () => {
    let dict: Dictionary<number,number> = Utils.setupDictionary(Types.number, Types.number,[13,11,7,5,2], [1.11111,22.2222,333.333,4444.44,55555.5]);

    it('should return the value 135925.41963 after multiplication of each key-value pair and adding all up', () => {
        let value: number = 0;
        dict.forEach(item => {
            value = value + (item.key * item.value);
        });
        expect(value).to.equal(135925.41963);
    });
    it('should return the iteration counter 3 after execution of the forEach with a break (dict.break(); return) after 3 cycles', () => {
        let counter:number = -1;
        let dummy: any;
        dict.forEach(item => {
            counter++;
            if (counter === 3) { dict.break(); return; }
            dummy = item;
        });
        expect(counter).to.equal(3);
    });

    it('should return the iteration counter 4 after execution of the forEach with a continue (dict.continue(); return) after 3 cycles', () => {
        let counter:number = -1;
        let dummy: any;
        dict.forEach(item => {
            counter++;
            if (counter === 3) { dict.continue(); return; }
            dummy = item;
        });
        expect(counter).to.equal(4);
    });

    it('should return the iteration counter 4 after execution of the forEach with a return call after 3 cycles', () => {
        let counter:number = -1;
        let dummy: any;
        dict.forEach(item => {
            counter++;
            if (counter === 3) { return; }
            dummy = item;
        });
        expect(counter).to.equal(4);
    });

    it('should return the number of 5 iterations after the execution', () => {
        let i: number = 0;
        let dummy: any;
        dict.forEach(item => {
            i++;
            dummy = item;
        });
        expect(i).to.equal(5);
    });
    it('should not trigger the callback function on a empty dictionary during the execution', () => {
        dict = new Dictionary<number,number>();
        let hit: boolean = false;
        let dummy: any;
        dict.forEach(item => {
            hit = true;
            dummy = item;
        });
        expect(hit).to.equal(false);   
    });
});

describe('get method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       

    let dict: Dictionary<number, Date> = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);

    it('should return the date of 1017-1-1 at the key 55', () => {
        let value: Date = dict.get(55);
        expect(value.getTime()).to.equal(d4.getTime());
    });
    it('should throw an error when executed with the key 222 on a dictionary where this key does not exist', () => {
        expect(function() { let value: Date = dict.get(222); value.toString(); }).to.throw();
    });
    it('should throw an error when executed with undefined as key on a dictionary', () => {
        expect(function() { let value: Date = dict.get(undefined); value.toString(); }).to.throw();
    });
    it('should return the number 22 with a date object of  Date(2017,1,1,23,59,0,1) as key (using a proper date hashing function)', () => {
        let dict2: Dictionary<Date, number> = new Dictionary<Date,number>(Utils.properDateHashFunction);
        dict2.addRange([d1,d2,d3,d4,d5,d6,d7], [17,22,88,55,12,0,-12]);
        dict2.overrideHashFunction(Utils.properDateHashFunction);
        let value: number = dict2.get(d2);
        expect(value).to.equal(22);
    });
    it('should not return the number 22 with a date object of  Date(2017,1,1,23,59,0,0) as key (using a proper date hashing function)', () => {
        let dict2: Dictionary<Date, number> = new Dictionary<Date,number>(Utils.properDateHashFunction);
        dict2.addRange([d1,d2,d3,d4,d5,d6,d7], [17,22,88,55,12,0,-12]);
        let value: number = dict2.get(d1);
        expect(value).not.to.equal(22);
    });
    it('should not return the number 22 with a date object of  Date(2017,1,1,23,59,0,0) as key (without replacing the hashing function)', () => {
        let dict2: Dictionary<Date, number> = new Dictionary<Date,number>([d1,d2,d3,d4,d5,d6,d7], [17,22,88,55,12,0,-12]);
        let value: number = dict2.get(d1);
        expect(value).not.to.equal(22);
    });
});
describe('getKeys method', () => {
    let dict: Dictionary<number,number> = Utils.setupDictionary(Types.number, Types.number,[13,11,7,5,2], [1.11111,22.2222,333.333,4444.44,55555.5]);
    it('should return an array of the size 5 when executed on a dictionary with the same size', () => {
        let keys: number[] = dict.getKeys();
        expect(keys.length).to.equal(dict.length);
    });
    it('should return an empty array when executed on an empty dictionary', () => {
        let dict2: Dictionary<number,string> = new Dictionary<number,string>();
        let keys: number[] = dict2.getKeys();
        expect(keys.length).to.equal(0);
    });
    it('should return an array with numbers as data type when executed on a dictionary with this key type', () => {
        let keys: number[] = dict.getKeys();
        let match: boolean = true;
        for (let i: number = 0; i < keys.length; i++)
        {
            if (typeof keys[i] !== "number") { match= false; }
        }
        expect(match).to.equal(true);
        
    });    
    it('should return the sum of 38 when executed on a dictionary numbers as keys', () => {
        let keys: number[] = dict.getKeys();
        let sum: number = 0;
        for (let i: number = 0; i < keys.length; i++)
        {
           sum += keys[i];
        }
        expect(sum).to.equal(38);
    });    
});

describe('getKeysAsList method -> calls getKeys()', () => {
    let dict: Dictionary<number,number> = Utils.setupDictionary(Types.number, Types.number,[13,11,7,5,2], [1.11111,22.2222,333.333,4444.44,55555.5]);
    it('should return a List of the size 5 when executed on a dictionary with the same size', () => {
        let keys: List<number> = dict.getKeysAsList();
        expect(keys.length).to.equal(dict.length);
    });
    it('should return an empty List when executed on an empty dictionary', () => {
        let dict2: Dictionary<number,string> = new Dictionary<number,string>();
        let keys: List<number> = dict2.getKeysAsList();
        expect(keys.length).to.equal(0);
    }); 
    it('should return the sum of 38 when executed on a dictionary numbers as keys', () => {
        let keys: List<number> = dict.getKeysAsList();
        let sum: number = 0;
        keys.forEach(item => {
            sum += item;
        })
        expect(sum).to.equal(38);
    });    
});

describe('getKeysByValue method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       

    let dict: Dictionary<number, Date>;// = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);

    it('should return the two keys 22 and 55 with the date 1017-1-1 as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: number[] = dict.getKeysByValue(d4);
        let match: boolean = false;
        if ((result[0] === 22 || result[0] === 55) && (result[1] === 22 || result[1] === 55)) { match = true; }
        expect(match).to.equal(true);
    });
    it('should return an empty array with the date 1990-1-1 as value which does no exist in the dictionary as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: number[] = dict.getKeysByValue(d7);
        expect(result.length).to.equal(0);
    });
    it('should return an empty array with the date 1990-1-1 as value in an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.date);
        let result: number[] = dict.getKeysByValue(d7);
        expect(result.length).to.equal(0);
    });
    it('should return one key 17 date 2017-1-1 as value that differs only 1 ms from key 22', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d2,d3,d4,d5,d6,d7]);
        let result: number[] = dict.getKeysByValue(d1);
        let match: boolean = false;
        if (result[0] === 17) { match = true; }
        expect(match).to.equal(true);
    });
    
});

describe('getKeysByValue method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       

    let dict: Dictionary<number, Date>;// = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);

    it('should return the two keys 22 and 55 with the date 1017-1-1 as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: number[] = dict.getKeysByValue(d4);
        let match: boolean = true;
        for(let i: number = 0; i < result.length; i++)
        {
            if (result[i] !== 22 && result[i] !== 55) { match = false; }
        }
        expect(match).to.equal(true);
    });
    it('should return an empty array with the date 1990-1-1 as value which does no exist in the dictionary as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: number[] = dict.getKeysByValue(d7);
        expect(result.length).to.equal(0);
    });
    it('should return an empty array with the date 1990-1-1 as value in an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.date);
        let result: number[] = dict.getKeysByValue(d7);
        expect(result.length).to.equal(0);
    });
    it('should return one key 17 date 2017-1-1 as value that differs only 1 ms from key 22', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d2,d3,d4,d5,d6,d7]);
        let result: number[] = dict.getKeysByValue(d1);
        let match: boolean = false;
        if (result[0] === 17 && result.length === 1) { match = true; }
        expect(match).to.equal(true);
    });
});



describe('getKeysByValues method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);
    let d8: Date = new Date(1990,1,2,23,59,0,0);          

    let dict: Dictionary<number, Date>;// = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);

    it('should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: number[] = dict.getKeysByValues([d4, d3]);
        let match: boolean = true;
        for(let i: number = 0; i < result.length; i++)
        {
            if (result[i] !== 22 && result[i] !== 55 && result[i] !== 12) { match = false; }
        }
        expect(match).to.equal(true);
    });
    it('should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values (passed as List)', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        let values: List<Date> = new List<Date>([d4, d3])
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: number[] = dict.getKeysByValues(values);
        let match: boolean = true;
        for(let i: number = 0; i < result.length; i++)
        {
            if (result[i] !== 22 && result[i] !== 55 && result[i] !== 12) { match = false; }
        }
        expect(match).to.equal(true);
    });

    it('should return an empty array with the dates 1990-1-1 and 1990-1-2 as values which does no exist in the dictionary as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: number[] = dict.getKeysByValues([d7,d8]);
        expect(result.length).to.equal(0);
    });
    it('should return an empty array with the dates 1990-1-1 and 1990-1-2 as values in an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.date);
        let result: number[] = dict.getKeysByValues([d7,d8]);
        expect(result.length).to.equal(0);
    });
});

describe('getKeysByValuesAsList method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);
    let d8: Date = new Date(1990,1,2,23,59,0,0);          

    let dict: Dictionary<number, Date>;// = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);

    it('should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: List<number> = dict.getKeysByValuesAsList([d4, d3]);
        let match: boolean = false;
        if (result.contains(22) && result.contains(55) && result.contains(12))
        {
            match = true;
        }
        expect(match).to.equal(true);
    });
    it('should return the two keys 12, 22 and 55 with the dates 1017-1-1 ans 2015-1-1 as values (passed as List)', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        let values: List<Date> = new List<Date>([d4, d3])
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: List<number> = dict.getKeysByValuesAsList(values);
        let match: boolean = false;
        if (result.contains(22) && result.contains(55) && result.contains(12))
        {
            match = true;
        }
        expect(match).to.equal(true);
    });

    it('should return an empty list with the dates 1990-1-1 and 1990-1-2 as values which does no exist in the dictionary as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: List<number> = dict.getKeysByValuesAsList([d7,d8]);
        expect(result.length).to.equal(0);
    });
    it('should return an empty list with the dates 1990-1-1 and 1990-1-2 as values in an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.date);
        let result: List<number> = dict.getKeysByValuesAsList([d7,d8]);
        expect(result.length).to.equal(0);
    });
    it('should return an empty list if an empty array of vales is passed', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: List<number> = dict.getKeysByValuesAsList([]);
        expect(result.length).to.equal(0);
    });
    it('should return an list with the key 17, although the value 2017-1-1 was passed twice', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: List<number> = dict.getKeysByValuesAsList([d1,d1]);
        let match: boolean = false;
        if (result.length === 1 && result.contains(17)) { match = true; }
        expect(match).to.equal(true);
    });
});


describe('getKeysByValueAsList method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       

    let dict: Dictionary<number, Date>;// = Utils.setupDictionary(Types.number, Types.date, [17,22,88,55,12,0,-12],[d1,d2,d3,d4,d5,d6,d7]);

    it('should return the two keys 22 and 55 with the date 1017-1-1 as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d4,d3,d5,d6]);
        let result: List<number> = dict.getKeysByValueAsList(d4);
        let match: boolean = false;
        if (result.contains(22) && result.contains(55) && result.length === 2) { match = true; }
        expect(match).to.equal(true);
    });
    it('should return an empty List with the date 1990-1-1 as value which does no exist in the dictionary as value', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d4,d2,d3,d4,d5,d6]);
        let result: List<number> = dict.getKeysByValueAsList(d7);
        expect(result.length).to.equal(0);
    });
    it('should return an empty List with the date 1990-1-1 as value in an empty dictionary', () => {
        dict = Utils.setupDictionary(Types.number, Types.date);
        let result: List<number> = dict.getKeysByValueAsList(d7);
        expect(result.length).to.equal(0);
    });
    it('should return one key 17 date 2017-1-1 as value that differs only 1 ms from key 22', () => {
        let keys: number[] = [17,22,88,55,12,0,-12];
        dict = Utils.setupDictionary(Types.number, Types.date, keys, [d1,d2,d3,d4,d5,d6,d7]);
        let result: List<number> = dict.getKeysByValueAsList(d1);
        let match: boolean = false;
        if (result.contains(17) && result.length === 1) { match = true; }
        expect(match).to.equal(true);
    });
    
});

describe('getRange method', () => {
    let dict: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string,[1,2,3,4,5,6,7,8,9], ["a","b","a","b","c","a","d","e","f"]);
    it('should copy the whole dictionary (same length)', () => {
        let range: Dictionary<number, string> = dict.getRange();
        expect(dict.length).to.equal(range.length);
    });
    it('should return a dictionary with the values "b", "a" and "c" with the keys 2,3,5 passed as array', () => {
        let range: Dictionary<number, string> = dict.getRange([2,3,5]);
        let match: boolean = false;
        if (range.containsValues(["a","b","c"],true) === true) { match = true; }
        expect(match).to.equal(true);
    });
    it('should return an empty dictionary wen executed with the keys 22 and 33 which do not exist in the original dictionary', () => {
        let range: Dictionary<number, string> = dict.getRange([22,33]);
        expect(range.length).to.equal(0);
    });
    it('should return a dictionary with the values "b", "a" and "c" with the keys 2,3,5 passed as List', () => {
        let keys: List<number> = new List<number>([3,5,6]);
        let range: Dictionary<number, string> = dict.getRange(keys);
        let match: boolean = false;
        if (range.containsValues(["a","b","c"],true) === true) { match = true; }
        expect(match).to.equal(true);
    });
    it('should return an empty dictionary when executed on an empty original dictionary', () => {
        let keys: List<number> = new List<number>([3,5,6]);
        let dict2: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string);
        let range: Dictionary<number, string> = dict2.getRange(keys);
        expect(range.length).to.equal(0);
    });  
});

describe('getRangeByValues method', () => {
    let dict: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string,[1,2,3,4,5,6,7,8,9], ["a","b","a","b","c","a","d","e","f"]);
    it('should return a dictionary with the keys 1,2,3,4,5 and 6 with the values "a", "b" and "c" passed as array', () => {
        let range: Dictionary<number, string> = dict.getRangeByValues(["a","b","c"]);
        let match: boolean = false;
        if (range.containsKeys([1,2,3,4,5,6],true) === true) { match = true; }
        expect(match).to.equal(true);
    });
    it('should return a dictionary with the keys 1,2,3,4,5 and 6 with the values "a", "b" and "c" passed as List', () => {
        let values: List<string> = new List<string>(["a","b","c"]);
        let range: Dictionary<number, string> = dict.getRangeByValues(values);
        let match: boolean = false;
        if (range.containsKeys([1,2,3,4,5,6],true) === true) { match = true; }
        expect(match).to.equal(true);
    });
    
    it('should return an empty dictionary wen executed with the vales "x" and "y" which do not exist in the original dictionary', () => {
        let range: Dictionary<number, string> = dict.getRangeByValues(["x","y"]);
        expect(range.length).to.equal(0);
    });
    it('should return an empty dictionary when executed on an empty original dictionary', () => {
        let values: List<string> = new List<string>(["a","b","c"]);
        let dict2: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string);
        let range: Dictionary<number, string> = dict2.getRangeByValues(values);
        expect(range.length).to.equal(0);
    });  
});

describe('getValues method', () => {
    let dict: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string,[1,2,3,4,5,6,7,8,9], ["a","b","a","b","c","a","d","e","f"]);
    it('should return an array with 9 elements of the type string', () => {
        let values: string[] = dict.getValues();
        expect(values.length).to.equal(9);
    });
    it('should return an empty array with on a empty dictionary', () => {
        let dict2: Dictionary<number,string> = new Dictionary<number,string>();
        let values: string[] = dict2.getValues();
        expect(values.length).to.equal(0);
    });
    it('should return the value "f" at the last index position of the array, after sorting', () => {
        let values: string[] = dict.getValues();
        let temp: List<string> = new List<string>(values);
        temp.sort(Comparer.compareStrings);
        let result: string = temp.get(temp.length - 1);
        expect(result).to.equal("f");
    });
});

describe('getValuesAsList method', () => {
    let dict: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string,[1,2,3,4,5,6,7,8,9], ["a","b","a","b","c","a","d","e","f"]);
    it('should return a List with 9 elements of the type string', () => {
        let values: List<string> = dict.getValuesAsList();
        expect(values.length).to.equal(9);
    });
    it('should return an empty List with on a empty dictionary', () => {
        let dict2: Dictionary<number,string> = new Dictionary<number,string>();
        let values: List<string> = dict2.getValuesAsList();
        expect(values.length).to.equal(0);
    });
});

describe('next method', () => {
    let dict: Dictionary<number,number> = Utils.setupDictionary(Types.number, Types.number,[13,11,7,5,2], [1.11111,22.2222,333.333,4444.44,55555.5]);
    it('should return the value 135925.41963 when multiplying key and value of each key-value pair and adding all up after 5 calls', () => {
        let value: number = 0;
        let item: KeyValuePair<number, number>;
        for(let i: number = 0; i< 5; i++)
        {
            item = (dict.next() as IteratorItem<KeyValuePair<number,number>>).value;
            value = value + (item.key * item.value);
        }
        expect(value).to.equal(135925.41963);
    });
    it('should return the value 271850.83926 after 10 calls (2 rounds)', () => {
        let value: number = 0;
        let item: KeyValuePair<number, number>;
        for(let i: number = 0; i< 10; i++)
        {
            item = (dict.next() as IteratorItem<KeyValuePair<number,number>>).value;
            value = value + (item.key * item.value);
        }
        expect(value).to.equal(271850.83926);
    });

        it('should indicate that the last element is reached after 5 calls in a dictionary of 5 entries (for loop)', () => {
        let state: boolean;
        for(let i: number = 0; i < 5; i++)
        {
            state = (dict.next() as IteratorItem<KeyValuePair<number,number>>).done;
        }
        expect(state).to.equal(true);
    });

    it('should indicate that the last element is reached after 7 calls in a dictionary of 5 entries if a forEach call was executed after the 2nd next call (reset)', () => {
        let state: boolean;
        let dummy: any;
        for(let i: number = 0; i < 7; i++)
        {
            if (i === 2)
                {
                    dict.forEach(item =>{ dummy = item; });
                }
            state = (dict.next() as IteratorItem<KeyValuePair<number,number>>).done;
        }
        expect(state).to.equal(true);
    });

    it('should indicate that the last element is reached after 3 calls in a dictionary of 5 entries (for loop) and after passing "true" ath the 3rd iteration (break condition)', () => {
        let counter: number = 0;
        let item: IteratorItem<KeyValuePair<number,number>>;
        for(let i: number = 0; i < 5; i++)
        {
            if (i === 2)
            {
                item = dict.next(true) as IteratorItem<KeyValuePair<number,number>>;
            }
            else
            {
                item = dict.next() as IteratorItem<KeyValuePair<number,number>>;
            }
            counter++;
            if (item.done === true) { break; }
        }
        expect(counter).to.equal(3);
    });

});

describe('overrideHashFunction method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,1);
    let d2: Date = new Date(2017,1,1,23,59,0,0);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2017,1,1,23,59,0,2);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       
    let values: number[] = [17,22,88,55,12,0,-12];
    let dict: Dictionary<Date, number> = Utils.setupDictionary(Types.date, Types.number);

    it('should return 7 entries after initial execution on a dictionary of 7 entries and 3 entries with dates as key which differs only 1 ms', () => {
        dict.overrideHashFunction(Utils.properDateHashFunction);
        dict.addRange([d1,d2,d3,d4,d5,d6,d7], values);
        expect(dict.length).to.equal(7);
    });
    it('should return 7 entries after execution within constructor on a dictionary of 7 entries and 3 entries with dates as key which differs only 1 ms', () => {
        dict = new Dictionary<Date, number>(Utils.properDateHashFunction);
        dict.addRange([d1,d2,d3,d4,d5,d6,d7], values);
        expect(dict.length).to.equal(7);
    });
    it('should throw an error if undefined was passed as function', () => {
        dict = new Dictionary<Date, number>();
        expect(function()
        {
             let dict2: Dictionary<number, number> = new Dictionary<number, number>();
             dict2.overrideHashFunction(undefined);
             dict2.addRange(values, values);
        }).to.throw();
    });

});


describe('remove method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,1);
    let d2: Date = new Date(2017,1,1,23,59,0,0);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2017,1,1,23,59,0,2);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       
    let values: number[] = [17,22,88,55,12,0,-12];
    let dict: Dictionary<number, Date> = Utils.setupDictionary(Types.number, Types.date);

    it('should return a length of 6 after execution with the (existing) key 22 on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        dict.remove(22);
        expect(dict.length).to.equal(6);
    });
    it('should return a length of 6 after execution with the (existing) key 2017-1-1 on a dictionary of 7 entries', () => {
        let dict2: Dictionary<Date, number> = new Dictionary<Date, number>([d1,d2,d3,d4,d5,d6,d7], values);
        dict2.remove(d2);
        expect(dict.length).to.equal(6);
    });
    it('should return a length of 4 after execution with the (existing) keys 22, 88 and 12 (passed as array) on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        dict.remove([12,22,88]);
        expect(dict.length).to.equal(4);
    });
    it('should return a length of 4 after execution with the (existing) keys 22, 88 and 12 (passed as List) on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        let list: List<number> = new List<number>([12,22,88]);
        dict.remove(list);
        expect(dict.length).to.equal(4);
    });
     it('should return a length of 0 after removal of all keys on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        dict.remove([17,22,88,55,12,0,-12]);
        expect(dict.length).to.equal(0);
    });
    it('should return true after execution with the (existing) key 22', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        let match: boolean = dict.remove(22);
        expect(match).to.equal(true);
    });
    it('should return false after execution with the (not existing) key 122', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        let match: boolean = dict.remove(122);
        expect(match).to.equal(false);
    });
    it('should not throw an error when executed on an empty dictionary', () => {
        dict = new Dictionary<number, Date>();
    expect(function() { dict.remove(42); }).not.to.throw();
    });
    
});


describe('removeByValue method', () => {
    let d1: Date = new Date(2017,1,1,23,59,0,1);
    let d2: Date = new Date(2017,1,1,23,59,0,0);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2017,1,1,23,59,0,2);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);       
    let values: number[] = [17,22,88,55,12,0,-12];
    let dict: Dictionary<number, Date> = Utils.setupDictionary(Types.number, Types.date);

    it('should return a length of 6 after execution with the (existing) value 2017-1-1 on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        dict.removeByValue(d4);
        expect(dict.length).to.equal(6);
    });
    it('should return a length of 4 after execution with the (existing) values 2016-1-1, 2020-1-1 and 2017-1-1 (passed as array) on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        dict.removeByValue([d3,d4,d6]);
        expect(dict.length).to.equal(4);
    });
    it('should return a length of 4 after execution with the (existing) values 2016-1-1, 2020-1-1 and 2017-1-1 (passed as List) on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        let list: List<Date> = new List<Date>([d3,d4,d6]);
        dict.removeByValue(list);
        expect(dict.length).to.equal(4);
    });
     it('should return a length of 0 after removal of all values on a dictionary of 7 entries', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        dict.removeByValue([d1,d2,d3,d4,d5,d6,d7]);
        expect(dict.length).to.equal(0);
    });
    it('should return true after execution with the (existing) value 2020-1-1', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        let match: boolean = dict.removeByValue(d6);
        expect(match).to.equal(true);
    });
    it('should return false after execution with the (not existing) vlaue 2021-1-1', () => {
        dict = new Dictionary<number, Date>(values,[d1,d2,d3,d4,d5,d6,d7]);
        let d8: Date = new Date(2021,1,1,23,59,0,0);
        let match: boolean = dict.removeByValue(d8);
        expect(match).to.equal(false);
    });
    it('should not throw an error when executed on an empty dictionary', () => {
        dict = new Dictionary<number, Date>();
        let d8: Date = new Date(2021,1,1,23,59,0,0);
    expect(function() { dict.removeByValue(d8); }).not.to.throw();
    });
    
});
describe('set method', () => {
    let dict: Dictionary<string,number>;
    it('should add an element and increase the length of an empty dictionary by one', () => {
        dict = Utils.setupDictionary(Types.string, Types.number);
        dict.set("test", 22);
        expect(dict.length).to.equal(1);
    });
    it('should return 42 as value at element with the key "one"', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number);
        dict.set("one", 42);
        dict.set("two", 43);
        dict.set("One", 42.1);
        let entry: number = dict.get("one");
        expect(entry).to.equal(42);
    });
    it('should replace an existing item (same key) and not increase the length of 3 of an existing dictionary', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number);
        dict.set("one", 42);
        dict.set("two", 43);
        dict.set("One", 42.1);
        dict.set("two",-2);
        expect(dict.length).to.equal(3);
    });
    it('should not replace a Date value that differs just 1 ms from another as key instead of replacing it after definition of a override function for toString', () => {
        let dict2: Dictionary<Date, number> =  Utils.setupDictionary(Types.date, Types.number);
        let d1: Date = new Date(2000, 1,1,1,1,1,0);
        let d2: Date = new Date(2000, 1,1,1,1,1,1);
        dict2.overrideHashFunction(Utils.properDateHashFunction);
        dict2.set(d1, 42);
        dict2.set(d2, 43);
        expect(dict2.length).to.equal(2);
    });
});

describe('swapValues method', () => {
    let dict: Dictionary<string,number>;
    it('should return 42 as value at element with the key "two" and 43 at "one after swapping', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number, ["one","two","three"],[42,43,42.1]);
        dict.swapValues("one", "two")
        let entry1: number = dict.get("one");
        let entry2: number = dict.get("two");
        expect(entry1 === 43 && entry2 === 42).to.equal(true);
    });
    it('should throw an error when executed on an empty dictionary', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number);
    expect(function() { dict.swapValues("one", "two"); }).to.throw();
    });
    it('should throw an error when executed on with one non-existing key dictionary', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number, ["one","two","three"],[42,43,42.1]);
    expect(function() { dict.swapValues("one", "four"); }).to.throw();
    });
    it('should throw an error when executed on with two non-existing keys dictionary', () => {
        dict =  Utils.setupDictionary(Types.string, Types.number, ["one","two","three"],[42,43,42.1]);
    expect(function() { dict.swapValues("six", "four"); }).to.throw();
    });
});

/************ */
});