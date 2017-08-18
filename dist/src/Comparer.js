"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Static module with comparer functions
 */
var Comparer;
(function (Comparer) {
    /**
     * Function to compare two numbers
     * @param value1 Number 1 to compare
     * @param value2 Number 2 to compare
     * @returns A number 1-, 0 or 1 that indicates whether the current number is smaller, equal or bigger than the other number
     */
    function compareNumbers(value1, value2) {
        if (value1 < value2) {
            return -1;
        }
        else if (value1 === value2) {
            return 0;
        }
        else {
            return 1;
        }
    }
    Comparer.compareNumbers = compareNumbers;
    /**
     * Function to compare two booleans
     * @param value1 Boolean 1 to compare
     * @param value2 Boolean 2 to compare
     * @returns A number 1-, 0 or 1: -1 if current is false and other is true, 0 if both are false or true, 1 if current is true an other is false
     */
    function compareBooleans(value1, value2) {
        if (value1 === false && value2 === true) {
            return -1;
        }
        else if ((value1 === false && value2 === false) || value1 === true && value2 === true) {
            return 0;
        }
        else {
            return 1;
        }
    }
    Comparer.compareBooleans = compareBooleans;
    /**
     * Function to compare two strings. Other objects will be converted to strings using the toString function
     * @param value1 String / object 1 to compare
     * @param value2 String / object 2 to compare
     * @returns A number 1-, 0 or 1 that indicates whether the current string is smaller, equal or bigger than the other string
     */
    function compareStrings(value1, value2) {
        if (typeof value1 === 'string' && typeof value2 === 'string') {
            return value1.localeCompare(value2);
        }
        else {
            return value1.toString().localeCompare(value2.toString());
        }
    }
    Comparer.compareStrings = compareStrings;
    /**
     * Function to compare two Dates
     * @param date1 Date 1 to compare
     * @param date2 Date 2 to compare
     * @returns A number 1-, 0 or 1 that indicates whether the current date is smaller, equal or bigger than the other date
     */
    function compareDates(date1, date2) {
        var n1 = date1.getTime();
        var n2 = date2.getTime();
        return Comparer.compareNumbers(n1, n2);
    }
    Comparer.compareDates = compareDates;
})(Comparer = exports.Comparer || (exports.Comparer = {}));
//# sourceMappingURL=Comparer.js.map