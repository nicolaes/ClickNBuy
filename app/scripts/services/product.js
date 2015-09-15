// Instantiate the ProductService as a singleton
export default new class {
  constructor() {
    this.areProductsCached = false;
    this.products = [];
  }

  getAll() {
    // Using ES6 A+ Promises
    return new Promise((resolve, reject) => {
      if (this.areProductsCached === true) {
        resolve (this.products);
        return;
      }

      $.get('data.json')
        .then((data) => {
          if (!(data.Details instanceof Array))
            reject('Incorrect data');

          // Cache the products
          this.areProductsCached = true;
          this.products = data.Details;
          resolve(this.products);
        }, (xhr, status, err) => {
          reject('Product list - ' + status + ' - ' + err.toString());
        });
      return;
    });
  }
}
