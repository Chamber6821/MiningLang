import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"


export default class TokenProvider {
    private currentToken: number = 0

    constructor(
        private tokens: Token[]
    ) {}

    empty(): boolean {
        return this.currentToken >= this.tokens.length
    }

    skipSpaces(): void {
        this.skip(TokenType.Space, TokenType.Tie)
    }

    skip(...types: TokenType[]): void {
        if (this.empty()) return
        while (types.includes(this.next().type)) {
            if (this.empty()) return
        }
        this.rollBack()
    }

    next(): Token {
        if (this.empty()) throw new Error("Ran out of tokens")

        const token = this.tokens[this.currentToken]
        this.currentToken++
        return token
    }

    rollBack(count = 1): void {
        this.currentToken -= count

        if (this.currentToken < 0) throw new Error("Ran out of tokens")
    }
}
