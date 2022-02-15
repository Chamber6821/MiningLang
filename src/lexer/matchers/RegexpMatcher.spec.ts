import RegexpMatcher from "lexer/matchers/RegexpMatcher"


test("Throw if pattern does not start with '^'", () => {
    expect(() => new RegexpMatcher(/\w+/))
        .toThrow(Error)
})

test("Return matched", () => {
    const pattern = /^\d+/
    const string = "123 321"
    const expected = "123"

    expect(new RegexpMatcher(pattern).match(string))
        .toEqual(expected)
})

test("Return null", () => {
    const pattern = /^\d+/
    const string = "filed 321"
    const expected = null

    expect(new RegexpMatcher(pattern).match(string))
        .toEqual(expected)
})