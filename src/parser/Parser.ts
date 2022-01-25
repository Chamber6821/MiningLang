import Scope        from "parser/nodes/Scope"
import ParsingError from "parser/ParsingError"
import Collector     from "utils/Collector"
import TokenProvider from "parser/TokenProvider"


export default class Parser {
    private readonly errorCollector = new Collector<ParsingError>()

    constructor(
        private readonly provider: TokenProvider,
    ) {}

    get errors(): readonly ParsingError[] {
        return this.errorCollector.collected
    }

    buildIncompleteTree(): Scope {
        // TODO: Implement method
    }
}