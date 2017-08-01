
import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
import { IComparer } from './interfaces/IComparer';
/**
 * Class for sorter algorithms
 */
export class Sorter<T> implements ISorter<T>
{

    private _iCompareToImplemented: boolean = false;
    private _iIsBasicType: boolean = false;
    private _iIsCommonType: boolean = false;
    private _iDefaultFunction: Function;

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


    /**
     * Implementation of a quicksort algorithm using a static compareTo function. This method is called recursively
     * @param comparerFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortByFunction(comparerFunction: ISortInterFace<T>, data: T[], lowIndex: number, highIndex: number) {
    
        if (highIndex - lowIndex <= 1) { return; }
        let pivot: T = data[highIndex -1];
        let splitIndex = lowIndex;
        for(let i: number = lowIndex; i < highIndex - 1; i++)
        {
            if (comparerFunction(data[i], pivot) <= 0)
            {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.sortByFunction(comparerFunction, data, lowIndex, splitIndex);
        this.sortByFunction(comparerFunction, data, splitIndex + 1, highIndex);
        return;
    }

    /**
     * Implementation of a quicksort algorithm using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortByImplementation(data: T[], lowIndex: number, highIndex: number) {
        if (highIndex - lowIndex <= 1) { return; }
        let pivot: T = data[highIndex -1];
        let splitIndex = lowIndex;
        for(let i: number = lowIndex; i < highIndex - 1; i++)
        {
            if ((data[i] as any).compareTo(pivot) <= 0)
            {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.sortByImplementation(data, lowIndex, splitIndex);
        this.sortByImplementation(data, splitIndex + 1, highIndex);
        return;        
    }

    /**
     * Implementation of a quicksort algorithm using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    public sortByDefault(data: T[], lowIndex: number, highIndex: number) {
    
        if (highIndex - lowIndex <= 1) { return; }
        let pivot: T = data[highIndex -1];
        let splitIndex = lowIndex;
        for(let i: number = lowIndex; i < highIndex - 1; i++)
        {
            if (this._iDefaultFunction(data[i], pivot) <= 0)
            {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.sortByDefault(data, lowIndex, splitIndex);
        this.sortByDefault(data, splitIndex + 1, highIndex);
        return;
    }    


    /**
     * Internal swap method for quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swap(data: T[], index1: number, index2: number)
    {
        let temp: T = data[index1];
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
                }
            }
        return false;
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
    private checkBasicCommonType(obj: any)
    {
        if (obj === undefined)
        {
            throw new Error("undefined as value is not allowed while sorting");
        }
        if (typeof obj === 'number')
        {
            this._iDefaultFunction = Sorter.compareNumbers;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === 'boolean')
        {
            this._iDefaultFunction = Sorter.compareBooleans;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (typeof obj === 'string')
        {
            this._iDefaultFunction = Sorter.compareStrings;
            this._iIsBasicType = true;
            this._iIsCommonType = true;
        }
        else if (obj instanceof Date)
        {
            this._iDefaultFunction = Sorter.compareDates;
            this._iIsCommonType = true;
        }
    }


    /**
     * Constructor of the sorter object
     * @param sample The sample is necessary to determine whether T is a basic / common type and whether a compareTo function was implemented
     */
    constructor(sample: T)
    { 
       this._iCompareToImplemented = this.isComparable(sample);
       this.checkBasicCommonType(sample);
    }

    /**
     * Function to compare two numbers
     * @param value1 Number 1 to compare
     * @param value2 Number 2 to compare
     */
    public static compareNumbers(value1: number, value2: number): number
    {
        if (value1< value2) {return -1;}
        else if ( value1 === value2) { return 0; }
        else { return 1; }      
    }

    /**
     * Function to compare two booleans
     * @param value1 Boolean 1 to compare
     * @param value2 Boolean 2 to compare
     */
    public static compareBooleans(value1: boolean, value2: boolean): number
    {
        if (value1 === false && value2 === true) { return -1; }
        else if ((value1 === false && value2 === false)||value1 === true && value2 === true) { return 0; }
        else { return 1; }
    }

    /**
     * Function to compare two strings
     * @param value1 String 1 to compare
     * @param value2 String 2 to compare
     */
    public static compareStrings(value1: string, value2: string): number
    {
        return value1.localeCompare(value2);
    }

    /**
     * Function to compare two Dates
     * @param date1 Date 1 to compare
     * @param date2 Date 2 to compare
     */
    public static compareDates(date1: Date, date2: Date): number
    {
        let n1: number = date1.getTime();
        let n2: number = date2.getTime();
        return Sorter.compareNumbers(n1, n2);
    }

}
