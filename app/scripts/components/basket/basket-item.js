import React from 'react';

import BasketService from '../../services/basket.js';

class BasketItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  setQuantity(e) {
    BasketService.setItemQuantity(this.props.item.product.Id, e.target.value);
  }

  increaseQuantity(e) {
    e.preventDefault();
    BasketService.setItemQuantity(this.props.item.product.Id, this.props.item.quantity + 1);
  }

  decreaseQuantity(e) {
    e.preventDefault();
    BasketService.setItemQuantity(this.props.item.product.Id, this.props.item.quantity - 1);
  }

  removeFromBasket(e) {
    e.preventDefault();
    BasketService.setItemQuantity(this.props.item.product.Id, 0);
  }

  static getItemTotalPrice(item) {
    return Math.round(item.quantity * item.product.Price * 100) / 100;
  }

  render() {
    return (
      <li className="basket-item">
        <div className="row">
          <p className="col-md-4">
            <img src={this.props.item.product.Image} alt={this.props.item.product.Name}/>
          </p>
          <p className="col-md-8">
            {this.props.item.product.Name}
          </p>
        </div>

        <div className="row">
          <p className="col-md-6 visible-xs">
            Qty: {this.props.item.quantity}
          </p>
          <p className="col-md-6 quantity hidden-xs">
            <button aria-label="Decrease quantity in basket" onClick={this.decreaseQuantity}>
              <span className="glyphicon glyphicon-minus" aria-hidden="true" />
            </button>
            <input type="number" value={this.props.item.quantity} onChange={this.setQuantity}
                   aria-label="Product quantity in basket" />
            <button aria-label="Increase quantity in basket" onClick={this.increaseQuantity}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            </button>
          </p>
          <p className="col-md-3 price">{BasketItem.getItemTotalPrice(this.props.item)}</p>
          <p className="col-md-3 remove-from-basket">
            <button aria-label="Remove product from basket" onClick={this.removeFromBasket}>
              <span className="sr-only">Remove product from basket</span>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </p>
        </div>
      </li>
    );
  }
}

export default BasketItem;