import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/shared/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = '100px'
const DEFAULT_HEIGHT = '20px'

function getWidth(colState = {}, i) {
  return colState[i] || DEFAULT_WIDTH
}

function getHeight(rowState = {}, i) {
  return rowState[i] || DEFAULT_HEIGHT
}

function createCell(row, {colState, dataState, stylesState}) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(colState, col)
    const data = dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...stylesState[id]
    })
    return `
        <div
            style="${styles}; width:${width}"
            class="cell" 
            contenteditable 
            data-col="${col}" 
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
        >${parse(data || '')}</div>
        `
  }
}

function createCol({col, i: index, width}) {
  return `
        <div
        class="column" 
        style="width: ${width}" 
        data-type="resizable" 
        data-col="${index}"
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, index, rowState) {
  const height = getHeight(rowState, index)
  return `
    <div 
      style="height: ${height}"
      class="row"
      data-type="resizable" 
      data-row="${index}"
    >
        <div class="row-info">
            ${index ? index : ''}
            ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, i: index, width: getWidth(state, index)
    }
  }
}

export function createTable(rowsCount = 50, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(createCol)
      .join('')

  rows.push(createRow(cols, null))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row, state))
        .join('')
    rows.push(createRow(cells, row + 1, state.rowState))
  }
  return rows.join('')
}
