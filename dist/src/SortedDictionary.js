import { Dictionary } from './Dictionary';
import { KeyValuePair } from './KeyValuePair';
import { List } from './List';
import { Sorter } from './Sorter';
/**
 * Class representing a sorted Dictionary (Key and Value pairs) for generic Types with various Dictionary operations. The class is based ob the standard Dictionary<K,V>
 */
export class SortedDictionary extends Dictionary {
    // ############### P U B L I C   F U N C T I O N S ###############
    /**
     * Gets the value by index. An error will be thrown if the index was not found
     * @param index Index of the entry
     * @returns The value at the specified index position
     */
    getByIndex(index) {
        let output = this.getByIndices([index]);
        return output[0]; // Wrong indices are checked in getByIndices
    }
    getByIndices(indices) {
        let ind;
        if (indices instanceof List) {
            ind = indices.copyToArray();
        }
        else {
            ind = indices;
        }
        let len = ind.length;
        let output = new Array(len);
        let values = super.getValues();
        let len2 = this.length;
        for (let i = 0; i < len; i++) {
            this.checkIndex(ind[i], len2);
            output[i] = values[ind[i]];
        }
        return output;
    }
    getByIndicesAsList(indices) {
        if (indices instanceof List) {
            return new List(this.getByIndices(indices));
        }
        else {
            return new List(this.getByIndices(indices));
        }
    }
    /**
     * Gets the key by index. An error will be thrown if the index was not found
     * @param index Index of the entry
     * @returns The key at the specified index position
     */
    getKeyByIndex(index) {
        let output = this.getKeysByIndices([index]);
        return output[0]; // Wrong indices are checked in getByIndices
    }
    getKeysByIndices(indices) {
        let ind;
        if (indices instanceof List) {
            ind = indices.copyToArray();
        }
        else {
            ind = indices;
        }
        let len = ind.length;
        let output = new Array(len);
        let keys = super.getKeys();
        let len2 = this.length;
        for (let i = 0; i < len; i++) {
            this.checkIndex(ind[i], len2);
            output[i] = keys[ind[i]];
        }
        return output;
    }
    getKeysByIndicesAsList(indices) {
        if (indices instanceof List) {
            return new List(this.getKeysByIndices(indices));
        }
        else {
            return new List(this.getKeysByIndices(indices));
        }
    }
    /**
     * Updates a value at the passed index. The key will not be changed. An error will be thrown if the index was not found
     * @param index Index to update
     * @param value Value to replace the existing value at the index position
     */
    setByIndex(index, value) {
        let key = this.getKeyByIndex(index);
        super.set(key, value);
    }
    setByIndices(indices, values) {
        if (indices.length !== values.length) {
            throw new Error("The number of indices and values to replace must be identical");
        }
        let ind;
        let val;
        if (indices instanceof List && values instanceof List) {
            ind = indices.copyToArray();
            val = values.copyToArray();
        }
        else {
            ind = indices;
            val = values;
        }
        let keys = this.getKeysByIndices(ind);
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            super.set(keys[i], val[i]);
        }
    }
    /**
     * Removes the entry at the defined index position. An error will be thrown if the index was not found
     * @param index Index position to be removed
     */
    removeByIndex(index) {
        this.removeByIndices([index]);
    }
    removeByIndices(index) {
        let keys;
        if (Array.isArray(index)) {
            keys = this.getKeysByIndices(index);
        }
        else {
            keys = this.getKeysByIndices(index);
        }
        super.remove(keys);
    }
    sortByKey(sortFunction) {
        this.sortInternal(true, sortFunction);
    }
    sortByValue(sortFunction) {
        this.sortInternal(false, sortFunction);
    }
    // ############### P R I V A T E   F U N C T I O N S ###############
    /**
     * Validates the passed index
     * @param index Index to check
     * @param length length of the dictionary
     * @throws Throws an error if the index position is out of bound
     */
    checkIndex(index, length) {
        if (index < 0 || index >= length) {
            throw new Error("The index " + index + " is out of bound");
        }
    }
    /**Internal method to sort the dictionary by its keys or values
     *
     * @param byKey If true, the dictionary will be sorted by key, otherwise ba value
     * @param sortFunction Optional comparison function
     * @throws Throws an error if no suitable sorting function could be found for the type of the keys or values
     */
    sortInternal(byKey, sortFunction) {
        if (this.length === 0) {
            return;
        }
        var data = new Array(this.length);
        let i = 0;
        this.forEach(item => {
            if (byKey) {
                data[i] = new KeyValuePair(item.key, item.value);
            }
            else {
                data[i] = new KeyValuePair(item.value, item.key);
            }
            i++;
        });
        let kLen = data.length;
        let qSort;
        if (byKey) {
            qSort = new Sorter(data[0], true); // Pass the 1st object as sample for type checking
        }
        else {
            qSort = new Sorter(data[0], true); // Pass the 1st object as sample for type checking
        }
        //let qSort: Sorter<K> = new Sorter<K>(keys[0] as K); // Pass the 1st object as sample for type checking
        if (sortFunction !== undefined) {
            qSort.sortTupleByFunction(sortFunction, data, 0, kLen);
        }
        else {
            if (qSort.hasCompareToImplemented === true) {
                qSort.sortTupleByImplementation(data, 0, kLen);
            }
            else if (qSort.isCommonType === true) {
                qSort.sortTupleByDefault(data, 0, kLen);
            }
            else {
                if (byKey) {
                    throw new Error("No suitable comparison method (a<>b) was found to sort by key (a<b:-1; a==b;0 a>b: 1)");
                }
                else {
                    throw new Error("No suitable comparison method (a<>b) was found to sort by value (a<b:-1; a==b;0 a>b: 1)");
                }
            }
        }
        this.clear();
        for (let i = 0; i < kLen; i++) {
            if (byKey) {
                this.add(data[i].key, data[i].value);
            }
            else {
                this.add(data[i].value, data[i].key);
            }
        }
    }
}
//# sourceMappingURL=SortedDictionary.js.map