import Node from "parser/nodes/Node"


export default class Constant implements Node {
    constructor(
        readonly name: string
    ) {}

    getAllNodes = (): Node[] => []
}