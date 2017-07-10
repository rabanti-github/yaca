
import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
export class Sorter<T> implements ISorter<T>
{
    addNextValue(sortFunction: ISortInterFace<T>, nextValue: T): number {
        
        if (sortFunction(this.baseValue, nextValue) > 0)
        {
            if (this.previousBucket == undefined)
            {
                this.previousBucket = new Sorter<T>(nextValue, this.level - 1);
                return this.level - 1;
            }
            else
            {
               return this.previousBucket.addNextValue(sortFunction, nextValue);
            }
        }
        else
        {
            if (this.nextBucket == undefined)
            {
                this.nextBucket = new Sorter<T>(nextValue, this.level + 1);
                return this.level + 1;
            }
            else
            {
               return this.nextBucket.addNextValue(sortFunction, nextValue);
            }            
        }
        
    }


    public previousBucket: Sorter<T>;
    public nextBucket: Sorter<T>;
    public level: number;
    public baseValue: T;

    constructor(baseValue: T, level: number)
    {
        this.baseValue = baseValue;
        this.level = level;
    }


  
    /*
    public level: number;
    public smallBucket: Sorter;
    public bigBucket: Sorter;
    public values: object;
    public limitValue: any;
    public bucketType: SorterBucketType;
    public bucketSorted: boolean;
    private _internalIndex: number
    private _internalCounter: number;

    public SorterBucketType = SorterBucketType;

    constructor();
    constructor(level: number, limit: any, type: SorterBucketType)
    constructor(level?: number, limit?: any, type?: SorterBucketType)
    {
        this._internalIndex = 0;
        this.values = [];
        this._internalCounter = 0;
        if (level != undefined)
        {
            this.level = level;
            this.limitValue = limit;
            this.bucketType = type;
            this._internalIndex++;
        }
    }

    public addValue(value: any)
    {
        this.values[this._internalIndex] = value;
        this._internalIndex++;
    }

    public getNextValue(reset?: boolean) : any
    {
        if (reset != undefined) { this._internalCounter = 0; }
        if (this._internalCounter > this._internalIndex) { return undefined; }
        let item: any = this.values[this._internalCounter];
        this._internalCounter++;
        return item;
    }

    public addBuckets();
    public addBuckets(smallValue: any, bigValue: any);
    public addBuckets(smallValue?: any, bigValue?: any)
    {
        if (smallValue != undefined && bigValue != undefined)
        {
            this.smallBucket = new Sorter(this.level + 1, smallValue, SorterBucketType.SmallBucket);
            this.bigBucket = new Sorter(this.level + 1, bigValue, SorterBucketType.BigBucket);
        }
        else
        {
            this.smallBucket = new Sorter();
            this.smallBucket.bucketType = SorterBucketType.SmallBucket;
            this.smallBucket.
        }
    }

    public addToSmallBucket(value: any)
    {
        this.smallBucket.addValue(value);
    }

    public addToBigBucket(value: any)
    {
        this.bigBucket.addValue(value);
    }
    */

}