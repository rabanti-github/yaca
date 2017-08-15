import IForEachInterfaceDictionary from './IForEachInterfaceDictionary';
import List from '../List';
/**
 * Interface for Dictionary (Delegating further interfaces)
 */
export interface IDictionary<K, V> {
    length: number;
    add(key: K, value: V): void;
    addRange(keys: K[], values: V[]): void;
    addRange(keys: List<K>, values: List<V>): void;
    addRange(values: IDictionary<K, V>): void;
    clear(): void;
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    get(key: K): V;
    getKeys(): K[];
    getValues(): V[];
    remove(keys: K[]): boolean;
    remove(keys: List<K>): boolean;
    remove(key: K): boolean;
    /**
     * Interface to handle foeEach loops
     */
    forEach(callback: IForEachInterfaceDictionary<K, V>): void;
}
