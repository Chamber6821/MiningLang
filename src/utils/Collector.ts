export default class Collector<T> {
    readonly items: T[] = []

    get collected(): readonly T[] { return this.items }

    add(item: T): this {
        this.items.push(item)
        return this
    }
}