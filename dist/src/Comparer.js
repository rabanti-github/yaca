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
     * Function to compare two strings
     * @param value1 String 1 to compare
     * @param value2 String 2 to compare
     */
    function compareStrings(value1, value2) {
        return value1.localeCompare(value2);
    }
    Comparer.compareStrings = compareStrings;
    /**
     * Function to compare two Dates
     * @param date1 Date 1 to compare
     * @param date2 Date 2 to compare
     */
    function compareDates(date1, date2) {
        var n1 = date1.getTime();
        var n2 = date2.getTime();
        return Comparer.compareNumbers(n1, n2);
    }
    Comparer.compareDates = compareDates;
})(Comparer = exports.Comparer || (exports.Comparer = {}));
//# sourceMappingURL=Comparer.js.map