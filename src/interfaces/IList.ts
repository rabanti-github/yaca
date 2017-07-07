import IForEachInterface from './IForEachInterface';

export interface IList<T>
{
    forEach(callback:IForEachInterface<T>);

}