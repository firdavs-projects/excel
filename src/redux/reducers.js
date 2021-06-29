// helpers
function value(state, field, action) {
  const prevState = state[field] || {}
  prevState[action.payload.id] = action.payload.value
  return prevState
}

// Reducers
export function tableResizeReducer(state, action) {
  const field = action.payload.type === 'col' ? 'colState' : 'rowState'
  return {...state, [field]: value(state, field, action)}
}

export function changeTextReducer(state, action) {
  const field = 'dataState'
  return {
    ...state,
    currentText: action.payload.value,
    dataState: value(state, field, action)
  }
}

export function changeTitleReducer(state, action) {
  return {
    ...state, title: action.payload
  }
}

export function changeStylesReducer(state, action) {
  return {
    ...state, currentStyles: action.payload
  }
}

export function applyStyleReducer(state, action) {
  const value = state['stylesState'] || {}
  action.payload.ids.forEach(id => {
    value[id] = {...value[id], ...action.payload.value}
  })
  return {
    ...state,
    stylesState: value,
    currentStyles: {...state.currentStyles, ...action.payload.value}
  }
}

export function updateDateReducer(state) {
  return {
    ...state,
    openedDate: new Date().toJSON()
  }
}
