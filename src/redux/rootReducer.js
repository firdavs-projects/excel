// Pure Function
import * as types from "@/redux/types";
import * as reducers from "@/redux/reducers";

export function rootReducer(state, action) {
    switch (action.type) {

        case types.TABLE_RESIZE:
            return reducers.tableResizeReducer(state, action)

        case types.CHANGE_TEXT:
            return reducers.changeTextReducer(state, action)

        case types.CHANGE_TITLE:
            return reducers.changeTitleReducer(state, action)

        case types.CHANGE_STYLES:
            return reducers.changeStylesReducer(state, action)

        case types.APPLY_STYLE:
            return reducers.applyStyleReducer(state, action)

        case types.UPDATE_DATE:
            return reducers.updateDateReducer(state)

        default:
            return state
    }
}





