import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  initState(initialState = {}) {
    this.state = {...initialState}
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
