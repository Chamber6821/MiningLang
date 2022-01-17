import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


const matchPriority: Array<[TokenType, RegExp]> = [

    [TokenType.Procedure, /^void/],
    [TokenType.Name, /^[a-zA-Z][a-zA-Z0-9]*/],
    [TokenType.LBrace, /^{/],
    [TokenType.RBrace, /^}/],
    [TokenType.Space, /^ +/]

]

export default class Lexer {
    private code: string
    private pos: Position = { line: 1, column: 1 }

    constructor(code: string) {
        this.code = code
    }

    getAllTokens(): Token[] {
        return [...this.tokenMatcher()]
    }

    private* tokenMatcher(): Generator<Token> {
        while (this.code.length > 0) {
            yield this.mathToken()
        }
    }

    private mathToken(): Token {
        for (const [type, regexp] of matchPriority) {
            const match = this.code.match(regexp)
            if (match === null) continue
            const value = match[0]

            this.code = this.code.substring(value.length)

            const token = new Token(type, value, this.pos)
            this.movePos(value)

            return token
        }

        throw new Error("No matches found")
    }

    private movePos(value: string) {
        const newLines: number = (value.match(/\n/) || []).length

        if (newLines === 0) {
            this.pos = {
                ...this.pos,
                column: this.pos.column + value.length
            }
            return
        }

        //const symbols: number = value.match(/\n(.*)$/)
    }
}