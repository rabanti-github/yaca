export class Item<T> implements IteratorResult<T>
{
    public isLastEntry: boolean;
    public value: T;

    constructor(value: T, finished: boolean)
    {
        this.isLastEntry = finished;
        this.value = value;
    }
}
