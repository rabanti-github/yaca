
import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
import { IComparer } from './interfaces/IComparer';
import { Comparer }  from './Comparer';
import {KeyValuePair} from './KeyValuePair';


// ############### E N U M S ###############
enum SorterType
{
    sortByDefault,
    sortByImplementation,
    sortByFunction
}

/**
 * Class for sorter algorithms
 */
export class Sorter<T> implements ISorter<T>
{

// ############### P R I V A T E   V A R I A B L E S ###############
    private _iCompareToImplemented: boolean = false;
    private _iIsBasicType: boolean = false;
    private _iIsCommonType: boolean = false;
    private _iIsTupleSort: boolean = false;
    private _iDefaultFunction: Function;

// ############### P R O P E R T I E S ###############    
    /**
     * Indicated whether type T is sortable due to the implementation of a compareTo function ort if it is a basic type like number, boolean, string or Date
     */
    public get hasCompareToImplemented(): boolean
    {
        return this._iCompareToImplemented;
    }

    /**
     * Indicates whether type T is a basic type such as number, boolean or string
     */
    public get isBasicType(): boolean
    {
        return this._iIsBasicType;
    }

    /**
     * Indicates whether type T is a commonly used type such as number, boolean, string or Date
     */
    public get isCommonType(): boolean
    {
        return this._iIsCommonType;
    }    

// ############### C O N S T R U C T O R S ###############

   constructor(sample: KeyValuePair<T,any>, tupleSort: boolean);
    /**
     * Constructor of the sorter object
     * @param sample The sample is necessary to determine whether T is a basic / common type and whether a compareTo function was implemented
     */
    constructor(sample: T);
    constructor(sample: T | KeyValuePair<T,any>, tupleSort?: boolean) 
    { 
        if (sample instanceof KeyValuePair && tupleSort !== undefined)
        {
            this._iIsTupleSort = tupleSort;
            this._iCompareToImplemented = this.isComparable(sample.key);
            this.checkBasicCommonType(sample.key);
        }
       this._iCompareToImplemented = this.isComparable(sample);
       this.checkBasicCommonType(sample);
    }    

// ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Implementation of a quicksort algorithm using a static compareTo function. This method is called recursively
     * @param comparisonFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortByFunction(comparisonFunction: ISortInterFace<T>, data: T[], lowIndex: number, highIndex: number): void
    {
        this.internalSort(data, lowIndex, highIndex, SorterType.sortByFunction, comparisonFunction);
    }

    /**
     * Implementation of a quicksort algorithm using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortByImplementation(data: T[], lowIndex: number, highIndex: number): void
    {
        this.internalSort(data, lowIndex, highIndex, SorterType.sortByImplementation);
     
    }

    /**
     * Implementation of a quicksort algorithm using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortByDefault(data: T[], lowIndex: number, highIndex: number): void
    {
        this.internalSort(data, lowIndex, highIndex, SorterType.sortByDefault);   
    }

    /**
     * Implementation of a quicksort algorithm for Key-Value pairs, using a static compareTo function. This method is called recursively
     * @param comparisonFunction Comparison function to compare the temporary array entry of the passed lower and higher index position
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortTupleByFunction(comparisonFunction: ISortInterFace<T>, data: KeyValuePair<T,any>[], lowIndex: number, highIndex: number): void
    {
        this.internalTupleSort(data, lowIndex, highIndex, SorterType.sortByFunction, comparisonFunction);
    }

    /**
     * Implementation of a quicksort algorithm for Key-Value pairs, using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortTupleByImplementation(data: KeyValuePair<T,any>[], lowIndex: number, highIndex: number): void
    {
        this.internalTupleSort(data, lowIndex, highIndex, SorterType.sortByImplementation);
    }

   /**
     * Implementation of a quicksort algorithm for Key-Value pairs, using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortTupleByDefault(data: KeyValuePair<T,any>[], lowIndex: number, highIndex: number): void
    {
        this.internalTupleSort(data, lowIndex, highIndex, SorterType.sortByDefault);  
    }

// ############### P R I V A T E   F U N C T I O N S ###############

    /**
     * Internal function to perform a quicksort by default, by a passed comparison function or by an implementation of the compareTo function
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     * @param type Type of the sorting implementation (byDefault, byFunction, byImplementation)
     * @param comparisonFunction Comparison function (optional) in case of sorting by function 
     */
    private internalSort(data: T[], lowIndex: number, highIndex: number, type: SorterType, comparisonFunction?: ISortInterFace<T>): void
    {   
        if (highIndex - lowIndex <= 1) { return; }
        let pivot: T = data[highIndex -1];
        let splitIndex = lowIndex;
        let compareResult: number;
        for(let i: number = lowIndex; i < highIndex - 1; i++)
        {
            if (type === SorterType.sortByFunction && comparisonFunction !== undefined)
            {
                compareResult = comparisonFunction(data[i], pivot) ;              
            }
            else if (type === SorterType.sortByImplementation)
            {
                compareResult = (data[i] as any).compareTo(pivot)
            }
            else
            {
                compareResult = this._iDefaultFunction(data[i], pivot);              
            }
            if (compareResult <= 0)
            {
                this.swap(data, i, splitIndex);
                splitIndex++;                
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.internalSort(data, lowIndex, splitIndex, type, comparisonFunction);
        this.internalSort(data, splitIndex + 1, highIndex, type, comparisonFunction);
        return;
    }

    /**
     * Internal function to perform a quicksort on a data tuple by default, by a passed comparison function or by an implementation of the compareTo function
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the temporary array to check
     * @param highIndex Higher index within the temporary array to check
     * @param type Type of the sorting implementation (byDefault, byFunction, byImplementation)
     * @param comparisonFunction Comparison function (optional) in case of sorting by function 
     */
    private internalTupleSort(data: KeyValuePair<T,any>[], lowIndex: number, highIndex: number, type: SorterType, comparisonFunction?: ISortInterFace<T>): void
    {   
        if (highIndex - lowIndex <= 1) { return; }
        let pivot: T = data[highIndex -1].key;
        let splitIndex = lowIndex;
        let compareResult: number;
        for(let i: number = lowIndex; i < highIndex - 1; i++)
        {
            if (type === SorterType.sortByFunction && comparisonFunction !== undefined)
            {
                compareResult = comparisonFunction(data[i].key, pivot) ;              
            }
            else if (type === SorterType.sortByImplementation)
            {
                compareResult = (data[i].key as any).compareTo(pivot)
            }
            else
            {
                compareResult = this._iDefaultFunction(data[i].key, pivot);              
            }
            if (compareResult <= 0)
            {
                this.swapTuple(data, i, splitIndex);
                splitIndex++;                
            }
        }
        this.swapTuple(data, highIndex - 1, splitIndex);
        this.internalTupleSort(data, lowIndex, splitIndex, type, comparisonFunction);
        this.internalTupleSort(data, splitIndex + 1, highIndex, type, comparisonFunction);
        return;
    }    

    /**
     * Internal swap method for quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swap(data: T[], index1: number, index2: number): void
    {
        let temp: T = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    }

    /**
     * Internal swap method for quicksort of tuples
     * @param data Data as array of the type KeyValuePair<T,any>
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swapTuple(data: KeyValuePair<T,any>[], index1: number, index2: number): void
    {
        let temp: KeyValuePair<T,any> = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    }    

    /**
     * Checks whether the type is comparable due to the implementation of a compareTo function
     * @param obj 
     */
    private isComparable(obj: any):obj is IComparer<T>
    { 
        try
        {
            if (obj.compareTo !== undefined)
            {
                if (typeof(obj.compareTo) === 'function')
                {
                    let type: any = obj.compareTo(obj);
                    if (typeof type === 'number')
                    {
                        return true;
                    }
                    else { return false; }
                }
                else { return false; }
            }
            else { return false; }
        }
        catch(e)
        {
            return false;
        }
    }  
    
    /**
     * Checks the type of the passed object and sets the appropriate compareTo function if applicable
     * @param obj object to check the type
     */
    private checkBasicCommonType(obj: any): void
    {
        if (obj === undefined)
        {
           // throw new Error("undefined as value is not allowed while sorting");
            this._iIsBasicType = false;
            this._iIsCommonType = false;           
        }
        if (typeof obj === 'number')
        {
            this._iDefaultFunction = Comparer.compareNumbers;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === 'boolean')
        {
            this._iDefaultFunction = Comparer.compareBooleans;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === 'string')
        {
            this._iDefaultFunction = Comparer.compareStrings;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (obj instanceof Date)
        {
            this._iDefaultFunction = Comparer.compareDates;
            this._iIsCommonType = true;
        }
    }




}
