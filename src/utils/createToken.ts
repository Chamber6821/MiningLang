import Token          from "tokens/Token"
import TokenType      from "tokens/TokenType"
import createPosition from "utils/createPosition"


export default function createToken(type: TokenType, value = "", pos = createPosition()): Token {
    return new Token(type, value, pos)
}