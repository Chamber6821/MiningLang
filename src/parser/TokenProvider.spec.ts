import TokenProvider from "parser/TokenProvider"
import Token         from "tokens/Token"
import TokenType     from "tokens/TokenType"
import createToken   from "utils/createToken"
import range         from "utils/range"


test("Is empty for empty list", () => {
    const instance = new TokenProvider([])

    expect(instance.empty()).toBe(true)
})

test("Is empty for no empty list", () => {
    const tokens = [createToken(TokenType.Number)]
    const instance = new TokenProvider(tokens)

    expect(instance.empty()).toBe(false)
})

describe("Get tokens", () => {
    const tokens = [
        createToken(TokenType.Space),
        createToken(TokenType.Number),
        createToken(TokenType.Tie),
        createToken(TokenType.Name),
        createToken(TokenType.EOF)
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

    const tokens = [
        createToken(TokenType.Space),
        createToken(TokenType.Number),
        createToken(TokenType.Tie),
        createToken(TokenType.Name),
        createToken(TokenType.EOF)
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
    const tokens = [
        createToken(TokenType.Number),
        createToken(TokenType.Tie),
        createToken(TokenType.Tie),
        createToken(TokenType.Tie),
        createToken(TokenType.Space),
        createToken(TokenType.Constant),
        createToken(TokenType.Space),
        createToken(TokenType.Procedure),
        createToken(TokenType.Tie),
        createToken(TokenType.EOF),
    ]

    test("Skip some tokens", () => {
        const instance = new TokenProvider(tokens)

        instance.skip(TokenType.Number, TokenType.Tie, TokenType.Space, TokenType.Constant)
        expect(instance.next()).toBe(tokens[7])
    })

    test("Skip spaces", () => {
        const instance = new TokenProvider(tokens)

        instance.skipSpaces()
        expect(instance.next()).toBe(tokens[0])

        instance.skipSpaces()
        expect(instance.next()).toBe(tokens[5])
    })

    test("If there is nothing to skip", () => {
        const instance = new TokenProvider(tokens)

        expect(() => instance.skipSpaces()).not.toThrow()
    })

    test("If provider is empty", () => {
        const instance = new TokenProvider([])

        expect(() => instance.skipSpaces()).not.toThrow()
    })

    test("If all tokens was skipped", () => {
        const instance = new TokenProvider(tokens)

        instance.skip(...tokens.map(t => t.type))

        expect(() => instance.next()).toThrow()
    })
})