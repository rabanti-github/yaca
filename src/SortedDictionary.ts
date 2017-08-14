import {BaseDictionary} from './BaseDictionary';
import {IComparer} from './interfaces/IComparer';
import  List  from './List';

export class SortedDictionary<K,V> extends BaseDictionary<K,V> implements IComparer<K>
{
    compareTo( other: K ): number
    {
        
    }

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

    private checkIndex(index: number, length: number): void
    {
        if (index < 0 || index >= length)
        {
            throw new Error("The index " + index + " is out of bound");
        }
    }

}