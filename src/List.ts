import IForEachInterface from "./interfaces/IForEachInterfaceList";
import ISortInterFace from "./interfaces/ISortInterface";
import { IList } from "./interfaces/IList";
import { IteratorItem } from "./IteratorItem";
import { Sorter } from "./Sorter";
var isEqual = require("lodash.isequal");

/**
 * The class represents a standard (array)list for generic types with various list, stack and queue operations
 */
export default class List<T> implements Iterator<T>, IList<T> {
  // ############### P R I V A T E   V A R I A B L E S ###############

  private _iList: object;
  private _length: number;
  private _iCounter: number;
  private _iForEachControlCondition: number;

  // ############### P R O P E R T I E S ###############

  /**
   * Gets the number of elements of the list
   */
  public get length(): number {
    this._length = Object.keys(this._iList).length;
    return this._length;
  }

  // ############### C O N S T R U C T O R S ###############
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
  constructor(values?: T | T[] | List<T>) {
    this._iCounter = 0;
    this._length = 0;
    this._iList = [];
    if (values !== undefined) {
      if (Array.isArray(values)) {
        this.addRange(values);
      } else if (values instanceof List) {
        this.addRange(values);
      } else {
        this.add(values);
      }
    }
  }

  // ############### P U B L I C   F U N C T I O N S ###############

  /**
   * Adds an element at the end of the list
   * @param value Value to add
   */
  public add(value: T): void {
    if (value === undefined) {
      throw new Error("An undefined value cannot be added to a list");
    }
    this.addInternal(value);
  }

  /**
   * Adds a range of values
   * @param values Values as List<T>
   */
  public addRange(values: List<T>): void;
  /**
   * Adds a range of values
   * @param values Values as array of the type T
   */
  public addRange(values: T[]): void;
  public addRange(values: T[] | List<T>): void {
    if (Array.isArray(values)) {
      for (let i: number = 0; i < values.length; i++) {
        this.add(values[i]);
      }
    } else {
      for (let i: number = 0; i < values.length; i++) {
        this.add(values.get(i));
      }
    }
  }

  /**
   * Called in a forEach loop before a return keyword, the loop will be terminated immediately (break)
   */
  public break(): void {
    this._iForEachControlCondition = 1;
  }

  /**
   * Removes all elements of the list
   */
  public clear(): void {
    if (this._length === 0) {
      return;
    } else {
      this._iList = [];
      this._length = 0;
    }
  }

  /**
   * Check whether the list contains the specified value
   * @param value Value to check for existence
   * @returns True if the value exists, otherwise false
   */
  public contains(value: T): boolean {
    if (this._length === 0) {
      return false;
    }
    let index: number = this.indexOf(value);
    if (index < 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Optional / syntactic method: Called in a forEach loop before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
   */
  public continue(): void {
    this._iForEachControlCondition = 2;
  }

  /**
   * Copies the list to a new array of the type T, from the specified starting index until the last entry of the list
   * @param startIndex Start index
   * @returns An array of the copied values
   */
  public copyToArray(startIndex: number): T[];
  /**
   * Copies the whole list to a new array of the type T
   * @returns An array of the copied values
   */
  public copyToArray(): T[];
  /**
   * Copies the list to a new array of the type T, from the specified starting index to the specified end index of the list
   * @param startIndex Start index
   * @param endIndex End index
   * @returns An array of the copied values
   */
  public copyToArray(startIndex: number, endIndex: number): T[];
  public copyToArray(start?: number, end?: number): T[] {
    if (this._length === 0) {
      return new Array() as T[];
    }
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = this._length - 1;
    }
    return this.copyToInternal(start, end, true) as T[];
  }

  /**
   * Removes the top element of the list and returns its value (end position / last element). undefined will be returned if the list is empty
   * @returns The dequeued value or undefined if the list is empty
   */
  public dequeue(): T | undefined {
    if (this._length === 0) {
      return undefined;
    }
    let value: T = this._iList[this._length - 1];
    this.removeAt(this._length - 1);
    return value;
  }

  /**
   * Removes all duplicates of values in the list. All duplicates after the first occurrence of each value will be removed
   */
  public distinct(): void {
    if (this._length === 0) {
      return;
    }
    let newList: List<T> = new List<T>();
    for (let i = 0; i < this._length; i++) {
      if (newList.contains(this._iList[i]) === false) {
        newList.addInternal(this._iList[i]);
      }
    }
    this.clear();
    this.addRange(newList);
  }

  /**
   * Inserts a new value at the top position of the list (end position / last element). This method is synonymous with add()
   * @param value Value to insert
   */
  public enqueue(value: T): void {
    this.add(value);
  }

  // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
  /**
   * Implementation of a forEach loop
   * @param callback Callback function to process the items of the list
   */
  public forEach(callback: IForEachInterface<T>): void {
    if (this._length === 0) {
      return;
    }
    let done: boolean = false;
    let item: IteratorItem<T>;
    this._iForEachControlCondition = 0;
    this._iCounter = 0;
    while (done === false) {
      if (this.getForEachControlCondition() === 1) {
        // break
        return;
      }
      item = this.next() as IteratorItem<T>;
      done = item.isLastEntry;
      callback(item.value);
    }
  }

  /**
   * Gets the value of the list at the specified index position
   * @param index Index position (0 to n)
   * @returns The value at the defined index position
   */
  public get(index: number): T {
    let value: T = this._iList[index];
    if (value !== undefined) {
      return value;
    } else {
      throw new Error("The index " + index + " was not found in the list");
    }
  }

  /**
   * Copies the list to a new list from the specified starting index to the specified end index of the list
   * @param startIndex Start index (0 if undefined)
   * @param endIndex End index (end index if undefined)
   * @returns A list of values at the defined index positions
   */
  public getRange(startIndex: number, endIndex: number): List<T>;
  /**
   * Copies the list to a new list from the specified starting index until the last entry of the list
   * @param startIndex Start index
   * @returns A list of values at the defined index positions
   */
  public getRange(startIndex: number): List<T>;
  /**
   * Copies the whole list to a new list
   * @returns A list of all values
   */
  public getRange(): List<T>;
  public getRange(start?: number, end?: number): List<T> {
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = this._length - 1;
    }
    return this.copyToInternal(start, end, false) as List<T>;
  }

  /**
   * Gets the index of the first occurrence of the passed value
   * @param value Value to check
   * @returns The index position of the value in the list. If not found, -1 will be returned
   */
  public indexOf(value: T): number {
    for (let i: number = 0; i < this._length; i++) {
      if (isEqual(this._iList[i], value) === true) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Gets an array of the indices of all occurrences of the passed value
   * @param value Value to check
   * @returns An array of indices of the specified value
   */
  public indicesOf(value: T): number[] {
    return this.indicesOfInternal(value, false) as number[];
  }
  /**
   * Gets a list of the indices of all occurrences of the passed value
   * @param value Value to check
   * @returns A list of indices of the specified value
   */
  public indicesOfAsList(value: T): List<number> {
    return this.indicesOfInternal(value, true) as List<number>;
  }

  /**
   * Inserts a new value at the defined index position. All values above (index +1) will be pushed to the next higher index. The last item of the list will be pushed to a new value
   * @param index Index position where to insert the value
   * @param value Value to insert
   */
  public insertAtIndex(index: number, value: T): void {
    this.indexCheck(index, true); // allowed 0 to length (insert after last item)
    let firstPart, secondPart: T[];
    if (index === 0) {
      firstPart = [];
    } else {
      firstPart = this.copyToInternal(0, index - 1, true) as T[];
    }
    if (index === this._length) {
      secondPart = [];
    } else {
      secondPart = this.copyToInternal(index, this._length - 1, true) as T[];
    }
    this.clear();
    this.addRange(firstPart);
    this.add(value);
    this.addRange(secondPart);
  }

  /**
   * Gets the index of the last occurrence of the passed value
   * @param value Value to check
   * @returns The last index position of the specified value in the list
   */
  public lastIndexOf(value: T): number {
    let indices: List<number> = this.indicesOfAsList(value);
    let len: number = indices.length;
    if (len === 0) {
      return -1;
    }
    return indices.get(len - 1);
  }

  // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
  /**
   * Method to get the next value of an iterator. If the last item of the list is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
   * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
   * @returns An IteratorResult object containing a value
   */
  public next(value?: any): IteratorResult<T> {
    let val: any = this._iList[this._iCounter];
    let lastItem: boolean;
    if (this._iCounter < this.length - 1) {
      this._iCounter++;
      lastItem = false;
    } else {
      this._iCounter = 0;
      lastItem = true;
    }
    if (value !== undefined && value === true) {
      lastItem = true;
    } // Break-condition
    return new IteratorItem(val, lastItem);
  }

  /**
   * Returns the last element of a list without removing it (end of list). Returns undefined if the list is empty
   * @return The last value of the list. Undefined will be returned if the list is empty
   */
  public peek(): T | undefined {
    if (this._length === 0) {
      return undefined;
    }
    return this._iList[this._length - 1];
  }

  /**
   * Removes the bottom element of the list and returns its value (index position 0). Undefined will be returned if the list is empty
   * @return The last removed value. Undefined will be returned if the list is empty
   */
  public pop(): T | undefined {
    if (this._length === 0) {
      return undefined;
    }
    let value: T = this._iList[0];
    this.removeAt(0);
    return value;
  }

  /**
   * Inserts a new value at the bottom position of the list (index position 0)
   * @param value Value to insert
   */
  public push(value: T): void {
    this.insertAtIndex(0, value);
  }

  /**
   * Removes the passed value at the first occurrence in the list
   * @param value Value to remove
   * @returns True if the value could be removed
   */
  public remove(value: T): boolean {
    if (this._length === 0) {
      return false;
    }
    let oIndex: number = this.indexOf(value);
    if (oIndex < 0) {
      return false;
    } else {
      let indices: List<number> = new List<number>(oIndex);
      this.removeAtIndices(indices);
      return true;
    }
  }

  /**
   * Removes the passed value at all positions in the list
   * @param value Value to remove
   * @returns True if the value could be removed in the whole list
   */
  public removeAll(value: T): boolean {
    if (this._length === 0) {
      return false;
    }
    let indices: List<number> = this.indicesOfAsList(value);
    if (indices.length === 0) {
      return false;
    } else {
      this.removeAtIndices(indices);
      return true;
    }
  }

  /**
   * Removes the value at the defined index. All values above will be pushed back one index position down (index - 1)
   * @param index Index where to remove a value
   */
  public removeAt(index: number): void {
    let i: List<number> = new List<number>(index);
    this.removeAtIndices(i);
  }

  /**
   * Removes all values at the defined indices. All values above a removes item will be pushed back one index position down (index - 1)
   * @param indices Array of indices to remove
   */
  public removeAtIndices(indices: number[]): void;
  /**
   * Removes all values at the defined indices. All values above a removes item will be pushed back one index position down (index - 1)
   * @param indices List of indices to remove
   */
  public removeAtIndices(indices: List<number>): void;
  public removeAtIndices(indices: List<number> | number[]): void {
    let list: List<number>;
    if (Array.isArray(indices)) {
      list = new List<number>(indices);
    } else {
      list = indices;
    }
    let iLen = list.length;
    if (this._length === 0 || iLen === 0) {
      return;
    }
    let newList: List<T> = new List<T>();
    for (let i: number = 0; i < iLen; i++) {
      this.indexCheck(list.get(i));
    }
    for (let i: number = 0; i < this._length; i++) {
      if (list.contains(i)) {
        continue;
      }
      newList.addInternal(this._iList[i]);
    }
    this.clear();
    this.addRange(newList);
    this._length = this.length;
  }

  /**
   * Method to reverse the list
   */
  public reverse(): void {
    if (this._length === 0) {
      return;
    }
    let halfLength = Math.floor(this._length / 2);
    let i1 = 0;
    let i2 = this._length - 1;
    var temp: T = new Object() as T;
    for (let i = 0; i < halfLength; i++) {
      this.swapValuesInternal(i1, i2, temp);
      i1++;
      i2--;
    }
  }

  /**
   * Updates a value of the list at the specified index position
   * @param index Index position (0 to n)
   * @param value New value
   * @throws Throws an error if an undefined values was added
   */
  public set(index: number, value: T): void {
    this.indexCheck(index);
    if (value === undefined) {
      throw new Error("An undefined value cannot be set as value of a list");
    }
    this._iList[index] = value;
  }

  // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
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
  sort(sortFunction?: ISortInterFace<T>): void {
    if (this._length === 0) {
      return;
    }
    let qSort: Sorter<T> = new Sorter<T>(this._iList[0] as T); // Pass the 1st object as sample for type checking
    if (sortFunction !== undefined) {
      qSort.sortByFunction(sortFunction, this._iList as T[], 0, this._length);
    } else {
      if (qSort.hasCompareToImplemented === true) {
        qSort.sortByImplementation(this._iList as T[], 0, this._length);
      } else if (qSort.isCommonType === true) {
        qSort.sortByDefault(this._iList as T[], 0, this._length);
      } else {
        throw new Error(
          "No suitable comparison method (a<>b) was found to sort a list (a<b:-1; a==b;0 a>b: 1)"
        );
      }
    }
  }

  /**
   * Swaps the values at the two defined index positions in the list
   * @param index1 Index position 1
   * @param index2 Index position 1
   */
  public swapValues(index1: number, index2: number): void {
    this.indexCheck(index1);
    this.indexCheck(index2);
    var temp: T = new Object() as T;
    this.swapValuesInternal(index1, index2, temp);
  }

  // ############### P R I V A T E   F U N C T I O N S ###############

  /**
   * Internal method to add a value to the list (without checks)
   * @param value Value to add
   */
  private addInternal(value: T): void {
    this._iList[this._length] = value;
    this._length++;
  }

  /**
   * Internal method to copy a range of values in the list to a list or array
   * @param start Start index
   * @param end End index
   * @param toArray If true, an array will be returned, otherwise a list
   * @throws Throws an error if the start index was bigger than the end index
   * @returns An array or list of the copied values
   */
  private copyToInternal(
    start: number,
    end: number,
    toArray: boolean
  ): T[] | List<T> {
    this.indexCheck(start);
    this.indexCheck(end);
    if (start > end) {
      throw new Error(
        "The passed start index " +
          start +
          " cannot be greater than the end index " +
          end
      );
    }
    let output: any;
    if (toArray === true) {
      output = new Array(end - start + 1);
    } else {
      output = new List<T>();
    }

    let counter: number = 0;
    for (let i: number = start; i <= end; i++) {
      if (toArray === true) {
        output[counter] = this._iList[i];
        counter++;
      } else {
        output.addInternal(this._iList[i]);
      }
    }
    return output;
  }

  /**
   * Internal method to get the state of a forEach flow control action (break or continue)
   * @returns Returns 1 at a break condition and 2 at a continue condition (0 is default)
   */
  private getForEachControlCondition(): number {
    return this._iForEachControlCondition;
  }

  /**
   * Checks the validity of an index position (>= 0 < length, integer)
   * @param index Index position to check
   * @param allowUpperBound If true, an index position of n is valid, otherwise n-1
   */
  private indexCheck(index: number, allowUpperBound?: boolean): void {
    if (allowUpperBound !== undefined && allowUpperBound === true) {
      if (index < 0 || index > this._length) {
        throw new Error("The index " + index + " is out of range");
      }
    } else {
      if (index < 0 || index >= this._length) {
        throw new Error("The index " + index + " is out of range");
      }
    }
    if (index % 1 !== 0) {
      throw new Error(
        "The index " + index + " is invalid. Only integers are allowed"
      );
    }
  }

  /**
   * Internal method to get the indices of a value in the list
   * @param value Value to check
   * @param asList If true, a list of indices will be returned, otherwise an array
   * @returns An array or list of indices
   */
  private indicesOfInternal(
    value: T,
    asList: boolean
  ): number[] | List<number> {
    let indices: List<number> = new List<number>();
    for (let i = 0; i < this._length; i++) {
      if (isEqual(this._iList[i], value) === true) {
        indices.addInternal(i);
      }
    }
    if (asList !== undefined && asList === true) {
      return indices;
    } else {
      return indices.copyToArray();
    }
  }

  /**
   * Internal method to swap the values at the two defined index positions in the list. The method performs no validation and uses a predefined variable as temporary variable
   * @param index1 Index position 1
   * @param index2 Index position 1
   * @param tempParameter Temporary variable (Define it once outside of this method)
   */
  private swapValuesInternal(
    index1: number,
    index2: number,
    tempParameter: T
  ): void {
    tempParameter = this._iList[index1];
    this._iList[index1] = this._iList[index2];
    this._iList[index2] = tempParameter;
  }
}
