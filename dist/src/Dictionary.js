import { KeyValuePair } from './KeyValuePair';
import { IteratorItem } from './IteratorItem';
import { List } from './List';
var isEqual = require('lodash.isequal');
/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
export class Dictionary {
    constructor(keys, values) {
        this._iCounter = 0;
        this._length = 0;
        this._iDict = [];
        this._iKeyIndex = [];
        if (keys !== undefined) {
            if (values !== undefined) {
                if (Array.isArray(keys) && Array.isArray(values)) {
                    this.addRange(keys, values);
                }
                else if (keys instanceof List && values instanceof List) {
                    this.addRange(keys, values);
                }
                else {
                    this.add(keys, values);
                }
            }
            else {
                if (keys instanceof Function) {
                    this.overrideHashFunction(keys);
                }
                else {
                    this.addRange(keys);
                }
            }
        }
    }
    // ############### P R O P E R T I E S ###############
    /**
     * Gets the number of elements of the Dictionary
     */
    get length() {
        this._length = this._iKeyIndex.length;
        return this._length;
    }
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Adds an element to the Dictionary. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    add(key, value) {
        this.addInternal(key, value);
        this.refreshKeyIndex();
    }
    addRange(p1, p2) {
        let keys;
        let values;
        if (Array.isArray(p1) && Array.isArray(p2)) {
            keys = p1;
            values = p2;
        }
        else if (p1 instanceof List && p2 instanceof List) {
            keys = p1.copyToArray();
            values = p2.copyToArray();
        }
        else {
            keys = p1.getKeys();
            values = p1.getValues();
        }
        if (keys.length !== values.length) {
            throw new Error("The length of the passed key and value arrays / lists is not identical");
        }
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            this.addInternal(keys[i], values[i]);
        }
        this.refreshKeyIndex();
    }
    /**
      * Called in a forEach loop before a return keyword, the loop will be terminated immediately (break)
      */
    break() {
        this._iForEachControlCondition = 1;
    }
    /**
     * Removes all elements of the Dictionary
     */
    clear() {
        if (this._length === 0) {
            return;
        }
        else {
            this._iDict = [];
            this._length = 0;
            this._iKeyIndex = [];
        }
    }
    /**
     * Check whether the Dictionary contains the specified key
     * @param key Key to check
     * @returns True if the key was found in the Dictionary
     */
    containsKey(key) {
        if (this._length === 0) {
            return false;
        }
        let keyList = [key];
        return this.containsKeys(keyList);
    }
    containsKeys(keys, all) {
        if (this._length === 0) {
            return false;
        }
        let keyList;
        let match = 0;
        if (Array.isArray(keys)) {
            keyList = keys;
        }
        else {
            keyList = keys.copyToArray();
        }
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            if (this._iDict[this.getHashCode(keyList[i])] !== undefined) {
                match++;
            }
        }
        if (all !== undefined && all === true) {
            if (match === len) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (match > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    /**
     * Check whether the Dictionary contains the specified value
     * @param value Values to check
     * @returns True if the value was found at least once in the Dictionary
     */
    containsValue(value) {
        let v = [value];
        let list = this.getKeysByValuesAsListInternal(v, false);
        if (list.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    containsValues(values, all) {
        let list;
        if (all !== undefined && all === true) {
            list = this.getKeysByValuesAsListInternal(values, true);
            if (list.length === values.length) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            list = this.getKeysByValuesAsListInternal(values, false);
            if (list.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    /**
     * Optional / syntactic function: Called in a forEach before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
     */
    continue() {
        this._iForEachControlCondition = 2;
    }
    /**
     * Removes all duplicates of values in the Dictionary. The keys of the remaining values cannot be determined
     */
    distinct() {
        if (this._length === 0) {
            return;
        }
        let newDict = new Dictionary();
        for (let i = 0; i < this._length; i++) {
            if (newDict.containsValues([this._iDict[this._iKeyIndex[i]][1]]) === false) {
                newDict.add(this._iDict[this._iKeyIndex[i]][0], this._iDict[this._iKeyIndex[i]][1]);
            }
        }
        this.clear();
        this.addRange(newDict);
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
        this._iCounter = 0;
        this._iForEachControlCondition = 0;
        while (done === false) {
            if (this.getForEachControlCondition() === 1) {
                return;
            }
            item = this.next();
            done = item.done;
            callback(item.value);
        }
    }
    /**
     * Gets the value of the Dictionary by the specified key
     * @param key Key
     * @throws Throws an error if the key does not exist
     * @returns The value to the specified key
     */
    get(key) {
        let k = this.getHashCode(key);
        if (typeof this._iDict[k] !== "undefined") {
            return this._iDict[k][1];
        }
        else {
            throw new Error("The key " + key + " was not found in the Dictionary");
        }
    }
    /**
     * Gets all key of the Dictionary as Array of the type K
     * @returns An array of all keys
     */
    getKeys() {
        if (this._length === 0) {
            return new Array();
        }
        let temp = this.getKeyValuePairsInternal();
        let output = Array(temp.length);
        for (let i = 0; i < this._length; i++) {
            output[i] = temp[i]['value'][0];
        }
        return output;
    }
    /**
     * Gets all keys of the Dictionary as List of the type <K>
     * @returns A List of all keys
     */
    getKeysAsList() {
        let keys = this.getKeys();
        return new List(keys);
    }
    /**
     * Get the keys that matches to the passed value
     * @param value Value to get all corresponding keys from
     * @returns An array of keys according to the specified value
     */
    getKeysByValue(value) {
        return this.getKeysByValuesAsListInternal([value], true).copyToArray();
    }
    /**
     * Get the keys that matches to the passed value. The keys are returned as List ot the type K
     * @param value Value to get all corresponding keys from
     * @returns A List of keys according to the specified value
     */
    getKeysByValueAsList(value) {
        return this.getKeysByValuesAsListInternal([value], true);
    }
    getKeysByValues(values) {
        let list = this.getKeysByValuesAsListInternal(values, true);
        return list.copyToArray();
    }
    getKeysByValuesAsList(values) {
        return this.getKeysByValuesAsListInternal(values, true);
    }
    getRange(keys) {
        if (this._length === 0) {
            return new Dictionary();
        }
        let hashcodes = new List();
        let temp = new Array();
        if (keys !== undefined && Array.isArray(keys)) {
            temp = keys;
        }
        else if (keys !== undefined && (Array.isArray(keys) === false)) {
            temp = keys.copyToArray();
        }
        let len2 = temp.length;
        let j;
        for (let i = 0; i < this._length; i++) {
            if (keys === undefined) {
                hashcodes.add(this._iKeyIndex[i]);
                continue;
            }
            for (j = 0; j < len2; j++) {
                if (this.getHashCode(temp[j]) === this._iKeyIndex[i]) {
                    hashcodes.add(this._iKeyIndex[i]);
                    break;
                }
            }
        }
        if (keys !== undefined) {
            hashcodes.distinct();
        }
        return this.copyToInternal(hashcodes);
    }
    getRangeByValues(values) {
        if (this._length === 0) {
            return new Dictionary();
        }
        let keys = this.getKeysByValuesAsListInternal(values, true);
        return this.getRange(keys);
    }
    /**
     * Gets all vales as array
     * @returns An array of all Values
     */
    getValues() {
        if (this._length === 0) {
            return new Array();
        }
        let temp = this.getKeyValuePairsInternal();
        let output = Array(temp.length);
        for (let i = 0; i < this._length; i++) {
            output[i] = temp[i]['value'][1];
        }
        return output;
    }
    /**
     * Gets all Values as List
     * @returns A List of all Values
     */
    getValuesAsList() {
        let values = this.getValues();
        return new List(values);
    }
    // >>> I N T E R F A C E    I M P L E M E N T A T I O N <<<
    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
     * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
     * @returns An IteratorResult object containing a KeyValuePair
     */
    next(value) {
        let val = new KeyValuePair(this._iDict[this._iKeyIndex[this._iCounter]][0], this._iDict[this._iKeyIndex[this._iCounter]][1]);
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
     * Overrides the default hashing method for keys. Usually toString is used to generate unique hashes. The toString method of a class can be overwritten or alternatively defined by this function.\n
     * The passed function takes one value of the type K and should return a string.
     * @param overrideFunction Function which replaces the default method of generating hashes for the keys
     * @throws Throws an error if the passed object is not a function
     */
    overrideHashFunction(overrideFunction) {
        let type = {};
        if ((overrideFunction && type.toString.call(overrideFunction) === '[object Function]') === false || overrideFunction === undefined) {
            throw new Error("The passed object is not a function. It must be a function that accepts one variable of the key type (K) and returns a string");
        }
        this._iOverrideToStringFunction = overrideFunction;
    }
    remove(keys) {
        if (this._length === 0) {
            return false;
        }
        let keylist;
        if (Array.isArray(keys)) {
            keylist = keys;
        }
        else if (keys instanceof List) {
            keylist = keys.copyToArray();
        }
        else {
            keylist = [keys];
        }
        let len = keylist.length;
        let status = true;
        let status2;
        for (let i = len - 1; i >= 0; i--) {
            status2 = this.removeInternal(keylist[i]);
            if (status2 === false) {
                status = false;
            }
        }
        this.refreshKeyIndex();
        return status;
    }
    removeByValue(values) {
        if (this._length === 0) {
            return false;
        }
        let keys;
        if (Array.isArray(values) || values instanceof List) {
            keys = this.getKeysByValuesAsListInternal(values, true);
        }
        else {
            keys = this.getKeysByValueAsList(values);
        }
        let len = keys.length;
        if (this._length === 0 || len === 0) {
            return false;
        }
        return this.remove(keys);
    }
    /**
     * Updates a value of the Dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    set(key, value) {
        this.add(key, value);
    }
    /**
     * Swaps the values of the two defined keys in the Dictionary
     * @param key1 Key 1
     * @param key2 Key 2
     * @throws Throws an error if one of the keys does not exist
     */
    swapValues(key1, key2) {
        if (this.containsKey(key1) === false || this.containsKey(key2) === false) {
            throw new Error("One of the passed keys (" + key1.toString() + ", " + key2.toString() + ") does not exist");
        }
        let hc1 = this.getHashCode(key1);
        let hc2 = this.getHashCode(key2);
        let temp = this._iDict[hc1][1];
        this._iDict[hc1][1] = this._iDict[hc2][1];
        this._iDict[hc2][1] = temp;
    }
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Internal method to add a key value pair
     * @param key Key to add
     * @param value Value to add
     * @throws Throws an error if no key or value was defined
     */
    addInternal(key, value) {
        if (key === undefined) {
            throw new Error("No key was defined to add as Dictionary element");
        }
        if (value === undefined) {
            throw new Error("No value was defined to add as Dictionary element");
        }
        let hashcode = this.getHashCode(key);
        this._iDict[hashcode] = { 0: key, 1: value };
        if (this._iKeyIndex.indexOf(hashcode) < 0) {
            this._length++;
        }
    }
    /**
     * Internal method to copy dictionary according to a a list of hashcodes
     * @param keys hashcodes of the items to copy
     * @returns A new Dictionary with the copied tuples
     */
    copyToInternal(keys) {
        let output = new Dictionary();
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            //if (typeof this._iDict[keys[i]] !== undefined)
            //{
            output.addInternal(this._iDict[keys.get(i)][0], this._iDict[keys.get(i)][1]);
            // }
        }
        output.refreshKeyIndex();
        return output;
    }
    /**
     * Internal function to get the state of a forEach flow control action (break or continue)
     * @returns Returns 1 at a break condition and 2 at a continue condition (0 is default)
     */
    getForEachControlCondition() {
        return this._iForEachControlCondition;
    }
    /**
     * Method to calculate the hash code of the key (default: toString)
     * @param key Key to process
     * @returns The hash code internally used as key. Default is the toString function of the passed key
     */
    getHashCode(key) {
        if (key === undefined) {
            throw new Error("No valid key was defined. The key must not be empty or undefined");
        }
        if (this._iOverrideToStringFunction === undefined) {
            if (key instanceof Date) {
                return key.getTime().toString();
            }
            else {
                return "_" + key.toString(); // _ prevents possible problems with empty strings / defined types
            }
        }
        else {
            return this._iOverrideToStringFunction(key);
        }
    }
    /**
     * Internal function to get keys by values as list
     * @param values values to look fot keys
     * @param all if true, all entries will be queried. Otherwise, the method returns after the first hit
     * @returns A list of all determined keys
     */
    getKeysByValuesAsListInternal(values, all) {
        let list = new List();
        if (this._length === 0) {
            return list;
        }
        let val;
        if (Array.isArray(values)) {
            val = values;
        }
        else {
            val = values.copyToArray();
        }
        let len = val.length;
        if (len === 0) {
            return list;
        }
        let j;
        let keyCheck = new List();
        for (let i = 0; i < len; i++) {
            for (j = 0; j < this._length; j++) {
                if (isEqual(this._iDict[this._iKeyIndex[j]][1], val[i]) === true) {
                    if (keyCheck.contains(this._iKeyIndex[j])) {
                        continue;
                    }
                    list.add(this._iDict[this._iKeyIndex[j]][0]);
                    if (all === false) {
                        return list;
                    }
                    keyCheck.add(this._iKeyIndex[j]);
                }
            }
        }
        return list;
    }
    /**
     * Internal method to get key value pairs as object with two properties 'key' and 'value'
     * @returns Object array with key value pairs
     */
    getKeyValuePairsInternal() {
        let output = new Array(this._length);
        let item;
        let i = 0;
        this._iKeyIndex.forEach(key => {
            item = { 'key': key, 'value': this._iDict[key] };
            output[i] = item;
            i++;
        });
        return output;
    }
    /**
     * Internal method to refresh the key index of the dictionary
     */
    refreshKeyIndex() {
        this._iKeyIndex = Object.keys(this._iDict);
    }
    /**
     * Internal method to remove an entry
     * @param key Key to remove (with value)
     * @returns True if the item could be removed
     */
    removeInternal(key) {
        let hashcode = this.getHashCode(key);
        if (this._iDict[hashcode] === undefined) {
            return false;
        }
        else {
            delete this._iDict[hashcode];
            this._length--;
            return true;
        }
    }
}
//# sourceMappingURL=Dictionary.js.map