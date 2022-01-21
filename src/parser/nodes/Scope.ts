import ConstantDefinition  from "parser/nodes/ConstantDefinition"
import Node                from "parser/nodes/Node"
import ProcedureDefinition from "parser/nodes/ProcedureDefinition"


export type Statement = ConstantDefinition | ProcedureDefinition | Scope

export default class Scope implements Node {
    constructor(
        readonly statements: Statement[]
    ) {}

    getAllNodes = (): Node[] => this.statements
}