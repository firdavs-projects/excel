import {storage} from "@core/utils";
import * as constants from "@core/constants";

const DB_KEY = 'excel-state'

const defaultState = {
    title: constants.defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentStyles: constants.defaultStyles,
    currentText: '',


}

export const initialState = storage(DB_KEY)
    ? storage(DB_KEY)
    : defaultState