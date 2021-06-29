import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {$} from '@core/dom';
import * as constants from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
      super($root, {
        name: 'Header',
        listeners: ['input', 'click'],
        ...options
      });
    }

    prepare() {
      this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
      const title = this.store.getState().title || constants.defaultTitle
      return `
        <input id="header-title" type="text" class="input" value="${title}">
        <div>
          <div class="button" data-button="remove" >
            <i data-button="remove" class="material-icons">delete</i>
          </div>
          <div class="button" data-button="exit">
            <i data-button="exit" class="material-icons">exit_to_app</i>
          </div>
        </div>
    `;
    }

    onInput(event) {
      this.$dispatch(changeTitle($(event.target).text()))
    }

    onClick(event) {
      const $target = $(event.target)
      if ($target.data.button === 'remove') {
        const decision = confirm('Вы действительно хотите удалить эту таблицу?')
        if (decision) {
          const key = ActiveRoute.path.replace('/', ':')
          localStorage.removeItem(key)
          ActiveRoute.navigate('')
        }
      } else if ($target.data.button === 'exit') {
        ActiveRoute.navigate('')
      }
    }
}
