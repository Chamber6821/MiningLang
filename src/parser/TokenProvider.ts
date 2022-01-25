import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"


export default class TokenProvider {
    constructor(
        private tokens: Token[]
    ) {}

    empty(): boolean {
        // TODO: Implement method
    }

    skipSpaces(): void {
        this.skip(TokenType.Space, TokenType.Tie)
    }

    skip(...types: TokenType[]): void {
        // TODO: Implement method
    }

    next(): Token {
        // TODO: Implement method
    }

    rollBack(): void {
        // TODO: Implement method
    }
}
