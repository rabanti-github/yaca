import ISortInterface from './ISortInterface';
/**
 * Interface to handle sorting (delegates further interface(s))
 */
export interface ISorter<T> {
    /**
     * Interface for the quicksort algorithm
     */
    quickSort(comparerFunction: ISortInterface<T>, data: T[], lowIndex: number, highIndex: number): any;
}
