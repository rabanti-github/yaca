import {SortedDictionary} from '../src/SortedDictionary';
import {Comparer} from '../src/Comparer';
import {IComparer} from '../src/interfaces/IComparer';
import List from '../src/List';
import { expect } from 'chai';
import 'mocha';

// This file is to test the SortedDictionary<K,V> class

describe("SORTEDDICTIONARY<K,V>\n  #####################\nThe class is derived from Dictionary<K,V>. Only overridden or new functions and properties will be tested\n------------------------------------------\n",() => {


    describe('forEach method -> Behavior check', () => {
        let dict: SortedDictionary<number,string>  =  new SortedDictionary<number, string>();
        it('should return the concatenated string "-a-b-c-x" when performed', () => {
            dict.add(11, "a");
            dict.add(48, "b");
            dict.add(56, "c");
            dict.add(-13, "x");
            let value: string = "";
            dict.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-a-b-c-x");
        });
    });

    describe('getByIndex method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c"], [11,42,86]);
        it('should return the value 42 when performed with index 1', () => {
            let value: number = dict.getByIndex(1);
            expect(value).to.equal(42);
        });
        it('should throw an error if an index of -2 is passed', () => {
            expect(function()
            {
                let value: number = dict.getByIndex(-2);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 3 is passed on a dictionary with 3 elements', () => {
            expect(function()
            {
                let value: number = dict.getByIndex(3);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                let value: number = dict2.getByIndex(0);
                value = undefined;
            }).to.throw();
        });

    });

    describe('getByIndices method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","d"], [11,42,86,-0.257]);
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as array)', () => {
            let value: number[] = dict.getByIndices([1,2]);
            let match: boolean = false;
            if ((value[0] === 42 || value[0] === 86) && (value[1] === 42 || value[1] === 86)) {match = true;}
            expect(match).to.equal(true);
        });
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as List)', () => {
            let indices: List<number> = new List<number>([1,2]);
            let value: number[] = dict.getByIndices(indices);
            let match: boolean = false;
            if ((value[0] === 42 || value[0] === 86) && (value[1] === 42 || value[1] === 86)) {match = true;}
            expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', () => {
            expect(function()
            {
                let value: number[] = dict.getByIndices([1,-2]);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                let value: number[] = dict.getByIndices([1,4]);
                value = undefined;
            }).to.throw();
        });
    });

    describe('getByIndicesAsList method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","d"], [11,42,86,-0.257]);
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as array)', () => {
            let value: List<number> = dict.getByIndicesAsList([1,2]);
            let match: boolean = false;
            if (value.contains(42) && value.contains(86) && value.length === 2) {match = true;}
            expect(match).to.equal(true);
        });
        it('should return the values 42 and 86 when performed with the indices 1 and 2 (as List)', () => {
            let indices: List<number> = new List<number>([1,2]);
            let value: List<number> = dict.getByIndicesAsList(indices);
            let match: boolean = false;
            if (value.contains(42) && value.contains(86) && value.length === 2) {match = true;}
            expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', () => {
            expect(function()
            {
                let indices: List<number> = new List<number>([1,-2]);
                let value: List<number> = dict.getByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                let indices: List<number> = new List<number>([1,4]);
                let value: List<number> = dict.getByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
    });


    describe('getKeyByIndex method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
        it('should return the key "x" when performed with index 3', () => {
            let value: string = dict.getKeyByIndex(3);
            expect(value).to.equal("x");
        });
        it('should throw an error if an index of -2 is passed', () => {
            expect(function()
            {
                let value: string = dict.getKeyByIndex(-2);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 4 is passed on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                let value: string = dict.getKeyByIndex(4);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                let value: string = dict2.getKeyByIndex(0);
                value = undefined;
            }).to.throw();
        });

    });    

    describe('getKeysByIndices method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
        it('should return the keys "a" and "x" when performed with the indices 0 and 3 (as array)', () => {
            let value: string[] = dict.getKeysByIndices([0,3]);
            let match: boolean = false;
            if ((value[0] === "a" || value[0] === "x") && (value[1] === "a" || value[1] === "x")) {match = true;}
            expect(match).to.equal(true);
        });
        it('should return the keys "a" and "x" when performed with the indices 0 and 3 (as array)', () => {
            let indices: List<number> = new List<number>([0,3]);
            let value: string[] = dict.getKeysByIndices(indices);
            let match: boolean = false;
            if ((value[0] === "a" || value[0] === "x") && (value[1] === "a" || value[1] === "x")) {match = true;}
            expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', () => {
            expect(function()
            {
                let value: string[] = dict.getKeysByIndices([1,-2]);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                let value: string[] = dict.getKeysByIndices([1,4]);
                value = undefined;
            }).to.throw();
        });
    });

    describe('getKeysByIndicesAsList method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
        it('should return the keys "b" and "x" when performed with the indices 1 and 3 (as array)', () => {
            let value: List<string> = dict.getKeysByIndicesAsList([1,3]);
            let match: boolean = false;
            if (value.contains("b") && value.contains("x") && value.length === 2) {match = true;}
            expect(match).to.equal(true);
        });
        it('should return the keys "b" and "x" when performed with the indices 1 and 3 (as List)', () => {
            let indices: List<number> = new List<number>([1,3]);
            let value: List<string> = dict.getKeysByIndicesAsList(indices);
            let match: boolean = false;
            if (value.contains("b") && value.contains("x") && value.length === 2) {match = true;}
            expect(match).to.equal(true);
        });
        it('should throw an error if the indices 1 and -2 are passed', () => {
            expect(function()
            {
                let indices: List<number> = new List<number>([1,-2]);
                let value: List<string> = dict.getKeysByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
        it('should throw an error if the indices of 1 and 4 are passed on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                let indices: List<number> = new List<number>([1,4]);
                let value: List<string> = dict.getKeysByIndicesAsList(indices);
                value = undefined;
            }).to.throw();
        });
    });

    describe('setByIndex method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
        it('should return the value 111 if performed on index 2 and checked on key "c"', () => {
            dict.setByIndex(2,111);
            let value: number = dict.get("c")
            expect(value).to.equal(111);
        });
        
        it('should throw an error if an index of -2 is used', () => {
            expect(function()
            {
                dict.setByIndex(-2,55);
            }).to.throw();
        });
        
        it('should throw an error if an index of 99 is used on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                dict.setByIndex(99,55);
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                dict2.setByIndex(0,0);
            }).to.throw();
        });
    });  


    describe('setByIndices method', () => {
        let dict: SortedDictionary<string,number>  =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
        it('should return the value 111 at key "c" and 0.01 at key "a" if performed on index 0 and 2 (as arrays)', () => {
            dict.setByIndices([0,2],[0.01, 111]);
            let match: boolean;
            if (dict.get("a") === 0.01 && dict.get("c") === 111) {match = true;}
            expect(match).to.equal(true);
        });
        it('should return the value 112 at key "c" and 0.02 at key "a" if performed on index 0 and 2 (as Lists)', () => {
            let  iList: List<number> = new List<number>([0,2]);
            let  vList: List<number> = new List<number>([0.02,112]);
            dict.setByIndices(iList,vList);
            let match: boolean;
            if (dict.get("a") === 0.02 && dict.get("c") === 112) {match = true;}
            expect(match).to.equal(true);
        });
        it('should throw an error if the indices -2 and 1 are used', () => {
            expect(function()
            {
                dict.setByIndices([-2,1],[0.01, 111])
            }).to.throw();
        });
        
        it('should throw an error if the indices 2 and 99 are used on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                dict.setByIndices([2,99],[0.01, 111])
            }).to.throw();
        });
        it('should throw an error if the index 0 is passed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                dict2.setByIndices([0],[0.01]);
            }).to.throw();
        });
        it('should throw an error if the arrays of indices and values does not have the same length (indices = 2, values = 3)', () => {
            expect(function()
            {
                dict.setByIndices([2,3],[0.01, 111, 333])
            }).to.throw();
        });
        it('should throw an error if the arrays of indices and values does not have the same length (indices = 3 values = 1)', () => {
            expect(function()
            {
                dict.setByIndices([2,1,0],[0.01])
            }).to.throw();
        });
        it('should throw an error if the Lists of indices and values does not have the same length', () => {
            expect(function()
            {
                let  iList: List<number> = new List<number>([0,2,3]);
                let  vList: List<number> = new List<number>([0.02,112]);
                dict.setByIndices(iList,vList);
            }).to.throw();
        });
    });  

    describe('removeByIndex method', () => {
        let dict: SortedDictionary<string,number>;  
        it('should return the value 86 at index position 1 after removing this index previously', () => {
            dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
            dict.removeByIndex(1);
            let value: number = dict.getByIndex(1);
            expect(value).to.equal(86);
        });

        it('should return the concatenated string "-a-b-x" when performed with forEach after removal of index 2', () => {
            let dict2: SortedDictionary<number, string> = new SortedDictionary<number,string>();
            dict2.add(11, "a");
            dict2.add(48, "b");
            dict2.add(56, "c");
            dict2.add(-13, "x");
            dict2.removeByIndex(2);
            let value: string = "";
            dict2.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-a-b-x");
        });        
        
        it('should throw an error if an index of -2 is used', () => {
            expect(function()
            {
                dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
                dict.removeByIndex(-2);
            }).to.throw();
        });
        
        it('should throw an error if an index of 5 is used on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
                dict.removeByIndex(5);
            }).to.throw();
        });
        it('should throw an error if an index of 0 is passed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                dict2.removeByIndex(0);
            }).to.throw();
        });
    }); 
    
    describe('removeByIndices method', () => {
        let dict: SortedDictionary<string,number>;  
        it('should return the value 0 at index position 1 after removing the indices 1 and 2 previously (as array)', () => {
            dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
            dict.removeByIndices([1,2]);
            let value: number = dict.getByIndex(1);
            expect(value).to.equal(0);
        });

        it('should return the value 0 at index position 1 after removing the indices 1 and 2 previously (as List)', () => {
            dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
            let indices: List<number> = new List<number>([1,2]);
            dict.removeByIndices(indices);
            let value: number = dict.getByIndex(1);
            expect(value).to.equal(0);
        });        

        it('should return the concatenated string "-a-c-y" when performed with forEach after removal of indices 1, 3 and 4', () => {
            let dict2: SortedDictionary<number, string> = new SortedDictionary<number,string>();
            dict2.add(11, "a");
            dict2.add(48, "b");
            dict2.add(56, "c");
            dict2.add(-13, "x");
            dict2.add(-3, "z");
            dict2.add(0.254, "y");
            dict2.removeByIndices([1,3,4]);
            let value: string = "";
            dict2.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-a-c-y");
        });        
        
        it('should throw an error if an the indices 0 and -2 are used', () => {
            expect(function()
            {
                dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
                dict.removeByIndices([-2,0]);
            }).to.throw();
        });

        it('should not throw an error if an empty indices array is passed', () => {
            expect(function()
            {
                dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
                dict.removeByIndices([]);
            }).not.to.throw();
        });
        
        it('should throw an error if the indices 1 and 5 are used on a SortedDictionary with 4 elements', () => {
            expect(function()
            {
                dict =  new SortedDictionary<string, number>(["a","b","c","x"], [11,42,86,0]);
                dict.removeByIndices([1,5]);
            }).to.throw();
        });
        it('should throw an error if the indices of 0, 1 and 2 are passed on a SortedDictionary with 2 elements', () => {
            expect(function()
            {
                dict =  new SortedDictionary<string, number>(["a","b"], [11,42]);
                dict.removeByIndices([0,1,2]);
            }).to.throw();
        });
    }); 
    
    describe('sortByKey method', () => {
        let dict: SortedDictionary<number,string>;  
        it('should return the concatenated string "-x-a-b-c" when performed without a comparison function as argument', () => {
            dict = new SortedDictionary<number,string>();
            dict.add(11, "a");
            dict.add(48, "b");
            dict.add(56, "c");
            dict.add(-13, "x");
            dict.sortByKey();
            let value: string = "";
            dict.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-x-a-b-c");
        });
        it('should not throw an error if performed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                dict2.sortByKey();
            }).not.to.throw();
        });
        it('should return the concatenated string "-x-a-b-c" when performed with a comparison function for Dates as argument', () => {
            let dict2: SortedDictionary<Date, string> = new SortedDictionary<Date,string>();
            dict2.add(new Date(1995,1,1), "a");
            dict2.add(new Date(1996,1,1), "b");
            dict2.add(new Date(1999,1,1), "c");
            dict2.add(new Date(1994,1,1), "x");
            dict2.sortByKey(Comparer.compareDates);
            let value: string = "";
            dict2.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-x-a-b-c");
        });
        it('should return the concatenated string "-x-a-b-c" when performed with a implemented compareTo function in a test class', () => {
            let dict2: SortedDictionary<SortTestClass, string> = new SortedDictionary<SortTestClass,string>();
            dict2.add(new SortTestClass("D"), "c");
            dict2.add(new SortTestClass("B"), "a");
            dict2.add(new SortTestClass("C"), "b");
            dict2.add(new SortTestClass("A"), "x");
            dict2.sortByKey();
            let value: string = "";
            dict2.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-x-a-b-c");
        });
        it('should throw an error when performed with a test class without implementation of a compareTo function', () => {
            expect(function()
            {
                let dict2: SortedDictionary<SortTestClass2, string> = new SortedDictionary<SortTestClass2,string>();
                dict2.add(new SortTestClass2("D"), "c");
                dict2.add(new SortTestClass2("B"), "a");
                dict2.sortByKey();
            }).to.throw();
        });
    });  
    
    
    describe('sortByValue method', () => {
        let dict: SortedDictionary<number,string>;  
        it('should return the concatenated string "-a-b-c-x" when performed without a comparison function as argument', () => {
            dict = new SortedDictionary<number,string>();
            dict.add(11, "a");
            dict.add(48, "x");
            dict.add(56, "c");
            dict.add(-13, "b");
            dict.sortByValue();
            let value: string = "";
            dict.forEach(item => {
                value = value + "-" + item.value;
            });
            expect(value).to.equal("-a-b-c-x");
        });
        it('should not throw an error if performed on a empty SortedDictionary', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string,number>  =  new SortedDictionary<string, number>();
                dict2.sortByValue();
            }).not.to.throw();
        });
        it('should return the concatenated string "-a-b-c-d" when performed with a comparison function for Dates as argument', () => {
            let dict2: SortedDictionary<string, Date> = new SortedDictionary<string,Date>();
            dict2.add("b", new Date(1995,1,1));
            dict2.add("c", new Date(1996,1,1));
            dict2.add("d", new Date(1999,1,1));
            dict2.add("a", new Date(1994,1,1));
            dict2.sortByValue(Comparer.compareDates);
            let value: string = "";
            dict2.forEach(item => {
                value = value + "-" + item.key;
            });
            expect(value).to.equal("-a-b-c-d");
        });
        it('should return the concatenated string "-A-B-C-D" when performed with a implemented compareTo function in a test class', () => {
            let dict2: SortedDictionary<number, SortTestClass> = new SortedDictionary<number, SortTestClass>();
            dict2.add(22,new SortTestClass("D"));
            dict2.add(33, new SortTestClass("B"));
            dict2.add(0, new SortTestClass("C"));
            dict2.add(-10, new SortTestClass("A"));
            dict2.sortByValue();
            let value: string = "";
            dict2.forEach(item => {
                value = value + "-" + item.value.value;
            });
            expect(value).to.equal("-A-B-C-D");
        });
        it('should throw an error when performed with a test class without implementation of a compareTo function', () => {
            expect(function()
            {
                let dict2: SortedDictionary<string, SortTestClass2> = new SortedDictionary<string, SortTestClass2>();
                dict2.add("a", new SortTestClass2("D"));
                dict2.add("b", new SortTestClass2("B"));
                dict2.sortByValue();
            }).to.throw();
        });
    });   


/************ */
});

class SortTestClass implements IComparer<SortTestClass>
{
    public value: string;
    compareTo( other: SortTestClass ): number
    {
      return Comparer.compareStrings(this.value, other.value)
    }

    constructor(value: string)
    {
        this.value = value;
    }

    toString()
    {
       return this.value; 
    }

}

class SortTestClass2
{
    public value: string;

    constructor(value: string)
    {
        this.value = value;
    }

    toString()
    {
       return this.value; 
    }

}