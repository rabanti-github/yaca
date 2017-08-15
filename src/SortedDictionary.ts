import {Dictionary} from './Dictionary';
import {KeyValuePair} from './KeyValuePair';
import ISortInterFace from './interfaces/ISortInterface';
import  List  from './List';
import {Sorter} from './Sorter';

export class SortedDictionary<K,V> extends Dictionary<K,V>
{

    public getByIndex(index: number): V
    {
        let output: V[] = this.getByIndices([index]);
        return output[0]; // Wrong indices are checked in getByIndices
    }

    public getByIndices(indices: number[]): V[];
    public getByIndices(indices: List<number>): V[];
    public getByIndices(indices: number[] | List<number>): V[]
    {
        let ind: number[];
        if  (indices instanceof List)
        {
            ind = indices.copyToArray();
        }
        else
        {
            ind = indices;
        }
        let len: number = ind.length;
        let output: V[] = new Array(len);
        let values: V[] = super.getValues();
        let len2 = this.length;
        for(let i: number = 0; i < len; i++)
        {
            this.checkIndex(ind[i], len2);
            output[i] = values[ind[i]];
        }
        return output;
    }

    public getByIndicesAsList(indices: number[]): List<V>;
    public getByIndicesAsList(indices: List<number>): List<V>;
    public getByIndicesAsList(indices: number[] | List<number>): List<V>
    {
        if  (indices instanceof List)
        {
            return new List<V>(this.getByIndices(indices as List<number>));
        }
        else
        {
            return new List<V>(this.getByIndices(indices as number[]));
        }
    }    



    public getKeyByIndex(index: number): K
    {
        let output: K[] = this.getKeysByIndices([index]);
        return output[0]; // Wrong indices are checked in getByIndices
    }

    public getKeysByIndices(indices: number[]): K[];
    public getKeysByIndices(indices: List<number>): K[];
    public getKeysByIndices(indices: number[] | List<number>): K[]
    {
        let ind: number[];
        if  (indices instanceof List)
        {
            ind = indices.copyToArray();
        }
        else
        {
            ind = indices;
        }
        let len: number = ind.length;
        let output: K[] = new Array(len);
        let keys: K[] = super.getKeys();
        let len2 = this.length;
        for(let i: number = 0; i < len; i++)
        {
            this.checkIndex(ind[i], len2);
            output[i] = keys[ind[i]];
        }
        return output;
    }

    public getKeysByIndicesAsList(indices: number[]): List<K>;
    public getKeysByIndicesAsList(indices: List<number>): List<K>;
    public getKeysByIndicesAsList(indices: number[] | List<number>): List<K>
    {
        if  (indices instanceof List)
        {
            return new List<K>(this.getKeysByIndices(indices as List<number>));
        }
        else
        {
            return new List<K>(this.getKeysByIndices(indices as number[]));
        }
    }    



    public setByIndex(index: number, value: V): void
    {
       let key:K = this.getKeyByIndex(index);
       super.set(key, value);
    }


    public setByIndices(indices: number[], values: V[]): void;
    public setByIndices(indices: List<number>, values: List<V>): void;
    public setByIndices(indices: number[] | List<number>, values: V[] | List<V>): void
    {
        if (indices.length !== values.length)
        {
            throw new Error("The number of indices and values to replace must be identical");
        }
        let ind: number[];
        let val: V[];
        if  (indices instanceof List && values instanceof List)
        {
            ind = indices.copyToArray();
            val = values.copyToArray();
        }
        else
        {
            ind = indices as number[];
            val = values as V[];
        }
        
        let keys: K[] = this.getKeysByIndices(ind);
        let len: number = keys.length;
        for(let i: number = 0; i < len; i++)
        {
            super.set(keys[i], val[i])
        }        
    }
  

    public removeByIndex(indices: List<number>): boolean;
    public removeByIndex(indices: number[]): boolean;
    public removeByIndex(index: number): boolean;
    public removeByIndex(index: number | number[] | List<number>): boolean
    {
        let keys: K[];
        if (Array.isArray(index))
        {
            keys = this.getKeysByIndices(index as number[]);
        }
        else if (index instanceof List)
        {
            keys = this.getKeysByIndices(index as List<number>);
        }
        else
        {
            keys = this.getKeysByIndices([index]);
        }
        return super.remove(keys);
    }


    private checkIndex(index: number, length: number): void
    {
        if (index < 0 || index >= length)
        {
            throw new Error("The index " + index + " is out of bound");
        }
    }

    public sortByKey(): void;
    public sortByKey(sortFunction: ISortInterFace<K>): void;
    public sortByKey(sortFunction?: ISortInterFace<K>): void
    {
        this.sortInternal(true, sortFunction);
    }

    public sortByValue(): void;
    public sortByValue(sortFunction: ISortInterFace<V>): void;
    public sortByValue(sortFunction?: ISortInterFace<V>): void
    {
        this.sortInternal(false, sortFunction);
    }    
    

    private sortInternal(byKey: boolean, sortFunction?: ISortInterFace<K> |  ISortInterFace<V>): void 
    {
        if (this.length === 0) { return; }
        var data: KeyValuePair<any, any>[] = new Array(this.length);
        let i: number = 0;
        this.forEach(item => {
            if (byKey)
            {
                data[i] = new KeyValuePair<K,V>(item.key, item.value);
            }
            else
            {
                data[i] = new KeyValuePair<V,K>(item.value, item.key);
            }
        });
        let kLen: number = data.length;
        let qSort: Sorter<any>;
        if (byKey)
        {
            qSort = new Sorter<KeyValuePair<K,V>>(data[0], true); // Pass the 1st object as sample for type checking
        }
        else
        {
            qSort = new Sorter<KeyValuePair<V,K>>(data[0], true); // Pass the 1st object as sample for type checking
        }
        //let qSort: Sorter<K> = new Sorter<K>(keys[0] as K); // Pass the 1st object as sample for type checking
        if (sortFunction !== undefined)
        {
            qSort.sortTupleByFunction(sortFunction, data, 0, kLen);
        }
        else
        {
            if (qSort.hasCompareToImplemented === true)
            {
                qSort.sortTupleByImplementation(data, 0, kLen);
            }
            else if (qSort.isCommonType === true)
            {
                qSort.sortTupleByDefault(data, 0, kLen);
            }
            else
            {
                if (byKey)
                {
                    throw new Error("No suitable comparison method (a<>b) was found to sort by key (a<b:-1; a==b;0 a>b: 1)");
                }
                else
                {
                    throw new Error("No suitable comparison method (a<>b) was found to sort by value (a<b:-1; a==b;0 a>b: 1)");
                } 
            }  
        }
        this.clear();
        for(let i: number = 0; i < kLen; i++)
        {
            if (byKey)
            {
                this.add(data[i].key, data[i].value)
            }
            else
            {
                this.add(data[i].value, data[i].key)
            } 
        }
    }


}