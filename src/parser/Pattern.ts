import Node   from "parser/nodes/Node"
import Parser from "parser/Parser"
import ParsingError  from "parser/ParsingError"
import TokenProvider from "parser/TokenProvider"


export default class Pattern<T> {
    constructor(
        readonly name: string,
        readonly parseFunction: (parser: Parser<T>, provider: TokenProvider<T>) => Node | ParsingError<T>
    ) {}
}