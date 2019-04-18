import Component from './component';

export default class TotalCost extends Component {
  constructor(updatedPrice) {
    super();
    this._totalPrice = updatedPrice;
  }

  get template() {
    return `<p class="trip__total">Total: <span class="trip__total-cost">€</span></p>`.trim();
  }
}

