export function createStore(rootReducer, initialState = {}) {

    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let subscribers = []

    return {
        subscribe(fn) {
            subscribers.push(fn)
            return {
                unsubscribe() {
                    subscribers = subscribers.filter(l => l !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            subscribers.forEach(s => s(state))
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
        }
    }
}

// Todo => to class