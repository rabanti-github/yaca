import List from '../../src/List';
import { expect } from 'chai';
import 'mocha';

enum Types
{
    string,
    number,
    boolean,
    date,
}

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
    it('should return a lengt of 4 if initialized with a list of 4 elements', () => {
        let list2 = setupList(Types.number, [11,22,33,44]);
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

describe('add method', () => {
    let list: List<string> = setupList(Types.string);
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
    it('should not throw an error when adding a number to a list of numbers', () => {
        expect(function() { let list: List<number> = setupList(Types.number); list.add(21); }).to.not.throw();
    });
    it('should not throw an error when adding a string to a list of string', () => {
        expect(function() { let list: List<string> = setupList(Types.string); list.add("test"); }).to.not.throw();
    });
    it('should not throw an error when adding an empty string to a list of string', () => {
        expect(function() { let list: List<string> = setupList(Types.string); list.add(""); }).to.not.throw();
    });
    it('should not throw an error when adding a boolean to a list of booleans', () => {
        expect(function() { let list: List<boolean> = setupList(Types.boolean); list.add(true); }).to.not.throw();
    });
    it('should not throw an error when adding a date to a list of dates', () => {
        expect(function() { let list: List<Date> = setupList(Types.date); list.add(new Date()); }).to.not.throw();
    });
});

describe('addRange method -> calls add()', () => {
    let items: string[] = ["one", "two", "three", "four", "five"];
    let list: List<string> = setupList(Types.string);
    it('should add five elements from an array to an empty list and return file as length of the list', () => {
        list.addRange(items);
        let length: number = list.length;
        expect(length).to.equal(5);
    });
    it('should add five elements from a list to an empty list and return file as length of the list', () => {
        let newList: List<string> = setupList(Types.string);
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
        list = setupList(Types.boolean, [true, false, true, true]);
        list.clear();
        let length: number = list.length;
        expect(length).to.equal(0);
    });
    it('should return a length of zero after execution on a list with zero elements', () => {
        list = setupList(Types.boolean);
        list.clear();
        let length: number = list.length;
        expect(length).to.equal(0);
    });
});

describe('contains method', () => {
    let list: List<string> = setupList(Types.string, ["one", "two", "three", "four"]);
    it('should return true on value "three" in a prepared list which contains this value', () => {
        
        let match: boolean = list.contains("three");
        expect(match).to.equal(true);
    });
    it('should return false on value "six" in a prepared list which does not contain this value', () => {
        
        let match: boolean = list.contains("six");
        expect(match).to.equal(false);
    });
    it('should return true on a date object (2017-01-01 00:00:00) in a prepared list which contains this value', () => {
        let list2: List<Date> = setupList(Types.date, [new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)])
        let date = new Date(2017,1,1,0,0,0);
        let match: boolean = list2.contains(date);
        expect(match).to.equal(true);
    });
});


function setupList(t: Types, initialValue?: any | any[]): any
{
    if (initialValue === undefined)
        {
        if (t === Types.boolean)
        {            
            return new List<boolean>();
        }
        else if (t === Types.date)
        {
            return new List<Date>();
        }
        else if (t === Types.number)
        {
            return new List<number>();
        }
        else if (t === Types.string)
        {
            return new List<string>();
        }
        }
    else
    {
        if (t === Types.boolean)
        {            
            return new List<boolean>(initialValue);
        }
        else if (t === Types.date)
        {
            return new List<Date>(initialValue);
        }
        else if (t === Types.number)
        {
            return new List<number>(initialValue);
        }
        else if (t === Types.string)
        {
            return new List<string>(initialValue);
        }
    }
}



