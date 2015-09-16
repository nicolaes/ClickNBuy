import React from 'react';

import ProductItem from './product-item.js';
import ProductService from '../../services/product.js';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.sortProducts = this.sortProducts.bind(this);
  }

  componentDidMount() {
    ProductService.getAll().then((products) => {
      this.setState({products: products});
    }, (err) => {
      console.error(err);
    });
  }

  sortProducts(e) {
    e.preventDefault();

    let selectObj = React.findDOMNode(this.refs.sort);
    let value = $(selectObj).val();
    if (value == null)
      return;

    let [orderKey, orderDirection] = value.split('-');
    ProductService.getOrderedBy(orderKey, orderDirection).then((newProducts) => {
      this.setState({products: newProducts});
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <form className="product-sort col-md-3 col-md-offset-9" onSubmit={this.sortProducts}>
            <label for="sortProducts" className="sr-only" aria-hidden="true">Sort by:</label>
            <select id="sortProducts" ref="sort">
              <option>sort by...</option>
              <option value="Name-ASC">Name</option>
              <option value="Price-ASC">Price asc</option>
              <option value="Price-DESC">Price desc</option>
            </select>
            <input type="submit" value="Sort" className="btn btn-default"/>
          </form>
        </div>
        <ul className="products row">
          {this.state.products.map(this.getProductItem)}
        </ul>
      </div>
    );
  }

  getProductItem(product) {
    return <ProductItem product={product}/>;
  }
}
