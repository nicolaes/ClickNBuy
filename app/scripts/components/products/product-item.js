import React from 'react';

import ProductOffer from './product-offer.js';
import BasketService from '../../services/basket.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this.addToBasket = this.addToBasket.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  setQuantity(e) {
    this.setState({quantity: e.target.value});
  }

  increaseQuantity(e) {
    e.preventDefault();
    if (this.state.quantity >= 100)
      return;

    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  decreaseQuantity(e) {
    e.preventDefault();
    if (this.state.quantity <= 1)
      return;

    this.setState({
      quantity: this.state.quantity - 1
    });
  }

  addToBasket(e) {
    e.preventDefault();

    BasketService.addProduct(this.props.product.Id, this.state.quantity)
    return;
  }

  getProductOffer(offer, index) {
    if (index > 2) {
      // Only display the first 3 offers - the 4th will break the design
      return '';
    }

    return <ProductOffer offer={offer}/>;
  }

  render() {
    return (
      <li className="product-item col-md-3">
        <div className="product-image">
          <img src={this.props.product.Image} alt={this.props.product.Name}/>
        </div>

        <div className="product-details" aria-label="Product name">
          {this.props.product.Name}
        </div>

        <ul className="product-offers">
          {this.props.product.Promotions.map(this.getProductOffer)}
        </ul>

        <form className="cart-actions" onSubmit={this.addToBasket}>
          <p className="quantity hidden-xs">
            <button aria-label="Decrease quantity" onClick={this.decreaseQuantity}>
              <span className="glyphicon glyphicon-minus" aria-hidden="true"/>
            </button>
            <input type="number" value={this.state.quantity} onChange={this.setQuantity}
                   aria-label="Product quantity" ref="quantity"/>
            <button aria-label="Increase quantity" onClick={this.increaseQuantity}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true"/>
            </button>
          </p>
          <p className="price">
            {this.props.product.Price}
          </p>

          <p className="add-to-cart">
            <input type="submit" className="btn btn-primary" value="Add to basket"/>
          </p>
        </form>
      </li>
    );
  }
}
