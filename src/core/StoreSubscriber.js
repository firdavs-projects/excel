import {isEqual} from "@core/utils";

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.subscribe = null
        this.prevState = {}
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState()
        this.subscribe = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach(component => {
                        if (component.isWatching(key)) {
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            this.prevState = this.store.getState()
        })

    }

    unsubscribeFromStore() {
        this.subscribe.unsubscribe()
    }
}