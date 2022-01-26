import TokenProvider from "parser/TokenProvider"
import TokenType     from "tokens/TokenType"
import Token         from "tokens/Token"


test("Check is empty for empty list", () => {
    const instance = new TokenProvider([])

    expect(instance.empty()).toBe(true)
})

test("Check is empty for no empty list", () => {
    const tokens = [new Token(TokenType.Number, "123", { line: 1, column: 1 })]
    const instance = new TokenProvider(tokens)

    expect(instance.empty()).toBe(false)
})