import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubs = []

        this.prepare()
    }

    prepare() {
    }

    toHTML() {
        return ''
    }

    $emit(event, ...args) {
        const unsub = this.emitter.emit(event, ...args)
        this.unsubs.push(unsub)
    }

    $on(event, fn) {
        this.emitter.subscribe(event, fn)
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubs.forEach(unsub => unsub())
    }
}