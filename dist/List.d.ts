/// <reference types="node" />
import IForEachInterface from './interfaces/IForEachInterface';
import ISortInterFace from './interfaces/ISortInterface';
import { IList } from './interfaces/IList';
/**
 * Class representing a standard ArrayList for generic Types with various List operations
 */
export default class List<T> implements Iterator<T>, IList<T> {
    private _iList;
    private _length;
    private _iCounter;
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
    /**
     * Gets the number of elements of the List
     */
    readonly length: number;
    /**
     * Adds an element at the end of the List
     * @param value Value to add
     */
    add(value: T): void;
    /**
     * Adds a range of values
     * @param values Values as List<T>
     */
    addRange(values: List<T>): any;
    /**
     * Adds a range of values
     * @param values Values as array of the type T
     */
    addRange(values: T[]): any;
    /**
     * Updates a value of the List at the specified index position
     * @param index Index position (0 to n)
     * @param value New value
     */
    set(index: number, value: T): void;
    /**
     * Inserts a new value at the bottom position of the List (index position 0)
     * @param value Value to insert
     */
    push(value: T): void;
    /**
     * Inserts a new value at the top position of the List (end position / last element). This method is synonymous with add()
     * @param value Value to insert
     */
    enqueue(value: T): void;
    /**
     * Inserts a new value at the defined index position. All values above (index +1) will be shifted to the next higher index. The last item of the List will be shifted to a new value
     * @param index Index position where to insert the value
     * @param value Value to insert
     */
    insertAtIndex(index: number, value: T): void;
    /**
     * Removes the passed value at the first occurrence in the List
     * @param value Value to remove
     */
    remove(value: T): boolean;
    /**
     * Removes the passed value at all positions in the List
     * @param value Value to remove
     */
    removeAll(value: T): boolean;
    /**
     * Removes the value at the defined index. All values above will be shifted one index position down (index - 1)
     * @param index Index where to remove a value
     */
    removeAt(index: number): void;
    /**
     * Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1)
     * @param indices Array of indices to remove
     */
    removeAtIndices(indices: number[]): any;
    /**
     * Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1)
     * @param indices List of indices to remove
     */
    removeAtIndices(indices: List<number>): any;
    /**
     * Removes the bottom element of the List and returns its value (index position 0). undefined will be returned if the List is empty
     */
    pop(): T | undefined;
    /**
     * Removes the top element of the List and returns its value (end position / last element). undefined will be returned if the List is empty
     */
    dequeue(): T | undefined;
    /**
     * Removes all elements of the List
     */
    clear(): void;
    /**
     * Gets the value of the List at the specified index position
     * @param index Index position (0 to n)
     */
    get(index: number): T;
    /**
     * Copies the whole List to a new List
     */
    getRange(): List<T>;
    /**
     * Copies the List to a new List from the specified starting index until the last entry of the List
     * @param startIndex Start index
     */
    getRange(startIndex: number): List<T>;
    /**
     * Copies the List to a new List from the specified starting index to the specified end index of the List
     * @param startIndex Start index
     * @param endIndex End index
     */
    getRange(startIndex: number, endIndex: number): List<T>;
    /**
     * Copies the whole List to a new Array of the type T
     */
    copyToArray(): T[];
    /**
     * Copies the List to a new Array of the type T, from the specified starting index until the last entry of the List
     * @param startIndex Start index
     */
    copyToArray(startIndex: number): T[];
    /**
     * Copies the List to a new Array of the type T, from the specified starting index to the specified end index of the List
     * @param startIndex Start index
     * @param endIndex End index
     */
    copyToArray(startIndex: number, endIndex: number): T[];
    /**
     * Gets the index of the first occurrence of the passed value
     * @param value Value to check
     */
    indexOf(value: T): number;
    /**
     * Gets the index of the last occurrence of the passed value
     * @param value Value to check
     */
    lastIndexOf(value: T): number;
    /**
     * Gets an Array of the indices of all occurrences of the passed value
     * @param value Value to check
     */
    indicesOf(value: T): number[];
    /**
     * Gets a List of the indices of all occurrences of the passed value
     * @param value Value to check
     */
    indicesOfAsList(value: T): List<number>;
    /**
     * Internal method to get the indices of a value in the List
     * @param value Value to check
     * @param asList If true, a List of indices will be returned, otherwise an Array
     */
    private indicesOfInternal(value, asList);
    /**
     * Check whether the List contains the specified value
     * @param value True if the value exists, otherwise false
     */
    contains(value: T): boolean;
    /**
     * Internal method to copy a range of values in the List to a List or Array
     * @param start Start index
     * @param end End Index
     * @param toArray If true, an Array will be returned, otherwise a List
     */
    private copyToInternal(start, end, toArray);
    /**
     * Method to reverse the List
     */
    reverse(): void;
    /**
     * Swaps the values at the two defined index positions in the List
     * @param index1 Index position 1
     * @param index2 Index position 1
     */
    swapValues(index1: number, index2: number): void;
    /**
     * Internal method to swap the values at the two defined index positions in the List. The method performs no validation and uses a predefined variable as temporary variable
     * @param index1 Index position 1
     * @param index2 Index position 1
     * @param tempParameter Temporary variable (Define it once outside of this method)
     */
    private swapValuesInternal(index1, index2, tempParameter);
    /**
     * Removes all duplicates of values in the List. All duplicates after the first occurrence of each value will be removed
     */
    distinct(): void;
    /**
     * Sorts the List according to the passed function
     * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned.
     */
    sort(sortFunction: ISortInterFace<T>): void;
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    forEach(callback: IForEachInterface<T>): void;
    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0.
     * @param value Can be ignored
     */
    next(value?: any): IteratorResult<T>;
}
