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

test("Match empty function", () => {
    const emptyProcedure = "func myFunc {}"
    const expectedTokens: Token[] = [
        new Token(TokenType.Function, "func", { line: 1, column: 1 }),
        new Token(TokenType.Space, " ", { line: 1, column: 5 }),
        new Token(TokenType.Name, "myFunc", { line: 1, column: 6 }),
        new Token(TokenType.Space, " ", { line: 1, column: 12 }),
        new Token(TokenType.LBrace, "{", { line: 1, column: 13 }),
        new Token(TokenType.RBrace, "}", { line: 1, column: 14 })
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

test("Match math expression", () => {
    const constantDeclaration = "15+4*A-C/(77%SomeConstant)"
    const expectedTokens: Token[] = [
        new Token(TokenType.Number, "15", { line: 1, column: 1 }),
        new Token(TokenType.Plus, "+", { line: 1, column: 3 }),
        new Token(TokenType.Number, "4", { line: 1, column: 4 }),
        new Token(TokenType.Multiple, "*", { line: 1, column: 5 }),
        new Token(TokenType.Name, "A", { line: 1, column: 6 }),
        new Token(TokenType.Minus, "-", { line: 1, column: 7 }),
        new Token(TokenType.Name, "C", { line: 1, column: 8 }),
        new Token(TokenType.Divide, "/", { line: 1, column: 9 }),
        new Token(TokenType.LPar, "(", { line: 1, column: 10 }),
        new Token(TokenType.Number, "77", { line: 1, column: 11 }),
        new Token(TokenType.Mod, "%", { line: 1, column: 13 }),
        new Token(TokenType.Name, "SomeConstant", { line: 1, column: 14 }),
        new Token(TokenType.RPar, ")", { line: 1, column: 26 })
    ]

    expect(new Lexer(constantDeclaration).getAllTokens()).toEqual(expectedTokens)
})
