import { Types } from './Types';
/**
 * Utils class for testing
 */
export declare class Utils {
    Types: typeof Types;
    /**
     * Function to compare two numbers
     * @param n1 number 1 to compare
     * @param n2 number 2 to compare
     */
    static compareNumbers(n1: number, n2: number): number;
    /**
     * Function to compare two Dates
     * @param d1 Date 1 to compare
     * @param d2 Date 2 to compare
     */
    static compareDates(d1: Date, d2: Date): number;
    /**
     * Function to compare two booleans
     * @param b1 boolean 1 to compare
     * @param b2 boolean 2 to compare
     */
    static compareBooleans(b1: boolean, b2: boolean): number;
    /**
     * Function to setup instances of the List class
     * @param t Type of the list
     * @param initialValue Initial value as single value or array (optional)
     */
    static setupList(t: Types, initialValue?: any | any[]): any;
}
