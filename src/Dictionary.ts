import IForEachInterface from './interfaces/IForEachInterface';
import ISortInterFace from './interfaces/ISortInterface';
import { IDictionary } from './interfaces/IDictionary';
import { IteratorItem } from './IteratorItem';
import { Sorter } from './Sorter';
import  List  from './List';

/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
export class Dictionary<K,V> implements  Iterator<V>, IDictionary<K,V>
//export default class Dictionary<K,V> implements  Iterator<V>, IDictionary<K,V>
{
    next(value?: any): IteratorResult<V> {
        throw new Error("Method not implemented.");
    }

    public getKeys(): K[]
    {
        
        if (this._length === 0) { return new Array() as K[]; }
        let temp: object[] = this.getKeyValuePairsInternal();
        let output = Array(temp.length) as K[];

        for(let i: number = 0; i < this._length; i++)
        {
            output[i] = temp[i]['key'][0];
        }
        return output;
    }

    public getKeysAsList(): List<K>
    {
        let keys: K[] = this.getKeys();
        return new List<K>(keys);
    }

    public getValues(): V[]
    {
        if (this._length === 0) { return new Array() as V[]; }
        let temp: object[] = this.getKeyValuePairsInternal();
        let output = Array(temp.length) as V[];

        for(let i: number = 0; i < this._length; i++)
        {
            output[i] = temp[i]['value'][1];
        }
        return output;
    }

    public getValuesAsList(): List<V>
    {
        let values: V[] = this.getValues();
        return new List<V>(values);
        
    }
    
    private getHashCode(key: K): string
    {
        if (key === undefined)
        {
            throw new Error("No valid key was defined. The key must not be empty or undefined");
        }        
        //let temp = key as Object;
        return key.toString();
    }
    
    private getKeyValuePairsInternal(): object[]
    {
        let output: object[] = new Array(this._length) as object[];
        let item: object;
        //let x: V = this._iDict['asd'];
        //let item: IteratorItem<object> = new IteratorItem();
        //let output = new Array(this._length) as IteratorItem<object>[];
        let i: number = 0;
        let keys: string[] = Object.keys(this._iDict);
        keys.forEach(key => { 
            item = {'key': key, 'value': this._iDict[key]};

            //item = new IteratorItem( {'key': key, 'value': this._iDict[key]});
            output[i] = item;
            i++;
        });
        return output;
    }

    public getKeysByValuesAsList(values: V[]): List<K>;
    public getKeysByValuesAsList(values: List<V>): List<K>;
    public getKeysByValuesAsList(values: V[] | List<V>): List<K>
    {
        return this.getKeysByValuesAsListInternal(values, false);
    }

    public getKeysByValues(values: V[]): K[];
    public getKeysByValues(values: List<V>): K[];
    public getKeysByValues(values: V[] | List<V>): K[]
    {
        let list: List<K> = this.getKeysByValuesAsListInternal(values, false);
        return list.copyToArray();     
    }

    public getKeysByValueAsList(value: V): List<K>
    {
        let v: V[] = [value];
        return this.getKeysByValuesAsListInternal(v, false); 
    }

    private getKeysByValuesAsListInternal(values: V[] | List<V>, breakAfterFirst: boolean): List<K>{
       let list: List<K> = new List<K>();
       if (this._length === 0) { return list; }

        let val: V[];
        if (Array.isArray(values))
        {
            val = values;
        }
        else
        {
            val = values.copyToArray();
        }
        let len: number = val.length;
        if (len === 0) { return list; }
       let keys: string[] = Object.keys(this._iDict);
       let len2: number = keys.length;
       let j: number;
       let keyCheck: List<string> = new List<string>();
        for(let i: number = 0; i < len; i++)
        {
            for(j = 0; j < len2; j++)
            {
                if (this._iDict[keys[j]][1] === val[i])
                {
                    if (keyCheck.contains(keys[j])){ continue; }
                    list.add(this._iDict[keys[j]][0]);
                    if (breakAfterFirst === true) { return list; }
                    keyCheck.add(keys[j]);
                }
            }
        }
        return list;
    }

    public getKeysByValue(value: V): K[]{ 
        let list: List<K> = this.getKeysByValueAsList(value);
        return list.copyToArray();
    }

    public containsValues(values: V[]): boolean;
    public containsValues(values: List<V>): boolean;
    public containsValues(values: V[] | List<V>): boolean
    {
        let list: List<K> = this.getKeysByValuesAsListInternal(values, true);
       if (list.length > 0) { return true; }
       else { return false; }        
    }
    
    public containsValue(value: V): boolean
    {
       let v: V[] = [value];
       let list: List<K> = this.getKeysByValuesAsListInternal(v, true);
       if (list.length > 0) { return true; }
       else { return false; }
    }

    private _iDict: K[]; //{ string, K }[];
    private _length: number;
    private _iCounter: number;

    /** Default constructor */
    constructor();
    /**
     * Constructor with a Dictionary<K,V> as initial value
     * @param values Dictionary of elements with K and V as Keys and Values 
     */
    constructor(values: Dictionary<K,V>);
    /**
     * Constructor with initial value
     * @param value Value of type V
     * @param key Key of Type K
     */
    constructor(key: K, value: V);
    /**
     * Constructor with two arrays of the same length as initial value
     * @param values Array of values with type V
     * @param keys Array of keys with type K
     */
    constructor(keys: K[], values: V[]);
    /**
     * Constructor with two Lists of the same length as initial value
     * @param values List of values with type V
     * @param keys List of keys with type K
     */
    constructor(keys: List<K>, values: List<V>);    
    constructor(keys?: K | K[] | List<K> |  Dictionary<K, V>, values?: V | V[] | List<V>) {
        this._iCounter = 0;
        this._length = 0;
        this._iDict = [];
        if (keys !== undefined && values !== undefined) {
            if (Array.isArray(keys) && Array.isArray(values)) {
                this.addRange(keys as K[], values);
            }
            else if (keys instanceof List && values instanceof List) {
                this.addRange(keys as List<K>, values as List<V>);
            }
            else if (values instanceof Dictionary) {
                this.addRange(keys as Dictionary<K,V>);
            }
            else {
                this.add(keys as K, values as V);
            }
        }
    }



    /**
     * Gets the number of elements of the List
     */
    public get length(): number {
        this._length = Object.keys(this._iDict).length
        return this._length;
    }

    /**
     * Adds an element at the end of the List. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    public add(key: K, value: V)
    {
        if (value === undefined)
        {
            throw new Error("No value was defined to add as Dictionary element");
        }
        let hashcode: string = this.getHashCode(key);
        this._iDict[hashcode][0] = key;
        this._iDict[hashcode][1] = value;
        this._length++;
    }


    /**
     * Adds a range of keys and values
     * @param values Values as Dictionary<K,V>
     */
    public addRange(values: Dictionary<K, V>);
    /**
     * Adds a range of keys and values
     * @param values Values as array of the type V
     * @param keys Keys as array of Type K
     */
    public addRange(keys: K[], values: V[]);
    /**
     * Adds a range of keys and values as Lists of the same length
     * @param values Values as List<V>
     * @param keys Keys as List<K>
     */
    public addRange(keys: List<K>, values: List<V>);    
    public addRange(p1: Dictionary<K,V> | K[] | List<K>, p2?: V[] | List<V>) {
        let keys: K[];
        let values: V[];
        if (Array.isArray(p1) && Array.isArray(p2))
        {
            keys = p1 as K[];
            values = p2 as V[];
        }
        else if (p1 instanceof List && p2 instanceof List)
        {
            keys = p1.copyToArray();
            values = p2.copyToArray();
        }
        else if (p1 instanceof Dictionary)
        {
            keys = p1.getKeys();
            values = p1.getValues();
        }
        else
            {
                keys = [];
                values = [];
            }
        if (keys.length !== values.length)
        {
            throw new Error("The length of the passed key and value arrays / lists is not identical")
        }
        let len: number = keys.length;
        for(let i: number = 0; i < len; i++)
        {
            this.add(keys[i], values[i]);
        }
    }

    /**
     * Updates a value of the Dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    public set(key: K, value: V) {
        this.add(key, value);
    }


    /**
     * Removes the passed key in the Dictionary. The method returns true if the key was found and removed, otherwise false
     * @param value Key (and attached value) to remove
     */
    public remove(key: K): boolean {
        if (this._length === 0) { return false; }
        let hashcode: string = this.getHashCode(key);
        if (this._iDict[hashcode][0] === undefined){ return false }
        delete this._iDict[hashcode];
        this._length--;
        return true;
        }
    

    public removeByValue(value: V): boolean
    {
        if (this.length < 1) { return false; }
        let keys: string[] = Object.keys(this._iDict);
        let len = keys.length;
        let counter: number = this._length;
        for(let i: number = 0; i < len; i++)
        {
            if (this._iDict[keys[i]][1] === value)
            {
                delete this._iDict[keys[i]];
                this._length--;                
            }
        }
        if (this._length !== counter) { return true; }
        else { return false; }
    }


    /**
     * Removes all values from the Dictionary.
     * @param values Array of values to remove
     */
    public removeByValues(values: V[]);
    /**
     * Removes all values from the Dictionary.
     * @param values List of values to remove
     */
    public removeByValues(values: List<V>);
    public removeByValues(values: List<V> | V[]) {
        let array: V[];
        if (Array.isArray(values)) {
            array = values;
        }
        else {
            array = (values as List<V>).copyToArray();
        }
        let iLen = array.length;
        if (this._length === 0 || iLen === 0) { return; }
        let keyList: List<K>;
        for (let i: number = 0; i < iLen; i++) {
            keyList =
        }

        //let newList: List<T> = new List<T>();

        for (let i: number = 0; i < this._length; i++) {
            if (list.containsValue(array[i])) { continue; }
            newList.add(this._iList[i]);
        }
        this.clear();
        this._iList = newList.copyToArray();
        this._length = this.length;
    }

    // /**
    //  * Removes the bottom element of the List and returns its value (index position 0). undefined will be returned if the List is empty
    //  */
    // public pop(): T | undefined {
    //     if (this._length === 0) { return undefined; }
    //     let value: T = this._iList[0];
    //     this.removeAt(0);
    //     return value;
    // }

    // /**
    //  * Removes the top element of the List and returns its value (end position / last element). undefined will be returned if the List is empty
    //  */
    // public dequeue(): T | undefined {
    //     if (this._length === 0) { return undefined; }
    //     let value: T = this._iList[this._length - 1];
    //     this.removeAt(this._length - 1);
    //     return value;
    // }

    // /**
    //  * Removes all elements of the List
    //  */
    // public clear() {
    //     if (this._length === 0) { return; }
    //     else {
    //         this._iList = [];
    //         this._length = 0;
    //     }
    // }

    // /**
    //  * Gets the value of the List at the specified index position
    //  * @param index Index position (0 to n)
    //  */
    // public get(index: number): T {
    //     let value: T = this._iList[index];
    //     if (value !== undefined) {
    //         return value;
    //     }
    //     else {
    //         throw new Error("The index " + index + " was not found in the List");
    //     }
    // }


    // /**
    //  * Copies the whole List to a new List
    //  */
    // public getRange(): List<T>;
    // /**
    //  * Copies the List to a new List from the specified starting index until the last entry of the List
    //  * @param startIndex Start index
    //  */
    // public getRange(startIndex: number): List<T>;
    // /**
    //  * Copies the List to a new List from the specified starting index to the specified end index of the List
    //  * @param startIndex Start index
    //  * @param endIndex End index
    //  */
    // public getRange(startIndex: number, endIndex: number): List<T>;
    // public getRange(start?: number, end?: number): List<T> {
    //     if (start === undefined) { start = 0; }
    //     if (end === undefined) { end = this._length - 1; }
    //     return this.copyToInternal(start, end, false);
    // }

    // /**
    //  * Copies the whole List to a new Array of the type T
    //  */
    // public copyToArray(): T[];
    // /**
    //  * Copies the List to a new Array of the type T, from the specified starting index until the last entry of the List
    //  * @param startIndex Start index
    //  */
    // public copyToArray(startIndex: number): T[];
    // /**
    //  * Copies the List to a new Array of the type T, from the specified starting index to the specified end index of the List
    //  * @param startIndex Start index
    //  * @param endIndex End index
    //  */
    // public copyToArray(startIndex: number, endIndex: number): T[];
    // public copyToArray(start?: number, end?: number): T[] {
    //     if (start === undefined) { start = 0; }
    //     if (end === undefined) { end = this._length - 1; }
    //     return this.copyToInternal(start, end, true);
    // }

    // /**
    //  * Gets the index of the first occurrence of the passed value
    //  * @param value Value to check
    //  */
    // public indexOf(value: T): number {
    //     return (this._iList as T[]).indexOf(value);
    // }

    // /**
    //  * Gets the index of the last occurrence of the passed value
    //  * @param value Value to check
    //  */
    // public lastIndexOf(value: T): number {
    //     let indices: List<number> = this.indicesOfAsList(value);
    //     let len: number = indices.length;
    //     if (len === 0) { return -1; }
    //     return indices.get(len - 1);
    // }

    // /**
    //  * Gets an Array of the indices of all occurrences of the passed value
    //  * @param value Value to check
    //  */
    // public indicesOf(value: T): number[] {
    //     return this.indicesOfInternal(value, false);
    // }
    // /**
    //  * Gets a List of the indices of all occurrences of the passed value
    //  * @param value Value to check
    //  */
    // public indicesOfAsList(value: T): List<number> {
    //     return this.indicesOfInternal(value, true)
    // }

    // /**
    //  * Internal method to get the indices of a value in the List
    //  * @param value Value to check
    //  * @param asList If true, a List of indices will be returned, otherwise an Array
    //  */
    // private indicesOfInternal(value: T, asList: boolean): any {
    //     let indices: List<number> = new List<number>();
    //     for (let i = 0; i < this._length; i++) {
    //         if (this._iList[i] === value) {
    //             indices.add(i);
    //         }
    //     }
    //     if (asList !== undefined && asList === true) {
    //         return indices;
    //     }
    //     else {
    //         return indices.copyToArray();
    //     }
    // }

    // /**
    //  * Check whether the List contains the specified value
    //  * @param value True if the value exists, otherwise false
    //  */
    // public contains(value: T): boolean {
    //     if (this._length === 0) { return false; }
    //     let index: number = this.indexOf(value);
    //     if (index < 0) { return false; }
    //     else { return true; }
    // }

    // /**
    //  * Internal method to copy a range of values in the List to a List or Array
    //  * @param start Start index
    //  * @param end End Index
    //  * @param toArray If true, an Array will be returned, otherwise a List
    //  */
    // private copyToInternal(start: number, end: number, toArray: boolean): any {
    //     if (start < 0 || start > end) {
    //         throw new Error("The passed start index " + start + " is out of range")
    //     }
    //     if (end < start || end > this._length - 1) {
    //         throw new Error("The passed end index " + end + " is out of range")
    //     }
    //     let output: any;
    //     if (toArray === true)
    //     { output = new Array(end - start + 1); }
    //     else
    //     { output = new List<T>(); }

    //     let counter: number = 0;
    //     for (let i: number = start; i <= end; i++) {
    //         if (toArray === true) {
    //             output[counter] = this._iList[i];
    //             counter++;
    //         }
    //         else {
    //             output.add(this._iList[i]);
    //         }
    //     }
    //     return output;
    // }

    // /**
    //  * Method to reverse the List
    //  */
    // public reverse() {
    //     if (this._length === 0) { return; }
    //     let halfLength = Math.floor(this._length / 2);
    //     let i1 = 0;
    //     let i2 = this._length - 1;
    //     var temp: T = new Object as T;
    //     for (let i = 0; i < halfLength; i++) {
    //         this.swapValuesInternal(i1, i2, temp);
    //         i1++;
    //         i2--;
    //     }
    // }

    // /**
    //  * Swaps the values at the two defined index positions in the List
    //  * @param index1 Index position 1
    //  * @param index2 Index position 1
    //  */
    // public swapValues(index1: number, index2: number) {
    //     if (index1 < 0 || index1 > this._length - 1 || index2 < 0 || index2 > this._length - 1) {
    //         throw new Error("The passed indices (" + index1 + ", " + index2 + ") are out of range");
    //     }
    //     var temp: T = new Object as T;
    //     this.swapValuesInternal(index1, index2, temp);
    // }

    // /**
    //  * Internal method to swap the values at the two defined index positions in the List. The method performs no validation and uses a predefined variable as temporary variable
    //  * @param index1 Index position 1
    //  * @param index2 Index position 1
    //  * @param tempParameter Temporary variable (Define it once outside of this method)
    //  */
    // private swapValuesInternal(index1: number, index2: number, tempParameter: T) {
    //     tempParameter = this._iList[index1];
    //     this._iList[index1] = this._iList[index2];
    //     this._iList[index2] = tempParameter;
    // }

    // /**
    //  * Removes all duplicates of values in the List. All duplicates after the first occurrence of each value will be removed
    //  */
    // public distinct() {
    //     if (this._length === 0) { return; }
    //     let newList: List<T> = new List<T>();
    //     for (let i = 0; i < this._length; i++) {
    //         if (newList.contains(this._iList[i]) === false) {
    //             newList.add(this._iList[i]);
    //         }
    //     }
    //     this.clear()
    //     this.addRange(newList);
    // }

    // // *********************************************** Implemented Interfaces

    // /**
    //  * Sorts the List according to the passed function
    //  * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned.
    //  */
    // sort(sortFunction: ISortInterFace<T>) {
    //     let qSort: Sorter<T> = new Sorter();
    //     qSort.quickSort(sortFunction, this._iList as T[], 0, this._length);
    // }

    // /**
    //  * Implementation of a forEach loop
    //  * @param callback Callback function to process the items of the List
    //  */
    // public forEach(callback: IForEachInterface<T>) {
    //     let done: boolean = false;
    //     let item: IteratorItem<T>;
    //     this._iCounter = 0;
    //     while (done === false) {
    //         item = this.next() as IteratorItem<T>;
    //         done = item.isLastEntry;
    //         callback(item.value);
    //     }
    // }

    // /**
    //  * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0.
    //  * @param value Can be ignored
    //  */
    // public next(value?: any): IteratorResult<T> {
    //     let val: any = this._iList[this._iCounter];
    //     let lastItem: boolean;
    //     if (this._iCounter < this.length - 1) {
    //         this._iCounter++;
    //         lastItem = false;
    //     }
    //     else {
    //         this._iCounter = 0;
    //         lastItem = true;
    //     }
    //     return new IteratorItem(val, lastItem);
    // }

}


