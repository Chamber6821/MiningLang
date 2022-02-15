export default interface Matcher {
    match(string: string): string | null
}