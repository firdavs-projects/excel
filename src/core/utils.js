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