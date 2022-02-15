import Matcher from "lexer/matchers/Matcher"


export default class RegexpMatcher implements Matcher {
    constructor(
        private readonly regexp: RegExp
    ) {
        if (!this.checkValid(regexp)) {
            throw new Error("Invalid match pattern")
        }
    }

    match(string: string): string | null {
        return (string.match(this.regexp) || [null])[0]
    }

    private checkValid(regexp: RegExp): boolean {
        return String(regexp)
            .startsWith("/^")
    }
}