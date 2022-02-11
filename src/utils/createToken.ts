import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


export default function createToken(type: TokenType, value = "", pos = new Position(0, 0)): Token {
    return new Token(type, value, pos)
}