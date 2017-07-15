import IForEachInterface from './interfaces/IForEachInterfaceDictionary';
import {KeyValuePair} from './KeyValuePair';
import ISortInterFace from './interfaces/ISortInterface';
import { IDictionary } from './interfaces/IDictionary';
import { IteratorItem } from './IteratorItem';
import { Sorter } from './Sorter';
import  List  from './List';

/**
 * Class representing a standard Dictionary (Key and Value pairs) for generic Types with various Dictionary operations
 */
export class Dictionary<K,V> implements  Iterator<V>, IDictionary<K,V>
//export default class Dictionary<K,V> implements  Iterator<V>, IDictionary<K,V>
{

    private refreshKeyIndex()
    {
        this._iKeyIndex = Object.keys(this._iDict);
    }

    public getKeys(): K[]
    {
        
        if (this._length === 0) { return new Array() as K[]; }
        let temp: object[] = this.getKeyValuePairsInternal();
        let output = Array(temp.length) as K[];

        for(let i: number = 0; i < this._length; i++)
        {
            output[i] = temp[i]['key'][0];
        }
        return output;
    }

    public getKeysAsList(): List<K>
    {
        let keys: K[] = this.getKeys();
        return new List<K>(keys);
    }

    public getValues(): V[]
    {
        if (this._length === 0) { return new Array() as V[]; }
        let temp: object[] = this.getKeyValuePairsInternal();
        let output = Array(temp.length) as V[];

        for(let i: number = 0; i < this._length; i++)
        {
            output[i] = temp[i]['value'][1];
        }
        return output;
    }

    public getValuesAsList(): List<V>
    {
        let values: V[] = this.getValues();
        return new List<V>(values);
        
    }
    
    private getHashCode(key: K): string
    {
        if (key === undefined)
        {
            throw new Error("No valid key was defined. The key must not be empty or undefined");
        }        
        //let temp = key as Object;
        return key.toString();
    }
    
    private getKeyValuePairsInternal(): object[]
    {
        let output: object[] = new Array(this._length) as object[];
        let item: object;
        //let x: V = this._iDict['asd'];
        //let item: IteratorItem<object> = new IteratorItem();
        //let output = new Array(this._length) as IteratorItem<object>[];
        let i: number = 0;
        //let keys: string[] = Object.keys(this._iDict);
        this._iKeyIndex.forEach(key => { 
            item = {'key': key, 'value': this._iDict[key]};

            //item = new IteratorItem( {'key': key, 'value': this._iDict[key]});
            output[i] = item;
            i++;
        });
        return output;
    }

    public getKeysByValuesAsList(values: V[]): List<K>;
    public getKeysByValuesAsList(values: List<V>): List<K>;
    public getKeysByValuesAsList(values: V[] | List<V>): List<K>
    {
        return this.getKeysByValuesAsListInternal(values, false);
    }

    public getKeysByValues(values: V[]): K[];
    public getKeysByValues(values: List<V>): K[];
    public getKeysByValues(values: V[] | List<V>): K[]
    {
        let list: List<K> = this.getKeysByValuesAsListInternal(values, false);
        return list.copyToArray();     
    }

    public getKeysByValueAsList(value: V): List<K>
    {
        let v: V[] = [value];
        return this.getKeysByValuesAsListInternal(v, false); 
    }

    private getKeysByValuesAsListInternal(values: V[] | List<V>, breakAfterFirst: boolean): List<K>{
       let list: List<K> = new List<K>();
       if (this._length === 0) { return list; }

        let val: V[];
        if (Array.isArray(values))
        {
            val = values;
        }
        else
        {
            val = values.copyToArray();
        }
        let len: number = val.length;
        if (len === 0) { return list; }
       //let keys: string[] = Object.keys(this._iDict);
       //let len2: number = keys.length;
       let j: number;
       let keyCheck: List<string> = new List<string>();
        for(let i: number = 0; i < len; i++)
        {
            for(j = 0; j < this._length; j++)
            {
                if (this._iDict[this._iKeyIndex[j]][1] === val[i])
                {
                    if (keyCheck.contains(this._iKeyIndex[j])){ continue; }
                    list.add(this._iDict[this._iKeyIndex[j]][0]);
                    if (breakAfterFirst === true) { return list; }
                    keyCheck.add(this._iKeyIndex[j]);
                }
            }
        }
        return list;
    }

    public getKeysByValue(value: V): K[]{ 
        let list: List<K> = this.getKeysByValueAsList(value);
        return list.copyToArray();
    }

    public containsValues(values: V[]): boolean;
    public containsValues(values: List<V>): boolean;
    public containsValues(values: V[] | List<V>): boolean
    {
        let list: List<K> = this.getKeysByValuesAsListInternal(values, true);
       if (list.length > 0) { return true; }
       else { return false; }        
    }
    
    public containsValue(value: V): boolean
    {
       let v: V[] = [value];
       let list: List<K> = this.getKeysByValuesAsListInternal(v, true);
       if (list.length > 0) { return true; }
       else { return false; }
    }

    private _iDict: K[]; //{ string, K }[];
    private _length: number;
    private _iCounter: number;
    private _iKeyIndex: string[];

    /** Default constructor */
    constructor();
    /**
     * Constructor with a Dictionary<K,V> as initial value
     * @param values Dictionary of elements with K and V as Keys and Values 
     */
    constructor(values: Dictionary<K,V>);
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
    constructor(keys?: K | K[] | List<K> |  Dictionary<K, V>, values?: V | V[] | List<V>) {
        this._iCounter = 0;
        this._length = 0;
        this._iDict = [];
        this._iKeyIndex = [];
        if (keys !== undefined && values !== undefined) {
            if (Array.isArray(keys) && Array.isArray(values)) {
                this.addRange(keys as K[], values);
            }
            else if (keys instanceof List && values instanceof List) {
                this.addRange(keys as List<K>, values as List<V>);
            }
            else if (values instanceof Dictionary) {
                this.addRange(keys as Dictionary<K,V>);
            }
            else {
                this.add(keys as K, values as V);
            }
        }
    }



    /**
     * Gets the number of elements of the List
     */
    public get length(): number {
        //this._length = Object.keys(this._iDict).length
        this._length = this._iKeyIndex.length;
        return this._length;
    }

    /**
     * Adds an element at the end of the List. This method is synonymous to set
     * @param value Value to add
     * @param key Key to add
     */
    public add(key: K, value: V)
    {
        this.addInternal(key, value);
        this.refreshKeyIndex();
    }

    private addInternal(key: K, value: V)
    {
        if (key === undefined)
        {
            throw new Error("No key was defined to add as Dictionary element");
        }
        if (value === undefined)
        {
            throw new Error("No value was defined to add as Dictionary element");
        }        
        let hashcode: string = this.getHashCode(key);
        this._iDict[hashcode][0] = key;
        this._iDict[hashcode][1] = value;
        this._length++;        
    }


    /**
     * Adds a range of keys and values
     * @param values Values as Dictionary<K,V>
     */
    public addRange(values: Dictionary<K, V>);
    /**
     * Adds a range of keys and values
     * @param values Values as array of the type V
     * @param keys Keys as array of Type K
     */
    public addRange(keys: K[], values: V[]);
    /**
     * Adds a range of keys and values as Lists of the same length
     * @param values Values as List<V>
     * @param keys Keys as List<K>
     */
    public addRange(keys: List<K>, values: List<V>);    
    public addRange(p1: Dictionary<K,V> | K[] | List<K>, p2?: V[] | List<V>) {
        let keys: K[];
        let values: V[];
        if (Array.isArray(p1) && Array.isArray(p2))
        {
            keys = p1 as K[];
            values = p2 as V[];
        }
        else if (p1 instanceof List && p2 instanceof List)
        {
            keys = p1.copyToArray();
            values = p2.copyToArray();
        }
        else if (p1 instanceof Dictionary)
        {
            keys = p1.getKeys();
            values = p1.getValues();
        }
        else
            {
                keys = [];
                values = [];
            }
        if (keys.length !== values.length)
        {
            throw new Error("The length of the passed key and value arrays / lists is not identical")
        }
        let len: number = keys.length;
        for(let i: number = 0; i < len; i++)
        {
            this.addInternal(keys[i], values[i]);
        }
        this.refreshKeyIndex();
    }

    /**
     * Updates a value of the Dictionary with the specified key. If the key does not exist, it will be added. This method is synonymous to add
     * @param key Key of the new value
     * @param value New value
     */
    public set(key: K, value: V) {
        this.add(key, value);
    }


    /**
     * Removes the passed key in the Dictionary. The method returns true if the key was found and removed, otherwise false
     * @param key Key (and attached value) to remove
     */
    public remove(key: K): boolean;
       /**
     * Removes the passed keys in the Dictionary. The method returns true if at least one key was found and removed, otherwise false
     * @param keys Keys (and attached values) to remove
     */
    public remove(keys: K[]): boolean;        
    /**
     * Removes the passed keys in the Dictionary. The method returns true if at least one key was found and removed, otherwise false
     * @param keys Keys (and attached values) to remove
     */
    public remove(keys: List<K>): boolean;
    public remove(keys: K | K[] | List<K>): boolean
    {
        if (this._length === 0) { return false; }
        let keylist: K[];
        if (Array.isArray(keys))
        {
            keylist = keys;
        }
        else if (keys instanceof List)
        {
            keylist = keys.copyToArray();
        }
        else
        {
            keylist = [ keys ];
        }

        let hashcode: string;
        let len: number = keylist.length;
        let status: boolean = false;
        let status2: boolean = false;
        for(let i = 0; i < len; i++)
        {
            status2 = this.removeInternal(keylist[i]);
            if (status2 === true) { status = true; }
            hashcode = this.getHashCode(keylist[i]);
        }
        this.refreshKeyIndex();
        return status;
    }

    private removeInternal(key: K): boolean
    {
        let hashcode: string = this.getHashCode(key);
        if (this._iDict[hashcode][0] === undefined)
        {
            return false;
        }
        else
        {
            delete this._iDict[hashcode];
            this._length--;
            return true;            
        }
    }
    

/*
    public removeByValue(value: V): boolean
    {
        if (this.length < 1) { return false; }

        let keys: List<K> = this.getKeysByValueAsList(value);
        let len: number = keys.length;
        let status: boolean = false;
        let status2: boolean;
        if (len === 0) { return false; }

        return this.remove(keys);
    }
*/

    /**
     * Removes all entries with the passed value from the Dictionary.
     * @param values Value to remove
     */
    public removeByValue(value: V): boolean;
    /**
     * Removes all entries with the passed values from the Dictionary.
     * @param values Array of values to remove
     */
    public removeByValue(values: V[]): boolean;
    /**
     * Removes all entries with the passed values from the Dictionary.
     * @param values List of values to remove
     */
    public removeByValue(values: List<V>): boolean;
    public removeByValue(values: V | V[] | List<V>): boolean {
        if (this._length === 0) { return false; }
        let keys: List<K>;
        if (Array.isArray(values)  || values instanceof List)
        {
            keys  = this.getKeysByValuesAsListInternal(values, false);
        }
        else
        {
            keys = this.getKeysByValueAsList(values as V);
        }
        let len = keys.length;
        if (this._length === 0 || len === 0) { return false; }

        return this.remove(keys);
    }

    /**
     * Removes all elements of the Dictionary
     */
    public clear() {
        if (this._length === 0) { return; }
        else {
            this._iDict = [];
            this._length = 0;
            this._iKeyIndex = [];
        }
    }

    /**
     * Gets the value of the Dictionary by the specified key
     * @param key Key
     */
    public get(key: K): V {
        let k: string = this.getHashCode(key);
        if (this._iDict[k][0] !== undefined) {
            return this._iDict[k][1];
        }
        else {
            throw new Error("The key " + key + " was not found in the Dictionary");
        }
    }


    /**
     * Copies the whole Dictionary to a new Dictionary
     */
    public getRange(): Dictionary<K,V>;
    /**
     * Copies the Dictionary to a new Dictionary using the specified keys
     * @param keys Keys to use for the new Dictionary
     */
    public getRange(keys: K[]): Dictionary<K,V>;
        /**
     * Copies the Dictionary to a new Dictionary using the specified keys
     * @param keys Keys to use for the new Dictionary
     */
    public getRange(keys: List<K>): Dictionary<K,V>;
    public getRange(keys?: K[] | List<K>): Dictionary<K,V> {

        if (this._length === 0) { return new Dictionary<K,V>(); }
        //let allHashcodes: string[] = Object.keys(this._iDict);
        let hashcodes: List<string> = new List<string>();
        let temp: K[] = new Array();
        if (keys !== undefined && Array.isArray(keys))
        {
          temp = keys;
        }
        else if (keys !== undefined && (Array.isArray(keys) === false))
        {
          temp = keys.copyToArray();
        }
       // let len = allHashcodes.length;
        let len2 = temp.length;
        let j: number;
        for(let i: number = 0; i < this._length; i++)
        {
            if (keys === undefined)
            { 
                hashcodes.add(this._iKeyIndex[i]);
                continue;
            }
            for(j = 0; j<len2; j++)
            {
                if (this.getHashCode(temp[j]) === this._iKeyIndex[i])
                {
                    hashcodes.add(this._iKeyIndex[i]);
                    break;
                }
            }
        }
        if (keys !== undefined)
        {
            hashcodes.distinct();
        }
        return this.copyToInternal(hashcodes);
    }


    /**
     * Copies the Dictionary to a new Dictionary using the specified values. All occurrences will be transferred to the new Dictionary
     * @param values Values to use for the new Dictionary
     */
    public getRangeByValues(values: V[]): Dictionary<K,V>;
    /**
     * Copies the Dictionary to a new Dictionary using the specified values. All occurrences will be transferred to the new Dictionary
     * @param values Values to use for the new Dictionary
     */
    public getRangeByValues(values: List<V>): Dictionary<K,V>;
    public getRangeByValues(values: V[] | List<V>): Dictionary<K,V>
    {
         if (this._length === 0) { return new Dictionary<K,V>(); }
         let keys: List<K> = this.getKeysByValuesAsListInternal(values, false);
         return this.getRange(keys);       
    }

    private copyToInternal(keys: List<string>): Dictionary<K,V>
    {
        let output: Dictionary<K,V> = new Dictionary<K,V>();
        let len = keys.length;
        for(let i: number = 0; i < len; i++)
        {
            if (this._iDict[keys[i]][0] !== undefined)
            {
                output.addInternal(this._iDict[keys[i]][0], this._iDict[keys[i]][1]);
            }
        }
        output.refreshKeyIndex();
        return output;
    }


    /**
     * Check whether the Dictionary contains the specified key
     * @param key True if the value exists, otherwise false
     */
    public containsKey(key: K): boolean {
        if (this._length === 0) { return false; }

        let keyList: K[] = [ key ];
        return this.containsKeys(keyList);
    }

    /**
     * Check whether the Dictionary contains the specified keys
     * @param keys True if the value exists, otherwise false
     */
    public containsKeys(keys: K[]): boolean
    /**
     * Check whether the Dictionary contains the specified keys
     * @param keys sTrue if the value exists, otherwise false
     */
    public containsKeys(keys: List<K>): boolean;
    public containsKeys(keys: List<K> | K[]): boolean
    {
        if (this._length === 0) { return false; }
        let keyList: K[];
        if (Array.isArray(keys))
        { keyList = keys; }
        else
        { keyList = keys.copyToArray(); }
       // let allHashcodes: string[] = Object.keys(this._iDict);
        for(let i: number = 0; i < this._length; i++)
        {
            if (this._iDict[this.getHashCode(keyList[i])][0] !== undefined )
            { return true;}
        }
        return false;
    }    


    /**
     * Swaps the values of the two defined keys in the Dictionary
     * @param key1 Key 1
     * @param key2 Key 2
     */
    public swapValues(key1: K, key2: K) {
        if (this.containsKey(key1) === false || this.containsKey(key2) === false) {
            throw new Error("One of the passed keys (" + key1.toString() + ", " + key2.toString() + ") does not exist");
        }
        let hc1: string = this.getHashCode(key1);
        let hc2: string = this.getHashCode(key2);
        let temp: V = this._iDict[hc1][1];
        this._iDict[hc1][1] = this._iDict[hc2][1];
        this._iDict[hc2][1] = temp;
        }

    /**
     * Removes all duplicates of values in the Dictionary. The keys of the remaining values cannot be determined
     */
    public distinct() {
        if (this._length === 0) { return; }
        let newDict: Dictionary<K,V> = new Dictionary<K,V>();
        //let allHashcodes: string[] = Object.keys(this._iDict);
        for (let i = 0; i < this._length; i++) {
            if (newDict.containsKeys(this._iDict[this._iKeyIndex[i]][1]) === false)
            {
                newDict.addInternal(this._iDict[this._iKeyIndex[i]][0], this._iDict[this._iKeyIndex[i]][1]);
            }
        }
        this.clear()
        this.addRange(newDict);
    }

    // // *********************************************** Implemented Interfaces

    // /**
    //  * Sorts the List according to the passed function
    //  * @param sortFunction Function which compares two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned.
    //  */
    // sort(sortFunction: ISortInterFace<T>) {
    //     let qSort: Sorter<T> = new Sorter();
    //     qSort.quickSort(sortFunction, this._iList as T[], 0, this._length);
    // }

    /**
     * Implementation of a forEach loop
     * @param callback Callback function to process the items of the List
     */
    public forEach(callback: IForEachInterface<K,V>) {
        let done: boolean = false;
        let item: IteratorItem<KeyValuePair<K,V>>;
        this._iCounter = 0;
        while (done === false) {
            item = this.next() as IteratorItem<KeyValuePair<K,V>>;
            done = item.isLastEntry;
            callback(item.value);
        }
    }

    /**
     * Method to get the next value of an iterator. If the last item of the List is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach method will also reset the position to 0.
     * @param value Can be ignored
     */
    public next(value?: any): IteratorResult<KeyValuePair<K,V>> {
        let val: KeyValuePair<K,V> = new KeyValuePair(this._iDict[this._iKeyIndex[this._iCounter]][0], this._iDict[this._iKeyIndex[this._iCounter]][1]);
        let lastItem: boolean;
        if (this._iCounter < this.length - 1) {
            this._iCounter++;
            lastItem = false;
        }
        else {
            this._iCounter = 0;
            lastItem = true;
        }
        return new IteratorItem(val, lastItem);
    }

}


