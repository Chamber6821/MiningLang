import Token from "lexer/Token"
import Node  from "parser/nodes/Node"


export type NodeName = string

export default class ParsingError<T> implements Node {
    constructor(
        readonly from: NodeName,
        readonly expected: T[],
        readonly received: Token<T>,
        readonly childErrors: ParsingError<T>[] = []
    ) {}

    getAllNodes(): Node[] {
        return []
    }
}
