import { IteratorItem } from './IteratorItem';
import { Sorter } from './Sorter';
var isEqual = require('lodash.isequal');
/**
 * Class representing a standard ArrayList for generic Types with various List operations
 */
export class List {
    constructor(values) {
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
    // ############### P R O P E R T I E S ###############
    /**
     * Gets the number of elements of the List
     */
    get length() {
        this._length = Object.keys(this._iList).length;
        return this._length;
    }
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Adds an element at the end of the List
     * @param value Value to add
     */
    add(value) {
        if (value === undefined) {
            throw new Error("An undefined value cannot be added to a list");
        }
        this._addInternal(value);
    }
    addRange(values) {
        if (Array.isArray(values)) {
            for (let i = 0; i < values.length; i++) {
                this.add(values[i]);
            }
        }
        else {
            for (let i = 0; i < values.length; i++) {
                this.add(values.get(i));
            }
        }
    }
    /**
     * Called in a forEach loop before a return keyword, the loop will be terminated immediately (break)
     */
    break() {
        this._iForEachControlCondition = 1;
    }
    /**
     * Removes all elements of the List
     */
    clear() {
        if (this._length === 0) {
            return;
        }
        else {
            this._iList = [];
            this._length = 0;
        }
    }
    /**
 * Check whether the List contains the specified value
 * @param value Value to check for existence
 * @returns True if the value exists, otherwise false
 */
    contains(value) {
        if (this._length === 0) {
            return false;
        }
        let index = this.indexOf(value);
        if (index < 0) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
    * Optional / syntactic function: Called in a forEach before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
    */
    continue() {
        this._iForEachControlCondition = 2;
    }
    copyToArray(start, end) {
        if (this._length === 0) {
            return new Array();
        }
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = this._length - 1;
        }
        return this._copyToInternal(start, end, true);
    }
    /**
     * Removes the top element of the List and returns its value (end position / last element). undefined will be returned if the List is empty
     * @returns The dequeued value or undefined if the List is empty
     */
    dequeue() {
        if (this._length === 0) {
            return undefined;
        }
        let value = this._iList[this._length - 1];
        this.removeAt(this._length - 1);
        return value;
    }
    /**
     * Removes all duplicates of values in the List. All duplicates after the first occurrence of each value will be removed
     */
    distinct() {
        if (this._length === 0) {
            return;
        }
        let newList = new List();
        for (let i = 0; i < this._length; i++) {
            if (newList.contains(this._iList[i]) === false) {
                newList._addInternal(this._iList[i]);
            }
        }
        this.clear();
        this.addRange(newList);
    }
    /**
     * Inserts a new value at the top position of the List (end position / last element). This method is synonymous with add()
     * @param value Value to insert
     */
    enqueue(value) {
        this.add(value);
    }
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    forEach(callback) {
        if (this._length === 0) {
            return;
        }
        let done = false;
        let item;
        this._iForEachControlCondition = 0;
        this._iCounter = 0;
        while (done === false) {
            if (this._getForEachControlCondition() === 1) {
                return;
            }
            item = this.next();
            done = item.done;
            callback(item.value);
        }
    }
    /**
     * Gets the value of the List at the specified index position
     * @param index Index position (0 to n)
     * @returns The value at the defined index position
     */
    get(index) {
        let value = this._iList[index];
        if (value !== undefined) {
            return value;
        }
        else {
            throw new Error("The index " + index + " was not found in the List");
        }
    }
    getRange(start, end) {
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = this._length - 1;
        }
        return this._copyToInternal(start, end, false);
    }
    /**
     * Gets the index of the first occurrence of the passed value
     * @param value Value to check
     * @returns The index position of the value in the List. If not found, -1 will be returned
     */
    indexOf(value) {
        for (let i = 0; i < this._length; i++) {
            if (isEqual(this._iList[i], value) === true) {
                return i;
            }
        }
        return -1;
    }
    /**
     * Gets an Array of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns An Array of indices of the specified value
     */
    indicesOf(value) {
        return this._indicesOfInternal(value, false);
    }
    /**
     * Gets a List of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns A List of indices of the specified value
     */
    indicesOfAsList(value) {
        return this._indicesOfInternal(value, true);
    }
    /**
    * Inserts a new value at the defined index position. All values above (index +1) will be shifted to the next higher index. The last item of the List will be shifted to a new value
    * @param index Index position where to insert the value
    * @param value Value to insert
    */
    insertAtIndex(index, value) {
        this._indexCheck(index, true); // allowed 0 to length (insert after last item)
        let firstPart, secondPart;
        if (index === 0) {
            firstPart = [];
        }
        else {
            firstPart = this._copyToInternal(0, index - 1, true);
        }
        if (index === this._length) {
            secondPart = [];
        }
        else {
            secondPart = this._copyToInternal(index, this._length - 1, true);
        }
        this.clear();
        this.addRange(firstPart);
        this.add(value);
        this.addRange(secondPart);
    }
    /**
     * Gets the index of the last occurrence of the passed value
     * @param value Value to check
     * @returns The last index position of the specified value in the List
     */
    lastIndexOf(value) {
        let indices = this.indicesOfAsList(value);
        let len = indices.length;
        if (len === 0) {
            return -1;
        }
        return indices.get(len - 1);
    }
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
    /**
    * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
    * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
    * @returns An IteratorResult object containing a value
    */
    next(value) {
        let val = this._iList[this._iCounter];
        let lastItem;
        if (this._iCounter < this.length - 1) {
            this._iCounter++;
            lastItem = false;
        }
        else {
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
     * @return The last value of the list. Undefined will be returned if the List is empty
     */
    peek() {
        if (this._length === 0) {
            return undefined;
        }
        return this._iList[this._length - 1];
    }
    /**
     * Removes the bottom element of the List and returns its value (index position 0). undefined will be returned if the List is empty
     * @return The last removed value. Undefined will be returned if the List is empty
     */
    pop() {
        if (this._length === 0) {
            return undefined;
        }
        let value = this._iList[0];
        this.removeAt(0);
        return value;
    }
    /**
     * Inserts a new value at the bottom position of the List (index position 0)
     * @param value Value to insert
     */
    push(value) {
        this.insertAtIndex(0, value);
    }
    /**
     * Removes the passed value at the first occurrence in the List
     * @param value Value to remove
     * @returns True if the value could be removed
     */
    remove(value) {
        if (this._length === 0) {
            return false;
        }
        let oIndex = this.indexOf(value);
        if (oIndex < 0) {
            return false;
        }
        else {
            let indices = new List(oIndex);
            this.removeAtIndices(indices);
            return true;
        }
    }
    /**
     * Removes the passed value at all positions in the List
     * @param value Value to remove
     * @returns True if the value could be removed in the whole List
     */
    removeAll(value) {
        if (this._length === 0) {
            return false;
        }
        let indices = this.indicesOfAsList(value);
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
    removeAt(index) {
        let i = new List(index);
        this.removeAtIndices(i);
    }
    removeAtIndices(indices) {
        let list;
        if (Array.isArray(indices)) {
            list = new List(indices);
        }
        else {
            list = indices;
        }
        let iLen = list.length;
        if (this._length === 0 || iLen === 0) {
            return;
        }
        let newList = new List();
        for (let i = 0; i < iLen; i++) {
            this._indexCheck(list.get(i));
        }
        for (let i = 0; i < this._length; i++) {
            if (list.contains(i)) {
                continue;
            }
            newList._addInternal(this._iList[i]);
        }
        this.clear();
        this.addRange(newList);
        this._length = this.length;
    }
    /**
     * Method to reverse the List
     */
    reverse() {
        if (this._length === 0) {
            return;
        }
        let halfLength = Math.floor(this._length / 2);
        let i1 = 0;
        let i2 = this._length - 1;
        var temp = new Object;
        for (let i = 0; i < halfLength; i++) {
            this._swapValuesInternal(i1, i2, temp);
            i1++;
            i2--;
        }
    }
    /**
     * Updates a value of the List at the specified index position
     * @param index Index position (0 to n)
     * @param value New value
     * @throws Throws an error if an undefined values was added
     */
    set(index, value) {
        this._indexCheck(index);
        if (value === undefined) {
            throw new Error("An undefined value cannot be set as value of a list");
        }
        this._iList[index] = value;
    }
    sort(sortFunction) {
        if (this._length === 0) {
            return;
        }
        let qSort = new Sorter(this._iList[0]); // Pass the 1st object as sample for type checking
        if (sortFunction !== undefined) {
            qSort.sortByFunction(sortFunction, this._iList, 0, this._length);
        }
        else {
            if (qSort.hasCompareToImplemented === true) {
                qSort.sortByImplementation(this._iList, 0, this._length);
            }
            else if (qSort.isCommonType === true) {
                qSort.sortByDefault(this._iList, 0, this._length);
            }
            else {
                throw new Error("No suitable comparison method (a<>b) was found to sort a list (a<b:-1; a==b;0 a>b: 1)");
            }
        }
    }
    /**
     * Swaps the values at the two defined index positions in the List
     * @param index1 Index position 1
     * @param index2 Index position 1
     */
    swapValues(index1, index2) {
        this._indexCheck(index1);
        this._indexCheck(index2);
        var temp = new Object;
        this._swapValuesInternal(index1, index2, temp);
    }
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Internal method to add a value to the list (without checks)
     * @param value Value to add
     */
    _addInternal(value) {
        this._iList[this._length] = value;
        this._length++;
    }
    /**
     * Internal method to copy a range of values in the List to a List or Array
     * @param start Start index
     * @param end End Index
     * @param toArray If true, an Array will be returned, otherwise a List
     * @throws Throws an error if the start index was bigger than the end index
     * @returns An Array or List of the copied values
     */
    _copyToInternal(start, end, toArray) {
        this._indexCheck(start);
        this._indexCheck(end);
        if (start > end) {
            throw new Error("The passed start index " + start + " cannot be greater than the end index " + end);
        }
        let output;
        if (toArray === true) {
            output = new Array(end - start + 1);
        }
        else {
            output = new List();
        }
        let counter = 0;
        for (let i = start; i <= end; i++) {
            if (toArray === true) {
                output[counter] = this._iList[i];
                counter++;
            }
            else {
                output._addInternal(this._iList[i]);
            }
        }
        return output;
    }
    /**
     * Internal function to get the state of a forEach flow control action (break or continue)
     * @returns Returns 1 at a break condition and 2 at a continue condition (0 is default)
     */
    _getForEachControlCondition() {
        return this._iForEachControlCondition;
    }
    /**
     * Checks the validity of an index position (>= 0 < length, integer)
     * @param index Index position to check
     * @param allowUpperBound If true, an index position of n is valid, otherwise n-1
     */
    _indexCheck(index, allowUpperBound) {
        if (allowUpperBound !== undefined && allowUpperBound === true) {
            if (index < 0 || index > this._length) {
                throw new Error("The index " + index + " is out of range");
            }
        }
        else {
            if (index < 0 || index >= this._length) {
                throw new Error("The index " + index + " is out of range");
            }
        }
        if (index % 1 !== 0) {
            throw new Error("The index " + index + " is invalid. Only integers are allowed");
        }
    }
    /**
     * Internal method to get the indices of a value in the List
     * @param value Value to check
     * @param asList If true, a List of indices will be returned, otherwise an Array
     * @returns An Array or List of indices
     */
    _indicesOfInternal(value, asList) {
        let indices = new List();
        for (let i = 0; i < this._length; i++) {
            if (isEqual(this._iList[i], value) === true) {
                indices._addInternal(i);
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
     * Internal method to swap the values at the two defined index positions in the List. The method performs no validation and uses a predefined variable as temporary variable
     * @param index1 Index position 1
     * @param index2 Index position 1
     * @param tempParameter Temporary variable (Define it once outside of this method)
     */
    _swapValuesInternal(index1, index2, tempParameter) {
        tempParameter = this._iList[index1];
        this._iList[index1] = this._iList[index2];
        this._iList[index2] = tempParameter;
    }
}
//# sourceMappingURL=List.js.map