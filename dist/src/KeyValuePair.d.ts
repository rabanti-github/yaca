/**
 * The class represents a key-value pair
 */
export declare class KeyValuePair<K, V> {
    private _key;
    private _value;
    /**
     * Gets the key
     */
    readonly key: K;
    /**
     * Gets the value
     */
    readonly value: V;
    /**
     * Default constructor with parameters
     * @param key Key
     * @param value Value
     */
    constructor(key: K, value: V);
}
