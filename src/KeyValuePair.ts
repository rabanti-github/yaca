
export class KeyValuePair<K, V>
{

    private _key: K;
    private _value: V;

    public get key(): K
    {
        return this._key;
    }

    public get value(): V
    {
        return this._value;
    }

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