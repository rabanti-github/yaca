import ISortInterface from './ISortInterface';

export interface ISorter<T>
{
    addNextValue(sortFunction:ISortInterface<T>, nextValue: T);

 
}