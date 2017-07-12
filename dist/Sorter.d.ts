import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
/**
 * Class for sorter algorithms
 */
export declare class Sorter<T> implements ISorter<T> {
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
    constructor();
}
