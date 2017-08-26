import { Types } from './Types';
import { List } from '../../src/List';
import { Dictionary } from '../../src/Dictionary';
/**
 * Utils class for testing
 */
export class Utils {
    /**
     * Function to test an overwritten hash function for dates (used in Dictionary)
     * @param date Date to get the hash
     */
    static properDateHashFunction(date) {
        return date.getTime().toString();
    }
    /**
     * Function to setup instances of the List class
     * @param t Type of the list
     * @param initialValue Initial value as single value or array (optional)
     */
    static setupList(t, initialValue) {
        if (initialValue === undefined) {
            if (t === Types.boolean) {
                return new List();
            }
            else if (t === Types.date) {
                return new List();
            }
            else if (t === Types.number) {
                return new List();
            }
            else if (t === Types.string) {
                return new List();
            }
            else {
                return new List();
            }
        }
        else {
            if (t === Types.boolean) {
                return new List(initialValue);
            }
            else if (t === Types.date) {
                return new List(initialValue);
            }
            else if (t === Types.number) {
                return new List(initialValue);
            }
            else if (t === Types.string) {
                return new List(initialValue);
            }
            else {
                return new List(initialValue);
            }
        }
    }
    static setupDictionary(keyType, valueType, keys, values) {
        if (keys === undefined || values === undefined) {
            if (keyType === Types.boolean && valueType === Types.boolean) {
                return new Dictionary();
            }
            else if (keyType === Types.boolean && valueType === Types.date) {
                return new Dictionary();
            }
            else if (keyType === Types.boolean && valueType === Types.number) {
                return new Dictionary();
            }
            else if (keyType === Types.boolean && valueType === Types.string) {
                return new Dictionary();
            }
            else if (keyType === Types.date && valueType === Types.boolean) {
                return new Dictionary();
            }
            else if (keyType === Types.date && valueType === Types.date) {
                return new Dictionary();
            }
            else if (keyType === Types.date && valueType === Types.number) {
                return new Dictionary();
            }
            else if (keyType === Types.date && valueType === Types.string) {
                return new Dictionary();
            }
            else if (keyType === Types.number && valueType === Types.boolean) {
                return new Dictionary();
            }
            else if (keyType === Types.number && valueType === Types.date) {
                return new Dictionary();
            }
            else if (keyType === Types.number && valueType === Types.number) {
                return new Dictionary();
            }
            else if (keyType === Types.number && valueType === Types.string) {
                return new Dictionary();
            }
            else if (keyType === Types.string && valueType === Types.boolean) {
                return new Dictionary();
            }
            else if (keyType === Types.string && valueType === Types.date) {
                return new Dictionary();
            }
            else if (keyType === Types.string && valueType === Types.number) {
                return new Dictionary();
            }
            else if (keyType === Types.string && valueType === Types.string) {
                return new Dictionary();
            }
            else {
                return new Dictionary();
            }
        }
        else {
            if (keyType === Types.boolean && valueType === Types.boolean) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.boolean && valueType === Types.date) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.boolean && valueType === Types.number) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.boolean && valueType === Types.string) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.date && valueType === Types.boolean) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.date && valueType === Types.date) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.date && valueType === Types.number) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.date && valueType === Types.string) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.number && valueType === Types.boolean) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.number && valueType === Types.date) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.number && valueType === Types.number) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.number && valueType === Types.string) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.string && valueType === Types.boolean) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.string && valueType === Types.date) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.string && valueType === Types.number) {
                return new Dictionary(keys, values);
            }
            else if (keyType === Types.string && valueType === Types.string) {
                return new Dictionary(keys, values);
            }
            else {
                return new Dictionary(keys, values);
            }
        }
    }
}
//# sourceMappingURL=Utils.js.map