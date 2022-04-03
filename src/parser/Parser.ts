import Token         from "lexer/Token"
import Node          from "parser/nodes/Node"
import ParsingError  from "parser/nodes/ParsingError"
import Pattern       from "parser/Pattern"
import TokenProvider from "parser/TokenProvider"
import range         from "utils/range"


export default class Parser<T> {
    readonly provider

    private patterns: Pattern<T>[] = []

    constructor(
        private readonly tokens: Token<T>[]
    ) {
        this.provider = new TokenProvider(this.tokens)
    }

    parse(pattern: Pattern<T>): this {
        return this.orParse(pattern)
    }

    orParse(pattern: Pattern<T>): this {
        this.patterns.push(pattern)
        return this
    }

    elseReturnNull(): Node | null {
        const result = this.elseReturnError()

        if (result instanceof Array) {
            return null
        }

        return result
    }

    elseReturnError(): Node | ParsingError<T>[] {
        const patterns = this.patterns
        this.patterns = []

        const errors: ParsingError<T>[] = []
        for (const pattern of patterns) {
            const result = this.tryApplyPattern(pattern)
            if (result instanceof ParsingError) {
                errors.push(result)
            } else {
                return result
            }
        }

        return errors
    }

    private tryApplyPattern(pattern: Pattern<T>): Node | ParsingError<T> {
        const parser = new Parser(this.tokens.slice(this.provider.viewed))
        const result = pattern.parseFunction(parser)
        const viewed = parser.provider.viewed

        if (result instanceof ParsingError) {
            return result
        }

        for (const i of range(0, viewed)) {
            this.provider.next()
        }

        return result
    }
}
