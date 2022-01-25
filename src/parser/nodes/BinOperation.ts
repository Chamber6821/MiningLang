import Constant from "parser/nodes/Constant"
import Node     from "parser/nodes/Node"
import Integer  from "parser/nodes/Integer"


export enum BinOperator {
    Plus = "Plus",
    Minus = "Minus",
    Multiply = "Multiply",
    Divide = "Divide",
    Mod = "Mod"
}

export type Operand = Integer | Constant | BinOperation

export default class BinOperation implements Node {
    constructor(
        readonly operator: BinOperator,
        readonly left: Operand,
        readonly right: Operand
    ) {}

    getAllNodes = (): Node[] => [this.left, this.right]
}
