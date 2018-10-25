import ISortInterFace from "./interfaces/ISortInterface";
import { ISorter } from "./interfaces/ISorter";
import { KeyValuePair } from "./KeyValuePair";
/**
 * Class for sorter algorithms
 */
export declare class Sorter<T> implements ISorter<T> {
    private _iCompareToImplemented;
    private _iIsBasicType;
    private _iIsCommonType;
    private _iIsTupleSort;
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
     * Indicates whether single values or tuples are sorted. Tuples can only be sorted as KeyValuePairs
     */
    readonly isTupleSort: boolean;
    /**
     * Constructor of the sorter object as TupleSort. A known issue is that the Sorter object must be instanced with the type Sorter<any> instead of Sorter<KeyValuePair<string,any>>
     * @param sample The sample is necessary to determine whether T is a basic / common type and whether a compareTo function was implemented. The test will be performed on the key of the key-value pair
     * @param tupleSort If true, the sort functions will be treated as tuple sort, otherwise as single-value sort
     */
    constructor(sample: KeyValuePair<T, any>, tupleSort: boolean);
    /**
     * Constructor of the sorter object
     * @param sample The sample is necessary to determine whether T is a basic / common type and whether a compareTo function was implemented
     */
    constructor(sample: T);
    /**
     * Implementation of a Quicksort algorithm using a static compareTo function. This method is called recursively
     * @param comparisonFunction Comparison function to compare the list entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    sortByFunction(comparisonFunction: ISortInterFace<T>, data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a Quicksort algorithm using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    sortByImplementation(data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a Quicksort algorithm using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    sortByDefault(data: T[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a Quicksort algorithm for key-value pairs, using a static compareTo function. This method is called recursively
     * @param comparisonFunction Comparison function to compare the temporary array entry of the passed lower and higher index position
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    sortTupleByFunction(comparisonFunction: ISortInterFace<T>, data: KeyValuePair<T, any>[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a Quicksort algorithm for key-value pairs, using the class implementation of a compareTo function. This method is called recursively
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    sortTupleByImplementation(data: KeyValuePair<T, any>[], lowIndex: number, highIndex: number): void;
    /**
     * Implementation of a Quicksort algorithm for key-value pairs, using the previous determined default compareTo function. This method is called recursively
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     */
    sortTupleByDefault(data: KeyValuePair<T, any>[], lowIndex: number, highIndex: number): void;
    /**
     * Internal function to perform a Quicksort by default, by a passed comparison function or by an implementation of the compareTo function
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the list to check
     * @param highIndex Higher index within the list to check
     * @param type Type of the sorting implementation (byDefault, byFunction, byImplementation)
     * @param comparisonFunction Comparison function (optional) in case of sorting by function
     */
    private internalSort;
    /**
     * Internal function to perform a Quicksort on a data tuple by default, by a passed comparison function or by an implementation of the compareTo function
     * @param data Data as array of the type KeyValuePair<T,any>, whereas T may be K (when sorted by key) or V (when sorted by value). The any parameter is either V or K as opposite value
     * @param lowIndex Lower index within the temporary array to check
     * @param highIndex Higher index within the temporary array to check
     * @param type Type of the sorting implementation (byDefault, byFunction, byImplementation)
     * @param comparisonFunction Comparison function (optional) in case of sorting by function
     */
    private internalTupleSort;
    /**
     * Internal swap method for Quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swap;
    /**
     * Internal swap method for Quicksort of tuples
     * @param data Data as array of the type KeyValuePair<T,any>
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swapTuple;
    /**
     * Checks whether the type is comparable due to the implementation of a compareTo function
     * @param obj Object toc check
     */
    private isComparable;
    /**
     * Checks the type of the passed object and sets the appropriate compareTo function if applicable
     * @param obj object to check
     */
    private checkBasicCommonType;
}
