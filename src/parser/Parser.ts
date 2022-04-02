import Token        from "lexer/Token"
import Node         from "parser/nodes/Node"
import ParsingError from "parser/ParsingError"
import Pattern       from "parser/Pattern"
import TokenProvider from "parser/TokenProvider"


export default class Parser<T> {
    private viewed: number = 0
    private patterns: Pattern<T>[] = []

    constructor(
        private readonly tokens: Token<T>[]
    ) {}

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
        const errors: ParsingError<T>[] = []

        for (const pattern of this.patterns) {
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
        const provider = new TokenProvider<T>(this.tokens.slice(this.viewed))
        const result = pattern.parseFunction(this, provider)

        if (result instanceof ParsingError) {
            return result
        }

        this.viewed += provider.viewed
        return result
    }
}
