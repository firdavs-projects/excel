import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import * as actions from "@/redux/actions";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import * as constants from "@core/constants";
import {parse} from "@core/parse";
import {
    nextSelector, isCell, matrix,
    shouldResize,
} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            subscribe: ['currentText'],
            ...options
        });
    }

    toHTML() {
        return createTable(100, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on(constants.formulaInput, (value = '') => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on(constants.tableCellParse, ({prev, curr}) => {
            this.selection.prev
                ?.attr('data-value', prev)
                .text(parse(prev))
            this.selection.current
                .attr('data-value', curr)
                .text(parse(curr))
            this.updateTextInStore(curr)
        })

        this.$on(constants.formulaDone, () => {
            this.selection.current.focus()
        })

        this.$on(constants.toolbarApplyStyle, style => {
            this.selection.applyStyle(style)
            this.$dispatch(actions.applyStyle({
                value: style,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit(constants.tableSelect, $cell)
        const styles = $cell.getStyles(Object.keys(constants.defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
        this.$emit(constants.tableCellParse, {
            prev: this.selection.prev?.data.value || "",
            curr: $cell.data.value || ""
        })
    }

    onKeydown(ev) {
        const keys = [
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
            'Enter',
            'Tab',
        ]

        if (keys.includes(ev.key) && !ev.shiftKey) {
            ev.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(ev.key, id))
            this.selectCell($next)

        } else if (ev.key === 'Delete') {

            if (this.selection.group.length > 1) {
                this.selection.group.forEach($el => {
                    this.clearCell($el)
                })
            } else {
                this.clearCell(this.selection.current)
            }
        }
    }

    clearCell($cell) {
        $cell.text('')
        $cell.attr('data-value', '')
        this.updateTextInStore('')
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(ev) {
        const $target = $(ev.target)
        this.updateTextInStore($target.text())
        $target.attr('data-value', $target.text())
    }

    async resizeTable(ev) {
        try {
            const payload = await resizeHandler(ev, this.$root)
            this.$dispatch(actions.tableResize(payload))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(ev) {
        if (shouldResize(ev)) {
            this.resizeTable(ev)
        }
        if (isCell(ev)) {
            const $target = $(ev.target)
            if (ev.shiftKey) {
                const $cells = matrix($target.id(true), this.selection.current.id(true))
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }
}

