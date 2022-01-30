import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"


export default class ParsingError {
    constructor(
        readonly expected: TokenType[],
        readonly received: Token
    ) {}
}