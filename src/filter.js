import {Component} from './component';

class Filter extends Component {
  constructor(data) {
    super();
    this._filters = data.filters;
  }

  _getFilters(filters) {
    const filtersHtml = [];
    for (const filter of filters) {
      const filterHtml = `
      <input type="radio" id="filter-${filter.name.toLowerCase()}" name="filter">
      <label class="trip-filter__item" for="filter-${filter.name.toLowerCase()}">${filter.name.toUpperCase()}</label>
    `.trim();
      filtersHtml.push(filterHtml);
    }
    return filtersHtml.join(``);
  }

  _onFilter(evt) {
    evt.preventDefault();

    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <form class="trip-filter">
    ${this._getFilters(this._filters)}
    </form>
  `.trim();
  }

  bind() {
    this._element.addEventListener(`change`, this._onFilter.bind(this));
  }
}

export {Filter};
