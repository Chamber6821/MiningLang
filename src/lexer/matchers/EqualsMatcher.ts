import Matcher from "lexer/matchers/Matcher"


export default class EqualsMatcher implements Matcher {
    constructor(
        readonly startWith: string
    ) {}

    match(string: string): string | null {
        return string.startsWith(this.startWith) ? this.startWith : null
    }
}