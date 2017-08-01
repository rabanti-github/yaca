import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
/**
 * Class for sorter algorithms
 */
export declare class Sorter<T> implements ISorter<T> {
    private _iCompareToImplemented;
    private _iIsBasicType;
    /**
     * Indicated whether type T is sortable due to the implementation of a compareTo function ort if it is a basic type like number, boolean, string or Date
     */
    readonly hasCompareToImplemented: boolean;
    /**
     * Indicates whether type T is a basic type such as number, boolean, string or Date
     */
    readonly isBasicType: boolean;
    /**
     * Implementation of a quicksort algorithm. This method is called recursively
     * @param comparerFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
    quickSort(comparerFunction: ISortInterFace<T>, data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Internal swap method for quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swap(data, index1, index2);
    /**
     * Checks whether the type T is comparable due to the implementation of a compareTo function
     * @param obj
     */
    private isComparable(obj);
    private getInstance<T>(type);
    constructor();
}
