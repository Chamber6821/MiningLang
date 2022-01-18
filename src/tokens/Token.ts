import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


export default class Token {

    readonly type: TokenType
    readonly value: string
    readonly pos: Position

    constructor(type: TokenType, value: string, pos: Position) {
        this.type = type
        this.value = value
        this.pos = pos
    }
}
