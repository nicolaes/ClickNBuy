import React from 'react';

import BasketItem from './basket-item.js';
import BasketService from '../../services/basket.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    // Get the basket items
    BasketService.getItems().then((items) => {
      this.setState({items: items});

      // Subscribe to basket updates
      $.Topic('BasketService.update').subscribe((items) => {
        this.setState({items: items});
      });
    });

  }

  render() {
    return (
      <div className="basket">
        <header>
          <h4>
            <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"/>
            <span>Basket</span>
            <span className="item-count hidden-xs">
              {this.state.items.length} items
            </span>
          </h4>
        </header>

        <ul className="basketItems">
          {this.state.items.map((item) => <BasketItem key={item.product.Id} item={item}/>)}
        </ul>
      </div>
    );
  }
}
