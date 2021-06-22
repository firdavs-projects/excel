const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
    <div class="cell" contenteditable></div>
    `
}

function createCol(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(content, i) {
    return `
    <div class="row">
        <div class="row-info">${i ? i : ''}</div>
        <div class="row-data">${content}</div>
    </div>
`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 50) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')


    rows.push(createRow(cols, null))
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(cells, i + 1))
    }
    return rows.join('')
}