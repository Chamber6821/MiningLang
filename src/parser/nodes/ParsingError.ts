import Token from "lexer/Token"
import Node  from "parser/nodes/Node"


export type NodeName = string

export default class ParsingError<T> implements Node {
    readonly nodes = []

    constructor(
        readonly from: NodeName,
        readonly expected: T[],
        readonly received: Token<T>,
        readonly childErrors: ParsingError<T>[] = []
    ) {}
}
