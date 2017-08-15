import { Dictionary } from './Dictionary';
import ISortInterFace from './interfaces/ISortInterface';
import List from './List';
export declare class SortedDictionary<K, V> extends Dictionary<K, V> {
    getByIndex(index: number): V;
    getByIndices(indices: number[]): V[];
    getByIndices(indices: List<number>): V[];
    getByIndicesAsList(indices: number[]): List<V>;
    getByIndicesAsList(indices: List<number>): List<V>;
    getKeyByIndex(index: number): K;
    getKeysByIndices(indices: number[]): K[];
    getKeysByIndices(indices: List<number>): K[];
    getKeysByIndicesAsList(indices: number[]): List<K>;
    getKeysByIndicesAsList(indices: List<number>): List<K>;
    setByIndex(index: number, value: V): void;
    setByIndices(indices: number[], values: V[]): void;
    setByIndices(indices: List<number>, values: List<V>): void;
    removeByIndex(indices: List<number>): boolean;
    removeByIndex(indices: number[]): boolean;
    removeByIndex(index: number): boolean;
    private checkIndex(index, length);
    sortByKey(): void;
    sortByKey(sortFunction: ISortInterFace<K>): void;
    sortByValue(): void;
    sortByValue(sortFunction: ISortInterFace<V>): void;
    private sortInternal(byKey, sortFunction?);
}
