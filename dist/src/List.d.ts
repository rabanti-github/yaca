/// <reference types="node" />
import IForEachInterface from "./interfaces/IForEachInterfaceList";
import ISortInterFace from "./interfaces/ISortInterface";
import { IList } from "./interfaces/IList";
/**
 * The class represents a standard (array)list for generic types with various list, stack and queue operations
 */
export default class List<T> implements Iterator<T>, IList<T> {
    private _iList;
    private _length;
    private _iCounter;
    private _iForEachControlCondition;
    /**
     * Gets the number of elements of the list
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
     * Adds an element at the end of the list
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
     * Removes all elements of the list
     */
    clear(): void;
    /**
     * Check whether the list contains the specified value
     * @param value Value to check for existence
     * @returns True if the value exists, otherwise false
     */
    contains(value: T): boolean;
    /**
     * Optional / syntactic method: Called in a forEach loop before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
     */
    continue(): void;
    /**
     * Copies the list to a new array of the type T, from the specified starting index until the last entry of the list
     * @param startIndex Start index
     * @returns An array of the copied values
     */
    copyToArray(startIndex: number): T[];
    /**
     * Copies the whole list to a new array of the type T
     * @returns An array of the copied values
     */
    copyToArray(): T[];
    /**
     * Copies the list to a new array of the type T, from the specified starting index to the specified end index of the list
     * @param startIndex Start index
     * @param endIndex End index
     * @returns An array of the copied values
     */
    copyToArray(startIndex: number, endIndex: number): T[];
    /**
     * Removes the top element of the list and returns its value (end position / last element). undefined will be returned if the list is empty
     * @returns The dequeued value or undefined if the list is empty
     */
    dequeue(): T | undefined;
    /**
     * Removes all duplicates of values in the list. All duplicates after the first occurrence of each value will be removed
     */
    distinct(): void;
    /**
     * Inserts a new value at the top position of the list (end position / last element). This method is synonymous with add()
     * @param value Value to insert
     */
    enqueue(value: T): void;
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the list
     */
    forEach(callback: IForEachInterface<T>): void;
    /**
     * Gets the value of the list at the specified index position
     * @param index Index position (0 to n)
     * @returns The value at the defined index position
     */
    get(index: number): T;
    /**
     * Copies the list to a new list from the specified starting index to the specified end index of the list
     * @param startIndex Start index (0 if undefined)
     * @param endIndex End index (end index if undefined)
     * @returns A list of values at the defined index positions
     */
    getRange(startIndex: number, endIndex: number): List<T>;
    /**
     * Copies the list to a new list from the specified starting index until the last entry of the list
     * @param startIndex Start index
     * @returns A list of values at the defined index positions
     */
    getRange(startIndex: number): List<T>;
    /**
     * Copies the whole list to a new list
     * @returns A list of all values
     */
    getRange(): List<T>;
    /**
     * Gets the index of the first occurrence of the passed value
     * @param value Value to check
     * @returns The index position of the value in the list. If not found, -1 will be returned
     */
    indexOf(value: T): number;
    /**
     * Gets an array of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns An array of indices of the specified value
     */
    indicesOf(value: T): number[];
    /**
     * Gets a list of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns A list of indices of the specified value
     */
    indicesOfAsList(value: T): List<number>;
    /**
     * Inserts a new value at the defined index position. All values above (index +1) will be pushed to the next higher index. The last item of the list will be pushed to a new value
     * @param index Index position where to insert the value
     * @param value Value to insert
     */
    insertAtIndex(index: number, value: T): void;
    /**
     * Gets the index of the last occurrence of the passed value
     * @param value Value to check
     * @returns The last index position of the specified value in the list
     */
    lastIndexOf(value: T): number;
    /**
     * Method to get the next value of an iterator. If the last item of the list is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
     * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
     * @returns An IteratorResult object containing a value
     */
    next(value?: any): IteratorResult<T>;
    /**
     * Returns the last element of a list without removing it (end of list). Returns undefined if the list is empty
     * @return The last value of the list. Undefined will be returned if the list is empty
     */
    peek(): T | undefined;
    /**
     * Removes the bottom element of the list and returns its value (index position 0). Undefined will be returned if the list is empty
     * @return The last removed value. Undefined will be returned if the list is empty
     */
    pop(): T | undefined;
    /**
     * Inserts a new value at the bottom position of the list (index position 0)
     * @param value Value to insert
     */
    push(value: T): void;
    /**
     * Removes the passed value at the first occurrence in the list
     * @param value Value to remove
     * @returns True if the value could be removed
     */
    remove(value: T): boolean;
    /**
     * Removes the passed value at all positions in the list
     * @param value Value to remove
     * @returns True if the value could be removed in the whole list
     */
    removeAll(value: T): boolean;
    /**
     * Removes the value at the defined index. All values above will be pushed back one index position down (index - 1)
     * @param index Index where to remove a value
     */
    removeAt(index: number): void;
    /**
     * Removes all values at the defined indices. All values above a removes item will be pushed back one index position down (index - 1)
     * @param indices Array of indices to remove
     */
    removeAtIndices(indices: number[]): void;
    /**
     * Removes all values at the defined indices. All values above a removes item will be pushed back one index position down (index - 1)
     * @param indices List of indices to remove
     */
    removeAtIndices(indices: List<number>): void;
    /**
     * Method to reverse the list
     */
    reverse(): void;
    /**
     * Updates a value of the list at the specified index position
     * @param index Index position (0 to n)
     * @param value New value
     * @throws Throws an error if an undefined values was added
     */
    set(index: number, value: T): void;
    /**
     * Sorts the list according to the passed function
     * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned
     */
    sort(sortFunction: ISortInterFace<T>): void;
    /**
     * Sorts the list according to the default behavior (for basic / common types) or an implemented compareTo function
     * @throws Throws an error if no suitable sorting function could be found for the type of the values
     */
    sort(): void;
    /**
     * Swaps the values at the two defined index positions in the list
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
     * Internal method to copy a range of values in the list to a list or array
     * @param start Start index
     * @param end End index
     * @param toArray If true, an array will be returned, otherwise a list
     * @throws Throws an error if the start index was bigger than the end index
     * @returns An array or list of the copied values
     */
    private copyToInternal;
    /**
     * Internal method to get the state of a forEach flow control action (break or continue)
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
     * Internal method to get the indices of a value in the list
     * @param value Value to check
     * @param asList If true, a list of indices will be returned, otherwise an array
     * @returns An array or list of indices
     */
    private indicesOfInternal;
    /**
     * Internal method to swap the values at the two defined index positions in the list. The method performs no validation and uses a predefined variable as temporary variable
     * @param index1 Index position 1
     * @param index2 Index position 1
     * @param tempParameter Temporary variable (Define it once outside of this method)
     */
    private swapValuesInternal;
}
