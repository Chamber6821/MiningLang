import Lexer     from "lexer/Lexer"
import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"


test("Match empty procedure", () => {
    const emptyProcedure = "void foo {}"
    const expectedTokens: Token[] = [
        new Token(TokenType.Procedure, "void", { line: 1, column: 1 }),
        new Token(TokenType.Space, " ", { line: 1, column: 5 }),
        new Token(TokenType.Name, "foo", { line: 1, column: 6 }),
        new Token(TokenType.Space, " ", { line: 1, column: 9 }),
        new Token(TokenType.LBrace, "{", { line: 1, column: 10 }),
        new Token(TokenType.RBrace, "}", { line: 1, column: 11 })
    ]

    expect(new Lexer(emptyProcedure).getAllTokens()).toEqual(expectedTokens)
})
