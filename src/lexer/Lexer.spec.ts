import Lexer        from "lexer/Lexer"
import TokenType    from "tokens/TokenType"
import TokenFactory from "utils/TokenFactory"


test("Match empty procedure", () => {
    const emptyProcedure = "void foo {}"

    const factory = new TokenFactory()
    const expected = [
        factory.create(TokenType.Procedure, "void"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.Name, "foo"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.LBrace, "{"),
        factory.create(TokenType.RBrace, "}"),
        factory.create(TokenType.EOF, "")
    ]

    expect(new Lexer(emptyProcedure).getAllTokens()).toEqual(expected)
})

test("Match empty function", () => {
    const emptyProcedure = "func myFunc {}"

    const factory = new TokenFactory()
    const expected = [
        factory.create(TokenType.Function, "func"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.Name, "myFunc"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.LBrace, "{"),
        factory.create(TokenType.RBrace, "}"),
        factory.create(TokenType.EOF, "")
    ]

    expect(new Lexer(emptyProcedure).getAllTokens()).toEqual(expected)
})

test("Match constant declaration", () => {
    const constantDeclaration = "const A=B"

    const factory = new TokenFactory()
    const expected = [
        factory.create(TokenType.Constant, "const"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.Name, "A"),
        factory.create(TokenType.Assign, "="),
        factory.create(TokenType.Name, "B"),
        factory.create(TokenType.EOF, "")
    ]

    expect(new Lexer(constantDeclaration).getAllTokens()).toEqual(expected)
})

test("Match math expression", () => {
    const constantDeclaration = "15+4*A-C/(77%SomeConstant)"

    const factory = new TokenFactory()
    const expected = [
        factory.create(TokenType.Number, "15"),
        factory.create(TokenType.Plus, "+"),
        factory.create(TokenType.Number, "4"),
        factory.create(TokenType.Multiple, "*"),
        factory.create(TokenType.Name, "A"),
        factory.create(TokenType.Minus, "-"),
        factory.create(TokenType.Name, "C"),
        factory.create(TokenType.Divide, "/"),
        factory.create(TokenType.LPar, "("),
        factory.create(TokenType.Number, "77"),
        factory.create(TokenType.Mod, "%"),
        factory.create(TokenType.Name, "SomeConstant"),
        factory.create(TokenType.RPar, ")"),
        factory.create(TokenType.EOF, "")
    ]

    expect(new Lexer(constantDeclaration).getAllTokens()).toEqual(expected)
})

test("Match spaces", () => {
    const spaces = "   \t\v  \n  Name\n  ???Name2\n"

    const factory = new TokenFactory()
    const expected = [
        factory.create(TokenType.Space, "   \t\v  "),
        factory.create(TokenType.Tie, "\n"),
        factory.create(TokenType.Space, "  "),
        factory.create(TokenType.Name, "Name"),
        factory.create(TokenType.Tie, "\n"),
        factory.create(TokenType.Space, "  "),
        factory.create(TokenType.Unknown, "???"),
        factory.create(TokenType.Name, "Name2"),
        factory.create(TokenType.Tie, "\n"),
        factory.create(TokenType.EOF, "")
    ]

    expect(new Lexer(spaces).getAllTokens()).toEqual(expected)
})
