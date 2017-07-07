import {List} from "./List";

let test: List<number> = new List<number>();



test.add(11);
//test[0] = 558;
let v: any = test[0];
let w: number = test.length;
test.add(22);
test.add(33);
test.add(55);
test.add(66);
test.add(22);
test.add(21);
test.add(57);

test.forEach(value => {
    console.log(value);
});


let z: any = test.next();
z = test.next();

//test.remove(22);

let x: number = 1;