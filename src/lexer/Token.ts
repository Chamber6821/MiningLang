import Position from "utils/Position"


export default class Token<T> {
    constructor(
        readonly type: T,
        readonly value: string,
        readonly pos: Position) {
    }
}