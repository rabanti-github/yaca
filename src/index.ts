import List from './List';
import {Dictionary} from './Dictionary';
import {KeyValuePair} from './KeyValuePair';



import {Utils} from '../test/utils/Utils';
import {TestClass} from '../test/utils/TestClass';
import {Types} from '../test/utils/Types'; 

//export default List;

/*
        let list2: List<Date> = new List<Date>([new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)]);
        let date = new Date(2017,1,1,0,0,0);
        let match = list2.contains(date);
        list2.dequeue();
        let list3: List<Date> = list2.getRange(undefined,1);

        let list4: List<number> = new List<number>(22);
*/

/*
let sList: List<string> = new List<string>(["1","2","3"]);
sList.set(1, undefined);
*/
let list2: List<TestClass> = new List<TestClass>();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        let value: TestClass = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        //list2.removeAt(2);
        list2.removeAll(value);

let d: Dictionary<number, string> = new Dictionary<number, string>();

let hit: boolean = false
d.forEach(test => { hit = true; });

d.add(22,"x");
d.add(11,"y");
d.add(4,"x");
d.add(111,"new");

let keys: number[] = d.getKeys();

d.distinct();

    let d1: Date = new Date(2017,1,1,23,59,0,0);
    let d2: Date = new Date(2017,1,1,23,59,0,1);
    let d3: Date = new Date(2016,1,1,23,59,0,0);
    let d4: Date = new Date(1017,1,1,23,59,0,0);
    let d5: Date = new Date(2015,1,1,23,59,0,1);
    let d6: Date = new Date(2020,1,1,23,59,0,0);
    let d7: Date = new Date(1990,1,1,23,59,0,0);      
    let dict3: Dictionary<Date, number> = new Dictionary<Date, number>(Utils.properDateHashFunction);
    dict3.addRange([d1,d2,d3,d4,d5,d6,d7], [17,22,88,55,12,0,-12]);
    let value3: number = dict3.get(d1);


let n: number = d.length;



/*
let dict2: Dictionary<Date, number> =  new Dictionary<Date, number>();

        let d1: Date = new Date(2000, 1,1,1,1,1,0);
        let d2b: Date = new Date(2000, 1,1,1,1,1,1);
        dict2.add(d1, 42);
        dict2.add(d2b, 43);
*/
//d.removeByValue("y");

d.forEach(item => {
    
    xyz(item as KeyValuePair<number, string>);
})

function xyz(item: KeyValuePair<number, string>)
{
console.log(item.key);
console.log(item.value);
}

//let d2: Dictionary<number, string> = d.getRangeByValues(["y"]);

let output = d.get(4);










export
{
    List,
    Dictionary,
    KeyValuePair
};