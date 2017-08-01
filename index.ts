import List from './src/List';
import {Dictionary} from './src/Dictionary';
import {KeyValuePair} from './src/KeyValuePair';
import {IComparer} from './src/interfaces/IComparer';


import {Utils} from './test/utils/Utils';
let test: List<Date> = new List<Date>();
test.sort(Utils.compareDates);


export
{
    List,
    Dictionary,
    KeyValuePair,
    IComparer
};