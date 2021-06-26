import {ExcelComponent} from "@core/ExcelComponent";
import {changeTitle} from "@/redux/actions";
import {$} from "@core/dom";
import * as constants from "@core/constants";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
    `;
    }

    onInput(event) {
        this.$dispatch(changeTitle($(event.target).text()))
    }
}