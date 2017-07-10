import ISortInterface from './ISortInterface';

export interface ISorter<T>
{
    quickSort(comparerFunction:ISortInterface<T>, data: T[], lowIndex:number, highIndex: number);
}