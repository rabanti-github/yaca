import List from './src/List';
import {Dictionary} from './src/Dictionary';
import {KeyValuePair} from './src/KeyValuePair';
import {IComparer} from './src/interfaces/IComparer';
import { Comparer } from './src/Comparer';


import {Utils} from './test/utils/Utils';
let test: List<Date> = new List<Date>();
test.sort(Comparer.compareDates);
let dict: Dictionary<number,string> = new Dictionary<number,string>([22,44],["A","B"]);
let v: string = dict.get(222);


export
{
    List,
    Dictionary,
    KeyValuePair,
    IComparer
};