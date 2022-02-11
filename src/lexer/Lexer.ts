import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


const matchPriority = [

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

] as const

export default class Lexer {
    private pos = 0

    constructor(private code: string) {}

    getAllTokens(): Token[] {
        return [...this.tokenMatcher()]
    }

    private* tokenMatcher(): Generator<Token> {
        while (this.code.length > 0) {
            yield this.mathToken()
        }
        yield new Token(TokenType.EOF, "", this.movePosition(0))
    }

    private mathToken(): Token {
        for (const [type, regexp] of matchPriority) {
            const match = this.code.match(regexp)
            if (match === null) continue
            const value = match[0]

            this.code = this.code.substring(value.length)

            return new Token(type, value, this.movePosition(value.length))
        }

        // must never be called, because something bullshit is the same as TokenType.Unknown
        throw new Error("No matches found")
    }

    private movePosition(length: number): Position {
        const oldPos = this.pos
        this.pos += length
        return new Position(oldPos, length)
    }
}
