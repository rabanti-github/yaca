import { Dictionary } from "./Dictionary";
import { KeyValuePair } from "./KeyValuePair";
import ISortInterFace from "./interfaces/ISortInterface";
import List from "./List";
import { Sorter } from "./Sorter";

/**
 * The class represents a sorted dictionary (key and value pairs) for generic types with various dictionary operations. The class is based ob the standard Dictionary<K,V>
 */
export class SortedDictionary<K, V> extends Dictionary<K, V> {
  // ############### P U B L I C   F U N C T I O N S ###############

  /**
   * Gets the value by index. An error will be thrown if the index was not found
   * @param index Index of the entry
   * @returns The value at the specified index position
   */
  public getByIndex(index: number): V {
    let output: V[] = this.getByIndices([index]);
    return output[0]; // Wrong indices are checked in getByIndices
  }

  /**
   * Gets the values by an array of indices. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns An array of values at the specified index positions
   */
  public getByIndices(indices: number[]): V[];
  /**
   * Gets the values by a list of indices. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns An array of values at the specified index positions
   */
  public getByIndices(indices: List<number>): V[];
  public getByIndices(indices: number[] | List<number>): V[] {
    let ind: number[];
    if (indices instanceof List) {
      ind = indices.copyToArray();
    } else {
      ind = indices;
    }
    let len: number = ind.length;
    let output: V[] = new Array(len);
    let values: V[] = super.getValues();
    let len2 = this.length;
    for (let i: number = 0; i < len; i++) {
      this.checkIndex(ind[i], len2);
      output[i] = values[ind[i]];
    }
    return output;
  }

  /**
   * Gets the values by an array of indices and returns them as List. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns A list of values at the specified index positions
   */
  public getByIndicesAsList(indices: number[]): List<V>;
  /**
   * Gets the values by a list of indices and returns them as List. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns A list of values at the specified index positions
   */

  public getByIndicesAsList(indices: List<number>): List<V>;
  public getByIndicesAsList(indices: number[] | List<number>): List<V> {
    if (indices instanceof List) {
      return new List<V>(this.getByIndices(indices as List<number>));
    } else {
      return new List<V>(this.getByIndices(indices as number[]));
    }
  }

  /**
   * Gets the key by index. An error will be thrown if the index was not found
   * @param index Index of the entry
   * @returns The key at the specified index position
   */
  public getKeyByIndex(index: number): K {
    let output: K[] = this.getKeysByIndices([index]);
    return output[0]; // Wrong indices are checked in getByIndices
  }

  /**
   * Gets the keys by an array of indices. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns An array of keys at the specified index positions
   */
  public getKeysByIndices(indices: number[]): K[];
  /**
   * Gets the keys by a list of indices. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns An array of keys at the specified index positions
   */

  public getKeysByIndices(indices: List<number>): K[];
  public getKeysByIndices(indices: number[] | List<number>): K[] {
    let ind: number[];
    if (indices instanceof List) {
      ind = indices.copyToArray();
    } else {
      ind = indices;
    }
    let len: number = ind.length;
    let output: K[] = new Array(len);
    let keys: K[] = super.getKeys();
    let len2 = this.length;
    for (let i: number = 0; i < len; i++) {
      this.checkIndex(ind[i], len2);
      output[i] = keys[ind[i]];
    }
    return output;
  }

  /**
   * Gets the keys by an array of indices and returns them as list. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns A list of keys at the specified index positions
   */
  public getKeysByIndicesAsList(indices: number[]): List<K>;
  /**
   * Gets the keys by a list of indices and returns them as list. An error will be thrown if at least one index was not found
   * @param indices Indices of the entries
   * @returns A list of keys at the specified index positions
   */
  public getKeysByIndicesAsList(indices: List<number>): List<K>;
  public getKeysByIndicesAsList(indices: number[] | List<number>): List<K> {
    if (indices instanceof List) {
      return new List<K>(this.getKeysByIndices(indices as List<number>));
    } else {
      return new List<K>(this.getKeysByIndices(indices as number[]));
    }
  }

  /**
   * Updates a value at the passed index. The key will not be changed. An error will be thrown if the index was not found
   * @param index Index to update
   * @param value Value to replace the existing value at the index position
   */
  public setByIndex(index: number, value: V): void {
    let key: K = this.getKeyByIndex(index);
    super.set(key, value);
  }

  /**
   * Updates the value at the passed indices. The keys will not be changed. An error will be thrown if the arrays of the indices and values don't have the same length or if at least one index was not found
   * @param indices Indices as array
   * @param values Values as array
   * @throws Throws an error if the number of indices and values is not identical
   */
  public setByIndices(indices: number[], values: V[]): void;
  /**
   * Updates the value at the passed indices. The keys will not be changed. An error will be thrown if the Lists of the indices and values don't have the same length or if at least one index was not found
   * @param indices Indices as list
   * @param values Values as list
   * @throws Throws an error if the number of indices and values is not identical
   */
  public setByIndices(indices: List<number>, values: List<V>): void;
  public setByIndices(
    indices: number[] | List<number>,
    values: V[] | List<V>
  ): void {
    if (indices.length !== values.length) {
      throw new Error(
        "The number of indices and values to replace must be identical"
      );
    }
    let ind: number[];
    let val: V[];
    if (indices instanceof List && values instanceof List) {
      ind = indices.copyToArray();
      val = values.copyToArray();
    } else {
      ind = indices as number[];
      val = values as V[];
    }

    let keys: K[] = this.getKeysByIndices(ind);
    let len: number = keys.length;
    for (let i: number = 0; i < len; i++) {
      super.set(keys[i], val[i]);
    }
  }

  /**
   * Removes the entry at the defined index position. An error will be thrown if the index was not found
   * @param index Index position to be removed
   */
  public removeByIndex(index: number): void {
    this.removeByIndices([index]);
  }

  /**
   * Removes all entries at the defined indices as list. An error will be thrown if at least one index was not found
   * @param indices Indices to be removed
   */
  public removeByIndices(indices: List<number>): void;
  /**
   * Removes all entries at the defined indices as array. An error will be thrown if at least one index was not found
   * @param indices Indices to be removed
   */
  public removeByIndices(indices: number[]): void;
  public removeByIndices(index: number[] | List<number>): void {
    let keys: K[];
    if (Array.isArray(index)) {
      keys = this.getKeysByIndices(index as number[]);
    } else {
      keys = this.getKeysByIndices(index as List<number>);
    }
    super.remove(keys);
  }

  /**
   * Sorts the dictionary by its keys using the default sorting method. If a compareTo function is implemented in the key class, this method will be used instead
   */
  public sortByKey(): void;
  /**
   * Sorts the dictionary by its keys using the defined comparison function
   * @param sortFunction Comparison function for the keys (should return -1, 0 or 1)
   */
  public sortByKey(sortFunction: ISortInterFace<K>): void;
  public sortByKey(sortFunction?: ISortInterFace<K>): void {
    this.sortInternal(true, sortFunction);
  }

  /**
   * Sorts the dictionary by its values using the default sorting method. If a compareTo function is implemented in the value class, this method will be used instead
   */
  public sortByValue(): void;
  /**
   * Sorts the dictionary by its values using the defined comparison function
   * @param sortFunction Comparison function for the values (should return -1, 0 or 1)
   */
  public sortByValue(sortFunction: ISortInterFace<V>): void;
  public sortByValue(sortFunction?: ISortInterFace<V>): void {
    this.sortInternal(false, sortFunction);
  }

  // ############### P R I V A T E   F U N C T I O N S ###############

  /**
   * Validates the passed index
   * @param index Index to check
   * @param length Length of the dictionary
   * @throws Throws an error if the index position is out of bound
   */
  private checkIndex(index: number, length: number): void {
    if (index < 0 || index >= length) {
      throw new Error("The index " + index + " is out of bound");
    }
  }

  /**
   * Internal method to sort the dictionary by its keys or values
   * @param byKey If true, the dictionary will be sorted by key, otherwise a value
   * @param sortFunction Optional comparison function
   * @throws Throws an error if no suitable sorting function could be found for the type of the keys or values
   */
  private sortInternal(
    byKey: boolean,
    sortFunction?: ISortInterFace<K> | ISortInterFace<V>
  ): void {
    if (this.length === 0) {
      return;
    }
    var data: KeyValuePair<any, any>[] = new Array(this.length);
    let i: number = 0;
    this.forEach(item => {
      if (byKey) {
        data[i] = new KeyValuePair<K, V>(item.key, item.value);
      } else {
        data[i] = new KeyValuePair<V, K>(item.value, item.key);
      }
      i++;
    });
    let kLen: number = data.length;
    let qSort: Sorter<any>;
    if (byKey) {
      qSort = new Sorter<KeyValuePair<K, V>>(data[0], true); // Pass the 1st object as sample for type checking
    } else {
      qSort = new Sorter<KeyValuePair<V, K>>(data[0], true); // Pass the 1st object as sample for type checking
    }
    //let qSort: Sorter<K> = new Sorter<K>(keys[0] as K); // Pass the 1st object as sample for type checking
    if (sortFunction !== undefined) {
      qSort.sortTupleByFunction(sortFunction, data, 0, kLen);
    } else {
      if (qSort.hasCompareToImplemented === true) {
        qSort.sortTupleByImplementation(data, 0, kLen);
      } else if (qSort.isCommonType === true) {
        qSort.sortTupleByDefault(data, 0, kLen);
      } else {
        if (byKey) {
          throw new Error(
            "No suitable comparison method (a<>b) was found to sort by key (a<b:-1; a==b;0 a>b: 1)"
          );
        } else {
          throw new Error(
            "No suitable comparison method (a<>b) was found to sort by value (a<b:-1; a==b;0 a>b: 1)"
          );
        }
      }
    }
    this.clear();
    for (let i: number = 0; i < kLen; i++) {
      if (byKey) {
        this.add(data[i].key, data[i].value);
      } else {
        this.add(data[i].value, data[i].key);
      }
    }
  }
}
