import Constant from "parser/nodes/Constant"
import Node     from "parser/nodes/Node"
import Number   from "parser/nodes/Number"


export enum BinOperator {
    Plus = "Plus",
    Minus = "Minus",
    Multiply = "Multiply",
    Divide = "Divide",
    Mod = "Mod"
}

export type Operand = Number | Constant | BinOperator

export default class BinOperation implements Node {
    constructor(
        readonly operator: BinOperator,
        readonly left: Operand,
        readonly right: Operand
    ) {}
}
