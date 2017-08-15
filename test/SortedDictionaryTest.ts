import {SortedDictionary} from '../src/SortedDictionary';
//import {KeyValuePair} from '../src/KeyValuePair';
//import List from '../src/List';
//import {IteratorItem} from '../src/IteratorItem';
//import { Utils } from './utils/Utils';
//import {Types} from './utils/Types';
//import { TestClass } from './utils/TestClass';
import { expect } from 'chai';
import 'mocha';

// This file is to test the SortedDictionary<K,V> class

describe("SORTEDDICTIONARY<K,V>\n  ###############\n",() => {

    describe('getByIndex method', () => {
        let dict: SortedDictionary<string,number>;
        it('should return the value 42 when performed with index 1', () => {
            dict =  new SortedDictionary<string, number>(["a","b","c"], [11,42,86]);// Utils.setupDictionary(Types.string, Types.number, ["a","b","c"], [11,42,86]) as SortedDictionary<string, number>;
            let value: number = dict.getByIndex(1);
            expect(value).to.equal(42);
        });

    });


/************ */
});