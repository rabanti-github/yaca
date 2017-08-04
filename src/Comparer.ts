/**
 * Static module with comparer functions
 */
export module Comparer
{
    /**
     * Function to compare two numbers
     * @param value1 Number 1 to compare
     * @param value2 Number 2 to compare
     */
    export function compareNumbers(value1: number, value2: number): number
    {
        if (value1< value2) {return -1;}
        else if ( value1 === value2) { return 0; }
        else { return 1; }      
    }

    /**
     * Function to compare two booleans
     * @param value1 Boolean 1 to compare
     * @param value2 Boolean 2 to compare
     */
    export function compareBooleans(value1: boolean, value2: boolean): number
    {
        if (value1 === false && value2 === true) { return -1; }
        else if ((value1 === false && value2 === false)||value1 === true && value2 === true) { return 0; }
        else { return 1; }
    }

    /**
     * Function to compare two strings
     * @param value1 String 1 to compare
     * @param value2 String 2 to compare
     */
    export function compareStrings(value1: string, value2: string): number
    {
        return value1.localeCompare(value2);
    }

    /**
     * Function to compare two Dates
     * @param date1 Date 1 to compare
     * @param date2 Date 2 to compare
     */
    export function compareDates(date1: Date, date2: Date): number
    {
        let n1: number = date1.getTime();
        let n2: number = date2.getTime();
        return Comparer.compareNumbers(n1, n2);
    }


}