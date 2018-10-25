import { Sorter } from "../src/Sorter";
import { KeyValuePair } from "../src/KeyValuePair";
import { TestClass } from "./utils/TestClass";
import { expect } from "chai";
import "mocha";

// Test of the KeyValuePair Class

describe("Sorter\n  ######n", () => {
  describe("Constructor", () => {
    let dummy: boolean;
    it("should not throw an error when initialized with a number as sample", () => {
      expect(function() {
        let test: Sorter<number> = new Sorter(22);
        dummy = test.isCommonType;
      }).to.not.throw();
    });
    it("should not throw an error when initialized with a undefined as sample", () => {
      expect(function() {
        let test: Sorter<number> = new Sorter(undefined);
        dummy = test.isCommonType;
      }).to.not.throw();
    });
    it("should not throw an error when initialized with a empty string as sample", () => {
      expect(function() {
        let test: Sorter<string> = new Sorter("");
        dummy = test.isCommonType;
      }).to.not.throw();
    });
    it("should not throw an error when initialized with false as sample", () => {
      expect(function() {
        let test: Sorter<boolean> = new Sorter(false);
        dummy = test.isCommonType;
      }).to.not.throw();
    });
    it("should not throw an error when initialized with a KeyValuePair without the identification as TupleSort", () => {
      let item: KeyValuePair<string, Date> = new KeyValuePair("22", new Date());
      expect(function() {
        let test: Sorter<KeyValuePair<string, Date>> = new Sorter(item);
        dummy = test.isCommonType;
      }).to.not.throw();
    });
    it("should not throw an error when initialized with a KeyValuePair with the identification as TupleSort", () => {
      let item: KeyValuePair<string, Date> = new KeyValuePair<string, Date>(
        "22",
        new Date()
      );
      expect(function() {
        let test: Sorter<any> = new Sorter(item, true);
        dummy = test.isCommonType;
      }).to.not.throw();
    });
  });

  describe("getter", () => {
    it("should return true on property isBasicType on a numeric sorter", () => {
      let test: Sorter<number> = new Sorter(22);
      expect(test.isBasicType).to.equal(true);
    });
    it("should return false on property isBasicType on a object sorter", () => {
      let test: Sorter<Object> = new Sorter(new Object());
      expect(test.isBasicType).to.equal(false);
    });
    it("should return true on property isCommonType on a Date sorter", () => {
      let test: Sorter<Date> = new Sorter(new Date());
      expect(test.isCommonType).to.equal(true);
    });
    it("should return true on property hasCompareToImplemented on a sorter for the prepared TestClass", () => {
      let test: Sorter<TestClass> = new Sorter(TestClass.createRandomObject());
      expect(test.hasCompareToImplemented).to.equal(true);
    });
    it("should return false on property hasCompareToImplemented on a class with a property compareTo which is not a function", () => {
      let test: Sorter<Dummy1> = new Sorter(new Dummy1());
      expect(test.hasCompareToImplemented).to.equal(false);
    });
    it("should return false on property hasCompareToImplemented on a class with a function compareTo which does not return a number", () => {
      let test: Sorter<Dummy2> = new Sorter(new Dummy2());
      expect(test.hasCompareToImplemented).to.equal(false);
    });
    it("should return true on property isTupleSort if initialized as TupleSort", () => {
      let item: KeyValuePair<string, Date> = new KeyValuePair<string, Date>(
        "22",
        new Date()
      );
      let test: Sorter<any> = new Sorter(item, true);
      expect(test.isTupleSort).to.equal(true);
    });
    it("should return false on property isTupleSort if initialized with a KeyValuePair but not set to TupleSort", () => {
      let item: KeyValuePair<string, Date> = new KeyValuePair<string, Date>(
        "22",
        new Date()
      );
      let test: Sorter<any> = new Sorter(item);
      expect(test.isTupleSort).to.equal(false);
    });
  });

  /************ */
});

/**
 * Dummy class for sorter testing
 */
class Dummy1 {
  public compareTo: number = 0;
}

/**
 * Dummy class for sorter testing
 */
class Dummy2 {
  public compareTo(value: string): string {
    return value;
  }
}
