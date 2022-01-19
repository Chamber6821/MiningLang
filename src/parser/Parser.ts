import Scope from "parser/nodes/Scope"
import Token from "tokens/Token"


export default class Parser {
    constructor(
        private tokens: Token[]
    ) {}

    buildTree(): Scope {
    }
}