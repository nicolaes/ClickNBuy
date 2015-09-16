'use strict';

var React = require("react/addons"),
  TestUtils = React.addons.TestUtils;

require('jasmine-es6-promise-matchers/jasmine-es6-promise-matchers.js')

window.$ = require('jquery/dist/jquery.min.js');
var ProductService = require('services/product.js');

describe('product service', function () {
  it('should reject the product list if the answer is wrong', function (done) {
    spyOn($, 'get').and.callFake(function (req) {
      var d = $.Deferred();
      d.resolve('wrongData');
      return d.promise();
    });

    let promise = ProductService.getAll();
    expect($.get).toHaveBeenCalledWith('data.json');
    promise.catch(done);
  });


  describe('actions', function() {
    beforeEach(function(){
      spyOn($, 'get').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve({
          Details: [{
            Id: 32596,
            Name: 'Mock product 1',
            Price: 2
          },{
            Id: 32597,
            Name: 'Mock product 2',
            Price: 1
          }]
        });
        return d.promise();
      });
    });

    it('should retrieve list of products', function (done) {
      let promise = ProductService.getAll();
      expect($.get).toHaveBeenCalledWith('data.json');
      promise.then(function(products){
        expect(products.length).toEqual(2);
        done();
      });
    });

    it('should get a product by its ID', function (done) {
      ProductService.getById(32597)
        .then(function (product) {
          expect(product.Name).toEqual('Mock product 2');
          done();
        });
    });

    it('should order the list of products by price', function (done) {
      ProductService.getOrderedBy('Price', 'ASC')
        .then(function (products) {
          expect(products[0]).toEqual(jasmine.objectContaining({Price: 1}));
          done();
        });
    });
  });
});
