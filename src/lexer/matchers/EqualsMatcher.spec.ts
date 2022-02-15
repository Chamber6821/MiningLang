import EqualsMatcher from "lexer/matchers/EqualsMatcher"


test("Return matched", () => {
    const pattern = "Name"
    const string = "Name 321"
    const expected = "Name"

    expect(new EqualsMatcher(pattern).match(string))
        .toEqual(expected)
})

test("Return null", () => {
    const pattern = "wrong"
    const string = "something text"
    const expected = null

    expect(new EqualsMatcher(pattern).match(string))
        .toEqual(expected)
})