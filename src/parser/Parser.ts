import Scope        from "parser/nodes/Scope"
import ParsingError from "parser/ParsingError"
import TokenProvider from "parser/TokenProvider"


export default class Parser {
    private collectedErrors: ParsingError[] = []

    constructor(
        private readonly provider: TokenProvider,
    ) {}

    get errors(): readonly ParsingError[] {
        return this.collectedErrors
    }

    buildIncompleteTree(): Scope {
        // TODO: Implement method
    }
}