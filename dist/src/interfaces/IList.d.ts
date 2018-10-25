import IForEachInterface from "./IForEachInterfaceList";
import ISortInterface from "./ISortInterface";
/**
 * Interface for lists (delegating further interfaces)
 */
export interface IList<T> {
    /**
     * Interface to handle forEach loops
     */
    forEach(callback: IForEachInterface<T>): void;
    /**
     * Interface to handle sorting
     */
    sort(sortFunction: ISortInterface<T>): void;
}
