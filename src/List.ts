import IForEachInterface from './interfaces/IForEachInterface';
import ISortInterFace from './interfaces/ISortInterface';
import { IList } from './interfaces/IList';
import { Item } from './Item';
import { Sorter } from './Sorter';


export class List<T> implements Iterator<T>, IList<T>
{


    sort(sortFunction: ISortInterFace<T>) {
        let indicator: number;
        if (this._length < 2) { return; }
        

        let base: Sorter<T> = new Sorter(this._iList[0], 0);
        let level: number;
        let bottomLevel : number = 0;
        for(let i: number = 1; i < this._length; i++)
        {
           level = base.addNextValue(sortFunction, this._iList[i]);
           if (level < bottomLevel) { bottomLevel = level; }
        }
        let x: number = 0;
        
    }







   public forEach(callback: IForEachInterface<T>) {
        let done: boolean = false;
        let item: Item<T>;
        while(done == false)
        {
           item = this.next() as Item<T>;
           done = item.isLastEntry;
           callback(item.value);
        }
    }

   // readonly [index: number]: T;
    private _iList: object;
    private _length: number;
    private _iCounter: number;

    constructor();
    constructor(value: T);
    constructor(values: T[]);
    constructor(values: List<T>);
    constructor(values?: T | T[] | List<T>)
    {
        this._iCounter = 0;
        this._length = 0;
        this._iList = [];
        if (values != undefined)
        {
            if (Array.isArray(values))
            {
                this.addRange(values);
            }
            else if (values instanceof List)
            {
                this.addRange(values);
            }
            else
            {
                this.add(values);
            }
        }
    }

    
     public next(value?: any): IteratorResult<T>
     {
        let val: any = this._iList[this._iCounter];
        let lastItem: boolean;
        if (this._iCounter < this.length - 1)
        {
            this._iCounter++;
            lastItem = false;           
        }
        else
        {
            this._iCounter = 0;
            lastItem = true;
        }
        return new Item(val, lastItem);
    }

    public get length(): number
    {
        this._length = Object.keys(this._iList).length
        return this._length;
    }

    public add(value: T)
    {
        this._iList[this._length] = value;
        this._length++;
    }

    public addRange(values: List<T>);
    public addRange(values: T[]);
    public addRange(values: T[] | List<T>)
    {
        if (Array.isArray(values))
        {
            for(let i: number = 0; i < values.length; i++)
            {
                this.add(values[i]);
            }
        }
        else
        {
            for(let i: number = 0; i < values.length; i++)
            {
                this.add(values.get(i));
            }
        }
    }

    public get(index: number): T
    {
        let value: T = this._iList[index];
        if (value != undefined)
        {
            return value;
        }
        else
        {
            throw new Error("The index " + index + " was not found in the list");
        }
    }
    
    public clear()
    {
        if (this._length == 0) { return; }
        else
        {
            this._iList = [];
            this._length = 0;
        }
    }

    public indexOf (value: T): number
    {
        return (this._iList as any).indexOf(value);
    }

    public indicesOf(value: T): number[]
    public indicesOf(value: T, asList: boolean): List<number>;
    public indicesOf(value: T, asList?: boolean): any
    {
        let indices: List<number> = new List<number>();
        for(let i = 0; i < this._length; i++)
        {
            if (this._iList[i] === value)
            {
                indices.add(i);
            }
        }
        if (asList != undefined && asList == true)
        {
            return indices;
        }
        else
        {
            return indices.copyToArray();
        }        
    }    

    public contains(value: T): boolean
    {
        if (this._length == 0) { return false; }
        let index: number = this.indexOf(value);
        if (index < 0) {return false;}
        else { return true; }
    }

    public remove(value: T): boolean
    {
        if (this._length == 0) { return false; }
        let oIndex: number = this.indexOf(value);
        if (oIndex < 0) {return false;}
        else
        {
            let indices: List<number> = new List<number>(oIndex);
            this.removeAtIndices(indices);
            return true;
        }
    }

    public removeAll(value: T): boolean
    {
        if (this._length == 0) { return false; }
        let indices: List<number> = this.indicesOf(value, true);
        if (indices.length == 0)
        {
            return false;
        }
        else
        {
            this.removeAtIndices(indices);
            return true; 
        }       
    }

    public removeAt(index: number)
    {
       let i: List<number> = new List<number>(index);
    }

    public removeAtIndices(indices: number[]);
    public removeAtIndices(indices: List<number>);
    public removeAtIndices(indices: List<number> | number[])
    {
        let list: List<number>;
        if (Array.isArray(indices))
        {
            list = new List<number>(indices);
        }
        else
        {
            list = indices;
        }
        let iLen = list.length;
        if (this._length == 0 || iLen == 0) { return; }
        let newList: List<T> = new List<T>();

        for (let i: number = 0; i < this._length; i++)
        {
            if (list.contains(i)) { continue; }
            newList.add(this._iList[i]);
        }
        this.clear();
        this._iList = newList.copyToArray();
        this._length = this.length;
    }
    
    public copyToArray(): T[];
    public copyToArray(startIndex:number): T[];
    public copyToArray(startIndex:number, endIndex: number): T[];
    public copyToArray(start?: number, end?: number): T[]
    {
        return this.copyTo(start, end, true);     
    }

    public getRange(): List<T>;
    public getRange(startIndex:number): List<T>;
    public getRange(startIndex:number, endIndex: number): List<T>;
    public getRange(start?: number, end?: number): List<T>
    {
        return this.copyTo(start, end, false);       
    }

    private copyTo(start: number, end: number, toArray: boolean) : any
    {
        let startIndex = 0;
        let endIndex = this._length - 1;
        if (start != undefined) { startIndex = start;}
        if (end != undefined) { endIndex = end;}
        if (startIndex < 0 || startIndex > endIndex)
        {
            throw new Error("The passed start index " + start + " is out of range")
        }
        if (endIndex < startIndex || endIndex > this._length - 1)
        {
            throw new Error("The passed end index " + end + " is out of range")
        }
        let output: any;
        if (toArray == true)
        { output = new Array(endIndex - startIndex + 1); }
        else
        { output =  new List<T>();  }
         
        for(let i: number = startIndex; i <= endIndex; i++)
        {
            if (toArray == true)
            {
                output[i] = this._iList[i];
            }
            else
            {
                output.add(this._iList[i]);
            }
        }
        return output;     
    }

    public reverse()
    {
        if (this._length == 0) { return; }
        let halfLength = Math.floor(this._length / 2);
        let i1 = 0;
        let i2 = this._length - 1;
        var temp: T;
        for(let i = 0; i < halfLength; i++)
        {
            this.swapValuesInternal(i1, i2, temp);
            i1++;
            i2--;
        }
    }

    public swapValues(index1: number, index2: number)
    {
        if (index1 < 0 || index1 > this._length -1 || index2 < 0 || index2 > this._length -1)
        {
            throw new Error("The passed indices (" + index1 + ", " + index2 + ") are out of range");
        }
        var temp: T;
        this.swapValuesInternal(index1, index2, temp);
    }

    private swapValuesInternal(index1: number, index2: number, tempParameter: T)
    {
        tempParameter = this._iList[index1];
        this._iList[index1] = this._iList[index2];
        this._iList[index2] = tempParameter;
    }


    

   

}

   
