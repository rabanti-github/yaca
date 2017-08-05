import { Types } from './Types';
import { Dictionary } from '../../src/Dictionary';
/**
 * Utils class for testing
 */
export declare class Utils {
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
