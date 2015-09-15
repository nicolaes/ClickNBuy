import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };

    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  setQuantity(event) {
    console.log('event', event);
    this.setState({quantity: event.target.value});
  }

  increaseQuantity() {
    if (this.state.quantity >= 100)
      return;

    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  decreaseQuantity() {
    if (this.state.quantity <= 1)
      return;

    this.setState({
      quantity: this.state.quantity - 1
    });
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

        <div className="cart-actions">
          <p className="quantity">
            <button aria-label="Decrease quantity" onClick={this.decreaseQuantity}>
              <span className="glyphicon glyphicon-minus"/>
            </button>
            <input type="number" value={this.state.quantity} onChange={this.setQuantity}
                   aria-label="Product quantity" ref="quantity"/>
            <button aria-label="Increase quantity" onClick={this.increaseQuantity}>
              <span className="glyphicon glyphicon-plus"/>
            </button>
          </p>
          <p className="price">
            {this.props.product.Price}
          </p>
          <p className="add-to-cart">
            <a href="#" className="btn btn-primary">
              Add to basket
            </a>
          </p>
        </div>
      </li>
    );
  }
}
