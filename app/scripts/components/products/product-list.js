import React from 'react';

import ProductItem from './product-item.js';
import ProductService from '../../services/product.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    ProductService.getAll().then((products) => {
      this.setState({products: products});
    }, (err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <ul className="products row">
        {this.state.products.map(this.getProductItem)}
      </ul>
    );
  }

  getProductItem(product) {
    return <ProductItem product={product}/>;
  }
}
