import Position from "utils/Position"


export default function createPosition(line = 1, column = 1): Position {
    return { line, column }
}