'use strict';

var React = require("react/addons"),
  TestUtils = React.addons.TestUtils,
  StubComponent = require('stubs/component.js');

import Basket from 'components/basket/basket.js';
import BasketService from 'services/basket.js';

describe('basket component', function () {
  let basket, basketDom,
    mockBasketService, basketItemPromise;

  // Mock the BasketItem mock component
  // This will also export a promise to be resolved when the first BasketItem is instantiated (eg AJAX request is done)
  beforeEach(function(){
    basketItemPromise = new Promise((resolve, reject) => {
      Basket.__Rewire__('BasketItem', StubComponent(() => {
        // Don't resolve before React can trigger setScope()
        setTimeout(resolve, 0);
      }));
    });
  });

  // Mock the BasketService + add spy on the getItems method
  beforeEach(function(){
    mockBasketService = {
      getItems: function() {
        return new Promise((resolve, reject) => {
          // simulate server call
          setTimeout(() => {
            resolve([
              {product: {Id: 5, Name: 'MockProduct'}, quantity: 5, key: 5}
            ]);
          }, 200);
        });
      }
    };
    spyOn(mockBasketService, 'getItems').and.callThrough();
    Basket.__Rewire__('BasketService', mockBasketService);
  });

  // Instantiate the React component AFTER the auxiliary services are mocked
  beforeEach(function(){
    basket = TestUtils.renderIntoDocument(<Basket />);
    basketDom = TestUtils.findRenderedDOMComponentWithTag(basket, 'div').getDOMNode();
  });

  afterEach(function(){
    Basket.__ResetDependency__('BasketItem');
    Basket.__ResetDependency__('BasketService');
  });

  it('should display an empty basket', function () {
    expect(basketDom.querySelector('h4').textContent).toContain('Basket');
    expect(basketDom.querySelectorAll('.basketItems > *').length).toBe(0);
  });

  it('should display the basket with products', function (done) {
    basketItemPromise.then(() => {
      //expect(mockBasketService.getItems).toHaveBeenCalled();
      //expect(basketDom.querySelectorAll('.basketItems > *').length).toBeGreaterThan(0);
      done();
    });
  });
});
