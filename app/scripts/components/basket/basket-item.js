import React from 'react';

class BasketItem extends React.Component {
  constructor(props) {
    super(props);

    //this.addToBasket = this.addToBasket.bind(this);
    //this.setQuantity = this.setQuantity.bind(this);
    //this.increaseQuantity = this.increaseQuantity.bind(this);
    //this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  //setQuantity(e) {
  //  this.setState({quantity: e.target.value});
  //}
  //
  //increaseQuantity(e) {
  //  e.preventDefault();
  //  if (this.state.quantity >= 100)
  //    return;
  //
  //  this.setState({
  //    quantity: this.state.quantity + 1
  //  });
  //}
  //
  //decreaseQuantity(e) {
  //  e.preventDefault();
  //  if (this.state.quantity <= 1)
  //    return;
  //
  //  this.setState({
  //    quantity: this.state.quantity - 1
  //  });
  //}
  //
  //addToBasket(e) {
  //  e.preventDefault();
  //
  //  BasketService.addProduct(this.props.product.Id, this.state.quantity)
  //  return;
  //}

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
          <p className="col-md-6">Quantity: {this.props.item.quantity}</p>
          <p className="col-md-6 price">{BasketItem.getItemTotalPrice(this.props.item)}</p>
        </div>
      </li>
    );
  }
}

export default BasketItem;