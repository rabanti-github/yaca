import List from '../src/List';
import {IteratorItem} from '../src/IteratorItem';
import { Utils } from './utils/Utils';
import {Types} from './utils/Types';
import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';

// This file is to test the List<T> class
describe("LIST<T>\n  #######\n",() => {

describe('constructors', () => {
    let list: List<number>;
    it('should not throw an error if initialized without parameters', () => {
        expect(function(){ list = new List<number>(); }).not.to.throw();
    });
    it('should return a length of 1 if initialized with one element', () => {
        list = new List<number>(42);
        let length: number = list.length;
        expect(length).to.equal(1);
    });
    it('should return a length of 5 if initialized with an array of 5 elements', () => {
        let values: number[] = [11,22,33,44,55];
        list = new List<number>(values);
        let length: number = list.length;
        expect(length).to.equal(5);
    });
    it('should return a length of 4 if initialized with a list of 4 elements', () => {
        let list2 = Utils.setupList(Types.number, [11,22,33,44]);
        list = new List<number>(list2);
        let length: number = list.length;
        expect(length).to.equal(4);
    });
    it('should return a length of 0 if initialized with an empty array', () => {
        let values: number[] = [];
        list = new List<number>(values);
        let length: number = list.length;
        expect(length).to.equal(0);
    });
});

describe('length property', () => {
    let list: List<number>;

    it('should return 0 on an initialized (empty) list', () => {
        list = Utils.setupList(Types.number);
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
    it('should return 8 after removing one element from a list of 9 elements', () => {
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

describe('add method', () => {
    let list: List<string> = Utils.setupList(Types.string);
    it('should add an element and increase the counter by one', () => {
        list.add("test");
        let length: number = list.length;
        expect(length).to.equal(1);
    });
    it('should return "test2" as string at element index 1 (2nd element)', () => {
        list.add("test2");
        let entry: string = list.get(1);
        expect(entry).to.equal("test2");
    });
    it('should throw an error when adding undefined to a list of numbers', () => {
        expect(function() { let list: List<number> = Utils.setupList(Types.number); list.add(undefined); }).to.throw();
    });    
    it('should not throw an error when adding a number to a list of numbers', () => {
        expect(function() { let list: List<number> = Utils.setupList(Types.number); list.add(21); }).to.not.throw();
    });
    it('should not throw an error when adding a string to a list of string', () => {
        expect(function() { let list: List<string> = Utils.setupList(Types.string); list.add("test"); }).to.not.throw();
    });
    it('should not throw an error when adding an empty string to a list of string', () => {
        expect(function() { let list: List<string> = Utils.setupList(Types.string); list.add(""); }).to.not.throw();
    });
    it('should not throw an error when adding a boolean to a list of booleans', () => {
        expect(function() { let list: List<boolean> = Utils.setupList(Types.boolean); list.add(true); }).to.not.throw();
    });
    it('should not throw an error when adding a date to a list of dates', () => {
        expect(function() { let list: List<Date> = Utils.setupList(Types.date); list.add(new Date()); }).to.not.throw();
    });
});

describe('addRange method -> calls add()', () => {
    let items: string[] = ["one", "two", "three", "four", "five"];
    let list: List<string> = Utils.setupList(Types.string);
    it('should add five elements from an array to an empty list and return file as length of the list', () => {
        list.addRange(items);
        let length: number = list.length;
        expect(length).to.equal(5);
    });
    it('should add five elements from a list to an empty list and return file as length of the list', () => {
        let newList: List<string> = Utils.setupList(Types.string);
        newList.addRange(list);
        let length: number = newList.length;
        expect(length).to.equal(5);
    });
    it('should return the value "four" at the index position 3 (4th element) after adding a range of 5 elements', () => {
        let item: string = list.get(3);
        expect(item).to.equal("four");
    });

});

describe('clear method', () => {
    let list: List<boolean>;
    it('should return a length of zero after execution on a list with 4 elements', () => {
        list = Utils.setupList(Types.boolean, [true, false, true, true]);
        list.clear();
        let length: number = list.length;
        expect(length).to.equal(0);
    });
    it('should return a length of zero after execution on a list with zero elements', () => {
        list = Utils.setupList(Types.boolean);
        list.clear();
        let length: number = list.length;
        expect(length).to.equal(0);
    });
});

describe('contains method', () => {
    let list: List<string> = Utils.setupList(Types.string, ["one", "two", "three", "four"]);
    it('should return true on value "three" in a prepared list which contains this value', () => {
        
        let match: boolean = list.contains("three");
        expect(match).to.equal(true);
    });
    it('should return false on undefined as value in a prepared list (cannot contain undefined)', () => {
        
        let match: boolean = list.contains(undefined);
        expect(match).to.equal(false);
    });
    it('should return false on value "six" in a prepared list which does not contain this value', () => {
        
        let match: boolean = list.contains("six");
        expect(match).to.equal(false);
    });
    it('should return true on a date object (2017-01-01 00:00:00) in a prepared list which contains this value', () => {
        let list2: List<Date> = Utils.setupList(Types.date, [new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)]);
        let date = new Date(2017,1,1,0,0,0);
        let match: boolean = list2.contains(date);
        expect(match).to.equal(true);
    });
    it('should return true on a complex class object (custom) in a prepared list which contains this value', () => {
        let list2: List<TestClass> = new List<TestClass>();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        let value: TestClass = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        let match: boolean = list2.contains(value);
        expect(match).to.equal(true);
    });

});


describe('copyToArray method', () => {
    let list: List<string> = Utils.setupList(Types.string, ["one", "two", "three", "four", "five", "six"]);
    it('should return an array with 6 elements from a list with this number of elements', () => {
        let array: string[] = list.copyToArray();
        let length: number = array.length;
        expect(length).to.equal(6);
    });
    it('should return the value "two" at the index position 1 (2nd element) in the copy of a list with 6 entries', () => {
        let array: string[] = list.copyToArray();
        let value: string = array[1];
        expect(value).to.equal("two");
    });
    it('should return an array with 4 elements from a list with 6 elements and start index of 2', () => {
        let array: string[] = list.copyToArray(2);
        let length: number = array.length;
        expect(length).to.equal(4);
    });
    it('should return an array with 3 elements from a list with 6 elements and start index of 2 and end index of 4', () => {
        let array: string[] = list.copyToArray(2,4);
        let length: number = array.length;
        expect(length).to.equal(3);
    });
    it('should return the value of "five" in the copy from a list with 6 elements and start index of 2 and end index of 4 as last element', () => {
        let array: string[] = list.copyToArray(2,4);
        let value: string = array[array.length - 1];
        expect(value).to.equal("five");
    });
    it('should throw an error when the start index is negative', () => {
        expect(function() {let array: string[] = list.copyToArray(-2,4); }).to.throw();
    });
    it('should throw an error when the end index is 99 on a list with 6 elements', () => {
        expect(function() {let array: string[] = list.copyToArray(1,99); }).to.throw();
    });
    it('should not throw an error when the end index is undefined (interpreted as last index position)', () => {
        expect(function() {let array: string[] = list.copyToArray(1,undefined); }).not.to.throw();
    });
});


describe('dequeue method', () => {
    let list: List<number> = Utils.setupList(Types.number, [17,22,88,55,12,0,-12]);

    it('should return a value of -12 as result of the operation', () => {
        let number: number = list.dequeue();
        expect(number).to.equal(-12);
    });
    it('should return a length of 6 after the operation on a list of 7 elements', () => {
        list = Utils.setupList(Types.number, [17,22,88,55,12,0,-12]);
        list.dequeue();
        let length: number = list.length;
        expect(length).to.equal(6);
    });
    it('should return undefined if executed on an empty list', () => {
        list = Utils.setupList(Types.number);
        let value: number = list.dequeue();
        expect(value).to.equal(undefined);
    });
    
});

describe('distinct method', () => {
    it('should return a length of 6 on a list with 8 entries and 3 identical values after execution', () => {
        let list: List<number> = Utils.setupList(Types.number, [17,22,88,55,22,0,-12,22]);
        list.distinct();
        let length: number = list.length;
        expect(length).to.equal(6);
    });
    it('should return length of 5 on a list with 6 entries of a complex class object (custom) with 2 duplicate values', () => {
        let list2: List<TestClass> = new List<TestClass>();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        let value: TestClass = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        list2.distinct();
        let length: number = list2.length;
        expect(length).to.equal(5);
    });
    it('should return a length of 8 on a list with 8 entries and no duplicates', () => {
        let list: List<number> = Utils.setupList(Types.number, [17,22.5,88,55,22.50000001,0,-12,22.49999999]);
        list.distinct();
        let length: number = list.length;
        expect(length).to.equal(8);
    });
});


describe('enqueue method', () => {
    let list: List<number> = Utils.setupList(Types.number, [17,22,88,55,12,0,-12]);

    it('should return a length of 8 if executed on a list of 7 elements', () => {
        list.enqueue(777);
        let length: number = list.length;
        expect(length).to.equal(8);
    });
    it('should return the value 42 at the last index position after execution with this value', () => {
        list.enqueue(42);
        let value: number = list.get(list.length - 1);
        expect(value).to.equal(42);
    });
    it('should throw an error when enqueueing undefined to a list of numbers', () => {
        expect(function() { let list: List<number> = Utils.setupList(Types.number); list.enqueue(undefined); }).to.throw();
    });
});


describe('forEach method', () => {
    let list: List<string> = Utils.setupList(Types.string, ["1","22","333","4444","55555"]);

    it('should return the term "122333444455555" after concatenation of the forEach values during the execution', () => {
        let value: string = "";
        list.forEach(item => {
            value = value + item;
        });
        expect(value).to.equal("122333444455555");
    });
    it('should return the term "1223334444" after concatenation of the forEach values with a break (return) after 4 cycles', () => {
        let value: string = "";
        let counter:number = 0;
        list.forEach(item => {
            if (counter >= 4) { return; }
            value = value + item;
            counter++;
        });
        expect(value).to.equal("1223334444");
    });
    it('should return the number of 5 iterations after the execution', () => {
        let i: number = 0;
        list.forEach(item => {
            i++;
        });
        expect(i).to.equal(5);
    });
    it('should not trigger the callback function on a empty list during the execution', () => {
        list = new List<string>();
        let hit: boolean = false;
        list.forEach(item => {
            hit = true;
        });
        expect(hit).to.equal(false);   
    });
});

describe('get method', () => {
    let list: List<number> = Utils.setupList(Types.number, [17,22,88,55,12,0,-12]);

    it('should return the value of 55 at the index position 3', () => {
        let value: number = list.get(3);
        expect(value).to.equal(55);
    });
    it('should throw an error when executed with index position 99 on a list with 7 entries', () => {
        expect(function() { let value: number = list.get(99); }).to.throw();
    });
    it('should throw an error when executed with index position -2 on a list with 7 entries', () => {
        expect(function() { let value: number = list.get(-2); }).to.throw();
    });
    it('should throw an error when executed with index position 3.55 on a list with 7 entries', () => {
        expect(function() { let value: number = list.get(3.55); }).to.throw();
    });
    it('should throw an error when executed with undefined as index position on a list with 7 entries', () => {
        expect(function() { let value: number = list.get(undefined); }).to.throw();
    });
});


describe('getRange method', () => {
    let list: List<string> = Utils.setupList(Types.string, ["one", "two", "three", "four", "five", "six"]);
    it('should return a list with 6 elements from a list with this number of elements', () => {
        let list2: List<string> = list.getRange();
        let length: number = list2.length;
        expect(length).to.equal(6);
    });
    it('should return the value "three" at the index position 2 (3rd element) in the copy of a list with 6 entries', () => {
        let list2: List<string> = list.getRange();
        let value: string = list2.get(2);
        expect(value).to.equal("three");
    });
    it('should return a list with 4 elements from a list with 6 elements and start index of 2', () => {
        let list2: List<string> = list.getRange(2);
        let length: number = list2.length;
        expect(length).to.equal(4);
    });
    it('should return a list with 3 elements from a list with 6 elements and start index of 2 and end index of 4', () => {
        let list2: List<string> = list.getRange(2,4);
        let length: number = list2.length;
        expect(length).to.equal(3);
    });
    it('should return the value of "five" in the copy from a list with 6 elements and start index of 2 and end index of 4 as last element', () => {
        let list2: List<string> = list.getRange(2,4);
        let value: string = list2.get(list2.length - 1);
        expect(value).to.equal("five");
    });
    it('should throw an error when the start index is negative', () => {
        expect(function() {let list2: List<string> = list.getRange(-2,4); }).to.throw();
    });
    it('should throw an error when the end index is 99 on a list with 6 elements', () => {
        expect(function() {let list2: List<string> = list.getRange(2,99); }).to.throw();
    });
    it('should not throw an error when the start index is undefined (interpreted as 0)', () => {
        expect(function() {let list2: List<string> = list.getRange(undefined,2); }).not.to.throw();
    });
});


describe('indexOf method', () => {
    let list: List<number> = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);

    it('should return the index position 1 on value 22', () => {
        let index: number = list.indexOf(22);
        expect(index).to.equal(1);
    });
    it('should return the index position -1 on not existing value 122', () => {
        let index: number = list.indexOf(122);
        expect(index).to.equal(-1);
    });
    it('should return the index position -1 on undefined as value', () => {
        let index: number = list.indexOf(undefined);
        expect(index).to.equal(-1);
    });
});


describe('indicesOf method', () => {
    let list: List<string> = Utils.setupList(Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
    it('should return an array with two elements on the value "two" from a list with 2 such occurrences', () => {
        let indices: number[] = list.indicesOf("two")
        expect(indices.length).to.equal(2);
    });
    it('should return an array with two index elements 1 and 3 on the value "two" from a list with 2 such occurrences', () => {
        let indices: number[] = list.indicesOf("two")
        expect(indices[0] === 1 && indices[1] === 3).to.equal(true);
    });
    it('should return an empty array on the not existing value "122"', () => {
         let indices: number[] = list.indicesOf("122");
        expect(indices.length).to.equal(0);
    });
    it('should return an empty array on undefined as value', () => {
        let indices: number[] = list.indicesOf(undefined);
        expect(indices.length).to.equal(0);
    });
});

describe('indicesOfAsList method', () => {
    let list: List<string> = Utils.setupList(Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
    it('should return a list with two elements on the value "two" from a list with 2 such occurrences', () => {
        let indices: List<number> = list.indicesOfAsList("two")
        expect(indices.length).to.equal(2);
    });
    it('should return a list with two index elements 1 and 3 on the value "two" from a list with 2 such occurrences', () => {
        let indices: List<number> = list.indicesOfAsList("two")
        expect(indices.get(0) === 1 && indices.get(1) === 3).to.equal(true);
    });
    it('should return an empty list on the not existing value "122"', () => {
         let indices: List<number> = list.indicesOfAsList("122");
        expect(indices.length).to.equal(0);
    });
    it('should return an empty list on undefined as value', () => {
        let indices: List<number> = list.indicesOfAsList(undefined);
        expect(indices.length).to.equal(0);
    });
});

describe('insertAtIndex method', () => {
    let list: List<number>;

    it('should return the value 42 at index position 3 after insertion at this index position', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.insertAtIndex(3,42);
        let index: number = list.get(3);
        expect(index).to.equal(42);
    });
    it('should return the value 22 at index position 4 after insert a value at index position 2', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.insertAtIndex(2,42);
        let index: number = list.get(4);
        expect(index).to.equal(22);
    });
    it('should return a length of 9 after insertion in a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.insertAtIndex(2,42);
        expect(list.length).to.equal(9);
    });
    it('should return the value 11 at index position 8 after insert a value at this position in a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.insertAtIndex(8,11);
        let index: number = list.get(8);
        expect(index).to.equal(11);
    });
    it('should throw an error when inserting a value at index position 9 in a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        expect(function() { list.insertAtIndex(9, 42); }).to.throw();
    });
    it('should throw an error when inserting a value at a negative index position', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        expect(function() { list.insertAtIndex(-2, 42); }).to.throw();
    });
    it('should throw an error when inserting a value at a float number as index position', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        expect(function() { list.insertAtIndex(2.99999999999, 42); }).to.throw();
    });
    it('should throw an error when inserting undefined as value', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        expect(function() { list.insertAtIndex(3, undefined); }).to.throw();
    });
});


describe('lastIndexOf method', () => {
    let list: List<number> = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22,22.00001]);

    it('should return the index position 7 on value 22', () => {
        let index: number = list.lastIndexOf(22);
        expect(index).to.equal(7);
    });
    it('should return the index position -1 on not existing value 122', () => {
        let index: number = list.lastIndexOf(122);
        expect(index).to.equal(-1);
    });
    it('should return the index position -1 on undefined as value', () => {
        let index: number = list.lastIndexOf(undefined);
        expect(index).to.equal(-1);
    });


});

describe('next method', () => {
    let list: List<string>;

    it('should return the term "122333444455555" after concatenation of 5 calls (for loop)', () => {
        list = Utils.setupList(Types.string, ["1","22","333","4444","55555"]);
        let value: string = "";
        for(let i: number = 0; i < 5; i++)
        {
            value = value + (list.next() as IteratorItem<string>).value;
        }
        expect(value).to.equal("122333444455555");
    });
    it('should return the term "122333444455555122" after concatenation of 7 calls in a list of 5 entries (for loop)', () => {
        list = Utils.setupList(Types.string, ["1","22","333","4444","55555"]);
        let value: string = "";
        for(let i: number = 0; i < 7; i++)
        {
            value = value + (list.next() as IteratorItem<string>).value;
        }
        expect(value).to.equal("122333444455555122");
    });
    it('should indicate that the last element is reached after 5 calls in a list of 5 entries (for loop)', () => {
        list = Utils.setupList(Types.string, ["1","22","333","4444","55555"]);
        let state: boolean;
        for(let i: number = 0; i < 5; i++)
        {
            state = (list.next() as IteratorItem<string>).isLastEntry;
        }
        expect(state).to.equal(true);
    });
    it('should return the term "122333444455555" after concatenation of a forEach call after two calls of the next method (restart in forEach)', () => {
        list = Utils.setupList(Types.string, ["1","22","333","4444","55555"]);
        let value: string = "";
        list.next();
        list.next();
        list.forEach(item => {
            value = value + item;
        });
        expect(value).to.equal("122333444455555");
    });
});

describe('peek method', () => {
    let list: List<number>;

    it('should return 22 as value in a list where 22 is the last value', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        let value: number = list.peek();
        expect(value).to.equal(22);
    });
    it('should return 11 in a value with 1 element (11)', () => {
        list = Utils.setupList(Types.number, [11]);
        let value: number = list.peek();
        expect(value).to.equal(11);
    });
    it('should return a length of 8 executed on a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.peek();
        expect(list.length).to.equal(8);
    });
    it('should return undefined as value after execution on an empty list', () => {
        list = Utils.setupList(Types.number);
        let value: number = list.peek();
        expect(value).to.equal(undefined);
    });
});

describe('pop method', () => {
    let list: List<number>;

    it('should return a length of 7 after execution on a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.pop();
        expect(list.length).to.equal(7);
    });
    it('should return 17 as value after execution (1st value of initial list)', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        let value: number = list.pop();
        expect(value).to.equal(17);
    });
    it('should return undefined as value after execution on an empty list', () => {
        list = Utils.setupList(Types.number);
        let value: number = list.pop();
        expect(value).to.equal(undefined);
    });
});

describe('push method', () => {
    let list: List<number>;

    it('should return a length of 9 after execution on a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.push(42);
        expect(list.length).to.equal(9);
    });
    it('should return 42 as value  on index position 0 after execution', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.push(42);
        let value: number = list.get(0);
        expect(value).to.equal(42);
    });
    it('should return 1 as value of the index position 0 in an empty list', () => {
        list = Utils.setupList(Types.number);
        list.push(1);
        let value: number = list.get(0);
        expect(value).to.equal(1);
    });
    it('should throw an error when executing push with an undefined value to a list of numbers', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
    expect(function() { list.push(undefined); }).to.throw();
    });
});

describe('remove method', () => {
    let list: List<number>;

    it('should return a length of 7 after execution with the value 22 on a list of 8 entries with 3 times the values of 22', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.remove(22);
        expect(list.length).to.equal(7);
    });
    it('should return true if the existing value 12 of a list was removed', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        let status : boolean = list.remove(12);
        expect(status).to.equal(true);
    });
    it('should return false if the not existing value 112 of a list was (not) removed', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        let status : boolean = list.remove(112);
        expect(status).to.equal(false);
    });
    it('should not throw an error when executed on an empty list', () => {
        list = Utils.setupList(Types.number);
    expect(function() { list.remove(42); }).not.to.throw();
    });
    it('should return the value 22 (2nd value) at index position 0 if the existing value 17 (1st value) of a list was removed', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.remove(17);
        let value : number = list.get(0);
        expect(value).to.equal(22);
    });
});

describe('removeAll method', () => {
    let list: List<string>;

    it('should return a length of 5 after execution with the value "22" on a list of 8 entries with 3 times the values of "22"', () => {
        list = Utils.setupList(Types.string, ["17","22","88","22","12","0","-12","22"]);
        list.removeAll("22");
        expect(list.length).to.equal(5);
    });
    it('should return a length of 0 after execution with the value "x" on a list of 3 entries "x"', () => {
        list = Utils.setupList(Types.string, ["x","x","x"]);
        list.removeAll("x");
        expect(list.length).to.equal(0);
    });
    it('should return true if the existing value "22" of a list was removed', () => {
        list = Utils.setupList(Types.string, ["17","22","88","22","12","0","-12","22"]);
        let status : boolean = list.removeAll("22");
        expect(status).to.equal(true);
    });
    it('should return false if the not existing value "112" of a list was (not) removed', () => {
        list = Utils.setupList(Types.string, ["17","22","88","22","12","0","-12","22"]);
        let status : boolean = list.removeAll("112");
        expect(status).to.equal(false);
    });
    it('should not throw an error when executed on an empty list', () => {
        list = Utils.setupList(Types.string);
    expect(function() { list.removeAll("42"); }).not.to.throw();
    });
    it('should return a length of 5 after execution with the value "" (empty) on a list of 8 entries with 3 empty entries',() => {
        list = Utils.setupList(Types.string, ["17","","88","","12","0","-12",""]);
        list.removeAll("");
        expect(list.length).to.equal(5);
    });
    it('should return the value "-12" at index position 4 if the existing value "22" of a list was removed', () => {
        list = Utils.setupList(Types.string, ["17","22","88","22","12","0","-12","22"]);
        list.removeAll("22");
        let value : string = list.get(4);
        expect(value).to.equal("-12");
    });
    it('should return the concatenated value "1788120-12" after execution with the value "22"', () => {
        list = Utils.setupList(Types.string, ["17","22","88","22","12","0","-12","22"]);
        list.removeAll("22");
        let value : string = "";
        for(let i: number = 0; i < list.length; i++)
        {
            value = value + list.get(i);
        }
        expect(value).to.equal("1788120-12");
    });
    it('should return a length of 3 if a complex class object (custom) in a prepared list of 4 entries is removed', () => {
        let list2: List<TestClass> = new List<TestClass>();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        let value: TestClass = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        list2.removeAll(value);
        expect(list2.length).to.equal(3);
    });
});

describe('removeAt method', () => {
    let list: List<number>;
    it('should return a length of 7 after execution on a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.removeAt(1);
        expect(list.length).to.equal(7);
    });
    it('should throw an error when executed with an negative index', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
    expect(function() { list.removeAt(-22); }).to.throw();
    });
    it('should throw an error when executed with a floating point number as index', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
    expect(function() { list.removeAt(1.56); }).to.throw();
    });
    it('should throw an error when executed with an index of 10 on a ist of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
    expect(function() { list.removeAt(10); }).to.throw();
    });
    it('should return the value 88 at index position 1 after removing the same position', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.removeAt(1);
        let value : number = list.get(1);
        expect(value).to.equal(88);
    });
});

describe('removeAtIndices method', () => {
    let list: List<number>;
    it('should return a length of 5 after execution with 3 indices on a list of 8 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
        list.removeAtIndices([2,3,4]);
        expect(list.length).to.equal(5);
    });
     it('should return a length of 0 after execution with 4 indices on a list of 4 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22]);
        list.removeAtIndices([0,1,2,3]);
        expect(list.length).to.equal(0);
    });
    it('should throw an error when executed with an negative index in the passed list', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
    expect(function() { list.removeAtIndices([0,1,-1]); }).to.throw();
    });
    it('should throw an error when executed with a floating point number as index in the passed list', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0,-12,22]);
    expect(function() { list.removeAtIndices([0,1,1.999999999999]); }).to.throw();
    });

    it('should return the summarized value of 93.555 after removing the index positions 1,3,4,7 in a list of 8 values', () => {
        list = Utils.setupList(Types.number, [17,22,88,22,12,0.555,-12,22]);
        list.removeAtIndices([1,3,4,7]);
        let sum: number = 0;
        for(let i: number = 0; i < list.length; i++)
        {
            sum += list.get(i);
        }
        expect(sum).to.equal(93.555);
    });
    it('should not throw an error when executed with 5 times the same index on a list with 4 entries', () => {
        list = Utils.setupList(Types.number, [17,22,88,22]);
    expect(function() { list.removeAtIndices([0,0,0,0,0]); }).not.to.throw();
    });
});

describe('reverse method', () => {
    let list: List<string>;
    it('should return a concatenated value of "sixfivefourtwothreetwoone" after execution on a list of 7 strings', () => {
        list = Utils.setupList(Types.string, ["one", "two", "three", "two", "four", "five", "six"])
        list.reverse();
        let value: string = "";
        list.forEach(element => {
            value = value + element;
        });
        expect(value).to.equal("sixfivefourtwothreetwoone");
    });
    it('should return a concatenated value of "onetwothree" after two executions on a list of 3 strings', () => {
        list = Utils.setupList(Types.string, ["one", "two", "three"])
        list.reverse();
        list.reverse();
        let value: string = "";
        list.forEach(element => {
            value = value + element;
        });
        expect(value).to.equal("onetwothree");
    });
    it('should not throw an error when executed on an empty list', () => {
        list = Utils.setupList(Types.string);
    expect(function() { list.reverse(); }).not.to.throw();
    });
    it('should not throw an error when executed on a list with 1 entry', () => {
        list = Utils.setupList(Types.string, ["one"]);
    expect(function() { list.reverse(); }).not.to.throw();
    });
});


describe('set method', () => {
    let list: List<string>;
    it('should throw an error when executed on an empty list with the index position 0', () => {
        list = Utils.setupList(Types.string);
    expect(function() { list.set(0, "one"); }).to.throw();
    });
    it('should throw an error when executed with the index position 4 on a list with 3 entries', () => {
        list = Utils.setupList(Types.string, ["0","1","2"]);
    expect(function() { list.set(4,"value"); }).to.throw();
    });
    it('should throw an error when executed with an undefined value in a list of strings', () => {
        list = Utils.setupList(Types.string, ["0","1","2"]);
    expect(function() { list.set(1, undefined); }).to.throw();
    });
    it('should throw an error when executed with a negative index position', () => {
        list = Utils.setupList(Types.string, ["0","1","2"]);
    expect(function() { list.set(-2, "test"); }).to.throw();
    });
    it('should not throw an error when executed on a list with 1 entry with the index position 0', () => {
        list = Utils.setupList(Types.string,["zero"]);
        list.set(0, "one")
    expect(function() { list.reverse(); }).not.to.throw();
    });
    it('should not throw an error when executed with an empty string in a list of strings', () => {
        list = Utils.setupList(Types.string, ["0","1","2"]);
    expect(function() { list.set(1,""); }).not.to.throw();
    });
    it('should return "insert" as value at index position 1 after execution at this position with this value', () => {
        list = Utils.setupList(Types.string, ["one", "two", "three"])
        list.set(1, "insert")
        let value: string = list.get(1);
        expect(value).to.equal("insert");
    });
});


describe('sort method', () => {
    let list: List<number>;
    it('should not throw an error when executed on an empty list', () => {
        list = Utils.setupList(Types.number);
         expect(function() { list.sort(Utils.compareNumbers); }).not.to.throw();
    });
        it('should not throw an error when executed on a list with 1 entry', () => {
        list = Utils.setupList(Types.number, [42]);
         expect(function() { list.sort(Utils.compareNumbers); }).not.to.throw();
    });
        it('should throw an error when stated undefined as comparison method', () => {
        list = Utils.setupList(Types.number, [42,228,41,1,-12]);
         expect(function() { list.sort(undefined); }).to.throw();
    });
    it('should return "-12,0,5,7,18,99," as concatenated value after execution on a unsorted list of numbers', () => {
        list = Utils.setupList(Types.number, [99,-12,18,5,0,7])
        list.sort(Utils.compareNumbers);
        let value: string = "";
        list.forEach(element => {
            value = value + element.toString() + ",";     
        });
        expect(value).to.equal("-12,0,5,7,18,99,");
    });
    it('should return "1,2," as concatenated value after execution on a list of two numbers (2,1)', () => {
        list = Utils.setupList(Types.number, [2,1])
        list.sort(Utils.compareNumbers);
        let value: string = "";
        list.forEach(element => {
            value = value + element.toString() + ",";     
        });
        expect(value).to.equal("1,2,");
    });
    it('should return "0,0,0,0," as concatenated value after execution on a list of 4 zeros as values', () => {
        list = Utils.setupList(Types.number, [0,0,0,0])
        list.sort(Utils.compareNumbers);
        let value: string = "";
        list.forEach(element => {
            value = value + element.toString() + ",";     
        });
        expect(value).to.equal("0,0,0,0,");
    });
    it('should return "false,false,true,true,true," as concatenated value after execution on a list of 5 booleans as values', () => {
        let list3: List<boolean> = Utils.setupList(Types.boolean, [false,true,true,false,true])
        list3.sort(Utils.compareBooleans);
        let value: string = "";
        list3.forEach(element => {
            value = value + element.toString() + ",";     
        });
        expect(value).to.equal("false,false,true,true,true,");
    });

    it('should return "1990,1991,2017,2050," as concatenated value after execution on a list of 4 unordered Dates as values', () => {
        let list2: List<Date> = Utils.setupList(Types.date);
        list2.add(new Date(2017,5,7,11,6,22,1));
        list2.add(new Date(1991,4,16,0,0,11,25));
        list2.add(new Date(2050,11,2,11,11,6,4));
        list2.add(new Date(1990,2,2,2,2,2,2));
        list2.sort(Utils.compareDates);
        let value: string = "";
        list2.forEach(element => {
            value = value + element.getUTCFullYear().toString()+ ",";     
        });
        expect(value).to.equal("1990,1991,2017,2050,");
    });
});

describe('swapValues method', () => {
    let list: List<string>;
    it('should throw an error when executed on an empty list with two index positions', () => {
        list = Utils.setupList(Types.string);
    expect(function() { list.swapValues(0,1); }).to.throw();
    });
    it('should throw an error when executed with the index positions 0 and 4 on a list with 3 entries', () => {
        list = Utils.setupList(Types.string, ["0","1","2"]);
    expect(function() { list.swapValues(0,4); }).to.throw();
    });
    it('should throw an error when executed with one negative index position', () => {
        list = Utils.setupList(Types.string, ["0","1","2"]);
    expect(function() { list.swapValues(0,-1); }).to.throw();
    });
    it('should not throw an error when executed on a list with 1 entry with the index position 0 for both indices', () => {
        list = Utils.setupList(Types.string,["zero"]);
    expect(function() { list.swapValues(0,0); }).not.to.throw();
    });
   it('should not throw an error when executed on a list with 2 entries', () => {
        list = Utils.setupList(Types.string,["zero", "one"]);
    expect(function() { list.swapValues(1,0); }).not.to.throw();
    });
    it('should not throw an error when executed on 2 empty values', () => {
        list = Utils.setupList(Types.string, ["","","2"]);
    expect(function() { list.swapValues(0,1); }).not.to.throw();
    });
    it('should return "two" at index 0 and "one" at index 1 after execution on a list with 3 entries', () => {
        list = Utils.setupList(Types.string, ["one", "two", "three"])
        list.swapValues(0,1)
        let value: string = list.get(0) + "-" + list.get(1);
        expect(value).to.equal("two-one");
    });
});

/************ */
});