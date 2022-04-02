import DefaultTokenFactory from "lexer/DefaultTokenFactory"
import Token  from "lexer/Token"
import Node   from "parser/nodes/Node"
import Parser       from "parser/Parser"
import ParsingError from "parser/nodes/ParsingError"
import Pattern      from "parser/Pattern"


enum TokenType {
    Constant = "Constant",
    Number = "Number",
    Name = "Name",
    Space = "Space",
    Tie = "Tie",
    Plus = "Plus"
}

class Declaration implements Node {
    static readonly nodeName = "const-declaration"
    static readonly pattern = new Pattern<TokenType>(Declaration.nodeName, (parser, provider) => {
        provider.skip(TokenType.Space, TokenType.Tie)

        const keyword = provider.next()
        if (keyword.type !== TokenType.Constant) {
            return new ParsingError(Declaration.nodeName, [TokenType.Constant], keyword)
        }

        provider.skip(TokenType.Space, TokenType.Tie)

        const name = provider.next()
        if (name.type !== TokenType.Name) {
            return new ParsingError(Declaration.nodeName, [TokenType.Name], name)
        }

        provider.skip(TokenType.Space, TokenType.Tie)

        return new Declaration(name)
    })

    constructor(
        readonly name: Token<TokenType>
    ) {}

    getAllNodes(): Node[] {
        return []
    }
}

class SumExpression implements Node {
    static readonly nodeName = "sum-expression"
    static readonly pattern = new Pattern<TokenType>(SumExpression.nodeName, (parser, provider) => {
        provider.skip(TokenType.Space, TokenType.Tie)

        const left = provider.next()
        if (left.type !== TokenType.Number) {
            return new ParsingError(SumExpression.nodeName, [TokenType.Number], left)
        }

        provider.skip(TokenType.Space, TokenType.Tie)

        const operator = provider.next()
        if (operator.type !== TokenType.Plus) {
            return new ParsingError(SumExpression.nodeName, [TokenType.Plus], operator)
        }

        provider.skip(TokenType.Space, TokenType.Tie)

        const right = provider.next()
        if (right.type !== TokenType.Number) {
            return new ParsingError(SumExpression.nodeName, [TokenType.Number], right)
        }

        provider.skip(TokenType.Space, TokenType.Tie)

        return new SumExpression(left, right)
    })

    constructor(
        readonly left: Token<TokenType>,
        readonly right: Token<TokenType>
    ) {}

    getAllNodes(): Node[] {
        return []
    }
}

describe("Valid expression", () => {
    const factory = new DefaultTokenFactory<TokenType>()
    const tokens = [
        factory.create(TokenType.Constant, "const"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.Name, "A")
    ]
    let parser: Parser<TokenType>
    let node: Node | ParsingError<TokenType>[] | null

    beforeEach(() => {
        parser = new Parser(tokens)
    })

    test("Otherwise return null", () => {
        node = parser.parse(Declaration.pattern)
                     .elseReturnNull()
    })

    test("Otherwise return parsing error", () => {
        node = parser.parse(Declaration.pattern)
                     .elseReturnError()
    })

    test("Chain of patterns", () => {
        node = parser.parse(SumExpression.pattern)
                     .orParse(Declaration.pattern)
                     .elseReturnNull()
    })

    afterEach(() => {
        expect(node).not.toBe(null)
        expect(node).toBeInstanceOf(Declaration)
        expect((node as Declaration).name).toBe(tokens[2]) // token "A"
    })
})

describe("Invalid expression", () => {
    const factory = new DefaultTokenFactory<TokenType>()
    const tokens = [
        factory.create(TokenType.Constant, "const"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.Number, "58")
    ]
    let parser: Parser<TokenType>

    beforeEach(() => {
        parser = new Parser(tokens)
    })

    test("Return null", () => {
        const node = parser.parse(Declaration.pattern)
                           .elseReturnNull()

        expect(node).toBe(null)
    })

    test("Return parsing error", () => {
        const node = parser.parse(Declaration.pattern)
                           .elseReturnError()

        expect(node).toBeInstanceOf(Array)
        expect((node as Array<any>).length).toBe(1)

        const error = (node as ParsingError<TokenType>[])[0]

        expect(error).toBeInstanceOf(ParsingError)
        expect(error.from).toBe(Declaration.nodeName)
        expect(error.expected).toEqual([TokenType.Name])
        expect(error.received).toBe(tokens[2])
        expect(error.childErrors).toEqual([])
    })
})

test("Parse two nodes", () => {
    const factory = new DefaultTokenFactory<TokenType>()
    const tokens = [
        factory.create(TokenType.Constant, "const"),
        factory.create(TokenType.Space, " "),
        factory.create(TokenType.Name, "A"),
        factory.create(TokenType.Tie),
        factory.create(TokenType.Number, "42"),
        factory.create(TokenType.Plus, "+"),
        factory.create(TokenType.Number, "137")
    ]
    const parser = new Parser(tokens)

    const declaration = parser.parse(Declaration.pattern)
                              .orParse(SumExpression.pattern)
                              .elseReturnNull()

    const addition = parser.parse(Declaration.pattern)
                           .orParse(SumExpression.pattern)
                           .elseReturnNull()

    expect(declaration).toBeInstanceOf(Declaration)
    expect((declaration as Declaration).name).toBe(tokens[2])

    expect(addition).toBeInstanceOf(SumExpression)
    expect((addition as SumExpression).left).toBe(tokens[4])
    expect((addition as SumExpression).right).toBe(tokens[6])
})
