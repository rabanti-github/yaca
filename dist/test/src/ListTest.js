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
});
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