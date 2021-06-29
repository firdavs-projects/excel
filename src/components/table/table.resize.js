import {$} from '@core/dom';
import {roundNum} from '@core/utils';

export function resizeHandler(ev, $root) {
  return new Promise(resolve => {
    const $resizer = $(ev.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = $resizer.data.resize === 'row' ? 'right' : 'bottom'
    const cell = $root.findAll(`[data-col="${$parent.data.col}"]`)
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    document.onmousemove = event => {
      if (type === 'row') {
        const delta = roundNum(event.clientY - coords.bottom)
        value = roundNum(coords.height + delta) + 'px'
        $resizer.css({bottom: -delta + 'px'})
      } else {
        const delta = roundNum(event.clientX - coords.right)
        value = roundNum(coords.width + delta) + 'px'
        $resizer.css({right: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })

      if (type === 'row') {
        $parent.css({height: value})
      } else {
        $parent.css({width: value})
        cell.forEach(el => el.style.width = value)
      }
      resolve({
        type,
        value,
        id: $parent.data[type]
      })
    }
  })
}
