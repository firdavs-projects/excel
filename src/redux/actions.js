import * as types from '@/redux/types';

export function tableResize(payload) {
  return {
    type: types.TABLE_RESIZE,
    payload
  }
}

export function changeText(payload) {
  return {
    type: types.CHANGE_TEXT,
    payload
  }
}

export function changeTitle(payload) {
  return {
    type: types.CHANGE_TITLE,
    payload
  }
}

export function changeStyles(payload) {
  return {
    type: types.CHANGE_STYLES,
    payload
  }
}

export function applyStyle(payload) {
  return {
    type: types.APPLY_STYLE,
    payload
  }
}

export function updateDate() {
  return {
    type: types.UPDATE_DATE
  }
}
