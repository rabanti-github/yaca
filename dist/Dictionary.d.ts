/// <reference types="node" />
import { IDictionary } from './interfaces/IDictionary';
import List from './List';
/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
export declare class Dictionary<K, V> implements Iterator<V>, IDictionary<K, V> {
    next(value?: any): IteratorResult<V>;
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
     * @param value Key (and attached value) to remove
     */
    remove(key: K): boolean;
    removeByValue(value: V): boolean;
    /**
     * Removes all values from the Dictionary.
     * @param values Array of values to remove
     */
    removeByValues(values: V[]): any;
    /**
     * Removes all values from the Dictionary.
     * @param values List of values to remove
     */
    removeByValues(values: List<V>): any;
}
