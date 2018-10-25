import { Types } from "./Types";
import { Dictionary } from "../../src/Dictionary";
/**
 * Utils class for testing
 */
export declare class Utils {
    /**
     * Method to test an overwritten hash function for dates (used in Dictionary)
     * @param date Date to get the hash
     */
    static properDateHashFunction(date: Date): string;
    /**
     * Method to setup instances of the List class
     * @param t Type of the list
     * @param initialValue Initial value as single value or array (optional)
     */
    static setupList(t: Types, initialValue?: any | any[]): any;
    /**
     * Method to setup instances of the Dictionary class
     * @param keyType Key type of the dictionary
     * @param valueType Value type of the dictionary
     * @param keys Initial keys as single value or array (optional)
     * @param values Initial value as single value or array (optional)
     */
    static setupDictionary(keyType: Types, valueType: Types, keys?: any | any[], values?: any | any[]): Dictionary<any, any>;
}
