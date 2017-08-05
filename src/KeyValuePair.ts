
/**
 * Class representing an Key-Value pair
 */
export class KeyValuePair<K, V>
{

    private _key: K;
    private _value: V;

    /**
     * Gets the key
     */
    public get key(): K
    {
        return this._key;
    }

    /**
     * Gets the value
     */
    public get value(): V
    {
        return this._value;
    }

    /**
     * Default constructor with parameters
     * @param key Key
     * @param value Value
     */
    constructor(key: K, value: V)
    {
        if (key === undefined || value === undefined)
        {
            throw new Error("The key and/or value is undefined");
        }
        this._key = key;
        this._value = value;
    }

}