import { Operand } from "parser/nodes/BinOperation"
import Node        from "parser/nodes/Node"


export default class ConstantDefinition implements Node {
    constructor(
        readonly name: string,
        readonly value: Operand
    ) {}
}