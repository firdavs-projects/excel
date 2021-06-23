const CODES = {
    A: 65,
    Z: 90
}

function createCell(row) {
    return function (_, col) {
        return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${col}" 
            data-type="cell"
            data-id="${row}:${col}"
        ></div>
        `
    }
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
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('')
        rows.push(createRow(cells, row + 1))
    }
    return rows.join('')
}