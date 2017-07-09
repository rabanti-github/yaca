import {List} from "./List";

let test: List<number> = new List<number>();

function sorter(v1: number, v2: number): number{
    if (v1 < v2) { return -1}
    else if (v1 > v2) { return 1; }
    else { return 0; }
} 

test.add(11);
//test[0] = 558;
let v: any = test[0];
let w: number = test.length;
test.add(22);
test.add(33);
test.add(66);
test.add(55);
test.add(22);
test.add(6);
test.add(57);

test.forEach(value => {
    console.log(value);
});

test.sort(sorter);


test.remove(22);
//test.removeAll(22);
let part: List<number> = test.getRange(1, 5);
let part2: number[] = test.copyToArray(1, 5);

test.reverse();

let z: any = test.next();
z = test.next();



let x: number = 1;