# ClickNBuy

Demo shopping cart app with JSON data source.
Implemented with React.

## Installation

### Requirements

- Chrome browser
- Node.JS with NPM
- Compass (http://compass-style.org/install/)
- Gulp - `npm install -g gulp`

### Dependencies

```
npm install
bower install
```

### Run with `gulp watch`

### Test with `gulp test`


## Technical description

The application is built out of React components:

- `home` - Homepage, only used for the layout
  - `product-list` - List all products grabbed from the JSON data source
    - `product-item` - Product component handling shopping basket interaction
      - `product-offer` - Separate component for offers to allow easy HTML and layout customisation for offers
  - `basket` - The shopping basket component, used to interact with the JSON-based products list
    - `basket-item` - Component for each item in the basket, handling custom actions

The server interaction and caching are implemented by the following services:

- `product-service` - Gets and caches the products from the server
- `basket-service` - Handles client-side shopping basket operations

The server architecture is standard:

- `react` for React core and plugins
- `babel` for ES6 compilation
- `gulp` for running tasks
- Gulp plugins for asset management and dev server; most important are:
  - `gulp-ruby-sass` for Compass compilation
  - `browserify` and `webpack` for JS bundle handling
- `jasmine` as the testing framework
- `karma` for running the tests
  - `karma-chrome-launcher` for Chrome integration

