import List from './List';
import {Dictionary} from './Dictionary';

import {KeyValuePair} from './KeyValuePair';

        let list2: List<Date> = new List<Date>([new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)]);
        let date = new Date(2017,1,1,0,0,0);
        let match = list2.contains(date);
        list2.dequeue();


let d: Dictionary<number, string> = new Dictionary<number, string>();


d.add(22,"x");
d.add(11,"y");
d.add(4,"z");
d.add(12,"y");


//d.removeByValue("y");

d.forEach(item => {
    
    xyz(item as KeyValuePair<number, string>);
})

function xyz(item: KeyValuePair<number, string>)
{
console.log(item.key);
console.log(item.value);
}

let d2: Dictionary<number, string> = d.getRangeByValues(["y"]);

let output = d.get(4);


export default List;
export
{
    Dictionary   
};