import React from 'react';

import ProductList from './products/product-list.js';
import Basket from './basket/basket.js';

export default class extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>
            ClickNBuy<br />
            <span className="subheading">Groceries made easy</span>
          </h1>
        </header>

        <div className="row">
          <div className="col-xs-8">
            <ProductList />
          </div>
          <div className="col-xs-4">
            <Basket />
          </div>
        </div>
      </div>
    );
  }
}
