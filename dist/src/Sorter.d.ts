import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
/**
 * Class for sorter algorithms
 */
export declare class Sorter<T> implements ISorter<T> {
    private _iCompareToImplemented;
    private _iIsBasicType;
    private _iIsCommonType;
    private _iDefaultFunction;
    /**
     * Indicated whether type T is sortable due to the implementation of a compareTo function ort if it is a basic type like number, boolean, string or Date
     */
    readonly hasCompareToImplemented: boolean;
    /**
     * Indicates whether type T is a basic type such as number, boolean or string
     */
    readonly isBasicType: boolean;
    /**
     * Indicates whether type T is a commonly used type such as number, boolean, string or Date
     */
    readonly isCommonType: boolean;
    /**
     * Constructor of the sorter object
     * @param sample The sample is necessary to determine whether T is a basic / common type and whether a compareTo function was implemented
     */
    constructor(sample: T);
    /**
     * Implementation of a quicksort algorithm using a static compareTo function. This method is called recursively
     * @param comparerFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    sortByFunction(comparerFunction: ISortInterFace<T>, data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a quicksort algorithm using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    sortByImplementation(data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a quicksort algorithm using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    sortByDefault(data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Internal swap method for quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swap(data, index1, index2);
    /**
     * Checks whether the type is comparable due to the implementation of a compareTo function
     * @param obj
     */
    private isComparable(obj);
    /**
     * Checks the type of the passed object and sets the appropriate compareTo function if applicable
     * @param obj object to check the type
     */
    private checkBasicCommonType(obj);
}
