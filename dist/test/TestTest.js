"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dictionary_1 = require("../src/Dictionary");
var List_1 = __importDefault(require("../src/List"));
var Utils_1 = require("./utils/Utils");
var Types_1 = require("./utils/Types");
var chai_1 = require("chai");
require("mocha");
// Test of the testing utils (TEST-CEPTION!)
describe("test/Utils\n  ##########\n", function () {
    describe("static:properDateHashFunction", function () {
        it("should return the milliseconds since 1.1.1970 as string of a date", function () {
            var date = new Date();
            var ms = date.getTime().toString();
            var match = Utils_1.Utils.properDateHashFunction(date);
            chai_1.expect(ms).to.equal(match);
        });
    });
    describe("static:setupList", function () {
        it("should return an empty instance of a List<string> if executed with the type string", function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.string);
            var match = false;
            if (list instanceof List_1.default && list.length === 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty instance of a List<Date> if executed with the type date", function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.date);
            var match = false;
            if (list instanceof List_1.default && list.length === 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty instance of a List<any> if executed with testClass as type", function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.testClass);
            var match = false;
            if (list instanceof List_1.default && list.length === 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an instance of a List<boolean> with the length 1 if executed with the type boolean and an initial values", function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.boolean, true);
            var match = false;
            if (list instanceof List_1.default && list.length === 1) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an instance of a List<number> with the length 4 if executed with the type number and an initial array of 4 values", function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.number, [1, 2, 3, 4]);
            var match = false;
            if (list instanceof List_1.default && list.length === 4) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an instance of a List<any> with the length 4 if executed with the type testClass and an initial array of 4 variant values", function () {
            var list = Utils_1.Utils.setupList(Types_1.Types.testClass, [
                1,
                true,
                "test",
                new Date()
            ]);
            var match = false;
            if (list instanceof List_1.default && list.length === 4) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
    });
    describe("static:setupDictionary", function () {
        it("should return an empty instance of a Dictionary<number,string> if executed with the type number->string", function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length === 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an empty instance of a Dictionary<any,any> if executed with the type testClass->testClass", function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.testClass, Types_1.Types.testClass);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length === 0) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an instance of a Dictionary<date,number> with the length 1 if executed with the type Date->number and an initial key-value pair", function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number, new Date(), 22);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length === 1) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should return an instance of a Dictionary<number,string> with the length 1 if executed with the type number->string and a key-value pair array with a length of 2", function () {
            var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, [22, 44], ["a", "b"]);
            var match = false;
            if (dict instanceof Dictionary_1.Dictionary && dict.length === 2) {
                match = true;
            }
            chai_1.expect(match).to.equal(true);
        });
        it("should not throw an error if initialized as <boolean,boolean>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.boolean);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <boolean,Date>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <boolean,number>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.number);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <boolean,string>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.string);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,boolean>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.boolean);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,Date>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,number>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,string>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.string);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,boolean>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,Date>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,number>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.number);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <mu,ber,string>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,boolean>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.boolean);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,Date>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,number>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,string>", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.string);
                dict.clear();
            }).not.to.throw();
        });
        var str = ["a", "b", "c"];
        var num = [-12, 22.225, 13];
        var bool = [true, false, true];
        var date = [
            new Date(2017, 1, 1, 1, 1, 0, 0),
            new Date(2016, 1, 1, 1, 1, 0, 0),
            new Date(2015, 1, 1, 1, 1, 0, 0)
        ];
        it("should not throw an error if initialized as <boolean,boolean> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.boolean, bool, bool);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <boolean,Date> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.date, bool, date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <boolean,number> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.number, bool, num);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <boolean,string> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.boolean, Types_1.Types.string, bool, str);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,boolean> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.boolean, date, bool);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,Date> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.date, date, date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,number> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.number, date, num);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <Date,string> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.date, Types_1.Types.string, date, str);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,boolean> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.boolean, num, bool);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,Date> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.date, num, date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,number> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.number, num, num);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <number,string> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.number, Types_1.Types.string, num, str);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,boolean> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.boolean, str, bool);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,Date> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.date, str, date);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,number> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.number, str, num);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <string,string> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.string, Types_1.Types.string, str, str);
                dict.clear();
            }).not.to.throw();
        });
        it("should not throw an error if initialized as <any,any> with initial keys and values", function () {
            chai_1.expect(function () {
                var dict = Utils_1.Utils.setupDictionary(Types_1.Types.testClass, Types_1.Types.testClass, str, num);
                dict.clear();
            }).not.to.throw();
        });
    });
    /************ */
});
//# sourceMappingURL=TestTest.js.map