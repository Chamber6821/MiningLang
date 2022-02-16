import UnknownToken        from "exceptions/UnknownToken"
import DefaultTokenFactory from "lexer/DefaultTokenFactory"
import Matcher             from "lexer/matchers/RegexpMatcher"
import Token               from "lexer/Token"
import TokenFactory        from "lexer/TokenFactory"


export type MatchCase<TokenType> = readonly [TokenType, Matcher]

export default class Lexer<TokenType = string> {
    constructor(
        readonly eof: TokenType,
        readonly matchPipe: MatchCase<TokenType>[]
    ) {}

    tokenize(code: string, factory: TokenFactory<TokenType> = new DefaultTokenFactory()): Token<TokenType>[] {
        return [...this.tokenMatcher(code, factory)]
    }

    private* tokenMatcher(code: string, factory: TokenFactory<TokenType>): Generator<Token<TokenType>> {
        const startIndex = factory.index

        while (factory.index - startIndex < code.length) {
            yield this.mathToken(code, factory, startIndex)
        }

        yield factory.create(this.eof)
    }

    private mathToken(code: string, factory: TokenFactory<TokenType>, offset: number): Token<TokenType> {
        const fragment = code.substring(factory.index - offset)

        for (const [type, matcher] of this.matchPipe) {
            const value = matcher.match(fragment)
            if (value === null) continue

            return factory.create(type, value)
        }

        throw new UnknownToken(fragment, factory.index)
    }
}