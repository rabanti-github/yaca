import { Types } from './Types';
import List from '../src/List';

/**
 * Utils class for testing
 */
export class Utils
{
    Types = Types;

    /**
     * Function to compare two numbers
     * @param n1 number 1 to compare
     * @param n2 number 2 to compare
     */
    public static compareNumbers(n1: number, n2: number): number
    {
        if (n1< n2) {return -1;}
        else if ( n1 === n2) { return 0; }
        else { return 1; }
    }

    /**
     * Function to compare two Dates
     * @param d1 Date 1 to compare
     * @param d2 Date 2 to compare
     */
    public static compareDates(d1: Date, d2: Date): number
    {
        let n1: number = d1.getTime();
        let n2: number = d2.getTime();
        return Utils.compareNumbers(n1, n2);
    }

    /**
     * Function to compare two booleans
     * @param b1 boolean 1 to compare
     * @param b2 boolean 2 to compare
     */
    public static compareBooleans(b1: boolean, b2: boolean): number
    {
        if (b1 !== b2) { return -1; }
        else { return 1; }
    }

    /**
     * Function to setup instances of the List class
     * @param t Type of the list
     * @param initialValue Initial value as single value or array (optional)
     */
    static setupList(t: Types, initialValue?: any | any[]): any
    {
        if (initialValue === undefined)
            {
            if (t === Types.boolean)
            {            
                return new List<boolean>();
            }
            else if (t === Types.date)
            {
                return new List<Date>();
            }
            else if (t === Types.number)
            {
                return new List<number>();
            }
            else if (t === Types.string)
            {
                return new List<string>();
            }
            }
        else
        {
            if (t === Types.boolean)
            {            
                return new List<boolean>(initialValue);
            }
            else if (t === Types.date)
            {
                return new List<Date>(initialValue);
            }
            else if (t === Types.number)
            {
                return new List<number>(initialValue);
            }
            else if (t === Types.string)
            {
                return new List<string>(initialValue);
            }
        }
    }

}