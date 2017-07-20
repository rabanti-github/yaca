import List from './List';
import {Dictionary} from './Dictionary';
import {KeyValuePair} from './KeyValuePair';

//export default List;

/*
        let list2: List<Date> = new List<Date>([new Date(2015,2,10,0,0,0), new Date(2017,1,1,0,0,0), new Date(1191,1,8,23,59,59)]);
        let date = new Date(2017,1,1,0,0,0);
        let match = list2.contains(date);
        list2.dequeue();
        let list3: List<Date> = list2.getRange(undefined,1);

        let list4: List<number> = new List<number>(22);
*/
class TestClass
{
    private static counter: number = 0;
    public value1: string;
    public value2: number;
    public value3: boolean[];
    public value4: Date;

    constructor()
    {

    }

    public static createRandomObject() : TestClass
    {
        let o: TestClass = new TestClass();
        o.value4 = new Date();
        o.value1 = o.value4.toDateString() + "_" + TestClass.counter.toString();
        o.value2 = o.value4.getMilliseconds() + TestClass.counter;
        let rnd: number;
        o.value3 = new Array(5);
        for (let i: number = 0; i < 5; i++)
        {
            rnd = Math.random();
            if (rnd > 0.5) {o.value3[i] = true;}
            else {o.value3[i] = false;}
        }
        TestClass.counter++;
        return o; 
    }
}
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
d.add(4,"z");
d.add(11,"new");
let n: number = d.length;



let dict2: Dictionary<Date, number> =  new Dictionary<Date, number>();

        let d1: Date = new Date(2000, 1,1,1,1,1,0);
        let d2b: Date = new Date(2000, 1,1,1,1,1,1);
        dict2.add(d1, 42);
        dict2.add(d2b, 43);

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










export
{
    List,
    Dictionary,
    KeyValuePair
};