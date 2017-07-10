
import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
export class Sorter<T> implements ISorter<T>
{
    public quickSort(comparerFunction: ISortInterFace<T>, data: T[], lowIndex: number, highIndex: number) {
    
        if (highIndex - lowIndex <= 1) { return; }
        let pivot: T = data[highIndex -1];
        let splitIndex = lowIndex;
        for(let i: number = lowIndex; i < highIndex - 1; i++)
        {
            if (comparerFunction(data[i], pivot) <= 0)
            {
                this.swap(data, i, splitIndex);
                splitIndex++;
            }
        }
        this.swap(data, highIndex - 1, splitIndex);
        this.quickSort(comparerFunction, data, lowIndex, splitIndex);
        this.quickSort(comparerFunction, data, splitIndex + 1, highIndex);
        return;
    }

    private swap(data: T[], index1: number, index2: number)
    {
        let temp: T = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    }

    constructor()
    {    }
}