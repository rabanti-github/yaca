/// <reference types="node" />
import IForEachInterface from './interfaces/IForEachInterfaceList';
import ISortInterFace from './interfaces/ISortInterface';
import { IList } from './interfaces/IList';
/**
 * Class representing a standard ArrayList for generic Types with various List operations
 */
export default class List<T> implements Iterator<T>, IList<T> {
    private _iList;
    private _length;
    private _iCounter;
    private _iForEachControlCondition;
    /**
     * Gets the number of elements of the List
     */
    readonly length: number;
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
     * Constructor with initial value
     * @param value Value of type T
     */
    constructor(value: T);
    /** Default constructor */
    constructor();
    /**
     * Adds an element at the end of the List
     * @param value Value to add
     */
    add(value: T): void;
    /**
     * Adds a range of values
     * @param values Values as List<T>
     */
    addRange(values: List<T>): void;
    /**
     * Adds a range of values
     * @param values Values as array of the type T
     */
    addRange(values: T[]): void;
    /**
     * Called in a forEach loop before a return keyword, the loop will be terminated immediately (break)
     */
    break(): void;
    /**
     * Removes all elements of the List
     */
    clear(): void;
    /**
 * Check whether the List contains the specified value
 * @param value Value to check for existence
 * @returns True if the value exists, otherwise false
 */
    contains(value: T): boolean;
    /**
    * Optional / syntactic function: Called in a forEach before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
    */
    continue(): void;
    /**
     * Copies the List to a new Array of the type T, from the specified starting index until the last entry of the List
     * @param startIndex Start index
     * @returns An Array of the copied values
     */
    copyToArray(startIndex: number): T[];
    /**
     * Copies the whole List to a new Array of the type T
     * @returns An Array of the copied values
     */
    copyToArray(): T[];
    /**
     * Copies the List to a new Array of the type T, from the specified starting index to the specified end index of the List
     * @param startIndex Start index
     * @param endIndex End index
     * @returns An Array of the copied values
     */
    copyToArray(startIndex: number, endIndex: number): T[];
    /**
     * Removes the top element of the List and returns its value (end position / last element). undefined will be returned if the List is empty
     * @returns The dequeued value or undefined if the List is empty
     */
    dequeue(): T | undefined;
    /**
     * Removes all duplicates of values in the List. All duplicates after the first occurrence of each value will be removed
     */
    distinct(): void;
    /**
     * Inserts a new value at the top position of the List (end position / last element). This method is synonymous with add()
     * @param value Value to insert
     */
    enqueue(value: T): void;
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    forEach(callback: IForEachInterface<T>): void;
    /**
     * Gets the value of the List at the specified index position
     * @param index Index position (0 to n)
     * @returns The value at the defined index position
     */
    get(index: number): T;
    /**
     * Copies the List to a new List from the specified starting index to the specified end index of the List
     * @param startIndex Start index (0 if undefined)
     * @param endIndex End index (end index if undefined)
     * @returns A List of values at the defined index positions
     */
    getRange(startIndex: number, endIndex: number): List<T>;
    /**
     * Copies the List to a new List from the specified starting index until the last entry of the List
     * @param startIndex Start index
     * @returns A List of values at the defined index positions
     */
    getRange(startIndex: number): List<T>;
    /**
     * Copies the whole List to a new List
     * @returns A List of all values
     */
    getRange(): List<T>;
    /**
     * Gets the index of the first occurrence of the passed value
     * @param value Value to check
     * @returns The index position of the value in the List. If not found, -1 will be returned
     */
    indexOf(value: T): number;
    /**
     * Gets an Array of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns An Array of indices of the specified value
     */
    indicesOf(value: T): number[];
    /**
     * Gets a List of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns A List of indices of the specified value
     */
    indicesOfAsList(value: T): List<number>;
    /**
    * Inserts a new value at the defined index position. All values above (index +1) will be shifted to the next higher index. The last item of the List will be shifted to a new value
    * @param index Index position where to insert the value
    * @param value Value to insert
    */
    insertAtIndex(index: number, value: T): void;
    /**
     * Gets the index of the last occurrence of the passed value
     * @param value Value to check
     * @returns The last index position of the specified value in the List
     */
    lastIndexOf(value: T): number;
    /**
    * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
    * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
    * @returns An IteratorResult object containing a value
    */
    next(value?: any): IteratorResult<T>;
    /**
     * Returns the last element of a list without removing it (end of list). Returns undefined if the list is empty
     * @return The last value of the list. Undefined will be returned if the List is empty
     */
    peek(): T | undefined;
    /**
     * Removes the bottom element of the List and returns its value (index position 0). undefined will be returned if the List is empty
     * @return The last removed value. Undefined will be returned if the List is empty
     */
    pop(): T | undefined;
    /**
     * Inserts a new value at the bottom position of the List (index position 0)
     * @param value Value to insert
     */
    push(value: T): void;
    /**
     * Removes the passed value at the first occurrence in the List
     * @param value Value to remove
     * @returns True if the value could be removed
     */
    remove(value: T): boolean;
    /**
     * Removes the passed value at all positions in the List
     * @param value Value to remove
     * @returns True if the value could be removed in the whole List
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
    removeAtIndices(indices: number[]): void;
    /**
     * Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1)
     * @param indices List of indices to remove
     */
    removeAtIndices(indices: List<number>): void;
    /**
     * Method to reverse the List
     */
    reverse(): void;
    /**
     * Updates a value of the List at the specified index position
     * @param index Index position (0 to n)
     * @param value New value
     * @throws Throws an error if an undefined values was added
     */
    set(index: number, value: T): void;
    /**
     * Sorts the List according to the passed function
     * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned.
     */
    sort(sortFunction: ISortInterFace<T>): void;
    /**
     * Sorts the List according to the default behavior (for basic / common types) or an implemented compareTo function
     * @throws Throws an error if no suitable sorting function could be found for the type of the values
     */
    sort(): void;
    /**
     * Swaps the values at the two defined index positions in the List
     * @param index1 Index position 1
     * @param index2 Index position 1
     */
    swapValues(index1: number, index2: number): void;
    /**
     * Internal method to add a value to the list (without checks)
     * @param value Value to add
     */
    private addInternal;
    /**
     * Internal method to copy a range of values in the List to a List or Array
     * @param start Start index
     * @param end End Index
     * @param toArray If true, an Array will be returned, otherwise a List
     * @throws Throws an error if the start index was bigger than the end index
     * @returns An Array or List of the copied values
     */
    private copyToInternal;
    /**
     * Internal function to get the state of a forEach flow control action (break or continue)
     * @returns Returns 1 at a break condition and 2 at a continue condition (0 is default)
     */
    private getForEachControlCondition;
    /**
     * Checks the validity of an index position (>= 0 < length, integer)
     * @param index Index position to check
     * @param allowUpperBound If true, an index position of n is valid, otherwise n-1
     */
    private indexCheck;
    /**
     * Internal method to get the indices of a value in the List
     * @param value Value to check
     * @param asList If true, a List of indices will be returned, otherwise an Array
     * @returns An Array or List of indices
     */
    private indicesOfInternal;
    /**
     * Internal method to swap the values at the two defined index positions in the List. The method performs no validation and uses a predefined variable as temporary variable
     * @param index1 Index position 1
     * @param index2 Index position 1
     * @param tempParameter Temporary variable (Define it once outside of this method)
     */
    private swapValuesInternal;
}
