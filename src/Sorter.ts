
import ISortInterFace from './interfaces/ISortInterface';
import { ISorter } from './interfaces/ISorter';
/**
 * Class for sorter algorithms
 */
export class Sorter<T> implements ISorter<T>
{
    /**
     * Implementation of a quicksort algorithm. This method is called recursively
     * @param comparerFunction Comparison function to compare the List entry of the passed lower and higher index position
     * @param data Data as array of the type T
     * @param lowIndex Lower index within the List to check
     * @param highIndex Higher index within the List to check
     */
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

    /**
     * Internal swap method for quicksort
     * @param data Data as array of the type T
     * @param index1 Index position 1 of the data to swap
     * @param index2 Index position 2 of the data to swap
     */
    private swap(data: T[], index1: number, index2: number)
    {
        let temp: T = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    }

    constructor()
    {    }
}