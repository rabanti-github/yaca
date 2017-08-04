/**
 * Static module with comparer functions
 */
export declare module Comparer {
    /**
     * Function to compare two numbers
     * @param value1 Number 1 to compare
     * @param value2 Number 2 to compare
     */
    function compareNumbers(value1: number, value2: number): number;
    /**
     * Function to compare two booleans
     * @param value1 Boolean 1 to compare
     * @param value2 Boolean 2 to compare
     */
    function compareBooleans(value1: boolean, value2: boolean): number;
    /**
     * Function to compare two strings
     * @param value1 String 1 to compare
     * @param value2 String 2 to compare
     */
    function compareStrings(value1: string, value2: string): number;
    /**
     * Function to compare two Dates
     * @param date1 Date 1 to compare
     * @param date2 Date 2 to compare
     */
    function compareDates(date1: Date, date2: Date): number;
}
