"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../src/List");
var Utils_1 = require("./utils/Utils");
var Types_1 = require("./utils/Types");
var TestClass_1 = require("./utils/TestClass");
var Comparer_1 = require("../src/Comparer");
var chai_1 = require("chai");
require("mocha");
// This file is to test the List<T> class
describe("LIST<T>\n  #######\n", function () {
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
        it('should return a length of 4 if initialized with a list of 4 elements', function () {
            var list2 = Utils_1.Utils.setupList(Types_1.Types.number, [11, 22, 33, 44]);
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
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            chai_1.expect(list.length).to.equal(0);
        });
        it('should return 9 on a list with 9 elements', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
            chai_1.expect(list.length).to.equal(9);
        });
        it('should return 10 after adding one element to a list of 9 elements', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
            list.add(1);
            chai_1.expect(list.length).to.equal(10);
        });
        it('should return 8 after removing one element from a list of 9 elements', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
            list.removeAt(0);
            chai_1.expect(list.length).to.equal(8);
        });
        it('should return 0 after execution of the clear() method', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
            list.clear();
            chai_1.expect(list.length).to.equal(0);
        });
        it('should return 0 after removing the last element of a list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, 17);
            list.removeAt(0);
            chai_1.expect(list.length).to.equal(0);
        });
    });
    describe('add method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.string);
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
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.number); list.add(undefined); }).to.throw();
        });
        it('should not throw an error when adding a number to a list of numbers', function () {
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.number); list.add(21); }).to.not.throw();
        });
        it('should not throw an error when adding a string to a list of string', function () {
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.string); list.add("test"); }).to.not.throw();
        });
        it('should not throw an error when adding an empty string to a list of string', function () {
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.string); list.add(""); }).to.not.throw();
        });
        it('should not throw an error when adding a boolean to a list of booleans', function () {
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.boolean); list.add(true); }).to.not.throw();
        });
        it('should not throw an error when adding a date to a list of dates', function () {
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.date); list.add(new Date()); }).to.not.throw();
        });
    });
    describe('addRange method -> calls add()', function () {
        var items = ["one", "two", "three", "four", "five"];
        var list = Utils_1.Utils.setupList(Types_1.Types.string);
        it('should add five elements from an array to an empty list and return five as length of the list', function () {
            list.addRange(items);
            var length = list.length;
            chai_1.expect(length).to.equal(5);
        });
        it('should add five elements from a list to an empty list and return five as length of the list', function () {
            var newList = Utils_1.Utils.setupList(Types_1.Types.string);
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
            list = Utils_1.Utils.setupList(Types_1.Types.boolean, [true, false, true, true]);
            list.clear();
            var length = list.length;
            chai_1.expect(length).to.equal(0);
        });
        it('should return a length of zero after execution on a list with zero elements', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.boolean);
            list.clear();
            var length = list.length;
            chai_1.expect(length).to.equal(0);
        });
    });
    describe('contains method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three", "four"]);
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
            var list2 = Utils_1.Utils.setupList(Types_1.Types.date, [new Date(2015, 2, 10, 0, 0, 0), new Date(2017, 1, 1, 0, 0, 0), new Date(1191, 1, 8, 23, 59, 59)]);
            var date = new Date(2017, 1, 1, 0, 0, 0);
            var match = list2.contains(date);
            chai_1.expect(match).to.equal(true);
        });
        it('should return true on a complex class object (custom) in a prepared list which contains this value', function () {
            var list2 = new List_1.default();
            list2.add(TestClass_1.TestClass.createRandomObject());
            list2.add(TestClass_1.TestClass.createRandomObject());
            var value = TestClass_1.TestClass.createRandomObject();
            list2.add(value);
            list2.add(TestClass_1.TestClass.createRandomObject());
            var match = list2.contains(value);
            chai_1.expect(match).to.equal(true);
        });
    });
    describe('copyToArray method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three", "four", "five", "six"]);
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
            chai_1.expect(function () { var array = list.copyToArray(-2, 4); array.toString(); }).to.throw();
        });
        it('should throw an error when the start index is bigger than the end index in a valid range', function () {
            chai_1.expect(function () { var array = list.copyToArray(4, 1); array.toString(); }).to.throw();
        });
        it('should throw an error when the end index is 99 on a list with 6 elements', function () {
            chai_1.expect(function () { var array = list.copyToArray(1, 99); array.toString(); }).to.throw();
        });
        it('should not throw an error when the end index is undefined (interpreted as last index position)', function () {
            chai_1.expect(function () { var array = list.copyToArray(1, undefined); array.toString(); }).not.to.throw();
        });
    });
    describe('dequeue method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 55, 12, 0, -12]);
        it('should return a value of -12 as result of the operation', function () {
            var number = list.dequeue();
            chai_1.expect(number).to.equal(-12);
        });
        it('should return a length of 6 after the operation on a list of 7 elements', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 55, 12, 0, -12]);
            list.dequeue();
            var length = list.length;
            chai_1.expect(length).to.equal(6);
        });
        it('should return undefined if executed on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            var value = list.dequeue();
            chai_1.expect(value).to.equal(undefined);
        });
    });
    describe('distinct method', function () {
        it('should return a length of 6 on a list with 8 entries and 3 identical values after execution', function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 55, 22, 0, -12, 22]);
            list.distinct();
            var length = list.length;
            chai_1.expect(length).to.equal(6);
        });
        it('should return length of 5 on a list with 6 entries of a complex class object (custom) with 2 duplicate values', function () {
            var list2 = new List_1.default();
            list2.add(TestClass_1.TestClass.createRandomObject());
            list2.add(TestClass_1.TestClass.createRandomObject());
            var value = TestClass_1.TestClass.createRandomObject();
            list2.add(value);
            list2.add(TestClass_1.TestClass.createRandomObject());
            list2.add(value);
            list2.add(TestClass_1.TestClass.createRandomObject());
            list2.distinct();
            var length = list2.length;
            chai_1.expect(length).to.equal(5);
        });
        it('should return a length of 8 on a list with 8 entries and no duplicates', function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22.5, 88, 55, 22.50000001, 0, -12, 22.49999999]);
            list.distinct();
            var length = list.length;
            chai_1.expect(length).to.equal(8);
        });
    });
    describe('enqueue method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 55, 12, 0, -12]);
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
            chai_1.expect(function () { var list = Utils_1.Utils.setupList(Types_1.Types.number); list.enqueue(undefined); }).to.throw();
        });
    });
    describe('forEach method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.string, ["1", "22", "333", "4444", "55555"]);
        it('should return the term "122333444455555" after concatenation of the forEach values during the execution', function () {
            var value = "";
            list.forEach(function (item) {
                value = value + item;
            });
            chai_1.expect(value).to.equal("122333444455555");
        });
        it('should return the term "122333" after concatenation of the forEach values with a break (list.break(); return;) after 3 cycles', function () {
            var value = "";
            var counter = -1;
            list.forEach(function (item) {
                counter++;
                if (counter === 3) {
                    list.break();
                    return;
                }
                value = value + item;
            });
            chai_1.expect(value).to.equal("122333");
        });
        it('should return the term "12233355555" after concatenation of the forEach values with a continue (list.continue(); return;) at the 4th cycle', function () {
            var value = "";
            var counter = -1;
            list.forEach(function (item) {
                counter++;
                if (counter === 3) {
                    list.continue();
                    return;
                }
                value = value + item;
            });
            chai_1.expect(value).to.equal("12233355555");
        });
        it('should return the term "12233355555" after concatenation of the forEach values with a return call at the 4th cycle', function () {
            var value = "";
            var counter = -1;
            list.forEach(function (item) {
                counter++;
                if (counter === 3) {
                    return;
                }
                value = value + item;
            });
            chai_1.expect(value).to.equal("12233355555");
        });
        it('should return the number of 5 iterations after the execution', function () {
            var i = 0;
            var dummy;
            list.forEach(function (item) {
                dummy = item;
                i++;
            });
            chai_1.expect(i).to.equal(5);
        });
        it('should not trigger the callback function on a empty list during the execution', function () {
            list = new List_1.default();
            var hit = false;
            var dummy;
            list.forEach(function (item) {
                hit = true;
                dummy = item;
            });
            chai_1.expect(hit).to.equal(false);
        });
    });
    describe('get method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 55, 12, 0, -12]);
        it('should return the value of 55 at the index position 3', function () {
            var value = list.get(3);
            chai_1.expect(value).to.equal(55);
        });
        it('should throw an error when executed with index position 99 on a list with 7 entries', function () {
            chai_1.expect(function () { var value = list.get(99); value.toString(); }).to.throw();
        });
        it('should throw an error when executed with index position -2 on a list with 7 entries', function () {
            chai_1.expect(function () { var value = list.get(-2); value.toString(); }).to.throw();
        });
        it('should throw an error when executed with index position 3.55 on a list with 7 entries', function () {
            chai_1.expect(function () { var value = list.get(3.55); value.toString(); }).to.throw();
        });
        it('should throw an error when executed with undefined as index position on a list with 7 entries', function () {
            chai_1.expect(function () { var value = list.get(undefined); value.toString(); }).to.throw();
        });
    });
    describe('getRange method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three", "four", "five", "six"]);
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
            chai_1.expect(function () { var list2 = list.getRange(-2, 4); list2.clear(); }).to.throw();
        });
        it('should throw an error when the end index is 99 on a list with 6 elements', function () {
            chai_1.expect(function () { var list2 = list.getRange(2, 99); list2.clear(); }).to.throw();
        });
        it('should not throw an error when the start index is undefined (interpreted as 0)', function () {
            chai_1.expect(function () { var list2 = list.getRange(undefined, 2); list2.clear(); }).not.to.throw();
        });
    });
    describe('indexOf method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
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
        var list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
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
        var list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
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
    describe('insertAtIndex method', function () {
        var list;
        it('should return the value 42 at index position 3 after insertion at this index position', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.insertAtIndex(3, 42);
            var index = list.get(3);
            chai_1.expect(index).to.equal(42);
        });
        it('should return the value 22 at index position 4 after insert a value at index position 2', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.insertAtIndex(2, 42);
            var index = list.get(4);
            chai_1.expect(index).to.equal(22);
        });
        it('should return a length of 9 after insertion in a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.insertAtIndex(2, 42);
            chai_1.expect(list.length).to.equal(9);
        });
        it('should return the value 11 at index position 8 after insert a value at this position in a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.insertAtIndex(8, 11);
            var index = list.get(8);
            chai_1.expect(index).to.equal(11);
        });
        it('should throw an error when inserting a value at index position 9 in a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.insertAtIndex(9, 42); }).to.throw();
        });
        it('should throw an error when inserting a value at a negative index position', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.insertAtIndex(-2, 42); }).to.throw();
        });
        it('should throw an error when inserting a value at a float number as index position', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.insertAtIndex(2.99999999999, 42); }).to.throw();
        });
        it('should throw an error when inserting undefined as value', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.insertAtIndex(3, undefined); }).to.throw();
        });
    });
    describe('lastIndexOf method', function () {
        var list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22, 22.00001]);
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
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["1", "22", "333", "4444", "55555"]);
            var value = "";
            for (var i = 0; i < 5; i++) {
                value = value + list.next().value;
            }
            chai_1.expect(value).to.equal("122333444455555");
        });
        it('should return the term "122333444455555122" after concatenation of 7 calls in a list of 5 entries (for loop)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["1", "22", "333", "4444", "55555"]);
            var value = "";
            for (var i = 0; i < 7; i++) {
                value = value + list.next().value;
            }
            chai_1.expect(value).to.equal("122333444455555122");
        });
        it('should indicate that the last element is reached after 5 calls in a list of 5 entries (for loop)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["1", "22", "333", "4444", "55555"]);
            var state;
            for (var i = 0; i < 5; i++) {
                state = list.next().isLastEntry;
            }
            chai_1.expect(state).to.equal(true);
        });
        it('should return the term "122333444455555" after concatenation of a forEach call after two calls of the next method (restart in forEach)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["1", "22", "333", "4444", "55555"]);
            var value = "";
            list.next();
            list.next();
            list.forEach(function (item) {
                value = value + item;
            });
            chai_1.expect(value).to.equal("122333444455555");
        });
        it('should return the term "122333" after concatenation in a for loop (n = 5) if the value "true" is passed after the 3rd iteration (break condition)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["1", "22", "333", "4444", "55555"]);
            var value = "";
            var item;
            for (var i = 0; i < 5; i++) {
                if (i === 2) {
                    item = list.next(true);
                }
                else {
                    item = list.next();
                }
                value = value + item.value;
                if (item.isLastEntry === true) {
                    break;
                }
            }
            chai_1.expect(value).to.equal("122333");
        });
    });
    describe('peek method', function () {
        var list;
        it('should return 22 as value in a list where 22 is the last value', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            var value = list.peek();
            chai_1.expect(value).to.equal(22);
        });
        it('should return 11 in a value with 1 element (11)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [11]);
            var value = list.peek();
            chai_1.expect(value).to.equal(11);
        });
        it('should return a length of 8 executed on a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.peek();
            chai_1.expect(list.length).to.equal(8);
        });
        it('should return undefined as value after execution on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            var value = list.peek();
            chai_1.expect(value).to.equal(undefined);
        });
    });
    describe('pop method', function () {
        var list;
        it('should return a length of 7 after execution on a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.pop();
            chai_1.expect(list.length).to.equal(7);
        });
        it('should return 17 as value after execution (1st value of initial list)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            var value = list.pop();
            chai_1.expect(value).to.equal(17);
        });
        it('should return undefined as value after execution on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            var value = list.pop();
            chai_1.expect(value).to.equal(undefined);
        });
    });
    describe('push method', function () {
        var list;
        it('should return a length of 9 after execution on a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.push(42);
            chai_1.expect(list.length).to.equal(9);
        });
        it('should return 42 as value  on index position 0 after execution', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.push(42);
            var value = list.get(0);
            chai_1.expect(value).to.equal(42);
        });
        it('should return 1 as value of the index position 0 in an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            list.push(1);
            var value = list.get(0);
            chai_1.expect(value).to.equal(1);
        });
        it('should throw an error when executing push with an undefined value to a list of numbers', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.push(undefined); }).to.throw();
        });
    });
    describe('remove method', function () {
        var list;
        it('should return a length of 7 after execution with the value 22 on a list of 8 entries with 3 times the values of 22', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.remove(22);
            chai_1.expect(list.length).to.equal(7);
        });
        it('should return true if the existing value 12 of a list was removed', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            var status = list.remove(12);
            chai_1.expect(status).to.equal(true);
        });
        it('should return false if the not existing value 112 of a list was (not) removed', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            var status = list.remove(112);
            chai_1.expect(status).to.equal(false);
        });
        it('should not throw an error when executed on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            chai_1.expect(function () { list.remove(42); }).not.to.throw();
        });
        it('should return the value 22 (2nd value) at index position 0 if the existing value 17 (1st value) of a list was removed', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.remove(17);
            var value = list.get(0);
            chai_1.expect(value).to.equal(22);
        });
    });
    describe('removeAll method', function () {
        var list;
        it('should return a length of 5 after execution with the value "22" on a list of 8 entries with 3 times the values of "22"', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
            list.removeAll("22");
            chai_1.expect(list.length).to.equal(5);
        });
        it('should return a length of 0 after execution with the value "x" on a list of 3 entries "x"', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["x", "x", "x"]);
            list.removeAll("x");
            chai_1.expect(list.length).to.equal(0);
        });
        it('should return true if the existing value "22" of a list was removed', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
            var status = list.removeAll("22");
            chai_1.expect(status).to.equal(true);
        });
        it('should return false if the not existing value "112" of a list was (not) removed', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
            var status = list.removeAll("112");
            chai_1.expect(status).to.equal(false);
        });
        it('should not throw an error when executed on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string);
            chai_1.expect(function () { list.removeAll("42"); }).not.to.throw();
        });
        it('should return a length of 5 after execution with the value "" (empty) on a list of 8 entries with 3 empty entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["17", "", "88", "", "12", "0", "-12", ""]);
            list.removeAll("");
            chai_1.expect(list.length).to.equal(5);
        });
        it('should return the value "-12" at index position 4 if the existing value "22" of a list was removed', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
            list.removeAll("22");
            var value = list.get(4);
            chai_1.expect(value).to.equal("-12");
        });
        it('should return the concatenated value "1788120-12" after execution with the value "22"', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["17", "22", "88", "22", "12", "0", "-12", "22"]);
            list.removeAll("22");
            var value = "";
            for (var i = 0; i < list.length; i++) {
                value = value + list.get(i);
            }
            chai_1.expect(value).to.equal("1788120-12");
        });
        it('should return a length of 3 if a complex class object (custom) in a prepared list of 4 entries is removed', function () {
            var list2 = new List_1.default();
            list2.add(TestClass_1.TestClass.createRandomObject());
            list2.add(TestClass_1.TestClass.createRandomObject());
            var value = TestClass_1.TestClass.createRandomObject();
            list2.add(value);
            list2.add(TestClass_1.TestClass.createRandomObject());
            list2.removeAll(value);
            chai_1.expect(list2.length).to.equal(3);
        });
    });
    describe('removeAt method', function () {
        var list;
        it('should return a length of 7 after execution on a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.removeAt(1);
            chai_1.expect(list.length).to.equal(7);
        });
        it('should throw an error when executed with an negative index', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.removeAt(-22); }).to.throw();
        });
        it('should throw an error when executed with a floating point number as index', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.removeAt(1.56); }).to.throw();
        });
        it('should throw an error when executed with an index of 10 on a ist of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.removeAt(10); }).to.throw();
        });
        it('should return the value 88 at index position 1 after removing the same position', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.removeAt(1);
            var value = list.get(1);
            chai_1.expect(value).to.equal(88);
        });
    });
    describe('removeAtIndices method', function () {
        var list;
        it('should return a length of 0 after execution on a empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            list.removeAtIndices([0, 1, 2]);
            chai_1.expect(list.length).to.equal(0);
        });
        it('should return a length of 5 after execution with 3 indices on a list of 8 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            list.removeAtIndices([2, 3, 4]);
            chai_1.expect(list.length).to.equal(5);
        });
        it('should return a length of 0 after execution with 4 indices on a list of 4 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22]);
            list.removeAtIndices([0, 1, 2, 3]);
            chai_1.expect(list.length).to.equal(0);
        });
        it('should throw an error when executed with an negative index in the passed list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.removeAtIndices([0, 1, -1]); }).to.throw();
        });
        it('should throw an error when executed with a floating point number as index in the passed list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0, -12, 22]);
            chai_1.expect(function () { list.removeAtIndices([0, 1, 1.999999999999]); }).to.throw();
        });
        it('should return the summarized value of 93.555 after removing the index positions 1,3,4,7 in a list of 8 values', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22, 12, 0.555, -12, 22]);
            list.removeAtIndices([1, 3, 4, 7]);
            var sum = 0;
            for (var i = 0; i < list.length; i++) {
                sum += list.get(i);
            }
            chai_1.expect(sum).to.equal(93.555);
        });
        it('should not throw an error when executed with 5 times the same index on a list with 4 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [17, 22, 88, 22]);
            chai_1.expect(function () { list.removeAtIndices([0, 0, 0, 0, 0]); }).not.to.throw();
        });
    });
    describe('reverse method', function () {
        var list;
        it('should return a concatenated value of "sixfivefourtwothreetwoone" after execution on a list of 7 strings', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three", "two", "four", "five", "six"]);
            list.reverse();
            var value = "";
            list.forEach(function (element) {
                value = value + element;
            });
            chai_1.expect(value).to.equal("sixfivefourtwothreetwoone");
        });
        it('should return a concatenated value of "onetwothree" after two executions on a list of 3 strings', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three"]);
            list.reverse();
            list.reverse();
            var value = "";
            list.forEach(function (element) {
                value = value + element;
            });
            chai_1.expect(value).to.equal("onetwothree");
        });
        it('should not throw an error when executed on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string);
            chai_1.expect(function () { list.reverse(); }).not.to.throw();
        });
        it('should not throw an error when executed on a list with 1 entry', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["one"]);
            chai_1.expect(function () { list.reverse(); }).not.to.throw();
        });
    });
    describe('set method', function () {
        var list;
        it('should throw an error when executed on an empty list with the index position 0', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string);
            chai_1.expect(function () { list.set(0, "one"); }).to.throw();
        });
        it('should throw an error when executed with the index position 4 on a list with 3 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["0", "1", "2"]);
            chai_1.expect(function () { list.set(4, "value"); }).to.throw();
        });
        it('should throw an error when executed with an undefined value in a list of strings', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["0", "1", "2"]);
            chai_1.expect(function () { list.set(1, undefined); }).to.throw();
        });
        it('should throw an error when executed with a negative index position', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["0", "1", "2"]);
            chai_1.expect(function () { list.set(-2, "test"); }).to.throw();
        });
        it('should not throw an error when executed on a list with 1 entry with the index position 0', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["zero"]);
            list.set(0, "one");
            chai_1.expect(function () { list.reverse(); }).not.to.throw();
        });
        it('should not throw an error when executed with an empty string in a list of strings', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["0", "1", "2"]);
            chai_1.expect(function () { list.set(1, ""); }).not.to.throw();
        });
        it('should return "insert" as value at index position 1 after execution at this position with this value', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three"]);
            list.set(1, "insert");
            var value = list.get(1);
            chai_1.expect(value).to.equal("insert");
        });
    });
    describe('sort method', function () {
        var list;
        it('should not throw an error when executed on an empty list', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number);
            chai_1.expect(function () { list.sort(Comparer_1.Comparer.compareNumbers); }).not.to.throw();
        });
        it('should not throw an error when executed on a list with 1 entry', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [42]);
            chai_1.expect(function () { list.sort(Comparer_1.Comparer.compareNumbers); }).not.to.throw();
        });
        it('should return "-12,0,5,7,18,99," as concatenated value after execution on a unsorted list of numbers without a declaration of a comparer function', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [99, -12, 18, 5, 0, 7]);
            list.sort();
            var value = "";
            list.forEach(function (element) {
                value = value + element.toString() + ",";
            });
            chai_1.expect(value).to.equal("-12,0,5,7,18,99,");
        });
        it('should return "A,B,C," as concatenated value after execution on a unsorted list of a complex object without a declaration of a comparer function but implemented in the class', function () {
            var cList = new List_1.default();
            var o1 = new TestClass_1.TestClass();
            var o2 = new TestClass_1.TestClass();
            var o3 = new TestClass_1.TestClass();
            o1.value1 = "B";
            o1.value2 = 22;
            o2.value1 = "A";
            o2.value2 = -22.5;
            o3.value1 = "C";
            o3.value2 = 22.0000001;
            cList.add(o1);
            cList.add(o2);
            cList.add(o3);
            cList.sort();
            var value = "";
            cList.forEach(function (element) {
                value = value + element.value1 + ",";
            });
            chai_1.expect(value).to.equal("A,B,C,");
        });
        it('should throw an error when executed on a list of a complex object without an implementation a comparer function', function () {
            var cList2 = new List_1.default([new Object(), new Object, new Object]);
            chai_1.expect(function () { cList2.sort(); }).to.throw();
        });
        it('should return "-12,0,5,7,18,99," as concatenated value after execution on a unsorted list of numbers', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [99, -12, 18, 5, 0, 7]);
            list.sort(Comparer_1.Comparer.compareNumbers);
            var value = "";
            list.forEach(function (element) {
                value = value + element.toString() + ",";
            });
            chai_1.expect(value).to.equal("-12,0,5,7,18,99,");
        });
        it('should return "1,2," as concatenated value after execution on a list of two numbers (2,1)', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [2, 1]);
            list.sort(Comparer_1.Comparer.compareNumbers);
            var value = "";
            list.forEach(function (element) {
                value = value + element.toString() + ",";
            });
            chai_1.expect(value).to.equal("1,2,");
        });
        it('should return "0,0,0,0," as concatenated value after execution on a list of 4 zeros as values', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.number, [0, 0, 0, 0]);
            list.sort(Comparer_1.Comparer.compareNumbers);
            var value = "";
            list.forEach(function (element) {
                value = value + element.toString() + ",";
            });
            chai_1.expect(value).to.equal("0,0,0,0,");
        });
        it('should return "false,false,true,true,true," as concatenated value after execution on a list of 5 booleans as values', function () {
            var list3 = Utils_1.Utils.setupList(Types_1.Types.boolean, [false, true, true, false, true]);
            list3.sort(Comparer_1.Comparer.compareBooleans);
            var value = "";
            list3.forEach(function (element) {
                value = value + element.toString() + ",";
            });
            chai_1.expect(value).to.equal("false,false,true,true,true,");
        });
        it('should return "1990,1991,2017,2050," as concatenated value after execution on a list of 4 unordered Dates as values', function () {
            var list2 = Utils_1.Utils.setupList(Types_1.Types.date);
            list2.add(new Date(2017, 5, 7, 11, 6, 22, 1));
            list2.add(new Date(1991, 4, 16, 0, 0, 11, 25));
            list2.add(new Date(2050, 11, 2, 11, 11, 6, 4));
            list2.add(new Date(1990, 2, 2, 2, 2, 2, 2));
            list2.sort(Comparer_1.Comparer.compareDates);
            var value = "";
            list2.forEach(function (element) {
                value = value + element.getUTCFullYear().toString() + ",";
            });
            chai_1.expect(value).to.equal("1990,1991,2017,2050,");
        });
    });
    describe('swapValues method', function () {
        var list;
        it('should throw an error when executed on an empty list with two index positions', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string);
            chai_1.expect(function () { list.swapValues(0, 1); }).to.throw();
        });
        it('should throw an error when executed with the index positions 0 and 4 on a list with 3 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["0", "1", "2"]);
            chai_1.expect(function () { list.swapValues(0, 4); }).to.throw();
        });
        it('should throw an error when executed with one negative index position', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["0", "1", "2"]);
            chai_1.expect(function () { list.swapValues(0, -1); }).to.throw();
        });
        it('should not throw an error when executed on a list with 1 entry with the index position 0 for both indices', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["zero"]);
            chai_1.expect(function () { list.swapValues(0, 0); }).not.to.throw();
        });
        it('should not throw an error when executed on a list with 2 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["zero", "one"]);
            chai_1.expect(function () { list.swapValues(1, 0); }).not.to.throw();
        });
        it('should not throw an error when executed on 2 empty values', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["", "", "2"]);
            chai_1.expect(function () { list.swapValues(0, 1); }).not.to.throw();
        });
        it('should return "two" at index 0 and "one" at index 1 after execution on a list with 3 entries', function () {
            list = Utils_1.Utils.setupList(Types_1.Types.string, ["one", "two", "three"]);
            list.swapValues(0, 1);
            var value = list.get(0) + "-" + list.get(1);
            chai_1.expect(value).to.equal("two-one");
        });
    });
    /************ */
});
//# sourceMappingURL=ListTest.js.map