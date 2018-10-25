import ISortInterface from "./ISortInterface";
/**
 * Interface to handle sorting (delegates further interface(s))
 */
export interface ISorter<T> {
    /**
     * Interface for the Quicksort algorithm using a passed comparison function
     */
    sortByFunction(comparerFunction: ISortInterface<T>, data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Interface for the Quicksort algorithm using an implemented comparesTi function or the default sorting function for the basic types
     */
    sortByImplementation(data: T[], lowIndex: number, highIndex: number): void;
}
