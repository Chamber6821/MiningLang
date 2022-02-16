import Token from "lexer/Token"


export default interface TokenFactory<T> {
    get index(): number

    create(type: T, value?: string): Token<T>
}