import IForEachInterface from './IForEachInterface';
import ISortInterface from './ISortInterface';
/**
 * Interface for List (Delegating further interfaces)
 */
export interface IList<T> {
    /**
     * Interface to handle foeEach loops
     */
    forEach(callback: IForEachInterface<T>): any;
    /**
     * Interface to handle sorting
     */
    sort(sortFunction: ISortInterface<T>): any;
}
