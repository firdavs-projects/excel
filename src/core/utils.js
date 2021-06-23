//Pure functions
export const capitalize = (string) => {
    if (typeof string !== "string") {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const roundNum = (number) => {
    if (typeof number !== 'number') {
        return NaN
    }
    return Math.floor(number)
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => start + i)
}

export function increaseNum(a, max) {
    if (+a === +max) {
        return +a
    }
    return +a + 1
}

export function reduceNum(a) {
    if (+a === 0) {
        return +a
    }
    return +a - 1
}