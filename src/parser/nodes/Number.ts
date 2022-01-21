import Node from "parser/nodes/Node"


export default class Number implements Node {
    constructor(
        readonly value: number
    ) {}

    getAllNodes = (): Node[] => []
}