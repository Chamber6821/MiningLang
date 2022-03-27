import TokenProvider from "parser/TokenProvider"
import Token         from "tokens/Token"
import TokenType     from "tokens/TokenType"
import range         from "utils/range"
import TokenFactory  from "utils/TokenFactory"


test("Is empty for empty list", () => {
    const instance = new TokenProvider([])

    expect(instance.empty()).toBe(true)
})

test("Is empty for no empty list", () => {
    const factory = new TokenFactory()
    const tokens = [factory.create(TokenType.Number)]
    const instance = new TokenProvider(tokens)

    expect(instance.empty()).toBe(false)
})

describe("Get tokens", () => {
    const factory = new TokenFactory()
    const tokens = [
        factory.create(TokenType.Space),
        factory.create(TokenType.Number),
        factory.create(TokenType.Tie),
        factory.create(TokenType.Name),
        factory.create(TokenType.EOF)
    ]

    test("Throw exception if ran out of tokens", () => {
        const instance = new TokenProvider(tokens)

        // skip all tokens
        for (let t in tokens)
            instance.next()

        expect(() => instance.next()).toThrow(Error)
    })

    test.each([...tokens.keys()])("Get %ith token", (index: number) => {
        const instance = new TokenProvider(tokens)

        for (let _ of range(0, index))
            instance.next()

        const token = instance.next()
        expect(token).toBe(tokens[index])
    })
})

describe("Roll back tokens", () => {
    type Index = number
    type Case = [Index, Index, Token]

    const factory = new TokenFactory()
    const tokens = [
        factory.create(TokenType.Space),
        factory.create(TokenType.Number),
        factory.create(TokenType.Tie),
        factory.create(TokenType.Name),
        factory.create(TokenType.EOF)
    ]

    test("Throw exception if ran out of tokens", () => {
        const instance = new TokenProvider(tokens)

        expect(() => instance.rollBack()).toThrow(Error)
    })

    // for index: 4
    // return: [
    //   [4, 1, Tie],
    //   [4, 2, Number],
    //   [4, 3, Space]
    // ]
    function createCasesForIndex(index: Index): Case[] {
        return Array.from({ length: index - 1 }, (_, i) => i + 1)
            .map(i => [index, i, tokens[index - i]])
    }

    const rawCases = [...range(0, tokens.length + 1)].map(createCasesForIndex)
    const mergedCases = ([] as Case[]).concat(...rawCases)

    test.each(mergedCases)("Skip %i and roll back %i tokens", (skipCount, rollBackCount, expectedToken) => {
        const instance = new TokenProvider(tokens)

        for (let _ of range(0, skipCount))
            instance.next()

        instance.rollBack(rollBackCount)

        expect(instance.next()).toBe(expectedToken)
    })
})

describe("Skip tokens", () => {
    const factory = new TokenFactory()
    const tokens = [
        factory.create(TokenType.Number),
        factory.create(TokenType.Tie),
        factory.create(TokenType.Tie),
        factory.create(TokenType.Tie),
        factory.create(TokenType.Space),
        factory.create(TokenType.Constant),
        factory.create(TokenType.Space),
        factory.create(TokenType.Procedure),
        factory.create(TokenType.Tie),
        factory.create(TokenType.EOF),
    ]

    test("Skip some tokens", () => {
        const instance = new TokenProvider(tokens)

        instance.skip(TokenType.Number, TokenType.Tie, TokenType.Space, TokenType.Constant)
        expect(instance.next()).toBe(tokens[7])
    })

    test("If there is nothing to skip", () => {
        const instance = new TokenProvider(tokens)

        expect(() => instance.skip(TokenType.Tie)).not.toThrow()
    })

    test("If provider is empty", () => {
        const instance = new TokenProvider([])

        expect(() => instance.skip(TokenType.Tie)).not.toThrow()
    })

    test("If all tokens was skipped", () => {
        const instance = new TokenProvider(tokens)

        instance.skip(...tokens.map(t => t.type))

        expect(instance.empty()).toBe(true)
        expect(() => instance.next()).toThrow()
    })
})