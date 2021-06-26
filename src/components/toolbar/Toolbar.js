import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import * as constants from "@core/constants";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        const currentStyles = this.store.getState().currentStyles
        this.initState(currentStyles)
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    onClick(ev) {
        const $target = $(ev.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit(constants.toolbarApplyStyle, value)
        }
    }
}