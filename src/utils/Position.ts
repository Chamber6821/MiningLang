export default class Position {
    constructor(
        readonly index: number,
        readonly length: number
    ) {}

    get begin(): number { return this.index }
    get end(): number { return this.index + this.length }
}