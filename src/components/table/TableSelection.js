export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className).addClass('overflow')
        this.group.push($el)
        this.current = $el
    }

    focus($el) {
        $el.focus()
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className).removeClass('overflow'))
        this.group = []
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach($c => $c.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}