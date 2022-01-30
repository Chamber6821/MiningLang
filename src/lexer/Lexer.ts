import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


const matchPriority: Array<[TokenType, RegExp]> = [

    [TokenType.Procedure, /^void/],
    [TokenType.Function, /^func/],
    [TokenType.Constant, /^const/],

    [TokenType.LBrace, /^{/],
    [TokenType.RBrace, /^}/],
    [TokenType.LPar, /^\(/],
    [TokenType.RPar, /^\)/],

    [TokenType.Assign, /^=/],
    [TokenType.Plus, /^\+/],
    [TokenType.Minus, /^-/],
    [TokenType.Multiple, /^\*/],
    [TokenType.Divide, /^\//],
    [TokenType.Mod, /^%/],

    [TokenType.Name, /^[a-zA-Z][a-zA-Z0-9]*/],
    [TokenType.Number, /^[0-9]+/],

    [TokenType.Space, /^[ \t\v]+/],
    [TokenType.Tie, /^\n/],
    [TokenType.Unknown, /^[^\s\w]+/]

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
        yield new Token(TokenType.EOF, "", this.pos)
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

        // must never be called, because something bullshit is the same as TokenType.Unknown
        throw new Error("No matches found")
    }

    private movePos(value: string) {
        const newLines: number = (value.match(/\n/) || []).length
        const columns: number = value.substring(value.lastIndexOf("\n") + 1).length

        this.pos = {
            line: this.pos.line + newLines,
            column: newLines === 0 ? this.pos.column + columns : columns + 1
        }
    }
}
