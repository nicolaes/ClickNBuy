import ProductService from './product.js';

export default new class {
  constructor() {
    this.itemsPromise = null;

    /**
     * @type [{ product: Product, quantity: 5 }]
     */
    this.items = [];
  }

  getItems() {
    if (this.itemsPromise !== null) {
      return this.itemsPromise;
    }

    this.itemsPromise = new Promise((resolve, reject) => {
      // 1. Initialize the basket with data from the product list
      // 2. Make the product list a dependency for the basket
      ProductService.getAll()
        .then((products) => {
          for (let i = 0; i < products.length; i++) {
            // Add to basket the products
            if (products[i].BasketQty > 0) {
              this.items.push({
                product: products[i],
                quantity: products[i].BasketQty
              });
            }
          }

          resolve(this.items);
        }, reject);
    });

    return this.itemsPromise;
  }

  addProduct(productId, quantity) {
    return new Promise((resolve, reject) => {
      if (quantity < 1) {
        reject('Can not add less than one product');
      }

      ProductService.getById(productId).then((product) => {
        let itemIndex = this.getItemIndexByProductId(productId);
        console.log('product', productId, itemIndex);

        // Add a new product or increment the existing one
        if (itemIndex >= 0) {
          this.items[itemIndex].quantity += quantity;
        } else {
          this.items.unshift({
            product: product,
            quantity: quantity
          });
        }

        $.Topic('BasketService.update').publish(this.items);
        resolve(this.items);
      }, reject);
    });
  }

  setItemQuantity(productId, quantity) {
    // Validate quantity
    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity < 0 || quantity > 100)
      return;

    // Validate item
    let itemIndex = this.getItemIndexByProductId(productId);
    if (itemIndex === -1)
      return;

    // Same quantity?
    if (this.items[itemIndex].quantity === quantity)
      return;

    // Modify quantity or delete the item
    if (quantity > 0) {
      this.items[itemIndex].quantity = quantity;
    } else {
      this.items.splice(itemIndex, 1);
    }

    $.Topic('BasketService.update').publish(this.items);
  }

  getItemIndexByProductId(productId) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.Id === productId) {
        return i;
      }
    }
    return -1;
  }

}

