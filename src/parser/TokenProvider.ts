import Token from "lexer/Token"


export default class TokenProvider<TokenType> {
    private currentToken: number = 0

    constructor(
        private tokens: Token<TokenType>[]
    ) {}

    get viewed(): number {
        return this.currentToken
    }

    empty(): boolean {
        return this.currentToken >= this.tokens.length
    }

    skip(...types: TokenType[]): void {
        if (this.empty()) return
        while (types.includes(this.next().type)) {
            if (this.empty()) return
        }
        this.rollBack()
    }

    next(): Token<TokenType> {
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
