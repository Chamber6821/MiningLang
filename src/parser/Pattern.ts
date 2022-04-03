import Node   from "parser/nodes/Node"
import Parser        from "parser/Parser"
import ParsingError  from "parser/nodes/ParsingError"
import TokenProvider from "parser/TokenProvider"


export default class Pattern<T> {
    constructor(
        readonly name: string,
        readonly parseFunction: (parser: Parser<T>) => Node | ParsingError<T>
    ) {}
}