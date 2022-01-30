import range from "utils/range"


test("Increase from 0 to 10", () => {
    const generator = range(0, 10)
    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect([...generator]).toEqual(expected)
})

test("Decrease from 10 to 0", () => {
    const generator = range(10, 0, -1)
    const expected = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    expect([...generator]).toEqual(expected)
})

test("Return empty range if increment step is negative", () => {
    expect([...range(0, 10, -1)]).toEqual([])
})

test("Return empty range if decrement step is positive", () => {
    expect([...range(10, 0, 1)]).toEqual([])
})