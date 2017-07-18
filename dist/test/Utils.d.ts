import { Types } from './Types';
export declare class Utils {
    Types: typeof Types;
    static compareNumbers(n1: number, n2: number): number;
    static compareDates(d1: Date, d2: Date): number;
    static compareBooleans(b1: boolean, b2: boolean): number;
    static setupList(t: Types, initialValue?: any | any[]): any;
}
