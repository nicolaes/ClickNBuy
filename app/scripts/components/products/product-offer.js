import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.getOfferIcon = this.getOfferIcon.bind(this);
  }

  getOfferIcon() {
    switch (this.props.offer.Type) {
      case 'Reward':
        return 'glyphicon glyphicon-star';
      case 'Ecoupon':
        return 'glyphicon glyphicon-barcode';
    }
    return '';
  }

  render() {
    return (
      <li className="product-offer">
        <span className={this.getOfferIcon()}/>
        {this.props.offer.Description}
      </li>
    );
  }
}
