// Instantiate the ProductService as a singleton
export default new class {
  constructor() {
    this.itemsPromise = null;
    this.products = [];
  }

  getAll() {
    if (this.itemsPromise !== null) {
      return this.itemsPromise;
    }

    // Using ES6 Promises
    this.itemsPromise = new Promise((resolve, reject) => {
      $.get('data.json')
        .then((data) => {
          if (!(data.Details instanceof Array))
            reject('Incorrect data');

          // Cache the products
          this.products = data.Details;
          resolve(this.products);
        }, (xhr, status, err) => {
          reject('Product list - ' + status + ' - ' + err.toString());
        });
      return;
    });

    this.itemsPromise.catch(() => {
      this.itemsPromise = null;
    });

    return this.itemsPromise;
  }

  getById(productId) {
    return this.getAll().then(() => {
      let productIndex = this.findProductIndexById(productId);
      if (productIndex === -1)
        return;

      return this.products[productIndex];
    });
  }

  findProductIndexById(productId) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].Id === productId) {
        return i;
      }
    }
    return -1;
  }

  getOrderedBy(key, order) {
    return this.getAll()
      .then((prods) => {
        let sortOrder = (order === 'DESC') ? -1 : 1;
        this.products.sort(function (product1, product2) {
          if (product1[key] > product2[key]) return sortOrder;
          if (product1[key] < product2[key]) return -sortOrder;
          return 0;
        });
        return this.products;
      });
  }
}
