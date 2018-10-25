/// <reference types="node" />
import IForEachInterface from "./interfaces/IForEachInterfaceDictionary";
import { KeyValuePair } from "./KeyValuePair";
import List from "./List";
/**
 * The class represents a standard dictionary (key and value pairs) for generic types with various dictionary operations
 */
export declare class Dictionary<K, V> implements Iterator<V> {
    private _iDict;
    private _length;
    private _iCounter;
    private _iKeyIndex;
    private _iOverrideToStringFunction;
    private _iForEachControlCondition;
    /**
     * Gets the number of elements of the dictionary
     */
    readonly length: number;
    /**
     * Constructor with initial value
     * @param value Value of type V
     * @param key Key of type K
     */
    constructor(key: K, value: V);
    /**
     * Constructor with two arrays of the same length as initial value
     * @param values Array of values with type V
     * @param keys Array of keys with type K
     */
    constructor(keys: K[], values: V[]);
    /**
     * Constructor with two lists of the same length as initial value
     * @param values List of values with type V
     * @param keys List of keys with type K
     */
    constructor(keys: List<K>, values: List<V>);
    /**
     * Constructor with a function to override the default hashing function of the keys (toString)
     * @param overrideFunction Hashing function. Should accept one parameter of the type K and return a string
     */
    constructor(overrideFunction: Function);
    /**
     * Constructor with a dictionary<K,V> as initial value
     * @param values Dictionary of elements with K and V as keys and values
     */
    constructor(values: Dictionary<K, V>);
    /** Default constructor */
    constructor();
    /**
     * Adds an element to the dictionary. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    add(key: K, value: V): void;
    /**
     * Adds a range of keys and values
     * @param values Values as array of the type V
     * @param keys Keys as array of type K
     * @throws Throws an error if the passed arrays do not have the same length
     */
    addRange(keys: K[], values: V[]): void;
    /**
     * Adds a range of keys and values as lists of the same length
     * @param values Values as List<V>
     * @param keys Keys as List<K>
     * @throws Throws an error if the passed lists do not have the same length
     */
    addRange(keys: List<K>, values: List<V>): void;
    /**
     * Adds a range of keys and values
     * @param values Values as Dictionary<K,V>
     */
    addRange(values: Dictionary<K, V>): void;
    /**
     * Called in a forEach loop before a return keyword, the loop will be terminated immediately (break)
     */
    break(): void;
    /**
     * Removes all elements of the dictionary
     */
    clear(): void;
    /**
     * Check whether the dictionary contains the specified key
     * @param key Key to check
     * @returns True if the key was found in the dictionary
     */
    containsKey(key: K): boolean;
    /**
     * Check whether the dictionary contains the specified keys
     * @param keys Keys to check as array
     * @param all Optional parameter to indicate whether all specified keys must be found
     * @returns True if at least one of the specified keys was found in the dictionary if the 'all' parameter was not defined / false. True if all of the specified keys were found in the dictionary and the 'all' parameter was set to true
     */
    containsKeys(keys: K[], all?: boolean): boolean;
    /**
     * Check whether the dictionary contains the specified keys
     * @param keys Keys to check as list
     * @param all Optional parameter to indicate whether all specified keys must be found
     * @returns True if at least one of the specified keys was found in the dictionary if the 'all' parameter was not defined / false. True if all of the specified keys were found in the dictionary and the 'all' parameter was set to true
     */
    containsKeys(keys: List<K>, all?: boolean): boolean;
    /**
     * Check whether the dictionary contains the specified value
     * @param value Values to check
     * @returns True if the value was found at least once in the dictionary
     */
    containsValue(value: V): boolean;
    /**
     * Check whether the dictionary contains the specified values. True will be returned if at least one entry is existing
     * @param values Values to check as array
     * @param all If true, the method will return true only if all entries are existing, otherwise true will be returned if at least one entry is existing
     * @returns True if at least one of the specified values was found in the dictionary if the 'all' parameter was not defined / false. True if all of the specified values were found in the dictionary and the 'all' parameter was set to true
     */
    containsValues(values: V[], all?: boolean): boolean;
    /**
     * Check whether the dictionary contains the specified values. True will be returned if at least one entry is existing
     * @param values Values to check as list
     * @param all If true, the method will return true only if all entries are existing, otherwise true will be returned if at least one entry is existing
     * @returns True if at least one of the specified values was found in the dictionary if the 'all' parameter was not defined / false. True if all of the specified values were found in the dictionary and the 'all' parameter was set to true
     */
    containsValues(values: List<V>, all?: boolean): boolean;
    /**
     * Optional / syntactic method: Called in a forEach loop before a return keyword, the current iteration will be skipped (continue). It is sufficient only to call return for the same behavior
     */
    continue(): void;
    /**
     * Removes all duplicates of values in the dictionary. The keys of the remaining values cannot be determined
     */
    distinct(): void;
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the list
     */
    forEach(callback: IForEachInterface<K, V>): void;
    /**
     * Gets the value of the dictionary by the specified key
     * @param key Key
     * @throws Throws an error if the key does not exist
     * @returns The value to the specified key
     */
    get(key: K): V;
    /**
     * Gets all key of the dictionary as array of the type K
     * @returns An array of all keys
     */
    getKeys(): K[];
    /**
     * Gets all keys of the dictionary as list of the type <K>
     * @returns A list of all keys
     */
    getKeysAsList(): List<K>;
    /**
     * Get the keys that matches to the passed value
     * @param value Value to get all corresponding keys from
     * @returns An array of keys according to the specified value
     */
    getKeysByValue(value: V): K[];
    /**
     * Get the keys that matches to the passed value. The keys are returned as list ot the type K
     * @param value Value to get all corresponding keys from
     * @returns A list of keys according to the specified value
     */
    getKeysByValueAsList(value: V): List<K>;
    /**
     * Get the keys that matches to the passed value
     * @param values Values to get all corresponding keys from
     * @returns An array of keys according to the specified values
     */
    getKeysByValues(values: V[]): K[];
    /**
     * Get the keys that matches to the passed value
     * @param values Values to get all corresponding keys from
     * @returns A list of keys according to the specified values
     */
    getKeysByValues(values: List<V>): K[];
    /**
     * Get the keys that matches to the passed values. The keys are returned as list ot the type K
     * @param values Values to get all corresponding keys from
     * @returns A list of keys according to the specified values
     */
    getKeysByValuesAsList(values: V[]): List<K>;
    /**
     * Get the keys that matches to the passed values. The keys are returned as list ot the type K
     * @param values Values to get all corresponding keys from
     * @returns A list of keys according to the specified values
     */
    getKeysByValuesAsList(values: List<V>): List<K>;
    /**
     * Copies the dictionary to a new dictionary using the specified keys
     * @param keys Keys to use for the new dictionary
     * @returns A new dictionary containing the tuples according to the specified keys
     */
    getRange(keys: K[]): Dictionary<K, V>;
    /**
     * Copies the dictionary to a new dictionary using the specified keys
     * @param keys Keys to use for the new dictionary
     * @returns A new dictionary containing the tuples according to the specified keys
     */
    getRange(keys: List<K>): Dictionary<K, V>;
    /**
     * Copies the whole dictionary to a new dictionary
     * @returns A new dictionary with all tuples of the original dictionary
     */
    getRange(): Dictionary<K, V>;
    /**
     * Copies the dictionary to a new dictionary using the specified values. All occurrences will be transferred to the new dictionary
     * @param values Values to use for the new dictionary
     * @returns A new dictionary containing the tuples according to the specified values
     */
    getRangeByValues(values: V[]): Dictionary<K, V>;
    /**
     * Copies the dictionary to a new dictionary using the specified values. All occurrences will be transferred to the new dictionary
     * @param values Values to use for the new dictionary
     * @returns A new dictionary containing the tuples according to the specified values
     */
    getRangeByValues(values: List<V>): Dictionary<K, V>;
    /**
     * Gets all vales as array
     * @returns An array of all values
     */
    getValues(): V[];
    /**
     * Gets all values as list
     * @returns A list of all values
     */
    getValuesAsList(): List<V>;
    /**
     * Method to get the next value of an iterator. If the last item of the list is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0. If true (boolean) is passed as value to the method, the return value will indicate that the last item is reached (break emulation)
     * @param value Optional: If true (boolean) is passed, the current result item will indicate that is is the last entry (break emulation)
     * @returns An IteratorResult object containing a KeyValuePair
     */
    next(value?: any): IteratorResult<KeyValuePair<K, V>>;
    /**
     * Overrides the default hashing method for keys. Usually toString is used to generate unique hashes. The toString method of a class can be overwritten or alternatively defined by this function.\n
     * The passed function takes one value of the type K and should return a string
     * @param overrideFunction Function which replaces the default method of generating hashes for the keys
     * @throws Throws an error if the passed object is not a function
     */
    overrideHashFunction(overrideFunction: Function): void;
    /**
     * Removes the passed keys in the dictionary. The method returns true if at least one key was found and removed, otherwise false
     * @param keys Keys (and attached values) to remove
     * @returns True if at least one key was found and removed
     */
    remove(keys: K[]): boolean;
    /**
     * Removes the passed keys in the dictionary. The method returns true if at least one key was found and removed, otherwise false
     * @param keys Keys (and attached values) to remove
     * @returns True if at least one key was found and removed
     */
    remove(keys: List<K>): boolean;
    /**
     * Removes the passed key in the dictionary. The method returns true if the key was found and removed, otherwise false
     * @param key Key (and attached value) to remove
     * @returns True if the key was found and removed
     */
    remove(key: K): boolean;
    /**
     * Removes all entries with the passed values from the dictionary
     * @param values Array of values to remove
     * @returns True if at least one value was found and removed
     */
    removeByValue(values: V[]): boolean;
    /**
     * Removes all entries with the passed values from the dictionary
     * @param values List of values to remove
     * @returns True if at least one value was found and removed
     */
    removeByValue(values: List<V>): boolean;
    /**
     * Removes all entries with the passed value from the dictionary
     * @param values Value to remove
     * @returns True if at least one value was found and removed
     */
    removeByValue(value: V): boolean;
    /**
     * Updates a value of the dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    set(key: K, value: V): void;
    /**
     * Swaps the values of the two defined keys in the dictionary
     * @param key1 Key 1
     * @param key2 Key 2
     * @throws Throws an error if one of the keys does not exist
     */
    swapValues(key1: K, key2: K): void;
    /**
     * Internal method to add a key value pair
     * @param key Key to add
     * @param value Value to add
     * @throws Throws an error if no key or value was defined
     */
    private addInternal;
    /**
     * Internal method to copy dictionary according to a a list of hash codes
     * @param keys Hash codes of the items to copy
     * @returns A new dictionary with the copied tuples
     */
    private copyToInternal;
    /**
     * Internal method to get the state of a forEach flow control action (break or continue)
     * @returns Returns 1 at a break condition and 2 at a continue condition (0 is default)
     */
    private getForEachControlCondition;
    /**
     * Method to calculate the hash code of the key (default: toString)
     * @param key Key to process
     * @returns The hash code internally used as key. Default is the toString method of the passed key
     */
    private getHashCode;
    /**
     * Internal method to get keys by values as list
     * @param values values to look fot keys
     * @param all if true, all entries will be queried. Otherwise, the method returns after the first hit
     * @returns A list of all determined keys
     */
    private getKeysByValuesAsListInternal;
    /**
     * Internal method to get key value pairs as object with two properties 'key' and 'value'
     * @returns Object array with key value pairs
     */
    private getKeyValuePairsInternal;
    /**
     * Internal method to refresh the key index of the dictionary
     */
    private refreshKeyIndex;
    /**
     * Internal method to remove an entry
     * @param key Key to remove (with value)
     * @returns True if the item could be removed
     */
    private removeInternal;
}
