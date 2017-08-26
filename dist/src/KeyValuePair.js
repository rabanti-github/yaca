/**
 * Class representing an Key-Value pair
 */
export class KeyValuePair {
    /**
     * Default constructor with parameters
     * @param key Key
     * @param value Value
     */
    constructor(key, value) {
        if (key === undefined || value === undefined) {
            throw new Error("The key and/or value is undefined");
        }
        this._key = key;
        this._value = value;
    }
    /**
     * Gets the key
     */
    get key() {
        return this._key;
    }
    /**
     * Gets the value
     */
    get value() {
        return this._value;
    }
}
//# sourceMappingURL=KeyValuePair.js.map