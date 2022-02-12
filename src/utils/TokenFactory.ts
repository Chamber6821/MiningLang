import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


export default class TokenFactory {
    public index = 0

    create(type: TokenType, value = ""): Token {
        const token = new Token(type, value, new Position(this.index, value.length))
        this.index += value.length
        return token
    }
}