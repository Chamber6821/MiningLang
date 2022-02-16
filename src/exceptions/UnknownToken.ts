export default class UnknownToken extends Error {
    constructor(
        readonly fragment: string,
        readonly index: number
    ) {
        super(`Unknown token at position ${index}`)

        // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, UnknownToken.prototype)
    }
}