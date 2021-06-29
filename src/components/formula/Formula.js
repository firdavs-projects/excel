import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import *as constants from "@/constants";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });
    }

    toHTML() {
        return `
        <div class="info">fx</div>
        <div id="formula-input" class="input" contenteditable spellcheck="false"></div>
    `;
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula-input')
        this.$on(constants.tableSelect, $cell => {
            this.$formula.text($cell.data.value)
        })
    }

    onKeydown(ev) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(ev.key)) {
            ev.preventDefault()
            this.$emit(constants.formulaDone)
        }
    }

    onInput(event) {
        this.$emit(constants.formulaInput, $(event.target).text())
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }
}