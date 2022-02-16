import Token        from "lexer/Token"
import TokenFactory from "lexer/TokenFactory"
import Position     from "utils/Position"


export default class DefaultTokenFactory<TokenType> implements TokenFactory<TokenType> {
    public index: number

    constructor(startIndex = 0) {
        this.index = startIndex
    }

    create(type: TokenType, value = "") {
        const token = new Token(type, value, new Position(this.index, value.length))
        this.index += value.length
        return token
    }
}