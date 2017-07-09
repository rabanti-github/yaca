import IForEachInterface from './IForEachInterface';
import ISortInterface from './ISortInterface';

export interface IList<T>
{
    forEach(callback:IForEachInterface<T>);

    sort(sortFunction:ISortInterface<T>);

}