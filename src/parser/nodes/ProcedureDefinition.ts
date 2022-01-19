import Node  from "parser/nodes/Node"
import Scope from "parser/nodes/Scope"


export default class ProcedureDefinition implements Node {
    constructor(
        readonly name: string,
        readonly scope: Scope
    ) {}
}