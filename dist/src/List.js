"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IteratorItem_1 = require("./IteratorItem");
var Sorter_1 = require("./Sorter");
var isEqual = require("lodash.isequal");
/**
 * The class represents a standard (array)list for generic types with various list, stack and queue operations
 */
var List = /** @class */ (function () {
    function List(values) {
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
    Object.defineProperty(List.prototype, "length", {
        // ############### P R O P E R T I E S ###############
        /**
         * Gets the number of elements of the list
         */
        get: function () {
            this._length = Object.keys(this._iList).length;
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Adds an element at the end of the list
     * @param value Value to add
     */
    List.prototype.add = function (value) {
        if (value === undefined) {
            throw new Error("An undefined value cannot be added to a list");
        }
        this.addInternal(value);
    };
    List.prototype.addRange = function (values) {
        if (Array.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                this.add(values[i]);
            }
        }
        else {
            for (var i = 0; i < values.length; i++) {
                this.add(values.get(i));
            }
        }
    };
    /**
     * Called in a forEach loop before a return keyword, the loop will be terminated immediately (break)
     */
    List.prototype.break = function () {
        this._iForEachControlCondition = 1;
    };
    /**
     * Removes all elements of the list
     */
    List.prototype.clear = function () {
        if (this._length === 0) {
            return;
        }
        else {
            this._iList = [];
            this._length = 0;
        }
    };
    /**
     * Check whether the list contains the specified value
     * @param value Value to check for existence
     * @returns True if the value exists, otherwise false
     */
    List.prototype.contains = function (value) {
        if (this._length === 0) {
            return false;
        }
        var index = this.indexOf(value);
        if (index < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Optional / syntactic method: Called in a forEach loop before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
     */
    List.prototype.continue = function () {
        this._iForEachControlCondition = 2;
    };
    List.prototype.copyToArray = function (start, end) {
        if (this._length === 0) {
            return new Array();
        }
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = this._length - 1;
        }
        return this.copyToInternal(start, end, true);
    };
    /**
     * Removes the top element of the list and returns its value (end position / last element). undefined will be returned if the list is empty
     * @returns The dequeued value or undefined if the list is empty
     */
    List.prototype.dequeue = function () {
        if (this._length === 0) {
            return undefined;
        }
        var value = this._iList[this._length - 1];
        this.removeAt(this._length - 1);
        return value;
    };
    /**
     * Removes all duplicates of values in the list. All duplicates after the first occurrence of each value will be removed
     */
    List.prototype.distinct = function () {
        if (this._length === 0) {
            return;
        }
        var newList = new List();
        for (var i = 0; i < this._length; i++) {
            if (newList.contains(this._iList[i]) === false) {
                newList.addInternal(this._iList[i]);
            }
        }
        this.clear();
        this.addRange(newList);
    };
    /**
     * Inserts a new value at the top position of the list (end position / last element). This method is synonymous with add()
     * @param value Value to insert
     */
    List.prototype.enqueue = function (value) {
        this.add(value);
    };
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the list
     */
    List.prototype.forEach = function (callback) {
        if (this._length === 0) {
            return;
        }
        var done = false;
        var item;
        this._iForEachControlCondition = 0;
        this._iCounter = 0;
        while (done === false) {
            if (this.getForEachControlCondition() === 1) {
                // break
                return;
            }
            item = this.next();
            done = item.isLastEntry;
            callback(item.value);
        }
    };
    /**
     * Gets the value of the list at the specified index position
     * @param index Index position (0 to n)
     * @returns The value at the defined index position
     */
    List.prototype.get = function (index) {
        var value = this._iList[index];
        if (value !== undefined) {
            return value;
        }
        else {
            throw new Error("The index " + index + " was not found in the list");
        }
    };
    List.prototype.getRange = function (start, end) {
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            end = this._length - 1;
        }
        return this.copyToInternal(start, end, false);
    };
    /**
     * Gets the index of the first occurrence of the passed value
     * @param value Value to check
     * @returns The index position of the value in the list. If not found, -1 will be returned
     */
    List.prototype.indexOf = function (value) {
        for (var i = 0; i < this._length; i++) {
            if (isEqual(this._iList[i], value) === true) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Gets an array of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns An array of indices of the specified value
     */
    List.prototype.indicesOf = function (value) {
        return this.indicesOfInternal(value, false);
    };
    /**
     * Gets a list of the indices of all occurrences of the passed value
     * @param value Value to check
     * @returns A list of indices of the specified value
     */
    List.prototype.indicesOfAsList = function (value) {
        return this.indicesOfInternal(value, true);
    };
    /**
     * Inserts a new value at the defined index position. All values above (index +1) will be pushed to the next higher index. The last item of the list will be pushed to a new value
     * @param index Index position where to insert the value
     * @param value Value to insert
     */
    List.prototype.insertAtIndex = function (index, value) {
        this.indexCheck(index, true); // allowed 0 to length (insert after last item)
        var firstPart, secondPart;
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
        this.addRange(firstPart);
        this.add(value);
        this.addRange(secondPart);
    };
    /**
     * Gets the index of the last occurrence of the passed value
     * @param value Value to check
     * @returns The last index position of the specified value in the list
     */
    List.prototype.lastIndexOf = function (value) {
        var indices = this.indicesOfAsList(value);
        var len = indices.length;
        if (len === 0) {
            return -1;
        }
        return indices.get(len - 1);
    };
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
    /**
     * Method to get the next value of an iterator. If the last item of the list is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
     * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
     * @returns An IteratorResult object containing a value
     */
    List.prototype.next = function (value) {
        var val = this._iList[this._iCounter];
        var lastItem;
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
        return new IteratorItem_1.IteratorItem(val, lastItem);
    };
    /**
     * Returns the last element of a list without removing it (end of list). Returns undefined if the list is empty
     * @return The last value of the list. Undefined will be returned if the list is empty
     */
    List.prototype.peek = function () {
        if (this._length === 0) {
            return undefined;
        }
        return this._iList[this._length - 1];
    };
    /**
     * Removes the bottom element of the list and returns its value (index position 0). Undefined will be returned if the list is empty
     * @return The last removed value. Undefined will be returned if the list is empty
     */
    List.prototype.pop = function () {
        if (this._length === 0) {
            return undefined;
        }
        var value = this._iList[0];
        this.removeAt(0);
        return value;
    };
    /**
     * Inserts a new value at the bottom position of the list (index position 0)
     * @param value Value to insert
     */
    List.prototype.push = function (value) {
        this.insertAtIndex(0, value);
    };
    /**
     * Removes the passed value at the first occurrence in the list
     * @param value Value to remove
     * @returns True if the value could be removed
     */
    List.prototype.remove = function (value) {
        if (this._length === 0) {
            return false;
        }
        var oIndex = this.indexOf(value);
        if (oIndex < 0) {
            return false;
        }
        else {
            var indices = new List(oIndex);
            this.removeAtIndices(indices);
            return true;
        }
    };
    /**
     * Removes the passed value at all positions in the list
     * @param value Value to remove
     * @returns True if the value could be removed in the whole list
     */
    List.prototype.removeAll = function (value) {
        if (this._length === 0) {
            return false;
        }
        var indices = this.indicesOfAsList(value);
        if (indices.length === 0) {
            return false;
        }
        else {
            this.removeAtIndices(indices);
            return true;
        }
    };
    /**
     * Removes the value at the defined index. All values above will be pushed back one index position down (index - 1)
     * @param index Index where to remove a value
     */
    List.prototype.removeAt = function (index) {
        var i = new List(index);
        this.removeAtIndices(i);
    };
    List.prototype.removeAtIndices = function (indices) {
        var list;
        if (Array.isArray(indices)) {
            list = new List(indices);
        }
        else {
            list = indices;
        }
        var iLen = list.length;
        if (this._length === 0 || iLen === 0) {
            return;
        }
        var newList = new List();
        for (var i = 0; i < iLen; i++) {
            this.indexCheck(list.get(i));
        }
        for (var i = 0; i < this._length; i++) {
            if (list.contains(i)) {
                continue;
            }
            newList.addInternal(this._iList[i]);
        }
        this.clear();
        this.addRange(newList);
        this._length = this.length;
    };
    /**
     * Method to reverse the list
     */
    List.prototype.reverse = function () {
        if (this._length === 0) {
            return;
        }
        var halfLength = Math.floor(this._length / 2);
        var i1 = 0;
        var i2 = this._length - 1;
        var temp = new Object();
        for (var i = 0; i < halfLength; i++) {
            this.swapValuesInternal(i1, i2, temp);
            i1++;
            i2--;
        }
    };
    /**
     * Updates a value of the list at the specified index position
     * @param index Index position (0 to n)
     * @param value New value
     * @throws Throws an error if an undefined values was added
     */
    List.prototype.set = function (index, value) {
        this.indexCheck(index);
        if (value === undefined) {
            throw new Error("An undefined value cannot be set as value of a list");
        }
        this._iList[index] = value;
    };
    List.prototype.sort = function (sortFunction) {
        if (this._length === 0) {
            return;
        }
        var qSort = new Sorter_1.Sorter(this._iList[0]); // Pass the 1st object as sample for type checking
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
    };
    /**
     * Swaps the values at the two defined index positions in the list
     * @param index1 Index position 1
     * @param index2 Index position 1
     */
    List.prototype.swapValues = function (index1, index2) {
        this.indexCheck(index1);
        this.indexCheck(index2);
        var temp = new Object();
        this.swapValuesInternal(index1, index2, temp);
    };
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Internal method to add a value to the list (without checks)
     * @param value Value to add
     */
    List.prototype.addInternal = function (value) {
        this._iList[this._length] = value;
        this._length++;
    };
    /**
     * Internal method to copy a range of values in the list to a list or array
     * @param start Start index
     * @param end End index
     * @param toArray If true, an array will be returned, otherwise a list
     * @throws Throws an error if the start index was bigger than the end index
     * @returns An array or list of the copied values
     */
    List.prototype.copyToInternal = function (start, end, toArray) {
        this.indexCheck(start);
        this.indexCheck(end);
        if (start > end) {
            throw new Error("The passed start index " +
                start +
                " cannot be greater than the end index " +
                end);
        }
        var output;
        if (toArray === true) {
            output = new Array(end - start + 1);
        }
        else {
            output = new List();
        }
        var counter = 0;
        for (var i = start; i <= end; i++) {
            if (toArray === true) {
                output[counter] = this._iList[i];
                counter++;
            }
            else {
                output.addInternal(this._iList[i]);
            }
        }
        return output;
    };
    /**
     * Internal method to get the state of a forEach flow control action (break or continue)
     * @returns Returns 1 at a break condition and 2 at a continue condition (0 is default)
     */
    List.prototype.getForEachControlCondition = function () {
        return this._iForEachControlCondition;
    };
    /**
     * Checks the validity of an index position (>= 0 < length, integer)
     * @param index Index position to check
     * @param allowUpperBound If true, an index position of n is valid, otherwise n-1
     */
    List.prototype.indexCheck = function (index, allowUpperBound) {
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
    };
    /**
     * Internal method to get the indices of a value in the list
     * @param value Value to check
     * @param asList If true, a list of indices will be returned, otherwise an array
     * @returns An array or list of indices
     */
    List.prototype.indicesOfInternal = function (value, asList) {
        var indices = new List();
        for (var i = 0; i < this._length; i++) {
            if (isEqual(this._iList[i], value) === true) {
                indices.addInternal(i);
            }
        }
        if (asList !== undefined && asList === true) {
            return indices;
        }
        else {
            return indices.copyToArray();
        }
    };
    /**
     * Internal method to swap the values at the two defined index positions in the list. The method performs no validation and uses a predefined variable as temporary variable
     * @param index1 Index position 1
     * @param index2 Index position 1
     * @param tempParameter Temporary variable (Define it once outside of this method)
     */
    List.prototype.swapValuesInternal = function (index1, index2, tempParameter) {
        tempParameter = this._iList[index1];
        this._iList[index1] = this._iList[index2];
        this._iList[index2] = tempParameter;
    };
    return List;
}());
exports.default = List;
//# sourceMappingURL=List.js.map