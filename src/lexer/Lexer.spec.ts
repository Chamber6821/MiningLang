import Lexer     from "lexer/Lexer"
import Token     from "tokens/Token"
import TokenType from "tokens/TokenType"
import Position  from "utils/Position"


test("Match empty procedure", () => {
    const emptyProcedure = "void foo {}"
    const expectedTokens: Token[] = [
        new Token(TokenType.Procedure, "void", new Position(0, 4)),
        new Token(TokenType.Space, " ", new Position(4, 1)),
        new Token(TokenType.Name, "foo", new Position(5, 3)),
        new Token(TokenType.Space, " ", new Position(8, 1)),
        new Token(TokenType.LBrace, "{", new Position(9, 1)),
        new Token(TokenType.RBrace, "}", new Position(10, 1)),
        new Token(TokenType.EOF, "", new Position(11, 0))
    ]

    expect(new Lexer(emptyProcedure).getAllTokens()).toEqual(expectedTokens)
})

test("Match empty function", () => {
    const emptyProcedure = "func myFunc {}"
    const expectedTokens: Token[] = [
        new Token(TokenType.Function, "func", new Position(0, 4)),
        new Token(TokenType.Space, " ", new Position(4, 1)),
        new Token(TokenType.Name, "myFunc", new Position(5, 6)),
        new Token(TokenType.Space, " ", new Position(11, 1)),
        new Token(TokenType.LBrace, "{", new Position(12, 1)),
        new Token(TokenType.RBrace, "}", new Position(13, 1)),
        new Token(TokenType.EOF, "", new Position(14, 0))
    ]

    expect(new Lexer(emptyProcedure).getAllTokens()).toEqual(expectedTokens)
})

test("Match constant declaration", () => {
    const constantDeclaration = "const A=B"
    const expectedTokens: Token[] = [
        new Token(TokenType.Constant, "const", new Position(0, 5)),
        new Token(TokenType.Space, " ", new Position(5, 1)),
        new Token(TokenType.Name, "A", new Position(6, 1)),
        new Token(TokenType.Assign, "=", new Position(7, 1)),
        new Token(TokenType.Name, "B", new Position(8, 1)),
        new Token(TokenType.EOF, "", new Position(9, 0))
    ]

    expect(new Lexer(constantDeclaration).getAllTokens()).toEqual(expectedTokens)
})

test("Match math expression", () => {
    const constantDeclaration = "15+4*A-C/(77%SomeConstant)"
    const expectedTokens: Token[] = [
        new Token(TokenType.Number, "15", new Position(0, 2)),
        new Token(TokenType.Plus, "+", new Position(2, 1)),
        new Token(TokenType.Number, "4", new Position(3, 1)),
        new Token(TokenType.Multiple, "*", new Position(4, 1)),
        new Token(TokenType.Name, "A", new Position(5, 1)),
        new Token(TokenType.Minus, "-", new Position(6, 1)),
        new Token(TokenType.Name, "C", new Position(7, 1)),
        new Token(TokenType.Divide, "/", new Position(8, 1)),
        new Token(TokenType.LPar, "(", new Position(9, 1)),
        new Token(TokenType.Number, "77", new Position(10, 2)),
        new Token(TokenType.Mod, "%", new Position(12, 1)),
        new Token(TokenType.Name, "SomeConstant", new Position(13, 12)),
        new Token(TokenType.RPar, ")", new Position(25, 1)),
        new Token(TokenType.EOF, "", new Position(26, 0))
    ]

    expect(new Lexer(constantDeclaration).getAllTokens()).toEqual(expectedTokens)
})

test("Match spaces", () => {
    const spaces = "   \t\v  \n  Name\n  ???Name2\n"
    const expectedTokens: Token[] = [
        new Token(TokenType.Space, "   \t\v  ", new Position(0, 7)),
        new Token(TokenType.Tie, "\n", new Position(7, 1)),
        new Token(TokenType.Space, "  ", new Position(8, 2)),
        new Token(TokenType.Name, "Name", new Position(10, 4)),
        new Token(TokenType.Tie, "\n", new Position(14, 1)),
        new Token(TokenType.Space, "  ", new Position(15, 2)),
        new Token(TokenType.Unknown, "???", new Position(17, 3)),
        new Token(TokenType.Name, "Name2", new Position(20, 5)),
        new Token(TokenType.Tie, "\n", new Position(25, 1)),
        new Token(TokenType.EOF, "", new Position(26, 0))
    ]

    expect(new Lexer(spaces).getAllTokens()).toEqual(expectedTokens)
})
