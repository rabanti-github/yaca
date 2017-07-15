import IForEachInterface from './interfaces/IForEachInterfaceList';
import ISortInterFace from './interfaces/ISortInterface';
import { IList } from './interfaces/IList';
import { IteratorItem } from './IteratorItem';
import { Sorter } from './Sorter';

/**
 * Class representing a standard ArrayList for generic Types with various List operations
 */
export default class List<T> implements Iterator<T>, IList<T>
{

    private _iList: object;
    private _length: number;
    private _iCounter: number;

    /** Default constructor */
    constructor();
    /**
     * Constructor with initial value
     * @param value Value of type T
     */
    constructor(value: T);
    /**
     * Constructor with an array as initial value
     * @param values Array of elements with type T
     */
    constructor(values: T[]);
    /**
     * Constructor with a List<T> as initial value
     * @param values List of elements with type T
     */
    constructor(values: List<T>);
    constructor(values?: T | T[] | List<T>) {
        this._iCounter = 0;
        this._length = 0;
        this._iList = [];
        if (values !== undefined) {
            if (Array.isArray(values)) {
                this.addRange(values);
            }
            else if (values instanceof List) {
                this.addRange(values);
            }
            else {
                this.add(values);
            }
        }
    }


    /**
     * Gets the number of elements of the List
     */
    public get length(): number {
        this._length = Object.keys(this._iList).length
        return this._length;
    }

    /**
     * Adds an element at the end of the List
     * @param value Value to add
     */
    public add(value: T) {
        this._iList[this._length] = value;
        this._length++;
    }

    /**
     * Adds a range of values
     * @param values Values as List<T>
     */
    public addRange(values: List<T>);
    /**
     * Adds a range of values
     * @param values Values as array of the type T
     */
    public addRange(values: T[]);
    public addRange(values: T[] | List<T>) {
        if (Array.isArray(values)) {
            for (let i: number = 0; i < values.length; i++) {
                this.add(values[i]);
            }
        }
        else {
            for (let i: number = 0; i < values.length; i++) {
                this.add(values.get(i));
            }
        }
    }

    /**
     * Updates a value of the List at the specified index position
     * @param index Index position (0 to n)
     * @param value New value
     */
    public set(index: number, value: T) {
        if (index < 0 || index > this._length - 1) {
            throw new Error("The index " + index + " is out of range.");
        }
        this._iList[index] = value;
    }

    /**
     * Inserts a new value at the bottom position of the List (index position 0)
     * @param value Value to insert
     */
    public push(value: T) {
        this.insertAtIndex(0, value);
    }

    /**
     * Inserts a new value at the top position of the List (end position / last element). This method is synonymous with add()
     * @param value Value to insert
     */
    public enqueue(value: T) {
        this.add(value);
    }

    /**
     * Inserts a new value at the defined index position. All values above (index +1) will be shifted to the next higher index. The last item of the List will be shifted to a new value
     * @param index Index position where to insert the value
     * @param value Value to insert
     */
    public insertAtIndex(index: number, value: T) {
        if (index < 0 || index > this._length) // allowed 0 to length (insert after last item)
        {
            throw new Error("The index " + index + " is out of range.");
        }
        let firstPart, secondPart: T[];
        if (index === 0) {
            firstPart = [];
        }
        else {
            firstPart = this.copyToInternal(0, index - 1, true);
        }
        if (index === this._length) {
            secondPart = [];
        }
        else {
            secondPart = this.copyToInternal(index, this._length - 1, true);
        }
        this.clear();
        let len: number = (firstPart as T[]).length;
        let len2: number = (secondPart as T[]).length;
        this.addRange(firstPart);
        this.add(value);
        this.addRange(secondPart);
    }


    /**
     * Removes the passed value at the first occurrence in the List
     * @param value Value to remove
     */
    public remove(value: T): boolean {
        if (this._length === 0) { return false; }
        let oIndex: number = this.indexOf(value);
        if (oIndex < 0) { return false; }
        else {
            let indices: List<number> = new List<number>(oIndex);
            this.removeAtIndices(indices);
            return true;
        }
    }

    /**
     * Removes the passed value at all positions in the List 
     * @param value Value to remove
     */
    public removeAll(value: T): boolean {
        if (this._length === 0) { return false; }
        let indices: List<number> = this.indicesOfAsList(value);
        if (indices.length === 0) {
            return false;
        }
        else {
            this.removeAtIndices(indices);
            return true;
        }
    }

    /**
     * Removes the value at the defined index. All values above will be shifted one index position down (index - 1)
     * @param index Index where to remove a value
     */
    public removeAt(index: number) {
        let i: List<number> = new List<number>(index);
    }

    /**
     * Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1)
     * @param indices Array of indices to remove
     */
    public removeAtIndices(indices: number[]);
    /**
     * Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1)
     * @param indices List of indices to remove
     */
    public removeAtIndices(indices: List<number>);
    public removeAtIndices(indices: List<number> | number[]) {
        let list: List<number>;
        if (Array.isArray(indices)) {
            list = new List<number>(indices);
        }
        else {
            list = indices;
        }
        let iLen = list.length;
        if (this._length === 0 || iLen === 0) { return; }
        let newList: List<T> = new List<T>();

        for (let i: number = 0; i < this._length; i++) {
            if (list.contains(i)) { continue; }
            newList.add(this._iList[i]);
        }
        this.clear();
        this._iList = newList.copyToArray();
        this._length = this.length;
    }

    /**
     * Removes the bottom element of the List and returns its value (index position 0). undefined will be returned if the List is empty
     */
    public pop(): T | undefined {
        if (this._length === 0) { return undefined; }
        let value: T = this._iList[0];
        this.removeAt(0);
        return value;
    }

    /**
     * Removes the top element of the List and returns its value (end position / last element). undefined will be returned if the List is empty
     */
    public dequeue(): T | undefined {
        if (this._length === 0) { return undefined; }
        let value: T = this._iList[this._length - 1];
        this.removeAt(this._length - 1);
        return value;
    }

    /**
     * Removes all elements of the List
     */
    public clear() {
        if (this._length === 0) { return; }
        else {
            this._iList = [];
            this._length = 0;
        }
    }

    /**
     * Gets the value of the List at the specified index position
     * @param index Index position (0 to n)
     */
    public get(index: number): T {
        let value: T = this._iList[index];
        if (value !== undefined) {
            return value;
        }
        else {
            throw new Error("The index " + index + " was not found in the List");
        }
    }


    /**
     * Copies the whole List to a new List
     */
    public getRange(): List<T>;
    /**
     * Copies the List to a new List from the specified starting index until the last entry of the List
     * @param startIndex Start index
     */
    public getRange(startIndex: number): List<T>;
    /**
     * Copies the List to a new List from the specified starting index to the specified end index of the List
     * @param startIndex Start index
     * @param endIndex End index
     */
    public getRange(startIndex: number, endIndex: number): List<T>;
    public getRange(start?: number, end?: number): List<T> {
        if (start === undefined) { start = 0; }
        if (end === undefined) { end = this._length - 1; }
        return this.copyToInternal(start, end, false);
    }

    /**
     * Copies the whole List to a new Array of the type T
     */
    public copyToArray(): T[];
    /**
     * Copies the List to a new Array of the type T, from the specified starting index until the last entry of the List
     * @param startIndex Start index
     */
    public copyToArray(startIndex: number): T[];
    /**
     * Copies the List to a new Array of the type T, from the specified starting index to the specified end index of the List
     * @param startIndex Start index
     * @param endIndex End index
     */
    public copyToArray(startIndex: number, endIndex: number): T[];
    public copyToArray(start?: number, end?: number): T[] {
        if (start === undefined) { start = 0; }
        if (end === undefined) { end = this._length - 1; }
        return this.copyToInternal(start, end, true);
    }

    /**
     * Gets the index of the first occurrence of the passed value
     * @param value Value to check
     */
    public indexOf(value: T): number {
        return (this._iList as T[]).indexOf(value);
    }

    /**
     * Gets the index of the last occurrence of the passed value
     * @param value Value to check
     */
    public lastIndexOf(value: T): number {
        let indices: List<number> = this.indicesOfAsList(value);
        let len: number = indices.length;
        if (len === 0) { return -1; }
        return indices.get(len - 1);
    }

    /**
     * Gets an Array of the indices of all occurrences of the passed value
     * @param value Value to check
     */
    public indicesOf(value: T): number[] {
        return this.indicesOfInternal(value, false);
    }
    /**
     * Gets a List of the indices of all occurrences of the passed value
     * @param value Value to check
     */
    public indicesOfAsList(value: T): List<number> {
        return this.indicesOfInternal(value, true)
    }

    /**
     * Internal method to get the indices of a value in the List
     * @param value Value to check
     * @param asList If true, a List of indices will be returned, otherwise an Array
     */
    private indicesOfInternal(value: T, asList: boolean): any {
        let indices: List<number> = new List<number>();
        for (let i = 0; i < this._length; i++) {
            if (this._iList[i] === value) {
                indices.add(i);
            }
        }
        if (asList !== undefined && asList === true) {
            return indices;
        }
        else {
            return indices.copyToArray();
        }
    }

    /**
     * Check whether the List contains the specified value
     * @param value True if the value exists, otherwise false
     */
    public contains(value: T): boolean {
        if (this._length === 0) { return false; }
        let index: number = this.indexOf(value);
        if (index < 0) { return false; }
        else { return true; }
    }

    /**
     * Internal method to copy a range of values in the List to a List or Array
     * @param start Start index
     * @param end End Index
     * @param toArray If true, an Array will be returned, otherwise a List
     */
    private copyToInternal(start: number, end: number, toArray: boolean): any {
        if (start < 0 || start > end) {
            throw new Error("The passed start index " + start + " is out of range")
        }
        if (end < start || end > this._length - 1) {
            throw new Error("The passed end index " + end + " is out of range")
        }
        let output: any;
        if (toArray === true)
        { output = new Array(end - start + 1); }
        else
        { output = new List<T>(); }

        let counter: number = 0;
        for (let i: number = start; i <= end; i++) {
            if (toArray === true) {
                output[counter] = this._iList[i];
                counter++;
            }
            else {
                output.add(this._iList[i]);
            }
        }
        return output;
    }

    /**
     * Method to reverse the List
     */
    public reverse() {
        if (this._length === 0) { return; }
        let halfLength = Math.floor(this._length / 2);
        let i1 = 0;
        let i2 = this._length - 1;
        var temp: T = new Object as T;
        for (let i = 0; i < halfLength; i++) {
            this.swapValuesInternal(i1, i2, temp);
            i1++;
            i2--;
        }
    }

    /**
     * Swaps the values at the two defined index positions in the List
     * @param index1 Index position 1
     * @param index2 Index position 1
     */
    public swapValues(index1: number, index2: number) {
        if (index1 < 0 || index1 > this._length - 1 || index2 < 0 || index2 > this._length - 1) {
            throw new Error("The passed indices (" + index1 + ", " + index2 + ") are out of range");
        }
        var temp: T = new Object as T;
        this.swapValuesInternal(index1, index2, temp);
    }

    /**
     * Internal method to swap the values at the two defined index positions in the List. The method performs no validation and uses a predefined variable as temporary variable
     * @param index1 Index position 1
     * @param index2 Index position 1
     * @param tempParameter Temporary variable (Define it once outside of this method)
     */
    private swapValuesInternal(index1: number, index2: number, tempParameter: T) {
        tempParameter = this._iList[index1];
        this._iList[index1] = this._iList[index2];
        this._iList[index2] = tempParameter;
    }

    /**
     * Removes all duplicates of values in the List. All duplicates after the first occurrence of each value will be removed
     */
    public distinct() {
        if (this._length === 0) { return; }
        let newList: List<T> = new List<T>();
        for (let i = 0; i < this._length; i++) {
            if (newList.contains(this._iList[i]) === false) {
                newList.add(this._iList[i]);
            }
        }
        this.clear()
        this.addRange(newList);
    }

    // *********************************************** Implemented Interfaces

    /**
     * Sorts the List according to the passed function
     * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned.
     */
    sort(sortFunction: ISortInterFace<T>) {
        let qSort: Sorter<T> = new Sorter();
        qSort.quickSort(sortFunction, this._iList as T[], 0, this._length);
    }

    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    public forEach(callback: IForEachInterface<T>) {
        let done: boolean = false;
        let item: IteratorItem<T>;
        this._iCounter = 0;
        while (done === false) {
            item = this.next() as IteratorItem<T>;
            done = item.isLastEntry;
            callback(item.value);
        }
    }

    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0.
     * @param value Can be ignored
     */
    public next(value?: any): IteratorResult<T> {
        let val: any = this._iList[this._iCounter];
        let lastItem: boolean;
        if (this._iCounter < this.length - 1) {
            this._iCounter++;
            lastItem = false;
        }
        else {
            this._iCounter = 0;
            lastItem = true;
        }
        return new IteratorItem(val, lastItem);
    }

}


