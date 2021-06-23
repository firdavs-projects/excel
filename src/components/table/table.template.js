const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, i) {
    return `
    <div class="cell" contenteditable data-col="${i}"></div>
    `
}

function createCol(col, i) {
    return `
        <div class="column" data-type="resizable" data-col="${i}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, i) {
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${i ? i : ''}
            ${i ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
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