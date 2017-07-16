/// <reference types="node" />
import IForEachInterface from './interfaces/IForEachInterfaceDictionary';
import { KeyValuePair } from './KeyValuePair';
import { IDictionary } from './interfaces/IDictionary';
import List from './List';
/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
export declare class Dictionary<K, V> implements Iterator<V>, IDictionary<K, V> {
    private refreshKeyIndex();
    getKeys(): K[];
    getKeysAsList(): List<K>;
    getValues(): V[];
    getValuesAsList(): List<V>;
    private getHashCode(key);
    private getKeyValuePairsInternal();
    getKeysByValuesAsList(values: V[]): List<K>;
    getKeysByValuesAsList(values: List<V>): List<K>;
    getKeysByValues(values: V[]): K[];
    getKeysByValues(values: List<V>): K[];
    getKeysByValueAsList(value: V): List<K>;
    private getKeysByValuesAsListInternal(values, breakAfterFirst);
    getKeysByValue(value: V): K[];
    containsValues(values: V[]): boolean;
    containsValues(values: List<V>): boolean;
    containsValue(value: V): boolean;
    private _iDict;
    private _length;
    private _iCounter;
    private _iKeyIndex;
    /** Default constructor */
    constructor();
    /**
     * Constructor with a Dictionary<K,V> as initial value
     * @param values Dictionary of elements with K and V as Keys and Values
     */
    constructor(values: Dictionary<K, V>);
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
    /**
     * Gets the number of elements of the List
     */
    readonly length: number;
    /**
     * Adds an element at the end of the List. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    add(key: K, value: V): void;
    private addInternal(key, value);
    /**
     * Adds a range of keys and values
     * @param values Values as Dictionary<K,V>
     */
    addRange(values: Dictionary<K, V>): any;
    /**
     * Adds a range of keys and values
     * @param values Values as array of the type V
     * @param keys Keys as array of Type K
     */
    addRange(keys: K[], values: V[]): any;
    /**
     * Adds a range of keys and values as Lists of the same length
     * @param values Values as List<V>
     * @param keys Keys as List<K>
     */
    addRange(keys: List<K>, values: List<V>): any;
    /**
     * Updates a value of the Dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    set(key: K, value: V): void;
    /**
     * Removes the passed key in the Dictionary. The method returns true if the key was found and removed, otherwise false
     * @param key Key (and attached value) to remove
     */
    remove(key: K): boolean;
    /**
  * Removes the passed keys in the Dictionary. The method returns true if at least one key was found and removed, otherwise false
  * @param keys Keys (and attached values) to remove
  */
    remove(keys: K[]): boolean;
    /**
     * Removes the passed keys in the Dictionary. The method returns true if at least one key was found and removed, otherwise false
     * @param keys Keys (and attached values) to remove
     */
    remove(keys: List<K>): boolean;
    private removeInternal(key);
    /**
     * Removes all entries with the passed value from the Dictionary.
     * @param values Value to remove
     */
    removeByValue(value: V): boolean;
    /**
     * Removes all entries with the passed values from the Dictionary.
     * @param values Array of values to remove
     */
    removeByValue(values: V[]): boolean;
    /**
     * Removes all entries with the passed values from the Dictionary.
     * @param values List of values to remove
     */
    removeByValue(values: List<V>): boolean;
    /**
     * Removes all elements of the Dictionary
     */
    clear(): void;
    /**
     * Gets the value of the Dictionary by the specified key
     * @param key Key
     */
    get(key: K): V;
    /**
     * Copies the whole Dictionary to a new Dictionary
     */
    getRange(): Dictionary<K, V>;
    /**
     * Copies the Dictionary to a new Dictionary using the specified keys
     * @param keys Keys to use for the new Dictionary
     */
    getRange(keys: K[]): Dictionary<K, V>;
    /**
 * Copies the Dictionary to a new Dictionary using the specified keys
 * @param keys Keys to use for the new Dictionary
 */
    getRange(keys: List<K>): Dictionary<K, V>;
    /**
     * Copies the Dictionary to a new Dictionary using the specified values. All occurrences will be transferred to the new Dictionary
     * @param values Values to use for the new Dictionary
     */
    getRangeByValues(values: V[]): Dictionary<K, V>;
    /**
     * Copies the Dictionary to a new Dictionary using the specified values. All occurrences will be transferred to the new Dictionary
     * @param values Values to use for the new Dictionary
     */
    getRangeByValues(values: List<V>): Dictionary<K, V>;
    private copyToInternal(keys);
    /**
     * Check whether the Dictionary contains the specified key
     * @param key True if the value exists, otherwise false
     */
    containsKey(key: K): boolean;
    /**
     * Check whether the Dictionary contains the specified keys
     * @param keys True if the value exists, otherwise false
     */
    containsKeys(keys: K[]): boolean;
    /**
     * Check whether the Dictionary contains the specified keys
     * @param keys sTrue if the value exists, otherwise false
     */
    containsKeys(keys: List<K>): boolean;
    /**
     * Swaps the values of the two defined keys in the Dictionary
     * @param key1 Key 1
     * @param key2 Key 2
     */
    swapValues(key1: K, key2: K): void;
    /**
     * Removes all duplicates of values in the Dictionary. The keys of the remaining values cannot be determined
     */
    distinct(): void;
    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    forEach(callback: IForEachInterface<K, V>): void;
    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0.
     * @param value Can be ignored
     */
    next(value?: any): IteratorResult<KeyValuePair<K, V>>;
}
