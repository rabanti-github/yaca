import { Types } from "./Types";
import List from "../../src/List";
import { Dictionary } from "../../src/Dictionary";

/**
 * Utils class for testing
 */
export class Utils {
  /**
   * Method to test an overwritten hash function for dates (used in Dictionary)
   * @param date Date to get the hash
   */
  public static properDateHashFunction(date: Date): string {
    return date.getTime().toString();
  }

  /**
   * Method to setup instances of the List class
   * @param t Type of the list
   * @param initialValue Initial value as single value or array (optional)
   */
  static setupList(t: Types, initialValue?: any | any[]): any {
    if (initialValue === undefined) {
      if (t === Types.boolean) {
        return new List<boolean>();
      } else if (t === Types.date) {
        return new List<Date>();
      } else if (t === Types.number) {
        return new List<number>();
      } else if (t === Types.string) {
        return new List<string>();
      } else {
        return new List<any>();
      }
    } else {
      if (t === Types.boolean) {
        return new List<boolean>(initialValue);
      } else if (t === Types.date) {
        return new List<Date>(initialValue);
      } else if (t === Types.number) {
        return new List<number>(initialValue);
      } else if (t === Types.string) {
        return new List<string>(initialValue);
      } else {
        return new List<any>(initialValue);
      }
    }
  }

  /**
   * Method to setup instances of the Dictionary class
   * @param keyType Key type of the dictionary
   * @param valueType Value type of the dictionary
   * @param keys Initial keys as single value or array (optional)
   * @param values Initial value as single value or array (optional)
   */
  public static setupDictionary(
    keyType: Types,
    valueType: Types,
    keys?: any | any[],
    values?: any | any[]
  ): Dictionary<any, any> {
    if (keys === undefined || values === undefined) {
      if (keyType === Types.boolean && valueType === Types.boolean) {
        return new Dictionary<boolean, boolean>();
      } else if (keyType === Types.boolean && valueType === Types.date) {
        return new Dictionary<boolean, Date>();
      } else if (keyType === Types.boolean && valueType === Types.number) {
        return new Dictionary<boolean, number>();
      } else if (keyType === Types.boolean && valueType === Types.string) {
        return new Dictionary<boolean, string>();
      } else if (keyType === Types.date && valueType === Types.boolean) {
        return new Dictionary<Date, boolean>();
      } else if (keyType === Types.date && valueType === Types.date) {
        return new Dictionary<Date, Date>();
      } else if (keyType === Types.date && valueType === Types.number) {
        return new Dictionary<Date, number>();
      } else if (keyType === Types.date && valueType === Types.string) {
        return new Dictionary<Date, string>();
      } else if (keyType === Types.number && valueType === Types.boolean) {
        return new Dictionary<number, boolean>();
      } else if (keyType === Types.number && valueType === Types.date) {
        return new Dictionary<number, Date>();
      } else if (keyType === Types.number && valueType === Types.number) {
        return new Dictionary<number, number>();
      } else if (keyType === Types.number && valueType === Types.string) {
        return new Dictionary<number, string>();
      } else if (keyType === Types.string && valueType === Types.boolean) {
        return new Dictionary<string, boolean>();
      } else if (keyType === Types.string && valueType === Types.date) {
        return new Dictionary<string, Date>();
      } else if (keyType === Types.string && valueType === Types.number) {
        return new Dictionary<string, number>();
      } else if (keyType === Types.string && valueType === Types.string) {
        return new Dictionary<string, string>();
      } else {
        return new Dictionary<any, any>();
      }
    } else {
      if (keyType === Types.boolean && valueType === Types.boolean) {
        return new Dictionary<boolean, boolean>(keys, values);
      } else if (keyType === Types.boolean && valueType === Types.date) {
        return new Dictionary<boolean, Date>(keys, values);
      } else if (keyType === Types.boolean && valueType === Types.number) {
        return new Dictionary<boolean, number>(keys, values);
      } else if (keyType === Types.boolean && valueType === Types.string) {
        return new Dictionary<boolean, string>(keys, values);
      } else if (keyType === Types.date && valueType === Types.boolean) {
        return new Dictionary<Date, boolean>(keys, values);
      } else if (keyType === Types.date && valueType === Types.date) {
        return new Dictionary<Date, Date>(keys, values);
      } else if (keyType === Types.date && valueType === Types.number) {
        return new Dictionary<Date, number>(keys, values);
      } else if (keyType === Types.date && valueType === Types.string) {
        return new Dictionary<Date, string>(keys, values);
      } else if (keyType === Types.number && valueType === Types.boolean) {
        return new Dictionary<number, boolean>(keys, values);
      } else if (keyType === Types.number && valueType === Types.date) {
        return new Dictionary<number, Date>(keys, values);
      } else if (keyType === Types.number && valueType === Types.number) {
        return new Dictionary<number, number>(keys, values);
      } else if (keyType === Types.number && valueType === Types.string) {
        return new Dictionary<number, string>(keys, values);
      } else if (keyType === Types.string && valueType === Types.boolean) {
        return new Dictionary<string, boolean>(keys, values);
      } else if (keyType === Types.string && valueType === Types.date) {
        return new Dictionary<string, Date>(keys, values);
      } else if (keyType === Types.string && valueType === Types.number) {
        return new Dictionary<string, number>(keys, values);
      } else if (keyType === Types.string && valueType === Types.string) {
        return new Dictionary<string, string>(keys, values);
      } else {
        return new Dictionary<any, any>(keys, values);
      }
    }
  }
}
