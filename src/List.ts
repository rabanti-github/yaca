import IForEachInterface from './interfaces/IForEachInterface';
import { IList } from "./interfaces/IList";


export class List<T, T2> implements Iterator<T>, IList<T>//implements IMethods<T>
{

 

    forEach(callback: IForEachInterface<T>) {
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

    constructor()
    {
        this._iCounter = 0;
        this._length = 0;
        this._iList = [];
    }

    
    next(value?: any): IteratorResult<T>
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
   //     this.push(value);
       // this[]
    }

    public get(index: number): T
    {
        return this._iList[index];
    }
    


/*


    public clear()
    {
        let len: number = this.length;
        if (len == 0) { return; }
        for(let i: number = 0; i < len; i++)
        {
            this.pop();
        }
    }

    public contains(value: T): boolean
    {
        if (this.length == 0) { return false; }
        let index: number = this.indexOf(value);
        if (index < 0) {return false;}
        else { return true; }
    }

    public remove(value: T): boolean
    {
        let len: number = this.length;
        if (len == 0) { return false; }
        let oIndex: number = this.indexOf(value);
        if (oIndex < 0) {return false;}
        else
        {
            let indices: List<number> = new List<number>();
            indices.add(oIndex);
            this.indicesToRemove(indices);
            /*
            let a1, a2: T[];
            let len_a1, len_a2;
            if (oIndex == 0)
            {
                a1 = new Array<T>();
                a2 = this.slice(1,len-1);
                len_a1 = 0;
                len_a2 = a2.length;
            }
            else if (oIndex == len - 1)
            {
                a1 = this.slice(0,oIndex - 1);
                a2 = new Array<T>();
                len_a1 = a1.length;
                len_a2 = 0;
            }
            else
            {
                a1 = this.slice(0,oIndex-1);
                a2 = this.slice(oIndex+1,len-1);
                len_a1 = a1.length;
                len_a2 = a2.length;
            }
            this.clear();
            for(let i:number = 0; i < len_a1; i++)
            {
                this.add(a1[i]);
            }
            for(let i:number = 0; i < len_a2; i++)
            {
                this.add(a2[i]);
            }
            * /
            return true;
        }
    }

    public removeAll(value: T): boolean
    {
        let len: number = this.length;
        if (len == 0) { return false; }
        let indices: List<number> = new List<number>();
        for(let i = 0; i < len; i++)
        {
            if (this[i] === value)
            {
                indices.add(i);
            }
        }
        if (indices.length == 0)
        {
            return false;
        }
        else
        {
            this.indicesToRemove(indices);
            return true; 
        }       
    }

    private indicesToRemove(indices: List<number>)
    {
        let iLen = indices.length;
        let len = this.length;
        if (len == 0 || iLen == 0) { return; }
        let newList: List<T> = new List<T>();
        let end: number;
        let start: number = 0;
        let j: number;
        for(let i:number = 0; i < iLen; i++)
        {
            end = indices[i];
            if (end > len - 1 || end < start){ break; }
            for(j = start; j <= end; j++)
            {
                newList.add(this[j]);
            }
            start = end + 1;
        }
        this.clear();
        let nLen: number = newList.length;
        for(let i = 0; i < nLen; i++)
        {
            this.add(newList[i]);
        }
    }
*/
   

}

   export class Item<T> implements IteratorResult<T>
    {
        public isLastEntry: boolean;
        public value: T;

        constructor(value: T, finished: boolean)
        {
            this.isLastEntry = finished;
            this.value = value;
        }
    }
