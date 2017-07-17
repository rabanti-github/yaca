"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../../src/List");
var chai_1 = require("chai");
require("mocha");
var Types;
(function (Types) {
    Types[Types["string"] = 0] = "string";
    Types[Types["number"] = 1] = "number";
    Types[Types["boolean"] = 2] = "boolean";
    Types[Types["date"] = 3] = "date";
})(Types || (Types = {}));
describe('constructors', function () {
    var list;
    it('should not throw an error if initialized without parameters', function () {
        chai_1.expect(function () { list = new List_1.default(); }).not.to.throw();
    });
    it('should return a length of 1 if initialized with one element', function () {
        list = new List_1.default(42);
        var length = list.length;
        chai_1.expect(length).to.equal(1);
    });
    it('should return a length of 5 if initialized with an array of 5 elements', function () {
        var values = [11, 22, 33, 44, 55];
        list = new List_1.default(values);
        var length = list.length;
        chai_1.expect(length).to.equal(5);
    });
    it('should return a lengt of 4 if initialized with a list of 4 elements', function () {
        var list2 = setupList(Types.number, [11, 22, 33, 44]);
        list = new List_1.default(list2);
        var length = list.length;
        chai_1.expect(length).to.equal(4);
    });
    it('should return a length of 0 if initialized with an empty array', function () {
        var values = [];
        list = new List_1.default(values);
        var length = list.length;
        chai_1.expect(length).to.equal(0);
    });
});
describe('length property', function () {
    var list;
    it('should return 0 on an initialized (empty) list', function () {
        list = setupList(Types.number);
        chai_1.expect(list.length).to.equal(0);
    });
    it('should return 9 on a list with 9 elements', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
        chai_1.expect(list.length).to.equal(9);
    });
    it('should return 10 after adding one element to a list of 9 elements', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
        list.add(1);
        chai_1.expect(list.length).to.equal(10);
    });
    it('should return 8 after removing one element to a list of 9 elements', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
        list.removeAt(0);
        chai_1.expect(list.length).to.equal(8);
    });
    it('should return 0 after execution of the clear() method', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
        list.clear();
        chai_1.expect(list.length).to.equal(0);
    });
    it('should return 0 after removing the last element of a list', function () {
        list = setupList(Types.number, 17);
        list.removeAt(0);
        chai_1.expect(list.length).to.equal(0);
    });
});
describe('add method', function () {
    var list = setupList(Types.string);
    it('should add an element and increase the counter by one', function () {
        list.add("test");
        var length = list.length;
        chai_1.expect(length).to.equal(1);
    });
    it('should return "test2" as string at element index 1 (2nd element)', function () {
        list.add("test2");
        var entry = list.get(1);
        chai_1.expect(entry).to.equal("test2");
    });
    it('should throw an error when adding undefined to a list of numbers', function () {
        chai_1.expect(function () { var list = setupList(Types.number); list.add(undefined); }).to.throw();
    });
    it('should not throw an error when adding a number to a list of numbers', function () {
        chai_1.expect(function () { var list = setupList(Types.number); list.add(21); }).to.not.throw();
    });
    it('should not throw an error when adding a string to a list of string', function () {
        chai_1.expect(function () { var list = setupList(Types.string); list.add("test"); }).to.not.throw();
    });
    it('should not throw an error when adding an empty string to a list of string', function () {
        chai_1.expect(function () { var list = setupList(Types.string); list.add(""); }).to.not.throw();
    });
    it('should not throw an error when adding a boolean to a list of booleans', function () {
        chai_1.expect(function () { var list = setupList(Types.boolean); list.add(true); }).to.not.throw();
    });
    it('should not throw an error when adding a date to a list of dates', function () {
        chai_1.expect(function () { var list = setupList(Types.date); list.add(new Date()); }).to.not.throw();
    });
});
describe('addRange method -> calls add()', function () {
    var items = ["one", "two", "three", "four", "five"];
    var list = setupList(Types.string);
    it('should add five elements from an array to an empty list and return file as length of the list', function () {
        list.addRange(items);
        var length = list.length;
        chai_1.expect(length).to.equal(5);
    });
    it('should add five elements from a list to an empty list and return file as length of the list', function () {
        var newList = setupList(Types.string);
        newList.addRange(list);
        var length = newList.length;
        chai_1.expect(length).to.equal(5);
    });
    it('should return the value "four" at the index position 3 (4th element) after adding a range of 5 elements', function () {
        var item = list.get(3);
        chai_1.expect(item).to.equal("four");
    });
});
describe('clear method', function () {
    var list;
    it('should return a length of zero after execution on a list with 4 elements', function () {
        list = setupList(Types.boolean, [true, false, true, true]);
        list.clear();
        var length = list.length;
        chai_1.expect(length).to.equal(0);
    });
    it('should return a length of zero after execution on a list with zero elements', function () {
        list = setupList(Types.boolean);
        list.clear();
        var length = list.length;
        chai_1.expect(length).to.equal(0);
    });
});
describe('contains method', function () {
    var list = setupList(Types.string, ["one", "two", "three", "four"]);
    it('should return true on value "three" in a prepared list which contains this value', function () {
        var match = list.contains("three");
        chai_1.expect(match).to.equal(true);
    });
    it('should return false on undefined as value in a prepared list (cannot contain undefined)', function () {
        var match = list.contains(undefined);
        chai_1.expect(match).to.equal(false);
    });
    it('should return false on value "six" in a prepared list which does not contain this value', function () {
        var match = list.contains("six");
        chai_1.expect(match).to.equal(false);
    });
    it('should return true on a date object (2017-01-01 00:00:00) in a prepared list which contains this value', function () {
        var list2 = setupList(Types.date, [new Date(2015, 2, 10, 0, 0, 0), new Date(2017, 1, 1, 0, 0, 0), new Date(1191, 1, 8, 23, 59, 59)]);
        var date = new Date(2017, 1, 1, 0, 0, 0);
        var match = list2.contains(date);
        chai_1.expect(match).to.equal(true);
    });
    it('should return true on a complex class object (custom) in a prepared list which contains this value', function () {
        var list2 = new List_1.default();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        var value = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        var match = list2.contains(value);
        chai_1.expect(match).to.equal(true);
    });
});
describe('copyToArray method', function () {
    var list = setupList(Types.string, ["one", "two", "three", "four", "five", "six"]);
    it('should return an array with 6 elements from a list with this number of elements', function () {
        var array = list.copyToArray();
        var length = array.length;
        chai_1.expect(length).to.equal(6);
    });
    it('should return the value "two" at the index position 1 (2nd element) in the copy of a list with 6 entries', function () {
        var array = list.copyToArray();
        var value = array[1];
        chai_1.expect(value).to.equal("two");
    });
    it('should return an array with 4 elements from a list with 6 elements and start index of 2', function () {
        var array = list.copyToArray(2);
        var length = array.length;
        chai_1.expect(length).to.equal(4);
    });
    it('should return an array with 3 elements from a list with 6 elements and start index of 2 and end index of 4', function () {
        var array = list.copyToArray(2, 4);
        var length = array.length;
        chai_1.expect(length).to.equal(3);
    });
    it('should return the value of "five" in the copy from a list with 6 elements and start index of 2 and end index of 4 as last element', function () {
        var array = list.copyToArray(2, 4);
        var value = array[array.length - 1];
        chai_1.expect(value).to.equal("five");
    });
    it('should throw an error when the start index is negative', function () {
        chai_1.expect(function () { var array = list.copyToArray(-2, 4); }).to.throw();
    });
    it('should throw an error when the end index is 99 on a list with 6 elements', function () {
        chai_1.expect(function () { var array = list.copyToArray(1, 99); }).to.throw();
    });
    it('should not throw an error when the end index is undefined (interpreted as last index position)', function () {
        chai_1.expect(function () { var array = list.copyToArray(1, undefined); }).not.to.throw();
    });
});
describe('dequeue method', function () {
    var list = setupList(Types.number, [17, 22, 88, 55, 12, 0, -12]);
    it('should return a value of -12 as result of the operation', function () {
        var number = list.dequeue();
        chai_1.expect(number).to.equal(-12);
    });
    it('should return a length of 6 after the operation on a list of 7 elements', function () {
        list = setupList(Types.number, [17, 22, 88, 55, 12, 0, -12]);
        list.dequeue();
        var length = list.length;
        chai_1.expect(length).to.equal(6);
    });
    it('should return undefined if executed on an empty list', function () {
        list = setupList(Types.number);
        var value = list.dequeue();
        chai_1.expect(value).to.equal(undefined);
    });
});
describe('distinct method', function () {
    it('should return a length of 6 on a list with 8 entries and 3 identical values after execution', function () {
        var list = setupList(Types.number, [17, 22, 88, 55, 22, 0, -12, 22]);
        list.distinct();
        var length = list.length;
        chai_1.expect(length).to.equal(6);
    });
    it('should return length of 5 on a list with 6 entries of a complex class object (custom) with 2 duplicate values', function () {
        var list2 = new List_1.default();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        var value = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        list2.distinct();
        var length = list2.length;
        chai_1.expect(length).to.equal(5);
    });
    it('should return a length of 8 on a list with 8 entries and no duplicates', function () {
        var list = setupList(Types.number, [17, 22.5, 88, 55, 22.50000001, 0, -12, 22.49999999]);
        list.distinct();
        var length = list.length;
        chai_1.expect(length).to.equal(8);
    });
});
describe('enqueue method', function () {
    var list = setupList(Types.number, [17, 22, 88, 55, 12, 0, -12]);
    it('should return a length of 8 if executed on a list of 7 elements', function () {
        list.enqueue(777);
        var length = list.length;
        chai_1.expect(length).to.equal(8);
    });
    it('should return the value 42 at the last index position after execution with this value', function () {
        list.enqueue(42);
        var value = list.get(list.length - 1);
        chai_1.expect(value).to.equal(42);
    });
    it('should throw an error when enqueueing undefined to a list of numbers', function () {
        chai_1.expect(function () { var list = setupList(Types.number); list.enqueue(undefined); }).to.throw();
    });
});
describe('forEach method', function () {
    var list = setupList(Types.string, ["1", "22", "333", "4444", "55555"]);
    it('should return the term "122333444455555" after concatenation of the forEach values during the execution', function () {
        var value = "";
        list.forEach(function (item) {
            value = value + item;
        });
        chai_1.expect(value).to.equal("122333444455555");
    });
    it('should return the term "1223334444" after concatenation of the forEach values with a break (return) after 4 cycles', function () {
        var value = "";
        var counter = 0;
        list.forEach(function (item) {
            if (counter >= 4) {
                return;
            }
            value = value + item;
            counter++;
        });
        chai_1.expect(value).to.equal("1223334444");
    });
    it('should return the number of 5 iterations after the execution', function () {
        var i = 0;
        list.forEach(function (item) {
            i++;
        });
        chai_1.expect(i).to.equal(5);
    });
    it('should not trigger the callback function on a empty list during the execution', function () {
        list = new List_1.default();
        var hit = false;
        list.forEach(function (item) {
            hit = true;
        });
        chai_1.expect(hit).to.equal(false);
    });
});
describe('get method', function () {
    var list = setupList(Types.number, [17, 22, 88, 55, 12, 0, -12]);
    it('should return the value of 55 at the index position 3', function () {
        var value = list.get(3);
        chai_1.expect(value).to.equal(55);
    });
    it('should throw an error when executed with index position 99 on a list with 7 entries', function () {
        chai_1.expect(function () { var value = list.get(99); }).to.throw();
    });
    it('should throw an error when executed with index position -2 on a list with 7 entries', function () {
        chai_1.expect(function () { var value = list.get(-2); }).to.throw();
    });
    it('should throw an error when executed with index position 3.55 on a list with 7 entries', function () {
        chai_1.expect(function () { var value = list.get(3.55); }).to.throw();
    });
    it('should throw an error when executed with undefined as index position on a list with 7 entries', function () {
        chai_1.expect(function () { var value = list.get(undefined); }).to.throw();
    });
});
describe('getRange method', function () {
    var list = setupList(Types.string, ["one", "two", "three", "four", "five", "six"]);
    it('should return a list with 6 elements from a list with this number of elements', function () {
        var list2 = list.getRange();
        var length = list2.length;
        chai_1.expect(length).to.equal(6);
    });
    it('should return the value "three" at the index position 2 (3rd element) in the copy of a list with 6 entries', function () {
        var list2 = list.getRange();
        var value = list2.get(2);
        chai_1.expect(value).to.equal("three");
    });
    it('should return a list with 4 elements from a list with 6 elements and start index of 2', function () {
        var list2 = list.getRange(2);
        var length = list2.length;
        chai_1.expect(length).to.equal(4);
    });
    it('should return a list with 3 elements from a list with 6 elements and start index of 2 and end index of 4', function () {
        var list2 = list.getRange(2, 4);
        var length = list2.length;
        chai_1.expect(length).to.equal(3);
    });
    it('should return the value of "five" in the copy from a list with 6 elements and start index of 2 and end index of 4 as last element', function () {
        var list2 = list.getRange(2, 4);
        var value = list2.get(list2.length - 1);
        chai_1.expect(value).to.equal("five");
    });
    it('should throw an error when the start index is negative', function () {
        chai_1.expect(function () { var list2 = list.getRange(-2, 4); }).to.throw();
    });
    it('should throw an error when the end index is 99 on a list with 6 elements', function () {
        chai_1.expect(function () { var list2 = list.getRange(2, 99); }).to.throw();
    });
    it('should not throw an error when the start index is undefined (interpreted as 0)', function () {
        chai_1.expect(function () { var list2 = list.getRange(undefined, 2); }).not.to.throw();
    });
});
describe('indexOf method', function () {
    var list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
    it('should return the index position 1 on value 22', function () {
        var index = list.indexOf(22);
        chai_1.expect(index).to.equal(1);
    });
    it('should return the index position -1 on not existing value 122', function () {
        var index = list.indexOf(122);
        chai_1.expect(index).to.equal(-1);
    });
    it('should return the index position -1 on undefined as value', function () {
        var index = list.indexOf(undefined);
        chai_1.expect(index).to.equal(-1);
    });
});
describe('indicesOf method', function () {
    var list = setupList(Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
    it('should return an array with two elements on the value "two" from a list with 2 such occurrences', function () {
        var indices = list.indicesOf("two");
        chai_1.expect(indices.length).to.equal(2);
    });
    it('should return an array with two index elements 1 and 3 on the value "two" from a list with 2 such occurrences', function () {
        var indices = list.indicesOf("two");
        chai_1.expect(indices[0] === 1 && indices[1] === 3).to.equal(true);
    });
    it('should return an empty array on the not existing value "122"', function () {
        var indices = list.indicesOf("122");
        chai_1.expect(indices.length).to.equal(0);
    });
    it('should return an empty array on undefined as value', function () {
        var indices = list.indicesOf(undefined);
        chai_1.expect(indices.length).to.equal(0);
    });
});
describe('indicesOfAsList method', function () {
    var list = setupList(Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
    it('should return a list with two elements on the value "two" from a list with 2 such occurrences', function () {
        var indices = list.indicesOfAsList("two");
        chai_1.expect(indices.length).to.equal(2);
    });
    it('should return a list with two index elements 1 and 3 on the value "two" from a list with 2 such occurrences', function () {
        var indices = list.indicesOfAsList("two");
        chai_1.expect(indices.get(0) === 1 && indices.get(1) === 3).to.equal(true);
    });
    it('should return an empty list on the not existing value "122"', function () {
        var indices = list.indicesOfAsList("122");
        chai_1.expect(indices.length).to.equal(0);
    });
    it('should return an empty list on undefined as value', function () {
        var indices = list.indicesOfAsList(undefined);
        chai_1.expect(indices.length).to.equal(0);
    });
});
describe('lastIndexOf method', function () {
    var list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
    it('should return the index position 7 on value 22', function () {
        var index = list.lastIndexOf(22);
        chai_1.expect(index).to.equal(7);
    });
    it('should return the index position -1 on not existing value 122', function () {
        var index = list.lastIndexOf(122);
        chai_1.expect(index).to.equal(-1);
    });
    it('should return the index position -1 on undefined as value', function () {
        var index = list.lastIndexOf(undefined);
        chai_1.expect(index).to.equal(-1);
    });
});
describe('next method', function () {
    var list;
    it('should return the term "122333444455555" after concatenation of 5 calls (for loop)', function () {
        list = setupList(Types.string, ["1", "22", "333", "4444", "55555"]);
        var value = "";
        for (var i = 0; i < 5; i++) {
            value = value + list.next().value;
        }
        chai_1.expect(value).to.equal("122333444455555");
    });
    it('should return the term "122333444455555122" after concatenation of 7 calls in a list of 5 entries (for loop)', function () {
        list = setupList(Types.string, ["1", "22", "333", "4444", "55555"]);
        var value = "";
        for (var i = 0; i < 7; i++) {
            value = value + list.next().value;
        }
        chai_1.expect(value).to.equal("122333444455555122");
    });
    it('should indicate that the last element is reached after 5 calls in a lit of 5 entries (for loop)', function () {
        list = setupList(Types.string, ["1", "22", "333", "4444", "55555"]);
        var state;
        for (var i = 0; i < 5; i++) {
            state = list.next().isLastEntry;
        }
        chai_1.expect(state).to.equal(true);
    });
    it('should return the term "122333444455555" after concatenation of a forEach call after two calls of the next method (restart in forEach)', function () {
        list = setupList(Types.string, ["1", "22", "333", "4444", "55555"]);
        var value = "";
        list.next();
        list.next();
        list.forEach(function (item) {
            value = value + item;
        });
        chai_1.expect(value).to.equal("122333444455555");
    });
});
describe('pop method', function () {
    var list;
    it('should return a length of 7 after execution on a list of 8 entries', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        list.pop();
        chai_1.expect(list.length).to.equal(7);
    });
    it('should return 17 as value after execution (1st value of initial list)', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        var value = list.pop();
        chai_1.expect(value).to.equal(17);
    });
    it('should return undefined as value after execution on an empty list', function () {
        list = setupList(Types.number);
        var value = list.pop();
        chai_1.expect(value).to.equal(undefined);
    });
});
describe('push method', function () {
    var list;
    it('should return a length of 9 after execution on a list of 8 entries', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        list.push(42);
        chai_1.expect(list.length).to.equal(9);
    });
    it('should return 42 as value  on index position 0 after execution', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        list.push(42);
        var value = list.get(0);
        chai_1.expect(value).to.equal(42);
    });
    it('should return 1 as value of the index position 0 in an empty list', function () {
        list = setupList(Types.number);
        list.push(1);
        var value = list.get(0);
        chai_1.expect(value).to.equal(1);
    });
    it('should throw an error when executing push with an undefined value to a list of numbers', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        chai_1.expect(function () { list.push(undefined); }).to.throw();
    });
});
describe('remove method', function () {
    var list;
    it('should return a length of 7 after execution with the value 22 on a list of 8 entries with 3 times the values of 22', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        list.remove(22);
        chai_1.expect(list.length).to.equal(7);
    });
    it('should return true if the existing value 12 of a list was removed', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        var status = list.remove(12);
        chai_1.expect(status).to.equal(true);
    });
    it('should return false if the not existing value 112 of a list was (not) removed', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        var status = list.remove(112);
        chai_1.expect(status).to.equal(false);
    });
    it('should not throw an error when executed on an empty list', function () {
        list = setupList(Types.number);
        chai_1.expect(function () { list.remove(42); }).not.to.throw();
    });
    it('should return the value 22 (2nd value) at index position 0 if the existing value 17 (1st value) of a list was removed', function () {
        list = setupList(Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
        list.remove(17);
        var value = list.get(0);
        chai_1.expect(value).to.equal(22);
    });
});
describe('removeAll method', function () {
    var list;
    it('should return a length of 5 after execution with the value "22" on a list of 8 entries with 3 times the values of "22"', function () {
        list = setupList(Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
        list.removeAll("22");
        chai_1.expect(list.length).to.equal(5);
    });
    it('should return a length of 0 after execution with the value "x" on a list of 3 entries "x"', function () {
        list = setupList(Types.string, ["x", "x", "x"]);
        list.removeAll("x");
        chai_1.expect(list.length).to.equal(0);
    });
    it('should return true if the existing value "22" of a list was removed', function () {
        list = setupList(Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
        var status = list.removeAll("22");
        chai_1.expect(status).to.equal(true);
    });
    it('should return false if the not existing value "112" of a list was (not) removed', function () {
        list = setupList(Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
        var status = list.removeAll("112");
        chai_1.expect(status).to.equal(false);
    });
    it('should not throw an error when executed on an empty list', function () {
        list = setupList(Types.string);
        chai_1.expect(function () { list.removeAll("42"); }).not.to.throw();
    });
    it('should return a length of 5 after execution with the value "" (empty) on a list of 8 entries with 3 empty entries', function () {
        list = setupList(Types.string, ["17", "", "88", "", "12", "0", "-12", ""]);
        list.removeAll("");
        chai_1.expect(list.length).to.equal(5);
    });
    it('should return the value "-12" at index position 4 if the existing value "22" of a list was removed', function () {
        list = setupList(Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
        list.removeAll("22");
        var value = list.get(4);
        chai_1.expect(value).to.equal("-12");
    });
    it('should return the concatenated value "1788120-12" after execution with the value "22"', function () {
        list = setupList(Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
        list.removeAll("22");
        var value = "";
        for (var i = 0; i < list.length; i++) {
            value = value + list.get(i);
        }
        chai_1.expect(value).to.equal("1788120-12");
    });
    it('should return a length of 3 if a complex class object (custom) in a prepared list of 4 entries is removed', function () {
        var list2 = new List_1.default();
        list2.add(TestClass.createRandomObject());
        list2.add(TestClass.createRandomObject());
        var value = TestClass.createRandomObject();
        list2.add(value);
        list2.add(TestClass.createRandomObject());
        list2.removeAll(value);
        chai_1.expect(list2.length).to.equal(3);
    });
});
var TestClass = (function () {
    function TestClass() {
    }
    TestClass.createRandomObject = function () {
        var o = new TestClass();
        o.value4 = new Date();
        o.value1 = o.value4.toDateString() + "_" + TestClass.counter.toString();
        o.value2 = o.value4.getMilliseconds() + TestClass.counter;
        var rnd;
        o.value3 = new Array(5);
        for (var i = 0; i < 5; i++) {
            rnd = Math.random();
            if (rnd > 0.5) {
                o.value3[i] = true;
            }
            else {
                o.value3[i] = false;
            }
        }
        TestClass.counter++;
        return o;
    };
    TestClass.counter = 0;
    return TestClass;
}());
function setupList(t, initialValue) {
    if (initialValue === undefined) {
        if (t === Types.boolean) {
            return new List_1.default();
        }
        else if (t === Types.date) {
            return new List_1.default();
        }
        else if (t === Types.number) {
            return new List_1.default();
        }
        else if (t === Types.string) {
            return new List_1.default();
        }
    }
    else {
        if (t === Types.boolean) {
            return new List_1.default(initialValue);
        }
        else if (t === Types.date) {
            return new List_1.default(initialValue);
        }
        else if (t === Types.number) {
            return new List_1.default(initialValue);
        }
        else if (t === Types.string) {
            return new List_1.default(initialValue);
        }
    }
}
//# sourceMappingURL=ListTest.js.map