import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
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
        this.$on('table:select', text => {
            this.$formula.text(text)
        })
        this.$on('table:input', text => {
            this.$formula.text(text)
        })
    }

    onKeydown(ev) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(ev.key)) {
            ev.preventDefault()
            this.$emit('formula:done')
        }
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }
}