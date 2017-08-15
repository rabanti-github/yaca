import List from './src/List';
import {Dictionary} from './src/Dictionary';
import {SortedDictionary} from './src/SortedDictionary';
import {KeyValuePair} from './src/KeyValuePair';
import {IComparer} from './src/interfaces/IComparer';
import { Comparer } from './src/Comparer';


import { Utils } from './test/utils/Utils';
import { Types } from './test/utils/Types';

let dict2: Dictionary<number,string> = Utils.setupDictionary(Types.number, Types.string,[1,2,3,4,5,6,7,8,9], ["a","b","a","b","c","a","d","e","f"]);
let values: string[] = dict2.getValues();
let temp: List<string> = new List<string>(values);
temp.sort(Comparer.compareStrings);
let result: string = temp[temp.length - 1];
console.log(result);

let dict: SortedDictionary<string,number>; //["a","b","c"], [11,42,86]
    dict =  new SortedDictionary<string, number>();// Utils.setupDictionary(Types.string, Types.number, ["a","b","c"], [11,42,86]) as SortedDictionary<string, number>;
    dict.add("a", 11);
    dict.add("b", 42);
    dict.add("c", 86);
    let value: number = dict.getByIndex(1);
    console.log(value);


export
{
    List,
    Dictionary,
    SortedDictionary,
    KeyValuePair,
    IComparer,
    Comparer
};