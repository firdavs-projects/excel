import * as constants from "@/constants";
import {clone} from "@core/utils";

const defaultState = {
    title: constants.defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentStyles: constants.defaultStyles,
    currentText: '',
    openedDate: new Date().toJSON()
}

// function normalize(state) {
//     return {
//         ...state,
//         currentStyles: constants.defaultStyles,
//         currentText: '',
//     }
// }

export function initialState(state) {
    return state ? state : clone(defaultState)
}