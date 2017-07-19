
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
        this._key = key;
        this._value = value;
    }

}