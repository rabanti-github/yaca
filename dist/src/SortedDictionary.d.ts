import { Dictionary } from './Dictionary';
import ISortInterFace from './interfaces/ISortInterface';
import { List } from './List';
/**
 * Class representing a sorted Dictionary (Key and Value pairs) for generic Types with various Dictionary operations. The class is based ob the standard Dictionary<K,V>
 */
export declare class SortedDictionary<K, V> extends Dictionary<K, V> {
    /**
     * Gets the value by index. An error will be thrown if the index was not found
     * @param index Index of the entry
     * @returns The value at the specified index position
     */
    getByIndex(index: number): V;
    /**
     * Gets the values by an array of indices. An error will be thrown if at least one index was not found
     * @param indices Indices of the entries
     * @returns An Array of values at the specified index positions
     */
    getByIndices(indices: number[]): V[];
    /**
    * Gets the values by a List of indices. An error will be thrown if at least one index was not found
    * @param indices Indices of the entries
    * @returns An Array of values at the specified index positions
    */
    getByIndices(indices: List<number>): V[];
    /**
     * Gets the values by an array of indices and returns them as List. An error will be thrown if at least one index was not found
     * @param indices Indices of the entries
     * @returns A List of values at the specified index positions
     */
    getByIndicesAsList(indices: number[]): List<V>;
    /**
    * Gets the values by a List of indices and returns them as List. An error will be thrown if at least one index was not found
    * @param indices Indices of the entries
    * @returns A List of values at the specified index positions
    */
    getByIndicesAsList(indices: List<number>): List<V>;
    /**
     * Gets the key by index. An error will be thrown if the index was not found
     * @param index Index of the entry
     * @returns The key at the specified index position
     */
    getKeyByIndex(index: number): K;
    /**
    * Gets the keys by an array of indices. An error will be thrown if at least one index was not found
    * @param indices Indices of the entries
    * @returns An array of keys at the specified index positions
    */
    getKeysByIndices(indices: number[]): K[];
    /**
   * Gets the keys by a List of indices. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns An array of keys at the specified index positions
   */
    getKeysByIndices(indices: List<number>): K[];
    /**
     * Gets the keys by an array of indices and returns them as List. An error will be thrown if at least one index was not found
     * @param indices Indices of the entries
     * @returns A List of keys at the specified index positions
     */
    getKeysByIndicesAsList(indices: number[]): List<K>;
    /**
     * Gets the keys by a List of indices and returns them as List. An error will be thrown if at least one index was not found
     * @param indices Indices of the entries
     * @returns A List of keys at the specified index positions
     */
    getKeysByIndicesAsList(indices: List<number>): List<K>;
    /**
     * Updates a value at the passed index. The key will not be changed. An error will be thrown if the index was not found
     * @param index Index to update
     * @param value Value to replace the existing value at the index position
     */
    setByIndex(index: number, value: V): void;
    /**
     * Updates the value at the passed indices. The keys will not be changed. An error will be thrown if the arrays of the indices and values don't have the same length or if at least one index was not found
     * @param indices Indices as array
     * @param values Values as array
     * @throws Throws an error if the number of indices and values is not identical
     */
    setByIndices(indices: number[], values: V[]): void;
    /**
     * Updates the value at the passed indices. The keys will not be changed. An error will be thrown if the Lists of the indices and values don't have the same length or if at least one index was not found
     * @param indices Indices as List
     * @param values Values as List
     * @throws Throws an error if the number of indices and values is not identical
     */
    setByIndices(indices: List<number>, values: List<V>): void;
    /**
     * Removes the entry at the defined index position. An error will be thrown if the index was not found
     * @param index Index position to be removed
     */
    removeByIndex(index: number): void;
    /**
     * Removes all entries at the defined indices as List. An error will be thrown if at least one index was not found
     * @param indices Indices to be removed
     */
    removeByIndices(indices: List<number>): void;
    /**
      * Removes all entries at the defined indices as Array. An error will be thrown if at least one index was not found
      * @param indices Indices to be removed
      */
    removeByIndices(indices: number[]): void;
    /**
     * Sorts the Dictionary by its keys using the default sorting method. If a compareTo function is implemented in the key class, this method will be used instead
     */
    sortByKey(): void;
    /**
     * Sorts the Dictionary by its keys using the defined comparison function.
     * @param sortFunction Comparison function for the keys (should return -1, 0 or 1)
     */
    sortByKey(sortFunction: ISortInterFace<K>): void;
    /**
     * Sorts the Dictionary by its values using the default sorting method. If a compareTo function is implemented in the value class, this method will be used instead
     */
    sortByValue(): void;
    /**
     * Sorts the Dictionary by its values using the defined comparison function.
     * @param sortFunction Comparison function for the values (should return -1, 0 or 1)
     */
    sortByValue(sortFunction: ISortInterFace<V>): void;
    /**
     * Validates the passed index
     * @param index Index to check
     * @param length length of the dictionary
     * @throws Throws an error if the index position is out of bound
     */
    private checkIndex(index, length);
    /**Internal method to sort the dictionary by its keys or values
     *
     * @param byKey If true, the dictionary will be sorted by key, otherwise ba value
     * @param sortFunction Optional comparison function
     * @throws Throws an error if no suitable sorting function could be found for the type of the keys or values
     */
    private sortInternal(byKey, sortFunction?);
}
