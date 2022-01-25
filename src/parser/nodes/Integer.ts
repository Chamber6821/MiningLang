import Node from "parser/nodes/Node"


export default class Integer implements Node {
    constructor(
        readonly value: number
    ) {}

    getAllNodes = (): Node[] => []
}