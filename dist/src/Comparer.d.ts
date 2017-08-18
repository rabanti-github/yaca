/**
 * Static module with comparer functions
 */
export declare module Comparer {
    /**
     * Function to compare two numbers
     * @param value1 Number 1 to compare
     * @param value2 Number 2 to compare
     * @returns A number 1-, 0 or 1 that indicates whether the current number is smaller, equal or bigger than the other number
     */
    function compareNumbers(value1: number, value2: number): number;
    /**
     * Function to compare two booleans
     * @param value1 Boolean 1 to compare
     * @param value2 Boolean 2 to compare
     * @returns A number 1-, 0 or 1: -1 if current is false and other is true, 0 if both are false or true, 1 if current is true an other is false
     */
    function compareBooleans(value1: boolean, value2: boolean): number;
    /**
     * Function to compare two strings. Other objects will be converted to strings using the toString function
     * @param value1 String / object 1 to compare
     * @param value2 String / object 2 to compare
     * @returns A number 1-, 0 or 1 that indicates whether the current string is smaller, equal or bigger than the other string
     */
    function compareStrings(value1: any, value2: any): number;
    /**
     * Function to compare two Dates
     * @param date1 Date 1 to compare
     * @param date2 Date 2 to compare
     * @returns A number 1-, 0 or 1 that indicates whether the current date is smaller, equal or bigger than the other date
     */
    function compareDates(date1: Date, date2: Date): number;
}
