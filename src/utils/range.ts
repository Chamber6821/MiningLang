/*
* Like be range from Python (https://docs.python.org/3/library/stdtypes.html#range)
* */
export default function* range(from: number, to: number, step: number = 1): Generator<number> {

    /*
    * Был вариант сделать одну функцию с предикатом в аргументе,
    * но возможно это повлияет на производительность,
    * а за копипастить тут не так критично
    * */

    function* increase() {
        for (let i = from; i < to; i += step)
            yield i
    }

    function* decrease() {
        for (let i = from; i > to; i += step)
            yield i
    }

    if (step > 0) yield* increase()
    else yield* decrease()
}