import {$} from "@core/dom";
import {roundNum} from "@core/utils";

export function resizeHandler(ev, $root) {
    const $resizer = $(ev.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const isRow = $resizer.data.resize === 'row'
    const sideProp = $resizer.data.resize === 'row' ? 'right' : 'bottom'
    const cell = $root.findAll(`[data-col="${$parent.data.col}"]`)
    let value

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px',
    })

    document.onmousemove = event => {
        if (isRow) {
            const delta = roundNum(event.pageY - coords.bottom)
            value = roundNum(coords.height + delta) + 'px'
            $resizer.css({bottom: -delta + 'px'})
            return
        }
        const delta = roundNum(event.pageX - coords.right)
        value = roundNum(coords.width + delta) + 'px'
        $resizer.css({right: -delta + 'px'})
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })

        if (isRow) {
            $parent.css({height: value})
            return
        }
        $parent.css({width: value})
        cell.forEach(el => el.style.width = value)
    }
}