import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {
    nextSelector, isCell, matrix,
    shouldResize,
} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        });
    }

    toHTML() {
        return createTable(100);
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell.text())
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
            return
        }

        if (ev.key === 'Delete') {
            this.selection.current.text('')
        }
        this.$emit('table:input', $(ev.target).text())
    }

    onMousedown(ev) {
        if (shouldResize(ev)) {
            resizeHandler(ev, this.$root)
        }
        if (isCell(ev)) {
            const $target = $(ev.target)
            if (ev.shiftKey) {
                const $cells = matrix($target.id(true), this.selection.current.id(true))
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
                return
            }
            this.selectCell($target)
        }
    }
}

