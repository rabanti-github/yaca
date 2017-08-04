import { Types } from './Types';
import { Dictionary } from '../../src/Dictionary';
/**
 * Utils class for testing
 */
export declare class Utils {
    /**
     * Function to compare two numbers
     * @param n1 number 1 to compare
     * @param n2 number 2 to compare
     */
    /**
     * Function to compare two Dates
     * @param d1 Date 1 to compare
     * @param d2 Date 2 to compare
     */
    /**
     * Function to compare two booleans
     * @param b1 boolean 1 to compare
     * @param b2 boolean 2 to compare
     */
    /**
     * Function to test an overwritten hash function for dates (used in Dictionary)
     * @param date Date to get the hash
     */
    static properDateHashFunction(date: Date): string;
    /**
     * Function to setup instances of the List class
     * @param t Type of the list
     * @param initialValue Initial value as single value or array (optional)
     */
    static setupList(t: Types, initialValue?: any | any[]): any;
    static setupDictionary(keyType: Types, valueType: Types, keys?: any | any[], values?: any | any[]): Dictionary<any, any>;
}
