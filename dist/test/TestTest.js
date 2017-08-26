import { Dictionary } from '../src/Dictionary';
import { List } from '../src/List';
import { Utils } from './utils/Utils';
import { Types } from './utils/Types';
import { expect } from 'chai';
import 'mocha';
// Test of the testing utils (TESTCEPTION!)
describe("test/Utils\n  ##########\n", () => {
    describe('static:properDateHashFunction', () => {
        it('should return the milliseconds since 1.1.1970 as string of a date', () => {
            let date = new Date();
            let ms = date.getTime().toString();
            let match = Utils.properDateHashFunction(date);
            expect(ms).to.equal(match);
        });
    });
    describe('static:setupList', () => {
        it('should return an empty instance of a List<string> if executed with the type string', () => {
            let list = Utils.setupList(Types.string);
            let match = false;
            if (list instanceof List && list.length === 0) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an empty instance of a List<Date> if executed with the type date', () => {
            let list = Utils.setupList(Types.date);
            let match = false;
            if (list instanceof List && list.length === 0) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an empty instance of a List<any> if executed with testClass as type', () => {
            let list = Utils.setupList(Types.testClass);
            let match = false;
            if (list instanceof List && list.length === 0) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an instance of a List<boolean> with the length 1 if executed with the type boolean and an initial values', () => {
            let list = Utils.setupList(Types.boolean, true);
            let match = false;
            if (list instanceof List && list.length === 1) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an instance of a List<number> with the length 4 if executed with the type number and an initial array of 4 values', () => {
            let list = Utils.setupList(Types.number, [1, 2, 3, 4]);
            let match = false;
            if (list instanceof List && list.length === 4) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an instance of a List<any> with the length 4 if executed with the type testClass and an initial array of 4 variant values', () => {
            let list = Utils.setupList(Types.testClass, [1, true, "test", new Date()]);
            let match = false;
            if (list instanceof List && list.length === 4) {
                match = true;
            }
            expect(match).to.equal(true);
        });
    });
    describe('static:setupDictionary', () => {
        it('should return an empty instance of a Dictionary<number,string> if executed with the type number->string', () => {
            let dict = Utils.setupDictionary(Types.number, Types.string);
            let match = false;
            if (dict instanceof Dictionary && dict.length === 0) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an empty instance of a Dictionary<any,any> if executed with the type testClass->testClass', () => {
            let dict = Utils.setupDictionary(Types.testClass, Types.testClass);
            let match = false;
            if (dict instanceof Dictionary && dict.length === 0) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an instance of a Dictionary<date,number> with the length 1 if executed with the type Date->number and an initial key-value pair', () => {
            let dict = Utils.setupDictionary(Types.date, Types.number, new Date(), 22);
            let match = false;
            if (dict instanceof Dictionary && dict.length === 1) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should return an instance of a Dictionary<number,string> with the length 1 if executed with the type number->string and a key-value pair array with a length of 2', () => {
            let dict = Utils.setupDictionary(Types.number, Types.string, [22, 44], ["a", "b"]);
            let match = false;
            if (dict instanceof Dictionary && dict.length === 2) {
                match = true;
            }
            expect(match).to.equal(true);
        });
        it('should not throw an error if initialized as <boolean,boolean>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.boolean); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <boolean,Date>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <boolean,number>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.number); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <boolean,string>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.string); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,boolean>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.boolean); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,Date>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,number>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.number); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,string>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.string); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,boolean>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.boolean); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,Date>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,number>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.number); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <mu,ber,string>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.string); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,boolean>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.boolean); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,Date>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,number>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.number); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,string>', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.string); dict.clear(); }).not.to.throw();
        });
        let str = ["a", "b", "c"];
        let num = [-12, 22.225, 13];
        let bool = [true, false, true];
        let date = [new Date(2017, 1, 1, 1, 1, 0, 0), new Date(2016, 1, 1, 1, 1, 0, 0), new Date(2015, 1, 1, 1, 1, 0, 0)];
        it('should not throw an error if initialized as <boolean,boolean> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.boolean, bool, bool); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <boolean,Date> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.date, bool, date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <boolean,number> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.number, bool, num); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <boolean,string> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.boolean, Types.string, bool, str); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,boolean> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.boolean, date, bool); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,Date> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.date, date, date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,number> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.number, date, num); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <Date,string> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.date, Types.string, date, str); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,boolean> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.boolean, num, bool); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,Date> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.date, num, date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,number> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.number, num, num); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <number,string> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.number, Types.string, num, str); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,boolean> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.boolean, str, bool); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,Date> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.date, str, date); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,number> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.number, str, num); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <string,string> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.string, Types.string, str, str); dict.clear(); }).not.to.throw();
        });
        it('should not throw an error if initialized as <any,any> with initial keys and values', () => {
            expect(function () { let dict = Utils.setupDictionary(Types.testClass, Types.testClass, str, num); dict.clear(); }).not.to.throw();
        });
    });
    /************ */
});
//# sourceMappingURL=TestTest.js.map