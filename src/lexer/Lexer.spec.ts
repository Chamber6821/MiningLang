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

test("Match constant declaration", () => {
    const constantDeclaration = "const A=B"
    const expectedTokens: Token[] = [
        new Token(TokenType.Constant, "const", { line: 1, column: 1 }),
        new Token(TokenType.Space, " ", { line: 1, column: 6 }),
        new Token(TokenType.Name, "A", { line: 1, column: 7 }),
        new Token(TokenType.Assign, "=", { line: 1, column: 8 }),
        new Token(TokenType.Name, "B", { line: 1, column: 9 })
    ]

    expect(new Lexer(constantDeclaration).getAllTokens()).toEqual(expectedTokens)
})

