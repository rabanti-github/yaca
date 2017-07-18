import { Types } from './Types';
import List from '../src/List';

export class Utils
{
    Types = Types;

    public static compareNumbers(n1: number, n2: number): number
    {
        if (n1< n2) {return -1;}
        else if ( n1 === n2) { return 0; }
        else { return 1; }
    }

    public static compareDates(d1: Date, d2: Date): number
    {
        let n1: number = d1.getTime();
        let n2: number = d2.getTime();
        return Utils.compareNumbers(n1, n2);
    }

    public static compareBooleans(b1: boolean, b2: boolean): number
    {
        if (b1 !== b2) { return -1; }
        else { return 1; }
    }

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