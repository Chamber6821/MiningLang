import UnknownToken         from "exceptions/UnknownToken"
import DefaultTokenFactory  from "lexer/DefaultTokenFactory"
import Lexer, { MatchCase } from "lexer/Lexer"
import EqualsMatcher        from "lexer/matchers/EqualsMatcher"
import RegexpMatcher        from "lexer/matchers/RegexpMatcher"


enum TestType { Word = "Word", Number = "Number", VerticalLine = "VerticalLine", Space = "Space", EOF = "EOF" }

const pipe = [
    [TestType.Word, new RegexpMatcher(/^[a-z]+/i)],
    [TestType.Number, new RegexpMatcher(/^\d+/)],
    [TestType.VerticalLine, new EqualsMatcher("|")],
    [TestType.Space, new RegexpMatcher(/^\s+/)]
] as MatchCase<TestType>[]

test("Tokenize", () => {
    const fragment = "44 is a 2 digit number"

    const helpFactory = new DefaultTokenFactory<TestType>()
    const expected = [
        helpFactory.create(TestType.Number, "44"),
        helpFactory.create(TestType.Space, " "),
        helpFactory.create(TestType.Word, "is"),
        helpFactory.create(TestType.Space, " "),
        helpFactory.create(TestType.Word, "a"),
        helpFactory.create(TestType.Space, " "),
        helpFactory.create(TestType.Number, "2"),
        helpFactory.create(TestType.Space, " "),
        helpFactory.create(TestType.Word, "digit"),
        helpFactory.create(TestType.Space, " "),
        helpFactory.create(TestType.Word, "number"),
        helpFactory.create(TestType.EOF)
    ]

    const lexer = new Lexer(TestType.EOF, pipe)
    expect(lexer.tokenize(fragment))
        .toEqual(expected)
})

test("Tokenize with offset", () => {
    const fragment = "42 is the answer to all questions"
    const offset = 10
    const expectedPosition = 10

    const lexer = new Lexer(TestType.EOF, pipe)
    const tokens = lexer.tokenize(fragment, new DefaultTokenFactory(offset))

    expect(tokens[0].pos.index)
        .toEqual(expectedPosition)
})

test("Throw if no match found", () => {
    const fragment = "simple word ? <-- unknown token"

    const lexer = new Lexer(TestType.EOF, pipe)

    expect(() => lexer.tokenize(fragment))
        .toThrow(UnknownToken)
})